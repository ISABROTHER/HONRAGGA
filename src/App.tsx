import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Policies } from './pages/Policies';
import { Events } from './pages/Events';
import { News } from './pages/News';
import { Volunteer } from './pages/Volunteer';
import { Admin } from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'policies':
        return <Policies />;
      case 'events':
        return <Events />;
      case 'news':
        return <News />;
      case 'volunteer':
        return <Volunteer />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    // Removed ThemeProvider and locked background to white
    <div className="min-h-screen bg-white transition-colors">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;