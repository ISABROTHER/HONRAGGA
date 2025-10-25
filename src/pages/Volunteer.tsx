import { useState, useEffect, useRef } from 'react';
import { DollarSign, CreditCard, Gift, X, User, Phone, Filter, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Keep supabase import for potential future use
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

// Moved outside component as it doesn't depend on state/props
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

// Moved outside component as it doesn't depend on state/props
const getPillarTitleFromSlug = (slug: string): string => {
  if (slug === 'general') return 'General CETRA2030 Support';
  const pillar = pillars.find((p) => p.slug === slug);
  return pillar ? pillar.title : 'General Support';
};

// --- MODAL COMPONENT ---
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
  currency: Currency; // Pass currency for formatting
  userLocale: string; // Pass locale for formatting
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
  currency, // Receive currency
  userLocale, // Receive locale
}: ContributionConfirmModalProps) {
  const pillarTitle = getPillarTitleFromSlug(pillarSlug);
  // Re-added formatCurrency locally for the modal, now using props
  const formatCurrencyModal = (n: number): string => {
      if (!n || n <= 0) return '...';
      try {
          return new Intl.NumberFormat(userLocale, { 
              style: 'currency', 
              currency: currency, 
              maximumFractionDigits: 0 
          }).format(Math.round(n || 0));
      } catch {
          return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`;
      }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              {/* Updated Modal Title Color */}
              <h2 className="text-2xl font-bold text-green-900 mb-2 text-center">Confirm Contribution</h2>

              <div className="my-5 text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">You are contributing</p>
                 {/* Updated Amount Color & Use Modal Formatter */}
                <p className="text-3xl font-bold text-green-900 my-1">{formatCurrencyModal(amount)}</p>
                <p className="text-sm text-gray-600">towards</p>
                {/* Accent color for pillar */}
                <p className="font-semibold text-[#FF6B00]">{pillarTitle}</p> 
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onConfirmAndPay();
                }}
                className="space-y-4"
              >
                {/* Inputs now use accent color for focus ring */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="First Name & Surname *" required value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="First Name & Surname (required)" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" placeholder="Email Address *" required value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="Email Address (required)" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" placeholder="Phone Number (Optional)" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="Phone Number (optional)" />
                </div>

                {/* Checkboxes now use accent color */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="showPublicly" checked={showPublicly} onChange={(e) => setShowPublicly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50" />
                    <label htmlFor="showPublicly" className="text-sm text-gray-700 cursor-pointer select-none">Show my name in the feed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="showAmountPublicly" checked={showAmountPublicly} onChange={(e) => setShowAmountPublicly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50" />
                    <label htmlFor="showAmountPublicly" className="text-sm text-gray-700 cursor-pointer select-none">Show the amount publicly</label>
                  </div>
                </div>

                {/* Confirm button uses accent color */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg flex items-center justify-center mt-4"
                  disabled={!donorName || !donorEmail}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Confirm & Proceed to Payment
                </Button>
                <p className="text-center text-xs text-gray-500 pt-2">
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

  const [donationForm, setDonationForm] = useState<{
    amount: number;
    selectedPillar: string;
    customAmount: string;
  }>({
    amount: 0,
    selectedPillar: pillars[0].slug,
    customAmount: '',
  });

  const [currency, setCurrency] = useState<Currency>(userLocale.includes('GH') ? 'GHS' : 'USD');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currency === 'GHS' ? 'paystack' : 'applePay');
  
   const fmt = (n: number) => {
      if (!n || n <= 0) return '...';
      try {
          return new Intl.NumberFormat(userLocale, { 
              style: 'currency', 
              currency, 
              maximumFractionDigits: 0 
          }).format(Math.round(n || 0));
      } catch {
          return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`;
      }
   }


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
  useEffect(() => { /* ... unchanged ... */ try { const saved = localStorage.getItem('donation_pref'); if (saved) { const p = JSON.parse(saved) as { amount?: number; pillar?: string }; setDonationForm((prev) => ({ ...prev, amount: p.amount && p.amount > 0 ? p.amount : prev.amount, selectedPillar: p.pillar || prev.selectedPillar, })); } } catch { /* ignore */ } }, []);
  useEffect(() => { /* ... unchanged ... */ try { if (donationForm.amount > 0) { localStorage.setItem( 'donation_pref', JSON.stringify({ amount: donationForm.amount, pillar: donationForm.selectedPillar }), ); } } catch { /* ignore */ } }, [donationForm.amount, donationForm.selectedPillar]);

  // Keep payment method valid when currency changes
  useEffect(() => {
    if (currency === 'GHS' && paymentMethod === 'applePay') {
      setPaymentMethod('paystack');
    }
  }, [currency, paymentMethod]);

  // --- MOCK DATA GENERATION ---
  useEffect(() => { /* ... unchanged ... */ setLoadingDonations(true); const mockData: Donation[] = []; const names = ['Ama P.', 'Kwesi Mensah', 'Yaw B.', 'Adwoa Ltd', 'Kofi Annan', 'Efua S.', 'Nana K.', 'Aisha Co.', 'Kwabena F.', 'Akosua']; const now = new Date(); for (let i = 0; i < 20; i++) { const date = new Date(now); if (i < 3) { date.setHours(now.getHours() - i * 3); } else if (i < 7) { date.setDate(now.getDate() - i); } else if (i < 12) { date.setMonth(now.getMonth() - Math.floor(i / 2)); date.setDate(Math.floor(Math.random() * 28) + 1); } else { date.setFullYear(now.getFullYear() - Math.floor((i - 10) / 3)); date.setMonth(Math.floor(Math.random() * 12)); date.setDate(Math.floor(Math.random() * 28) + 1); } mockData.push({ id: `mock-${i}`, created_at: date.toISOString(), name: names[i % names.length], amount: [25, 50, 100, 250, 50, 75, 500, 30][i % 8], project_supported: i % 4 === 0 ? 'general' : pillars[i % pillars.length].slug, display_publicly: true, display_amount_publicly: i % 3 !== 0, }); } mockData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); setAllDonations(mockData); setLoadingDonations(false); }, []);
  // --- END MOCK DATA ---

  const handleAmountSelect = (amount: number) => {
    setDonationForm((prev) => ({ ...prev, amount, customAmount: '' }));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const numeric = value === '' ? 0 : parseInt(value, 10);
      setDonationForm((prev) => ({ ...prev, customAmount: value, amount: numeric }));
    }
  };

  const handlePillarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDonationForm((prev) => ({ ...prev, selectedPillar: e.target.value }));
  };

  const primeModalPrivacyFromAnonymous = () => {
    // If anonymous, force hide name and amount
    if (anonymous) {
        setShowPublicly(false);
        setShowAmountPublicly(false);
    } else {
        // If not anonymous, reset to defaults (or keep current state if needed)
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
    if (currency === 'GHS' && paymentMethod !== 'paystack') {
      setPaymentMethod('paystack');
    }
    setMessage('');
    primeModalPrivacyFromAnonymous(); // Set modal privacy based on anonymous checkbox
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAndPay = () => { /* ... unchanged ... */ const finalAmount = donationForm.amount; const pillarTitle = getPillarTitleFromSlug(donationForm.selectedPillar); setIsConfirmModalOpen(false); const methodLabel = paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack (Visa/Mastercard/MoMo)'; alert( `Initiating ${methodLabel} for ${fmt(finalAmount)} towards ${pillarTitle}${ isRecurring ? ' • Monthly' : '' }.\n(This is a demo placeholder.)` ); const newDonation: Donation = { id: `new-${Date.now()}`, created_at: new Date().toISOString(), name: anonymous ? 'Anonymous' : donorName || 'Supporter', amount: finalAmount, project_supported: donationForm.selectedPillar, display_publicly: !anonymous && showPublicly, display_amount_publicly: !anonymous && showAmountPublicly, }; const updatedDonations = [newDonation, ...allDonations].sort( (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(), ); setAllDonations(updatedDonations); setMessage('Thank you for your generous contribution!'); setDonationForm({ amount: 0, selectedPillar: pillars[0].slug, customAmount: '' }); setDonorName(''); setDonorPhone(''); setDonorEmail(''); setShowPublicly(true); setShowAmountPublicly(true); setAnonymous(false); setIsRecurring(false); window.setTimeout(() => setMessage(''), 5000); };

  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  const hasValidAmount = donationForm.amount > 0;

  const submitForm = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  // Filtered donations
  const filteredDonations = allDonations
    .filter((donation) => { /* ...unchanged... */ const donationDate = new Date(donation.created_at); const now = new Date(); switch (sortPeriod) { case 'today': return donationDate.toDateString() === now.toDateString(); case 'this_month': return donationDate.getFullYear() === now.getFullYear() && donationDate.getMonth() === now.getMonth(); case 'this_year': return donationDate.getFullYear() === now.getFullYear(); case 'all': default: return true; } })
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero - Updated background color */}
      <section className="relative overflow-hidden bg-green-900 text-white py-16 md:py-24"> 
         {/* Updated background textures to use accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(1200px 600px at 50% -10%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(800px 400px at 100% 20%, rgba(255,255,255,0.08), transparent 50%)',
          }}
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-[#FF6B00]/10" />
        <AnimatedSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Use accent color for title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4 text-[#FF6B00]"> 
              Support the Movement
            </h1>
            <div className="flex justify-center">
              <span className="h-1 w-20 md:w-24 rounded-full bg-white/50" /> 
              {/* Lighter underline */}
            </div>
             {/* Adjusted paragraph font size and color */}
            <p className="mt-5 md:mt-6 text-lg md:text-xl text-green-100/90 max-w-3xl mx-auto leading-relaxed"> 
              Your contribution fuels the CETRA2030 agenda, directly empowering the youth of Cape Coast North.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={80}>
            <form ref={formRef} onSubmit={handleDonateSubmit} aria-labelledby="donate-form-heading">
              <h2 id="donate-form-heading" className="sr-only">Donation Form</h2>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-6">
                {/* Initiative Selection */}
                <div>
                  <label htmlFor="pillarSelect" className="block text-sm font-medium text-gray-700 mb-2">
                    Support a Specific Initiative (Optional)
                  </label>
                  {/* Updated select styling */}
                  <select
                    id="pillarSelect"
                    name="pillarSelect"
                    value={donationForm.selectedPillar}
                    onChange={handlePillarChange}
                    className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                  >
                    {pillars.map((pillar) => (
                      <option key={pillar.slug} value={pillar.slug}>
                        {pillar.title}
                      </option>
                    ))}
                    <option value="general">General CETRA2030 Support</option>
                  </select>
                </div>

                {/* Amount + Currency */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                     {/* Updated label style */}
                    <label className="block text-base font-medium text-gray-800">Choose Donation Amount</label> 
                    <div className="flex items-center gap-2">
                      <label htmlFor="currency" className="text-xs text-gray-600">Currency</label>
                      <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#FF6B00] focus:outline-none">
                        <option value="USD">USD</option>
                        <option value="GHS">GHS</option>
                      </select>
                    </div>
                  </div>

                  {/* Updated amount button styles */}
                  <div role="group" aria-label="Quick amounts" className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
                    {[25, 50, 100, 250, 500, 1000].map((amount) => {
                      const isActive = donationForm.amount === amount && donationForm.customAmount === '';
                      return (
                        <button
                          type="button"
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          aria-pressed={isActive}
                          className={[
                            'px-5 py-4 border rounded-lg font-semibold transition-all text-center outline-none text-base', // Larger base text
                            isActive
                              ? 'bg-green-800 text-white border-green-800 ring-2 ring-offset-2 ring-[#FF6B00]' // Dark green active state
                              : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-green-700 hover:bg-green-50 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]', // Hover uses green
                          ].join(' ')}
                        >
                          {fmt(amount)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Updated custom amount input */}
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input inputMode="numeric" type="number" min={1} placeholder="Or enter custom amount" value={donationForm.customAmount} onChange={handleCustomAmountChange} className="w-full text-base pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-describedby="amountHelp" />
                  </div>
                  <p id="amountHelp" className="mt-2 text-xs text-gray-500">Pick a preset or enter any whole number.</p>
                </div>

                {/* Payment Method - Updated styles */}
                <div>
                  <p className="text-base font-medium text-gray-800 mb-2">Choose Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setPaymentMethod('paystack')} aria-pressed={paymentMethod === 'paystack'} className={['w-full rounded-lg px-4 py-3 border text-base font-medium transition', paymentMethod === 'paystack' ? 'bg-green-800 text-white border-green-800' : 'bg-white text-gray-800 border-gray-300 hover:bg-green-50 hover:border-green-700',].join(' ')}>
                       {/* Paystack Icon Placeholder */} <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm mr-1 align-middle"></span> Paystack 
                    </button>
                    {currency === 'USD' ? (
                      <button type="button" onClick={() => setPaymentMethod('applePay')} aria-pressed={paymentMethod === 'applePay'} className={['w-full rounded-lg px-4 py-3 border text-base font-medium transition', paymentMethod === 'applePay' ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-black',].join(' ')}>
                         Apple&nbsp;Pay
                      </button>
                    ) : (
                      <div className="w-full rounded-lg px-4 py-3 border border-dashed border-gray-300 text-gray-400 text-center text-sm"> Apple&nbsp;Pay (USD only)</div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Using Visa/Mastercard? Select Paystack. For GHS, Paystack (MoMo/Card) is required.</p>
                </div>

                {/* Recurring + Anonymous - Updated styles */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <label htmlFor="recurring" className="text-sm font-medium text-green-900">Make this a monthly donation</label>
                        <input id="recurring" type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="h-5 w-5 accent-[#FF6B00] focus:ring-offset-1 focus:ring-[#FF6B00]/50 rounded"/>
                    </div>
                     <label className="flex items-center gap-2 text-sm text-gray-700 pl-1 cursor-pointer">
                        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 accent-[#FF6B00] rounded border-gray-300 focus:ring-offset-1 focus:ring-[#FF6B00]/50"/>
                        Give anonymously <span className="text-xs text-gray-500">(hide name & amount)</span>
                     </label>
                </div>

                {/* Trust / Info */}
                <div>
                    {/* ... (Trust/Info unchanged) ... */}
                   <div className="grid gap-3 md:gap-4"><div className="text-center text-xs text-gray-500">Secure payments via <span className="font-semibold">Paystack</span> & <span className="font-semibold">Apple Pay</span> supported.</div><div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><ul className="text-xs text-gray-600 space-y-2"><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />SSL secured & privacy-first</li><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Industry-standard processing</li><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Funds support local initiatives</li></ul></div></div>
                </div>

                {/* Feedback */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                    {/* ... (Feedback unchanged) ... */}
                   {message && (<div className={`mt-1 p-3 rounded-lg text-sm ${message.toLowerCase().includes('thank') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>)}
                </div>

                {/* Main Donate Button (Desktop/Tablet) - Accent Color */}
                <Button
                  type="submit"
                  size="lg"
                  className={`hidden md:flex w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg items-center justify-center ${
                    hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'
                  }`}
                  disabled={!hasValidAmount}
                  aria-disabled={!hasValidAmount}
                  aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Contribute {fmt(donationForm.amount)}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By contributing, you confirm you understand applicable campaign finance regulations.
                </p>
              </div>
            </form>
          </AnimatedSection>

          {/* Recent Contributions Feed - Updated styles */}
          <AnimatedSection delay={140}>
            <div className="mt-12 md:mt-16">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 px-1">
                 {/* Updated heading color */}
                 <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-3 sm:mb-0"> 
                    Recent Contributions
                 </h3>
                 <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                   <Filter size={16} className="text-gray-500 ml-1" />
                   {(['all','today','this_month','this_year'] as SortPeriod[]).map((value) => {
                     const label = value === 'all' ? 'All Time' : value === 'today' ? 'Today' : value === 'this_month' ? 'This Month' : 'This Year';
                     return (
                       <button
                         key={value}
                         onClick={() => setSortPeriod(value)}
                         // Updated filter button styles
                         className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ 
                           sortPeriod === value ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600 hover:text-green-800'
                         }`}
                         aria-pressed={sortPeriod === value}
                       >
                         {label}
                       </button>
                     );
                   })}
                 </div>
              </div>

              {loadingDonations ? (
                 <div className="space-y-3 max-w-lg mx-auto"> {/* ... (Skeleton unchanged) ... */} {[...Array(3)].map((_, i) => ( <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden relative"><div className="h-4 w-40 bg-gray-200 rounded mb-2" /><div className="h-3 w-56 bg-gray-100 rounded" /><div className="shimmer absolute inset-0" /></div> ))} <p className="text-center text-sm text-gray-500">Loading contributions...</p> </div>
              ) : filteredDonations.length === 0 ? (
                 <p className="text-center text-gray-500 py-8">No contributions found for this period. Be the first!</p>
              ) : (
                <div role="list" className="space-y-3 md:space-y-4 max-w-lg mx-auto">
                  {filteredDonations.map((donation) => (
                    <motion.div
                      role="listitem"
                      key={donation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      // Updated list item style
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center hover:bg-green-50 transition-colors" 
                    >
                      <div className="pr-3">
                         {/* Updated text styles */}
                        <p className="font-semibold text-base text-gray-800">{donation.name}</p> 
                        <p className="text-xs text-gray-500">
                          Supported: {getPillarTitleFromSlug(donation.project_supported)}
                        </p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                         {donation.display_amount_publicly !== false ? (
                           // Updated amount text color
                           <span className="text-base font-bold text-green-800 block"> 
                             {fmt(donation.amount)}
                           </span>
                         ) : (
                           <span className="text-sm font-semibold text-gray-500 block italic">Supported</span>
                         )}
                         {/* Consistent time format */}
                        <span className="text-xs text-gray-400 block mt-0.5">{formatRelativeTime(donation.created_at)}</span> 
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-4">Showing contributions. Your support makes a difference!</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Sticky Summary + Quick Donate Bar - Accent Color */}
      <div className="md:hidden fixed bottom-20 inset-x-4 z-40 text-center text-xs text-gray-700">
        {/* ... (Mobile summary unchanged) ... */}
        {hasValidAmount ? ( <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-full px-3 py-2 shadow"> {fmt(donationForm.amount)} • {getPillarTitleFromSlug(donationForm.selectedPillar).split(' (')[0]} {isRecurring ? ' • Monthly' : ''} • {paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'} </div> ) : null}
      </div>
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <Button
          type="button"
          size="lg"
          onClick={submitForm}
          className={`w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center ${ hasValidAmount ? '' : 'opacity-60 cursor-not-allowed' }`}
          disabled={!hasValidAmount}
          aria-disabled={!hasValidAmount}
          aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}
        >
          <Gift className="w-5 h-5 mr-2" />
          Contribute {fmt(donationForm.amount)}
        </Button>
      </div>
      
      {/* Render the Modal */}
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
        currency={currency} // Pass currency to modal
        userLocale={userLocale} // Pass locale to modal
      />

      {/* CSS */}
      <style>{`
        .animate-section-enter { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .transition-all, .animate-section-enter { transition: none !important; } }
        .shimmer::before { content: ""; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}