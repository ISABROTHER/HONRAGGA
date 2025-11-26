// src/pages/about/AboutMP.tsx
import React from 'react';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { AnimatedSection } from '../../components/AnimatedSection';

interface AboutMPProps {
  onNavigate: (page: string) => void;
}

export function AboutMP({ onNavigate }: AboutMPProps) {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  const handleScrollToAssemblymen = () => {
    const element = document.getElementById('assemblymen-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
        {/* MP Welcome / Summary Card */}
        <AnimatedSection>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7 flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-green-100 shadow-md bg-gray-100 relative">
                <img
                  src={mpPortraitUrl}
                  alt="Hon. Dr. Kwamena Minta Nyarku"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700 mb-1">
                    Member of Parliament
                    </p>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                  Hon. Dr. Kwamena Minta Nyarku (Ragga)
                </h1>
                <p className="text-sm font-medium text-slate-700">
                  MP for Cape Coast North · National Democratic Congress (NDC)
                </p>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                Welcome to the official page of the Member of Parliament for Cape Coast North. 
                This space is for every resident, student, worker and visitor who believes our 
                constituency can be fairer, safer and more hopeful for all.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-green-50 text-green-800 border border-green-100">
                  Apewosika · Cape Coast North
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100">
                  Obiara Ka Ho (Everyone is involved)
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                {/* Button 1: Open Full Profile Page (Left) */}
                <button
                  onClick={() => onNavigate('about-full-profile')}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-900 text-white text-sm font-bold rounded-xl shadow-md hover:bg-blue-800 transition-all active:scale-95"
                >
                  READ FULL PROFILE
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Button 2: Scroll to Assemblymen (Right) */}
                <button
                  onClick={handleScrollToAssemblymen}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-blue-900 text-blue-900 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all active:scale-95"
                >
                  Know Your Assemblymen
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
    </>
  );
} 