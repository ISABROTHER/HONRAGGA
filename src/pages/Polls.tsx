// src/pages/Polls.tsx
import { useState, useEffect } from 'react';
import { PieChart, CheckCircle2, AlertCircle, BarChart3, Vote, ListChecks } from 'lucide-react';
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
    notes: "Roofing stage completed. Stalls currently being partitioned.",
    confidence: 90,
    verified: true
  },
  {
    id: 2,
    promise: "1,000 Desks for Basic Schools",
    category: "Education",
    status: "Completed",
    progress: 100,
    date: "Oct 2024",
    notes: "Distributed to 15 schools across the constituency.",
    confidence: 98,
    verified: true
  },
  {
    id: 3,
    promise: "Rehabilitation of Adisadel Town Roads",
    category: "Infrastructure",
    status: "Delayed",
    progress: 40,
    date: "Aug 2025",
    notes: "Delayed due to heavy rains in July. Work has resumed.",
    confidence: 55,
    verified: false
  },
  {
    id: 4,
    promise: "Scholarship Scheme Expansion",
    category: "Education",
    status: "On Track",
    progress: 80,
    date: "Jan 2025",
    notes: "Applications processed. Disbursement scheduled for next term.",
    confidence: 88,
    verified: true
  }
];

export function Polls() {
  const [activeTab, setActiveTab] = useState<'polls' | 'tracker'>('polls');
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [votedPolls, setVotedPolls] = useState<string[]>([]);
  const [issues, setIssues] = useState<{ id: string; message: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('user_voted_polls');
    if (stored) setVotedPolls(JSON.parse(stored));
  }, []);

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.includes(pollId)) return;
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
    const newVoted = [...votedPolls, pollId];
    setVotedPolls(newVoted);
    localStorage.setItem('user_voted_polls', JSON.stringify(newVoted));
  };

  const submitIssue = (message: string) => {
    const issue = { id: Date.now().toString(), message };
    setIssues([...issues, issue]);
    setIssues([...issues, issue]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* AI CHAT WIDGET (Modern Civic Communication Layer) */}
        <div className="mb-6">
          <iframe
            src="https://chat.openai.com/chat"
            className="w-full h-[420px] rounded-2xl border border-slate-200 shadow-sm"
            title="Constituency AI Assistant"
          />
        </div>

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

        {/* ISSUE SUBMISSION POOL */}
        {activeTab === 'polls' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-3">Report a Constituency Issue</h4>
            <textarea
              placeholder="Describe the issue (e.g., flooding spot, school needs, health facility concerns, sanitation, etc.)"
              className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:outline-none"
              onBlur={(e) => submitIssue(e.target.value)}
            />
            <p className="text-xs text-slate-400 mt-2">Submitted issues will feed the AI for priority analysis.</p>

            {issues.length > 0 && (
              <div className="mt-4 space-y-2">
                {issues.map(i => (
                  <div key={i.id} className="text-xs bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-600">
                    {i.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab('polls')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold ${
                activeTab === 'polls' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Vote className="w-4 h-4" /> Active Polls
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold ${
                activeTab === 'tracker' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ListChecks className="w-4 h-4" /> Assurance Tracker
            </button>
          </div>
        </div>

        {/* ASSURANCE TRACKER TAB */}
        {activeTab === 'tracker' && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                    <th className="p-6 font-bold">Promise / Project</th>
                    <th className="p-6 font-bold hidden md:table-cell">Category</th>
                    <th className="p-6 font-bold text-center">Status</th>
                    <th className="p-6 font-bold hidden lg:table-cell">Delivery Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ASSURANCES.map(item => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-slate-900 text-base mb-1">{item.promise}</div>
                        <p className="text-xs text-slate-500">{item.notes}</p>
                      </td>
                      <td className="p-6 hidden md:table-cell">
                        <span className="text-sm font-medium text-slate-600">{item.category}</span>
                      </td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border">
                          {item.verified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="p-6 hidden lg:table-cell">
                        <span className="text-xs font-bold text-slate-700">{item.confidence}% Confidence</span>
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
