import { Award, BookOpen, Users, Heart, Target, Briefcase } from 'lucide-react';

export function About() {
  const achievements = [
    {
      icon: Briefcase,
      title: 'Community Organizer',
      period: '2015-2020',
      description: 'Led grassroots initiatives that brought affordable housing to over 500 families'
    },
    {
      icon: BookOpen,
      title: 'Education Advocate',
      period: '2018-Present',
      description: 'Championed programs that increased college access for underserved students by 40%'
    },
    {
      icon: Heart,
      title: 'Healthcare Reform Leader',
      period: '2019-Present',
      description: 'Spearheaded local healthcare initiatives covering 10,000+ uninsured residents'
    },
    {
      icon: Users,
      title: 'Small Business Champion',
      period: '2020-Present',
      description: 'Helped 200+ small businesses access funding and resources during economic challenges'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Integrity',
      description: 'Honest, transparent leadership you can trust'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Your voice matters in every decision we make'
    },
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Policy driven by empathy and understanding'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to delivering real results'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Jane Doe</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A lifetime of service, a vision for the future
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-blue-900 font-semibold text-sm">My Story</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Fighting for Families, Building Our Future
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I grew up in a working-class family where making ends meet was a constant challenge.
                  My parents worked multiple jobs to provide opportunities for me and my siblings.
                  That experience shaped my understanding of the struggles everyday families face.
                </p>

                <p>
                  After earning my degree in Public Policy, I dedicated my career to community service.
                  I've worked alongside teachers fighting for better schools, families seeking affordable
                  healthcare, and small business owners trying to keep their doors open.
                </p>

                <p>
                  I've seen firsthand how policy decisions in Washington affect real people. Too often,
                  those decisions favor special interests over working families. That's why I'm running
                  for Senate—to be a voice for those who've been left behind.
                </p>

                <p>
                  This campaign is about more than one person. It's about building a movement that puts
                  people first, that fights for economic justice, healthcare access, and educational
                  opportunity for all. Together, we can create the change our communities deserve.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-blue-900">
                  <div className="text-center">
                    <Users className="w-32 h-32 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium opacity-75">Candidate Photo</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Track Record of Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven leadership delivering real change for our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map(({ icon: Icon, title, period, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {period}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The values that guide every decision
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 hover:border-blue-500 transition-all group"
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
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="space-y-6">
            <p className="text-2xl md:text-3xl font-medium italic leading-relaxed">
              "Leadership isn't about holding power—it's about empowering others.
              It's about listening more than talking, and acting on behalf of those
              who've been waiting too long for change."
            </p>
            <footer className="text-xl text-blue-200">
              — Jane Doe
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}