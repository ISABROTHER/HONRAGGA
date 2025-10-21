import { Facebook, Instagram, Mail, Phone, MessageSquare, Video, X } from 'lucide-react';
// Keeping Supabase import in case of future form re-introduction
import { supabase } from '../lib/supabase'; 

export function Footer() {
  // NOTE on Lucide Icons:
  // Video is used for TikTok (best semantic match for short-form video)
  // X is used for X (Twitter)
  // MessageSquare is used for WhatsApp (best semantic match for chat/messaging)
  
  const socialLinks = [
    { icon: Video, href: '#', label: 'TikTok' }, 
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: X, href: '#', label: 'X (Twitter)' }, 
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageSquare, href: '#', label: 'WhatsApp' }, 
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' }, 
  ];

  return (
    // Radically reduced vertical padding for ultra-compact height.
    <footer className="bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TOP ROW: Contact and Social Media - Compressed horizontally */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6 border-b border-gray-800 pb-6">
          
          {/* 1. Primary Contact Links - Clean, concise */}
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
          
          {/* 2. Social Media Block - Tightly packed, now featuring five platforms */}
          <div className="flex space-x-3 flex-shrink-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label} /* Added: Title attribute displays the name on hover/tap */
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Legal & Copyright - Tightly packed horizontal row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 space-y-3 sm:space-y-0">
          
          {/* Copyright - Single block */}
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Jane Doe for Senate. All rights reserved.
          </div>

          {/* Legal Links - Only Privacy Policy remains */}
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