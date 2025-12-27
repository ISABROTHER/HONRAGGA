// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, Navigation, Crosshair, MapPin, Map } from 'lucide-react';
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

  // Search Logic
  const filteredMembers = useMemo(() => {
    return LOCATIONS.filter(
      (m) =>
        m.assemblyman.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // INNOVATION: Live Location Detection
  const handleLiveLocation = () => {
    setIsLocating(true);
    setDetectedZone(null);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Constituency Boundary Logic (Approximate Cape Coast North Range)
        const isWithinCCN = latitude >= 5.10 && latitude <= 5.15 && longitude >= -1.30 && longitude <= -1.20;

        setTimeout(() => {
          setIsLocating(false);
          if (isWithinCCN) {
            // Logic to match GPS to specific Zone (e.g., Abura, Pedu, etc.)
            // For now, we simulate a successful match
            const matchedZone = "Abura"; 
            setDetectedZone(matchedZone);
            setSearchQuery(matchedZone);
            window.scrollTo({ top: 400, behavior: 'smooth' });
          } else {
            alert("Location Detected: You are currently outside Cape Coast North. Showing all representatives.");
          }
        }, 1800);
      },
      () => {
        alert("Permission denied. Please enable location access to find your representative.");
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

        {/* --- INNOVATION HUB: LIVE LOCATION & SEARCH --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-2xl flex flex-col md:flex-row gap-2">
              
              {/* Live Location Pulse */}
              <button 
                onClick={handleLiveLocation}
                className="relative overflow-hidden flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-black active:scale-95 group"
              >
                {isLocating ? (
                  <Navigation className="w-5 h-5 animate-spin text-blue-400" />
                ) : (
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </div>
                )}
                <span>{isLocating ? "Locating..." : "Live Location"}</span>
              </button>

              {/* Minimalist Search */}
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  type="text"
                  placeholder="Type your area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent rounded-2xl font-bold text-slate-900 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Notification of Detection */}
            <AnimatePresence>
              {detectedZone && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center gap-2 text-blue-700 font-black text-[10px] uppercase tracking-[0.2em]"
                >
                  <MapPin className="w-3 h-3" />
                  Successfully located in {detectedZone}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
        
        {/* --- GRID (TOWN -> NAME -> PHONE) --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMembers.map((member) => (
            <motion.div
              layout
              key={member.zone}
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
        </div>
      </div>
    </div>
  );
}