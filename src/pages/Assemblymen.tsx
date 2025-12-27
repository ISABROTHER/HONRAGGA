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
        
        {/* --- TOP SECTION: MP'S DIRECT MESSAGE (TWO COLUMNS RESTORED) --- */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 mt-4">
            
            {/* My Assemblymen Role */}
            <div className="bg-slate-900 rounded-xl p-8 md:p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Users className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center border border-white/10">
                    <Users className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wider">My Ground Team</h3>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Frontline Leadership</p>
                  </div>
                </div>
                <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                  "My Assembly Members are my eyes and ears in every corner of our constituency. They are the first people you turn to for local needs—from fixing streetlights to clearing drains. We work as one strong team to ensure your voice is heard and acted upon immediately."
                </p>
              </div>
            </div>

            {/* My Commitment as MP */}
            <div className="bg-white rounded-xl border border-gray-100 p-8 md:p-10 shadow-xl flex flex-col justify-between relative group">
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src={mpPortraitUrl} 
                      alt="Hon. Dr. Kwamena Minta Nyarku" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider">My Promise</h3>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-[0.3em]">Hon. Dr. Kwamena Minta Nyarku, MP</p>
                  </div>
                </div>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                  "I am dedicated to a vision of rapid transformation for Cape Coast North. Your progress is my personal priority, and I will not rest until our constituency stands as a beacon of development. Together, we are building a legacy of action."
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3 border border-green-100 mt-4">
                <ShieldCheck className="text-green-600 w-5 h-5 flex-shrink-0" />
                <p className="text-[11px] font-black text-green-800 uppercase tracking-widest">A Legacy of Service and Action</p>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* --- THE TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={100}>
          <div className="relative text-center mb-16 py-10">
            {/* Massive Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <h2 className="text-[12vw] font-black text-slate-900/5 uppercase tracking-tighter whitespace-nowrap">
                Constituency
              </h2>
            </div>
            
            {/* The Main Visible Heading */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full" />
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
        
        {/* --- ASSEMBLY MEMBERS GRID (TOWN -> NAME -> PHONE) --- */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div
                key={member.zone}
                className="flex flex-col items-center text-center group bg-white border border-gray-100 rounded-xl p-3 hover:shadow-2xl transition-all duration-300"
              >
                {/* Profile Image container */}
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden rounded-lg mb-3 relative">
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
                  
                  {/* 3. NUMBER */}
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