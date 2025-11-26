// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Home, User, BookOpen, Calendar, Newspaper, HandHeart, LogOut, LayoutDashboard, LogIn, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const logoBottomOffset = 2; 
  const logoVerticalAdjust = -1; 
  const logoLeftAdjust = 15; 

  const desktopNavGap = 16; 
  const desktopNavPaddingY = 8; 
  const desktopNavPaddingX = 16; 
  const desktopNavFontSize = 16; 

  // Desktop Navigation Items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'policies', label: 'Policies' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News' },
    { id: 'volunteer', label: 'Get Involved' },
    { id: 'admin', label: 'My Page' }, 
  ];

  // Mobile Menu Items (Settings & Share Removed)
  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'policies', label: 'Policies', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'news', label: 'News & Media', icon: Newspaper },
    { id: 'volunteer', label: 'Get Involved', icon: HandHeart },
  ];

  const handleNavClick = (pageId: string) => {
    // STRICTLY DISABLE NAVIGATION FOR ADMIN / MY PAGE
    if (pageId === 'admin') {
      return; 
    }
    
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  // Premium Animation Variants
  const menuVariants = {
    closed: {
      scale: 0.9,
      opacity: 0,
      borderBottomLeftRadius: "100%",
      borderTopLeftRadius: "100%",
      borderBottomRightRadius: "100%",
      transition: { type: "spring", stiffness: 300, damping: 35 }
    },
    open: {
      scale: 1,
      opacity: 1,
      borderBottomLeftRadius: "40px",
      borderTopLeftRadius: "40px",
      borderBottomRightRadius: "40px",
      transition: { 
        type: "spring", stiffness: 200, damping: 25,
        staggerChildren: 0.05, 
        delayChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className="flex justify-between items-center h-full">
            
            {/* === LOGO === */}
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
            </button>

            {/* === DESKTOP NAVIGATION === */}
            <div
              className="hidden md:flex items-center"
              style={{
                gap: `${desktopNavGap}px`,
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
                  } ${item.id === 'admin' ? 'border-2 border-red-100 hover:border-red-200 text-red-700 hover:text-red-800 cursor-default' : ''}`} 
                  style={{
                    padding: `${desktopNavPaddingY}px ${desktopNavPaddingX}px`,
                    fontSize: `${desktopNavFontSize}px`,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* === MOBILE MENU TOGGLE === */}
            <div className="md:hidden relative z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-4 border-white
                  ${mobileMenuOpen 
                    ? 'bg-[#CE1126] text-white rotate-90' 
                    : 'bg-[#CE1126] text-white hover:scale-105 active:scale-95'
                  }
                `}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7" strokeWidth={3} />
                ) : (
                  <Menu className="w-7 h-7" strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          {/* === CUSTOM DROPPING MOBILE MENU === */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="md:hidden absolute top-0 right-0 w-[300px] origin-top-right"
                style={{
                  top: '10px', 
                  right: '10px',
                  borderRadius: '40px', 
                  borderTopRightRadius: '70px' 
                }}
              >
                {/* THE CONTAINER: Solid NDC Red with Subtle Watermark */}
                <div className="
                  relative bg-[#CE1126]
                  pt-24 pb-8 px-6
                  shadow-2xl shadow-red-900/50
                  h-full w-full
                  overflow-hidden
                  border-4 border-white/20
                ">
                  
                  {/* Large Watermark (NDC Logo Style) */}
                  <div className="absolute -top-10 -left-20 w-64 h-64 text-white/5 pointer-events-none rotate-12">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                  </div>

                  {/* === HERO: MY PAGE LOGIN BUTTON (Compact) === */}
                  <motion.div variants={itemVariants} className="mb-6 relative z-10">
                    <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2 ml-1">Login to Your Dashboard</h3>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="
                        w-full bg-white text-[#CE1126] rounded-2xl p-3 shadow-lg
                        flex items-center justify-between group transform transition-all duration-200
                        hover:scale-[1.01] active:scale-95 cursor-default
                      "
                    >
                      <div className="text-left pl-1">
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="w-5 h-5 text-[#CE1126]" />
                          <span className="font-black text-lg tracking-tight">MY PAGE</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#CE1126]/10 flex items-center justify-center group-hover:bg-[#CE1126] group-hover:text-white transition-colors">
                         <LogIn className="w-4 h-4" strokeWidth={3} />
                      </div>
                    </button>
                  </motion.div>

                  {/* === NAVIGATION LIST === */}
                  <div className="flex flex-col space-y-3 relative z-10">
                    <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest ml-1">Menu</h3>
                    
                    {mobileNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      
                      return (
                        <motion.button
                          key={item.id}
                          variants={itemVariants}
                          onClick={() => handleNavClick(item.id)}
                          className={`
                            flex items-center justify-between px-5 py-3.5 rounded-xl w-full text-left transition-all duration-200 shadow-sm
                            ${isActive 
                              ? 'bg-white text-[#CE1126] font-extrabold translate-x-2' 
                              : 'bg-white/90 text-slate-800 font-semibold hover:bg-white hover:translate-x-1'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${isActive ? 'text-[#CE1126]' : 'text-slate-400'}`} />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </motion.button>
                      );
                    })}

                    {/* Sign Out Button (Bottom of list) */}
                    <motion.button 
                      variants={itemVariants}
                      className="flex items-center space-x-3 px-5 py-3.5 rounded-xl w-full text-left bg-black/20 hover:bg-black/30 text-white border border-white/10 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="w-5 h-5 opacity-70" />
                      <span className="text-xs tracking-wide font-bold uppercase">Sign Out</span>
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay for clicking outside */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[-1] md:hidden"
                style={{ top: `${headerHeight}px` }}
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </AnimatePresence>

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