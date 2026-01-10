import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Individual Content Imports from the achievements folder
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Investing in our youth through school resources and training.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Improving healthcare facilities and sanitation infrastructure.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Empowering local entrepreneurs and reviving local industry.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 4, desc: 'Modernizing roads and lighting for a safer community.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agri-Development', count: 3, desc: 'Direct support and tools for farmers to boost productivity.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const selectedPolicy = policies.find(p => p.id === selectedId);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedPolicy ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                  Our <span className="text-blue-700">Achievements</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium">
                  A comprehensive record of verifiable progress made across the constituency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {policies.map((policy, idx) => (
                  <AnimatedSection key={policy.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedId(policy.id)}
                      className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-full flex flex-col text-left group hover:-translate-y-1 transition-all duration-300"
                    >
                      <img src={policy.image} alt={policy.title} className="h-48 w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{policy.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 flex-1 font-medium">{policy.desc}</p>
                        <div className="flex items-center justify-between text-blue-600 font-bold text-xs uppercase tracking-wider">
                          <span className="bg-blue-50 px-3 py-1 rounded-full">{policy.count} KEY PROJECTS</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button 
                onClick={() => setSelectedId(null)} 
                className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-bold transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                Back to Overview
              </button>

              <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                <img src={selectedPolicy.image} alt={selectedPolicy.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
                  <h1 className="text-4xl md:text-5xl font-black text-white">{selectedPolicy.title}</h1>
                </div>
              </div>

              {/* The individual sub-listing starts here */}
              <div className="mt-8">
                {selectedPolicy.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}