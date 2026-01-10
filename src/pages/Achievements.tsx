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
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Individual Content Imports (from the achievements folder)
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  {
    id: 'education' as PolicyKey,
    title: 'Educational Support',
    count: 4,
    desc: 'Supporting quality education, digital literacy, and youth skills training',
    image: 'https://i.imgur.com/Ozjnrli.jpeg',
    component: <Education />
  },
  {
    id: 'health' as PolicyKey,
    title: 'Health & Sanitation',
    count: 2,
    desc: 'Expanding access to healthcare and clean water for all',
    image: 'https://i.imgur.com/XmWnKbH.jpeg',
    component: <Health />
  },
  {
    id: 'employment' as PolicyKey,
    title: 'Employment & Entrepreneurship',
    count: 3,
    desc: 'Creating jobs and empowering local businesses',
    image: 'https://i.imgur.com/saQoFLV.png',
    component: <Employment />
  },
  {
    id: 'infrastructure' as PolicyKey,
    title: 'Infrastructure Development',
    count: 4,
    desc: 'Improving roads, electrification, and connectivity',
    image: 'https://i.imgur.com/AZqDymE.jpeg',
    component: <Infrastructure />
  },
  {
    id: 'agriculture' as PolicyKey,
    title: 'Agricultural Support',
    count: 4,
    desc: 'Supporting farmers with tools, training, and market access',
    image: 'https://i.imgur.com/TZ4jIJA.jpeg',
    component: <Agriculture />
  }
];

export function Achievements() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | PolicyKey>('all');

  // Modern Search & Filter Logic
  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            policy.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || policy.id === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  if (selectedPolicy) {
    const policy = policies.find(p => p.id === selectedPolicy)!;

    return (
      <div className="min-h-screen bg-white pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPolicy(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-bold transition-colors group px-4 py-2 bg-slate-50 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl"
          >
            <img src={policy.image} alt={policy.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {policy.title}
              </h1>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
             {policy.component}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Our <span className="text-blue-700">Achievements</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium mt-6">
            Verifiable progress and transformational impact across Cape Coast North.
          </p>
        </div>

        {/* --- MODERN FILTER BAR --- */}
        <div className="sticky top-24 z-30 mb-12 space-y-6 bg-slate-50/80 backdrop-blur-md py-4 rounded-3xl">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Categories ({policies.length})
            </button>
            {policies.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveFilter(p.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter