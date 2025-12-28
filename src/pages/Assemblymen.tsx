// src/pages/Assemblymen.tsx
import { Users, Phone, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Handshake className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Grassroots Leadership</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Assembly <span className="text-blue-700">Members.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg font-medium">
            Your local representatives working in perfect synergy with Hon. Dr. Kwamena Minta Nyarku to transform every corner of Cape Coast North.
          </p>
        </div>

        {/* Roles Section */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-green-500/20">
                    <img src={mpPortraitUrl} alt="Hon. Ragga" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase">Office of the MP</h3>
                    <p className="text-xs font-bold text-green-600 tracking-widest uppercase mt-1">Strategic Hub</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  All issues submitted on this platform are received by the MP's office. Some matters are handled directly; others are delivered through Assembly Members for local action.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Electoral Area Reps</h3>
                    <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mt-1">Frontline Service</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  Assembly Members are the first point of contact for day-to-day community issues such as drains, streetlights, and sanitation.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Members Grid */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <motion.div
                key={member.zone}
                whileHover={{ y: -5 }}
                className="flex flex-col bg-white border border-slate-100 rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
              >
                <div className="w-full aspect-[4/5] bg-slate-100 overflow-hidden rounded-2xl mb-5 shadow-inner">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="relative z-10">
                  <p className="text-[10px] font-black tracking-[0.25em] text-blue-600 uppercase mb-2">
                    {member.zone}
                  </p>
                  <h4 className="text-sm md:text-lg font-black text-slate-900 leading-[1.1] uppercase min-h-[3rem] mb-4">
                    {member.assemblyman}
                  </h4>
                  <a 
                    href={`tel:${member.phone}`}
                    className="w-full py-3 bg-slate-50 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-xs md:text-sm font-black tabular-nums">{member.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}