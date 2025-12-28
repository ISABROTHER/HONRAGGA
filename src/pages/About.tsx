// src/pages/About.tsx
import React from 'react';
import { User, BookOpen, Target, Award, Heart, ShieldCheck, Users, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ORIGINAL TOP 1% HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedSection delay={100}>
            <div className="relative">
              {/* Massive Background Text for Depth */}
              <div className="absolute -top-10 -left-10 select-none pointer-events-none opacity-[0.03]">
                <h2 className="text-[15vw] font-black leading-none uppercase">Ragga</h2>
              </div>
              
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={mpPortraitUrl} 
                  alt="Hon. Dr. Kwamena Minta Nyarku" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-8 rounded-2xl shadow-xl hidden md:block border-t-4 border-blue-600">
                <p className="text-3xl font-black mb-1 italic">"Ragga"</p>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">Verifiable Representative</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black uppercase tracking-widest text-blue-700">Official Profile</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">
                Hon. Dr. Kwamena <br />
                <span className="text-blue-700">Minta Nyarku</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                An Academic, a Visionary, and a dedicated servant of the people. Known affectionately as <span className="text-blue-700">"Ragga,"</span> Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Position</h4>
                  <p className="text-sm font-bold text-slate-500 italic">Member of Parliament</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Focus</h4>
                  <p className="text-sm font-bold text-slate-500 italic">Constituency Development</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <AnimatedSection delay={300}>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Target className="w-32 h-32" />
              </div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                To transform Cape Coast North into a hub of economic activity and educational excellence through transparent leadership and direct community engagement.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="bg-blue-700 rounded-[2.5rem] p-10 md:p-14 text-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <BookOpen className="w-32 h-32" />
              </div>
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">The Vision</h2>
              <p className="text-blue-100 text-lg leading-relaxed font-medium">
                Creating a constituency where every youth has a skill, every child has a desk, and every worker has a sustainable path to prosperity.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* --- LEADERSHIP TEAM GRID --- */}
        <AnimatedSection delay={500}>
          <div className="mb-12 border-b border-gray-100 pb-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Leadership Team</h2>
              <p className="text-slate-500 font-medium mt-2 uppercase text-[10px] tracking-widest">Grassroots Representatives</p>
            </div>
            <Users className="w-12 h-12 text-slate-200" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div key={member.zone} className="flex flex-col items-center text-center group bg-white border border-slate-100 rounded-2xl p-3 hover:shadow-xl transition-all duration-300">
                <div className="w-full aspect-[3/4] bg-slate-50 overflow-hidden rounded-xl mb-3 relative">
                  <img src={member.photoUrl} alt={member.assemblyman} className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="w-full">
                  <p className="text-[10px] font-black tracking-widest text-amber-600 uppercase mb-1">{member.zone}</p>
                  <p className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-2">{member.assemblyman}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}