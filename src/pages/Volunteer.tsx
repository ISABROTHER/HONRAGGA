import { ArrowRight, Tool, Zap, Code, Landmark, GraduationCap, Banknote, BarChart3, TrendingUp, Handshake } from 'lucide-react';
import { Button } from '../components/Button';

// Note: Removed old imports (useState, useEffect, supabase, etc.) as the page is now static content.

// Define the structure for the program pillars
interface ProgramPillar {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
}

const programs: ProgramPillar[] = [
  {
    title: 'Cape Works Initiative (CWI)',
    subtitle: 'Youth working, Cape Coast shining.',
    icon: Tool,
    description: 'Scaling vocational skills and practical employment programs for immediate job access.',
  },
  {
    title: 'Cape Innovates Accelerator (CIA)',
    subtitle: 'Turning local ideas into global businesses.',
    icon: Zap,
    description: 'Providing seed funding, intensive mentorship, and tech incubation space for high-potential startups.',
  },
  {
    title: 'Digital Cape Project (DCP)',
    subtitle: 'Train local, work global.',
    icon: Code,
    description: 'Comprehensive training in digital literacy, coding, and remote work, leading to global job placement.',
  },
  {
    title: 'Heritage Jobs 360 (HJ360)',
    subtitle: 'Our history, our hustle.',
    icon: Landmark,
    description: 'Creating sustainable employment in revitalized tourism, arts, cultural preservation, and hospitality sectors.',
  },
  {
    title: 'Classroom to Career (C2C)',
    subtitle: 'No graduate left idle.',
    icon: GraduationCap,
    description: 'Bridging education with industry through targeted internships, career guidance, and robust employment partnerships.',
  },
  {
    title: 'CCNYDF - Youth Development Fund',
    subtitle: 'Financial fuel for youth dreams.',
    icon: Banknote,
    description: 'A self-sustaining public trust fund providing micro-loans and grants to support youth-led business startups.',
  },
  {
    title: 'Cape Impact Dashboard (CID)',
    subtitle: 'Transparency and tracking for every goal.',
    icon: BarChart3,
    description: 'A public-facing dashboard to monitor employment metrics, fund usage, and real-time program outcomes transparently.',
  },
];

// Custom Colors based on user request: Deep Blue (#002B5B) and Orange Accent (#FF6B00)
const DeepBlue = '#002B5B';
const OrangeAccent = '#FF6B00';

export function Volunteer() {
  return (
    <div className="min-h-screen bg-white">

      {/* 1. Hero Section */}
      <section 
        className="relative py-24 sm:py-32 lg:py-48 text-white animate-fade-in shadow-2xl"
        style={{ backgroundColor: DeepBlue }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            CETRA2030 
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-8 max-w-4xl mx-auto">
            <span className="font-semibold" style={{ color: OrangeAccent }}>
              Cape Coast North Youth Employment Transformation Agenda
            </span>
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-wide" style={{ color: OrangeAccent }}>
            "Every Youth Productive by 2030."
          </h2>

          <p className="text-lg sm:text-xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
            A bold, integrated strategy to unlock the economic potential of Cape Coast North's youth through skills, innovation, and sustainable financing.
          </p>

          <Button 
            variant="secondary" // Maps to a vibrant orange/amber
            size="lg"
            className="shadow-xl hover:shadow-2xl transition-shadow"
            onClick={() => {
              // Smooth scroll to the programs section
              document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Programs
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

        </div>
      </section>

      {/* 2. Programs Section */}
      <section id="programs-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The 7 Pillars of CETRA2030
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Focused initiatives designed to cover every aspect of the youth employment ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div 
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: OrangeAccent }} // Icon background
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="font-medium text-lg mb-3" style={{ color: DeepBlue }}>
                    {program.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {program.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Section */}
      <section className="py-20" style={{ backgroundColor: DeepBlue }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Vision */}
            <div className="p-8 rounded-2xl border-2 border-blue-700 shadow-xl">
              <h3 className="text-3xl font-bold mb-4" style={{ color: OrangeAccent }}>
                Our Vision
              </h3>
              <p className="text-xl font-light leading-relaxed">
                To make every youth in Cape Coast North **employable, empowered, or earning** by 2030.
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-2xl border-2 border-blue-700 shadow-xl">
              <h3 className="text-3xl font-bold mb-4" style={{ color: OrangeAccent }}>
                Our Mission
              </h3>
              <p className="text-xl font-light leading-relaxed">
                To build a **self-sustaining youth economy** through innovation, advanced skills training, and entrepreneurship support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Call-to-Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join the CETRA2030 Movement
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            CETRA2030 is a movement, not just a plan. We call upon corporate partners, NGOs, diaspora investors, and volunteers to help us build a productive future for our youth. Your investment is an investment in Cape Coast North.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary" // Use secondary for the OrangeAccent look
              className="shadow-lg hover:shadow-xl"
              onClick={() => {/* Placeholder: Navigate to a Contact or Partnership page */}}
            >
              Partner With Us
              <Handshake className="ml-2 w-5 h-5 group-hover:translate-x-0 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-900 text-blue-900 hover:text-white hover:bg-blue-900"
              onClick={() => {/* Placeholder: Navigate to Impact Dashboard page */}}
            >
              See Impact Dashboard
              <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}