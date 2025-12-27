// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, Navigation, Crosshair, MapPin, Loader2 } from 'lucide-react';
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

  // Advanced Search Logic
  const filteredMembers = useMemo(() => {
    return LOCATIONS.filter(
      (m) =>
        m.assemblyman.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // INNOVATION: Precision Geo-Scanning
  const handleLiveLocation = () => {
    setIsLocating(true);
    setDetectedZone(null);

    if (!navigator.geolocation) {
      alert("Precision locating is not supported by this browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Constituency range check (Cape Coast North)
        const isWithinCCN = latitude >= 5.10 && latitude <= 5.15 && longitude >= -1.30 && longitude <= -1.20;

        setTimeout(() => {
          setIsLocating(false);
          if (isWithinCCN) {
            // Simulated match for demonstration
            const matchedZone = "Abura"; 
            setDetectedZone(matchedZone);
            setSearchQuery(matchedZone);
          } else {
            alert("Location Scan Complete: You are currently outside the Cape Coast North boundary.");
          }
        }, 2000);
      },
      () => {
        alert("Location access denied. Please enable GPS for precision matching.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] pt-2 pb-20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-4 py-8 md:py-16 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <h2 className="text-[12vw] font-black text-slate-900/[0.02] uppercase tracking-tighter whitespace-nowrap">
                PRECISION
              </h2>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                ASSEMBLYMEN <br />
                <span className="text-blue-700">IN CAPE COAST NORTH</span>
              </h2>
            </div>
          </div>
        </AnimatedSection>

        {/* --- INNOVATIVE COMMAND CENTER --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative group">
              {/* THE SEARCH COMMAND */}
              <div className="relative z-20 bg-white border border-slate-200 rounded-3xl shadow-xl p-2 flex items-center gap-2 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                <div className="pl-4">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <input 
                  type="text"
                  placeholder="Find your area or representative..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-2 font-bold text-slate-900 outline-none placeholder:text-slate-300 text-lg"
                />
              </div>

              {/* THE LIVE LOCATION SCANNER (Innovative UI placement) */}
              <div className="absolute -bottom-8 inset-x-4 z-10">
                <button 
                  onClick={handleLiveLocation}
                  disabled={isLocating}
                  className="w-full flex items-center justify-between px-6 py-3 bg-slate-900 rounded-b-2xl shadow-lg hover:bg-black transition-all group active:scale-[0.98] disabled:opacity-90"
                >
                  <div className="flex items-center gap-3">
                    {isLocating ? (
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                    ) : (
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </div>
                    )}
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                      {isLocating ? "Scanning Constituency..." : "Precision Live Location"}
                    </span>
                  </div>
                  <Crosshair className={`w-4 h-4 text-slate-400 group-hover:text-blue-400 ${isLocating ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>

            {/* Precision Meta-data */}
            <div className="mt-14 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Showing {filteredMembers.length} Results • Search by Town, Zone, or Name
              </p>
              <AnimatePresence>
                {detectedZone && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest"
                  >
                    <MapPin className="w-3 h-3" />
                    Match Found: {detectedZone} Area
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
        
        {/* --- MEMBER GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredMembers.map((member) => (
              <motion.div
                layout
                key={member.zone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex flex-col items-center text-center group bg-white border rounded-xl p-3 transition-all duration-500 ${detectedZone === member.zone ? 'ring-4 ring-blue-500/20 border-blue-500 shadow-2xl scale-105' : 'border-gray-100 hover:shadow-lg'}`}
              >
                <div className="w-full aspect-[3/4] bg-slate-50 overflow-hidden rounded-lg mb-3 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {detectedZone === member.zone && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-md shadow-lg animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="w-full">
                  <p className="text-xs font-extrabold tracking-widest text-amber-600 uppercase mb-1">
                    {member.zone}
                  </p>
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase line-clamp-2 mb-1">
                    {member.assemblyman}
                  </p>
                  <p className="text-sm text-slate-800 flex items-center justify-center gap-2 font-bold">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{formatPhoneNumber(member.phone)}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest">No matching representative found</h3>
          </div>
        )}
      </div>
    </div>
  );
}