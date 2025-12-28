import { useState } from 'react';
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ArrowLeft,
  Award,
  ChevronRight,
  HeartHandshake,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

type PolicyKey = 'education' | 'health' | 'employment' | 'infrastructure' | 'agriculture' | 'welfare' | 'sports';

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
    id: 'welfare' as PolicyKey,
    title: 'Social Welfare',
    desc: 'Providing a safety net for the vulnerable and supporting community groups',
    icon: HeartHandshake,
    color: 'from-rose-500 to-rose-700',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'sports' as PolicyKey,
    title: 'Sports & Youth',
    desc: 'Empowering youth through sports infrastructure and talent development',
    icon: Trophy,
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop'
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
        <p className="mb-6 text-lg">Dr. Kwamena Minta Nyarku has consistently prioritized education, recognizing its pivotal role in community development. His initiatives span from basic to tertiary levels.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Core Achievements</h3>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Donation of 500 LED bulbs to Adisadel College.</li>
          <li>Provision of 100 dual desks to 10 local schools.</li>
          <li>Financial support for tertiary students through the MP's Common Fund.</li>
          <li>Renovation of dilapidated classroom blocks in rural areas.</li>
        </ul>
      </>
    )
  },
  health: {
    title: "Health & Sanitation",
    content: (
      <>
        <p className="mb-6 text-lg">Recognizing the importance of public health, Dr. Nyarku has supported projects aimed at improving healthcare access and sanitation.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Impact Areas</h3>
        <p className="mb-4">Significant support has been provided to health centers in <strong>Kwaprow</strong> and <strong>Dankwakrom</strong>, ensuring they have the supplies needed for primary care.</p>
        <p className="mb-4">The MP has also overseen the construction of modern public toilet facilities to improve hygiene in densely populated communities.</p>
      </>
    )
  },
  infrastructure: {
    title: "Infrastructure Development",
    content: (
      <>
        <p className="mb-6 text-lg">Infrastructure is the backbone of development. Our focus has been on lighting, roads, and community centers.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Operation Light Up Cape Coast North</h3>
        <p className="mb-4">Over 2,500 streetlights have been installed across the constituency to improve security and boost the night economy.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Roads & Centers</h3>
        <p className="mb-4">Ongoing road grading in developing areas and the construction of the Ankaful Community Centre are key highlights of this tenure.</p>
      </>
    )
  },
  welfare: {
    title: "Social Welfare & Empowerment",
    content: (
      <>
        <p className="mb-6 text-lg">Dr. Nyarku believes in "leaving no one behind." This achievement area focuses on the vulnerable members of our society.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Supporting the Vulnerable</h3>
        <p className="mb-4">Annual donations of food items, clothing, and cash to widows and the aged during festive seasons (Christmas and Eid).</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">PWD Support</h3>
        <p className="mb-4">Provision of wheelchairs and startup capital for Persons with Disabilities (PWDs) to encourage self-reliance and dignity.</p>
      </>
    )
  },
  sports: {
    title: "Sports & Youth Development",
    content: (
      <>
        <p className="mb-6 text-lg">Sports is a powerful tool for youth engagement and talent discovery in Cape Coast North.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">The Pedu Astro Turf</h3>
        <p className="mb-4">A flagship project turning the Pedu Park into a world-class facility to foster local talent.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Ragga Cup</h3>
        <p className="mb-4">Organizing annual football tournaments that bring together teams from all electoral areas, providing jerseys and footballs to participating local clubs.</p>
      </>
    )
  },
  employment: {
    title: "Employment & Entrepreneurship",
    content: (
      <>
        <p className="mb-6 text-lg">Dr. Nyarku envisions a thriving local economy through job creation and small business support.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Skills & Jobs</h3>
        <p className="mb-4">Facilitating vocational training for youth in fashion, hairdressing, and masonry. He has also been a vocal advocate for the revival of local factories to create sustainable jobs.</p>
      </>
    )
  },
  agriculture: {
    title: "Agricultural Support",
    content: (
      <>
        <p className="mb-6 text-lg">Supporting our farmers to ensure food security and improved livelihoods.</p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Inputs & Training</h3>
        <p className="mb-4">Donation of cutlasses, fertilizers, and knapsack sprayers to farming communities. Providing training on modern sustainable farming techniques.</p>
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
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
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
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${policy.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
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