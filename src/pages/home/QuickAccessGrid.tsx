// src/pages/home/QuickAccessGrid.tsx
import React from "react";
import {
  MessageSquareWarning,
  HardHat,
  Users, // Updated import
  Award,
  HandHeart,
  UserCircle,
  Vote // Added for Polls/Achievements
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
    title: "Ongoing Projects",
    mobileDesc: "Infrastructure",
    desc: "Track ongoing infrastructure developments and renovations.",
    icon: HardHat,
    bgClass: "from-amber-50 to-orange-50/50 border-orange-100",
    iconColor: "text-amber-600",
    route: "ongoing-projects"
  },
  {
    title: "Report Issue",
    mobileDesc: "Fix problems",
    desc: "Spot a problem? Report potholes or streetlights directly.",
    icon: MessageSquareWarning,
    bgClass: "from-emerald-50 to-teal-50/50 border-emerald-100",
    iconColor: "text-emerald-600",
    route: "issues"
  },
  {
    title: "Assemblymen", // Changed from Policies
    mobileDesc: "Local Reps",
    desc: "Meet the local representatives working with Hon. Ragga.",
    icon: Users, // Changed icon
    bgClass: "from-blue-50 to-indigo-50/50 border-blue-100",
    iconColor: "text-blue-600",
    route: "assemblymen" // Changed route
  },
  {
    title: "Polls & Tracker", // Changed from Achievements
    mobileDesc: "Your Voice",
    desc: "Vote on key issues and track campaign promises kept.",
    icon: Vote, // Changed icon
    bgClass: "from-purple-50 to-fuchsia-50/50 border-purple-100",
    iconColor: "text-purple-600",
    route: "polls" // Changed route to polls
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
    title: "Appointment & Applications",
    mobileDesc: "Book/Apply",
    desc: "Schedule meetings or submit job and grant applications.",
    icon: UserCircle,
    bgClass: "from-slate-50 to-gray-50/50 border-slate-200",
    iconColor: "text-slate-600",
    route: "appointments"
  }
];

interface QuickAccessGridProps {
  onNavigate: (page: string) => void;
}

export function QuickAccessGrid({ onNavigate }: QuickAccessGridProps) {
  return (
    <section
      className="relative z-20 -mt-12 md:-mt-20 pt-4 pb-10 md:pb-16 bg-white"
      aria-labelledby="constituency-hub-heading"
    >
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">

        {/* ================================
            PREMIUM CENTERED HEADING BLOCK
        ================================= */}
        <div className="text-center mb-8 md:mb-14">

          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 border border-green-100">
            <span className="h-2 w-2 rounded-full bg-green-500 motion-safe:animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-green-700">
              Constituency Services
            </span>
          </p>

          {/* Main heading with gradient hue + animation */}
          <div className="mt-4 flex flex-col items-center justify-center group">
            <h2
              id="constituency-hub-heading"
              className="
                text-3xl sm:text-4xl md:text-5xl 
                font-extrabold tracking-tight text-center
                bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
                bg-clip-text text-transparent
                motion-safe:transition-transform motion-safe:duration-500
              "
            >
              Information, Services &amp; Support
            </h2>
            <span
              className="
                mt-3 h-1 w-16 rounded-full
                bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-32
              "
            />
          </div>

          {/* Two-line Parliamentary Message */}
          <p className="text-base md:text-lg text-slate-600 mt-5 max-w-3xl mx-auto leading-relaxed">
            All the key information you need about the constituency is organised here for easy access.
          </p>
        </div>

        {/* ================================
            QUICK ACCESS GRID
        ================================= */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-10">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(link.route)}
              className={`
                group relative overflow-hidden rounded-xl md:rounded-3xl border ${link.bgClass} bg-gradient-to-br
                p-3 md:p-10 flex flex-col items-center text-center cursor-pointer
                motion-safe:transition-all motion-safe:duration-300
                hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01]
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
              `}
            >
              <div
                className="
                  w-12 h-12 md:w-20 md:h-20 bg-white rounded-xl md:rounded-3xl
                  flex items-center justify-center shadow-sm mb-2 md:mb-6
                  motion-safe:transition-transform motion-safe:duration-300
                  group-hover:scale-110
                "
              >
                <link.icon className={`w-6 h-6 md:w-10 md:h-10 ${link.iconColor}`} />
              </div>

              <h3
                className="
                  text-xs sm:text-sm md:text-2xl font-bold text-slate-900
                  mb-1 md:mb-3 leading-tight tracking-tight truncate w-full
                "
              >
                {link.title}
              </h3>

              <p className="block md:hidden text-slate-500 text-[10px] leading-none font-medium tracking-tight">
                {link.mobileDesc}
              </p>

              <p className="hidden md:block text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
                {link.desc}
              </p>

              <span
                className="
                  pointer-events-none
                  absolute inset-x-10 bottom-3 h-[3px] rounded-full
                  bg-gradient-to-r from-transparent via-green-500/50 to-transparent
                  opacity-0 group-hover:opacity-100
                  motion-safe:transition-opacity motion-safe:duration-300
                "
              />
            </button>
          ))}
        </div>
 
      </div>
    </section>
  );
}