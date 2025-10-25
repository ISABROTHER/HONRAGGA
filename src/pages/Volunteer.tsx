import { useState, useEffect, useRef } from 'react';
import { DollarSign, CreditCard, Gift, X, User, Phone, Filter, Mail } from 'lucide-react'; // Removed CheckCircle
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data Duplication for Pillars ---
const pillars = [
  { icon: Briefcase, title: 'Cape Works Initiative (CWI)', slug: 'cwi' },
  { icon: Rocket, title: 'Cape Innovates Accelerator (CIA)', slug: 'cia' },
  { icon: Laptop, title: 'Digital Cape Project (DCP)', slug: 'dcp' },
  { icon: Landmark, title: 'Heritage Jobs 360 (HJ360)', slug: 'hj360' },
  { icon: GraduationCap, title: 'Classroom to Career (C2C)', slug: 'c2c' },
  { icon: Banknote, title: 'Cape Coast North Youth Development Fund (CCNYDF)', slug: 'ccnydf' },
  { icon: LayoutDashboard, title: 'Cape Impact Dashboard (CID)', slug: 'cid' },
];
// --- End Data ---

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

// REMOVED targets data as progress bar is removed

const AnimatedSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver( ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('animate-section-enter'); entry.target.classList.remove('opacity-0', 'translate-y-5'); observer.unobserve(entry.target); } }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }, ); const currentRef = ref.current; if (currentRef) { currentRef.classList.add('opacity-0', 'translate-y-5'); observer.observe(currentRef); } return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return ( <div ref={ref} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}> {children} </div> );
};


function formatRelativeTime(isoString: string): string { /* ... unchanged ... */ const date = new Date(isoString); const now = new Date(); const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000); const diffMinutes = Math.round(diffSeconds / 60); const diffHours = Math.round(diffMinutes / 60); const diffDays = Math.round(diffHours / 24); const diffMonths = Math.round(diffDays / 30); const diffYears = Math.round(diffDays / 365); if (diffSeconds < 60) return 'Just now'; if (diffMinutes < 60) return `${diffMinutes} min ago`; if (diffHours < 24) return `${diffHours} hr ago`; if (diffDays === 1) return 'Yesterday'; if (diffDays < 7) return `${diffDays} days ago`; if (diffMonths < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); if (diffYears < 1) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }); }

const getPillarTitleFromSlug = (slug: string): string => { /* ... unchanged ... */ if (slug === 'general') return 'General CETRA2030 Support'; const pillar = pillars.find((p) => p.slug === slug); return pillar ? pillar.title : 'General Support'; };

