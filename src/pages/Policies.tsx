import { useEffect, useRef } from 'react'; // Import hooks for animation
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight, CheckCircle } from 'lucide-react'; // Added CheckCircle

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode; // Holds either a div with color or an img tag
  initiativeCount: number; // Number of key initiatives mentioned in detail text
  keyInitiatives: string[]; // Array of 2-3 key initiative strings for preview
  // Removed colorTheme as we'll use consistent primary/secondary colors
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


  // Array containing the main policy themes with key initiatives
  const themes: PolicyTheme[] = [
    {
      id: 'education',
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education & Youth Empowerment" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3,
      keyInitiatives: [
          "High School Support Program (LED Bulbs, Desks)",
          "School Renovations & Resources",
          "Tertiary Institution Support (UCC, CCTU, OLA)"
      ]
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Heart className="w-16 h-16 text-blue-300 opacity-70" />
        </div>
      ),
      initiativeCount: 2,
      keyInitiatives: [
          "Support for Kwaprow & Dankwakrom Health Centers",
          "Construction of Public Toilets",
          "Installation of Sanitation Manholes"
      ]
    },
    {
      id: 'entrepreneurship',
      icon: Users, // Using Users icon as placeholder
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Users className="w-16 h-16 text-blue-300 opacity-70" />
        </div>
      ),
      initiativeCount: 2,
       keyInitiatives: [
          "Vision for Factory Revival & Establishment",
          "Job Creation Initiatives",
          "Award Recognition for Entrepreneurship Focus"
      ]
    },
    {
      id: 'infrastructure',
      icon: Building,
      title: 'Infrastructure Development',
      shortDescription: 'Improving roads, electrification, and connectivity.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure Development" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3, // Roads, Lighting, Buildings
       keyInitiatives: [
          "Operation Light Up Cape Coast North (>2500 Lights)",
          "Major Road Grading & Asphalt Allocation (10km)",
          "Ankaful Community Centre Construction"
      ]
    },
    {
      id: 'agriculture',
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
       initiativeCount: 1, // Count based on provided detail text structure
       keyInitiatives: [
           "Providing Tools & Training Resources",
           "Enhancing Market Access for Farmers",
           "Boosting Rural Economic Opportunities"
       ]
    },
     {
      id: 'community',
      icon: Handshake,
      title: 'Social Welfare & Gender Equity',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <Handshake className="w-16 h-16 text-blue-300 opacity-70" />
        </div>
      ),
      initiativeCount: 3,
       keyInitiatives: [
          "Donation of Salary for Community Development",
          "Leadership Summits & Mentorship Programs",
          "Funding for Youth Sports Development"
       ]
    },
    {
      id: 'environment',
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <Leaf className="w-16 h-16 text-blue-300 opacity-70" />
        </div>
      ),
       initiativeCount: 1, // Count based on provided detail text structure
       keyInitiatives: [
           "Protecting Land and Water Resources",
           "Preserving Natural Heritage Sites",
           "Promoting Environmental Sustainability"
       ]
    },
     {
      id: 'planning', // Corresponds to Governance
      icon: Landmark,
      title: 'Good Governance & Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
      initiativeCount: 1, // Based on detail text structure (8-Year Plan)
       keyInitiatives: [
          "Launch of Cape Coast 8-Year Development Plan",
          "Advocacy for Intentional Urban Planning",
          "Revival of Neglected Heritage Sites"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100"> {/* Light gray background */}
      {/* Section Header - Using Primary Site Colors */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
             Click on a priority area to explore our initiatives and achievements in detail.
          </p>
        </div>
      </section>

      {/* Priorities Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10"> {/* Slightly increased gap */}
            {themes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  // Refined hover/focus states, primary colors
                  className={`group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-500 ease-out text-left transform hover:border-blue-300`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image/Placeholder Component */}
                  <div className="overflow-hidden">
                    {theme.imageComponent}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-3"> {/* Added space-y for better vertical spacing */}
                    {/* Heading: Bold, Primary Color Icon */}
                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                      <Icon className="w-6 h-6 mr-3 text-blue-700 flex-shrink-0" />
                      {theme.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {theme.shortDescription}
                    </p>

                    {/* Key Initiatives List */}
                    <ul className="space-y-1.5 pt-1">
                        {theme.keyInitiatives.slice(0, 3).map((initiative, i) => ( // Show max 3
                            <li key={i} className="flex items-start text-xs text-gray-700">
                                <CheckCircle className="w-3.5 h-3.5 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                                <span>{initiative}</span>
                            </li>
                        ))}
                    </ul>

                     {/* Initiative Count - More subtle */}
                    <p className="text-xs text-gray-500 font-medium pt-1">
                       <span className="font-bold">{theme.initiativeCount}</span> {theme.initiativeCount === 1 ? 'Key Area Detailed' : 'Key Areas Detailed'}
                    </p>

                    {/* Call to Action: Bolder, Amber Color */}
                    <div className="pt-1"> {/* Wrapper div for spacing */}
                        <span className="inline-flex items-center text-sm font-semibold text-amber-700 group-hover:underline">
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

      {/* Call to Action Section - Using Primary Colors */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-4">
            Share Your Thoughts on These Priorities
          </h2>
          <p className="text-blue-700 mb-6">
            Your feedback is valuable. Let us know how we can work together to achieve these goals.
          </p>
          <a
            href="#" // Replace with actual contact link
            className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg shadow hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500" // Amber button
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