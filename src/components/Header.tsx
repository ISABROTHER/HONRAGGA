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
    <div className="relative w-full">
      {/* === MAIN HEADER (unchanged) === */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl transition-shadow relative">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Logo / Branding */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 group-hover:shadow-lg transition-shadow">
                JD
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

            {/* Desktop Navigation */}
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

            {/* Right-side CTAs */}
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

              {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu */}
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

      {/* === SCROLLING ANNOUNCEMENT BAR (fixed & robust) === */}
      <div className="bg-red-500 h-4 overflow-hidden relative">
        {/* marquee-track: duplicated content for smooth continuous scroll.
            A spacer element ensures the first visible text begins ~30% from left. */}
        <div
          className="marquee-track absolute top-0 left-0 h-full flex items-center"
          style={{ willChange: 'transform', alignItems: 'center' } as React.CSSProperties}
        >
          {/* spacer to create starting gap ~30% of viewport width */}
          <div style={{ minWidth: '30vw' }} />

          {/* content block duplicated for smooth loop */}
          <div className="marquee-content flex items-center whitespace-nowrap">
            <span
              className="border-r border-white pr-3 font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH
            </span>
            <span className="mx-3" style={{ width: '0.75rem' }}>—</span>
            <span
              className="font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              HON. DR. KWAMENA MINTA NYARKU
            </span>
            <span className="mx-3" style={{ width: '0.75rem' }}>—</span>
            <span
              className="font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Transparency • OBIARA KA HO
            </span>
            {/* small gap before duplicated copy */}
            <span style={{ paddingLeft: '2rem' }} />
          </div>

          {/* duplicate */}
          <div className="marquee-content flex items-center whitespace-nowrap" aria-hidden="true">
            <span
              className="border-r border-white pr-3 font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH
            </span>
            <span className="mx-3" style={{ width: '0.75rem' }}>—</span>
            <span
              className="font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              HON. DR. KWAMENA MINTA NYARKU
            </span>
            <span className="mx-3" style={{ width: '0.75rem' }}>—</span>
            <span
              className="font-serif font-bold text-white"
              style={{ fontSize: '0.5rem', fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Transparency • OBIARA KA HO
            </span>
            <span style={{ paddingLeft: '3rem' }} />
          </div>
        </div>

        {/* Styles for marquee */}
        <style>{`
          /* full loop moves by 50% because content duplicated */
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee 60s linear infinite;
          }
          /* pause on hover for readability */
          .marquee-track:hover {
            animation-play-state: paused;
          }
          /* ensure the inner content displays inline and doesn't wrap */
          .marquee-content { display: inline-flex; gap: 0.5rem; padding-right: 1rem; }
        `}</style>
      </div>
    </div>
  );
}
