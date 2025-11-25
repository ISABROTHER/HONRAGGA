// src/pages/home/QuickAccessGrid.tsx
import React from "react";
import {
  MessageSquareWarning,
  HardHat,
  ScrollText,
  Award,
  HandHeart,
  UserCircle
} from "lucide-react";

type QuickLink = {
  title: string;
  mobileDesc: string;
  desc: string;
  icon: React.ElementType;
  bgClass: string;
  iconColor: string;
  route: string;
};

const quickLinks: QuickLink[] = [
  {
    title: "Projects",
    mobileDesc: "Infrastructure",
    desc: "Track ongoing infrastructure developments and renovations.",
    icon: HardHat,
    bgClass: "from-amber-50 to-orange-50/50 border-orange-100",
    iconColor: "text-amber-600",
    route: "policies"
  },
  {
    title: "Report Issue",
    mobileDesc: "Fix problems",
    desc: "Spot a problem? Report potholes or streetlights directly.",
    icon: MessageSquareWarning,
    bgClass: "from-emerald-50 to-teal-50/50 border-emerald-100",
    iconColor: "text-emerald-600",
    route: "news"
  },
  {
    title: "Policies",
    mobileDesc: "The Agenda",
    desc: "Explore the CETRA2030 agenda for economic growth.",
    icon: ScrollText,
    bgClass: "from-blue-50 to-indigo-50/50 border-blue-100",
    iconColor: "text-blue-600",
    route: "policies"
  },
  {
    title: "Achievements",
    mobileDesc: "Track record",
    desc: "A record of promises kept: scholarships and bills passed.",
    icon: Award,
    bgClass: "from-purple-50 to-fuchsia-50/50 border-purple-100",
    iconColor: "text-purple-600",
    route: "about"
  },
  {
    title: "Support",
    mobileDesc: "Join us",
    desc: "Volunteer your time or donate to the campaign.",
    icon: HandHeart,
    bgClass: "from-rose-50 to-pink-50/50 border-rose-100",
    iconColor: "text-rose-600",
    route: "volunteer"
  },
  {
    title: "About",
    mobileDesc: "The MP",
    desc: "Get to know Hon. Dr. Kwamena Minta Nyarku.",
    icon: UserCircle,
    bgClass: "from-slate-50 to-gray-50/50 border-slate-200",
    iconColor: "text-slate-600",
    route: "about"
  }
];

interface QuickAccessGridProps {
  onNavigate: (page: string) => void;
}

export function QuickAccessGrid({ onNavigate }: QuickAccessGridProps) {
  return (
    <section className="relative z-20 -mt-[4px] md:mt-0 pt-4 pb-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ================================
            PREMIUM CENTERED HEADING
        ================================= */}
        <div className="text-center mb-6 md:mb-12 animate-fadeIn opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
          
          {/* Eyebrow label */}
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-green-700 mb-2">
            The Constituency Hub
          </p>

          {/* Main heading */}
          <h2 className="
            text-xl sm:text-2xl md:text-3xl 
            font-extrabold tracking-tight text-slate-900 
            underline decoration-2 decoration-green-600 underline-offset-8
          ">
            Information, Services & Support
          </h2>

          {/* Subtext */}
          <p className="hidden md:block text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed">
            Everything you need to stay informed and engaged — from projects and policies 
            to reporting issues, reviewing achievements, supporting initiatives and learning 
            more about your MP.
          </p>
        </div>

        {/* ================================
            QUICK ACCESS GRID
        ================================= */}

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {quickLinks.map((link, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(link.route)}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl border ${link.bgClass} 
                bg-gradient-to-br p-2.5 md:p-8 flex flex-col items-center text-center cursor-pointer 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95`}
            >
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white rounded-lg md:rounded-2xl 
                flex items-center justify-center shadow-sm mb-1.5 md:mb-5 
                group-hover:scale-110 transition-transform duration-300">
                <link.icon className={`w-5 h-5 md:w-8 md:h-8 ${link.iconColor}`} />
              </div>

              <h3 className="text-[10px] sm:text-xs md:text-xl font-bold text-slate-900 mb-0.5 md:mb-2 
                leading-tight tracking-tight truncate w-full">
                {link.title}
              </h3>

              <p className="block md:hidden text-slate-500 text-[9px] leading-none font-medium tracking-tight">
                {link.mobileDesc}
              </p>

              <p className="hidden md:block text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                {link.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
