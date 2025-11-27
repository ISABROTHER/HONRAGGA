// src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Policies } from './pages/Policies';
import { PolicyDetail } from './pages/PolicyDetail';
import { Events } from './pages/Events';
import { Issues } from './pages/Issues';
import { Volunteer } from './pages/Volunteer';
import { Admin } from './pages/Admin';
import { OngoingProjects } from './pages/OngoingProjects';
import { Appointments } from './pages/Appointments';
import { ReadStory } from './pages/ReadStory'; // New Import

const policyDetailsContent: Record<string, { title: string; content: React.ReactNode }> = {
  education: {
    title: "Education: A Foundation for the Future",
    content: (
      <>
        <p className="mb-4">Dr. Kwamena Minta Nyarku has consistently prioritized education, recognizing its pivotal role in community development and individual empowerment. His initiatives in this sector span from basic to tertiary levels, providing essential resources and support to students and institutions.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Basic and Senior High School Support</h3>
        <p className="mb-4">One of the key educational initiatives is the High School Education Support Program, which aims to provide comprehensive assistance to students in senior high schools. In October 2025, as part of this program, Dr. Nyarku donated 500 LED bulbs to Adisadel College to alleviate persistent lighting challenges in classrooms and dormitories. This effort is integrated into his broader ongoing "Operation Light Up Cape Coast North" initiative, which has also seen the installation of over 2,500 streetlights across the constituency.</p>
        <p className="mb-4">Further contributions to basic and senior high schools include the donation of 100 dual desks to 10 schools and significant school renovations. Additionally, exercise books have been donated to support students [Original Content].</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Tertiary Education Support</h3>
        <p className="mb-4">Dr. Nyarku has extended his support to tertiary institutions, including the University of Cape Coast (UCC), Cape Coast Technical University, and OLA Training College [Original Content]. These efforts aim to enhance the learning environment and provide necessary resources for higher education.</p>
      </>
    )
  },
  // ... (rest of your policy content remains the same) ...
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPolicyTheme, setSelectedPolicyTheme] = useState<string | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null); // New State

  // Updated handler to accept optional parameter
  const handleNavigate = (page: string, param: string | null = null) => {
    setCurrentPage(page);
    
    if (page === 'policies') {
      setSelectedPolicyTheme(param);
    } else {
      setSelectedPolicyTheme(null);
    }

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

    if (currentPage === 'policies' && selectedPolicyTheme) {
      const detailContent = policyDetailsContent[selectedPolicyTheme];
      if (detailContent) {
        return (
          <PolicyDetail
            title={detailContent.title}
            content={detailContent.content}
            onBack={() => handleNavigate('policies', null)}
          />
        );
      } else {
         return <Policies onSelectTheme={(theme) => handleNavigate('policies', theme)} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'policies':
        return <Policies onSelectTheme={(theme) => handleNavigate('policies', theme)} />;
      case 'events':
        return <Events />;
      case 'issues':
        return <Issues />;
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
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Pass onNavigate to Header so clicking logo resets state */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;