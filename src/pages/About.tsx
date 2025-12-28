// src/pages/About.tsx
import { User, BookOpen, Target, Award, Heart, ShieldCheck, Users, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <AnimatedSection delay={100}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">The People's Representative</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                HON. DR. KWAMENA <br />
                <span className="text-blue-700">MINTA NYARKU</span>
              </h1>
              
              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  An Academic, a Visionary, and a dedicated servant of the people. Known affectionately as <span className="text-blue-700 font-black">"Ragga,"</span> Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  With a background in advanced research and a heart for grassroots development, he has pioneered the **CETRA2030** agenda—a roadmap designed to turn Cape Coast North into an economic and educational powerhouse.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Current Office</h4>
                  <p className="text-sm font-bold text-slate-500 italic">Member of Parliament</p>
                </div>
                <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-1">Academic Title</h4>
                  <p className="text-sm font-bold text-slate-500 italic">Doctor of Philosophy (PhD)</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.01] transition-transform duration-700">
                <img 
                  src={mpPortraitUrl} 
                  alt="Hon. Dr. Kwamena Minta Nyarku" 
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-black mb-1 italic tracking-tighter">"Ragga"</p>
                  <div className="h-1 w-12 bg-blue-500 mb-3 rounded-full" />
                  <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Verifiable Action</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          <AnimatedSection delay={300}>
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white h-full relative overflow-hidden group border border-slate-800">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Target className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                To transform Cape Coast North into a hub of economic activity and educational excellence through transparent leadership.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="bg-blue-700 rounded-[3rem] p-10 md:p-16 text-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <BookOpen className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">The Vision</h2>
              <p className="text-blue-100 text-xl leading-relaxed font-medium">
                Creating a constituency where every youth has a skill and every child has a desk for a better future.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* --- LEADERSHIP TEAM (REINSTATED) --- */}
        <AnimatedSection delay={500}>
          <div className="mb-12 border-b border-gray-100 pb-6 flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Leadership Team</h2>
              <p className="text-slate-500 font-medium mt-2">Working together for the progress of our communities.</p>
            </div>
            <Users className="w-12 h-12 text-slate-200 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div key={member.zone} className="flex flex-col items-center text-center group bg-white border border-slate-100 rounded-2xl p-3 hover:shadow-xl transition-all duration-300">
                <div className="w-full aspect-[3/4] bg-slate-50 overflow-hidden rounded-xl mb-3 relative">
                  <img src={member.photoUrl} alt={member.assemblyman} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-widest text-amber-600 uppercase">{member.zone}</p>
                  <p className="text-sm font-black text-slate-900 leading-tight uppercase line-clamp-2">{member.assemblyman}</p>
                  <div className="pt-2">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-1 font-bold">
                      <Phone className="w-3 h-3 text-green-600" />
                      {member.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}