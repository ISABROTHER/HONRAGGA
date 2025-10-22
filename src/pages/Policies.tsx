import { useEffect, useRef } from 'react'; // Import hooks for animation
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight } from 'lucide-react'; // Removed CheckCircle import

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode; // Holds either a div with color or an img tag
  initiativeCount: number; // Based on detailed text sections
  // Removed keyInitiatives array
}

// Props interface including the navigation function from App.tsx
interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {
  // Ref for the grid container to observe its children
  const gridRef = useRef<HTMLDivElement>(null);

  // Effect for scroll animation (zoom-in effect)
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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


  // Array containing the main policy themes
  const themes: PolicyTheme[] = [
    {
      id: 'education',
      title: 'Education & Youth Empowerment',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education & Youth Empowerment" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3,
    },
    {
      id: 'health',
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://via.placeholder.com/820x360/EBF8FF/3182CE?text=Health+%26+Sanitation" alt="Health & Sanitation Placeholder" className="w-full h-full object-cover opacity-70"/>
        </div>
      ),
      initiativeCount: 2,
    },
    {
      id: 'entrepreneurship',
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://via.placeholder.com/820x360/EBF8FF/3182CE?text=Employment+%26+Entrepreneurship" alt="Employment Placeholder" className="w-full h-full object-cover opacity-70"/>
        </div>
      ),
      initiativeCount: 2,
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      shortDescription: 'Improving roads, electrification, and connectivity.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure Development" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3,
    },
    {
      id: 'agriculture',
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
       initiativeCount: 1,
    },
     {
      id: 'community',
      title: 'Social Welfare & Gender Equity',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
            <img src="https://via.placeholder.com/820x360/EBF8FF/3182CE?text=Social+Welfare" alt="Social Welfare Placeholder" className="w-full h-full object-cover opacity-70"/>
        </div>
      ),
      initiativeCount: 3,
    },
    {
      id: 'environment',
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
            <img src="https://via.placeholder.com/820x360/EBF8FF/3182CE?text=Environment" alt="Environment Placeholder" className="w-full h-full object-cover opacity-70"/>
        </div>
      ),
       initiativeCount: 1,
    },
     {
      id: 'planning', // Corresponds to Governance
      title: 'Good Governance & Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
      initiativeCount: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100"> {/* Light gray background */}
      {/* Section Header - Dark Green Gradient */}
      <section className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
             Click on a priority area to explore our initiatives and achievements in detail.
          </p>
        </div>
      </section>

      {/* Priorities Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {themes.map((theme, index) => {
              // Removed const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-500 ease-out text-left transform hover:border-blue-300`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image/Placeholder Component */}
                  <div className="overflow-hidden">
                    {theme.imageComponent}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col">
                    {/* Top section: Title and Description */}
                    <div className="mb-4">
                        {/* Heading: Underline effect RE-ADDED */}
                        <h2 className="relative inline-block text-xl sm:text-2xl font-bold text-green-800 whitespace-nowrap overflow-hidden text-ellipsis mb-2 pb-1 /* Added padding-bottom */
                                       after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-amber-600 after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                          {theme.title}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-1">
                          {theme.shortDescription}
                        </p>
                    </div>

                    {/* Middle section: Initiatives List REMOVED */}

                    {/* Bottom section: Count and View Details */}
                    <div className="mt-auto flex justify-between items-center pt-4">
                        {/* Initiative Count */}
                        <p className="text-sm text-gray-700 font-medium">
                           <span className="font-extrabold text-lg text-amber-600 mr-1">{theme.initiativeCount}</span>
                            {theme.initiativeCount === 1 ? 'Initiative Area Listed' : 'Initiative Areas Listed'}
                        </p>

                        {/* Call to Action: Right Aligned - Standard hover underline REMOVED */}
                        <span className="inline-flex items-center text-sm font-semibold text-amber-700"> {/* Removed group-hover:underline */}
                          View Details
                          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            Share Your Thoughts on These Priorities
          </h2>
          <p className="text-blue-800 mb-6">
            Your feedback is valuable. Let us know how we can work together to achieve these goals.
          </p>
          <a
            href="#" // Replace with actual contact link
            className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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