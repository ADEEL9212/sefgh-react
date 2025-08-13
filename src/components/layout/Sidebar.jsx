import { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon, 
  BookmarkIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '../ui';
import { useApp } from '../../contexts/AppContext';
import { SearchForm } from '../search/SearchForm';
import { SearchResults } from '../search/SearchResults';

export function Sidebar({ isOpen, onToggle }) {
  const [activeTab, setActiveTab] = useState('chat');
  
  const tabs = [
    { id: 'chat', name: 'Chat', icon: ChatBubbleLeftRightIcon },
    { id: 'search', name: 'Search', icon: MagnifyingGlassIcon },
    { id: 'bookmarks', name: 'Bookmarks', icon: BookmarkIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            GitHub AI Search
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium
                  ${activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="h-4 w-4 mr-1" />
                {tab.name}
              </button>
            );
          })}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && <ChatPanel />}
          {activeTab === 'search' && <SearchPanel />}
          {activeTab === 'bookmarks' && <BookmarksPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </>
  );
}

function ChatPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Chat</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">
              Welcome! I can help you search GitHub repositories, explain code, and answer questions about development.
            </p>
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ask me anything about GitHub..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button size="sm">Send</Button>
        </div>
      </div>
    </div>
  );
}

function SearchPanel() {
  const { state, getTrendingRepositories, getRepositoriesByLanguage } = useApp();

  const handleQuickAction = (action) => {
    switch (action) {
      case 'trending':
        getTrendingRepositories();
        break;
      case 'javascript':
        getRepositoriesByLanguage('javascript');
        break;
      case 'python':
        getRepositoriesByLanguage('python');
        break;
      case 'typescript':
        getRepositoriesByLanguage('typescript');
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Repository Search</h2>
        <SearchForm />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {!state.searchResults.length && !state.isLoading && !state.currentQuery && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleQuickAction('trending')}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  🔥 Trending repositories
                </button>
                <button
                  onClick={() => handleQuickAction('javascript')}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  📝 JavaScript projects
                </button>
                <button
                  onClick={() => handleQuickAction('python')}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  🐍 Python projects
                </button>
                <button
                  onClick={() => handleQuickAction('typescript')}
                  className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  🔷 TypeScript projects
                </button>
              </div>
            </div>
          </div>
        )}
        
        <SearchResults 
          results={state.searchResults}
          query={state.currentQuery}
          isLoading={state.isLoading}
        />
      </div>
    </div>
  );
}

function BookmarksPanel() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Bookmarks</h2>
      <div className="text-sm text-gray-500">
        Your saved repositories and searches will appear here.
      </div>
    </div>
  );
}

function SettingsPanel() {
  const { state, setGitHubToken, setOpenAIApiKey } = useApp();
  const [githubTokenInput, setGitHubTokenInput] = useState(state.githubToken);
  const [openaiKeyInput, setOpenAIKeyInput] = useState(state.openaiApiKey);

  const handleSaveGitHubToken = () => {
    setGitHubToken(githubTokenInput);
  };

  const handleSaveOpenAIKey = () => {
    setOpenAIApiKey(openaiKeyInput);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Token
          </label>
          <div className="space-y-2">
            <input
              type="password"
              value={githubTokenInput}
              onChange={(e) => setGitHubTokenInput(e.target.value)}
              placeholder="Enter your GitHub personal access token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="sm" onClick={handleSaveGitHubToken}>
              Save Token
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Required for enhanced GitHub API access. {state.githubToken ? '✅ Configured' : '❌ Not configured'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <div className="space-y-2">
            <input
              type="password"
              value={openaiKeyInput}
              onChange={(e) => setOpenAIKeyInput(e.target.value)}
              placeholder="Enter your OpenAI API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="sm" onClick={handleSaveOpenAIKey}>
              Save Key
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Required for AI chat functionality. {state.openaiApiKey ? '✅ Configured' : '❌ Not configured'}
          </p>
        </div>
      </div>
    </div>
  );
}