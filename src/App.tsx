// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Issues } from './pages/Issues';
import { Volunteer } from './pages/Volunteer';
import { Admin } from './pages/Admin';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { ReadStory } from './pages/ReadStory';
import { Polls } from './pages/Polls';
import { Assemblymen } from './pages/Assemblymen';
import { Achievements } from './pages/Achievements';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null); 

  const handleNavigate = (page: string, param: string | null = null) => {
    setCurrentPage(page);
    
    if (page === 'read-story') {
      setSelectedStoryId(param);
    } else {
      setSelectedStoryId(null);
    }

    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'read-story') {
      return (
        <ReadStory 
          storyId={selectedStoryId} 
          onBack={() => handleNavigate('home')} 
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'assemblymen':
        return <Assemblymen />;
      case 'events':
        return <Events />;
      case 'issues':
        return <Issues />;
      case 'polls':
        return <Polls />;
      case 'policies': // Alias added so "View Details" buttons work
      case 'achievements': 
        return <Achievements />;
      case 'volunteer':
        return <Volunteer />;
      case 'admin':
        return <Admin />;
      case 'ongoing-projects':
        return <OngoingProjects />;
      case 'appointments':
        return <Appointments />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors text-slate-900">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;