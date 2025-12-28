// src/pages/About.tsx
import React from 'react';
import { User } from 'lucide-react';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40 grayscale">
          <img 
            src={mpPortraitUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase animate-fade-in">
            ABOUT <span className="text-blue-500">ME.</span>
          </h1>
        </div>
      </div>
      
      {/* --- BIOGRAPHY SECTION --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-8">
          <div className="prose prose-slate max-w-none">
            {/* Minimalist Biography Header */}
            <div className="inline-flex items-center gap-2 mb-8 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <User className="w-4 h-4" />
              <span>Biography</span>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-black uppercase tracking-tight">
                Hon. Dr. Kwamena Minta Nyarku is an academic, a visionary, and a dedicated servant of the people.
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Known affectionately as "Ragga," he represents the aspiration of every constituent in Cape Coast North for real, verifiable progress. With a background in advanced research and a heart for grassroots development, he has pioneered an agenda designed to turn Cape Coast North into an economic and educational powerhouse. 
              </p>

              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                His leadership is defined by empathy, accountability, and a relentless drive for results, ensuring that the voice of every citizen is translated into meaningful action.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Animations Styles */}
      <style>{`
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