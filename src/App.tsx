// src/App.tsx
import { useState, useEffect } from 'react';
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

  // SEO: Update Document Title & Meta Description based on the current page
  useEffect(() => {
    const siteTitle = "Hon. Dr. Kwamena Minta Nyarku (Ragga)";
    const slogan = "Obiara Ka Ho";
    let pageTitle = "";
    let metaDescription = "";

    switch (currentPage) {
      case 'about':
        pageTitle = `About | ${siteTitle}`;
        metaDescription = `Learn about the background, vision, and leadership of Hon. Dr. Kwamena Minta Nyarku in Cape Coast North.`;
        break;
      case 'achievements':
        pageTitle = `Achievements & Track Record | ${siteTitle}`;
        metaDescription = `A comprehensive record of progress and verifiable achievements in Cape Coast North by Hon. Ragga.`;
        break;
      case 'ongoing-projects':
        pageTitle = `Ongoing Infrastructure Projects | ${siteTitle}`;
        metaDescription = `Track the latest developments, road grading, and lighting projects across the constituency.`;
        break;
      case 'events':
        pageTitle = `Upcoming Campaign Events | ${siteTitle}`;
        metaDescription = `Join Hon. Ragga at upcoming town hall meetings and community engagement events.`;
        break;
      default:
        pageTitle = `${siteTitle} | MP for Cape Coast North | ${slogan}`;
        metaDescription = `Official website for Hon. Dr. Kwamena Minta Nyarku (Ragga). Tracking progress and community services in Cape Coast North.`;
    }

    document.title = pageTitle;
    
    // Update the meta description tag for search engines
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription);
    }
  }, [currentPage]);

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
      case 'policies':
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