import { useState, useEffect, useRef } from 'react';
import { DollarSign, Gift, X, User, Phone, Filter, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase'; // (kept for future use)
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Duplication for Pillars (from Events.tsx) ---
const pillars = [
  { title: 'Cape Works Initiative (CWI)', slug: 'cwi' },
  { title: 'Cape Innovates Accelerator (CIA)', slug: 'cia' },
  { title: 'Digital Cape Project (DCP)', slug: 'dcp' },
  { title: 'Heritage Jobs 360 (HJ360)', slug: 'hj360' },
  { title: 'Classroom to Career (C2C)', slug: 'c2c' },
  { title: 'Cape Coast North Youth Development Fund (CCNYDF)', slug: 'ccnydf' },
  { title: 'Cape Impact Dashboard (CID)', slug: 'cid' },
];
// --- End Data Duplication ---

// Donation type
type Donation = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  project_supported: string;
  display_publicly?: boolean;
  display_amount_publicly?: boolean;
};

type SortPeriod = 'all' | 'today' | 'this_month' | 'this_year';
type Currency = 'USD' | 'GHS';
type PaymentMethod = 'paystack' | 'applePay';

const AnimatedSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-section-enter');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.classList.add('opacity-0', 'translate-y-5');
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Helpers
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);
  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffMonths < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (diffYears < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

const getPillarTitleFromSlug = (slug: string): string => {
  if (slug === 'general') return 'General CETRA2030 Support';
  const pillar = pillars.find((p) => p.slug === slug);
  return pillar ? pillar.title : 'General Support';
};

// --- MODAL (Frosted glass) ---
interface ContributionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pillarSlug: string;
  donorName: string;
  setDonorName: (name: string) => void;
  donorPhone: string;
  setDonorPhone: (phone: string) => void;
  donorEmail: string;
  setDonorEmail: (email: string) => void;
  showPublicly: boolean;
  setShowPublicly: (show: boolean) => void;
  showAmountPublicly: boolean;
  setShowAmountPublicly: (show: boolean) => void;
  onConfirmAndPay: () => void;
  currency: Currency;
  userLocale: string;
}

