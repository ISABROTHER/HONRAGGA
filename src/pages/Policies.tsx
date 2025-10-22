import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark, ChevronRight } from 'lucide-react';

// Define the structure for each *main* policy theme
interface PolicyTheme {
  id: string; // Unique identifier (used for navigation)
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  colorTheme: { // Colors for styling the card
    bg: string; // e.g., 'bg-red-100'
    iconBg: string; // e.g., 'bg-red-600'
    text: string; // e.g., 'text-red-800'
    hoverBorder: string; // e.g., 'hover:border-red-500'
  }
}

// Props interface including the navigation function from App.tsx
interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {

  // Array containing the main policy themes
  const themes: PolicyTheme[] = [
    {
      id: 'education',
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      shortDescription: 'Investing in our students and future leaders.',
      colorTheme: { bg: 'bg-red-50', iconBg: 'bg-red-500', text: 'text-red-800', hoverBorder: 'hover:border-red-400' }
    },
    {
      id: 'infrastructure',
      icon: Building,
      title: 'Infrastructure Development',
      shortDescription: 'Building roads, connectivity, and essential facilities.',
      colorTheme: { bg: 'bg-yellow-50', iconBg: 'bg-yellow-500', text: 'text-yellow-800', hoverBorder: 'hover:border-yellow-400' }
    },
     {
      id: 'health',
      icon: Heart,
      title: 'Health & Sanitation',
      shortDescription: 'Ensuring access to healthcare and clean environments.',
      colorTheme: { bg: 'bg-green-50', iconBg: 'bg-green-500', text: 'text-green-800', hoverBorder: 'hover:border-green-400' }
    },
     {
      id: 'entrepreneurship',
      icon: Users, // Consider Briefcase or similar if more appropriate
      title: 'Entrepreneurship & Economic Development',
      shortDescription: 'Creating jobs and supporting local businesses.',
      colorTheme: { bg: 'bg-blue-50', iconBg: 'bg-blue-500', text: 'text-blue-800', hoverBorder: 'hover:border-blue-400' }
    },
     {
      id: 'community',
      icon: Handshake, // Changed from Users for better distinction
      title: 'Community Engagement & Social Support',
      shortDescription: 'Fostering welfare, cohesion, and empowerment.',
      colorTheme: { bg: 'bg-purple-50', iconBg: 'bg-purple-500', text: 'text-purple-800', hoverBorder: 'hover:border-purple-400' }
    },
     {
      id: 'planning',
      icon: Landmark, // Changed from Wheat for better fit
      title: 'Strategic Planning & Vision',
      shortDescription: 'Guiding the long-term development of Cape Coast North.',
      colorTheme: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-500', text: 'text-indigo-800', hoverBorder: 'hover:border-indigo-400' }
    },
    // Adding back Agriculture and Environment placeholders based on the earlier structure
    {
      id: 'agriculture', // Added ID
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      shortDescription: 'Supporting farmers and boosting rural economies.', // Added short description
      colorTheme: { bg: 'bg-lime-50', iconBg: 'bg-lime-500', text: 'text-lime-800', hoverBorder: 'hover:border-lime-400' } // Added color theme
    },
    {
      id: 'environment', // Added ID
      icon: Leaf,
      title: 'Environment & Climate Action',
      shortDescription: 'Protecting our natural heritage for future generations.', // Added short description
      colorTheme: { bg: 'bg-teal-50', iconBg: 'bg-teal-500', text: 'text-teal-800', hoverBorder: 'hover:border-teal-400' } // Added color theme
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Header - Remains similar */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Click on a priority area to learn more about our initiatives and achievements.
          </p>
        </div>
      </section>

      {/* Main Themes Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Updated grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)} // Call navigation function on click
                  className={`group block p-6 rounded-xl border-2 border-transparent transition-all duration-300 text-left ${theme.colorTheme.bg} ${theme.colorTheme.hoverBorder} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  <div className="flex items-start space-x-4">
                     <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${theme.colorTheme.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                       <Icon className="w-6 h-6 text-white" />
                     </div>
                     <div className="flex-1">
                       <h2 className={`text-lg font-semibold ${theme.colorTheme.text} mb-1`}>
                         {theme.title}
                       </h2>
                       <p className="text-sm text-gray-600 leading-relaxed">
                         {theme.shortDescription}
                       </p>
                     </div>
                     <ChevronRight className={`w-5 h-5 ${theme.colorTheme.text} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform duration-300`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

       {/* Optional Call to Action Section - Remains the same */}
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