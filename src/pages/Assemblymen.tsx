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
    <div className="min-h-screen bg-slate-50 pt-2 pb-20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING (MAINTAINED) --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-12 py-12 md:py-20 overflow-hidden">
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

        {/* --- MP'S MESSAGE (REVERTED TO PREVIOUS SIMPLE STYLE) --- */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* My Assemblymen Role */}
            <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">My Electoral Area Reps</h3>
                    <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mt-1">The frontline of our community service</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  My Assembly Members are your first point of contact for day-to-day community issues such as drains, streetlights, and sanitation. They work closely with my office to ensure your concerns are brought to my attention and handled with the urgency they deserve.
                </p>
              </div>
            </div>

            {/* My Commitment as MP */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500/20 bg-gray-100">
                    <img 
                      src={mpPortraitUrl} 
                      alt="Hon. Dr. Kwamena Minta Nyarku" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase">My Commitment to You</h3>
                    <p className="text-xs font-bold text-green-600 tracking-widest uppercase mt-1">Hon. Dr. Kwamena Minta Nyarku, MP</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  As your MP, I provide the strategic resources and coordinate the large-scale projects that drive our constituency forward. Every issue you report through this platform is reviewed by my technical team to ensure we deliver a rapid and effective response for our people.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="text-green-600 w-5 h-5" />
                <p className="text-[11px] font-black text-green-800 uppercase tracking-wider">I am directly accountable for our constituency's development</p>
              </div>
            </div>

          </div>
        </AnimatedSection>
        
        {/* --- ASSEMBLY MEMBERS GRID (REVERTED TO EVEN SPACING, NO PILLS) --- */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div
                key={member.zone}
                className="flex flex-col items-center text-center group bg-white border border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden rounded-lg mb-3 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-1/3"></div>
                </div>
                
                <div className="w-full">
                  {/* 1. TOWN/ZONE */}
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  
                  {/* 2. NAME */}
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  
                  {/* 3. NUMBER (REVERTED: NO PILL, SITS RIGHT UNDER NAME) */}
                  <p className="text-sm text-slate-800 flex items-center justify-center gap-2 font-bold">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{formatPhoneNumber(member.phone)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}