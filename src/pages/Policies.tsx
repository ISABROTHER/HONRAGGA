import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark } from 'lucide-react';

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  icon: React.ElementType;
  title: string;
  shortDescription: string; // Keep short description for potential future use or screen readers
  imageComponent: React.ReactNode; // Holds either a div with color or an img tag
}

// Props interface including the navigation function from App.tsx
interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {

  // Array containing the main policy themes with their image components
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
    },
    {
      id: 'entrepreneurship', // Changed from employment for consistency
      icon: Users,
      title: 'Employment & Entrepreneurship',
      shortDescription: 'Creating jobs and empowering local businesses.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-green-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
          <Users className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
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
    },
    {
      id: 'agriculture', // Added ID
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers with tools, training, and market access.',
      imageComponent: (
         <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
          <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Agriculture & Rural Growth" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      ),
    },
     {
      id: 'community', // Added ID (matching App.tsx)
      icon: Handshake,
      title: 'Social Welfare & Gender Equity', // Title from previous version
      shortDescription: 'Empowering women, youth, and vulnerable groups.', // Description from previous version
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-green-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
           <Handshake className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
    },
    {
      id: 'environment', // Added ID
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our land, water, and natural heritage.',
      imageComponent: (
        <div className="w-full h-48 sm:h-64 bg-red-200 flex items-center justify-center" style={{ aspectRatio: '820 / 360' }}>
          <Leaf className="w-16 h-16 text-gray-400 opacity-50" />
        </div>
      ),
    },
     {
      id: 'planning', // Added ID (matching App.tsx)
      icon: Landmark,
      title: 'Good Governance & Civic Engagement', // Title from previous version
      shortDescription: 'Promoting transparency, accountability, and participation.', // Description from previous version
      imageComponent: (
         <div className="w-full relative overflow-hidden" style={{ aspectRatio: '820 / 360' }}>
           <img src="https://i.imgur.com/NSWtjdU.jpeg" alt="Good Governance & Civic Engagement" className="absolute inset-0 w-full h-full object-cover"/>
         </div>
      ),
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

      {/* Priorities Grid Section - Now using clickable cards with image/placeholder on top */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Using the 2-column layout from the image placeholder version */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                // Use a button for click functionality, styled like the card
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-shadow duration-300 text-left"
                >
                  {/* Image/Placeholder Component */}
                  {theme.imageComponent}

                  {/* Content Area */}
                  <div className="p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 flex items-center">
                      {/* Using theme-specific icon color might be complex here, sticking to green */}
                      <Icon className="w-5 h-5 mr-2 text-green-700 flex-shrink-0" />
                      {theme.title}
                    </h2>
                    {/* Reinstated the short description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {theme.shortDescription}
                    </p>
                    {/* Optional: Add a subtle 'Learn More' indicator */}
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-green-700 group-hover:underline">
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

      {/* Optional Call to Action Section */}
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
    </div>
  );
}