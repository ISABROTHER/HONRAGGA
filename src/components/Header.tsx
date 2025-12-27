// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Home, User, Users, Calendar, MessageSquareWarning, HandHeart, LayoutDashboard, LogIn, ChevronRight, Vote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerHeightBase = 90; 
  const headerScale = 1.1; 
  const headerHeight = headerHeightBase * headerScale;

  const logoScale = 1.2; 
  const logoTopOffset = 8; 
  const logoVerticalAdjust = -1; 
  const logoLeftAdjust = 15; 

  const desktopNavGap = 16; 
  const desktopNavPaddingY = 8; 
  const desktopNavPaddingX = 16; 
  const desktopNavFontSize = 16; 

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'assemblymen', label: 'Assemblymen' }, // Renamed from Policies
    { id: 'events', label: 'Events' },
    { id: 'polls', label: 'Polls' },
    { id: 'issues', label: 'Report Issue' }, 
    { id: 'volunteer', label: 'Get Involved' },
    { id: 'admin', label: 'My Page' }, 
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'assemblymen', label: 'Assemblymen', icon: Users }, // Updated Icon
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'polls', label: 'Polls & Tracker', icon: Vote },
    { id: 'issues', label: 'Report Issue', icon: MessageSquareWarning },
    { id: 'volunteer', label: 'Get Involved', icon: HandHeart },
  ];

  const handleNavClick = (pageId: string) => {
    setMobileMenuOpen(false);
    if (pageId === 'admin') return; 
    onNavigate(pageId);
  };

  return (
    <div className="relative w-full">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
        style={{ height: `${headerHeight}px` }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className="flex justify-between items-center h-full">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
              style={{
                position: 'relative',
                top: `${logoTopOffset + logoVerticalAdjust}px`,
                left: `${logoLeftAdjust}px`,
              }}
            >
              <img
                src="https://i.imgur.com/1GfnCQc.png"
                alt="Logo"
                className="object-contain"
                style={{
                  height: `${headerHeight * 0.8 * logoScale}px`,
                  width: 'auto',
                  transform: `scale(${logoScale})`,
                }}
              />
            </button>

            <div className="hidden md:flex items-center" style={{ gap: `${desktopNavGap}px` }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-full font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-900 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                  } ${item.id === 'admin' ? 'border-2 border-red-100 text-red-700 cursor-default' : ''}`} 
                  style={{
                    padding: `${desktopNavPaddingY}px ${desktopNavPaddingX}px`,
                    fontSize: `${desktopNavFontSize}px`,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden relative z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-[#CE1126] text-white shadow-xl"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="md:hidden absolute top-[10px] right-[10px] w-[300px] origin-top-right bg-[#CE1126] pt-24 pb-6 px-6 shadow-2xl rounded-[40px] border-4 border-white/20"
              >
                <div className="flex flex-col space-y-2.5 relative z-10">
                  {mobileNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-xl w-full text-left transition-all ${
                        currentPage === item.id ? 'bg-white text-[#CE1126] font-extrabold translate-x-2' : 'bg-white/90 text-slate-800 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-[#CE1126]' : 'text-slate-400'}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {currentPage === item.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      
      <div className="bg-red-600 h-5 overflow-hidden relative flex items-center" style={{ marginTop: `${headerHeight}px` }}>
        <div className="marquee-track absolute top-0 left-0 h-full flex items-center whitespace-nowrap font-bold text-white text-[0.65rem] tracking-widest uppercase">
          <span>SUPPORT HON. RAGGA’S OPERATION 1000 DESKS FOR STUDENTS 'II' OBIARA KA HO 'II'</span>
        </div>
      </div>
      <style>{`.marquee-track { animation: marquee 42s linear infinite; } @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}