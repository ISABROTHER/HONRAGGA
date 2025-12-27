// src/pages/Polls.tsx
import { useState, useEffect } from 'react';
import { 
  PieChart, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3,
  Vote,
  ListChecks,
  Zap,
  Users,
  ShieldCheck,
  History,
  Info,
  TrendingUp,
  MessageSquareQuote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- RESEARCH-BASED MOCK DATA ---
const INITIAL_QUADRATIC_POLLS = [
  {
    id: 'q1',
    question: "Allocate your 'Voice Credits' for the 2026 Constituency Development Fund",
    description: "You have 100 credits. Use more credits on sectors you feel most strongly about. (Quadratic Voting Model)",
    totalCreditsSpent: 0,
    options: [
      { id: 'health', text: "Healthcare Clinics", spent: 0, icon: "🏥" },
      { id: 'edu', text: "STEM Scholarships", spent: 0, icon: "🎓" },
      { id: 'roads', text: "Solar Street Lighting", spent: 0, icon: "💡" },
      { id: 'jobs', text: "Agro-Processing Hubs", spent: 0, icon: "🚜" },
    ]
  }
];

const COMMUNITY_CONSENSUS = {
  topic: "New Adisadel Market Layout",
  summary: "Based on 450+ submissions, there is 82% consensus that the market should prioritize solar-powered cold storage over additional parking spaces.",
  lastUpdated: "2 hours ago"
};

const ASSURANCES = [
  {
    id: 1,
    promise: "Construction of Kwaprow Community Market",
    category: "Infrastructure",
    status: "On Track",
    progress: 65,
    verification: [
      { date: "Oct 2025", event: "Roofing stage certified by Metro Engineer" },
      { date: "Dec 2025", event: "Electrical wiring phase initiated" }
    ],
    notes: "Roofing stage completed. Stalls currently being partitioned."
  },
  {
    id: 2,
    promise: "1,000 Desks for Basic Schools",
    category: "Education",
    status: "Completed",
    progress: 100,
    verification: [
      { date: "Oct 2024", event: "Delivery receipts signed by 15 Headteachers" }
    ],
    notes: "Distributed to 15 schools across the constituency."
  },
  {
    id: 3,
    promise: "Rehabilitation of Adisadel Town Roads",
    category: "Infrastructure",
    status: "Delayed",
    progress: 40,
    verification: [
      { date: "Nov 2025", event: "Work paused for drainage assessment" }
    ],
    notes: "Delayed due to heavy rains in July. Work has resumed."
  }
];

export function Polls() {
  const [activeTab, setActiveTab] = useState<'deliberation' | 'tracker'>('deliberation');
  const [credits, setCredits] = useState(100);
  const [pollOptions, setPollOptions] = useState(INITIAL_QUADRATIC_POLLS[0].options);
  const [isDelegated, setIsDelegated] = useState(false);
  const [expandedTracker, setExpandedTracker] = useState<number | null>(null);

  const handleAdjustCredit = (optionId: string, amount: number) => {
    const currentOption = pollOptions.find(o => o.id === optionId);
    if (!currentOption) return;

    const newSpent = Math.max(0, currentOption.spent + amount);
    const costChange = (newSpent * newSpent) - (currentOption.spent * currentOption.spent);

    if (credits - costChange >= 0) {
      setPollOptions(pollOptions.map(o => 
        o.id === optionId ? { ...o, spent: newSpent } : o
      ));
      setCredits(prev => prev - costChange);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'On Track': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delayed': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 border border-indigo-100 mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-indigo-700">
              Civic Intelligence 2.0
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Democracy Hub
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Use Voice Credits to prioritize projects and track verifiable proof of constituency progress.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab('deliberation')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'deliberation' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Vote className="w-4 h-4" /> Deliberation
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'tracker' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Verifiable Assurance
            </button>
          </div>
        </div>

        {activeTab === 'deliberation' && (
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Main Quadratic Poll */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {INITIAL_QUADRATIC_POLLS[0].question}
                    </h3>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                      <Info className="w-4 h-4" /> {INITIAL_QUADRATIC_POLLS[0].description}
                    </p>
                  </div>
                  <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-center">
                    <div className="text-2xl font-black">{credits}</div>
                    <div className="text-[10px] uppercase font-bold opacity-80">Credits Left</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {pollOptions.map((option) => (
                    <div key={option.id} className="p-5 rounded-3xl border border-slate-100 bg-slate-50/50 flex items-center justify-between group hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div>
                          <div className="font-bold text-slate-900">{option.text}</div>
                          <div className="text-xs text-slate-500 font-medium">Cost: {option.spent * option.spent} Credits</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleAdjustCredit(option.id, -1)}
                          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xl font-black text-slate-900">{option.spent}</span>
                        <button 
                          onClick={() => handleAdjustCredit(option.id, 1)}
                          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Submit Allocation
                </button>
              </motion.div>

              {/* Liquid Democracy / Delegation Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-6 h-6" /> Liquid Delegation
                  </h4>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isDelegated ? 'bg-emerald-400 text-emerald-950' : 'bg-white/20 text-white'}`}>
                    {isDelegated ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <p className="text-indigo-100 text-sm mb-6">
                  Don't have time to research? Delegate your credits to a verified community expert to vote on your behalf for this category.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsDelegated(!isDelegated)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-left transition-all"
                  >
                    <div className="font-bold text-sm">Follow Expert</div>
                    <div className="text-[10px] opacity-70">Dr. Araba Mensah (Health)</div>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-left transition-all opacity-50 cursor-not-allowed">
                    <div className="font-bold text-sm">Topic Leader</div>
                    <div className="text-[10px] opacity-70">Education Council</div>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Insights & Consensus Side Panel */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4">
                  <MessageSquareQuote className="w-4 h-4" /> AI Consensus Summary
                </div>
                <h4 className="font-black text-slate-900 mb-2">{COMMUNITY_CONSENSUS.topic}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                  "{COMMUNITY_CONSENSUS.summary}"
                </p>
                <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <History className="w-3 h-3" /> Updated {COMMUNITY_CONSENSUS.lastUpdated}
                </div>
              </motion.div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4">
                  <PieChart className="w-4 h-4 text-indigo-600" /> Live Sentiment
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Infrastructure", val: 78 },
                    { label: "Education", val: 62 },
                    { label: "Job Creation", val: 89 }
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 mb-1">
                        <span>{item.label}</span>
                        <span>{item.val}% Support</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VERIFIABLE TRACKER TAB --- */}
        {activeTab === 'tracker' && (
          <div className="space-y-4">
            {ASSURANCES.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{item.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{item.promise}</h3>
                    <p className="text-slate-500 text-sm">{item.notes}</p>
                  </div>

                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="hidden lg:block w-32">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>PROGRESS</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setExpandedTracker(expandedTracker === item.id ? null : item.id)}
                      className="flex-1 md:flex-none bg-slate-50 hover:bg-slate-100 px-6 py-3 rounded-xl text-slate-900 font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      {expandedTracker === item.id ? 'Hide Evidence' : 'View Proof'}
                      <History className={`w-4 h-4 transition-transform ${expandedTracker === item.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTracker === item.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-8">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verification Timeline
                        </h4>
                        <div className="space-y-6">
                          {item.verification.map((v, i) => (
                            <div key={i} className="flex gap-4 relative">
                              {i !== item.verification.length - 1 && (
                                <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-slate-200" />
                              )}
                              <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm z-10" />
                              <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase">{v.date}</div>
                                <div className="text-sm font-bold text-slate-700">{v.event}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}