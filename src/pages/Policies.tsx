import { BookOpen, Heart, Users, Building, Wheat, Handshake, Leaf, Landmark } from "lucide-react";

interface PolicyTheme {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  imageComponent: React.ReactNode;
  colorTheme: {
    bg: string;
    iconBg: string;
    text: string;
  };
}

interface PoliciesProps {
  onSelectTheme: (themeId: string) => void;
}

export function Policies({ onSelectTheme }: PoliciesProps) {
  const themes: PolicyTheme[] = [
    {
      id: "education",
      icon: BookOpen,
      title: "Education & Youth Empowerment",
      shortDescription: "Supporting quality education, digital literacy, and youth skills training.",
      imageComponent: <img src="https://i.imgur.com/Ozjnrli.jpeg" alt="Education" className="w-full h-40 object-cover" />,
      colorTheme: { bg: "bg-red-50", iconBg: "bg-red-600", text: "text-red-900" },
    },
    {
      id: "health",
      icon: Heart,
      title: "Health & Sanitation",
      shortDescription: "Expanding access to healthcare and clean water for all.",
      imageComponent: <img src="https://i.imgur.com/BqfSeFA.jpeg" alt="Health" className="w-full h-40 object-cover" />,
      colorTheme: { bg: "bg-yellow-50", iconBg: "bg-yellow-500", text: "text-yellow-900" },
    },
    {
      id: "infrastructure",
      icon: Building,
      title: "Infrastructure Development",
      shortDescription: "Improving roads, electrification, and connectivity.",
      imageComponent: <img src="https://i.imgur.com/AZqDymE.jpeg" alt="Infrastructure" className="w-full h-40 object-cover" />,
      colorTheme: { bg: "bg-blue-50", iconBg: "bg-blue-600", text: "text-blue-900" },
    },
    {
      id: "environment",
      icon: Leaf,
      title: "Environment & Climate Action",
      shortDescription: "Protecting our land, water, and natural heritage.",
      imageComponent: <img src="https://i.imgur.com/TZ4jIJA.jpeg" alt="Environment" className="w-full h-40 object-cover" />,
      colorTheme: { bg: "bg-teal-50", iconBg: "bg-teal-500", text: "text-teal-900" },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Key Development Policies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
              >
                {theme.imageComponent}

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-md ${theme.colorTheme.iconBg} text-white mr-3`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className={`text-xl font-semibold ${theme.colorTheme.text}`}>
                      {theme.title}
                    </h2>
                  </div>

                  <p className="text-gray-700">{theme.shortDescription}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
