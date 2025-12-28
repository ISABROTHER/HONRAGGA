// src/pages/About.tsx
import { User, BookOpen, Target, Award, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export function About() {
  // Updated to a more professional, formal portrait for better alignment with the page's tone
  const mpPortraitUrl = "https://via.placeholder.com/800x1000/1e3a8a/ffffff?text=Hon.+Dr.+Kwamena+Minta+Nyarku"; // Replace with actual formal portrait URL

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PROFILE HERO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <AnimatedSection delay={100}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-blue-100">
                <img
                  src={mpPortraitUrl}
                  alt="Hon. Dr. Kwamena Minta Nyarku"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-900 text-white px-8 py-10 rounded-3xl shadow-2xl hidden md:block max-w-xs">
                <p className="text-4xl font-black mb-2 italic leading-none">"Ragga"</p>
                <p className="text-blue-200 font-bold uppercase tracking-widest text-sm">People's Representative</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50 border border-blue-200">
                <User className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-black uppercase tracking-widest text-blue-800">Official Profile</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">
                Hon. Dr. Kwamena<br />
                <span className="text-blue-700">Minta Nyarku</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-2xl">
                An accomplished academic, visionary leader, and dedicated public servant. Affectionately known as "Ragga," Dr. Minta Nyarku embodies the hopes of Cape Coast North constituents for tangible, verifiable progress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-sm mb-2 tracking-wider">Current Position</h4>
                  <p className="text-lg font-bold text-blue-700">Member of Parliament</p>
                  <p className="text-sm text-slate-500">Cape Coast North Constituency</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase text-sm mb-2 tracking-wider">Primary Focus</h4>
                  <p className="text-lg font-bold text-blue-700">Economic Empowerment</p>
                  <p className="text-sm text-slate-500">Education & Skills Development</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* --- MISSION & VISION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <AnimatedSection delay={300}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Target className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight relative z-10">Our Mission</h2>
              <p className="text-lg lg:text-xl text-slate-300 leading-relaxed font-medium relative z-10">
                To transform Cape Coast North into a thriving hub of economic opportunity and educational excellence through transparent, accountable leadership and meaningful community engagement.
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-blue-700 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <BookOpen className="w-40 h-40" />
              </div>
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight relative z-10">The Vision</h2>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed font-medium relative z-10">
                A constituency where every youth is skilled and employable, every child has access to quality education, and every family enjoys sustainable prosperity.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* --- CORE VALUES --- */}
        <AnimatedSection delay={500}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">Core Principles</h2>
            <div className="w-32 h-2 bg-blue-700 mx-auto mt-6 rounded-full" />
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
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white border border-slate-200 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
                >
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Icon className="w-10 h-10 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-5 uppercase tracking-tight">{value.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-lg">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}