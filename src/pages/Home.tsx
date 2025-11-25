import { 
  ArrowRight, Users, Heart, TrendingUp, Calendar, CheckCircle, Mail, ChevronRight,
  MessageSquareWarning, HardHat, ScrollText, Award, HandHeart, UserCircle 
} from 'lucide-react';
import { Button } from '../components/Button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  // Candidate Image
  const CANDIDATE_IMAGE_URL = "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/515441812_10163003867507920_4808851483961703661_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFkXpxZfRZCiS6tUkMuNIwhz6Ix5oWf9IPPojHmhZ_0g3q-yrs_5MJM8xygdYYX5g4&_nc_ohc=O_SI0alOrEUQ7kNvwFE3BmL&_nc_oc=AdkQ-x4mJmZz5C-Peh1kc9yDFigPG46vldlmExHwi79lZshgP8YqbgstLrh_t8KoN4Y&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=ZVbXGcOeCipYDkVva7FcmA&oh=00_Afd9WY4XJWo_eBqDQdctSg_i9eSVJ3yuBWa15kvxQYC1Og&oe=68FCCF73";

  // Data for the new Quick Access Grid
  const quickLinks = [
    {
      title: "Projects",
      desc: "Track ongoing infrastructure developments, school renovations, and community builds.",
      icon: HardHat,
      color: "bg-amber-100/60", // Soft Yellow/Amber
      route: "policies"
    },
    {
      title: "Report Issue",
      desc: "Spot a problem in your community? Report potholes, streetlights, or sanitation issues directly.",
      icon: MessageSquareWarning,
      color: "bg-emerald-100/60", // Soft Mint
      route: "news"
    },
    {
      title: "Policies",
      desc: "Explore the CETRA2030 agenda and our blueprint for economic and social growth.",
      icon: ScrollText,
      color: "bg-blue-100/60", // Soft Blue
      route: "policies"
    },
    {
      title: "Achievements",
      desc: "A record of promises kept: scholarships awarded, bills passed, and lives touched.",
      icon: Award,
      color: "bg-amber-100/60",
      route: "about"
    },
    {
      title: "Support",
      desc: "Volunteer your time, donate to the campaign, or join a local action group.",
      icon: HandHeart,
      color: "bg-emerald-100/60",
      route: "volunteer"
    },
    {
      title: "About",
      desc: "Get to know Hon. Dr. Kwamena Minta Nyarku—his background, values, and story.",
      icon: UserCircle,
      color: "bg-blue-100/60",
      route: "about"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* === HERO SECTION === */}
      <section className="relative bg-slate-50 lg:min-h-[85vh] flex flex-col lg:flex-row items-center overflow-hidden">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 px-6 py-16 lg:py-24 lg:pl-20 xl:pl-32 z-10">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>MP for Cape Coast North</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Hon. Dr. Kwamena <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                Minta Nyarku
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              "Obiara Ka Ho." Championing the <strong>CETRA2030</strong> agenda to build a self-sustaining economy through education, innovation, and unity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => onNavigate('volunteer')} 
                variant="primary" 
                size="lg"
                className="shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20"
              >
                Join the Movement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('about')} 
                variant="outline" 
                size="lg"
                className="bg-white"
              >
                Meet Ragga
              </Button>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-[85vh] relative">
          <div className="absolute inset-0 bg-blue-900/5 lg:bg-transparent"></div>
          {/* Decorative Shape */}
          <div className="hidden lg:block absolute -left-24 inset-y-0 w-48 bg-slate-50 transform -skew-x-6 z-10"></div>
          
          <img 
            src={CANDIDATE_IMAGE_URL} 
            alt="Hon. Dr. Kwamena Minta Nyarku" 
            className="w-full h-full object-cover object-top"
          />
          
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* === QUICK ACCESS GRID (UPDATED: 3 PER LINE ON MOBILE) === */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3 cols on mobile (grid-cols-3), 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {quickLinks.map((link, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate(link.route)}
                className={`${link.color} rounded-2xl md:rounded-[2rem] p-3 md:p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95`}
              >
                {/* Circle Icon Container: Smaller on mobile */}
                <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center border border-slate-900 mb-2 md:mb-6 shadow-sm">
                  <link.icon className="w-6 h-6 md:w-8 md:h-8 text-slate-900 stroke-[1.5]" />
                </div>
                
                {/* Title: Smaller text on mobile */}
                <h3 className="text-xs md:text-xl font-bold text-slate-900 mb-0 md:mb-3 leading-tight">
                  {link.title}
                </h3>
                
                {/* Description: Hidden on Mobile to fit 3 per line, Visible on Desktop */}
                <p className="hidden md:block text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {link.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STATS / TRACK RECORD STRIP === */}
      <section className="bg-blue-950 text-white py-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Grid: 3 columns on mobile, 6 columns on desktop */}
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

      {/* === PRIORITIES PREVIEW === */}
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
            {/* Card 1 */}
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

            {/* Card 2 */}
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

            {/* Card 3 */}
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

      {/* === NEWSLETTER / STAY CONNECTED === */}
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

      {/* === BOTTOM CTA === */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900 text-white text-center relative overflow-hidden">
        {/* Decorative Circles */}
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