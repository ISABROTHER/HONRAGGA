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
        {/* Container with increased vertical padding (py-5) */}
        <div className="flex justify-between items-center py-5">

          {/* DYNAMIC BRANDING BLOCK */}
          <button
            onClick={() => handleNavClick('home')}
            // Mobile: Constrains the button width to 60% of the header's available space
            className="group transition-transform hover:scale-[1.01] focus:outline-none w-3/5 md:w-auto" 
          >
            {/* MOBILE BRANDING (Default/Below md) - New High-Contrast Style
              - Hidden on medium screens and up (md:hidden)
              - items-start ensures left alignment
            */}
            <div className="flex flex-col items-start space-y-0.5 md:hidden w-full">
              {/* Top Line: Title (Smaller, Blue) - First Element */}
              <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider leading-none">
                CAPE COAST NORTH MP
              </div>
              {/* Bottom Line: Candidate Name (Bigger, Amber) - Second Element */}
              <div className="text-xl font-extrabold text-amber-600 tracking-tight leading-none transition-colors break-words">
                HON. DR. KWAMENA MINTA NYARKU
              </div>
            </div>

            {/* DESKTOP BRANDING (md:block) - Original Logo-Centric Style
              - Visible only on medium screens and up (hidden on mobile)
            */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 group-hover:shadow-lg transition-shadow flex-shrink-0">
                JD
              </div>
              <div className="text-left">
                <div className="text-xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">Jane Doe</div>
                <div className="text-xs text-gray-600 uppercase tracking-widest font-medium">For Senate 2026</div>
              </div>
            </div>
          </button>
          
          {/* Desktop Navigation (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/50' // Pill-shaped active state with strong shadow
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right-side CTAs and Toggles */}
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

            {/* Mobile Menu Toggle (Only visible on mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center space-y-1 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-6 flex flex-col justify-between">
                {/* Replicating the three-bar menu icon using div lines, color is Amber Accent */}
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
                <span className="block w-full h-1 bg-amber-600 rounded-full transition-all duration-300 transform" />
              </div>
              {/* Menu Label in Blue Accent Color */}
              <span className="text-sm font-semibold text-blue-900 pt-1">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
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