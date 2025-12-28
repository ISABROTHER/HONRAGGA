// src/pages/About.tsx
import { User, BookOpen, Target, Award, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function About() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ORIGINAL PREMIUM HERO DESIGN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          
          {/* Left Side: Biography & Content */}
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
                  With a background in advanced research and a heart for grassroots development, he has pioneered the **CETRA2030** agenda—a roadmap designed to turn Cape Coast North into an economic and educational powerhouse in Ghana.
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

          {/* Right Side: Portrait with Overlapping Badge */}
          <AnimatedSection delay={200}>
            <div className="relative group">
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60" />
              
              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.01] transition-transform duration-700">
                <img 
                  src={mpPortraitUrl} 
                  alt="Hon. Dr. Kwamena Minta Nyarku" 
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* The Original Overlapping Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 text-white p-6 md:p-10 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative z-10">
                  <p className="text-4xl md:text-5xl font-black mb-1 italic tracking-tighter">"Ragga"</p>
                  <div className="h-1 w-12 bg-blue-500 mb-3 rounded-full" />
                  <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px]">Verifiable Action</p>
                </div>
                {/* Subtle watermark in badge */}
                <Award className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-white/5 pointer-events-none" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          <AnimatedSection delay={300}>
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">Our Mission</h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                To transform Cape Coast North into a hub of economic activity and educational excellence through transparent leadership and direct community engagement.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="bg-blue-700 rounded-[3rem] p-10 md:p-16 text-white h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <BookOpen className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">The Vision</h2>
              <p className="text-blue-100 text-xl leading-relaxed font-medium">
                Creating a constituency where every youth has a skill, every child has a desk, and every worker has a sustainable path to prosperity.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* --- CORE VALUES --- */}
        <AnimatedSection delay={500}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">Core Principles</h2>
            <div className="w-24 h-2 bg-blue-700 mx-auto mt-6 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "Accountability", 
                desc: "Every project and policy is backed by verifiable data and community feedback.", 
                icon: ShieldCheck,
                color: "blue"
              },
              { 
                title: "Education", 
                desc: "Prioritizing the tools of learning to secure the future of our next generation.", 
                icon: Award,
                color: "amber"
              },
              { 
                title: "Empathy", 
                desc: "Leadership that listens first and acts decisively for the vulnerable.", 
                icon: Heart,
                color: "rose"
              }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white border border-slate-50 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 text-center group">
                  <div className={`w-20 h-20 bg-${value.color}-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-10 h-10 text-${value.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{value.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}