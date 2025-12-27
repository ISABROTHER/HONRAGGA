// src/pages/Polls.tsx
import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  History, 
  Info, 
  TrendingUp, 
  MessageSquareQuote,
  Cpu,
  Fingerprint,
  Layers,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- RESEARCH-BASED MOCK DATA ---
const INITIAL_QUADRATIC_POLLS = [
  {
    id: 'q1',
    question: "How should we allocate the 2026 Development Budget?",
    description: "Distribute your 100 Voice Credits. Remember: The cost of your vote increases quadratically (1 vote = 1 credit, 2 votes = 4, 3 = 9).",
    options: [
      { id: 'health', text: "Smart Clinics & E-Health", spent: 0, icon: "🏥", color: "from-rose-500 to-pink-600" },
      { id: 'edu', text: "STEM Coding Labs", spent: 0, icon: "🎓", color: "from-blue-500 to-indigo-600" },
      { id: 'roads', text: "Solar Grid Expansion", spent: 0, icon: "💡", color: "from-amber-500 to-orange-600" },
      { id: 'jobs', text: "Agro-AI Processing", spent: 0, icon: "🚜", color: "from-emerald-500 to-teal-600" },
    ]
  }
];

const COMMUNITY_CONSENSUS = {
  topic: "Market Modernization Consensus",
  summary: "AI analysis of 1,200+ local voices suggests a 78% preference for cold-storage facilities over additional retail stalls to support local fishermen.",
  lastUpdated: "Just Now"
};

const ASSURANCES = [
  {
    id: 1,
    promise: "Kwaprow Community Market",
    category: "Infrastructure",
    status: "On Track",
    progress: 65,
    verification: [
      { date: "Oct 2025", event: "Structural Integrity Audit Passed", type: "Official" },
      { date: "Dec 2025", event: "Roofing Installation Phase Complete", type: "Field Report" }
    ],
    notes: "Partitions are currently being installed using eco-friendly materials."
  },
  {
    id: 2,
    promise: "1,000 School Desks",
    category: "Education",
    status: "Completed",
    progress: 100,
    verification: [
      { date: "Oct 2024", event: "Final Constituency Distribution Log", type: "Inventory" }
    ],
    notes: "Standardization across 15 schools achieved ahead of schedule."
  }
];

