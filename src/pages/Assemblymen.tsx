// src/pages/Assemblymen.tsx
import { Users, Phone, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP SECTION: PARTNERSHIP & ROLES (Frontline of community service) --- */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* Assemblymen Role - NOW FIRST */}
            <div className="bg-slate-900 rounded-xl p-8 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Electoral Area Reps</h3>
                    <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mt-1">The frontline of community service</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  Assembly Members are the first point of contact for day-to-day community issues such as drains, streetlights, and sanitation. They work closely with the MP's office.
                </p>
              </div>
            </div>

            {/* MP & Office Role */}
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
                    <h3 className="text-xl font-black text-slate-900 leading-tight uppercase">Hon. Dr. Kwamena Minta Nyarku</h3>
                    <p className="text-xs font-bold text-green-600 tracking-widest uppercase mt-1">Member of Parliament</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium mb-4 text-sm md:text-base">
                  The MP's office provides strategic resources and coordinates large-scale projects. All issues reported are reviewed by the MP's technical team for rapid response.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="text-green-600 w-5 h-5" />
                <p className="text-[11px] font-black text-green-800 uppercase tracking-wider">Direct accountability for constituency development</p>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* --- ASSEMBLY MEMBERS GRID --- */}
        <AnimatedSection delay={120}>
          <div className="mb-10 border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">
              ASSEMBLYMEN IN CAPE COAST NORTH
            </h3>
          </div>
          
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
                  {/* 1. TOWN/ZONE (Even distance mb-1) */}
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  
                  {/* 2. NAME (Even distance mb-1) */}
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  
                  {/* 3. NUMBER (Even distance, right under name) */}
                  <p className="text-sm text-slate-800 flex items-center justify-center gap-1.5 font-bold">
                    <Phone className="w-3.5 h-3.5 text-green-600" />
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