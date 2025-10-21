import { useState } from 'react';
import { Menu, X, DollarSign, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
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

  // Quick Contact Info (from Footer)
  const contactInfo = [
    { icon: Phone, text: '(555) 123-4567', link: 'tel:+15551234567' },
    { icon: Mail, text: 'info@janedoe2026.com', link: 'mailto:info@janedoe2026.com' },
    { icon: MapPin, text: '123 Campaign Trail, Washington, DC', link: '#' },
  ];

  // Social Links (from Footer)
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
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
      {/* Main Navigation Bar (Visible on all sizes) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Branding Block */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group transition-transform hover:scale-[1.01] focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-blue-500/50 group-hover:shadow-lg transition-shadow">
              JD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors">Jane Doe</div>
              <div className="text-xs text-gray-600 uppercase tracking-widest font-medium">For Senate 2026</div>
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)} // Only opens the menu
              className="md:hidden p-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu OFF-CANVAS OVERLAY 
        - Fixed positioning for true overlay
        - Full screen height (h-screen)
        - Slide-in transition (translate-x) for top-tier UX
      */}
      <div
          className={`fixed inset-0 z-[100] transition-transform duration-500 ease-in-out md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } bg-white`}
          aria-hidden={!mobileMenuOpen}
          onClick={() => setMobileMenuOpen(false)} // Close on background click (optional, but good UX)
      >
        {/* Menu Content Container (Prevents closing when clicking inside menu) */}
        <div 
          className="w-full h-full max-w-sm ml-auto bg-white shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Header Bar */}
          <div className="flex justify-between items-center h-20 px-6 border-b border-gray-100 flex-shrink-0">
            {/* Logo/Branding inside menu */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div className="text-lg font-extrabold text-gray-900">Jane Doe</div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Navigation Links - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Primary CTA (Donate) */}
            <div className="pt-6">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleDonateClick}
                    className="w-full justify-center shadow-lg shadow-amber-500/50"
                >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Contribute Now
                </Button>
            </div>
          </div>

          {/* Footer/Quick Access - Fixed at bottom */}
          <div className="p-6 border-t border-gray-100 flex-shrink-0 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Quick Contact</h3>
            <ul className="space-y-3 text-sm mb-6">
              {contactInfo.map(({ icon: Icon, text, link }) => (
                <li key={text} className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-800 flex-shrink-0" />
                  <a href={link} className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-blue-900 text-white hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}