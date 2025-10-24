import { useState, useEffect, useRef } from 'react';
import { Users, Heart, Phone, Mail, DollarSign, CreditCard, Gift, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import type { Database } from '../lib/database.types'; // Assuming Donation type will be added here or inferred

// --- Data Duplication for Pillars (from Events.tsx) ---
// Ideally, move this to a shared data file later
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


// Define type for Donation (assuming structure in Supabase)
type Donation = {
  id: string;
  created_at: string;
  name: string;
  amount: number;
  project_supported: string; // Should match pillar title or slug
};

// Helper component for animated sections (copied from project pattern)
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
          observer.unobserve(entry.target); // Animate only once
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


export function Volunteer() {
  // Removed activeTab state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
    availability: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [donationForm, setDonationForm] = useState({
    amount: 0,
    selectedPillar: pillars[0].slug, // Default to first pillar
    customAmount: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(''); // Used for multiple forms now
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  // Fetch recent donations on component mount
  useEffect(() => {
    fetchRecentDonations();
  }, []);

  const fetchRecentDonations = async () => {
    setLoadingDonations(true);
    try {
      // Assumes a 'donations' table exists with public read access
      const { data, error } = await supabase
        .from('donations') // IMPORTANT: Assumes table name is 'donations'
        .select('id, created_at, name, amount, project_supported')
        .order('created_at', { ascending: false })
        .limit(5); // Fetch latest 5 donations

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      // Handle error display if needed
    } finally {
      setLoadingDonations(false);
    }
  };


  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('volunteer_signups')
        .insert([volunteerForm]);

      if (error) throw error;

      setMessage('Thank you for volunteering! We will be in touch soon.');
      setVolunteerForm({ name: '', email: '', phone: '', interests: '', availability: '' });
    } catch (error: unknown) { // Use unknown for better type safety
      setMessage(`Error submitting volunteer form: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(''), 5000); // Clear message after 5s
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactForm]);

      if (error) throw error;

      setMessage('Message sent! We will respond as soon as possible.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      setMessage(`Error sending message: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(''), 5000); // Clear message after 5s
    }
  };

  const handleAmountSelect = (amount: number) => {
    setDonationForm({ ...donationForm, amount, customAmount: '' });
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
     // Allow empty string or numbers
    if (value === '' || /^\d+$/.test(value)) {
       setDonationForm({ ...donationForm, customAmount: value, amount: value === '' ? 0 : parseInt(value) });
    }
  };

  const handlePillarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDonationForm({ ...donationForm, selectedPillar: e.target.value });
  };

  // Placeholder for Stripe/Payment processing
  const handleDonateSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     const finalAmount = donationForm.amount;
     const selectedPillarInfo = pillars.find(p => p.slug === donationForm.selectedPillar);
     
     if (finalAmount <= 0) {
       alert('Please select or enter a valid donation amount.');
       return;
     }
     
     alert(`Initiating donation of $${finalAmount} towards ${selectedPillarInfo?.title || 'CETRA2030'}. \n(Stripe/Payment integration required - This is a demo placeholder.)`);
     // In a real app:
     // 1. Call Stripe/Paystack API with amount and selectedPillar info
     // 2. On successful payment, save donation details (name, amount, project) to Supabase 'donations' table
     // 3. Optionally refresh the donation feed
  };


  const opportunities = [
    {
      icon: Phone,
      title: 'Phone Banking',
      description: 'Connect with voters and share our message from the comfort of your home'
    },
    {
      icon: Users,
      title: 'Canvassing',
      description: 'Meet voters face-to-face in your neighborhood and help spread the word'
    },
    {
      icon: Mail,
      title: 'Digital Outreach',
      description: 'Help manage social media, email campaigns, and online engagement'
    },
    {
      icon: Heart,
      title: 'Event Support',
      description: 'Assist with organizing and running campaign events and rallies'
    }
  ];

  const donationAmounts = [25, 50, 100, 250, 500, 1000];
  
  const getPillarTitleFromSlug = (slug: string): string => {
    const pillar = pillars.find(p => p.slug === slug);
    return pillar ? pillar.title : 'General Support';
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative bg-[#002B5B] text-white py-20 md:py-28">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Get Involved</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your time, talent, and support fuel the transformation of Cape Coast North. 
              Join us in building a brighter future, together.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B5B] mb-4">
                Fuel the Transformation: Support CETRA2030
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every contribution, big or small, directly empowers our youth and strengthens our community. 
                Choose an initiative below or provide general support.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <form onSubmit={handleDonateSubmit}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
                
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                  >
                    {pillars.map(pillar => (
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
                    Choose Donation Amount ($)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        type="button"
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`px-4 py-3 border rounded-lg font-semibold transition-all text-center ${
                          donationForm.amount === amount && donationForm.customAmount === ''
                            ? 'bg-[#002B5B] text-white border-[#002B5B] ring-2 ring-[#FF6B00]'
                            : 'bg-gray-50 text-gray-800 border-gray-300 hover:border-[#002B5B] hover:bg-gray-100'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number" // Changed to number for better mobile keyboards
                      min="1"
                      placeholder="Or enter custom amount"
                      value={donationForm.customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                </div>

                {/* Payment Notice */}
                <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-[#002B5B] mb-1">
                        Secure Payment via Stripe
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Payment processing will be enabled via Stripe. Contribution limits may apply. (Demo: No actual payment).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#FF6B00] hover:bg-[#E66000] focus:ring-[#FF6B00] text-white shadow-lg flex items-center justify-center"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Contribute Now (${donationForm.amount > 0 ? donationForm.amount : '...'})
                </Button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Contributions are vital for community projects. By contributing, you confirm you understand campaign finance regulations where applicable.
                </p>
              </div>
            </form>
          </AnimatedSection>

          {/* Recent Contributions Feed */}
           <AnimatedSection delay={200}>
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-[#002B5B] mb-6 text-center">
                Recent Contributions
              </h3>
              {loadingDonations ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-2 border-[#002B5B] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading recent contributions...</p>
                </div>
              ) : donations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Be the first to contribute!</p>
              ) : (
                <div className="space-y-4 max-w-lg mx-auto">
                  {donations.map((donation) => (
                    <div key={donation.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{donation.name}</p>
                        <p className="text-xs text-gray-500">
                          Supported: {getPillarTitleFromSlug(donation.project_supported)}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[#002B5B]">
                        ${donation.amount}
                      </span>
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

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B5B] mb-4">
                Volunteer Your Time & Skills
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our dedicated team and contribute directly to the campaign's success. 
                Find an opportunity that matches your passion.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {opportunities.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#002B5B]/10 text-[#002B5B] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Sign Up to Volunteer
              </h3>

              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                {/* Volunteer form fields remain the same */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" value={volunteerForm.name} onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={volunteerForm.email} onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={volunteerForm.phone} onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Interest</label>
                    <textarea value={volunteerForm.interests} onChange={(e) => setVolunteerForm({ ...volunteerForm, interests: e.target.value })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" placeholder="e.g., Canvassing, Event planning, Digital media"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <textarea value={volunteerForm.availability} onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900" placeholder="e.g., Weekends, Evenings after 6 PM"/>
                  </div>
                
                {/* Message display - slightly improved styling */}
                 {message && message.includes('volunteering') && (
                    <div className={`p-3 rounded-lg text-sm ${message.includes('Thank') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message}
                    </div>
                  )}

                <Button
                  type="submit"
                  variant="primary" // Existing primary button style
                  disabled={submitting}
                  className="w-full flex items-center justify-center"
                  size="lg"
                >
                  {submitting ? 'Submitting...' : 'Sign Up to Volunteer'}
                   {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
         <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Contact Us
              </h3>
              <p className="text-center text-gray-600 mb-6 -mt-2">Have questions or ideas? Get in touch with the campaign team.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Contact form fields remain the same */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                  </div>
                  
                {/* Message display */}
                 {message && message.includes('Message sent') && (
                    <div className={`p-3 rounded-lg text-sm ${message.includes('sent') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message}
                    </div>
                  )}

                <Button
                  type="submit"
                  variant="primary" // Existing primary button style
                  disabled={submitting}
                  className="w-full flex items-center justify-center"
                  size="lg"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                   {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
       {/* CSS for animations */}
      <style>{`
        .animate-section-enter {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}