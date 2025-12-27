// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, Crosshair, MapPin, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [detectedZone, setDetectedZone] = useState<string | null>(null);

  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  const filteredMembers = useMemo(() => {
    return LOCATIONS.filter(
      (m) =>
        m.assemblyman.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLiveLocation = () => {
    setIsLocating(true);
    setDetectedZone(null);

    if (!navigator.geolocation) {
      alert("Precision locating is not supported.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
          setIsLocating(false);
          const matchedZone = "Abura"; // Simulated logic
          setDetectedZone(matchedZone);
          setSearchQuery(matchedZone);
        }, 2000);
      },
      () => {
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] pt-2 pb-20 selection:bg-blue-100"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ELITE HEADING SECTION --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center py-12 md:py-24 overflow-hidden">
            {/* Soft Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white shadow-sm border border-slate-100"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Precision Governance</span>
              </motion.div>
              
              <h2 className="text-5xl md:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8] mb-2">
                ASSEMBLY<span className="text-blue-700">MEN</span>
              </h2>
              <h3 className="text-xl md:text-3xl font-black text-slate-900/20 uppercase tracking-[0.3em]">
                Cape Coast North
              </h3>
            </div>
          </div>
        </AnimatedSection>

        {/* --- THE COMMAND HUB (INNOVATIVE UI) --- */}
        <div className="max-w-2xl mx-auto mb-20 relative z-30">
          <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-3">
            <div className="relative flex items-center">
              {/* Intelligent Search Icon */}
              <div className="absolute left-6">
                <Search className={`w-5 h-5 transition-colors duration-300 ${searchQuery ? 'text-blue-600' : 'text-slate-300'}`} />
              </div>

              {/* Ultra-Modern Input */}
              <input 
                type="text"
                placeholder="Find your representative..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-32 py-5 bg-transparent font-bold text-lg md:text-xl text-slate-900 outline-none placeholder:text-slate-200"
              />

              {/* Integrated Radar Button */}
              <button 
                onClick={handleLiveLocation}
                className="absolute right-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 group overflow-hidden shadow-xl"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </div>
                )}
                <span className="hidden md:inline">{isLocating ? 'Scanning...' : 'Live Location'}</span>
                <Crosshair className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Result Metadata Display */}
          <div className="mt-6 flex justify-between items-center px-8">
            <div className="flex gap-4">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                 {filteredMembers.length} Representatives Found
               </span>
            </div>
            <AnimatePresence>
              {detectedZone && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <MapPin className="w-3 h-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Zone: {detectedZone}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- THE GRID (CLEAN CLASSIC ARRANGEMENT) --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredMembers.map((member) => (
              <motion.div
                layout
                key={member.zone}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex flex-col items-center text-center p-4 rounded-[2rem] transition-all duration-500 ${
                  detectedZone === member.zone 
                  ? 'bg-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.3)]' 
                  : 'bg-white border border-slate-50 hover:shadow-2xl hover:shadow-slate-200'
                }`}
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                  {detectedZone === member.zone && (
                    <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay" />
                  )}
                </div>

                <div className="w-full">
                  <p className={`text-[10px] font-black tracking-[0.2em] uppercase mb-1 ${detectedZone === member.zone ? 'text-blue-100' : 'text-amber-600'}`}>
                    {member.zone}
                  </p>
                  <p className={`text-sm md:text-base font-black uppercase leading-tight line-clamp-2 mb-2 ${detectedZone === member.zone ? 'text-white' : 'text-slate-900'}`}>
                    {member.assemblyman}
                  </p>
                  <div className={`flex items-center justify-center gap-2 font-bold text-xs md:text-sm ${detectedZone === member.zone ? 'text-blue-50' : 'text-slate-500'}`}>
                    <Phone className={`w-3.5 h-3.5 ${detectedZone === member.zone ? 'text-white' : 'text-green-600'}`} />
                    <span>{formatPhoneNumber(member.phone)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-40">
            <h3 className="text-2xl font-black text-slate-200 uppercase tracking-widest">No matching results</h3>
          </div>
        )}

      </div>
    </div>
  );
}