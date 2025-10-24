import { useState, useEffect, useRef } from 'react';
import { DollarSign, CreditCard, Gift } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';

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

type Donation = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  project_supported: string;
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

  useEffect(() => {
    fetchRecentDonations();
  }, []);

  const fetchRecentDonations = async () => {
    setLoadingDonations(true);
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('id, created_at, name, amount, project_supported')
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
    // Allow only digits (empty ok)
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
    const finalAmount = donationForm.amount;
    const selectedPillarInfo = pillars.find((p) => p.slug === donationForm.selectedPillar);

    if (finalAmount <= 0) {
      setMessage('Please select or enter a valid donation amount.');
      return;
    }

    alert(
      `Initiating donation of ${formatCurrency(finalAmount)} towards ${
        selectedPillarInfo?.title || 'CETRA2030'
      }.\n(Stripe/Payment integration required - This is a demo placeholder.)`,
    );

    setMessage('Thank you for your generous contribution!');
    // Auto-hide feedback gently after 5s
    window.setTimeout(() => setMessage(''), 5000);
  };

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const getPillarTitleFromSlug = (slug: string): string => {
    if (slug === 'general') return 'General CETRA2030 Support';
    const pillar = pillars.find((p) => p.slug === slug);
    return pillar ? pillar.title : 'General Support';
  };

  const hasValidAmount = donationForm.amount > 0;

  const submitForm = () => {
    // Trigger the same form submit from mobile sticky/floating CTA
    formRef.current?.requestSubmit();
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section (mobile-first visual punch) */}
      <section className="relative overflow-hidden bg-[#002B5B] text-white py-16 md:py-24">
        {/* Subtle premium background texture */}
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
            <form ref={formRef} onSubmit={handleDonateSubmit} aria-labelledby="donate-title">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-6">
                {/* Initiative Selection */}
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

                {/* Amount Selection */}
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

                {/* Payment Notice & Trust Badges */}
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

                {/* Donation Feedback (accessible) */}
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

                {/* Main Donate Button (desktop & tablet primary) */}
                <Button
                  type="submit"
                  size="lg"
                  className={`hidden md:flex w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg items-center justify-center ${
                    hasValidAmount ? '' : 'opacity-60 cursor-not-allowed'
                  }`}
                  disabled={!hasValidAmount}
                  aria-disabled={!hasValidAmount}
                  aria-label={
                    hasValidAmount
                      ? `Contribute ${formatCurrency(donationForm.amount)}`
                      : 'Select an amount to continue'
                  }
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Contribute Now ({formatCurrency(donationForm.amount)})
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By contributing, you confirm you understand applicable campaign finance regulations.
                </p>
              </div>
            </form>
          </AnimatedSection>

          {/* Recent Contributions Feed */}
          <AnimatedSection delay={140}>
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

      {/* Mobile Sticky Quick Donate Bar (one-tap donate, submits same form) */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <Button
          type="button"
          size="lg"
          onClick={submitForm}
          className={`w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center ${
            donationForm.amount > 0 ? '' : 'opacity-60 cursor-not-allowed'
          }`}
          disabled={!hasValidAmount}
          aria-disabled={!hasValidAmount}
          aria-label={
            hasValidAmount ? `Contribute ${formatCurrency(donationForm.amount)}` : 'Select an amount to continue'
          }
        >
          <Gift className="w-5 h-5 mr-2" />
          Contribute {formatCurrency(donationForm.amount)}
        </Button>
      </div>

      {/* CSS for animations and skeleton shimmer */}
      <style>{`
        .animate-section-enter {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .transition-all, .animate-section-enter {
            transition: none !important;
          }
        }
        .shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
