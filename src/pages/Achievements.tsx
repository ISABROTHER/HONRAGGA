import { useState } from 'react';
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ArrowLeft,
  ChevronRight,
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

const policies = [
  {
    id: 'education' as PolicyKey,
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
    id: 'health' as PolicyKey,
    title: 'Health & Sanitation',
    count: 2,
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
      }
    ]
  },
  {
    id: 'employment' as PolicyKey,
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
      }
    ]
  },
  {
    id: 'infrastructure' as PolicyKey,
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
      }
    ]
  },
  {
    id: 'agriculture' as PolicyKey,
    title: 'Agricultural Support',
    count: 4,
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
      }
    ]
  }
];

export function Achievements() {
  const [selectedId, setSelectedId] = useState<PolicyKey | null>(null);
  const selectedPolicy = policies.find(p => p.id === selectedId);

  if (selectedId && selectedPolicy) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-700 mb-8 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-12 shadow-2xl"
          >
            <img
              src={selectedPolicy.image}
              alt={selectedPolicy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {selectedPolicy.title}
              </h1>
            </div>
          </motion.div>

          {/* Sub-listing of Initiatives */}
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
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  {/* 2. Title */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, idx) => (
            <AnimatedSection key={policy.id} delay={idx * 100}>
              <button
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
                  
                  {/* Closed gap between text explanation and buttons */}
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">
                    {policy.desc}
                  </p>
                  
                  {/* 2-Button Card Action Row */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-slate-50">
                    <div className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg border border-blue-100 whitespace-nowrap">
                      {policy.count} KEY INITIATIVES
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-bold text-xs uppercase tracking-wider whitespace-nowrap group-hover:gap-2 transition-all">
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