import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Scale } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Retained, though unused in the view

export function Footer() {
  // Removed unused state variables

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Privacy Policy', href: '#privacy', icon: Scale }, // Added Essential Link
    { label: 'FEC Disclosure', href: '#fec', icon: Scale },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* TOP SECTION: Contact, Social, and Legal Links - Consolidated into a single flex container for 2030 efficiency */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-800 pb-10 mb-10">
          
          {/* Brand/Contact Info (Primary Column) */}
          <div className="space-y-6 mb-8 lg:mb-0 max-w-md">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                JD
              </div>
              <div>
                <div className="text-xl font-bold">Jane Doe for Senate</div>
                <div className="text-sm text-gray-400">Campaign Headquarters</div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300">123 Campaign Trail, Suite 100, Washington, DC 20001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="tel:(555) 123-4567" className="text-gray-300 hover:text-white transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@janedoe2026.com" className="text-gray-300 hover:text-white transition-colors">info@janedoe2026.com</a>
              </li>
            </ul>
          </div>
          
          {/* Social Media and Quick Links (Secondary Action Block) */}
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12">
             {/* Quick Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-amber-400">Legal & Transparency</h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                       <Scale className="w-4 h-4 text-gray-500" />
                       <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
             
            {/* Social Icons */}
            <div>
                <h3 className="text-lg font-semibold mb-3 text-amber-400">Connect</h3>
                <div className="flex space-x-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      // Increased size and improved hover effect for premium feel
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-amber-500/80 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright and Paid For */}
        <div className="text-center">
          <div className="text-sm text-gray-400 leading-relaxed">
            &copy; {new Date().getFullYear()} Jane Doe for Senate. All rights reserved.
            <span className="block mt-1">
              Paid for by Jane Doe for Senate Committee.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}