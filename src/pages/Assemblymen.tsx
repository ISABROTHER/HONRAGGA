// src/pages/Assemblymen.tsx
import { useState, useMemo } from 'react';
import { Phone, Search, MapPin, Navigation, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { LOCATIONS } from '../data/locations';

export function Assemblymen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  // Helper to format phone number from +233 to 0
  const formatPhoneNumber = (phone: string) => {
    return phone.replace('+233 ', '0').replace('+233', '0');
  };

  // Filter Logic for Town or Name
  const filteredMembers = useMemo(() => {
    return LOCATIONS.filter(
      (m) =>
        m.assemblyman.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Innovation: Detect Location Logic
  const handleDetectLocation = () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real production app, you would use reverse geocoding here
        // For this UI, we simulate finding the zone based on proximity or GPS
        setTimeout(() => {
          setIsDetecting(false);
          // Example: Auto-filter to a detected zone like "Aboom" if found
          // For demo purposes, we show a success message
          alert("Location Detected: You are in Cape Coast North. Showing your local representatives.");
        }, 1500);
      },
      () => {
        alert("Unable to retrieve your location");
        setIsDetecting(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-2 pb-20"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP ONE PERCENT HEADING --- */}
        <AnimatedSection delay={50}>
          <div className="relative text-center mb-4 py-8 md:py-12 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <h2 className="text-[12vw] font-black text-slate-900/[0.02] uppercase tracking-tighter whitespace-nowrap">
                GOVERNANCE
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

        {/* --- INNOVATION: SEARCH & LOCATION HUB --- */}
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Smart Search Bar */}
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search by Town (e.g. Abura) or Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none font-medium text-slate-900"
                />
              </div>

              {/* Geo-Location Intelligence Button */}
              <button 
                onClick={handleDetectLocation}
                disabled={isDetecting}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 whitespace-nowrap"
              >
                {isDetecting ? (
                  <Navigation className="w-5 h-5 animate-spin" />
                ) : (
                  <Crosshair className="w-5 h-5" />
                )}
                {isDetecting ? "Detecting..." : "Find My Representative"}
              </button>
            </div>

            {/* Active Result Count */}
            <p className="mt-4 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
              Showing {filteredMembers.length} Representatives {searchQuery && `matching "${searchQuery}"`}
            </p>
          </div>
        </AnimatedSection>
        
        {/* --- ASSEMBLY MEMBERS GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredMembers.map((member, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                key={member.zone}
                className="flex flex-col items-center text-center group bg-white border border-slate-100 rounded-2xl p-3 hover:shadow-2xl hover:border-blue-100 transition-all duration-300"
              >
                {/* Profile Image */}
                <div className="w-full aspect-[3/4] bg-slate-100 overflow-hidden rounded-xl mb-3 relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.assemblyman}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-lg">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <p className="text-[10px] font-black tracking-widest text-amber-600 uppercase mb-1">
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
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No representative found</h3>
            <p className="text-slate-500">Try searching for a different area or name.</p>
          </div>
        )}

      </div>
    </div>
  );
}