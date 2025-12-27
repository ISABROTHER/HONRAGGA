// src/pages/Assemblymen.tsx
import { Phone, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  // Helper to format phone number from +233 to 0
  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-2 pb-20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-10 py-8 md:py-14 overflow-hidden">
            {/* Massive Background Text for Depth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <h2 className="text-[12vw] font-black text-slate-900/5 uppercase tracking-tighter whitespace-nowrap">
                Constituency
              </h2>
            </div>
            
            {/* The Main Visible Heading */}
            <div className="relative flex flex-col items-center">
              {/* Removed "The 2026 Elite Team" badge and closed gap */}
              <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                ASSEMBLYMEN <br />
                <span className="text-blue-700">IN CAPE COAST NORTH</span>
              </h2>
              <p className="mt-4 text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.5em] ml-2">
                Grassroots Leadership • Verified Representatives
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- ASSEMBLY MEMBERS GRID (CLASSIC EVEN SPACING) --- */}
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
                  {/* 1. TOWN/ZONE */}
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  
                  {/* 2. NAME */}
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  
                  {/* 3. NUMBER (Ghana Format) */}
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