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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl transition-shadow relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with increased vertical padding (py-5) for height */}
        <div className="flex justify-between items-center py-5">

          {/* New Left-side Branding Block (Replicating Example Image Text Style) - Desktop/Mobile */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start space-y-0.5 group transition-transform hover:scale-[1.01] focus:outline-none"
          >
            {/* Top Line: Candidate Name (Bigger, Bold, Amber Accent) */}
            <div className="text-2xl font-extrabold text-amber-600 tracking-tight leading-none transition-colors">
              HON. DR. KWAMENA MINTA NYARKU
            </div>
            {/* Bottom Line: Constituency/Title (Smaller, Blue Accent) */}
            <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider leading-none">
              CAPE COAST NORTH MP
            </div>
          </button>
          
          {/* Right-side CTAs and Toggles - Re-using the desktop Donate Button for structure */}
          <div className="flex items-center space-x-4">
            
            {/* Primary CTA (Donate) - Desktop Only */}
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

            {/* Mobile Menu Toggle (Replicating the Menu Icon/Text Style) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              // Removed padding/border/hover effects for a cleaner, high-contrast mobile look (like the example)
              className="md:hidden flex flex-col items-center justify-center space-y-1 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-6 flex flex-col justify-between">
                {/* Replicating the three-bar menu icon using div lines */}
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
              </div>
              {/* Menu Label in Blue Accent Color */}
              <span className="text-sm font-semibold text-blue-900 pt-1">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>

            {/* Hidden Mobile Menu Close Button for Desktop */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`hidden ${mobileMenuOpen ? 'md:flex' : ''} p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-200`}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown OVERLAY */}
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
                  : 'text-gray-800 hover:bg-blue-50 focus:bg-blue-50 hover:text-blue-900' // High-fidelity tap/focus state
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