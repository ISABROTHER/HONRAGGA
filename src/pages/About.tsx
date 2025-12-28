// src/pages/About.tsx
import { User, BookOpen, Target, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PROFILE HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedSection delay={100}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={mpPortraitUrl} 
                  alt="Hon. Dr. Kwamena Minta Nyarku" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-3xl font-black mb-1 italic">"Ragga"</p>
                <p className="text-blue-200 font-bold uppercase tracking-widest text-xs">People's Representative</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black uppercase tracking-widest text-blue-700">Official Profile</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                Hon. Dr. Kwamena <br />
                <span className="text-blue-700">Minta Nyarku</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                An Academic, a Visionary, and a dedicated servant of the people. Known affectionately as "Ragga," Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-xs mb-1">Position</h4>
                  <p className="text-sm font-bold text-slate-500">Member of Parliament</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-xs mb-1">Focus</h4>
                  <p className="text-sm font-bold text-slate-500">Economic Empowerment</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION --- */}
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

        {/* --- CORE VALUES --- */}
        <AnimatedSection delay={500}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Core Principles</h2>
            <div className="w-20 h-1.5 bg-blue-700 mx-auto mt-4 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Accountability", desc: "Every project and policy is backed by verifiable data and community feedback.", icon: ShieldCheck },
              { title: "Education", desc: "Prioritizing the tools of learning to secure the future of our next generation.", icon: Award },
              { title: "Empathy", desc: "Leadership that listens first and acts decisively for the vulnerable.", icon: Heart }
            ].map((value, idx) => {
              const Icon = value.icon || Target;
              return (
                <div key={idx} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{value.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

// Simple fallback for the ShieldCheck icon since we used it in the values mapping
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}