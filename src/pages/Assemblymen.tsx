// src/pages/Assemblymen.tsx
import { Users, Phone, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  // Helper to format phone number from +233 to 0
  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pt-4 pb-24"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-12 py-12 md:py-20 overflow-hidden">
            {/* Background Text for High-End Depth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <h2 className="text-[14vw] font-black text-slate-900/[0.03] uppercase tracking-tighter whitespace-nowrap">
                LEADERSHIP
              </h2>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">The 2026 Elite Team</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                ASSEMBLYMEN <br />
                <span className="text-blue-700">IN CAPE COAST NORTH</span>
              </h2>
            </div>
          </div>
        </AnimatedSection>

        {/* --- MP'S REFINED MESSAGE (Simplified & Embellished) --- */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            
            {/* The Team Message */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Users className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-black text-blue-400 uppercase tracking-[0.4em] mb-6">The Frontline</h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-100">
                  "My Assembly Members are the eyes and ears of my mission. We work in absolute harmony to ensure every street, every drain, and every light reflects the standard of excellence I have set for our home."
                </p>
              </div>
            </div>

            {/* The Personal Promise */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                    <img 
                      src={mpPortraitUrl} 
                      alt="Hon. Dr. Kwamena Minta Nyarku" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">My Promise</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Hon. Dr. Kwamena Minta Nyarku, MP</p>
                  </div>
                </div>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                  "I am dedicated to a vision of rapid transformation. Your progress is my personal priority, and I will not rest until our constituency stands as the jewel of Cape Coast."
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                <ShieldCheck className="text-blue-600 w-5 h-5" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">A Legacy of Verifiable Action</p>
              </div>
            </div>

          </div>
        </AnimatedSection>
        
        {/* --- ELITE REPRESENTATIVE GRID (Profile Design) --- */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {LOCATIONS.map((member) => (
              <motion.div
                key={member.zone}
                whileHover={{ y: -10 }}
                className="flex flex-col group bg-white rounded-[2.5rem] border border-slate-100 p-4 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Profile Image - High-End Profile Look */}
                <div className="w-full aspect-[4/5] bg-slate-50 overflow-hidden rounded-[2rem] mb-6 relative shadow-inner">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  {/* Subtle Gradient Shadow on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Zone Tag Integrated into Profile Design */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 inline-block">
                      <p className="text-[9px] font-black tracking-[0.2em] text-blue-900 uppercase">
                        {member.zone}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-1 text-center">
                  <h4 className="text-sm md:text-lg font-black text-slate-900 leading-tight uppercase mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-700 transition-colors">
                    {member.assemblyman}
                  </h4>
                  
                  <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Phone className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                    <span className="text-[11px] md:text-sm font-black tabular-nums tracking-tighter">
                      {formatPhoneNumber(member.phone)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}