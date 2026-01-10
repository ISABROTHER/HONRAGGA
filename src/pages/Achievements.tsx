import { useState } from 'react';
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ArrowLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

// --- DATA STRUCTURE ---
const initiativeDetails: Record<PolicyKey, { title: string; items: any[] }> = {
  education: {
    title: "Educational Support",
    items: [
      { title: "High School Support", desc: "Assistance program for SHS students.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
      { title: "Adisadel College Lighting", desc: "Donated 500 LED bulbs.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
      { title: "Dual Desks Donation", desc: "100 desks to 10 schools.", image: "https://i.imgur.com/Ozjnrli.jpeg" },
      { title: "School Renovations", desc: "Infrastructure repairs for rural schools.", image: "https://i.imgur.com/Ozjnrli.jpeg" }
    ]
  },
  health: {
    title: "Health & Sanitation",
    items: [
      { title: "Health Center Support", desc: "Resources for Kwaprow and Dankwakrom.", image: "https://i.imgur.com/XmWnKbH.jpeg" },
      { title: "Public Toilets", desc: "New sanitation facilities built.", image: "https://i.imgur.com/XmWnKbH.jpeg" },
      { title: "Sanitation Projects", desc: "Drainage and manhole installations.", image: "https://i.imgur.com/XmWnKbH.jpeg" }
    ]
  },
  employment: {
    title: "Employment & Entrepreneurship",
    items: [
      { title: "Factory Revival", desc: "Strategic planning for local industry.", image: "https://i.imgur.com/saQoFLV.png" },
      { title: "Skills Development", desc: "Vocational training for youth.", image: "https://i.imgur.com/saQoFLV.png" },
      { title: "Business Support", desc: "Grants for local entrepreneurs.", image: "https://i.imgur.com/saQoFLV.png" }
    ]
  },
  infrastructure: {
    title: "Infrastructure Development",
    items: [
      { title: "Operation Light Up", desc: "2,500+ streetlights installed.", image: "https://i.imgur.com/AZqDymE.jpeg" },
      { title: "Road Grading", desc: "Regular maintenance of feeder roads.", image: "https://i.imgur.com/AZqDymE.jpeg" },
      { title: "Community Center", desc: "Ankaful Center renovation.", image: "https://i.imgur.com/AZqDymE.jpeg" }
    ]
  },
  agriculture: {
    title: "Agricultural Support",
    items: [
      { title: "Farmer Support", desc: "Tools and seeds for cooperatives.", image: "https://i.imgur.com/TZ4jIJA.jpeg" },
      { title: "Market Access", desc: "Linking farmers directly to buyers.", image: "https://i.imgur.com/TZ4jIJA.jpeg" },
      { title: "Modernization", desc: "New farming tools and training.", image: "https://i.imgur.com/TZ4jIJA.jpeg" }
    ]
  }
};

const policies = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Quality education and school resources.', image: 'https://i.imgur.com/Ozjnrli.jpeg' },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Health facilities and public hygiene.', image: 'https://i.imgur.com/XmWnKbH.jpeg' },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Factory revival and small businesses.', image: 'https://i.imgur.com/saQoFLV.png' },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 3, desc: 'Roads, lighting, and community spaces.', image: 'https://i.imgur.com/AZqDymE.jpeg' },
  { id: 'agriculture' as PolicyKey, title: 'Agri-Development', count: 3, desc: 'Direct support and tools for farmers.', image: 'https://i.imgur.com/TZ4jIJA.jpeg' }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);

  const renderDetailView = () => {
    const detail = initiativeDetails[selectedId!];
    const category = policies.find(p => p.id === selectedId)!;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6">
        {/* Navigation */}
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-bold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to All Achievements
        </button>

        {/* --- HERO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden mb-12 shadow-2xl"
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {detail.title}
            </h1>
            <p className="text-white/80 mt-2 font-medium max-w-xl">
              Exploring key initiatives and verifiable progress in this sector.
            </p>
          </div>
        </motion.div>

        {/* Initiative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {detail.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col group hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-52 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Result</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-16">
                <div className="flex flex-col items-center justify-center group">
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                    Our <span className="text-blue-700">Achievements</span>
                  </h1>
                  <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-48" />
                </div>
                <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto mt-6">
                  A record of verifiable progress and community development across Cape Coast North.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {policies.map((policy, idx) => (
                  <AnimatedSection key={policy.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedId(policy.id)}
                      className="w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={policy.image} alt={policy.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight">{policy.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-2">{policy.desc}</p>
                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{policy.count} KEY PROJECTS</span>
                          <div className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase group-hover:gap-2 transition-all">
                            <span>View Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            renderDetailView()
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}