import { Card } from '../ui';
import { useApp } from '../../contexts/AppContext';
import { SearchResults } from '../search/SearchResults';

export function MainContent() {
  const { state } = useApp();

  // Show search results if we have them
  if (state.searchResults.length > 0 || state.isLoading || state.currentQuery) {
    return (
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <SearchResults 
            results={state.searchResults}
            query={state.currentQuery}
            isLoading={state.isLoading}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to GitHub AI Search
          </h2>
          <p className="text-gray-600 mb-6">
            Discover repositories, get AI-powered insights, and explore the world of open source development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              title="AI Chat Assistant"
              description="Ask questions about code, repositories, and get intelligent recommendations"
              icon="🤖"
            />
            <FeatureCard
              title="Smart Repository Search"
              description="Find repositories with advanced filtering and semantic search capabilities"
              icon="🔍"
            />
            <FeatureCard
              title="Code Understanding"
              description="Get explanations and insights about code structure and functionality"
              icon="📚"
            />
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickAction
              title="Search Trending Repositories"
              description="Discover what's popular in the developer community"
            />
            <QuickAction
              title="Explore by Language"
              description="Find repositories in your favorite programming language"
            />
            <QuickAction
              title="AI Code Review"
              description="Get AI-powered insights on code quality and patterns"
            />
            <QuickAction
              title="Learning Paths"
              description="Get personalized recommendations for learning new technologies"
            />
          </div>
        </Card>
        
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Getting Started
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-800">
                Open the sidebar and go to Search to find repositories
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-800">
                Configure your GitHub token in Settings for enhanced search capabilities
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-yellow-800">
                Add your OpenAI API key to enable AI chat features
              </span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function QuickAction({ title, description }) {
  return (
    <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
      <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}