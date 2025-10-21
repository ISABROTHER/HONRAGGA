import { useState } from 'react';
import { Menu, X, DollarSign } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    // HEADER BACKGROUND IS NOW DEEP RED
    <header className="sticky top-0 z-50 bg-red-700 shadow-xl transition-shadow relative border-b border-red-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with increased vertical padding (py-5) */}
        <div className="flex justify-between items-center py-5">
          {/* Logo/Branding Block */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 group-hover:shadow-lg transition-shadow">
              JD
            </div>
            <div className="hidden sm:block text-left">
              {/* Text color adjusted to white/light red for contrast */}
              <div className="text-xl font-extrabold text-white group-hover:text-red-200 transition-colors">Jane Doe</div>
              <div className="text-xs text-red-200 uppercase tracking-widest font-medium">For Senate 2026</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
                  currentPage === item.id
                    // Active state uses Blue for high contrast Primary accent
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/50' 
                    // Inactive state uses white/light red text and hover background
                    : 'text-red-100 hover:bg-red-600 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right-side CTAs and Toggles */}
          <div className="flex items-center space-x-4">
            {/* Primary CTA (Donate) - Button remains secondary/amber for contrast */}
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

            {/* Mobile Menu Toggle - Icon and border adjusted for contrast */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-full hover:bg-red-600 transition-colors border border-red-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown OVERLAY - Stays white inside for readability */}
      <div
        className={`md:hidden absolute inset-x-0 top-full w-full bg-white border-t border-gray-200 shadow-2xl overflow-hidden
          transition-all duration-[550ms] ease-in-out origin-top z-40
          ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
        `}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                block w-full text-left px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 group
                ${currentPage === item.id
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-gray-800 hover:bg-blue-50 focus:bg-blue-50 hover:text-blue-900' // Inner Mobile Menu items remain gray/blue for contrast against white overlay
                }
              `}
            >
              {/* Animated effect on text for mobile tap/hover */}
              <span className="inline-flex items-center space-x-3 transform transition-transform duration-150 group-hover:translate-x-1 group-focus:translate-x-1">
                {item.label}
              </span >
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
  );
}