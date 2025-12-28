// src/pages/Achievements.tsx
import React from 'react';
import { 
  Award, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function Achievements() {
  const achievements = [
    {
      title: "CETRA2030 Agenda",
      desc: "Our primary roadmap for economic growth and constituency transformation.",
      icon: Target,
      status: "Active Implementation",
      color: "blue"
    },
    {
      title: "Infrastructure Milestones",
      desc: "Successfully completed market renovations and town road rehabilitations.",
      icon: TrendingUp,
      status: "Verified",
      color: "emerald"
    },
    {
      title: "Educational Support",
      desc: "Distributed over 1,000 desks and provided scholarships to STEM students.",
      icon: Award,
      status: "Completed",
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Track Record of Excellence</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Our <span className="text-blue-700">Achievements.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg font-medium leading-relaxed">
            A comprehensive record of promises kept, policies implemented, and the tangible impact made across Cape Coast North.
          </p>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((item, idx) => (
            <AnimatedSection key={idx} delay={idx * 100}>
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-6`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium mb-6 flex-grow">{item.desc}</p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest text-${item.color}-600 bg-${item.color}-50 px-3 py-1 rounded-full`}>
                    {item.status}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CETRA2030 Specific Section */}
        <AnimatedSection delay={300}>
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Zap className="w-64 h-64 text-blue-400" />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase tracking-tight">
                The <span className="text-blue-400">CETRA2030</span> Implementation
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
                Our economic blueprint is not just a document; it's a living achievement. We are currently implementing Phase 2 focusing on job hubs and agricultural processing.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-3xl font-black text-blue-400 mb-1">85%</div>
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Target Alignment</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-3xl font-black text-blue-400 mb-1">24/7</div>
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Active Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}