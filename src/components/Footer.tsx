import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
// Keeping Supabase import in case of future form re-introduction
import { supabase } from '../lib/supabase'; 

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' }, 
    { label: 'FEC Disclosure', href: '#fec' },
  ];

  return (
    // Radically reduced vertical padding from py-16 to py-8 for ultra-compact height.
    <footer className="bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TOP ROW: Branding, Direct Contact, and Social Media - All compressed horizontally */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6 border-b border-gray-800 pb-6">
          
          {/* 1. Branding & Primary Contact Links - Condensed */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            {/* Logo kept small and sleek */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
              JD
            </div>

            {/* Direct Action Links (Email/Phone) - Very compact, text-only for small screens */}
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 text-sm font-medium">
              <a href="mailto:info@janedoe2026.com" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 hidden sm:inline" />
                <span>info@janedoe2026.com</span>
              </a>
              <a href="tel:(555) 123-4567" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 hidden sm:inline" />
                <span>(555) 123-4567</span>
              </a>
            </div>
          </div>
          
          {/* 2. Social Media Block - Tightly packed */}
          <div className="flex space-x-3 flex-shrink-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Legal & Copyright - Tightly packed horizontal row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 space-y-3 sm:space-y-0">
          
          {/* Copyright and Disclosure - Single block */}
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Jane Doe for Senate. All rights reserved. | Paid for by Jane Doe for Senate Committee.
          </div>

          {/* Legal Links - Tightly packed horizontal list */}
          <ul className="flex space-x-4">
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="hover:text-white transition-colors font-semibold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}