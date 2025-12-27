// src/pages/Assemblymen.tsx
import { Users, Phone, ShieldCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PAGE HERO --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Handshake className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Local Governance</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Assembly <span className="text-blue-700">Members.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg font-medium">
            Your local representatives working hand-in-hand with Hon. Ragga to ensure rapid development in every electoral area of Cape Coast North.
          </p>
        </div>

        {/* --- PARTNERSHIP SECTION --- */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* MP & Office Role */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-green-500/20">
                    <img src={mpPortraitUrl} alt="Hon. Dr. Kwamena Minta Nyarku" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase">Hon. Dr. Kwamena Minta Nyarku</h3>
                    <p className="text-xs font-bold text-green-600 tracking-widest uppercase mt-1">Member of Parliament</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  The MP's office acts as the central hub for constituency transformation. While major projects are secured at the national level, their effective execution depends on the grassroots collaboration with local representatives.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
                <ShieldCheck className="text-green-600 w-5 h-5" />
                <p className="text-[11px] font-black text-green-800 uppercase tracking-wider">Direct accountability for every project</p>
              </div>
            </div>

            {/* Assemblymen Role */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Electoral Area Reps</h3>
                    <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mt-1">Ground Force Representatives</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  Assembly Members are your first responders. From streetlights to sanitation, they manage the day-to-day welfare of each zone, feeding data back to the MP’s office to trigger rapid action.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 border border-white/10">
                <handshake className="text-blue-400 w-5 h-5" />
                <p className="text-[11px] font-black text-blue-100 uppercase tracking-wider">The frontline of community service</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* --- GRID OF MEMBERS --- */}
        <AnimatedSection delay={150}>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Local Representatives</h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Profiles across all electoral areas</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-black text-[10px] uppercase tracking-widest">
              {LOCATIONS.length} Active Members
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {LOCATIONS.map((member) => (
              <motion.div
                key={member.zone}
                whileHover={{ y: -5 }}
                className="flex flex-col group bg-white border border-slate-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-300 overflow-hidden relative"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                
                <div className="w-full aspect-[4/5] bg-slate-100 overflow-hidden rounded-2xl mb-5 relative z-10 shadow-inner">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    className="w-full py-3 bg-slate-50 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 text-blue-600 group-hover:text-white" />
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