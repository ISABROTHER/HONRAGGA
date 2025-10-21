import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Policies', href: '#policies' },
    { name: 'Events', href: '#events' },
    { name: 'News', href: '#news' },
    { name: 'Get Involved', href: '#volunteer' },
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap py-2 text-white font-bold text-sm tracking-wider">
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
          <span className="inline-block px-8">★ TOP ONE PERCENT ★</span>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>

      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                JD
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">Jane Doe</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">For Senate 2026</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
