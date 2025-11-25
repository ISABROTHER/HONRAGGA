import { ArrowRight, Users, Heart, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '../components/Button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const stats = [
    { icon: Users, value: '50K+', label: 'Supporters' },
    { icon: Calendar, value: '200+', label: 'Events Held' },
    { icon: Heart, value: '15K+', label: 'Volunteers' },
    { icon: TrendingUp, value: '$2M+', label: 'Raised' },
  ];

  const values = [
    {
      title: 'Economic Opportunity',
      description: 'Creating jobs and supporting small businesses',
      icon: TrendingUp
    },
    {
      title: 'Healthcare for All',
      description: 'Affordable, accessible healthcare for every family',
      icon: Heart
    },
    {
      title: 'Community First',
      description: 'Putting people over politics, always',
      icon: Users
    }
  ];

  // NOTE: This URL is non-portable. In a production site, replace this with a hosted image.
  const CANDIDATE_IMAGE_URL = "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/515441812_10163003867507920_4808851483961703661_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFkXpxZfRZCiS6tUkMuNIwhz6Ix5oWf9IPPojHmhZ_0g3q-yrs_5MJM8xygdYYX5g4&_nc_ohc=O_SI0alOrEUQ7kNvwFE3BmL&_nc_oc=AdkQ-x4mJmZz5C-Peh1kc9yDFigPG46vldlmExHwi79lZshgP8YqbgstLrh_t8KoN4Y&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=ZVbXGcOeCipYDkVva7FcmA&oh=00_Afd9WY4XJWo_eBqDQdctSg_i9eSVJ3yuBWa15kvxQYC1Og&oe=68FCCF73";

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      {/* Added -mt-2 to remove gap between header and hero */}
      <section className="relative w-full aspect-video min-h-[300px] max-h-[900px] flex items-center justify-center text-white overflow-hidden -mt-2">
        
        {/* Background Image Container */}
        {/* Changed bg-center to 'bg-center md:bg-top' to fix web cropping while keeping mobile layout */}
        <div 
          className="absolute inset-0 bg-cover bg-center md:bg-top"
          style={{ backgroundImage: `url(${CANDIDATE_IMAGE_URL})` }}
          role="img"
          aria-label="Campaign Hero Image"
        >
          {/* Top of the image remains clear */}
        </div>

        {/* Cinematic Black Overlay */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Layered Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="text-center space-y-4 md:space-y-6 animate-fade-in flex flex-col items-center justify-center">

            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-none drop-shadow-lg [text-shadow:_0_4px_4px_rgb(0_0_0_/_60%)]">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent whitespace-nowrap">
                A NEW VOICE FOR OUR FUTURE
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-tight drop-shadow-lg [text-shadow:_0_2px_2px_rgb(0_0_0_/_50%)]">
              Together, we can build a future where economic opportunity, quality healthcare,
              and excellent education are rights, not privileges.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('volunteer')}
                className="group shadow-lg shadow-amber-500/50"
              >
                Join the Movement
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('about')}
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Learn More About Jane
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 text-blue-900 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A campaign built on principles that matter to real people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINI FOOTER SECTION */}
      <section className="bg-red-600 h-7 md:h-8 flex items-center justify-center overflow-hidden"></section>

      {/* FOOTER CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Your voice matters. Your support makes this campaign possible.
            Together, we can create the change our community deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('volunteer')}
              className="group"
            >
              Volunteer Today
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('events')}
              className="border-white text-white hover:bg-white hover:text-blue-900"
            >
              View Upcoming Events
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}