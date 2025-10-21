import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
// Keeping Supabase import in case we reintroduce a form, but removing current usage.
import { supabase } from '../lib/supabase'; 

export function Footer() {
  // Removed state variables related to newsletter form (email, name, loading, message)

  // Removed handleNewsletterSubmit function

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Simplified grid layout to a single column for the Contact info, removing Newsletter column */}
        <div className="grid grid-cols-1 gap-8 mb-8 max-w-lg">
          
          {/* Contact Block - Centered and now the primary focus */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">123 Campaign Trail, Suite 100<br />Washington, DC 20001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">info@janedoe2026.com</span>
              </li>
            </ul>
          </div>

          {/* Removed: Newsletter Block */}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Jane Doe for Senate. All rights reserved.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Paid for by Jane Doe for Senate Committee.
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}