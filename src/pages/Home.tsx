import { 
  ArrowRight, Users, Heart, TrendingUp, Calendar, CheckCircle, Mail, ChevronRight,
  MessageSquareWarning, HardHat, ScrollText, Award, HandHeart, UserCircle 
} from 'lucide-react';
import { Button } from '../components/Button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  // Banner Image
  const HERO_IMAGE_URL = "https://i.imgur.com/XC8k4zQ.jpeg";

  // DESKTOP HERO POSITION (EDIT THIS ONLY)
  const HERO_POSITION = "center -200px";

  // Data for the Quick Access Grid
  const quickLinks = [
    {
      title: "Projects",
      mobileDesc: "Infrastructure",
      desc: "Track ongoing infrastructure developments and renovations.",
      icon: HardHat,
      bgClass: "from-amber-50 to-orange-50/50 border-orange-100",
      iconColor: "text-amber-600",
      route: "policies"
    },
    {
      title: "Report Issue",
      mobileDesc: "Fix problems",
      desc: "Spot a problem? Report potholes or streetlights directly.",
      icon: MessageSquareWarning,
      bgClass: "from-emerald-50 to-teal-50/50 border-emerald-100",
      iconColor: "text-emerald-600",
      route: "news"
    },
    {
      title: "Policies",
      mobileDesc: "The Agenda",
      desc: "Explore the CETRA2030 agenda for economic growth.",
      icon: ScrollText,
      bgClass: "from-blue-50 to-indigo-50/50 border-blue-100",
      iconColor: "text-blue-600",
      route: "policies"
    },
    {
      title: "Achievements",
      mobileDesc: "Track record",
      desc: "A record of promises kept: scholarships and bills passed.",
      icon: Award,
      bgClass: "from-purple-50 to-fuchsia-50/50 border-purple-100",
      iconColor: "text-purple-600",
      route: "about"
    },
    {
      title: "Support",
      mobileDesc: "Join us",
      desc: "Volunteer your time or donate to the campaign.",
      icon: HandHeart,
      bgClass: "from-rose-50 to-pink-50/50 border-rose-100",
      iconColor: "text-rose-600",
      route: "volunteer"
    },
    {
      title: "About",
      mobileDesc: "The MP",
      desc: "Get to know Hon. Dr. Kwamena Minta Nyarku.",
      icon: UserCircle,
      bgClass: "from-slate-50 to-gray-50/50 border-slate-200",
      iconColor: "text-slate-600",
      route: "about"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      {/* === 1. HERO BANNER (MOBILE + DESKTOP) === */}
      <section className="relative w-full">
        {/* Mobile: image uses its natural height – no extra white inside, no magic numbers */}
        <div className="block md:hidden w-full bg-white">
          <img
            src={HERO_IMAGE_URL}
            alt="Hon. Dr. Kwamena Minta Nyarku"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop: large hero with controlled crop */}
        <div className="hidden md:block w-full h-[90vh] overflow-hidden bg-white">
          <img
            src={HERO_IMAGE_URL}
            alt="Hon. Dr. Kwamena Minta Nyarku"
            className="w-full h-full object-cover"
            style={{ objectPosition: HERO_POSITION }}
          />
        </div>
      </section>

      {/* === 2. QUICK ACCESS GRID === */}
      {/* Pull cards tight under hero on mobile – no long white gap */}
      <section className="relative z-20 -mt-[4px] md:mt-0 pt-2 pb-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
            {quickLinks.map((link, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate(link.route)}
                className={`group relative overflow-hidden rounded-xl md:rounded-2xl border ${link.bgClass} bg-gradient-to-br p-2.5 md:p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
              >
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-lg md:rounded-2xl flex items-center justify-center shadow-sm mb-1.5 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <link.icon className={`w-5 h-5 md:w-8 md:h-8 ${link.iconColor}`} />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-xl font-bold text-slate-900 mb-0.5 md:mb-2 leading-tight tracking-tight truncate w-full">
                  {link.title}
                </h3>
                <p className="block md:hidden text-slate-500 text-[9px] leading-none font-medium tracking-tight">
                  {link.mobileDesc}
                </p>
                <p className="hidden md:block text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {link.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. STATS STRIP === */}
      <section className="bg-blue-950 text-white py-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-2 md:gap-8 text-center md:divide-x md:divide-blue-800/50">
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">50K+</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Supporters</div>
            </div>
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">2,500+</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Streetlights</div>
            </div>
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">100+</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Scholarships</div>
            </div>
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">200+</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Events Held</div>
            </div>
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">15K+</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Volunteers</div>
            </div>
            <div className="p-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">1 Goal</div>
              <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">Development</div>
            </div>
          </div>
        </div>
      </section>

      {/* === 4. PRIORITIES PREVIEW === */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">My Vision</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Priorities for Cape Coast North</h3>
            <p className="text-lg text-slate-600">
              We are building a community where opportunity is shared, education is accessible, and healthcare is a right, not a privilege.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Economic Empowerment</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Revitalizing local markets, supporting small businesses, and driving the CETRA2030 agenda for youth employment.
              </p>
              <button 
                onClick={() => onNavigate('policies')} 
                className="text-blue-700 font-semibold inline-flex items-center group-hover:underline"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-green-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Healthcare Access</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Improving clinic facilities in Kwaprow and Dankwakrom and ensuring maternal health support for all families.
              </p>
              <button 
                 onClick={() => onNavigate('policies')}
                 className="text-green-700 font-semibold inline-flex items-center group-hover:underline"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Community & Education</h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                From "Operation Light Up" to scholarships and school renovations, we are investing in our future leaders.
              </p>
              <button 
                onClick={() => onNavigate('policies')}
                className="text-amber-600 font-semibold inline-flex items-center group-hover:underline"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === 5. NEWSLETTER === */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Mail className="w-12 h-12 text-blue-900 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stay Connected with Ragga</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Join our mailing list to receive updates on parliamentary activities, community projects, and upcoming town hall meetings.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 px-5 py-4 rounded-xl border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
              required
            />
            <Button variant="primary" size="md" className="sm:w-auto w-full py-4">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* === 6. BOTTOM CTA === */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light">
            "Together, we can build a Cape Coast North that works for everyone."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => onNavigate('volunteer')} 
              variant="secondary" 
              size="lg"
              className="w-full sm:w-auto px-10 py-4 text-lg font-bold shadow-2xl shadow-amber-900/20"
            >
              Volunteer Today
            </Button>
            <Button 
              onClick={() => onNavigate('events')} 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-10 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-900"
            >
              Upcoming Events
            </Button>
          </div>
        </div>
      </section> 

    </div>
  );
}
