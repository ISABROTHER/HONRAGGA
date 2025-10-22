import { useEffect, useRef } from 'react'; // Import hooks for animation
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight } from 'lucide-react';

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode; // Holds either a div with color or an img tag
  initiativeCount: number; // Number of key initiatives mentioned in detail text
  colorTheme: { // Refined color themes
    bg: string;
    iconBg: string;
    iconText: string; // Color for the icon within the card content
    text: string;
    hoverBorder: string;
    ctaText: string; // Color for "View Details"
  }
}

// Props interface including the navigation function from App.tsx
interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {
  // Ref for the grid container to observe its children
  const gridRef = useRef<HTMLDivElement>(null);

  // Effect for scroll animation (remains the same zoom-in effect)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter-zoom');
            entry.target.classList.remove('opacity-0', 'scale-95');
          }
          // Optional: Uncomment to reset animation when scrolling out
          // else {
          //   entry.target.classList.remove('animate-card-enter-zoom');
          //   entry.target.classList.add('opacity-0', 'scale-95');
          // }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
      }
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
        Array.from(gridElement.children).forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, []);


  // Array containing the main policy themes with refined colors and initiative counts
  const themes: PolicyTheme[] = [
    {
      id: 'education',
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education & Youth Empowerment" className="absolute inset-0 w-full h-full object-cover"/>
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
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full h-48 sm:h-64 bg-yellow-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Heart className="w-16 h-16 text-yellow-400 opacity-70" />
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
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full h-48 sm:h-64 bg-green-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Users className="w-16 h-16 text-green-400 opacity-70" />
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
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure Development" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 2,
       colorTheme: { bg: 'bg-blue-50', iconBg: 'bg-blue-600', iconText: 'text-blue-700', text: 'text-blue-900', hoverBorder: 'hover:border-blue-300', ctaText: 'text-blue-800' } // Using blue theme
    },
    {
      id: 'agriculture',
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         // Added overflow-hidden and group-hover:scale-105 for image zoom effect
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
       initiativeCount: 1,
       colorTheme: { bg: 'bg-orange-50', iconBg: 'bg-orange-500', iconText: 'text-orange-700', text: 'text-orange-900', hoverBorder: 'hover:border-orange-300', ctaText: 'text-orange-800' } // Using orange theme
    },
     {
      id: 'community',
      icon: Handshake,
      title: 'Social Welfare & Gender Equity',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full h-48 sm:h-64 bg-purple-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <Handshake className="w-16 h-16 text-purple-400 opacity-70" />
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
        // Added overflow-hidden and group-hover:scale-105 for image zoom effect
        <div className="w-full h-48 sm:h-64 bg-teal-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Leaf className="w-16 h-16 text-teal-400 opacity-70" />
        </div>
      ),
       initiativeCount: 1,
       colorTheme: { bg: 'bg-teal-50', iconBg: 'bg-teal-500', iconText: 'text-teal-700', text: 'text-teal-900', hoverBorder: 'hover:border-teal-300', ctaText: 'text-teal-800' }
    },
     {
      id: 'planning', // Corresponds to Governance
      icon: Landmark,
      title: 'Good Governance & Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
         // Added overflow-hidden and group-hover:scale-105 for image zoom effect
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
      initiativeCount: 1,
       colorTheme: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-600', iconText: 'text-indigo-700', text: 'text-indigo-900', hoverBorder: 'hover:border-indigo-300', ctaText: 'text-indigo-800' }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Header */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
             Click on a priority area to learn more about our initiatives and achievements.
          </p>
        </div>
      </section>

      {/* Priorities Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {themes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  // Added theme border hover color
                  className={`group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-500 ease-out text-left transform ${theme.hoverBorder} hover:border-opacity-80`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image/Placeholder Component - Wrapped in div for consistent hover effect */}
                  <div className="overflow-hidden">
                    {theme.imageComponent}
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    {/* Updated Heading: Bold, Theme Color Icon */}
                    <h2 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2 flex items-center whitespace-nowrap overflow-hidden text-ellipsis`}>
                      <Icon className={`w-6 h-6 mr-3 ${theme.iconText} flex-shrink-0`} />
                      {theme.title}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                      {theme.shortDescription}
                    </p>
                    {/* Updated Initiative Count: Bold Number, Muted Text */}
                    <p className="text-sm text-gray-600 font-medium mb-4"> {/* Adjusted font size/color */}
                       <span className="font-bold">{theme.initiativeCount}</span> {theme.initiativeCount === 1 ? 'Key Area Detailed' : 'Key Areas Detailed'}
                    </p>
                    {/* Updated Call to Action: Bolder, Theme Color */}
                    <span className={`inline-flex items-center text-sm font-semibold ${theme.ctaText} group-hover:underline`}>
                      View Details
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Share Your Thoughts on These Priorities
          </h2>
          <p className="text-gray-600 mb-6">
            Your feedback is valuable. Let us know how we can work together to achieve these goals.
          </p>
          <a
            href="#" // Replace with actual contact link
            className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition-colors"
          >
            Contact Your MP
          </a>
        </div>
      </section>

      {/* CSS for the zoom animation */}
      <style>{`
        .animate-card-enter-zoom {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
}