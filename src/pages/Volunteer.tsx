import { useState, useEffect, useRef } from 'react';
import { DollarSign, CreditCard, Gift, X, User, Phone } from 'lucide-react'; // Added X, User, Phone
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion'; // Added framer-motion

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
  created_at: string;
  name: string;
  amount: number;
  project_supported: string;
  display_publicly?: boolean; // Added optional field
};

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

// --- NEW MODAL COMPONENT ---
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
  onConfirmAndPay: () => void; // Renamed for clarity
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
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="p-6 relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="Close modal">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-[#002B5B] mb-2 text-center">Confirm Contribution</h2>
              
              {/* Donation Details */}
              <div className="my-5 text-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">You are contributing</p>
                <p className="text-3xl font-bold text-[#002B5B] my-1">{formatCurrency(amount)}</p>
                <p className="text-sm text-gray-600">towards</p>
                <p className="font-semibold text-[#FF6B00]">{pillarTitle}</p>
              </div>

              {/* Form Fields */}
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

                 {/* Public Display Preference */}
                 <div className="flex items-center space-x-2 pt-2">
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
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  // Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [showPublicly, setShowPublicly] = useState(true); // Default to checked


  useEffect(() => {
    fetchRecentDonations();
  }, []);

  const fetchRecentDonations = async () => {
    setLoadingDonations(true);
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('id, created_at, name, amount, project_supported')
        .eq('display_publicly', true) // Only fetch donations marked for public display
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoadingDonations(false);
    }
  };

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

  // Opens the confirmation modal
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donationForm.amount <= 0) {
      setMessage('Please select or enter a valid donation amount.');
      window.setTimeout(() => setMessage(''), 5000); // Clear message
      return;
    }
    // Clear previous message before opening modal
    setMessage(''); 
    setIsConfirmModalOpen(true);
  };

  // Triggered from the modal's confirm button
  const handleConfirmAndPay = () => {
    const finalAmount = donationForm.amount;
    const selectedPillarInfo = pillars.find((p) => p.slug === donationForm.selectedPillar);
    const pillarTitle = selectedPillarInfo?.title || 'CETRA2030 General Support';

    // Close modal immediately
    setIsConfirmModalOpen(false);

    // Show processing alert (placeholder for actual payment)
    alert(
      `Initiating donation of ${formatCurrency(finalAmount)} for ${donorName} towards ${pillarTitle}.\n(Proceeding to Stripe/Payment... - This is a demo placeholder.)`
    );

    // --- Placeholder for Post-Payment Success ---
    // In a real app, this block would run *after* successful payment confirmation from Stripe/Paystack
    const saveDonationToSupabase = async () => {
      try {
        const { error } = await supabase.from('donations').insert([
          { 
            name: donorName, 
            amount: finalAmount, 
            project_supported: donationForm.selectedPillar,
            display_publicly: showPublicly,
            // phone: donorPhone, // Optional: Add phone column to Supabase if needed
          },
        ]);
        if (error) throw error;
        
        // Donation saved successfully
        setMessage('Thank you for your generous contribution!');
        fetchRecentDonations(); // Refresh the feed
        
        // Reset form state after successful save
        setDonationForm({ amount: 0, selectedPillar: pillars[0].slug, customAmount: '' });
        setDonorName('');
        setDonorPhone('');
        setShowPublicly(true); // Reset checkbox
      
      } catch (error) {
        console.error('Error saving donation:', error);
        setMessage('Thank you! There was an issue saving your contribution details, but payment may have succeeded.');
      } finally {
         window.setTimeout(() => setMessage(''), 5000); // Auto-hide message
      }
    };
    
    // Simulate successful save for demo purposes (REMOVE THIS in real app)
     console.log("Simulating save:", { name: donorName, amount: finalAmount, project: donationForm.selectedPillar, public: showPublicly });
     setMessage('Thank you for your generous contribution!');
     // You might manually add a donation to Supabase for testing the feed
     // fetchRecentDonations(); // Uncomment if you manually add data to see refresh
     setDonationForm({ amount: 0, selectedPillar: pillars[0].slug, customAmount: '' });
     setDonorName('');
     setDonorPhone('');
     setShowPublicly(true);
     window.setTimeout(() => setMessage(''), 5000);
    // saveDonationToSupabase(); // Call this function after real payment success
    // --- End Placeholder ---
  };


  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  const hasValidAmount = donationForm.amount > 0;

  const submitForm = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0" style={{ fontFamily: 'Inter, sans-serif' }}> {/* Added padding-bottom for mobile sticky button */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#002B5B] text-white py-16 md:py-24">
         {/* ... (Hero content remains the same) ... */}
         <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(1200px 600px at 50% -10%, rgba(255,107,0,0.18), transparent 60%), radial-gradient(800px 400px at 100% 20%, rgba(255,255,255,0.10), transparent 50%)',
          }}
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-[#FF6B00]/20" />
        <AnimatedSection>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4">
              Support the Movement
            </h1>
            <div className="flex justify-center">
              <span className="h-1 w-20 md:w-24 rounded-full bg-[#FF6B00]" />
            </div>
            <p className="mt-5 md:mt-6 text-base md:text-2xl text-gray-200/90 max-w-3xl mx-auto leading-relaxed">
              Your contribution fuels the CETRA2030 agenda, directly empowering the youth of Cape Coast North.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* ... (Donate section title remains the same) ... */}
             <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#002B5B] mb-3 md:mb-4">
                Fuel the Transformation: Support CETRA2030
              </h2>
              <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
                Every contribution, big or small, directly empowers our youth and strengthens our community.
                Choose an initiative below or provide general support.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
             {/* Form now triggers modal */}
            <form ref={formRef} onSubmit={handleDonateSubmit} aria-labelledby="donate-title"> 
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-6">
                {/* ... (Initiative Selection remains the same) ... */}
                 <div>
                  <label htmlFor="pillarSelect" className="block text-sm font-medium text-gray-700 mb-2">
                    Support a Specific Initiative (Optional)
                  </label>
                  <select
                    id="pillarSelect"
                    name="pillarSelect"
                    value={donationForm.selectedPillar}
                    onChange={handlePillarChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                  >
                    {pillars.map((pillar) => (
                      <option key={pillar.slug} value={pillar.slug}>
                        {pillar.title}
                      </option>
                    ))}
                    <option value="general">General CETRA2030 Support</option>
                  </select>
                </div>
                {/* ... (Amount Selection remains the same) ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Donation Amount (USD)
                  </label>
                  <div
                    role="group"
                    aria-label="Quick amounts"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4"
                  >
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
                              : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-[#002B5B] hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]',
                          ].join(' ')}
                        >
                          ${amount}
                        </button>
                      );
                    })}
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      inputMode="numeric"
                      type="number"
                      min={1}
                      placeholder="Or enter custom amount"
                      value={donationForm.customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                      aria-describedby="amountHelp"
                    />
                  </div>
                  <p id="amountHelp" className="mt-2 text-xs text-gray-500">
                    Pick a preset or enter any whole number.
                  </p>
                </div>
                {/* ... (Payment Notice & Trust Badges remain the same) ... */}
                 <div className="grid gap-3 md:gap-4 md:grid-cols-2">
                  <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <CreditCard className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-[#002B5B] mb-1">Secure Payment via Stripe</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Payment processing will be enabled via Stripe. Contribution limits may apply. (Demo: No actual payment).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <ul className="text-xs text-gray-600 space-y-2">
                      <li className="flex items-center">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />
                        SSL secured & privacy-first
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />
                        Industry-standard processing
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B00] mr-2" />
                        Funds support local initiatives
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Main page feedback message area */}
                <div aria-live="polite" className="min-h-[1.25rem]">
                  {message && (
                    <div
                      className={`mt-1 p-3 rounded-lg text-sm ${
                        message.toLowerCase().includes('thank')
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </div>

                {/* Main Donate Button (now opens modal) */}
                <Button
                  type="submit" // Changed back to submit to trigger form handler
                  size="lg"
                  className={`hidden md:flex w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg items-center justify-center ${
                    hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'
                  }`}
                  disabled={!hasValidAmount}
                  aria-disabled={!hasValidAmount}
                  aria-label={
                    hasValidAmount
                      ? `Continue Contribution of ${formatCurrency(donationForm.amount)}`
                      : 'Select an amount to continue'
                  }
                >
                  <Gift className="w-5 h-5 mr-2" />
                   Continue ({formatCurrency(donationForm.amount)}) 
                   {/* Text changed to 'Continue' */}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By contributing, you confirm you understand applicable campaign finance regulations.
                </p>
              </div>
            </form>
          </AnimatedSection>

          {/* Recent Contributions Feed */}
          <AnimatedSection delay={140}>
            {/* ... (Feed content remains the same) ... */}
              <div className="mt-12 md:mt-16">
              <h3 className="text-xl md:text-2xl font-bold text-[#002B5B] mb-4 md:mb-6 text-center">
                Recent Contributions
              </h3>
              {loadingDonations ? (
                <div className="space-y-3 max-w-lg mx-auto">
                  {/* Skeleton shimmer cards */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden relative"
                    >
                      <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
                      <div className="h-3 w-56 bg-gray-100 rounded" />
                      <div className="shimmer absolute inset-0" />
                    </div>
                  ))}
                  <p className="text-center text-sm text-gray-500">Loading recent contributions...</p>
                </div>
              ) : donations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Be the first to contribute!</p>
              ) : (
                <div role="list" className="space-y-3 md:space-y-4 max-w-lg mx-auto">
                  {donations.map((donation) => (
                    <div
                      role="listitem"
                      key={donation.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center"
                    >
                      <div className="pr-3">
                        <p className="font-semibold text-gray-800">{donation.name}</p>
                        <p className="text-xs text-gray-500">
                          Supported: {getPillarTitleFromSlug(donation.project_supported)}
                        </p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-sm font-bold text-[#002B5B] block">
                          {formatCurrency(donation.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-4">
                Showing the latest contributions. Your support makes a difference!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Sticky Quick Donate Bar (now opens modal) */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <Button
          type="button" // Changed type to button to prevent default form submission
          size="lg"
          onClick={submitForm} // Still triggers the form submit handler
          className={`w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center ${
            donationForm.amount > 0 ? '' : 'opacity-60 cursor-not-allowed'
          }`}
          disabled={!hasValidAmount}
          aria-disabled={!hasValidAmount}
          aria-label={
            hasValidAmount ? `Continue Contribution of ${formatCurrency(donationForm.amount)}` : 'Select an amount to continue'
          }
        >
          <Gift className="w-5 h-5 mr-2" />
          Continue ({formatCurrency(donationForm.amount)}) 
          {/* Text changed to 'Continue' */}
        </Button>
      </div>
      
      {/* --- RENDER THE MODAL --- */}
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