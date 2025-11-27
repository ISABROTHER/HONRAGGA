// src/pages/Polls.tsx
import { useState, useEffect } from 'react';
import { 
  PieChart, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart3,
  Vote,
  ListChecks
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOCK DATA ---
const INITIAL_POLLS = [
  {
    id: '1',
    question: "Which sector should receive the highest priority in the 2026 budget?",
    totalVotes: 1240,
    options: [
      { id: 'a', text: "Healthcare & Clinics", votes: 350 },
      { id: 'b', text: "Education & Scholarships", votes: 420 },
      { id: 'c', text: "Roads & Infrastructure", votes: 290 },
      { id: 'd', text: "Youth Jobs & Training", votes: 180 },
    ]
  },
  {
    id: '2',
    question: "Do you support the proposed location for the new community center?",
    totalVotes: 850,
    options: [
      { id: 'yes', text: "Yes, it's central", votes: 600 },
      { id: 'no', text: "No, it's too far", votes: 250 },
    ]
  }
];

const ASSURANCES = [
  {
    id: 1,
    promise: "Construction of Kwaprow Community Market",
    category: "Infrastructure",
    status: "On Track",
    progress: 65,
    date: "Dec 2025",
    notes: "Roofing stage completed. Stalls currently being partitioned."
  },
  {
    id: 2,
    promise: "1,000 Desks for Basic Schools",
    category: "Education",
    status: "Completed",
    progress: 100,
    date: "Oct 2024",
    notes: "Distributed to 15 schools across the constituency."
  },
  {
    id: 3,
    promise: "Rehabilitation of Adisadel Town Roads",
    category: "Infrastructure",
    status: "Delayed",
    progress: 40,
    date: "Aug 2025",
    notes: "Delayed due to heavy rains in July. Work has resumed."
  },
  {
    id: 4,
    promise: "Scholarship Scheme Expansion",
    category: "Education",
    status: "On Track",
    progress: 80,
    date: "Jan 2025",
    notes: "Applications processed. Disbursement scheduled for next term."
  }
];

export function Polls() {
  const [activeTab, setActiveTab] = useState<'polls' | 'tracker'>('polls');
  // Local state to simulate voting without DB
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [votedPolls, setVotedPolls] = useState<string[]>([]);

  // Load voted state from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user_voted_polls');
    if (stored) setVotedPolls(JSON.parse(stored));
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    // Prevent double voting simulation
    if (votedPolls.includes(pollId)) return;

    // Update mock state
    const newPolls = polls.map(p => {
      if (p.id === pollId) {
        return {
          ...p,
          totalVotes: p.totalVotes + 1,
          options: p.options.map(o => 
            o.id === optionId ? { ...o, votes: o.votes + 1 } : o
          )
        };
      }
      return p;
    });

    setPolls(newPolls);
    
    // Save to local storage
    const newVoted = [...votedPolls, pollId];
    setVotedPolls(newVoted);
    localStorage.setItem('user_voted_polls', JSON.stringify(newVoted));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'On Track': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delayed': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 border border-purple-100 mb-4">
            <PieChart className="w-3.5 h-3.5 text-purple-700" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-purple-700">
              Citizen Voice
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Polls & Assurance Tracker
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Participate in decision-making and track the progress of promises made to the constituency.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab('polls')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'polls' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Vote className="w-4 h-4" /> Active Polls
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'tracker' 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ListChecks className="w-4 h-4" /> Assurance Tracker
            </button>
          </div>
        </div>

        {/* --- POLLS TAB --- */}
        {activeTab === 'polls' && (
          <div className="grid gap-8 md:grid-cols-2">
            {polls.map((poll) => {
              const hasVoted = votedPolls.includes(poll.id);

              return (
                <motion.div 
                  key={poll.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {poll.question}
                    </h3>
                    <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded flex-shrink-0 ml-2">
                      {poll.totalVotes} votes
                    </div>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percent = poll.totalVotes > 0 
                        ? Math.round((option.votes / poll.totalVotes) * 100) 
                        : 0;
                      
                      return (
                        <div key={option.id} className="relative">
                          {hasVoted ? (
                            // RESULTS VIEW
                            <div className="relative h-12 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="absolute top-0 left-0 h-full bg-purple-100"
                              />
                              <div className="absolute inset-0 flex items-center justify-between px-4">
                                <span className="font-medium text-slate-700 text-sm z-10">{option.text}</span>
                                <span className="font-bold text-purple-700 text-sm z-10">{percent}%</span>
                              </div>
                            </div>
                          ) : (
                            // VOTING VIEW
                            <button
                              onClick={() => handleVote(poll.id, option.id)}
                              className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group flex items-center justify-between"
                            >
                              <span className="font-medium text-slate-700 group-hover:text-purple-900">{option.text}</span>
                              <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-purple-500 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {hasVoted && (
                    <p className="text-center text-xs text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> You have voted in this poll
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* --- TRACKER TAB --- */}
        {activeTab === 'tracker' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                    <th className="p-6 font-bold">Promise / Project</th>
                    <th className="p-6 font-bold hidden md:table-cell">Category</th>
                    <th className="p-6 font-bold text-center">Status</th>
                    <th className="p-6 font-bold hidden lg:table-cell">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ASSURANCES.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-slate-900 text-base mb-1">{item.promise}</div>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.notes}</p>
                        <div className="md:hidden mt-2">
                           <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{item.category}</span>
                        </div>
                      </td>
                      <td className="p-6 hidden md:table-cell">
                        <span className="text-sm font-medium text-slate-600">{item.category}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(item.status)}`}>
                          {item.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {item.status === 'On Track' && <BarChart3 className="w-3.5 h-3.5" />}
                          {item.status === 'Delayed' && <AlertCircle className="w-3.5 h-3.5" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6 hidden lg:table-cell w-48">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-600 w-8">{item.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}