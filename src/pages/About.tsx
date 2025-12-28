// src/pages/About.tsx
import React from 'react';
import { User, Award } from 'lucide-react';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ORIGINAL PREMIUM HERO DESIGN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          
          {/* Left Side: Biography & Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">Biography</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                Hon. Dr. Kwamena Minta Nyarku is an academic, a visionary, and a dedicated servant of the people.
              </h2>
              
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Known affectionately as <span className="text-blue-700 font-black">"Ragga,"</span> Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
              </p>
              
              <p className="text-slate-500 leading-relaxed text-lg">
                With a background in advanced research and a heart for grassroots development, he has pioneered an agenda designed to turn Cape Coast North into an economic and educational powerhouse. His leadership is defined by empathy, accountability, and a relentless drive for results.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Academic Title</h4>
                <p className="text-sm font-bold text-slate-500 italic">Doctor of Philosophy (PhD)</p>
              </div>
            </div>
          </div>

          {/* Right Side: Portrait with Overlapping "Ragga" Badge */}
          <div className="relative group">
            {/* Decorative Background Glows */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
            
            {/* Main Image Frame */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={mpPortraitUrl} 
                alt="Hon. Dr. Kwamena Minta Nyarku" 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>

            {/* The Original Overlapping "Ragga" Badge */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl">
              <div className="relative z-10">
                <p className="text-4xl md:text-5xl font-black mb-1 italic tracking-tighter">"Ragga"</p>
                <div className="h-1 w-12 bg-blue-500 mb-3 rounded-full" />
                <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Verifiable Action</p>
              </div>
              <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* The following sections were removed as per your request:
            - Member of Parliament / NDC Titles
            - Welcome Message / Mission Statement
            - READ FULL PROFILE Button
            - Know Your Assemblymen CTA
            - Assemblymen Grid
        */}

      </div>

      {/* Global Animations Styles */}
      <style>{`
        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}