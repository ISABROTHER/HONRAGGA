import { useEffect, useRef } from 'react'; // Import hooks for animation
import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf /* Removed Leaf */, Landmark, ChevronRight } from 'lucide-react';

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode; // Holds either a div with color or an img tag
  initiativeCount: number; // Based on detailed text sections
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
      title: 'Educational Support',
      shortDescription: 'Supporting quality education, digital literacy, and youth skills training.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Educational Support" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
      initiativeCount: 3,
    },
    {
      id: 'health',
      title: 'Health & Sanitation',
      shortDescription: 'Expanding access to healthcare and clean water for all.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/XmWnKbH.jpeg" alt="Health & Sanitation" className="absolute inset-0 w-full h-full object-cover object-[center_35%]"/>
        </div>
      ),
      initiativeCount: 2,
    },
    {
      id: 'entrepreneurship',
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/saQoFLV.png" alt="Employment & Entrepreneurship" className="absolute inset-0 w-full h-full object-cover"/>
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
      title: 'Agricultural Support',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agricultural Support" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
       initiativeCount: 1,
    },
     {
      id: 'community',
      title: 'Social Welfare',
      shortDescription: 'Empowering women, youth, and vulnerable groups.',
      imageComponent: (
        <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
            <img src="https://i.imgur.com/1M0b8mq.jpeg" alt="Social Welfare" className="absolute inset-0 w-full h-full object-cover object-top"/>
        </div>
      ),
      initiativeCount: 3,
    },
     {
      id: 'planning', // Corresponds to Governance
      title: 'Civic Engagement',
      shortDescription: 'Promoting transparency, accountability, and participation.',
      imageComponent: (
         <div className="w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-300" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
      initiativeCount: 1,
    },
  ];

  const videoId = "ifLyedUvFXc"; // Extracted from https://youtu.be/ifLyedUvFXc

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Section Header - Replaced with YouTube Video */}
      <section className="bg-black py-8 md:py-12"> {/* Background color for potential letterboxing */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Constrained width */}
            {/* Responsive Video Wrapper */}
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                 <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player - Development Priorities" // Descriptive title
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen // Use allowFullScreen (camelCase) in React
                 ></iframe>
            </div>
        </div>
      </section>

      {/* Priorities Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {themes.map((theme, index) => {
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-500 ease-out text-left transform hover:border-blue-300`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="overflow-hidden">
                    {theme.imageComponent}
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="relative inline-block text-xl sm:text-2xl font-bold text-green-800 whitespace-nowrap overflow-hidden text-ellipsis mb-2 pb-1
                                       after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-amber-600 after:w-0 group-hover:after:w-full after:transition-all after:duration-300 after:ease-out">
                          {theme.title}
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-1">
                          {theme.shortDescription}
                        </p>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-4">
                        <p className="text-sm text-gray-700 font-medium">
                           <span className="font-extrabold text-lg text-amber-600 mr-1">{theme.initiativeCount}</span>
                            {theme.initiativeCount === 1 ? 'Initiative Listed' : 'Initiatives Listed'}
                        </p>
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