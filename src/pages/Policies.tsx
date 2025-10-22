import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight } from 'lucide-react';

// Define PolicyTheme interface
interface PolicyTheme {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode;
  initiativeCount: number;
  colorTheme: {
    bg: string;
    iconBg: string;
    iconText: string;
    text: string;
    hoverBorder: string;
    ctaText: string;
  };
}

interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter-zoom');
            entry.target.classList.remove('opacity-0', 'scale-95');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const gridElement = gridRef.current;
    if (gridElement) {
      Array.from(gridElement.children).forEach((card) => {
        observer.observe(card);
        card.classList.add('opacity-0', 'scale-95');
      });
    }

    return () => {
      if (gridElement) {
        Array.from(gridElement.children).forEach((card) => observer.unobserve(card));
      }
    };
  }, []);

  const themes: PolicyTheme[] = [
    {
      id: 'education',
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education & Youth Empowerment" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ),
      initiativeCount: 3,
      colorTheme: { bg: 'bg-red-50', iconBg: 'bg-red-600', iconText: 'text-red-700', text: 'text-red-900', hoverBorder: 'hover:border-red-300', ctaText: 'text-red-800' }
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Heart className="w-16 h-16 text-yellow-400 opacity-70 mx-auto mt-12" />
        </div>
      ),
      initiativeCount: 2,
      colorTheme: { bg: 'bg-yellow-50', iconBg: 'bg-yellow-500', iconText: 'text-yellow-700', text: 'text-yellow-900', hoverBorder: 'hover:border-yellow-300', ctaText: 'text-yellow-800' }
    },
    {
      id: 'entrepreneurship',
      icon: Users,
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Users className="w-16 h-16 text-green-400 opacity-70 mx-auto mt-12" />
        </div>
      ),
      initiativeCount: 2,
      colorTheme: { bg: 'bg-green-50', iconBg: 'bg-green-600', iconText: 'text-green-700', text: 'text-green-900', hoverBorder: 'hover:border-green-300', ctaText: 'text-green-800' }
    },
    {
      id: 'infrastructure',
      icon: Building,
      title: 'Infrastructure Development',
      shortDescription: 'Improving roads, electrification, and connectivity.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure Development" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ),
      initiativeCount: 2,
      colorTheme: { bg: 'bg-blue-50', iconBg: 'bg-blue-600', iconText: 'text-blue-700', text: 'text-blue-900', hoverBorder: 'hover:border-blue-300', ctaText: 'text-blue-800' }
    },
    {
      id: 'agriculture',
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ),
      initiativeCount: 1,
      colorTheme: { bg: 'bg-orange-50', iconBg: 'bg-orange-500', iconText: 'text-orange-700', text: 'text-orange-900', hoverBorder: 'hover:border-orange-300', ctaText: 'text-orange-800' }
    },
    {
      id: 'community',
      icon: Handshake,
      title: 'Social Welfare & Gender Equity',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Handshake className="w-16 h-16 text-purple-400 opacity-70 mx-auto mt-12" />
        </div>
      ),
      initiativeCount: 3,
      colorTheme: { bg: 'bg-purple-50', iconBg: 'bg-purple-600', iconText: 'text-purple-700', text: 'text-purple-900', hoverBorder: 'hover:border-purple-300', ctaText: 'text-purple-800' }
    },
    {
      id: 'environment',
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Leaf className="w-16 h-16 text-teal-400 opacity-70 mx-auto mt-12" />
        </div>
      ),
      initiativeCount: 1,
      colorTheme: { bg: 'bg-teal-50', iconBg: 'bg-teal-500', iconText: 'text-teal-700', text: 'text-teal-900', hoverBorder: 'hover:border-teal-300', ctaText: 'text-teal-800' }
    },
    {
      id: 'planning',
      icon: Landmark,
      title: 'Good Governance & Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      ),
      initiativeCount: 1,
      colorTheme: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-600', iconText: 'text-indigo-700', text: 'text-indigo-900', hoverBorder: 'hover:border-indigo-300', ctaText: 'text-indigo-800' }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Click on a priority area to learn more about our initiatives and achievements.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {themes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <motion.button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`group relative card-gradient-border bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-700 ease-out text-left transform ${theme.hoverBorder}`}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.transform = `rotateY(${(x - rect.width / 2) / 40}deg) rotateX(${-(y - rect.height / 2) / 40}deg) scale(1.02)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                  }}
                >
                  {theme.imageComponent}
                  <div className="p-6">
                    <h2 className={`text-2xl font-bold ${theme.text} mb-2 flex items-center`}>
                      <Icon className={`w-6 h-6 mr-3 ${theme.iconText}`} />
                      {theme.title}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">{theme.shortDescription}</p>
                    <p className="text-sm text-gray-600 font-medium mb-4">
                      <span className="font-bold">{theme.initiativeCount}</span>{' '}
                      {theme.initiativeCount === 1 ? 'Key Area Detailed' : 'Key Areas Detailed'}
                    </p>
                    <span className={`inline-flex items-center text-sm font-semibold ${theme.ctaText} group-hover:underline`}>
                      View Details
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Share Your Thoughts on These Priorities</h2>
          <p className="text-gray-600 mb-6">Your feedback is valuable. Let us know how we can work together to achieve these goals.</p>
          <a href="#" className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition-colors">
            Contact Your MP
          </a>
        </div>
      </section>

      {/* Gradient Border + Animation Style */}
      <style>{`
        .card-gradient-border::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #16a34a, #facc15, #dc2626);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }

        .animate-card-enter-zoom {
          opacity: 1 !important;
          transform: scale(1) !important;
          transition: all 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
