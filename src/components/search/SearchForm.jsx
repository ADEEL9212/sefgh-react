import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui';
import { useApp } from '../../contexts/AppContext';

export function SearchForm() {
  const [query, setQuery] = useState('');
  const { searchRepositories, state } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchRepositories(query);
    }
  };

  const popularQueries = [
    'language:javascript stars:>1000',
    'language:python machine learning',
    'language:typescript react',
    'language:go microservices',
    'language:rust',
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={state.isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={state.isLoading || !query.trim()}
          size="sm"
        >
          {state.isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      <div className="space-y-2">
        <p className="text-xs text-gray-500">Popular searches:</p>
        <div className="flex flex-wrap gap-1">
          {popularQueries.map((popularQuery, index) => (
            <button
              key={index}
              onClick={() => setQuery(popularQuery)}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              {popularQuery}
            </button>
          ))}
        </div>
      </div>

      {state.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{state.error}</p>
        </div>
      )}
    </div>
  );
}