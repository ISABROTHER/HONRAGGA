import { Heart, Target, Users, Award } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Committed to honest, transparent leadership that puts people first'
    },
    {
      icon: Target,
      title: 'Action',
      description: 'Turning promises into policies and policies into progress'
    },
    {
      icon: Users,
      title: 'Unity',
      description: 'Building bridges across communities and bringing people together'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering results through dedication and proven leadership'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Jane Doe</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A lifetime of service, a vision for the future
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I grew up in a working-class family where I learned the value of hard work, community, and never giving up. My parents taught me that with determination and compassion, we can make a difference in the lives of others.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              After graduating from State University, I dedicated my career to public service, working on education reform, healthcare access, and economic development. I've seen firsthand the challenges our communities face and I've spent years developing solutions that work.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Now, I'm running for Senate because our state deserves leadership that listens, acts with integrity, and delivers real results. Together, we can build a future where every family has access to quality healthcare, good-paying jobs, and excellent schools.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Experience & Achievements</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>15+ years in public service and community development</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Led successful education reform initiative serving 50,000+ students</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Championed small business development, creating 2,000+ local jobs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Secured $10M in funding for community healthcare programs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Board member, State Education Foundation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
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
        </div>
      </section>

      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Movement</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            This campaign is about more than one person. It's about all of us coming together to build a better future for our state.
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
            Get Involved Today
          </button>
        </div>
      </section>
    </div>
  );
}
