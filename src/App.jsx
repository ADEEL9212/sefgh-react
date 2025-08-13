import { useState } from 'react';
import { Header, Sidebar, MainContent } from './components/layout';
import { AppProvider } from './contexts/AppContext';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        <Header onToggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onToggle={toggleSidebar}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
            <MainContent />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
