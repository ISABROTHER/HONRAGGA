// src/pages/About.tsx
import { User, BookOpen, Target, Award, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function About() {
  // Reverted to the original portrait URL as requested
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PROFILE HERO (Elevated to top 1% design) --- */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
          {/* Subtle background accent for premium feel */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
          </div>

          <AnimatedSection delay={100}>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-8 ring-blue-100/50 transition-all duration-1000 group-hover:ring-blue-300/70">
                <img
                  src={mpPortraitUrl}
                  alt="Hon. Dr. Kwamena Minta Nyarku"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* "Ragga" badge – made more dynamic and prominent */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -right-8 bg-blue-900 text-white px-10 py-12 rounded-3xl shadow-2xl hidden md:block"
              >
                <p className="text-5xl font-black mb-3 italic leading-none">"Ragga"</p>
                <p className="text-blue-200 font-bold uppercase tracking-widest text-base">People's Representative</p>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-blue-100/80 backdrop-blur-sm border border-blue-200"
              >
                <User className="w-6 h-6 text-blue-800" />
                <span className="text-base font-black uppercase tracking-widest text-blue-900">Official Profile</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-none">
                Hon. Dr. Kwamena<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Minta Nyarku</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl">
                An Academic, a Visionary, and a dedicated servant of the people. Known affectionately as "Ragga," Dr. Minta Nyarku represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200"
                >
                  <h4 className="font-black text-slate-900 uppercase text-sm mb-3 tracking-wider">Position</h4>
                  <p className="text-2xl font-black text-blue-700">Member of Parliament</p>
                  <p className="text-base text-slate-500 mt-1">Cape Coast North</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200"
                >
                  <h4 className="font-black text-slate-900 uppercase text-sm mb-3 tracking-wider">Focus</h4>
                  <p className="text-2xl font-black text-blue-700">Economic Empowerment</p>
                  <p className="text-base text-slate-500 mt-1">Education & Community Development</p>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION (kept refined) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <AnimatedSection delay={300}>
            <motion.div whileHover={{ scale: 1.02, y: -8 }} className="bg-slate-900 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 opacity-15">
                <Target className="w-48 h-48" />
              </div>
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight relative z-10">Our Mission</h2>
              <p className="text-lg lg:text-xl text-slate-300 leading-relaxed font-medium relative z-10">
                To transform Cape Coast North into a thriving hub of economic opportunity and educational excellence through transparent, accountable leadership and meaningful community engagement.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <motion.div whileHover={{ scale: 1.02, y: -8 }} className="bg-blue-700 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 opacity-15">
                <BookOpen className="w-48 h-48" />
              </div>
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight relative z-10">The Vision</h2>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed font-medium relative z-10">
                A constituency where every youth is skilled and employable, every child has access to quality education, and every family enjoys sustainable prosperity.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* --- CORE VALUES (kept refined) --- */}
        <AnimatedSection delay={500}>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter">Core Principles</h2>
            <div className="w-40 h-2.5 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Accountability", desc: "Every initiative is transparent, measurable, and driven by community feedback.", icon: ShieldCheck },
              { title: "Excellence in Education", desc: "Equipping the next generation with world-class learning opportunities and skills.", icon: Award },
              { title: "Empathy & Service", desc: "Leadership that prioritizes the needs of the most vulnerable and listens deeply.", icon: Heart }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -12, scale: 1.05 }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 p-12 rounded-3xl shadow-2xl transition-all duration-500 text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-10">
                    <Icon className="w-12 h-12 text-blue-800" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">{value.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-xl">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}