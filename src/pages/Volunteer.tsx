import { useState } from 'react';
import { Users, Heart, Phone, Mail, DollarSign, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';

export function Volunteer() {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'donate'>('volunteer');
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
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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
    } catch (error: any) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
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
    } catch (error: any) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get Involved</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your time and support make this campaign possible. Join us in building a better future.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'volunteer'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Volunteer
            </button>
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'donate'
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Donate
            </button>
          </div>
        </div>
      </section>

      {activeTab === 'volunteer' ? (
        <>
          <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Volunteer Opportunities
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Find the perfect way to contribute your time and skills
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {opportunities.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-900 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Sign Up to Volunteer
                </h3>

                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Areas of Interest
                    </label>
                    <textarea
                      value={volunteerForm.interests}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, interests: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="What activities interest you most?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <textarea
                      value={volunteerForm.availability}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                      placeholder="When are you available to volunteer?"
                    />
                  </div>

                  {message && (
                    <div className={`p-4 rounded-lg ${message.includes('Thank') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="w-full"
                    size="lg"
                  >
                    {submitting ? 'Submitting...' : 'Sign Up to Volunteer'}
                  </Button>
                </form>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Us
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>

                  {message && (
                    <div className={`p-4 rounded-lg ${message.includes('sent') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="w-full"
                    size="lg"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Support Our Campaign
              </h2>
              <p className="text-xl text-gray-600">
                Your donation helps us reach more voters and build a stronger movement
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    className="px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">
                      Stripe Integration Ready
                    </h3>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      This campaign accepts secure donations via Stripe. Payment processing will be enabled once you connect your Stripe account. Federal contribution limits apply: $3,300 per election.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => alert('Stripe payment integration required. This is a demo placeholder.')}
              >
                Contribute Now
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Contributions are not tax-deductible. By contributing, you certify that you are a U.S. citizen or permanent resident, and this contribution is made from your own funds.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}