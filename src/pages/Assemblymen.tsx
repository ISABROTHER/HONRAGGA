// src/pages/Assemblymen.tsx
import { Users, Phone, ShieldCheck, Handshake, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <div className="min-h-screen bg-[#FDFDFF] pt-32 pb-24 md:pt-40">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[30%] bg-amber-50/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- PREMIUM HERO --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-6"
          >
            <Handshake className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-sans">Grassroots Leadership</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
            Assembly <span className="text-blue-700">Members.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed px-4">
            Meet the dedicated local representatives working in perfect synergy with <span className="text-slate-900 font-bold">Hon. Dr. Kwamena Minta Nyarku</span> to transform every corner of Cape Coast North.
          </p>
        </div>

        {/* --- PARTNERSHIP DYNAMICS --- */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-24">
            {/* MP Strategic Hub */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/40 flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-blue-900" />
              </div>
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-3">
                    <img src={mpPortraitUrl} alt="Hon. Ragga" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight uppercase">Office of the MP</h3>
                    <p className="text-xs font-black text-blue-600 tracking-widest uppercase mt-1">Strategic Hub</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-lg">
                  Major constituency interventions are secured here. However, our impact is maximized by the eyes and ears on the ground—your Assembly Members—who ensure national resources meet local needs perfectly.
                </p>
              </div>
            </motion.div>

            {/* Assemblymen Frontline */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-32 h-32 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/20 flex items-center justify-center border border-white/10 -rotate-3">
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tight">Electoral Area Reps</h3>
                    <p className="text-xs font-black text-blue-400 tracking-widest uppercase mt-1">The Frontline</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium text-sm md:text-lg">
                  From sanitation to streetlights, these leaders are your first point of contact. They work 24/7 to monitor community welfare and trigger rapid action from the MP's technical teams.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* --- REPRESENTATIVE GRID --- */}
        <AnimatedSection delay={150}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-200 pb-8 px-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Local Leadership</h2>
              <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-[0.2em] mt-2">Verified representatives by Electoral Area</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Find your area..." className="bg-transparent border-none text-sm font-bold focus:ring-0 placeholder:text-slate-400 w-40" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
            {LOCATIONS.map((member) => (
              <motion.div
                key={member.zone}
                whileHover={{ y: -8 }}
                className="group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 relative"
              >
                <div className="w-full aspect-[4/5] bg-slate-50 overflow-hidden rounded-[2rem] mb-6 relative shadow-inner">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="relative px-2 pb-2">
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-3">
                    {member.zone}
                  </div>
                  
                  <h4 className="text-base md:text-xl font-black text-slate-900 leading-tight uppercase mb-6 min-h-[3rem] group-hover:text-blue-700 transition-colors">
                    {member.assemblyman}
                  </h4>
                  
                  <a 
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-between w-full py-4 px-6 bg-slate-50 rounded-[1.5rem] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-600 group-hover:text-white" />
                      <span className="text-xs md:text-sm font-black tabular-nums">{member.phone}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
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