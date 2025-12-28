// src/pages/About.tsx
import React from 'react';
import { AboutHero } from './about/AboutHero';
import { AboutMP } from './about/AboutMP';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. The Hero Section */}
      <AboutHero />
      
      {/* 2. The Biography Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <AboutMP />
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