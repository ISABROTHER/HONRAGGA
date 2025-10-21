import { ArrowRight, Users, Heart, TrendingUp, Calendar, BookOpen, Target, DollarSign } from 'lucide-react';
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

  // Helper class for screen height (100vh - header height (5rem/20 units)).
  // We explicitly set min-h-screen for large screens where 5rem doesn't matter much.
  const FullScreenClass = "min-h-[calc(100vh-5rem)] flex items-center justify-center";

  return (
    <div className="min-h-screen bg-white">
      {/* --- PHONE VIEW SCREEN 1: THE VISION (Hero) --- */}
      <section className={`relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden ${FullScreenClass}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-semibold backdrop-blur-sm">
                Senate Campaign 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              A New Voice for
              <span className="block mt-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Our Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Together, we can build a future where economic opportunity, quality healthcare,
              and excellent education are rights, not privileges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('volunteer')}
                className="group"
              >
                Join the Movement
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('policies')}
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                View Our Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHONE VIEW SCREEN 2: THE STORY (About Focus) --- */}
      <section className={`bg-white text-gray-900 border-b border-gray-200 py-20 lg:py-0 ${FullScreenClass}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Target className="w-16 h-16 text-blue-900 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Why I'm Running
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              "I grew up watching my parents work multiple jobs, and that taught me the true value of a dollar and the struggle of everyday families. My campaign isn't about power; it's about making sure your voice, and your family's needs, are heard in Washington."
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => onNavigate('about')}
              className="group shadow-blue-500/50 hover:shadow-lg"
            >
              Read Jane's Full Story
              <BookOpen className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* --- PHONE VIEW SCREEN 3: THE ACTION (Volunteer/Donate Focus) --- */}
      <section className={`bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden py-20 lg:py-0 ${FullScreenClass}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Heart className="w-16 h-16 text-white/90 mx-auto drop-shadow-lg" />
            <h2 className="text-4xl md:text-5xl font-bold drop-shadow-md">
              Your Support Changes Everything.
            </h2>
            <p className="text-xl text-amber-100 drop-shadow-sm max-w-3xl mx-auto leading-relaxed">
              This movement is powered by people, not special interests. Chip in $5, volunteer an hour, or share our message.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="primary" 
                onClick={() => onNavigate('volunteer')}
                className="group shadow-lg shadow-blue-900/50 hover:shadow-xl"
              >
                Contribute Now
                <DollarSign className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('events')}
                className="border-white text-white hover:bg-white hover:text-amber-600"
              >
                Find an Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Original content, remains below the 3 screens) */}
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

      {/* Core Values Section (Original content) */}
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
    </div>
  );
}