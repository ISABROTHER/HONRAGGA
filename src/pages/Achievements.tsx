import { useState, useMemo } from 'react';
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ArrowLeft,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

interface InitiativeItem {
  title: string;
  info: string;
  image: string;
}

interface PolicyCategory {
  id: PolicyKey;
  title: string;
  count: number;
  desc: string;
  image: string;
  icon: any;
  color: string;
  accent: string;
  initiatives: InitiativeItem[];
}

const policies: PolicyCategory[] = [
  {
    id: 'education',
    title: 'Educational Support',
    count: 4,
    desc: 'Supporting quality education, digital literacy, and youth skills training',
    image: 'https://i.imgur.com/Ozjnrli.jpeg',
    icon: BookOpen,
    color: 'from-blue-600 to-indigo-700',
    accent: 'bg-blue-600',
    initiatives: [
      {
        title: "High School Support Program",
        info: "A comprehensive assistance program for senior high students across the constituency to ensure academic success.",
        image: "https://i.imgur.com/Ozjnrli.jpeg"
      },
      {
        title: "Adisadel College Lighting",
        info: "Donation of 500 LED bulbs to Adisadel College to alleviate persistent lighting challenges in classrooms and dormitories.",
        image: "https://i.imgur.com/Ozjnrli.jpeg"
      },
      {
        title: "Dual Desks Donation",
        info: "Provision of 100 high-quality dual desks to 10 basic schools to improve learning conditions.",
        image: "https://i.imgur.com/Ozjnrli.jpeg"
      },
      {
        title: "School Renovations",
        info: "Major infrastructure repairs and fresh painting for dilapidated school buildings in rural areas.",
        image: "https://i.imgur.com/Ozjnrli.jpeg"
      }
    ]
  },
  {
    id: 'health',
    title: 'Health & Sanitation',
    count: 2,
    desc: 'Expanding access to healthcare and clean water for all',
    image: 'https://i.imgur.com/XmWnKbH.jpeg',
    icon: HeartPulse,
    color: 'from-green-600 to-emerald-700',
    accent: 'bg-green-600',
    initiatives: [
      {
        title: "Health Facility Support",
        info: "Critical support provided to health centers in Kwaprow and Dankwakrom, ensuring constituents have local access to healthcare.",
        image: "https://i.imgur.com/XmWnKbH.jpeg"
      },
      {
        title: "Public Toilet Construction",
        info: "Construction of modern public toilets and installation of manholes to improve community hygiene.",
        image: "https://i.imgur.com/XmWnKbH.jpeg"
      }
    ]
  },
  {
    id: 'employment',
    title: 'Employment & Entrepreneurship',
    count: 3,
    desc: 'Creating jobs and empowering local businesses',
    image: 'https://i.imgur.com/saQoFLV.png',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-700',
    accent: 'bg-amber-600',
    initiatives: [
      {
        title: "Factory Revival Roadmap",
        info: "Strategic planning for reviving dormant factories and establishing new factories to stimulate job creation.",
        image: "https://i.imgur.com/saQoFLV.png"
      },
      {
        title: "Vocational Skills Training",
        info: "Implementation of technical workshops to equip constituents with modern job-market skills.",
        image: "https://i.imgur.com/saQoFLV.png"
      },
      {
        title: "Entrepreneurship Awards",
        info: "Recognition for excellence in supporting local entrepreneurs with skills training and financial resources.",
        image: "https://i.imgur.com/saQoFLV.png"
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Development',
    count: 4,
    desc: 'Improving roads, electrification, and connectivity',
    image: 'https://i.imgur.com/AZqDymE.jpeg',
    icon: Construction,
    color: 'from-slate-600 to-slate-800',
    accent: 'bg-slate-700',
    initiatives: [
      {
        title: "Operation Light Up",
        info: "Installation of over 2,500 streetlights constituency-wide to enhance night-time security.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      },
      {
        title: "Road Maintenance",
        info: "Major road grading projects and secured allocation for 10km of asphalted roads.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      },
      {
        title: "Ankaful Community Centre",
        info: "Construction and refurbishment of the local community centre for civic engagement.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      },
      {
        title: "Connectivity Projects",
        info: "Ongoing improvements to rural roads and bridges to enhance connectivity.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agricultural Support',
    count: 4,
    desc: 'Supporting farmers with tools, training, and market access',
    image: 'https://i.imgur.com/TZ4jIJA.jpeg',
    icon: Sprout,
    color: 'from-emerald-600 to-teal-700',
    accent: 'bg-emerald-600',
    initiatives: [
      {
        title: "Farmer Support Program",
        info: "Direct distribution of modern tools, seeds, and fertilizers to local farming cooperatives.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      },
      {
        title: "Market Access Connectivity",
        info: "Creating direct links between rural farmers and wholesalers for fair market pricing.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      },
      {
        title: "Youth in Agribusiness",
        info: "Training programs designed to attract younger generations to mechanization and value-addition opportunities.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      },
      {
        title: "Sustainable Practices",
        info: "Workshops promoting climate-resilient farming and soil conservation techniques.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      }
    ]
  }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | PolicyKey>('all');

  const selectedPolicy = policies.find(p => p.id === selectedId);

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            policy.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || policy.id === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  if (selectedId && selectedPolicy) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-bold transition-colors group px-4 py-2 bg-slate-50 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          {/* --- DISTINCT HERO SECTION --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl"
          >
            <img
              src={selectedPolicy.image}
              alt={selectedPolicy.title}
              className="w-full h-full object-cover"
            />
            {/* Color-themed overlay for distinct look */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent`} />
            <div className={`absolute top-0 left-0 w-full h-2 ${selectedPolicy.accent}`} />
            
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl`}>
                  <selectedPolicy.icon className="w-6 h-6" />
                </div>
                <span className="text-white/80 font-black uppercase tracking-widest text-[10px] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {selectedPolicy.count} Projects Completed
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {selectedPolicy.title}
              </h1>
            </div>
          </motion.div>

          {/* --- INITIATIVE LISTING (Picture -> Title -> Information) --- */}
          <div className="grid grid-cols-1 gap-12">
            {selectedPolicy.initiatives.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500"
              >
                {/* 1. Picture */}
                <div className="h-72 md:h-96 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Result</span>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                  {/* 2. Title */}
                  <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
                    {item.title}
                  </h4>
                  {/* 3. Information */}
                  <div className={`h-1.5 w-16 mb-6 rounded-full ${selectedPolicy.accent}`} />
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                    "{item.info}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center justify-center group">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-none">
              Our <span className="text-blue-700">Achievements</span>
            </h1>
            <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-48" />
          </div>

          <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium leading-relaxed mt-6">
            A comprehensive record of verifiable progress made across Cape Coast North Constituency.
          </p>
        </div>

        {/* --- PROFESSIONAL SEARCH & FILTER --- */}
        <div className="mb-16 space-y-6">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search achievements by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-12 py-5 bg-white border border-slate-200 rounded-[2rem] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-xl shadow-slate-200/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-300'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Focus Areas
            </button>
            {policies.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveFilter(p.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeFilter === p.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <p.icon className="w-3.5 h-3.5" />
                {p.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <AnimatePresence mode="popLayout">
          {filteredPolicies.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPolicies.map((policy, idx) => (
                <AnimatedSection key={policy.id} delay={idx * 100}>
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedId(policy.id)}
                    className="w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={policy.image}
                        alt={policy.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className={`absolute top-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white`}>
                        <policy.icon className="w-5 h-5 text-slate-900" />
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                        {policy.title}
                      </h3>
                      
                      {/* Description directly under Title */}
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1 line-clamp-3">
                        {policy.desc}
                      </p>
                      
                      {/* Action Row at bottom */}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-slate-50">
                        <div className="bg-slate-900 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                          {policy.count} Focus Initiatives
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
                          <span>Explore</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </AnimatedSection>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-8 shadow-2xl border border-slate-50">
                <Search className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No results matched.</h3>
              <p className="text-slate-500 font-medium">Try broadening your search or choosing a different focus area.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}