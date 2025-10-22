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
}

// Props interface including the navigation function from App.tsx
interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {
  // Ref for the grid container to observe its children
  const gridRef = useRef<HTMLDivElement>(null);

  // Effect for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter');
            entry.target.classList.remove('opacity-0', 'translate-y-4'); // Ensure initial state is removed
          }
          // Optional: Remove class if you want animation to repeat when scrolling back up
          // else {
          //   entry.target.classList.remove('animate-card-enter');
          //   entry.target.classList.add('opacity-0', 'translate-y-4');
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
      // Observe each card (button) within the grid
      Array.from(gridElement.children).forEach((card) => {
        observer.observe(card);
        // Add initial animation state classes
        card.classList.add('opacity-0', 'translate-y-4');
      });
    }

    // Cleanup observer on component unmount
    return () => {
      if (gridElement) {
        Array.from(gridElement.children).forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount


  // Array containing the main policy themes with their image components and initiative counts
  const themes: PolicyTheme[] = [
    {
      id: 'education',
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education & Youth Empowerment" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3, // Basic/SHS, Tertiary, General
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-yellow-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
          <Heart className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
      initiativeCount: 2, // Health Facility Support, Sanitation Projects
    },
    {
      id: 'entrepreneurship',
      icon: Users,
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-green-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
          <Users className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
      initiativeCount: 2, // Factory Revival, Award Recognition
    },
    {
      id: 'infrastructure',
      icon: Building,
      title: 'Infrastructure Development',
      shortDescription: 'Improving roads, electrification, and connectivity.',
      imageComponent: (
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure Development" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 2, // Roads/Lighting, Community Buildings
    },
    {
      id: 'agriculture',
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
       initiativeCount: 1, // General support (no sub-points in provided text)
    },
     {
      id: 'community',
      icon: Handshake,
      title: 'Social Welfare & Gender Equity',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-green-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
           <Handshake className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
      initiativeCount: 3, // Salary Donation, Leadership/Mentorship, Youth Sports
    },
    {
      id: 'environment',
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-red-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
          <Leaf className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
       initiativeCount: 1, // General protection (no sub-points)
    },
     {
      id: 'planning', // Corresponds to Governance
      icon: Landmark,
      title: 'Good Governance & Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
         <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
      initiativeCount: 1, // Cape Coast 8-Year Plan
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
           {/* Added ref to the grid container */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {themes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  // Added transition classes for animation
                  className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-500 ease-out text-left"
                  // Added delay based on index for staggered effect
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image/Placeholder Component */}
                  {theme.imageComponent}

                  {/* Content Area */}
                  <div className="p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-green-700 flex-shrink-0" />
                      {theme.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3"> {/* Added margin-bottom */}
                      {theme.shortDescription}
                    </p>
                    {/* Added Initiative Count */}
                    <p className="text-xs text-gray-500 font-medium mb-3">
                       {theme.initiativeCount} {theme.initiativeCount === 1 ? 'Key Initiative Area' : 'Key Initiative Areas'} Detailed
                    </p>
                    {/* Learn More indicator */}
                    <span className="inline-flex items-center text-sm font-medium text-green-700 group-hover:underline">
                      Learn More
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

      {/* CSS for the animation (could also go in index.css) */}
      <style>{`
        .animate-card-enter {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}