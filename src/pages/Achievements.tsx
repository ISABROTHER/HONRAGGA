import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Import our split content files
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Supporting quality education and skills training', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 2, desc: 'Expanding healthcare and clean water access', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Employment & Entrepreneurship', count: 3, desc: 'Creating jobs and empowering businesses', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure Development', count: 4, desc: 'Improving roads and electrification', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agricultural Support', count: 4, desc: 'Supporting farmers with tools and training', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedPolicyId, setSelectedPolicyId] = useState<PolicyKey | null>(null);
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId);

  if (selectedPolicy) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPolicyId(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          {/* --- HERO SECTION --- */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative h-64 rounded-3xl overflow-hidden mb-8 shadow-xl">
            <img src={selectedPolicy.image} alt={selectedPolicy.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">{selectedPolicy.title}</h1>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg max-w-none">
            <div className="text-slate-700 leading-relaxed">
              {selectedPolicy.component}
            </div>
          </motion.div>
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
                    <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg border border-blue-100 whitespace-nowrap">
                      {policy.count} KEY INITIATIVES
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}