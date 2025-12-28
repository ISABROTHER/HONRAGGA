// src/pages/About.tsx
import React from 'react';
import { AboutHero } from './about/AboutHero';
import { AboutMP } from './about/AboutMP';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. THE HERO SECTION */}
      {/* Ensure AboutHero.tsx is updated to remove the MP titles/NDC text */}
      <AboutHero />
      
      {/* 2. THE BIOGRAPHY SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <AboutMP />
        
        {/* All specific text blocks like "Apewosika", "READ FULL PROFILE", 
            and "Know Your Assemblymen" have been removed from the 
            AboutMP and AboutAssemblymen sub-components. */}
      </div>

      {/* Global Animations Styles */}
      <style>{`
        .animate-section-enter {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}