import { useState, useEffect, useRef } from 'react';
import { DollarSign, CreditCard, Gift, X, User, Phone, Filter } from 'lucide-react';
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

// Updated Donation type definition
type Donation = {
  id: string;
  created_at: string; // ISO String format
  name: string;
  amount: number;
  project_supported: string;
  display_publicly?: boolean;
  display_amount_publicly?: boolean; // Added field for amount visibility
};

type SortPeriod = 'all' | 'today' | 'this_month' | 'this_year'; // Define sort types

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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
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

function formatCurrency(n: number): string {
  if (!n || n <= 0) return '...';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(n));
  } catch {
    return `$${Math.round(n)}`;
  }
}

// Helper to format timestamps relative to now
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffMonths = Math.round(diffDays / 30); // Approximate
  const diffYears = Math.round(diffDays / 365); // Approximate

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffMonths < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., Oct 20
  if (diffYears < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., Oct 20
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }); // e.g., Oct 2024
}


// --- MODAL COMPONENT (Updated with amount visibility checkbox) ---
interface ContributionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pillarSlug: string;
  donorName: string;
  setDonorName: (name: string) => void;
  donorPhone: string;
  setDonorPhone: (phone: string) => void;
  showPublicly: boolean;
  setShowPublicly: (show: boolean) => void;
  showAmountPublicly: boolean; // New prop
  setShowAmountPublicly: (show: boolean) => void; // New prop setter
  onConfirmAndPay: () => void;
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
  showPublicly,
  setShowPublicly,
  showAmountPublicly, // Destructure new prop
  setShowAmountPublicly, // Destructure new prop setter
  onConfirmAndPay,
}: ContributionConfirmModalProps) {
  const pillarTitle = getPillarTitleFromSlug(pillarSlug);

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
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="Close modal">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-[#002B5B] mb-2 text-center">Confirm Contribution</h2>
              
              <div className="my-5 text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">You are contributing</p>
                <p className="text-3xl font-bold text-[#002B5B] my-1">{formatCurrency(amount)}</p>
                <p className="text-sm text-gray-600">towards</p>
                <p className="font-semibold text-[#FF6B00]">{pillarTitle}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); onConfirmAndPay(); }} className="space-y-4">
                 <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 text-sm"
                      aria-label="Your Name (required)"
                    />
                 </div>
                 <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 text-sm"
                      aria-label="Phone Number (optional)"
                    />
                 </div>

                 {/* Public Display Preferences */}
                 <div className="space-y-2 pt-2">
                   <div className="flex items-center space-x-2">
                      <input
                         type="checkbox"
                         id="showPublicly"
                         checked={showPublicly}
                         onChange={(e) => setShowPublicly(e.target.checked)}
                         className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50"
                      />
                      <label htmlFor="showPublicly" className="text-xs text-gray-600 cursor-pointer select-none">
                         Show my name in the 'Recent Contributions' feed as appreciation
                      </label>
                   </div>
                   {/* New Checkbox for Amount Visibility */}
                   <div className="flex items-center space-x-2">
                       <input
                           type="checkbox"
                           id="showAmountPublicly"
                           checked={showAmountPublicly}
                           onChange={(e) => setShowAmountPublicly(e.target.checked)}
                           className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50"
                       />
                       <label htmlFor="showAmountPublicly" className="text-xs text-gray-600 cursor-pointer select-none">
                           Show the contribution amount publicly
                       </label>
                   </div>
                 </div>

                 <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg flex items-center justify-center mt-4"
                    disabled={!donorName} // Require name
                 >
                    <Gift className="w-5 h-5 mr-2" />
                    Confirm & Proceed to Payment
                 </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
// --- END MODAL COMPONENT ---


// Helper function outside component
const getPillarTitleFromSlug = (slug: string): string => {
  if (slug === 'general') return 'General CETRA2030 Support';
  const pillar = pillars.find((p) => p.slug === slug);
  return pillar ? pillar.title : 'General Support';
};

