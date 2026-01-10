import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Search,
  X,
  Award,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Individual Content Imports
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const categories = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Investing in our youth through school resources and training.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Strengthening community health facilities and sanitation systems.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Empowering local entrepreneurs and reviving local industry.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 4, desc: 'Modernizing roads and lighting for a safer community.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agricultural Support', count: 3, desc: 'Providing tools and market access to our hard-working farmers.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | PolicyKey>('all');

  const selectedCategory = categories.find(c => c.id === selectedId);

  // Modern Filter Logic
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const matchesSearch = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            cat.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || cat.id === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6 border border-blue-100">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Official Impact Report</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
                  Our <span className="text-blue-700">Progress.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
                  A verifiable record of development initiatives across Cape Coast North.
                </p>
              </div>

              {/* Modern Search & Pills */}
              <div className="sticky top-24 z-30 mb-16 space-y-8 bg-[#F8FAFC]/80 backdrop-blur-md py-6 rounded-3xl">
                <div className="max-w-2xl mx-auto relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search achievements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-12 py-5 bg-white border border-slate-200 rounded-[2rem] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-xl shadow-slate-200/50"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                      activeFilter === 'all' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    All ({categories.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                        activeFilter === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat.title.split(' ')[0]} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Grid */}
              <AnimatePresence mode="popLayout">
                {filteredCategories.length > 0 ? (
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredCategories.map((item, idx) => (
                      <AnimatedSection key={item.id} delay={idx * 50}>
                        <motion.button
                          layout
                          onClick={() => setSelectedId(item.id)}
                          className="group w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/30 h-full flex flex-col text-left transition-all duration-500 hover:-translate-y-2"
                        >
                          <div className="relative h-60 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">{item.title}</h3>
                            </div>
                            <p className="text-slate-500 font-medium mb-8 flex-1 line-clamp-2 leading-relaxed">{item.desc}</p>
                            <div className="flex items-center justify-between text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all mt-auto pt-6 border-t border-slate-50">
                              <span>{item.count} Key Projects</span>
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.button>
                      </AnimatedSection>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                    <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100">
                      <Filter className="h-8 w-8 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No results found</h3>
                    <p className="text-slate-500 font-medium">Try adjusting your search terms or filters.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-5xl mx-auto">
              <button 
                onClick={() => setSelectedId(null)} 
                className="flex items-center gap-3 text-slate-900 hover:text-blue-700 mb-10 font-black transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="uppercase tracking-[0.2em] text-[10px]">Return to Overview</span>
              </button>

              <div className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
                <img src={selectedCategory.image} alt={selectedCategory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10 md:p-16">
                  <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-none">
                      {selectedCategory.title}
                    </h1>
                    <div className="h-1.5 w-20 bg-blue-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Sub-Listing Component */}
              <div className="mt-8">
                {selectedCategory.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}