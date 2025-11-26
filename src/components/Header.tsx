// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Home, User, BookOpen, Calendar, Newspaper, HandHeart, LogOut, Settings, Shield } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // === NUMERIC CONTROLS ===
  const headerHeightBase = 90;
  const headerScale = 1.1;
  const headerHeight = headerHeightBase * headerScale;

  const logoScale = 1.2;
  const logoTopOffset = 8;
  const logoLeftAdjust = 15;

  // Desktop Navigation Items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'policies', label: 'Policies' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News' },
    { id: 'volunteer', label: 'Get Involved' },
  ];

  // Mobile Menu Items with Icons for the new design
  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'policies', label: 'Policies', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'news', label: 'News & Media', icon: Newspaper },
    { id: 'volunteer', label: 'Get Involved', icon: HandHeart },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* === FIXED HEADER === */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-shadow"
        style={{
          height: `${headerHeight}px`,
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className="flex justify-between items-center h-full">
            
            {/* === LOGO === */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
              style={{
                position: 'relative',
                top: `${logoTopOffset}px`,
                left: `${logoLeftAdjust}px`,
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
            </button>

            {/* === DESKTOP NAVIGATION === */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-900 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* === MOBILE MENU TOGGLE (CUSTOM CIRCLE) === */}
            <div className="md:hidden relative z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
                  ${mobileMenuOpen 
                    ? 'bg-white text-purple-600 rotate-90' 
                    : 'bg-gradient-to-br from-purple-600 to-pink-500 text-white'
                  }
                `}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          {/* === CUSTOM DROPPING MOBILE MENU === */}
          {/* This mimics the "L-shape" / Droplet design from the image.
             It is absolutely positioned relative to the nav container.
          */}
          <div 
            className={`
              md:hidden absolute top-0 right-0 w-[280px] 
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right
              ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
            `}
            style={{
              // The shape is created by the container's background and rounded corners
              // We position it to start exactly where the toggle button is
              top: '10px', 
              right: '10px',
            }}
          >
            {/* THE BACKGROUND SHAPE:
              - A gradient container
              - Rounded heavily on bottom-left, bottom-right, top-left
              - Top-right is less rounded to merge with the toggle area visually
            */}
            <div className="
              relative bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-800
              text-white p-6 pt-20 pb-8
              shadow-2xl
              rounded-[2.5rem] rounded-tr-[3.5rem]
            ">
              
              {/* User Initials / Circle (Visual decoration matching the design) */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center pointer-events-none">
                {/* This sits behind the actual toggle button visually */}
                <span className="text-white font-bold text-sm">JD</span>
              </div>

              {/* Menu List */}
              <div className="flex flex-col space-y-3">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        flex items-center space-x-4 px-5 py-3.5 rounded-full w-full text-left transition-all
                        ${isActive 
                          ? 'bg-white text-purple-700 shadow-lg font-bold' 
                          : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm tracking-wide">{item.label}</span>
                    </button>
                  );
                })}
                
                {/* Decorative "Sign Out" style button (fake action for demo) */}
                <button 
                  className="flex items-center space-x-4 px-5 py-3.5 rounded-full w-full text-left bg-white/5 hover:bg-white/10 text-pink-100 mt-4 border border-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm tracking-wide">Close Menu</span>
                </button>
              </div>

            </div>
          </div>

          {/* Overlay for clicking outside */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] md:hidden"
              style={{ top: `${headerHeight}px` }}
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

        </nav>
      </header>

      {/* === MARQUEE === */}
      <div
        className="bg-red-600 h-5 overflow-hidden relative flex items-center"
        style={{ marginTop: `${headerHeight}px` }}
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
    </div>
  );
}