import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark } from 'lucide-react';

// Define the structure for each priority area
interface PriorityArea {
  icon: React.ElementType;
  title: string;
  description: string;
  imagePlaceholderColor: string; // Tailwind color class for placeholder
}

export function Policies() {
  // Array containing the eight focus areas
  const priorities: PriorityArea[] = [
    {
      icon: BookOpen,
      title: 'Education & Youth Empowerment',
      description: 'Supporting quality education, digital literacy, and youth skills training.',
      imagePlaceholderColor: 'bg-red-200', // Light red accent
    },
    {
      icon: Heart,
      title: 'Health & Sanitation',
      description: 'Expanding access to healthcare and clean water for all.',
      imagePlaceholderColor: 'bg-yellow-200', // Light yellow accent
    },
    {
      icon: Users,
      title: 'Employment & Entrepreneurship',
      description: 'Creating jobs and empowering local businesses.',
      imagePlaceholderColor: 'bg-green-200', // Light green accent
    },
    {
      icon: Building,
      title: 'Infrastructure Development',
      description: 'Improving roads, electrification, and connectivity.',
      imagePlaceholderColor: 'bg-red-200',
    },
    {
      icon: Wheat,
      title: 'Agriculture & Rural Growth',
      description: 'Supporting farmers with tools, training, and market access.',
      imagePlaceholderColor: 'bg-yellow-200',
    },
    {
      icon: Handshake,
      title: 'Social Welfare & Gender Equity',
      description: 'Empowering women, youth, and vulnerable groups.',
      imagePlaceholderColor: 'bg-green-200',
    },
    {
      icon: Leaf,
      title: 'Environment & Climate Action',
      description: 'Protecting our land, water, and natural heritage.',
      imagePlaceholderColor: 'bg-red-200',
    },
    {
      icon: Landmark,
      title: 'Good Governance & Civic Engagement',
      description: 'Promoting transparency, accountability, and participation.',
      imagePlaceholderColor: 'bg-yellow-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Header */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Key Development Priorities</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Focusing on the core areas essential for the progress and prosperity of our constituency.
          </p>
        </div>
      </section>

      {/* Priorities Grid Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
            {priorities.map((priority, index) => {
              const Icon = priority.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Placeholder */}
                  <div
                    className={`w-full h-48 sm:h-64 ${priority.imagePlaceholderColor} flex items-center justify-center`}
                    // Style mimics aspect ratio close to 820x360
                    style={{ aspectRatio: '820 / 360' }}
                  >
                    <Icon className="w-16 h-16 text-gray-400 opacity-50" />
                    {/* Placeholder text, consider removing in final version */}
                    {/* <span className="text-gray-500 mt-2">Image (820x360)</span> */}
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-green-700 flex-shrink-0" />
                      {priority.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {priority.description}
                    </p>
                  </div>
                </div>
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