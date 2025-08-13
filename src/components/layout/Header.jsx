import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '../ui';

export function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Bars3Icon className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-gray-900">
              GitHub AI-Powered Search Engine
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}