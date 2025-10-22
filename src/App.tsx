import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Policies } from './pages/Policies';
import { PolicyDetail } from './pages/PolicyDetail'; // Import the new component
import { Events } from './pages/Events';
import { News } from './pages/News';
import { Volunteer } from './pages/Volunteer';
import { Admin } from './pages/Admin';

// --- Data for Policy Details ---
// (Ideally, this would be in a separate file, e.g., src/data/policyDetails.ts)
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
  infrastructure: {
    title: "Infrastructure Development",
    content: (
      <>
        <p className="mb-4">Infrastructure development has been another cornerstone of Dr. Nyarku's tenure, focusing on improving connectivity, safety, and public amenities within the Cape Coast North Constituency.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Roads and Lighting</h3>
        <p className="mb-4">The "Operation Light Up Cape Coast North" initiative has been a significant success, with over 2,500 streetlights installed across the constituency, enhancing security and visibility. Beyond lighting, the MP has overseen major road grading projects and secured an allocation for 10km of asphalted roads, contributing to better transportation networks [Original Content].</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Community and Public Buildings</h3>
        <p className="mb-4">Efforts have also been directed towards the construction and improvement of community facilities, such as the Ankaful Community Centre and support for party offices [Original Content].</p>
      </>
    )
  },
  health: {
      title: "Health and Sanitation",
      content: (
        <>
            <p className="mb-4">Recognizing the importance of public health and hygiene, Dr. Nyarku has initiated and supported projects aimed at improving healthcare access and sanitation conditions.</p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Health Facility Support</h3>
            <p className="mb-4">Support has been provided for health centers in Kwaprow and Dankwakrom, ensuring that constituents have access to essential medical services [Original Content].</p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Sanitation Projects</h3>
            <p className="mb-4">Sanitation initiatives include the construction of public toilets and the installation of manholes, addressing critical hygiene needs within the constituency [Original Content].</p>
        </>
      )
  },
  entrepreneurship: {
      title: "Entrepreneurship and Economic Development",
      content: (
        <>
            <p className="mb-4">Dr. Nyarku envisions a thriving local economy and has focused on initiatives that foster entrepreneurship and create job opportunities.</p>
            <p className="mb-4">His vision includes factory revival and the establishment of new factories to stimulate job creation. He has also received award recognition for entrepreneurship, highlighting his commitment to economic growth [Original Content].</p>
        </>
      )
  },
  community: {
      title: "Community Engagement and Social Support",
      content: (
        <>
            <p className="mb-4">Community welfare and social cohesion are central to Dr. Nyarku's mandate, reflected in various social support programs and engagement activities.</p>
            <p className="mb-4">In a notable gesture, he donated three months’ salary to constituents in April 2021, primarily to traditional, religious, and opinion leaders, to support community development and job creation [Original Content]. He has also organized leadership summits and mentorship programs and funded youth sports development [Original Content].</p>
        </>
      )
  },
  planning: {
      title: "Strategic Planning and Vision",
      content: (
        <>
            <p className="mb-4">Dr. Nyarku's leadership is characterized by a long-term strategic vision for Cape Coast North.</p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Cape Coast 8-Year Development Plan (2025-2033)</h3>
            <p className="mb-4">In collaboration with the Cape Coast Metropolitan Assembly, he launched the Cape Coast 8-Year Development Plan (2025-2033) on October 9, 2025. This non-partisan plan aims to transform Cape Coast by focusing on tourism, infrastructure, education, health, sanitation, and environmental sustainability. Dr. Nyarku has expressed concern over the city's haphazard development and advocates for intentional planning and the revival of neglected heritage sites.</p>
        </>
      )
  }
  // Add other themes (Health, Entrepreneurship, Community, Planning) here...
};
// --- End Data ---


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // New state to track the selected policy theme
  const [selectedPolicyTheme, setSelectedPolicyTheme] = useState<string | null>(null);

  // Function to navigate between main pages and policy details
  const handleNavigate = (page: string, theme: string | null = null) => {
    setCurrentPage(page);
    setSelectedPolicyTheme(theme);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };


  const renderPage = () => {
    // Check if we are on the policies page and a theme is selected
    if (currentPage === 'policies' && selectedPolicyTheme) {
      const detailContent = policyDetailsContent[selectedPolicyTheme];
      if (detailContent) {
        return (
          <PolicyDetail
            title={detailContent.title}
            content={detailContent.content}
            // Pass a function to go back to the main policies page
            onBack={() => handleNavigate('policies', null)}
          />
        );
      } else {
        // Fallback if theme content not found (optional)
         return <Policies onSelectTheme={(theme) => handleNavigate('policies', theme)} />;
      }
    }

    // Original page rendering logic
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'policies':
        // Pass the handleNavigate function to Policies for theme selection
        return <Policies onSelectTheme={(theme) => handleNavigate('policies', theme)} />;
      case 'events':
        return <Events />;
      case 'news':
        return <News />;
      case 'volunteer':
        return <Volunteer />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Pass handleNavigate to Header */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>{renderPage()}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;