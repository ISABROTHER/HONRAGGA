// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Home, User, BookOpen, Calendar, Newspaper, HandHeart, LogOut, Settings, HelpCircle, Share2 } from 'lucide-react';
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
  ];

  // Mobile Menu Items (More items added to show compactness)
  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'policies', label: 'Policies', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'news', label: 'News & Media', icon: Newspaper },
    { id: 'volunteer', label: 'Get Involved', icon: HandHeart },
    // Extra items can be added here easily now
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'share', label: 'Share App', icon: Share2 },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  // Animation Variants
  const menuVariants = {
    closed: {
      scale: 0,
      opacity: 0,
      borderBottomLeftRadius: "100%",
      borderTopLeftRadius: "100%",
      borderBottomRightRadius: "100%",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    open: {
      scale: 1,
      opacity: 1,
      borderBottomLeftRadius: "30px",
      borderTopLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      transition: { 
        type: "spring", stiffness: 300, damping: 30,
        staggerChildren: 0.03, 
        delayChildren: 0.05 
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
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

            {/* === MOBILE MENU TOGGLE === */}
            <div className="md:hidden relative z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white/30 backdrop-blur-md
                  ${mobileMenuOpen 
                    ? 'bg-white text-[#006B3F] rotate-90' 
                    : 'bg-[#006B3F] text-white'
                  }
                `}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={3} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={3} />
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
                className="md:hidden absolute top-0 right-0 w-[260px] origin-top-right"
                style={{
                  top: '12px', 
                  right: '12px',
                  // Smaller border radius for a tighter look
                  borderRadius: '30px 30px 30px 30px', 
                  borderTopRightRadius: '50px' 
                }}
              >
                {/* THE BACKGROUND SHAPE (Rich Green Gradient + Texture) */}
                <div className="
                  relative bg-gradient-to-b from-[#006B3F] via-[#00502F] to-black
                  text-white p-5 pt-20 pb-6
                  shadow-2xl shadow-black/60
                  h-full w-full
                  overflow-hidden
                  border border-white/10
                ">
                  
                  {/* Decorative texture overlay (The "Overlay Design") */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 pointer-events-none mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                  {/* User Initials / Circle */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 right-16 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner"
                  >
                    <span className="text-white font-black text-xs tracking-widest">NDC</span>
                  </motion.div>

                  {/* Welcome Text (Smaller) */}
                  <motion.div variants={itemVariants} className="mb-4 pl-1 relative z-10">
                    <h3 className="text-[10px] font-bold text-green-200 uppercase tracking-wider mb-0.5">Current User</h3>
                    <p className="text-xl font-black text-white tracking-tight drop-shadow-md">@Ragga</p>
                  </motion.div>

                  {/* Menu List (Compact) */}
                  <div className="flex flex-col space-y-1.5 relative z-10">
                    {mobileNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.id;
                      
                      return (
                        <motion.button
                          key={item.id}
                          variants={itemVariants}
                          onClick={() => handleNavClick(item.id)}
                          className={`
                            flex items-center space-x-3 px-4 py-2.5 rounded-xl w-full text-left transition-all duration-200 group
                            ${isActive 
                              ? 'bg-white text-[#006B3F] shadow-md font-bold scale-[1.02]' 
                              : 'bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm border border-white/5'
                            }
                          `}
                        >
                          <div className={`
                            p-1.5 rounded-full 
                            ${isActive ? 'bg-[#006B3F]/10 text-[#CE1126]' : 'bg-white/5 text-white group-hover:scale-110 transition-transform'}
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm tracking-wide font-medium">{item.label}</span>
                        </motion.button>
                      );
                    })}
                    
                    <div className="h-px w-full bg-white/10 my-2" />

                    {/* Close/Logout Action */}
                    <motion.button 
                      variants={itemVariants}
                      className="flex items-center space-x-3 px-4 py-2.5 rounded-xl w-full text-left bg-black/30 hover:bg-black/50 text-red-200 border border-white/5 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="p-1.5 bg-white/5 rounded-full">
                        <LogOut className="w-4 h-4" />
                      </div>
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
                className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[-1] md:hidden"
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