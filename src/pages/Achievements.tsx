import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Content Imports
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Quality education, school resources, and youth training.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Clinical support and public sanitation projects.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Employment & Entrepreneurship', count: 3, desc: 'Job creation and small business empowerment.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure Development', count: 3, desc: 'Constituency lighting, roads, and community buildings.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agricultural Support', count: 3, desc: 'Direct support and market access for farmers.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedPolicyId, setSelectedPolicyId] = useState<PolicyKey | null>(null);
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedPolicy ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-16">
                <div className="flex flex-col items-center justify-center group">
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                    Our <span className="text-blue-700">Achievements</span>
                  </h1>
                  <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-48" />
                </div>
                <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium mt-6">
                  Explore the tangible impact of Hon. Dr. Kwamena Minta Nyarku across the constituency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {policies.map((policy, idx) => (
                  <AnimatedSection key={policy.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedPolicyId(policy.id)}
                      className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={policy.image} alt={policy.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-black text-slate-900 leading-tight mb-3">{policy.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{policy.desc}</p>
                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                          <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg border border-blue-100 uppercase">
                            {policy.count} Initiatives
                          </div>
                          <div className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                            <span>View List</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <button
                onClick={() => setSelectedPolicyId(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-bold transition-colors group bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to All Achievements
              </button>

              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  {selectedPolicy.title}
                </h1>
                <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
                  The following initiatives highlight our commitment to progress in this sector.
                </p>
              </div>

              <div className="space-y-6">
                {selectedPolicy.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}