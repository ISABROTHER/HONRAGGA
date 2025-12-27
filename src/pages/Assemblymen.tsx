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
        
        {/* --- TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-4 py-12 md:py-20 overflow-hidden">
            {/* Background Text for High-End Depth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <h2 className="text-[14vw] font-black text-slate-900/[0.03] uppercase tracking-tighter whitespace-nowrap">
                LEADERSHIP
              </h2>
            </div>
            
            {/* The Main Visible Heading */}
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

        {/* --- MP'S MESSAGE (SINGLE CARD - SIMPLE & EMBELLISHED) --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Users className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-2xl">
                    <img 
                      src={mpPortraitUrl} 
                      alt="Hon. Dr. Kwamena Minta Nyarku" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wider">My Ground Team</h3>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Hon. Dr. Kwamena Minta Nyarku, MP</p>
                  </div>
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-100">
                  "My Assembly Members are my dedicated partners on the ground. Together, we watch over every street and community, ensuring that your daily needs—from bright streetlights to clean drains—are met with speed and care. We work as one strong team to ensure your voice is heard and acted upon immediately."
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <ShieldCheck className="text-blue-400 w-5 h-5" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frontline Service • Grassroots Leadership</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- ASSEMBLY MEMBERS GRID (REVERTED TO CLASSIC EVEN SPACING) --- */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div
                key={member.zone}
                className="flex flex-col items-center text-center group bg-white border border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all duration-300"
              >
                {/* Image container using original 3/4 aspect ratio */}
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden rounded-lg mb-3 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-1/3"></div>
                </div>
                
                <div className="w-full">
                  {/* 1. TOWN/ZONE (Even spacing mb-1) */}
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  
                  {/* 2. NAME (Even spacing mb-1) */}
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  
                  {/* 3. NUMBER (Ghana Format, Even spacing) */}
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