import { useState } from 'react';
import { Header, Sidebar, MainContent } from './components/layout';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
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
  );
}

export default App;
