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
    <section
      className="relative z-20 -mt-[4px] md:mt-0 pt-4 pb-10 md:py-16 bg-white"
      aria-labelledby="constituency-hub-heading"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ================================
            PREMIUM CENTERED HEADING BLOCK
        ================================= */}
        <div className="text-center mb-6 md:mb-12">

          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 border border-green-100">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 motion-safe:animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-green-700">
              The Constituency Hub
            </span>
          </p>

          {/* Main heading */}
          <h2
            id="constituency-hub-heading"
            className="
              mt-3
              text-xl sm:text-2xl md:text-3xl 
              font-extrabold tracking-tight text-slate-900
            "
          >
            <span className="inline-block pb-1 border-b-2 border-green-600">
              Information, Services &amp; Support
            </span>
          </h2>

          {/* ================================
              FINAL TWO-LINE PARLIAMENTARY MESSAGE
          ================================= */}
          <p className="text-sm text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            This is your direct window into the work I am undertaking on behalf of our constituency.
          </p>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl mx-auto leading-relaxed">
            I remain committed to serving you, being accountable, and keeping you informed at all times, because <span className="font-semibold text-slate-900">obiara ka ho</span>.
          </p>
        </div>

        {/* ================================
            QUICK ACCESS GRID (MODERN STYLE)
        ================================= */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {quickLinks.map((link, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate(link.route)}
              className={`
                group relative overflow-hidden rounded-xl md:rounded-2xl border ${link.bgClass} bg-gradient-to-br
                p-2.5 md:p-8 flex flex-col items-center text-center cursor-pointer
                motion-safe:transition-all motion-safe:duration-300
                hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02]
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
              `}
            >
              <div
                className="
                  w-10 h-10 md:w-16 md:h-16 bg-white rounded-lg md:rounded-2xl
                  flex items-center justify-center shadow-sm mb-1.5 md:mb-5
                  motion-safe:transition-transform motion-safe:duration-300
                  group-hover:scale-110
                "
              >
                <link.icon className={`w-5 h-5 md:w-8 md:h-8 ${link.iconColor}`} />
              </div>

              <h3
                className="
                  text-[10px] sm:text-xs md:text-xl font-bold text-slate-900
                  mb-0.5 md:mb-2 leading-tight tracking-tight truncate w-full
                "
              >
                {link.title}
              </h3>

              <p className="block md:hidden text-slate-500 text-[9px] leading-none font-medium tracking-tight">
                {link.mobileDesc}
              </p>

              <p className="hidden md:block text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                {link.desc}
              </p>

              <span
                className="
                  pointer-events-none
                  absolute inset-x-6 bottom-2 h-[2px] rounded-full
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
