// src/pages/About.tsx
import React from 'react';
import { User, Award, Phone, Users } from 'lucide-react';
import { LOCATIONS } from '../data/locations'; // Ensure this path is correct

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- 1. ABOUT HERO (Integrated) --- */}
      <div className="relative pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side: Bio Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">The People's Representative</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                Hon. Dr. Kwamena <br />
                <span className="text-blue-700">Minta Nyarku</span>
              </h1>
              
              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  An Academic, a Visionary, and a dedicated servant of the people. Known affectionately as <span className="text-blue-700 font-black">"Ragga,"</span> Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
                </p>
                <p className="text-slate-500 leading-relaxed text-lg">
                  With a background in advanced research and a heart for grassroots development, he has pioneered an agenda designed to turn Cape Coast North into an economic and educational powerhouse.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Position</h4>
                  <p className="text-sm font-bold text-slate-500 italic">Member of Parliament</p>
                </div>
                <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Title</h4>
                  <p className="text-sm font-bold text-slate-500 italic">PhD Holder</p>
                </div>
              </div>
            </div>

            {/* Right side: Portrait with "Ragga" Badge */}
            <div className="relative group">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.01] transition-transform duration-700">
                <img 
                  src={mpPortraitUrl} 
                  alt="Hon. Dr. Kwamena Minta Nyarku" 
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* The Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-black mb-1 italic tracking-tighter">"Ragga"</p>
                  <div className="h-1 w-12 bg-blue-500 mb-3 rounded-full" />
                  <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Verifiable Action</p>
                </div>
                <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. ASSEMBLYMEN GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 border-b border-gray-100 pb-6 flex items-center justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Leadership Team</h2>
            <p className="text-slate-500 font-medium mt-2 uppercase text-[10px] tracking-widest">Assembly Representatives</p>
          </div>
          <Users className="w-12 h-12 text-slate-200 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {LOCATIONS.map((member) => (
            <div key={member.zone} className="flex flex-col items-center text-center group bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-xl transition-all duration-300">
              <div className="w-full aspect-[3/4] bg-slate-50 overflow-hidden rounded-xl mb-3 relative">
                <img src={member.photoUrl} alt={member.assemblyman} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-1/3"></div>
              </div>
              <div className="w-full">
                <p className="text-[10px] font-black tracking-widest text-amber-600 uppercase mb-1">{member.zone}</p>
                <p className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">{member.assemblyman}</p>
                <p className="text-xs text-slate-500 flex items-center justify-center gap-1 font-bold">
                  <Phone className="w-3 h-3 text-green-600" />
                  <span>{formatPhoneNumber(member.phone)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. GLOBAL ANIMATIONS --- */}
      <style>{`
        .animate-section-enter { opacity: 1; transform: translateY(0); }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}