export function Polls() {
  const [activeTab, setActiveTab] = useState<'deliberation' | 'tracker'>('deliberation');
  const [credits, setCredits] = useState(100);
  const [pollOptions, setPollOptions] = useState(INITIAL_QUADRATIC_POLLS[0].options);
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PREMIUM HEADER --- */}
        <div className="relative mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">Digital Democracy 2026</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6"
          >
            Citizen <span className="text-blue-600">Voice.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium"
          >
            Participate in high-intensity decision making and track every promise with verifiable field evidence.
          </motion.p>
        </div>

        {/* --- CUSTOM SEGMENTED TAB --- */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-200/50 p-1.5 rounded-3xl flex gap-1 backdrop-blur-sm border border-white">
            {[
              { id: 'deliberation', label: 'Civic Deliberation', icon: Layers },
              { id: 'tracker', label: 'Assurance Tracker', icon: ShieldCheck }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all duration-500
                  ${activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-xl shadow-blue-500/10' 
                    : 'text-slate-500 hover:text-slate-800'
                  }
                `}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'deliberation' && (
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* --- QUADRATIC VOTING PANEL --- */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div 
                layout
                className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
              >
                {/* Floating Credit UI */}
                <div className="absolute top-0 right-0 p-8">
                  <div className="bg-slate-900 text-white px-6 py-4 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col items-center min-w-[120px]">
                    <span className="text-3xl font-black tracking-tighter">{credits}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Voice Credits</span>
                    <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${credits}%` }}
                        className="h-full bg-blue-500" 
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-xl mb-12">
                  <h2 className="text-3xl font-black text-slate-900 mb-4">{INITIAL_QUADRATIC_POLLS[0].question}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">{INITIAL_QUADRATIC_POLLS[0].description}</p>
                </div>

                <div className="grid gap-4">
                  {pollOptions.map((option) => (
                    <div 
                      key={option.id}
                      className="group relative bg-slate-50 rounded-[2rem] p-6 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20`}>
                            {option.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-900">{option.text}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{option.spent} Votes Cast</span>
                              <span className="text-[10px] font-bold text-slate-400">Total Cost: {option.spent * option.spent} Credits</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => handleAdjustCredit(option.id, -1)}
                            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm active:scale-90"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                          <div className="w-12 text-center text-2xl font-black text-slate-900">{option.spent}</div>
                          <button 
                            onClick={() => handleAdjustCredit(option.id, 1)}
                            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm active:scale-90"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-10 bg-blue-600 text-white h-16 rounded-[1.5rem] font-black tracking-widest uppercase text-sm shadow-xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                  <Fingerprint className="w-5 h-5" /> Finalize My Decision
                </button>
              </motion.div>
            </div>

            {/* --- AI INSIGHTS SIDEBAR --- */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/20 blur-[60px]" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-blue-400">AI Consensus</h4>
                    <p className="text-[10px] font-bold text-white/40">Live Analysis</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 italic text-white/80 text-sm leading-relaxed">
                    <MessageSquareQuote className="w-5 h-5 text-blue-400 mb-2 opacity-50" />
                    "{COMMUNITY_CONSENSUS.summary}"
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                    <span>Community Consensus: 78%</span>
                    <span>{COMMUNITY_CONSENSUS.lastUpdated}</span>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" /> Current Momentum
                </h4>
                <div className="space-y-6">
                  {[
                    { label: "STEM Education", val: 88, color: "bg-blue-500" },
                    { label: "Road Grading", val: 42, color: "bg-slate-300" },
                    { label: "Job Hubs", val: 65, color: "bg-emerald-500" }
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                        <span>{item.label}</span>
                        <span className="text-slate-900">{item.val}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          className={`h-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liquid Democracy CTA */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 rounded-[2.5rem] p-8 group cursor-pointer hover:border-blue-300 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-5 h-5 text-slate-400" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Delegated Voting</span>
                </div>
                <p className="text-sm text-slate-500 font-medium mb-4">Transfer your credits to a verified community expert.</p>
                <div className="flex items-center justify-between font-bold text-blue-600 text-sm group-hover:gap-2 transition-all">
                   Manage Proxy <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TRACKER TAB --- */}
        {activeTab === 'tracker' && (
          <div className="grid gap-6">
            {ASSURANCES.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden"
              >
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">{item.promise}</h3>
                    <p className="text-slate-500 font-medium max-w-xl">{item.notes}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="w-full sm:w-48">
                       <div className="flex justify-between text-[11px] font-black text-slate-900 uppercase mb-2">
                        <span>Fulfillment</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600 shadow-lg shadow-blue-500/20'}`}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setExpandedTracker(expandedTracker === item.id ? null : item.id)}
                      className="w-full sm:w-auto h-16 px-10 bg-slate-900 text-white rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                    >
                      {expandedTracker === item.id ? 'Hide Evidence' : 'Audit Evidence'}
                      <History className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTracker === item.id && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="bg-slate-50 border-t border-slate-100"
                    >
                      <div className="p-12">
                         <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-10">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Verified Audit Logs
                         </div>
                         <div className="grid gap-12 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[20px] top-2 bottom-2 w-px bg-slate-200" />
                            
                            {item.verification.map((v, i) => (
                              <div key={i} className="flex gap-10 relative group">
                                <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center z-10 group-hover:border-emerald-500 transition-colors">
                                  <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-emerald-500" />
                                </div>
                                <div>
                                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{v.type}</div>
                                  <div className="text-lg font-bold text-slate-900 mb-1">{v.event}</div>
                                  <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{v.date}</div>
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