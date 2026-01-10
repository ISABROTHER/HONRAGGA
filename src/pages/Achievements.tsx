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
  CheckCircle2
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
  initiatives: InitiativeItem[];
}

const policies: PolicyCategory[] = [
  {
    id: 'education',
    title: 'Educational Support',
    count: 4,
    desc: 'Supporting quality education, digital literacy, and youth skills training',
    image: 'https://i.imgur.com/Ozjnrli.jpeg',
    initiatives: [
      {
        title: "High School Support Program",
        info: "A comprehensive assistance program for senior high students across the constituency to ensure academic success.",
        image: "https://i.imgur.com/Ozjnrli.jpeg"
      },
      {
        title: "Adisadel College Lighting",
        info: "Donation of 500 LED bulbs to alleviate persistent lighting challenges in classrooms and dormitories.",
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
    count: 3,
    desc: 'Expanding access to healthcare and clean water for all',
    image: 'https://i.imgur.com/XmWnKbH.jpeg',
    initiatives: [
      {
        title: "Health Facility Support",
        info: "Significant support provided to health centers in Kwaprow and Dankwakrom, ensuring constituents have local access to healthcare.",
        image: "https://i.imgur.com/XmWnKbH.jpeg"
      },
      {
        title: "Public Toilet Construction",
        info: "Construction of modern public toilets to improve community hygiene and reduce the spread of diseases.",
        image: "https://i.imgur.com/XmWnKbH.jpeg"
      },
      {
        title: "Sanitation Projects",
        info: "Installation of manholes and improved drainage systems to ensure a clean and healthy environment.",
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
    initiatives: [
      {
        title: "Factory Revival Roadmap",
        info: "Strategic planning for reviving dormant factories to create sustainable jobs for the youth.",
        image: "https://i.imgur.com/saQoFLV.png"
      },
      {
        title: "Vocational Skills Training",
        info: "Implementation of technical workshops to equip constituents with modern job-market skills.",
        image: "https://i.imgur.com/saQoFLV.png"
      },
      {
        title: "Business Mentorship",
        info: "Financial and mentorship support for local small business owners and startup founders.",
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
        title: "Connectivity Projects",
        info: "Improving community connectivity through bridge repairs and road grading.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      },
      {
        title: "Ankaful Community Centre",
        info: "Renovation and refurbishment of the local community centre for civic events.",
        image: "https://i.imgur.com/AZqDymE.jpeg"
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agricultural Support',
    count: 3,
    desc: 'Supporting farmers with tools, training, and market access',
    image: 'https://i.imgur.com/TZ4jIJA.jpeg',
    initiatives: [
      {
        title: "Farmer Support Program",
        info: "Direct distribution of modern tools, seeds, and fertilizers to local farming cooperatives.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      },
      {
        title: "Market Access Connectivity",
        info: "Creating direct links between rural farmers and city wholesalers for fair market pricing.",
        image: "https://i.imgur.com/TZ4jIJA.jpeg"
      },
      {
        title: "Sustainable Agri-Training",
        info: "Workshops for youth in agriculture focusing on mechanization and climate-resilient methods.",
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

  const filterOptions = [
    { label: 'All', id: 'all' as const },
    { label: 'Education', id: 'education' as const },
    { label: 'Health', id: 'health' as const },
    { label: 'Employment', id: 'employment' as const },
    { label: 'Infrastructure', id: 'infrastructure' as const },
    { label: 'Agriculture', id: 'agriculture' as const },
  ];

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

          {/* Hero Section for Detail Page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl"
          >
            <img
              src={selectedPolicy.image}
              alt={selectedPolicy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {selectedPolicy.title}
              </h1>
              <p className="text-white/80 mt-2 font-medium max-w-xl">
                Exploring key initiatives and verifiable progress in this sector.
              </p>
            </div>
          </motion.div>

          {/* Sub-listing of Initiatives: Picture -> Title -> Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedPolicy.initiatives.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-lg flex flex-col group hover:shadow-2xl transition-all duration-300"
              >
                {/* 1. Picture */}
                <div className="h-52 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8">
                  {/* 2. Title */}
                  <div className="flex items-center gap-2 mb-3 text-blue-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Result</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">
                    {item.title}
                  </h4>
                  {/* 3. Information */}
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {item.info}
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
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Our <span className="text-blue-700">Achievements</span>
            </h1>
            <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-48" />
          </div>

          <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium leading-relaxed mt-6">
            A comprehensive record of verifiable progress made across Cape Coast North Constituency.
          </p>
        </div>

        {/* Standard Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === option.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPolicies.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPolicies.map((policy, idx) => (
                <AnimatedSection key={policy.id} delay={idx * 100}>
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedId(policy.id)}
                    className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={policy.image}
                        alt={policy.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                        {policy.title}
                      </h3>
                      
                      {/* CLOSED GAP: Description directly under Title */}
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                        {policy.desc}
                      </p>
                      
                      {/* Action Row at the bottom */}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-slate-50">
                        <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg border border-blue-100 whitespace-nowrap uppercase">
                          {policy.count} Key Initiatives
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase tracking-wider whitespace-nowrap group-hover:gap-2 transition-all">
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
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
              className="text-center py-20"
            >
              <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                <Search className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No achievements found</h3>
              <p className="text-slate-500">Try adjusting your search or filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}