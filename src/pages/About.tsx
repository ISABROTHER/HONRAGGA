// src/pages/about/AboutHero.tsx
import React from 'react';

export function AboutHero() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.imgur.com/5H0XBuV.jpeg" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none animate-fade-in">
          ABOUT <span className="text-blue-500">ME.</span>
        </h1>
        
        {/* The lines: "Member of Parliament" and "Hon. Dr. Kwamena Minta Nyarku (Ragga)" have been removed from here */}
      </div>
      
      {/* Subtle Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-10" />
    </div>
  );
}