export function Volunteer() {
  const formRef = useRef<HTMLFormElement>(null);

  const [donationForm, setDonationForm] = useState<{
    amount: number;
    selectedPillar: string;
    customAmount: string;
  }>({
    amount: 0,
    selectedPillar: pillars[0].slug,
    customAmount: '',
  });

  const [message, setMessage] = useState('');
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [sortPeriod, setSortPeriod] = useState<SortPeriod>('all');

  // Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [showPublicly, setShowPublicly] = useState(true);
  const [showAmountPublicly, setShowAmountPublicly] = useState(true); // New state for amount visibility


  useEffect(() => {
    generateMockDonations(); 
  }, []);

  // --- MOCK DATA GENERATION (Updated) ---
  const generateMockDonations = () => {
    setLoadingDonations(true);
    const mockData: Donation[] = [];
    const names = ["Ama P.", "Kwesi Mensah", "Yaw B.", "Adwoa Ltd", "Kofi Annan", "Efua S.", "Nana K.", "Aisha Co.", "Kwabena F.", "Akosua"];
    const now = new Date();

    for (let i = 0; i < 20; i++) {
        let date = new Date(now);
        // ... (date generation logic remains the same)
        if (i < 3) { date.setHours(now.getHours() - i * 3); } 
        else if (i < 7) { date.setDate(now.getDate() - i); } 
        else if (i < 12) { date.setMonth(now.getMonth() - Math.floor(i / 2)); date.setDate(Math.random() * 28 + 1); } 
        else { date.setFullYear(now.getFullYear() - Math.floor((i - 10) / 3)); date.setMonth(Math.floor(Math.random() * 12)); date.setDate(Math.random() * 28 + 1); }

        mockData.push({
            id: `mock-${i}`,
            created_at: date.toISOString(),
            name: names[i % names.length],
            amount: [25, 50, 100, 250, 50, 75, 500, 30][i % 8],
            project_supported: i % 4 === 0 ? 'general' : pillars[i % pillars.length].slug,
            display_publicly: true, 
            display_amount_publicly: i % 3 !== 0, // Randomly hide amount for some mock entries
        });
    }
    mockData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setAllDonations(mockData);
    setLoadingDonations(false);
  };
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

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donationForm.amount <= 0) {
      setMessage('Please select or enter a valid donation amount.');
      window.setTimeout(() => setMessage(''), 5000);
      return;
    }
    setMessage(''); 
    setIsConfirmModalOpen(true);
  };

  // Updated to include showAmountPublicly
  const handleConfirmAndPay = () => {
    const finalAmount = donationForm.amount;
    const pillarTitle = getPillarTitleFromSlug(donationForm.selectedPillar);

    setIsConfirmModalOpen(false);
    alert(
      `Initiating donation of ${formatCurrency(finalAmount)} for ${donorName} towards ${pillarTitle}.\n(Proceeding to Stripe/Payment... - This is a demo placeholder.)`
    );

    // --- MOCK: Add to list instantly (Updated) ---
    const newDonation: Donation = {
        id: `new-${Date.now()}`,
        created_at: new Date().toISOString(),
        name: donorName,
        amount: finalAmount,
        project_supported: donationForm.selectedPillar,
        display_publicly: showPublicly,
        display_amount_publicly: showAmountPublicly, // Include new flag
    };
    const updatedDonations = [newDonation, ...allDonations]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setAllDonations(updatedDonations); 
    // --- END MOCK ---

    setMessage('Thank you for your generous contribution!');
    // Reset form state including new amount visibility state
    setDonationForm({ amount: 0, selectedPillar: pillars[0].slug, customAmount: '' });
    setDonorName('');
    setDonorPhone('');
    setShowPublicly(true);
    setShowAmountPublicly(true); // Reset amount visibility checkbox
    window.setTimeout(() => setMessage(''), 5000); 
    
    // In real app, call Supabase insert *after* payment success
    // saveDonationToSupabase(newDonation); // Pass newDonation data including display_amount_publicly
  };


  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  const hasValidAmount = donationForm.amount > 0;

  const submitForm = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  // Filtering logic remains the same
  const filteredDonations = allDonations.filter(donation => {
      // ... (filtering logic based on sortPeriod) ...
      const donationDate = new Date(donation.created_at);
      const now = new Date();
      switch (sortPeriod) {
          case 'today': return donationDate.toDateString() === now.toDateString();
          case 'this_month': return donationDate.getFullYear() === now.getFullYear() && donationDate.getMonth() === now.getMonth();
          case 'this_year': return donationDate.getFullYear() === now.getFullYear();
          case 'all': default: return true;
      }
  }).slice(0, 10); 

  const sortOptions: { label: string; value: SortPeriod }[] = [
      { label: 'All Time', value: 'all' },
      { label: 'Today', value: 'today' },
      { label: 'This Month', value: 'this_month' },
      { label: 'This Year', value: 'this_year' },
  ];


  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002B5B] text-white py-16 md:py-24">
         {/* ... (Hero content remains the same) ... */}
         <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(255,107,0,0.18), transparent 60%), radial-gradient(800px 400px at 100% 20%, rgba(255,255,255,0.10), transparent 50%)' }} />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-[#FF6B00]/20" />
        <AnimatedSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4">Support the Movement</h1>
            <div className="flex justify-center"><span className="h-1 w-20 md:w-24 rounded-full bg-[#FF6B00]" /></div>
            <p className="mt-5 md:mt-6 text-base md:text-2xl text-gray-200/90 max-w-3xl mx-auto leading-relaxed">Your contribution fuels the CETRA2030 agenda, directly empowering the youth of Cape Coast North.</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* ... (Donate section title remains the same) ... */}
            <div className="text-center mb-8 md:mb-12"><h2 className="text-2xl md:text-4xl font-extrabold text-[#002B5B] mb-3 md:mb-4">Fuel the Transformation: Support CETRA2030</h2><p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">Every contribution, big or small, directly empowers our youth and strengthens our community. Choose an initiative below or provide general support.</p></div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <form ref={formRef} onSubmit={handleDonateSubmit} aria-labelledby="donate-title"> 
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-6">
                {/* ... (Form fields remain the same) ... */}
                <div><label htmlFor="pillarSelect" className="block text-sm font-medium text-gray-700 mb-2">Support a Specific Initiative (Optional)</label><select id="pillarSelect" name="pillarSelect" value={donationForm.selectedPillar} onChange={handlePillarChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900">{pillars.map((pillar) => (<option key={pillar.slug} value={pillar.slug}>{pillar.title}</option>))}<option value="general">General CETRA2030 Support</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Choose Donation Amount (USD)</label><div role="group" aria-label="Quick amounts" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4">{donationAmounts.map((amount) => { const isActive = donationForm.amount === amount && donationForm.customAmount === ''; return (<button type="button" key={amount} onClick={() => handleAmountSelect(amount)} aria-pressed={isActive} className={['px-5 py-4 border rounded-xl font-semibold transition-all text-center outline-none text-base', isActive ? 'bg-[#002B5B] text-white border-[#002B5B] ring-2 ring-offset-2 ring-[#FF6B00]' : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-[#002B5B] hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]',].join(' ')}>${amount}</button>); })}</div><div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input inputMode="numeric" type="number" min={1} placeholder="Or enter custom amount" value={donationForm.customAmount} onChange={handleCustomAmountChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-describedby="amountHelp" /></div><p id="amountHelp" className="mt-2 text-xs text-gray-500">Pick a preset or enter any whole number.</p></div>
                <div className="grid gap-3 md:gap-4 md:grid-cols-2"><div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-xl p-4"><div className="flex items-start space-x-3"><CreditCard className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" /><div><h3 className="text-sm font-semibold text-[#002B5B] mb-1">Secure Payment via Stripe</h3><p className="text-xs text-gray-600 leading-relaxed">Payment processing will be enabled via Stripe. Contribution limits may apply. (Demo: No actual payment).</p></div></div></div><div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><ul className="text-xs text-gray-600 space-y-2"><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />SSL secured & privacy-first</li><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Industry-standard processing</li><li className="flex items-center"><span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />Funds support local initiatives</li></ul></div></div>
                <div aria-live="polite" className="min-h-[1.25rem]">{message && (<div className={`mt-1 p-3 rounded-lg text-sm ${message.toLowerCase().includes('thank') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>)}</div>
                <Button type="submit" size="lg" className={`hidden md:flex w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg items-center justify-center ${hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'}`} disabled={!hasValidAmount} aria-disabled={!hasValidAmount} aria-label={hasValidAmount ? `Continue Contribution of ${formatCurrency(donationForm.amount)}` : 'Select an amount to continue'}><Gift className="w-5 h-5 mr-2" /> Continue ({formatCurrency(donationForm.amount)}) </Button>
                <p className="text-xs text-gray-500 text-center">By contributing, you confirm you understand applicable campaign finance regulations.</p>
              </div>
            </form>
          </AnimatedSection>

          {/* Recent Contributions Feed (Updated Display Logic) */}
          <AnimatedSection delay={140}>
            <div className="mt-12 md:mt-16">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 px-1">
                 <h3 className="text-xl md:text-2xl font-bold text-[#002B5B] mb-3 sm:mb-0">
                    Recent Contributions
                 </h3>
                 {/* ... (Sort Controls remain the same) ... */}
                 <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                    <Filter size={16} className="text-gray-500 ml-1" />
                    {sortOptions.map(option => (
                      <button key={option.value} onClick={() => setSortPeriod(option.value)} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${ sortPeriod === option.value ? 'bg-white text-[#002B5B] shadow-sm' : 'text-gray-600 hover:text-[#002B5B]' }`} aria-pressed={sortPeriod === option.value}>{option.label}</button>
                    ))}
                 </div>
              </div>
              
              {loadingDonations ? (
                 <div className="space-y-3 max-w-lg mx-auto"> {/* ... (Skeleton remains the same) ... */} {[...Array(3)].map((_, i) => (<div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden relative"><div className="h-4 w-40 bg-gray-200 rounded mb-2" /><div className="h-3 w-56 bg-gray-100 rounded" /><div className="shimmer absolute inset-0" /></div>))} <p className="text-center text-sm text-gray-500">Loading contributions...</p> </div>
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
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center"
                    >
                      <div className="pr-3">
                        <p className="font-semibold text-gray-800">{donation.name}</p>
                        <p className="text-xs text-gray-500">
                          Supported: {getPillarTitleFromSlug(donation.project_supported)}
                        </p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                         {/* Conditional Amount Display */}
                         {donation.display_amount_publicly !== false ? (
                            <span className="text-sm font-bold text-[#002B5B] block">
                              {formatCurrency(donation.amount)}
                            </span>
                         ) : (
                           <span className="text-sm font-semibold text-gray-500 block italic">
                             Supported {/* Text when amount hidden */}
                           </span>
                         )}
                        <span className="text-xs text-gray-400 block mt-0.5"> 
                          {formatRelativeTime(donation.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-4">
                 Showing contributions. Your support makes a difference! 
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Sticky Quick Donate Bar */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        {/* ... (Sticky button remains the same) ... */}
         <Button type="button" size="lg" onClick={submitForm} className={`w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center ${ donationForm.amount > 0 ? '' : 'opacity-60 cursor-not-allowed' }`} disabled={!hasValidAmount} aria-disabled={!hasValidAmount} aria-label={ hasValidAmount ? `Continue Contribution of ${formatCurrency(donationForm.amount)}` : 'Select an amount to continue' }><Gift className="w-5 h-5 mr-2" /> Continue ({formatCurrency(donationForm.amount)}) </Button>
      </div>
      
      {/* Render the Modal (updated props) */}
      <ContributionConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          amount={donationForm.amount}
          pillarSlug={donationForm.selectedPillar}
          donorName={donorName}
          setDonorName={setDonorName}
          donorPhone={donorPhone}
          setDonorPhone={setDonorPhone}
          showPublicly={showPublicly}
          setShowPublicly={setShowPublicly}
          showAmountPublicly={showAmountPublicly} // Pass new state
          setShowAmountPublicly={setShowAmountPublicly} // Pass new state setter
          onConfirmAndPay={handleConfirmAndPay}
      />


      {/* CSS */}
      <style>{`
        .animate-section-enter { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .transition-all, .animate-section-enter { transition: none !important; }
        }
        .shimmer::before {
          content: ""; position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}