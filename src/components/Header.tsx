import { useState } from 'react';
import { Menu, X, DollarSign } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // === NUMERIC CONTROLS ===
  const headerHeightBase = 90; // 🔧 base height of header (px)
  const headerScale = 1.1; // 🔧 overall header scaling
  const headerHeight = headerHeightBase * headerScale;

  const logoScale = 1.2; // 🔧 logo scaling
  const logoTopOffset = 8; // 🔧 px from top
  const logoBottomOffset = 2; // 🔧 px from bottom
  const logoVerticalAdjust = -1; // 🔧 fine vertical (+down, -up)
  const logoLeftAdjust = 15; // 🔧 fine horizontal (+right, -left)

  // === NAVIGATION GLOBAL CONTROL ===
  // One control to manage all spacing + font scaling on both desktop and mobile.
  const navScale = 1.0; // 🔧 try 0.8 (smaller/tighter), 1.0 (default), 1.2 (larger/spaced)

  // --- Desktop ---
  // Horizontal & vertical spacing between nav items are proportional to navScale
  const desktopNavGap = 16 * navScale; // 🔧 horizontal gap between buttons
  const desktopNavPaddingY = 8 * navScale; // 🔧 top/bottom padding inside each button
  const desktopNavPaddingX = 16 * navScale; // 🔧 left/right padding
  const desktopNavFontSize = 16 * navScale; // 🔧 text size

  // --- Mobile ---
  // Vertical & horizontal spacing between stacked items scale with navScale
  const mobileNavGap = 0 * navScale; // 🔧 vertical spacing between stacked items
  const mobileNavPaddingY = 7 * navScale; // 🔧 top/bottom padding
  const mobileNavPaddingX = 10 * navScale; // 🔧 left/right padding
  const mobileNavFontSize = 14 * navScale; // 🔧 text size

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'policies', label: 'Policies' },
    { id: 'events', 'label': 'Events' },
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
          height: `${headerHeight}px`,
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* === LOGO (PRIMARY FLEX ITEM 1) === */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
              style={{
                position: 'relative',
                top: `${logoTopOffset + logoVerticalAdjust}px`,
                left: `${logoLeftAdjust}px`,
                bottom: `${logoBottomOffset}px`,
              }}
            >
              <div className="flex items-center">
                <img
                  src="https://i.imgur.com/1GfnCQc.png"
                  alt="Logo"
                  className="object-contain transition-transform duration-300"
                  style={{
                    height: `${headerHeight * 0.8 * logoScale}px`,
                    width: 'auto',
                    transform: `scale(${logoScale})`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
              {/* Removed "Jane Doe" and "For Senate 2026" as requested */}
            </button>

            {/* === NAVIGATION & CTA GROUP (PRIMARY FLEX ITEM 2) === */}
            <div className="flex items-center">
                
              {/* === DESKTOP NAVIGATION === */}
              <div
                className="hidden md:flex items-center"
                style={{
                  gap: `${desktopNavGap}px`, // ✅ horizontal spacing between items
                }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-full font-semibold transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/50'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                    }`}
                    style={{
                      padding: `${desktopNavPaddingY}px ${desktopNavPaddingX}px`,
                      fontSize: `${desktopNavFontSize}px`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* === RIGHT SIDE (Donate Button, Mobile Menu Toggle) === */}
              <div className="flex items-center space-x-4 pl-4 md:pl-8">
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
          </div>
        </nav>

        {/* === MOBILE MENU - RIGHT SIDE DRAWER (REVERTED) === */}
        <div
          // Reverted to fixed right-side drawer (w-64) with right-slide transition
          className={`fixed inset-y-0 right-0 w-64 h-full bg-green-900/[.98] overflow-y-auto transition-transform duration-[550ms] ease-in-out z-40 md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0, rgba(255, 255, 255, 0.05) 2px, transparent 2px, transparent 20px)',
            // Padding top to clear the fixed header area
            paddingTop: `${headerHeight + 20}px` 
          }}
        >
          {/* Close button for side drawer experience */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-green-300 transition-colors md:hidden"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div
            className="px-4 py-4 flex flex-col"
            style={{
              gap: `${mobileNavGap}px`, // ✅ vertical spacing between stacked items
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left rounded-xl font-semibold transition-all duration-200 group ${
                  currentPage === item.id
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'text-white hover:bg-green-700/80 focus:bg-green-700/80'
                }`}
                style={{
                  padding: `${mobileNavPaddingY}px ${mobileNavPaddingX}px`,
                  fontSize: `${mobileNavFontSize}px`,
                }}
              >
                {item.label}
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

      {/* === MARQUEE (Campaign Fixed) === */}
      <div
        className="bg-amber-500 h-5 overflow-hidden relative flex items-center"
        style={{ marginTop: `${headerHeight}px` }}
      >
        <div
          className="marquee-track absolute top-0 left-0 h-full flex items-center whitespace-nowrap font-bold text-white uppercase"
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
              JOIN THE MOVEMENT. VOLUNTEER OR DONATE TODAY!
            </span>
          </div>
          <div className="marquee-content flex items-center gap-4" aria-hidden="true">
            <span>
              JOIN THE MOVEMENT. VOLUNTEER OR DONATE TODAY!
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

      <div style={{ paddingTop: `${headerHeight + 20}px` }} />
    </div>
  );
}