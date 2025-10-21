import { useState } from 'react';
import { Menu, X, DollarSign } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // === CONTROL SETTINGS ===
  const logoScale = 1.0; // 🔧 change to enlarge/shrink logo (1.2 = 20% bigger)
  const logoOffset = -3; // 🔧 move logo up/down (negative = up, positive = down, in pixels)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'policies', label: 'Policies' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News' },
    { id: 'volunteer', label: 'Get Involved' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleDonateClick = () => {
    onNavigate('volunteer');
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* === FIXED HEADER === */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl transition-shadow"
        style={{
          height: '4.5rem',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* === LOGO & NAME === */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
            >
              <div className="flex items-center">
                <img
                  src="https://i.imgur.com/1GfnCQc.png"
                  alt="Logo"
                  className="object-contain transition-transform duration-300"
                  style={{
                    height: `${58 * logoScale}px`,
                    width: 'auto',
                    transform: `translateY(${logoOffset}px) scale(${logoScale})`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">
                  Jane Doe
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium">
                  For Senate 2026
                </div>
              </div>
            </button>

            {/* === DESKTOP NAVIGATION === */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* === RIGHT SIDE === */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDonateClick}
                  className="group shadow-amber-500/50 hover:shadow-amber-500/70"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </div>

              {/* === MOBILE MENU TOGGLE === */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* === MOBILE MENU === */}
        <div
          className={`md:hidden absolute inset-x-0 top-full w-full bg-white border-t border-gray-200 shadow-2xl overflow-hidden transition-all duration-[550ms] ease-in-out origin-top z-40 ${
            mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 group ${
                  currentPage === item.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-gray-800 hover:bg-blue-50 focus:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <span className="inline-flex items-center space-x-3 transform transition-transform duration-150 group-hover:translate-x-1 group-focus:translate-x-1">
                  {item.label}
                </span>
              </button>
            ))}
            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={handleDonateClick}
                className="w-full justify-center shadow-lg shadow-amber-500/50"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* === MINI SCROLLING HEADER === */}
      <div
        className="bg-red-600 h-5 overflow-hidden relative flex items-center"
        style={{ marginTop: '4.5rem' }}
      >
        <div
          className="marquee-track absolute top-0 left-0 h-full flex items-center whitespace-nowrap font-bold text-white"
          style={{
            willChange: 'transform',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
          }}
        >
          <div style={{ minWidth: '25vw' }} />

          <div className="marquee-content flex items-center gap-4">
            <span>
              SUPPORT HON. RAGGA’S OPERATION 1000 DESKS FOR STUDENTS 'II' OBIARA KA HO 'II'
            </span>
          </div>

          <div className="marquee-content flex items-center gap-4" aria-hidden="true">
            <span>
              SUPPORT HON. RAGGA’S OPERATION 1000 DESKS FOR STUDENTS 'II' OBIARA KA HO 'II'
            </span>
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee 42s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      {/* === TOP SPACER === */}
      <div style={{ paddingTop: '5rem' }} />
    </div>
  );
}