function ContributionConfirmModal({
  isOpen,
  onClose,
  amount,
  pillarSlug,
  donorName,
  setDonorName,
  donorPhone,
  setDonorPhone,
  donorEmail,
  setDonorEmail,
  showPublicly,
  setShowPublicly,
  showAmountPublicly,
  setShowAmountPublicly,
  onConfirmAndPay,
  currency,
  userLocale,
}: ContributionConfirmModalProps) {
  const pillarTitle = getPillarTitleFromSlug(pillarSlug);
  const formatCurrencyModal = (n: number): string => {
    if (!n || n <= 0) return '...';
    try {
      return new Intl.NumberFormat(userLocale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(Math.round(n || 0));
    } catch {
      return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
            className="relative max-w-md w-full overflow-hidden rounded-3xl border border-white/30 bg-white/20 backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* sheen overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-70" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF6B00] via-amber-400 to-[#002B5B]" />

            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>

              <h2 className="text-center text-2xl font-extrabold text-white drop-shadow-sm">
                Confirm Contribution
              </h2>

              <div className="my-5 text-center bg-white/30 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm">
                <p className="text-sm text-white/80">You are contributing</p>
                <p className="text-3xl font-black text-white my-1">{formatCurrencyModal(amount)}</p>
                <p className="text-sm text-white/80">towards</p>
                <p className="font-semibold text-white">{pillarTitle}</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onConfirmAndPay();
                }}
                className="space-y-4"
              >
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    placeholder="First Name & Surname *"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full text-base pl-9 pr-4 py-3 rounded-xl border border-white/40 bg-white/20 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    aria-label="First Name & Surname (required)"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full text-base pl-9 pr-4 py-3 rounded-xl border border-white/40 bg-white/20 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    aria-label="Email Address (required)"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full text-base pl-9 pr-4 py-3 rounded-xl border border-white/40 bg-white/20 text-white placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    aria-label="Phone Number (optional)"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-sm text-white/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="showPublicly"
                      checked={showPublicly}
                      onChange={(e) => setShowPublicly(e.target.checked)}
                      className="h-4 w-4 rounded border-white/40 text-[#FF6B00] focus:ring-[#FF6B00]/50 bg-white/20"
                    />
                    Show my name in the feed
                  </label>
                  <label className="flex items-center gap-2 text-sm text-white/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="showAmountPublicly"
                      checked={showAmountPublicly}
                      onChange={(e) => setShowAmountPublicly(e.target.checked)}
                      className="h-4 w-4 rounded border-white/40 text-[#FF6B00] focus:ring-[#FF6B00]/50 bg-white/20"
                    />
                    Show the amount publicly
                  </label>
                </div>

                <div className="relative">
                  {/* glow aura */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00] opacity-30 blur transition duration-500" />
                  <Button
                    type="submit"
                    size="lg"
                    className="relative w-full rounded-2xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-xl flex items-center justify-center mt-4 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={!donorName || !donorEmail}
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Confirm & Proceed to Payment
                  </Button>
                </div>

                <p className="text-center text-xs text-white/80 pt-2">
                  You will be redirected to complete payment via Paystack or Apple Pay.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// --- END MODAL ---

export function Volunteer() {
  const formRef = useRef<HTMLFormElement>(null);
  const userLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

  const [donationForm, setDonationForm] = useState<{ amount: number; selectedPillar: string; customAmount: string }>({
    amount: 0,
    selectedPillar: pillars[0].slug,
    customAmount: '',
  });

  const [currency, setCurrency] = useState<Currency>(userLocale.includes('GH') ? 'GHS' : 'USD');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currency === 'GHS' ? 'paystack' : 'applePay');
  const fmt = (n: number) => {
    if (!n || n <= 0) return '...';
    try {
      return new Intl.NumberFormat(userLocale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(
        Math.round(n || 0),
      );
    } catch {
      return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`;
    }
  };

  const [isRecurring, setIsRecurring] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [sortPeriod, setSortPeriod] = useState<SortPeriod>('all');

  // Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showPublicly, setShowPublicly] = useState(true);
  const [showAmountPublicly, setShowAmountPublicly] = useState(true);

  // Remember last amount & pillar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('donation_pref');
      if (saved) {
        const p = JSON.parse(saved) as { amount?: number; pillar?: string };
        setDonationForm((prev) => ({
          ...prev,
          amount: p.amount && p.amount > 0 ? p.amount : prev.amount,
          selectedPillar: p.pillar || prev.selectedPillar,
        }));
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      if (donationForm.amount > 0) {
        localStorage.setItem('donation_pref', JSON.stringify({ amount: donationForm.amount, pillar: donationForm.selectedPillar }));
      }
    } catch {}
  }, [donationForm.amount, donationForm.selectedPillar]);

  // Keep payment method valid when currency changes
  useEffect(() => {
    if (currency === 'GHS' && paymentMethod === 'applePay') setPaymentMethod('paystack');
  }, [currency, paymentMethod]);

  // Mock data
  useEffect(() => {
    setLoadingDonations(true);
    const mockData: Donation[] = [];
    const names = ['Ama P.', 'Kwesi Mensah', 'Yaw B.', 'Adwoa Ltd', 'Kofi Annan', 'Efua S.', 'Nana K.', 'Aisha Co.', 'Kwabena F.', 'Akosua'];
    const now = new Date();
    for (let i = 0; i < 20; i++) {
      const date = new Date(now);
      if (i < 3) date.setHours(now.getHours() - i * 3);
      else if (i < 7) date.setDate(now.getDate() - i);
      else if (i < 12) {
        date.setMonth(now.getMonth() - Math.floor(i / 2));
        date.setDate(Math.floor(Math.random() * 28) + 1);
      } else {
        date.setFullYear(now.getFullYear() - Math.floor((i - 10) / 3));
        date.setMonth(Math.floor(Math.random() * 12));
        date.setDate(Math.floor(Math.random() * 28) + 1);
      }
      mockData.push({
        id: `mock-${i}`,
        created_at: date.toISOString(),
        name: names[i % names.length],
        amount: [25, 50, 100, 250, 50, 75, 500, 30][i % 8],
        project_supported: i % 4 === 0 ? 'general' : pillars[i % pillars.length].slug,
        display_publicly: true,
        display_amount_publicly: i % 3 !== 0,
      });
    }
    mockData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setAllDonations(mockData);
    setLoadingDonations(false);
  }, []);

  const handleAmountSelect = (amount: number) => setDonationForm((prev) => ({ ...prev, amount, customAmount: '' }));
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numeric = value === '' ? 0 : parseInt(value, 10);
      setDonationForm((prev) => ({ ...prev, customAmount: value, amount: numeric }));
    }
  };
  const handlePillarChange = (e: React.ChangeEvent<HTMLSelectElement>) => setDonationForm((prev) => ({ ...prev, selectedPillar: e.target.value }));

  const primeModalPrivacyFromAnonymous = () => {
    if (anonymous) {
      setShowPublicly(false);
      setShowAmountPublicly(false);
    } else {
      setShowPublicly(true);
      setShowAmountPublicly(true);
    }
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donationForm.amount <= 0) {
      setMessage('Please select or enter a valid donation amount.');
      window.setTimeout(() => setMessage(''), 5000);
      return;
    }
    if (currency === 'GHS' && paymentMethod !== 'paystack') setPaymentMethod('paystack');
    setMessage('');
    primeModalPrivacyFromAnonymous();
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAndPay = () => {
    const finalAmount = donationForm.amount;
    const pillarTitle = getPillarTitleFromSlug(donationForm.selectedPillar);
    setIsConfirmModalOpen(false);
    const methodLabel = paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack (Visa/Mastercard/MoMo)';
    alert(`Initiating ${methodLabel} for ${fmt(finalAmount)} towards ${pillarTitle}${isRecurring ? ' • Monthly' : ''}.\n(This is a demo placeholder.)`);

    const newDonation: Donation = {
      id: `new-${Date.now()}`,
      created_at: new Date().toISOString(),
      name: anonymous ? 'Anonymous' : donorName || 'Supporter',
      amount: finalAmount,
      project_supported: donationForm.selectedPillar,
      display_publicly: !anonymous && showPublicly,
      display_amount_publicly: !anonymous && showAmountPublicly,
    };
    const updated = [newDonation, ...allDonations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setAllDonations(updated);

    setMessage('Thank you for your generous contribution!');
    setDonationForm({ amount: 0, selectedPillar: pillars[0].slug, customAmount: '' });
    setDonorName(''); setDonorPhone(''); setDonorEmail('');
    setShowPublicly(true); setShowAmountPublicly(true);
    setAnonymous(false); setIsRecurring(false);
    window.setTimeout(() => setMessage(''), 5000);
  };

  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  const hasValidAmount = donationForm.amount > 0;
  const submitForm = () => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

  // Filtered donations (top 10)
  const filteredDonations = allDonations
    .filter((donation) => {
      const donationDate = new Date(donation.created_at);
      const now = new Date();
      switch (sortPeriod) {
        case 'today': return donationDate.toDateString() === now.toDateString();
        case 'this_month': return donationDate.getFullYear() === now.getFullYear() && donationDate.getMonth() === now.getMonth();
        case 'this_year': return donationDate.getFullYear() === now.getFullYear();
        case 'all': default: return true;
      }
    })
    .slice(0, 10);

  // Faux progress (percent only)
  const progressPct = 72;

  return (
    <div
      className="min-h-screen bg-[radial-gradient(1200px_800px_at_80%_-10%,rgba(255,107,0,0.06),transparent_60%),radial-gradient(900px_700px_at_0%_10%,rgba(0,43,91,0.06),transparent_60%)] pb-24 md:pb-0"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* HERO with mesh & glow */}
      <section className="relative overflow-hidden bg-[#002B5B] text-white py-16 md:py-24">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#FF6B00] blur-3xl opacity-30" />
        <div className="absolute top-10 -left-10 h-72 w-72 rounded-full bg-white blur-3xl opacity-10" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-[#FF6B00]/20" />
        <AnimatedSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4">Support the Movement</h1>
            <div className="flex justify-center"><span className="h-1 w-24 rounded-full bg-[#FF6B00]" /></div>
            <p className="mt-5 md:mt-6 text-base md:text-2xl text-gray-100/90 max-w-3xl mx-auto leading-relaxed">
              Your contribution fuels the CETRA2030 agenda, directly empowering the youth of Cape Coast North.
            </p>
          </div>
        </AnimatedSection>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl opacity-40" />
      </section>

      {/* DONATE SECTION — Frosted glass card with pop-up */}
      <section id="donate" className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={80}>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF6B00]/40 via-amber-300/30 to-[#002B5B]/40 shadow-[0_8px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-xl" />
              <form
                ref={formRef}
                onSubmit={handleDonateSubmit}
                aria-labelledby="donate-form-heading"
                className="relative rounded-3xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl p-5 md:p-8 space-y-7"
              >
                <h2 id="donate-form-heading" className="sr-only">Donation Form</h2>

                {/* Pillar chips */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">Choose an initiative</p>
                  <div className="flex gap-2 overflow-auto no-scrollbar py-1">
                    {pillars.map((p) => {
                      const active = donationForm.selectedPillar === p.slug;
                      return (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => setDonationForm((prev) => ({ ...prev, selectedPillar: p.slug }))}
                          className={[
                            'whitespace-nowrap px-3 py-2 rounded-full border text-sm transition-all',
                            active ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm' : 'bg-white/60 text-gray-800 border-white/60 hover:bg-white/80',
                          ].join(' ')}
                          aria-pressed={active}
                          title={p.title}
                        >
                          {p.title.split(' (')[0]}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setDonationForm((prev) => ({ ...prev, selectedPillar: 'general' }))}
                      className={[
                        'whitespace-nowrap px-3 py-2 rounded-full border text-sm transition-all',
                        donationForm.selectedPillar === 'general' ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm' : 'bg-white/60 text-gray-800 border-white/60 hover:bg-white/80',
                      ].join(' ')}
                    >
                      General
                    </button>
                  </div>
                </div>

                {/* Progress (percent only) */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
                    <span>{progressPct}% funded</span>
                    <span aria-hidden="true">&nbsp;</span>
                  </div>
                  <div className="h-2 bg-white/40 rounded">
                    <div
                      className="h-2 bg-[#FF6B00] rounded transition-all"
                      style={{ width: `${progressPct}%` }}
                      aria-valuenow={progressPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      role="progressbar"
                    />
                  </div>
                </div>

                {/* Amount + Currency */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-900">Donation Amount</label>
                    <div className="flex items-center gap-2">
                      <label htmlFor="currency" className="text-xs text-gray-700">Currency</label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="text-xs border border-white/60 bg-white/60 rounded px-2 py-1 focus:ring-1 focus:ring-[#FF6B00] focus:outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="GHS">GHS</option>
                      </select>
                    </div>
                  </div>

                  <div role="group" aria-label="Quick amounts" className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
                    {donationAmounts.map((amount) => {
                      const isActive = donationForm.amount === amount && donationForm.customAmount === '';
                      return (
                        <button
                          type="button"
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          aria-pressed={isActive}
                          className={[
                            'px-5 py-4 border rounded-xl font-semibold transition-all text-center outline-none text-base',
                            isActive
                              ? 'bg-[#002B5B] text-white border-[#002B5B] ring-2 ring-offset-2 ring-[#FF6B00]'
                              : 'bg-white/60 text-gray-900 border-white/60 hover:bg-white/80 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]',
                          ].join(' ')}
                        >
                          {fmt(amount)}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                    <input
                      inputMode="numeric"
                      type="number"
                      min={1}
                      placeholder="Or enter custom amount"
                      value={donationForm.customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full text-base pl-10 pr-4 py-3 border border-white/60 bg-white/60 rounded-xl text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      aria-describedby="amountHelp"
                    />
                  </div>
                  <p id="amountHelp" className="mt-2 text-xs text-gray-700">Pick a preset or enter any whole number.</p>
                </div>

                {/* Divider */}
                <div className="relative"><div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" /></div>

                {/* Payment Method */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Choose Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paystack')}
                      aria-pressed={paymentMethod === 'paystack'}
                      className={[
                        'w-full rounded-xl px-4 py-3 border text-base font-medium transition',
                        paymentMethod === 'paystack'
                          ? 'bg-[#002B5B] text-white border-[#002B5B] shadow'
                          : 'bg-white/60 text-gray-900 border-white/60 hover:bg-white/80',
                      ].join(' ')}
                      title="Visa / Mastercard / MoMo"
                    >
                      <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm mr-2 align-middle" />
                      Paystack
                    </button>

                    {currency === 'USD' ? (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('applePay')}
                        aria-pressed={paymentMethod === 'applePay'}
                        className={[
                          'w-full rounded-xl px-4 py-3 border text-base font-medium transition',
                          paymentMethod === 'applePay'
                            ? 'bg-black text-white border-black shadow'
                            : 'bg-white/60 text-gray-900 border-white/60 hover:bg-white/80',
                        ].join(' ')}
                      >
                         Apple&nbsp;Pay
                      </button>
                    ) : (
                      <div className="w-full rounded-xl px-4 py-3 border border-dashed border-white/60 text-gray-700 text-center text-sm">
                         Apple&nbsp;Pay (USD only)
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-700">
                    Using Visa/Mastercard? Select <span className="font-semibold">Paystack</span>. For GHS, Paystack (MoMo/Card) is required.
                  </p>
                </div>

                {/* Recurring + Anonymous */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center justify-between bg-white/40 border border-white/60 rounded-xl p-3">
                    <label htmlFor="recurring" className="text-sm font-medium text-gray-900">Make this a monthly donation</label>
                    <input id="recurring" type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="h-5 w-5 accent-[#FF6B00]" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-900 pl-1 cursor-pointer">
                    <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 accent-[#FF6B00] rounded border-white/60" />
                    Give anonymously <span className="text-xs text-gray-700">(hide name & amount)</span>
                  </label>
                </div>

                {/* Trust / Info */}
                <div className="grid gap-3 md:gap-4">
                  <div className="text-center text-xs text-gray-900">
                    Secure payments via <span className="font-semibold">Paystack</span> & <span className="font-semibold">Apple Pay</span> supported.
                  </div>
                  <div className="bg-white/40 border border-white/60 rounded-xl p-4">
                    <ul className="text-xs text-gray-900 space-y-2">
                      <li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />SSL secured & privacy-first</li>
                      <li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Industry-standard processing</li>
                      <li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Funds support local initiatives</li>
                    </ul>
                  </div>
                </div>

                {/* Feedback */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {message && (
                    <div className={`mt-1 p-3 rounded-lg text-sm ${message.toLowerCase().includes('thank') ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-800'}`}>
                      {message}
                    </div>
                  )}
                </div>

                {/* Desktop/Tablet CTA with glow aura + pop */}
                <div className="relative hidden md:block">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00] opacity-30 blur transition duration-500" />
                  <Button
                    type="submit"
                    size="lg"
                    className={`relative w-full rounded-2xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-xl items-center justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'}`}
                    disabled={!hasValidAmount}
                    aria-disabled={!hasValidAmount}
                    aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Contribute {fmt(donationForm.amount)}
                  </Button>
                </div>

                <p className="text-xs text-gray-800 text-center">By contributing, you confirm you understand applicable campaign finance regulations.</p>
              </form>
            </motion.div>
          </AnimatedSection>

          {/* Recent Contributions */}
          <AnimatedSection delay={140}>
            <div className="mt-12 md:mt-16">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 px-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#002B5B] mb-3 sm:mb-0 tracking-tight">Recent Contributions</h3>
                <div className="flex items-center space-x-2 bg-white/50 backdrop-blur border border-white/60 p-1 rounded-lg">
                  <Filter size={16} className="text-gray-700 ml-1" />
                  {(['all', 'today', 'this_month', 'this_year'] as SortPeriod[]).map((value) => {
                    const label = value === 'all' ? 'All Time' : value === 'today' ? 'Today' : value === 'this_month' ? 'This Month' : 'This Year';
                    return (
                      <button
                        key={value}
                        onClick={() => setSortPeriod(value)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${sortPeriod === value ? 'bg-white text-[#002B5B] shadow-sm' : 'text-gray-700 hover:text-[#002B5B]'}`}
                        aria-pressed={sortPeriod === value}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mb-6" />

              {loadingDonations ? (
                <div className="space-y-3 max-w-lg mx-auto">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur p-4 rounded-lg border border-white/60 shadow-sm overflow-hidden relative">
                      <div className="h-4 w-40 bg-white/70 rounded mb-2" />
                      <div className="h-3 w-56 bg-white/60 rounded" />
                      <div className="shimmer absolute inset-0" />
                    </div>
                  ))}
                  <p className="text-center text-sm text-gray-700">Loading contributions...</p>
                </div>
              ) : filteredDonations.length === 0 ? (
                <p className="text-center text-gray-700 py-8">No contributions found for this period. Be the first!</p>
              ) : (
                <div role="list" className="space-y-3 md:space-y-4 max-w-lg mx-auto">
                  {filteredDonations.map((donation) => (
                    <motion.div
                      role="listitem"
                      key={donation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/70 backdrop-blur p-4 rounded-xl border border-white/60 shadow-sm flex justify-between items-center hover:bg-white/90 transition-colors"
                    >
                      <div className="pr-3">
                        <p className="font-semibold text-base text-gray-900">{donation.name}</p>
                        <p className="text-xs text-gray-700">Supported: {getPillarTitleFromSlug(donation.project_supported)}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        {donation.display_amount_publicly !== false ? (
                          <span className="text-base font-bold text-[#002B5B] block">{fmt(donation.amount)}</span>
                        ) : (
                          <span className="text-sm font-semibold text-gray-700 block italic">Supported</span>
                        )}
                        <span className="text-xs text-gray-600 block mt-0.5">{formatRelativeTime(donation.created_at)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-800 text-center mt-4">Showing contributions. Your support makes a difference!</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Sticky Summary + CTA (glass + pop) */}
      <div className="md:hidden fixed bottom-20 inset-x-4 z-40 text-center text-xs text-gray-900">
        {hasValidAmount ? (
          <div className="bg-white/80 backdrop-blur border border-white/60 rounded-full px-3 py-2 shadow">
            {fmt(donationForm.amount)} • {getPillarTitleFromSlug(donationForm.selectedPillar).split(' (')[0]}
            {isRecurring ? ' • Monthly' : ''} • {paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}
          </div>
        ) : null}
      </div>
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <div className="relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00] opacity-30 blur" />
          <Button
            type="button"
            size="lg"
            onClick={submitForm}
            className={`relative w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!hasValidAmount}
            aria-disabled={!hasValidAmount}
            aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}
          >
            <Gift className="w-5 h-5 mr-2" />
            Contribute {fmt(donationForm.amount)}
          </Button>
        </div>
      </div>

      {/* Modal */}
      <ContributionConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        amount={donationForm.amount}
        pillarSlug={donationForm.selectedPillar}
        donorName={donorName}
        setDonorName={setDonorName}
        donorPhone={donorPhone}
        setDonorPhone={setDonorPhone}
        donorEmail={donorEmail}
        setDonorEmail={setDonorEmail}
        showPublicly={showPublicly}
        setShowPublicly={setShowPublicly}
        showAmountPublicly={showAmountPublicly}
        setShowAmountPublicly={setShowAmountPublicly}
        onConfirmAndPay={handleConfirmAndPay}
        currency={currency}
        userLocale={userLocale}
      />

      {/* CSS */}
      <style>{`
        .animate-section-enter { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .transition-all, .animate-section-enter { transition: none !important; } }
        .shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
