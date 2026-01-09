import { useState } from 'react';
import { ArrowLeft, ChevronRight, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

// Content Imports
import { Education } from './achievements/Education';
import { Health } from './achievements/Health';
import { Employment } from './achievements/Employment';
import { Infrastructure } from './achievements/Infrastructure';
import { Agriculture } from './achievements/Agriculture';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const categories = [
  { id: 'education' as PolicyKey, title: 'Educational Support', count: 4, desc: 'Investing in our youth through school resources and infrastructure.', image: 'https://i.imgur.com/Ozjnrli.jpeg', component: <Education /> },
  { id: 'health' as PolicyKey, title: 'Health & Sanitation', count: 3, desc: 'Strengthening community health facilities and sanitation systems.', image: 'https://i.imgur.com/XmWnKbH.jpeg', component: <Health /> },
  { id: 'employment' as PolicyKey, title: 'Job Creation', count: 3, desc: 'Empowering local businesses and creating sustainable jobs.', image: 'https://i.imgur.com/saQoFLV.png', component: <Employment /> },
  { id: 'infrastructure' as PolicyKey, title: 'Infrastructure', count: 3, desc: 'Modernizing roads and lighting for a safer constituency.', image: 'https://i.imgur.com/AZqDymE.jpeg', component: <Infrastructure /> },
  { id: 'agriculture' as PolicyKey, title: 'Agricultural Support', count: 3, desc: 'Providing tools and market access to our hard-working farmers.', image: 'https://i.imgur.com/TZ4jIJA.jpeg', component: <Agriculture /> }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const selectedCategory = categories.find(c => c.id === selectedId);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-12 border-b border-gray-200 pb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h1>
                <p className="text-lg text-gray-600 max-w-3xl">
                  A comprehensive record of progress and community development initiatives led by Hon. Dr. Kwamena Minta Nyarku.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((item, idx) => (
                  <AnimatedSection key={item.id} delay={idx * 100}>
                    <button
                      onClick={() => setSelectedId(item.id)}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left h-full flex flex-col"
                    >
                      <div className="h-48 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">
                            {item.count} Initiatives
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-6 flex-1">{item.desc}</p>
                        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                          <span>View Detailed Initiatives</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  </AnimatedSection>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-700 mb-8 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Overview
              </button>

              <div className="mb-12">
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Detailed Achievement List
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedCategory.title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
                  Explore the specific projects and community support programs implemented in this sector.
                </p>
              </div>

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