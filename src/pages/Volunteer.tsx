import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Rocket,
  Laptop,
  Landmark,
  GraduationCap,
  Banknote, 
  LayoutDashboard,
  DollarSign,
  Gift,
  X,
  Zap, // Using Zap for the Nexus core
} from 'lucide-react';

// --- Data for Pillars (Simplified for this component) ---
const pillars = [
  { icon: Briefcase, title: 'Cape Works Initiative', slug: 'cwi' },
  { icon: Rocket, title: 'Cape Innovates Accelerator', slug: 'cia' },
  { icon: Laptop, title: 'Digital Cape Project', slug: 'dcp' },
  { icon: Landmark, title: 'Heritage Jobs 360', slug: 'hj360' },
  { icon: GraduationCap, title: 'Classroom to Career', slug: 'c2c' },
  { icon: Banknote, title: 'Youth Development Fund', slug: 'ccnydf' }, // Shortened for display
  { icon: LayoutDashboard, title: 'Cape Impact Dashboard', slug: 'cid' },
];
// --- End Data ---

// Define type for Donation
type Donation = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  project_supported: string; // Pillar slug or 'general'
};

// --- Main Component ---
export function Volunteer() {
  const [selectedPillarSlug, setSelectedPillarSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  const donationAmounts = [25, 50, 100, 250]; // Simplified amounts

  // Fetch recent donations
  useEffect(() => {
    fetchRecentDonations();
    // Fetch donations every 60 seconds
    const interval = setInterval(fetchRecentDonations, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentDonations = async () => {
    setLoadingDonations(true);
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('id, created_at, name, amount, project_supported')
        .order('created_at', { ascending: false })
        .limit(10); // Fetch more for scrolling effect

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoadingDonations(false);
    }
  };
  
  const getPillarTitleFromSlug = (slug: string | null): string => {
      if (!slug || slug === 'general') return 'General CETRA2030 Support';
      const pillar = pillars.find(p => p.slug === slug);
      return pillar ? pillar.title : 'General Support';
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
      setIsModalOpen(false);
      setDonationAmount(0);
      setCustomAmount('');
      // Keep selectedPillarSlug as is unless explicitly reset elsewhere
  };

  const handlePillarSelect = (slug: string) => {
      setSelectedPillarSlug(slug);
      // Optional: openModal directly? Maybe better to require Nexus tap.
  };

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(value === '' ? 0 : parseInt(value));
    }
  };

  // Placeholder for Stripe/Payment processing
  const handleDonateSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     const finalAmount = donationAmount;
     const pillarTitle = getPillarTitleFromSlug(selectedPillarSlug);
     
     if (finalAmount <= 0) {
       alert('Please select or enter a valid donation amount.');
       return;
     }
     
     alert(`Initiating donation of $${finalAmount} towards ${pillarTitle}. \n(Stripe/Payment integration required - This is a demo placeholder.)`);
     // After successful payment: save to Supabase, fetchRecentDonations(), closeModal()
     closeModal(); // Close modal after fake submission for demo purposes
  };

  return (
    <div className="min-h-screen bg-[#002B5B] text-white overflow-hidden relative flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Subtle Animated Background (Optional) */}
      {/* <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:16px_16px] animate-pulse"></div> */}

      {/* Header Text */}
      <header className="pt-16 pb-8 text-center relative z-10 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-2"
        >
          Support the Movement
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Fuel the CETRA2030 agenda. Empower Cape Coast North's youth.
        </motion.p>
      </header>

      {/* Interactive Nexus Area */}
      <main className="flex-grow flex items-center justify-center relative p-4">
        <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            // Add subtle rotation
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* Central Nexus Orb */}
          <motion.button
            onClick={openModal}
            className="absolute w-24 h-24 md:w-32 md:h-32 bg-[#FF6B00] rounded-full flex items-center justify-center shadow-lg z-10 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }} // Pulse animation
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Open Donation Modal"
          >
            <Zap className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.button>

          {/* Orbiting Pillar Nodes */}
          {pillars.map((pillar, index) => {
            const angle = (index / pillars.length) * 2 * Math.PI;
            const radius = 130; // md: 160
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.button
                key={pillar.slug}
                onClick={() => handlePillarSelect(pillar.slug)}
                className={`absolute w-12 h-12 md:w-14 md:h-14 bg-[#0d3863] rounded-full flex items-center justify-center shadow-md border-2 border-transparent transition-colors duration-300 ${
                    selectedPillarSlug === pillar.slug ? 'border-[#FF6B00] bg-[#FF6B00]/20' : 'hover:border-[#FF6B00]/50'
                }`}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ x: `${x}px`, y: `${y}px`, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.15, zIndex: 20, boxShadow: '0 0 15px rgba(255, 107, 0, 0.7)'}}
                aria-label={`Select ${pillar.title}`}
              >
                <pillar.icon className={`w-6 h-6 md:w-7 md:h-7 ${selectedPillarSlug === pillar.slug ? 'text-[#FF6B00]' : 'text-gray-300'}`} />
              </motion.button>
            );
          })}
        </motion.div>
      </main>
      
      {/* Recent Contributions Ticker */}
      <footer className="w-full py-4 overflow-hidden relative z-10 bg-[#002B5B]/50 backdrop-blur-sm">
         <div className="ticker-wrap relative w-full h-8 flex items-center">
            <div className="ticker-move absolute flex items-center h-full whitespace-nowrap will-change-transform">
                {!loadingDonations && donations.length > 0 ? (
                    <>
                        {[...donations, ...donations].map((donation, index) => ( // Duplicate for seamless loop
                            <span key={`${donation.id}-${index}`} className="text-sm text-gray-300 mx-4 inline-flex items-center">
                                <span className="font-semibold text-white mr-1">{donation.name}</span> supported {getPillarTitleFromSlug(donation.project_supported)} (${donation.amount})
                            </span>
                        ))}
                    </>
                ) : (
                    <span className="text-sm text-gray-400 mx-4 italic">
                        {loadingDonations ? 'Loading contributions...' : 'Be the first to contribute!'}
                    </span>
                )}
            </div>
         </div>
      </footer>


      {/* Donation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeModal} // Close on backdrop click
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="p-6 relative">
                 <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" aria-label="Close modal">
                   <X size={24} />
                 </button>
                <h2 className="text-2xl font-bold text-[#002B5B] mb-2 text-center">Support Initiative</h2>
                <p className="text-center text-[#FF6B00] font-semibold mb-6">
                   {getPillarTitleFromSlug(selectedPillarSlug)}
                </p>

                <form onSubmit={handleDonateSubmit} className="space-y-4">
                   {/* Amount Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {donationAmounts.map((amount) => (
                          <button
                            type="button"
                            key={amount}
                            onClick={() => handleAmountSelect(amount)}
                            className={`px-4 py-3 border rounded-lg font-semibold transition-all text-center text-sm ${
                              donationAmount === amount && customAmount === ''
                                ? 'bg-[#002B5B] text-white border-[#002B5B] ring-2 ring-[#FF6B00]'
                                : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-[#002B5B] hover:bg-gray-100'
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                    </div>
                     <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            min="1"
                            placeholder="Or enter custom amount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 text-sm"
                        />
                     </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg flex items-center justify-center mt-4"
                        disabled={donationAmount <= 0}
                    >
                        <Gift className="w-5 h-5 mr-2" />
                        Contribute ${donationAmount > 0 ? donationAmount : '...'}
                    </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for ticker animation */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-move {
          animation: ticker 60s linear infinite; /* Adjust duration as needed */
        }
        .ticker-wrap:hover .ticker-move {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}