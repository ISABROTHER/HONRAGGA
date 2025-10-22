import { useEffect, useRef } from 'react';
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter');
          }
        });
      },
      { threshold: 0.1 }
    );

    const gridElement = gridRef.current;
    if (gridElement) {
      Array.from(gridElement.children).forEach((card) => {
        observer.observe(card);
        card.classList.add('opacity-0', 'translate-y-6');
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
      imageComponent: <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education" className="w-full h-48 object-cover" />,
      initiativeCount: 3,
      colorTheme: { bg: 'bg-red-50', iconBg: 'bg-red-600', iconText: 'text-red-700', text: 'text-red-900', hoverBorder: 'hover:border-red-300', ctaText: 'text-red-800' }
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: <img src="https://i.imgur.com/BqfSeFA.jpeg" alt="Health" className="w-full h-48 object-cover" />,
      initiativeCount: 2,
      colorTheme: { bg: 'bg-yellow-50', iconBg: 'bg-yellow-500', iconText: 'text-yellow-700', text: 'text-yellow-900', hoverBorder: 'hover:border-yellow-300', ctaText: 'text-yellow-800' }
    },
    {
      id: 'infrastructure',
      icon: Building,
      title: 'Infrastructure Development',
      shortDescription: 'Improving roads, electrification, and connectivity.',
      imageComponent: <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure" className="w-full h-48 object-cover" />,
      initiativeCount: 4,
      colorTheme: { bg: 'bg-blue-50', iconBg: 'bg-blue-600', iconText: 'text-blue-700', text: 'text-blue-900', hoverBorder: 'hover:border-blue-300', ctaText: 'text-blue-800' }
    },
    {
      id: 'environment',
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Environment" className="w-full h-48 object-cover" />,
      initiativeCount: 1,
      colorTheme: { bg: 'bg-teal-50', iconBg: 'bg-teal-500', iconText: 'text-teal-700', text: 'text-teal-900', hoverBorder: 'hover:border-teal-300', ctaText: 'text-teal-800' }
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 via-yellow-500 to-red-600 text-white py-20 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md mb-6">
            Our Key Development Priorities
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Explore our top initiatives that are shaping a brighter, more sustainable future for our communities.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </section>

      {/* Policies Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {themes.map((theme, i) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`relative group bg-white rounded-2xl border border-gray-200 hover:shadow-2xl overflow-hidden transform transition-all duration-700 ease-out ${theme.hoverBorder}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Top Image */}
                  <div className="overflow-hidden relative">
                    {theme.imageComponent}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 text-left">
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${theme.colorTheme.iconBg} text-white mr-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className={`text-2xl font-bold ${theme.colorTheme.text}`}>{theme.title}</h2>
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {theme.shortDescription}
                    </p>

                    {/* Initiative Count */}
                    <div className="mt-4 flex items-center text-gray-500 text-sm font-medium uppercase tracking-wide">
                      <span className="text-gray-800 font-semibold text-lg mr-2">
                        {theme.initiativeCount}
                      </span>
                      <span>No. of Initiatives Listed</span>
                    </div>

                    {/* View Details CTA */}
                    <div className="mt-6">
                      <span className={`inline-flex items-center font-semibold ${theme.colorTheme.ctaText} group-hover:underline`}>
                        View Details
                        <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {/* Glow border effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 blur-sm"></div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Share Your Thoughts</h2>
          <p className="text-gray-600 mb-6">
            Your feedback is vital. Let’s build together for a stronger and more inclusive future.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-colors"
          >
            Contact Your MP
          </a>
        </div>
      </section>

      {/* Internal Animations */}
      <style>{`
        .animate-card-enter {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
