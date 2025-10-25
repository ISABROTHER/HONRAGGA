import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Calendar, CheckCircle2, ChevronRight, Clock, FileText, Handshake, HeartHandshake,
  HelpCircle, MapPin, Megaphone, MessageCircle, Newspaper, Phone, Send, ThumbsUp, Users, Video, Vote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

type IssueKey = 'jobs' | 'education' | 'health' | 'infrastructure';
type PollOption = 'strongly_agree' | 'agree' | 'neutral' | 'disagree';

const ISSUES: Record<IssueKey, { title: string; summary: string; bullets: string[]; icon: any; color: string }> = {
  jobs: {
    title: 'Jobs & Enterprise',
    summary: 'Unlock local opportunity through skills, MSME support, and value-chain acceleration.',
    bullets: [
      '1,000 youth into paid internships & apprenticeships',
      'Seed fund + coaching for 200 micro businesses',
      'Public–private projects prioritizing local hires'
    ],
    icon: Handshake,
    color: 'from-emerald-500/20 to-emerald-700/20'
  },
  education: {
    title: 'Education & Skills',
    summary: 'Modern classrooms, digital labs, and real pipelines to first jobs.',
    bullets: [
      'STEM & digital labs in 10 schools',
      'Teacher upskilling with local industry mentors',
      'Classroom-to-Career pathways with employers'
    ],
    icon: FileText,
    color: 'from-sky-500/20 to-sky-700/20'
  },
  health: {
    title: 'Health & Wellbeing',
    summary: 'Primary care that is closer, faster, and kinder.',
    bullets: [
      'Community clinics with telehealth access',
      'Maternal health outreach & screenings',
      'Mental health first-aid in schools'
    ],
    icon: HeartHandshake,
    color: 'from-rose-500/20 to-rose-700/20'
  },
  infrastructure: {
    title: 'Roads & Infrastructure',
    summary: 'Fix critical links, light the streets, and maintain what we build.',
    bullets: [
      'Road patch + maintenance tracker',
      'Street lighting coverage to 95%',
      'Water points & drainage clean-ups'
    ],
    icon: MapPin,
    color: 'from-amber-500/20 to-amber-700/20'
  }
};