// --- MODAL COMPONENT --- (Unchanged Internally)
interface ContributionConfirmModalProps { /* ... unchanged props ... */ isOpen: boolean; onClose: () => void; amount: number; pillarSlug: string; donorName: string; setDonorName: (name: string) => void; donorPhone: string; setDonorPhone: (phone: string) => void; donorEmail: string; setDonorEmail: (email: string) => void; showPublicly: boolean; setShowPublicly: (show: boolean) => void; showAmountPublicly: boolean; setShowAmountPublicly: (show: boolean) => void; onConfirmAndPay: () => void; currency: Currency; userLocale: string; }
function ContributionConfirmModal({ /* ...unchanged props destructuring... */ isOpen, onClose, amount, pillarSlug, donorName, setDonorName, donorPhone, setDonorPhone, donorEmail, setDonorEmail, showPublicly, setShowPublicly, showAmountPublicly, setShowAmountPublicly, onConfirmAndPay, currency, userLocale }: ContributionConfirmModalProps) { /* ... unchanged component body ... */ const pillarTitle = getPillarTitleFromSlug(pillarSlug); const formatCurrencyModal = (n: number): string => { if (!n || n <= 0) return '...'; try { return new Intl.NumberFormat(userLocale, { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(Math.round(n || 0)); } catch { return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`; } }; return ( <AnimatePresence> {isOpen && ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}> <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}> <div className="p-6 relative"> <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="Close modal"><X size={24} /></button> <h2 className="text-2xl font-bold text-green-900 mb-2 text-center">Confirm Contribution</h2> <div className="my-5 text-center bg-gray-50 p-4 rounded-lg border border-gray-200"><p className="text-sm text-gray-600">You are contributing</p><p className="text-3xl font-bold text-green-900 my-1">{formatCurrencyModal(amount)}</p><p className="text-sm text-gray-600">towards</p><p className="font-semibold text-[#FF6B00]">{pillarTitle}</p></div> <form onSubmit={(e) => { e.preventDefault(); onConfirmAndPay(); }} className="space-y-4"> <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="First Name & Surname *" required value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="First Name & Surname (required)" /></div> <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" placeholder="Email Address *" required value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="Email Address (required)" /></div> <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" placeholder="Phone Number (Optional)" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="w-full text-base pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-label="Phone Number (optional)" /></div> <div className="space-y-2 pt-2"><div className="flex items-center space-x-2"><input type="checkbox" id="showPublicly" checked={showPublicly} onChange={(e) => setShowPublicly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50" /><label htmlFor="showPublicly" className="text-sm text-gray-700 cursor-pointer select-none">Show my name in the feed</label></div><div className="flex items-center space-x-2"><input type="checkbox" id="showAmountPublicly" checked={showAmountPublicly} onChange={(e) => setShowAmountPublicly(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50" /><label htmlFor="showAmountPublicly" className="text-sm text-gray-700 cursor-pointer select-none">Show the amount publicly</label></div></div> <Button type="submit" size="lg" className="w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg flex items-center justify-center mt-4" disabled={!donorName || !donorEmail}><Gift className="w-5 h-5 mr-2" /> Confirm & Proceed to Payment </Button> <p className="text-center text-xs text-gray-500 pt-2">You will be redirected to complete payment via Paystack or Apple Pay.</p> </form> </div> </motion.div> </motion.div> )} </AnimatePresence> ); }
// --- END MODAL ---

export function Volunteer() {
  const formRef = useRef<HTMLFormElement>(null);
  const userLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

  const [donationForm, setDonationForm] = useState<{
    amount: number;
    selectedPillar: string; // Changed back from nullable, default needed
    customAmount: string;
  }>({
    amount: 0,
    selectedPillar: 'general', // Default to general support
    customAmount: '',
  });

  const [currency, setCurrency] = useState<Currency>(userLocale.includes('GH') ? 'GHS' : 'USD');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(currency === 'GHS' ? 'paystack' : 'applePay');
  
   const fmt = (n: number) => { /* ... unchanged ... */ if (!n || n <= 0) return '...'; try { return new Intl.NumberFormat(userLocale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.round(n || 0)); } catch { return `${currency === 'GHS' ? 'GH₵' : '$'}${Math.round(n || 0)}`; } }

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

  // Remember last pillar (now uses default value)
  useEffect(() => { /* ... load only pillar ... */ try { const saved = localStorage.getItem('donation_pillar_pref'); if (saved) { setDonationForm((prev) => ({ ...prev, selectedPillar: saved, })); } } catch { /* ignore */ } }, []);
  useEffect(() => { /* ... save only pillar ... */ try { if (donationForm.selectedPillar) { localStorage.setItem( 'donation_pillar_pref', donationForm.selectedPillar ); } } catch { /* ignore */ } }, [donationForm.selectedPillar]);

  // Keep payment method valid
  useEffect(() => { /* ... unchanged ... */ if (currency === 'GHS' && paymentMethod === 'applePay') { setPaymentMethod('paystack'); } }, [currency, paymentMethod]);

  // --- MOCK DATA GENERATION ---
  useEffect(() => { /* ... unchanged ... */ setLoadingDonations(true); const mockData: Donation[] = []; const names = ['Ama P.', 'Kwesi Mensah', 'Yaw B.', 'Adwoa Ltd', 'Kofi Annan', 'Efua S.', 'Nana K.', 'Aisha Co.', 'Kwabena F.', 'Akosua']; const now = new Date(); for (let i = 0; i < 20; i++) { const date = new Date(now); if (i < 3) { date.setHours(now.getHours() - i * 3); } else if (i < 7) { date.setDate(now.getDate() - i); } else if (i < 12) { date.setMonth(now.getMonth() - Math.floor(i / 2)); date.setDate(Math.floor(Math.random() * 28) + 1); } else { date.setFullYear(now.getFullYear() - Math.floor((i - 10) / 3)); date.setMonth(Math.floor(Math.random() * 12)); date.setDate(Math.floor(Math.random() * 28) + 1); } mockData.push({ id: `mock-${i}`, created_at: date.toISOString(), name: names[i % names.length], amount: [25, 50, 100, 250, 50, 75, 500, 30][i % 8], project_supported: i % 4 === 0 ? 'general' : pillars[i % pillars.length].slug, display_publicly: true, display_amount_publicly: i % 3 !== 0, }); } mockData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); setAllDonations(mockData); setLoadingDonations(false); }, []);
  // --- END MOCK DATA ---

  const handleAmountSelect = (amount: number) => { /* ... unchanged ... */ setDonationForm((prev) => ({ ...prev, amount, customAmount: '' })); };
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... unchanged ... */ const value = e.target.value; if (value === '' || /^\d+$/.test(value)) { const numeric = value === '' ? 0 : parseInt(value, 10); setDonationForm((prev) => ({ ...prev, customAmount: value, amount: numeric })); } };
  const handlePillarChange = (e: React.ChangeEvent<HTMLSelectElement>) => { /* ... unchanged ... */ setDonationForm((prev) => ({ ...prev, selectedPillar: e.target.value })); };
  const primeModalPrivacyFromAnonymous = () => { /* ... unchanged ... */ if (anonymous) { setShowPublicly(false); setShowAmountPublicly(false); } else { setShowPublicly(true); setShowAmountPublicly(true); } };
  const handleDonateSubmit = (e: React.FormEvent) => { /* ... REMOVED pillar check ... */ e.preventDefault(); /* REMOVED: if (!donationForm.selectedPillar) {setMessage... return;} */ if (donationForm.amount <= 0) { setMessage('Please select or enter a valid donation amount.'); window.setTimeout(() => setMessage(''), 5000); return; } if (currency === 'GHS' && paymentMethod !== 'paystack') { setPaymentMethod('paystack'); } setMessage(''); primeModalPrivacyFromAnonymous(); setIsConfirmModalOpen(true); };
  const handleConfirmAndPay = () => { /* ... unchanged ... */ const finalAmount = donationForm.amount; const pillarTitle = getPillarTitleFromSlug(donationForm.selectedPillar || 'general'); setIsConfirmModalOpen(false); const methodLabel = paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack (Visa/Mastercard/MoMo)'; alert( `Initiating ${methodLabel} for ${fmt(finalAmount)} towards ${pillarTitle}${ isRecurring ? ' • Monthly' : '' }.\n(This is a demo placeholder.)` ); const newDonation: Donation = { id: `new-${Date.now()}`, created_at: new Date().toISOString(), name: anonymous ? 'Anonymous' : donorName || 'Supporter', amount: finalAmount, project_supported: donationForm.selectedPillar || 'general', display_publicly: !anonymous && showPublicly, display_amount_publicly: !anonymous && showAmountPublicly, }; const updatedDonations = [newDonation, ...allDonations].sort( (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(), ); setAllDonations(updatedDonations); setMessage('Thank you for your generous contribution!'); setDonationForm({ amount: 0, selectedPillar: donationForm.selectedPillar, /* Keep selected pillar */ customAmount: '' }); setDonorName(''); setDonorPhone(''); setDonorEmail(''); setShowPublicly(true); setShowAmountPublicly(true); setAnonymous(false); setIsRecurring(false); window.setTimeout(() => setMessage(''), 5000); };

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
    // Updated main background to white
    <div className="min-h-screen bg-white pb-24 md:pb-0" style={{ fontFamily: 'Inter, sans-serif' }}> 
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-900 text-white py-16 md:py-24">
         {/* ... (Hero unchanged) ... */}
         <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(800px 400px at 100% 20%, rgba(255,255,255,0.08), transparent 50%)', }} /> <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-[#FF6B00]/10" /> <AnimatedSection> <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4 text-[#FF6B00]"> Support the Movement </h1> <div className="flex justify-center"><span className="h-1 w-20 md:w-24 rounded-full bg-white/50" /></div> <p className="mt-5 md:mt-6 text-lg md:text-xl text-green-100/90 max-w-3xl mx-auto leading-relaxed">Your contribution fuels the CETRA2030 agenda, directly empowering the youth of Cape Coast North.</p> </div> </AnimatedSection>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={80}> 
              <form ref={formRef} onSubmit={handleDonateSubmit} aria-labelledby="donate-form-heading">
                <h2 id="donate-form-heading" className="sr-only">Donation Form</h2>

                 {/* Reverted Pillar Selection Grid back to Dropdown */}
                 <div className="mb-6"> 
                   <label htmlFor="pillarSelect" className="block text-xl md:text-2xl font-bold text-green-900 mb-3 text-center">
                     1. Choose an Initiative (Optional)
                   </label>
                   <select
                      id="pillarSelect"
                      name="pillarSelect"
                      value={donationForm.selectedPillar}
                      onChange={handlePillarChange}
                      className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 appearance-none" // Added appearance-none for potential custom styling
                    >
                      <option value="general">General CETRA2030 Support</option>
                      {pillars.map((pillar) => (
                        <option key={pillar.slug} value={pillar.slug}>
                          {pillar.title}
                        </option>
                      ))}
                    </select>
                 </div>
                 {/* End Pillar Selection */}

                 {/* Amount/Payment Section Wrapper (Always visible now) */}
                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-6">
                    {/* Section 2: Amount + Currency */}
                    <div>
                        {/* ... (Amount + Currency unchanged) ... */}
                        <div className="flex items-center justify-between mb-2"><label className="block text-base font-medium text-gray-800">2. Select Amount</label><div className="flex items-center gap-2"><label htmlFor="currency" className="text-xs text-gray-600">Currency</label><select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#FF6B00] focus:outline-none"><option value="USD">USD</option><option value="GHS">GHS</option></select></div></div><div role="group" aria-label="Quick amounts" className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-4">{[25, 50, 100, 250, 500, 1000].map((amount) => { const isActive = donationForm.amount === amount && donationForm.customAmount === ''; return ( <button type="button" key={amount} onClick={() => handleAmountSelect(amount)} aria-pressed={isActive} className={['px-5 py-4 border rounded-lg font-semibold transition-all text-center outline-none text-base', isActive ? 'bg-green-800 text-white border-green-800 ring-2 ring-offset-2 ring-[#FF6B00]' : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-green-700 hover:bg-green-50 focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]',].join(' ')}>{fmt(amount)}</button> ); })}</div><div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input inputMode="numeric" type="number" min={1} placeholder="Or enter custom amount" value={donationForm.customAmount} onChange={handleCustomAmountChange} className="w-full text-base pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" aria-describedby="amountHelp" /></div><p id="amountHelp" className="mt-2 text-xs text-gray-500">Pick a preset or enter any whole number.</p>
                    </div>

                    {/* Section 3: Payment Method - Reduced size */}
                     <div>
                        <p className="text-base font-bold text-green-900 mb-2">3. Choose Payment Method</p>
                        <div className="grid grid-cols-2 gap-2"> {/* Reduced gap */}
                            <button type="button" onClick={() => setPaymentMethod('paystack')} aria-pressed={paymentMethod === 'paystack'} className={['w-full rounded-md px-3 py-2 border text-sm font-medium transition', /* Reduced padding/size */ paymentMethod === 'paystack' ? 'bg-green-800 text-white border-green-800 ring-1 ring-green-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-600',].join(' ')}>
                                Paystack
                            </button>
                            {currency === 'USD' ? (
                                <button type="button" onClick={() => setPaymentMethod('applePay')} aria-pressed={paymentMethod === 'applePay'} className={['w-full rounded-md px-3 py-2 border text-sm font-medium transition', /* Reduced padding/size */ paymentMethod === 'applePay' ? 'bg-black text-white border-black ring-1 ring-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-black',].join(' ')}>
                                     Apple&nbsp;Pay
                                </button>
                            ) : (
                                <div className="w-full rounded-md px-3 py-2 border border-dashed border-gray-300 text-gray-400 text-center text-xs"> Apple&nbsp;Pay (USD only)</div> /* Reduced size */
                            )}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Using Visa/Mastercard? Select Paystack. For GHS, Paystack (MoMo/Card) is required.</p>
                    </div>

                    {/* Section 4: Options */}
                    <div className="space-y-3 pt-2">
                        {/* ... (Options unchanged) ... */}
                        <p className="text-base font-bold text-green-900 mb-2">4. Options</p><div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"><label htmlFor="recurring" className="text-sm font-medium text-green-900">Make this a monthly donation</label><input id="recurring" type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="h-5 w-5 accent-[#FF6B00] focus:ring-offset-1 focus:ring-[#FF6B00]/50 rounded"/></div><label className="flex items-center gap-2 text-sm text-gray-700 pl-1 cursor-pointer"><input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 accent-[#FF6B00] rounded border-gray-300 focus:ring-offset-1 focus:ring-[#FF6B00]/50"/>Give anonymously <span className="text-xs text-gray-500">(hide name & amount)</span></label>
                    </div>

                    {/* Trust / Info - Removed list */}
                    <div>
                         <div className="grid gap-3 md:gap-4">
                            <div className="text-center text-xs text-gray-500">Secure payments via <span className="font-semibold">Paystack</span> & <span className="font-semibold">Apple Pay</span> supported. SSL secured & privacy-first.</div>
                            {/* Removed the div containing the ul */}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div aria-live="polite" className="min-h-[1.25rem]">
                         {message && (<div className={`mt-1 p-3 rounded-lg text-sm ${message.toLowerCase().includes('thank') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message}</div>)}
                    </div>

                    {/* Main Donate Button (Desktop/Tablet) */}
                    <Button type="submit" size="lg" className={`hidden md:flex w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg items-center justify-center ${ hasValidAmount ? '' : 'opacity-60 cursor-not-allowed' }`} disabled={!hasValidAmount} aria-disabled={!hasValidAmount} aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}>
                      <Gift className="w-5 h-5 mr-2" /> Contribute {fmt(donationForm.amount)}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By contributing, you confirm you understand applicable campaign finance regulations.
                    </p>
                </div>
              </form>
            </AnimatedSection>

          {/* Recent Contributions Feed */}
          <AnimatedSection delay={140}>
            {/* ... (Feed unchanged) ... */}
             <div className="mt-12 md:mt-16"> <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6 px-1"> <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-3 sm:mb-0"> Recent Contributions </h3> <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg"> <Filter size={16} className="text-gray-500 ml-1" /> {(['all','today','this_month','this_year'] as SortPeriod[]).map((value) => { const label = value === 'all' ? 'All Time' : value === 'today' ? 'Today' : value === 'this_month' ? 'This Month' : 'This Year'; return ( <button key={value} onClick={() => setSortPeriod(value)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ sortPeriod === value ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600 hover:text-green-800' }`} aria-pressed={sortPeriod === value}>{label}</button> ); })} </div> </div> {loadingDonations ? ( <div className="space-y-3 max-w-lg mx-auto"> {[...Array(3)].map((_, i) => ( <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden relative"><div className="h-4 w-40 bg-gray-200 rounded mb-2" /><div className="h-3 w-56 bg-gray-100 rounded" /><div className="shimmer absolute inset-0" /></div> ))} <p className="text-center text-sm text-gray-500">Loading contributions...</p> </div> ) : filteredDonations.length === 0 ? ( <p className="text-center text-gray-500 py-8">No contributions found for this period. Be the first!</p> ) : ( <div role="list" className="space-y-3 md:space-y-4 max-w-lg mx-auto"> {filteredDonations.map((donation) => (<motion.div role="listitem" key={donation.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center hover:bg-green-50 transition-colors"> <div className="pr-3"> <p className="font-semibold text-base text-gray-800">{donation.name}</p> <p className="text-xs text-gray-500"> Supported: {getPillarTitleFromSlug(donation.project_supported)} </p> </div> <div className="text-right whitespace-nowrap"> {donation.display_amount_publicly !== false ? ( <span className="text-base font-bold text-green-800 block"> {fmt(donation.amount)} </span> ) : ( <span className="text-sm font-semibold text-gray-500 block italic">Supported</span> )} <span className="text-xs text-gray-400 block mt-0.5">{formatRelativeTime(donation.created_at)}</span> </div> </motion.div>))} </div> )} <p className="text-xs text-gray-500 text-center mt-4">Showing contributions. Your support makes a difference!</p> </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mobile Sticky Summary + Quick Donate Bar */}
      {/* ... (Mobile sticky unchanged) ... */}
       <div className="md:hidden fixed bottom-20 inset-x-4 z-40 text-center text-xs text-gray-700"> {hasValidAmount ? ( <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-full px-3 py-2 shadow"> {fmt(donationForm.amount)} • {getPillarTitleFromSlug(donationForm.selectedPillar || 'general').split(' (')[0]} {isRecurring ? ' • Monthly' : ''} • {paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'} </div> ) : null} </div> <div className="md:hidden fixed bottom-4 inset-x-4 z-40"> <Button type="button" size="lg" onClick={submitForm} className={`w-full rounded-2xl shadow-xl bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white flex items-center justify-center ${ hasValidAmount ? '' : 'opacity-60 cursor-not-allowed' }`} disabled={!hasValidAmount} aria-disabled={!hasValidAmount} aria-label={`Contribute ${fmt(donationForm.amount)} with ${paymentMethod === 'applePay' ? 'Apple Pay' : 'Paystack'}`}><Gift className="w-5 h-5 mr-2" /> Contribute {fmt(donationForm.amount)}</Button> </div>

      {/* Render the Modal */}
      <ContributionConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        amount={donationForm.amount}
        pillarSlug={donationForm.selectedPillar || 'general'} 
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
        .shimmer::before { content: ""; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        /* Add custom arrow for select dropdown */
        select { 
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem; /* Ensure space for arrow */
        }
      `}</style>
    </div>
  );
}