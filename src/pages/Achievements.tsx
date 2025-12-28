import { useState } from 'react';
import {
  GraduationCap,
  Building2,
  Heart,
  Briefcase,
  Users,
  Map,
  ArrowLeft,
  Award,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

type ThemeKey = 'education' | 'infrastructure' | 'health' | 'entrepreneurship' | 'community' | 'planning';

const themes = [
  {
    id: 'education' as ThemeKey,
    title: 'Education',
    desc: 'Building foundations for future generations',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  {
    id: 'infrastructure' as ThemeKey,
    title: 'Infrastructure',
    desc: 'Modern roads, lighting, and facilities',
    icon: Building2,
    color: 'from-slate-500 to-slate-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200'
  },
  {
    id: 'health' as ThemeKey,
    title: 'Health & Sanitation',
    desc: 'Accessible healthcare for all',
    icon: Heart,
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  {
    id: 'entrepreneurship' as ThemeKey,
    title: 'Entrepreneurship',
    desc: 'Creating jobs and economic growth',
    icon: Briefcase,
    color: 'from-amber-500 to-amber-700',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  {
    id: 'community' as ThemeKey,
    title: 'Community Engagement',
    desc: 'Social support and cohesion',
    icon: Users,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  {
    id: 'planning' as ThemeKey,
    title: 'Strategic Planning',
    desc: 'Long-term vision for Cape Coast',
    icon: Map,
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  }
];

const themeDetails: Record<ThemeKey, { title: string; content: JSX.Element }> = {
  education: {
    title: "Education: A Foundation for the Future",
    content: (
      <>
        <p className="mb-4">Dr. Kwamena Minta Nyarku has consistently prioritized education, recognizing its pivotal role in community development and individual empowerment. His initiatives in this sector span from basic to tertiary levels, providing essential resources and support to students and institutions.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Basic and Senior High School Support</h3>
        <p className="mb-4">One of the key educational initiatives is the High School Education Support Program, which aims to provide comprehensive assistance to students in senior high schools. In October 2025, as part of this program, Dr. Nyarku donated 500 LED bulbs to Adisadel College to alleviate persistent lighting challenges in classrooms and dormitories. This effort is integrated into his broader ongoing "Operation Light Up Cape Coast North" initiative, which has also seen the installation of over 2,500 streetlights across the constituency.</p>
        <p className="mb-4">Further contributions to basic and senior high schools include the donation of 100 dual desks to 10 schools and significant school renovations. Additionally, exercise books have been donated to support students.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Tertiary Education Support</h3>
        <p className="mb-4">Dr. Nyarku has extended his support to tertiary institutions, including the University of Cape Coast (UCC), Cape Coast Technical University, and OLA Training College. These efforts aim to enhance the learning environment and provide necessary resources for higher education.</p>
      </>
    )
  },
  infrastructure: {
    title: "Infrastructure Development",
    content: (
      <>
        <p className="mb-4">Infrastructure development has been another cornerstone of Dr. Nyarku's tenure, focusing on improving connectivity, safety, and public amenities within the Cape Coast North Constituency.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Roads and Lighting</h3>
        <p className="mb-4">The "Operation Light Up Cape Coast North" initiative has been a significant success, with over 2,500 streetlights installed across the constituency, enhancing security and visibility. Beyond lighting, the MP has overseen major road grading projects and secured an allocation for 10km of asphalted roads, contributing to better transportation networks.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Community and Public Buildings</h3>
        <p className="mb-4">Efforts have also been directed towards the construction and improvement of community facilities, such as the Ankaful Community Centre and support for party offices.</p>
      </>
    )
  },
  health: {
    title: "Health and Sanitation",
    content: (
      <>
        <p className="mb-4">Recognizing the importance of public health and hygiene, Dr. Nyarku has initiated and supported projects aimed at improving healthcare access and sanitation conditions.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Health Facility Support</h3>
        <p className="mb-4">Support has been provided for health centers in Kwaprow and Dankwakrom, ensuring that constituents have access to essential medical services.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Sanitation Projects</h3>
        <p className="mb-4">Sanitation initiatives include the construction of public toilets and the installation of manholes, addressing critical hygiene needs within the constituency.</p>
      </>
    )
  },
  entrepreneurship: {
    title: "Entrepreneurship and Economic Development",
    content: (
      <>
        <p className="mb-4">Dr. Nyarku envisions a thriving local economy and has focused on initiatives that foster entrepreneurship and create job opportunities.</p>
        <p className="mb-4">His vision includes factory revival and the establishment of new factories to stimulate job creation. He has also received award recognition for entrepreneurship, highlighting his commitment to economic growth.</p>
      </>
    )
  },
  community: {
    title: "Community Engagement and Social Support",
    content: (
      <>
        <p className="mb-4">Community welfare and social cohesion are central to Dr. Nyarku's mandate, reflected in various social support programs and engagement activities.</p>
        <p className="mb-4">In a notable gesture, he donated three months' salary to constituents in April 2021, primarily to traditional, religious, and opinion leaders, to support community development and job creation. He has also organized leadership summits and mentorship programs and funded youth sports development.</p>
      </>
    )
  },
  planning: {
    title: "Strategic Planning and Vision",
    content: (
      <>
        <p className="mb-4">Dr. Nyarku's leadership is characterized by a long-term strategic vision for Cape Coast North.</p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Cape Coast 8-Year Development Plan (2025-2033)</h3>
        <p className="mb-4">In collaboration with the Cape Coast Metropolitan Assembly, he launched the Cape Coast 8-Year Development Plan (2025-2033) on October 9, 2025. This non-partisan plan aims to transform Cape Coast by focusing on tourism, infrastructure, education, health, sanitation, and environmental sustainability. Dr. Nyarku has expressed concern over the city's haphazard development and advocates for intentional planning and the revival of neglected heritage sites.</p>
      </>
    )
  }
};

export function Achievements() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey | null>(null);

  if (selectedTheme) {
    const detail = themeDetails[selectedTheme];
    const theme = themes.find(t => t.id === selectedTheme)!;

    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedTheme(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.bgColor} border ${theme.borderColor} mb-6`}
          >
            <theme.icon className={`w-5 h-5 ${theme.textColor}`} />
            <span className={`text-xs font-black uppercase tracking-widest ${theme.textColor}`}>
              Achievement Area
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight"
          >
            {detail.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-slate-700 leading-relaxed">
              {detail.content}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Track Record</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Our <span className="text-blue-700">Achievements</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium leading-relaxed">
            A comprehensive record of verifiable progress made across Cape Coast North Constituency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <AnimatedSection key={theme.id} delay={idx * 100}>
                <button
                  onClick={() => setSelectedTheme(theme.id)}
                  className="w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{theme.title}</h3>
                  <p className="text-slate-500 text-sm font-medium mb-6 flex-grow leading-relaxed">{theme.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </div>
  );
}
