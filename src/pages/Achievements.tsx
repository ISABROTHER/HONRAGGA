import { useState } from 'react';
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ArrowLeft,
  Award,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture';

const policies = [
  {
    id: 'education' as PolicyKey,
    title: 'Educational Support',
    desc: 'Supporting quality education, digital literacy, and youth skills training',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    image: 'https://i.imgur.com/Ozjnrli.jpeg'
  },
  {
    id: 'health' as PolicyKey,
    title: 'Health & Sanitation',
    desc: 'Expanding access to healthcare and clean water for all',
    icon: HeartPulse,
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    image: 'https://i.imgur.com/XmWnKbH.jpeg'
  },
  {
    id: 'employment' as PolicyKey,
    title: 'Employment & Entrepreneurship',
    desc: 'Creating jobs and empowering local businesses',
    icon: Briefcase,
    color: 'from-amber-500 to-amber-700',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    image: 'https://i.imgur.com/saQoFLV.png'
  },
  {
    id: 'infrastructure' as PolicyKey,
    title: 'Infrastructure Development',
    desc: 'Improving roads, electrification, and connectivity',
    icon: Construction,
    color: 'from-slate-500 to-slate-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    image: 'https://i.imgur.com/AZqDymE.jpeg'
  },
  {
    id: 'agriculture' as PolicyKey,
    title: 'Agricultural Support',
    desc: 'Supporting farmers with tools, training, and market access',
    icon: Sprout,
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    image: 'https://i.imgur.com/TZ4jIJA.jpeg'
  }
];

