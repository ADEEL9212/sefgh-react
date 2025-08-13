import React, { createContext, useContext, useReducer, useEffect } from 'react';
import githubService from '../services/github';

const AppContext = createContext();

const initialState = {
  githubToken: '',
  openaiApiKey: '',
  searchResults: [],
  isLoading: false,
  error: null,
  currentQuery: '',
  selectedRepository: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_GITHUB_TOKEN':
      return { ...state, githubToken: action.payload };
    case 'SET_OPENAI_API_KEY':
      return { ...state, openaiApiKey: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { 
        ...state, 
        searchResults: action.payload, 
        isLoading: false,
        error: null 
      };
    case 'SET_CURRENT_QUERY':
      return { ...state, currentQuery: action.payload };
    case 'SET_SELECTED_REPOSITORY':
      return { ...state, selectedRepository: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load tokens from localStorage on app start
  useEffect(() => {
    const githubToken = localStorage.getItem('github_token');
    const openaiApiKey = localStorage.getItem('openai_api_key');
    
    if (githubToken) {
      dispatch({ type: 'SET_GITHUB_TOKEN', payload: githubToken });
      githubService.setToken(githubToken);
    }
    
    if (openaiApiKey) {
      dispatch({ type: 'SET_OPENAI_API_KEY', payload: openaiApiKey });
    }
  }, []);

  const setGitHubToken = (token) => {
    localStorage.setItem('github_token', token);
    dispatch({ type: 'SET_GITHUB_TOKEN', payload: token });
    githubService.setToken(token);
  };

  const setOpenAIApiKey = (key) => {
    localStorage.setItem('openai_api_key', key);
    dispatch({ type: 'SET_OPENAI_API_KEY', payload: key });
  };

  const searchRepositories = async (query, options = {}) => {
    if (!query.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_CURRENT_QUERY', payload: query });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const results = await githubService.searchRepositories(query, options);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results.items });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getTrendingRepositories = async (timeframe = 'daily') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const results = await githubService.getTrendingRepositories(timeframe);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results.items });
      dispatch({ type: 'SET_CURRENT_QUERY', payload: 'Trending repositories' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getRepositoriesByLanguage = async (language) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const results = await githubService.getRepositoriesByLanguage(language);
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results.items });
      dispatch({ type: 'SET_CURRENT_QUERY', payload: `${language} repositories` });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    state,
    setGitHubToken,
    setOpenAIApiKey,
    searchRepositories,
    getTrendingRepositories,
    getRepositoriesByLanguage,
    clearError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}