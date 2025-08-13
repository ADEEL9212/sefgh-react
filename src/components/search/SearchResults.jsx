import { 
  StarIcon, 
  CodeBracketIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Badge, Card } from '../ui';

export function RepositoryCard({ repository }) {
  const {
    name,
    fullName,
    description,
    url,
    stars,
    forks,
    language,
    updatedAt,
    owner,
    topics,
  } = repository;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <img
              src={owner.avatarUrl}
              alt={owner.login}
              className="w-6 h-6 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {owner.login}
              </p>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Open on GitHub"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {description}
          </p>
        )}

        {/* Topics */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="default" className="text-xs">
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="default" className="text-xs">
                +{topics.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
              <span>{formatNumber(stars)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CodeBracketIcon className="h-4 w-4" />
              <span>{formatNumber(forks)}</span>
            </div>
            {language && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>{language}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Updated {formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SearchResults({ results, query, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="flex space-x-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    if (query) {
      return (
        <div className="text-center py-8">
          <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No repositories found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search query or check the spelling.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Search Results
        </h3>
        <p className="text-sm text-gray-500">
          {results.length} repositories found
        </p>
      </div>
      
      <div className="space-y-3">
        {results.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
    </div>
  );
}