const policyDetails: Record<PolicyKey, { title: string; content: JSX.Element }> = {
  education: {
    title: "Educational Support",
    content: (
      <>
        <p className="mb-6 text-lg">
          Dr. Kwamena Minta Nyarku has consistently prioritized education, recognizing its pivotal role in community development and individual empowerment. His initiatives in this sector span from basic to tertiary levels, providing essential resources and support to students and institutions.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Basic and Senior High School Support</h3>
        <p className="mb-4">
          One of the key educational initiatives is the High School Education Support Program, which aims to provide comprehensive assistance to students in senior high schools. In October 2025, as part of this program, Dr. Nyarku donated 500 LED bulbs to Adisadel College to alleviate persistent lighting challenges in classrooms and dormitories.
        </p>
        <p className="mb-4">
          This effort is integrated into his broader ongoing "Operation Light Up Cape Coast North" initiative, which has also seen the installation of over 2,500 streetlights across the constituency.
        </p>
        <p className="mb-6">
          Further contributions to basic and senior high schools include the donation of 100 dual desks to 10 schools and significant school renovations. Additionally, exercise books have been donated to support students.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Tertiary Education Support</h3>
        <p className="mb-4">
          Dr. Nyarku has extended his support to tertiary institutions, including the University of Cape Coast (UCC), Cape Coast Technical University, and OLA Training College. These efforts aim to enhance the learning environment and provide necessary resources for higher education.
        </p>
      </>
    )
  },
  health: {
    title: "Health & Sanitation",
    content: (
      <>
        <p className="mb-6 text-lg">
          Recognizing the importance of public health and hygiene, Dr. Nyarku has initiated and supported projects aimed at improving healthcare access and sanitation conditions.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Health Facility Support</h3>
        <p className="mb-6">
          Support has been provided for health centers in Kwaprow and Dankwakrom, ensuring that constituents have access to essential medical services. These facilities serve as critical touchpoints for primary healthcare delivery in the constituency.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Sanitation Projects</h3>
        <p className="mb-4">
          Sanitation initiatives include the construction of public toilets and the installation of manholes, addressing critical hygiene needs within the constituency. These projects are part of a comprehensive approach to improve environmental health and reduce the spread of communicable diseases.
        </p>
        <p className="mb-4">
          The focus on sanitation infrastructure reflects a commitment to providing dignified and healthy living conditions for all residents of Cape Coast North.
        </p>
      </>
    )
  },
  employment: {
    title: "Employment & Entrepreneurship",
    content: (
      <>
        <p className="mb-6 text-lg">
          Dr. Nyarku envisions a thriving local economy and has focused on initiatives that foster entrepreneurship and create job opportunities. His approach emphasizes sustainable economic development that benefits all members of the constituency.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Economic Revival & Job Creation</h3>
        <p className="mb-4">
          His vision includes factory revival and the establishment of new factories to stimulate job creation. By revitalizing dormant industrial facilities and attracting new investments, the MP aims to create sustainable employment opportunities for youth and adults alike.
        </p>
        <p className="mb-6">
          He has also received award recognition for entrepreneurship, highlighting his commitment to economic growth and his innovative approaches to addressing unemployment and underemployment in the constituency.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Skills Development</h3>
        <p className="mb-4">
          Beyond job creation, emphasis is placed on equipping constituents with relevant skills for the modern economy. This includes vocational training programs and partnerships with educational institutions to ensure that the workforce is prepared for emerging opportunities.
        </p>
      </>
    )
  },
  infrastructure: {
    title: "Infrastructure Development",
    content: (
      <>
        <p className="mb-6 text-lg">
          Infrastructure development has been another cornerstone of Dr. Nyarku's tenure, focusing on improving connectivity, safety, and public amenities within the Cape Coast North Constituency.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Roads and Lighting</h3>
        <p className="mb-4">
          The "Operation Light Up Cape Coast North" initiative has been a significant success, with over 2,500 streetlights installed across the constituency, enhancing security and visibility. This project has dramatically improved the quality of life for residents, enabling safer movement during evening hours and supporting local economic activities.
        </p>
        <p className="mb-6">
          Beyond lighting, the MP has overseen major road grading projects and secured an allocation for 10km of asphalted roads, contributing to better transportation networks. Improved roads facilitate commerce, reduce travel time, and enhance access to essential services.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Community and Public Buildings</h3>
        <p className="mb-4">
          Efforts have also been directed towards the construction and improvement of community facilities, such as the Ankaful Community Centre and support for party offices. These spaces serve as important gathering points for community activities, civic engagement, and social cohesion.
        </p>
      </>
    )
  },
  agriculture: {
    title: "Agricultural Support",
    content: (
      <>
        <p className="mb-6 text-lg">
          Agriculture remains a vital component of Cape Coast North's economy. Dr. Nyarku has implemented several initiatives to support farmers and enhance agricultural productivity.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Farmer Support Programs</h3>
        <p className="mb-4">
          Support for farmers includes providing tools, equipment, and training to improve agricultural practices. By introducing modern farming techniques and ensuring access to quality inputs, the MP aims to increase yields and improve farmer incomes.
        </p>
        <p className="mb-6">
          Market access programs have been developed to connect farmers directly with buyers, reducing the role of middlemen and ensuring that farmers receive fair prices for their produce.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Sustainable Agriculture</h3>
        <p className="mb-4">
          Emphasis is placed on sustainable agricultural practices that protect the environment while ensuring food security. This includes promoting organic farming methods, soil conservation techniques, and water management practices.
        </p>
        <p className="mb-4">
          Youth engagement in agriculture is also a priority, with programs designed to make farming attractive to younger generations through mechanization and value-addition opportunities.
        </p>
      </>
    )
  }
};

export function Achievements() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyKey | null>(null);

  if (selectedPolicy) {
    const detail = policyDetails[selectedPolicy];
    const policy = policies.find(p => p.id === selectedPolicy)!;

    return (
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPolicy(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Achievements
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 rounded-3xl overflow-hidden mb-8"
          >
            <img
              src={policy.image}
              alt={policy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${policy.bgColor} border ${policy.borderColor} mb-3`}>
                <policy.icon className={`w-5 h-5 ${policy.textColor}`} />
                <span className={`text-xs font-black uppercase tracking-widest ${policy.textColor}`}>
                  Achievement Area
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {detail.title}
              </h1>
            </div>
          </motion.div>

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
          {/* Green Track Record Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 shadow-sm mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-700">Track Record</span>
          </motion.div>

          {/* Title with Animated Underline */}
          <div className="flex flex-col items-center justify-center group">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Our <span className="text-blue-700">Achievements</span>
            </h1>
            <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 group-hover:w-48" />
          </div>

          <p className="max-w-2xl mx-auto text-slate-600 text-lg font-medium leading-relaxed mt-8">
            A comprehensive record of verifiable progress made across Cape Coast North Constituency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, idx) => {
            return (
              <AnimatedSection key={policy.id} delay={idx * 100}>
                <button
                  onClick={() => setSelectedPolicy(policy.id)}
                  className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 h-full flex flex-col text-left group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={policy.image}
                      alt={policy.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{policy.title}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">{policy.desc}</p>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
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