export default function MPPortal() {
  const [activeIssue, setActiveIssue] = useState<IssueKey>('jobs');

  // Micro-poll state (stored locally)
  const [pollAnswer, setPollAnswer] = useState<PollOption | null>(null);
  const [pollData, setPollData] = useState<Record<PollOption, number>>({
    strongly_agree: 42, agree: 24, neutral: 13, disagree: 7
  });
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mp_portal_poll');
      if (saved) {
        const { answer, data } = JSON.parse(saved);
        setPollAnswer(answer);
        if (data) setPollData(data);
      }
    } catch {}
  }, []);
  const submitPoll = (choice: PollOption) => {
    if (pollAnswer) return;
    const next = { ...pollData, [choice]: pollData[choice] + 1 };
    setPollData(next);
    setPollAnswer(choice);
    try { localStorage.setItem('mp_portal_poll', JSON.stringify({ answer: choice, data: next })); } catch {}
  };
  const pollTotal = Object.values(pollData).reduce((a, b) => a + b, 0);

  // Ask Your MP (mini Q&A)
  const [question, setQuestion] = useState('');
  const [faq, setFaq] = useState<{ q: string; a: string }[]>([
    { q: 'How do I request community support?', a: 'Use the “Constituency Desk” WhatsApp number in the Action Dock, or visit the constituency office Mon–Fri, 9am–4pm.' },
    { q: 'How are road repairs prioritized?', a: 'Reported hazards + school/health access routes are prioritized first. Use the report link in the Action Dock to log locations.' },
    { q: 'How can students get internships?', a: 'Apply through Classroom-to-Career partners. We publish calls in the Media section and at schools.' }
  ]);
  const askMP = () => {
    if (!question.trim()) return;
    // simple heuristic answer
    const lower = question.toLowerCase();
    let a = 'Thanks for your question! The team will follow up by email/WhatsApp within 48 hours.';
    if (lower.includes('road') || lower.includes('pothole')) a = 'Road issues are mapped and triaged weekly. Share GPS pin + photo via the Report link; urgent hazards get same-week action.';
    if (lower.includes('scholar') || lower.includes('bursary')) a = 'Scholarship announcements are posted before each academic term. Prepare transcripts and a referee letter.';
    if (lower.includes('health') || lower.includes('clinic')) a = 'Primary clinics operate 8am–6pm; telehealth is available after hours. Screening days are announced monthly.';
    setFaq(prev => [{ q: question.trim(), a }, ...prev].slice(0, 6));
    setQuestion('');
  };

  // Timeline
  const timeline = [
    { date: 'Q1', title: 'Youth Skills Cohort I', desc: '250 trainees onboarded with stipends.', icon: Users },
    { date: 'Q2', title: 'Clinic Upgrade Phase', desc: 'Two facilities refitted; telehealth pilot live.', icon: HeartHandshake },
    { date: 'Q3', title: 'Road Fix Blitz', desc: 'Major patchwork & drainage cleared in 6 zones.', icon: MapPin },
    { date: 'Q4', title: 'SME Seed Fund', desc: '200 micro-businesses funded & mentored.', icon: Handshake },
  ];

  // Events (mock)
  const events = [
    { id: 'ev1', title: 'Constituency Townhall – North Zone', date: '2025-11-05T17:00:00', where: 'Community Centre A', type: 'Townhall' },
    { id: 'ev2', title: 'Health Outreach & Screenings', date: '2025-11-12T09:00:00', where: 'Clinic B Grounds', type: 'Outreach' },
    { id: 'ev3', title: 'Youth Jobs Fair', date: '2025-11-20T10:00:00', where: 'Technical Institute Hall', type: 'Jobs' },
  ];
  const [rsvp, setRsvp] = useState<Record<string, boolean>>({});

  // Media snapshot (from your Supabase table)
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3);
        if (error) throw error;
        setPosts(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPosts(false);
      }
    })();
  }, []);

  const active = ISSUES[activeIssue];

  return (
    <div className="min-h-screen bg-[radial-gradient(900px_500px_at_100%_-10%,rgba(0,43,91,0.06),transparent_60%),radial-gradient(900px_700px_at_0%_10%,rgba(255,107,0,0.06),transparent_60%)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#002B5B] text-white">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#FF6B00] blur-3xl opacity-30" />
        <div className="absolute top-10 -left-10 h-72 w-72 rounded-full bg-white blur-3xl opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <motion.h1 initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Working For You — Every Day
            </motion.h1>
            <p className="mt-4 md:mt-6 text-base md:text-xl text-white/90 max-w-3xl mx-auto">
              Real progress on jobs, schools, clinics, and roads — with your voice at the centre.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="#issues" className="px-5 py-3 rounded-full bg-white text-[#002B5B] font-semibold hover:bg-white/90 transition">
                Explore Agenda
              </a>
              <a href="#media" className="px-5 py-3 rounded-full bg-[#FF6B00] text-white font-semibold hover:bg-[#E66000] transition flex items-center">
                Latest Updates <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ISSUES NAVIGATOR */}
      <section id="issues" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-[#FF6B00]/40 via-amber-300/30 to-[#002B5B]/40 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
          <div className="relative rounded-3xl bg-white/25 backdrop-blur-xl border border-white/40 p-6 md:p-8">
            <div className="flex gap-2 overflow-auto no-scrollbar pb-2 mb-6">
              {Object.keys(ISSUES).map((k) => {
                const key = k as IssueKey;
                const Icon = ISSUES[key].icon;
                const activeTab = activeIssue === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveIssue(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                      activeTab
                        ? 'bg-[#002B5B] text-white border-[#002B5B]'
                        : 'bg-white/70 text-gray-800 border-white/60 hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {ISSUES[key].title}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIssue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${active.color} border border-white/40`}
              >
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{active.title}</h3>
                <p className="text-gray-700 mb-4">{active.summary}</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#FF6B00] mt-0.5" />
                      <span className="text-gray-800">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Pulse Poll */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-white/70 backdrop-blur border border-white/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Vote className="w-4 h-4 text-[#002B5B]" />
                  <h4 className="font-semibold text-gray-900">Townhall Pulse</h4>
                </div>
                <p className="text-sm text-gray-700 mb-3">“This plan addresses the most urgent needs.” Do you agree?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['strongly_agree', 'agree', 'neutral', 'disagree'] as PollOption[]).map(opt => {
                    const label = opt.replace('_', ' ');
                    const pct = Math.round((pollData[opt] / (pollTotal || 1)) * 100);
                    const selected = pollAnswer === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => submitPoll(opt)}
                        className={`rounded-lg border p-2 text-xs font-medium transition ${
                          selected ? 'bg-[#002B5B] text-white border-[#002B5B]' : 'bg-white/70 border-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="capitalize">{label}</div>
                        <div className="text-[11px] opacity-70">{pct}%</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ask Your MP */}
              <div className="rounded-xl bg-white/70 backdrop-blur border border-white/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-[#002B5B]" />
                  <h4 className="font-semibold text-gray-900">Ask Your MP</h4>
                </div>
                <div className="flex gap-2">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question…"
                    className="flex-1 rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                  <button
                    onClick={askMP}
                    className="px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E66000] transition flex items-center"
                  >
                    <Send className="w-4 h-4 mr-1" /> Send
                  </button>
                </div>
                <ul className="mt-4 space-y-3">
                  {faq.map((item, i) => (
                    <li key={i} className="rounded-lg bg-white/70 border border-white/60 p-3">
                      <p className="text-sm font-semibold text-gray-900">Q: {item.q}</p>
                      <p className="text-sm text-gray-700 mt-1">A: {item.a}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#002B5B]" />
          <h3 className="text-xl font-extrabold text-gray-900">This Year’s Milestones</h3>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {timeline.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="rounded-xl bg-white/70 backdrop-blur border border-white/60 p-4">
                <div className="text-xs text-gray-600">{t.date}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#FF6B00]" />
                  <div className="font-semibold text-gray-900">{t.title}</div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#002B5B]" />
          <h3 className="text-xl font-extrabold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map(ev => {
            const date = new Date(ev.date);
            const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return (
              <div key={ev.id} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 p-5">
                <div className="text-xs text-gray-600">{ev.type}</div>
                <div className="mt-1 font-bold text-gray-900">{ev.title}</div>
                <div className="mt-1 text-sm text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {ev.where}
                </div>
                <div className="mt-1 text-sm text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {date.toLocaleString()}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setRsvp(prev => ({ ...prev, [ev.id]: !prev[ev.id] }))}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                      rsvp[ev.id] ? 'bg-[#002B5B] text-white' : 'bg-white border border-white/60 hover:bg-white'
                    }`}
                  >
                    {rsvp[ev.id] ? '✔ RSVPed' : 'RSVP'}
                  </button>
                  <a
                    className="text-sm text-[#FF6B00] hover:underline flex items-center"
                    href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${encodeURIComponent(ev.title)}%0ADTSTART:${date
                      .toISOString()
                      .replace(/[-:]/g, '')
                      .replace(/\.\d{3}Z$/, 'Z')}%0ALOCATION:${encodeURIComponent(ev.where)}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download={`${ev.title}.ics`}
                  >
                    Add to calendar <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MEDIA SNAPSHOT (Supabase) */}
      <section id="media" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#002B5B]" />
          <h3 className="text-xl font-extrabold text-gray-900">Latest from the Media Desk</h3>
        </div>
        {loadingPosts ? (
          <div className="text-center py-10">
            <div className="inline-block w-10 h-10 border-4 border-[#002B5B] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-3">Loading…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-gray-600">No recent posts yet.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p) => {
              const Icon = ((p.category || '').toLowerCase() === 'video') ? Video
                : ((p.category || '').toLowerCase().includes('press')) ? Megaphone
                : FileText;
              return (
                <article key={p.id} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 overflow-hidden">
                  {p.image_url ? (
                    <div className="h-40 overflow-hidden">
                      <img src={p.image_url} alt={p.title || 'post image'} className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Icon className="w-4 h-4 text-[#FF6B00]" />
                      <span className="uppercase tracking-wide">{(p.category || 'article').replace('-', ' ')}</span>
                      <span>•</span>
                      <span>{p.published_at ? new Date(p.published_at).toLocaleDateString() : ''}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 line-clamp-2">{p.title}</h4>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{p.excerpt}</p>
                    <div className="mt-4">
                      <a href="/news" className="text-[#002B5B] font-semibold hover:underline inline-flex items-center">
                        Read more <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ACTION DOCK (floating) */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-lg p-2 flex flex-col gap-2">
          <a href="tel:+233200000000" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#002B5B] text-white hover:bg-[#013766] transition">
            <Phone className="w-4 h-4" /> Call Office
          </a>
          <a href="https://wa.me/233200000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">
            <MessageCircle className="w-4 h-4" /> WhatsApp Desk
          </a>
          <a href="/volunteer" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-[#002B5B] border border-white/60 hover:bg-white transition">
            <Users className="w-4 h-4" /> Volunteer
          </a>
          <a href="/donate" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FF6B00] text-white hover:bg-[#E66000] transition">
            <ThumbsUp className="w-4 h-4" /> Donate
          </a>
        </div>
      </div>

      {/* Small CSS helpers */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
