import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Import split content files
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Quality education, school resources, and youth training.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Health facilities and public hygiene projects.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Reviving local industry and supporting small businesses.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 4, desc: 'Improving roads, lighting, and community connectivity.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agri-Development', count: 4, desc: 'Supporting farmers with tools, training, and market access.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
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
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Our Achievements</h1>
                <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium">
                  A comprehensive record of verifiable progress in Cape Coast North.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {policies.map((policy, idx) => (
                  <AnimatedSection key={policy.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedId(policy.id)}
                      className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-full flex flex-col text-left group hover:-translate-y-1 transition-all"
                    >
                      <img src={policy.image} alt={policy.title} className="h-48 w-full object-cover" />
                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-black mb-2">{policy.title}</h3>
                        <p className="text-slate-500 text-sm mb-4">{policy.desc}</p>
                        <div className="flex justify-between items-center text-blue-600 font-bold text-xs uppercase">
                          <span>{policy.count} Projects</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-slate-600 mb-8 font-bold">
                <ArrowLeft className="w-5 h-5" /> Back
              </button>

              <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-12">
                <img src={selectedPolicy.image} alt={selectedPolicy.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <h1 className="text-4xl md:text-5xl font-black text-white">{selectedPolicy.title}</h1>
                </div>
              </div>

              {selectedPolicy.component}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}