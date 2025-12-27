// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Home, User, Users, Calendar, MessageSquareWarning, HandHeart, LayoutDashboard, LogIn, ChevronRight, Vote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ currentPage, onNavigate }: { currentPage: string, onNavigate: (page: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerHeight = 99;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'assemblymen', label: 'Assemblymen' }, // Renamed
    { id: 'events', label: 'Events' },
    { id: 'polls', label: 'Polls' },
    { id: 'issues', label: 'Report Issue' }, 
    { id: 'volunteer', label: 'Get Involved' },
    { id: 'admin', label: 'My Page' }, 
  ];

  const handleNavClick = (pageId: string) => {
    setMobileMenuOpen(false);
    if (pageId === 'admin') return; 
    onNavigate(pageId);
  };

  return (
    <div className="relative w-full">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl" style={{ height: `${headerHeight}px` }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative flex justify-between items-center">
          <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3">
            <img src="https://i.imgur.com/1GfnCQc.png" alt="Logo" className="h-16 w-auto" />
          </button>
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavClick(item.id)} className={`rounded-full px-4 py-2 font-semibold transition-all ${currentPage === item.id ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-700 hover:text-blue-700'}`}>{item.label}</button>
            ))}
          </div>
          <div className="md:hidden relative z-50">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-14 h-14 rounded-full bg-[#CE1126] text-white flex items-center justify-center transition-all shadow-xl">
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}