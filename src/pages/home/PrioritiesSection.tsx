// src/pages/home/PrioritiesSection.tsx
import React from "react";
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  ChevronRight
} from "lucide-react";

interface PrioritiesSectionProps {
  onNavigate: (page: string) => void;
}

type Priority = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  initiativesCount: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  image: string;
};

const priorities: Priority[] = [
  {
    id: "education",
    title: "Educational Support",
    subtitle: "Educational Support",
    desc: "Supporting quality education, digital literacy, and youth skills training.",
    initiativesCount: "3 initiatives listed",
    icon: BookOpen,
    accentBg: "bg-blue-100",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    image:
      "https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "health",
    title: "Health & Sanitation",
    subtitle: "Health & Sanitation",
    desc: "Expanding access to healthcare and clean water for all.",
    initiativesCount: "2 initiatives listed",
    icon: HeartPulse,
    accentBg: "bg-green-100",
    accentText: "text-green-700",
    accentBorder: "border-green-200",
    image:
      "https://images.pexels.com/photos/6129680/pexels-photo-6129680.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "employment",
    title: "Employment & Entrepreneurship",
    subtitle: "Employment & Entrepreneurship",
    desc: "Creating jobs and empowering local businesses.",
    initiativesCount: "2 initiatives listed",
    icon: Briefcase,
    accentBg: "bg-amber-100",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200",
    image:
      "https://images.pexels.com/photos/3943722/pexels-photo-3943722.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    subtitle: "Infrastructure Development",
    desc: "Improving roads, electrification, and connectivity.",
    initiativesCount: "3 initiatives listed",
    icon: Construction,
    accentBg: "bg-slate-100",
    accentText: "text-slate-800",
    accentBorder: "border-slate-300",
    image:
      "https://images.pexels.com/photos/6000061/pexels-photo-6000061.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "agriculture",
    title: "Agricultural Support",
    subtitle: "Agricultural Support",
    desc: "Supporting farmers with tools, training, and market access.",
    initiativesCount: "1 initiative listed",
    icon: Sprout,
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    image:
      "https://images.pexels.com/photos/3189873/pexels-photo-3189873.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export function PrioritiesSection({ onNavigate }: PrioritiesSectionProps) {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading block */}
        <div className="text-center mb-10 md:mb-16">
          
          {/* Eyebrow Pill */}
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 border border-green-100">
            <span className="h-2 w-2 rounded-full bg-green-500 motion-safe:animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-green-700">
              My Vision
            </span>
          </p>

          {/* Main Heading */}
          <div className="mt-4 flex flex-col items-center justify-center group">
            <h3
              className="
                text-xl sm:text-2xl md:text-5xl 
                font-extrabold tracking-tight text-center
                bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
                bg-clip-text text-transparent
                motion-safe:transition-transform motion-safe:duration-500
              "
            >
              Priorities for Cape Coast North
            </h3>
            <span
              className="
                mt-3 h-1 w-16 rounded-full
                bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-32
              "
            />
          </div>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are building a community where opportunity is shared, education is
            accessible, and healthcare is a right, not a privilege.
          </p>
        </div>

        {/* =========================
            MOBILE LAYOUT
           ========================= */}
        <div className="md:hidden space-y-4">
          {priorities.map((priority, index) => {
            const Icon = priority.icon;

            if (index === 0) {
              return (
                <div
                  key={priority.id}
                  className="
                    rounded-2xl overflow-hidden border border-slate-200 bg-white
                    shadow-md
                  "
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={priority.image}
                      alt={priority.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1">
                        <Icon className="w-3.5 h-3.5 text-slate-800" />
                        <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-slate-800">
                          Key Priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-xl font-extrabold mb-2 leading-snug text-slate-900">
                      {priority.title}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-700 mb-1">
                      {priority.initiativesCount}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {priority.desc}
                    </p>
                    <button
                      onClick={() => onNavigate("policies")}
                      className="inline-flex items-center text-sm font-semibold text-emerald-700"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={priority.id}
                type="button"
                onClick={() => onNavigate("policies")}
                className={`
                  w-full flex items-stretch gap-4 rounded-2xl border ${priority.accentBorder}
                  bg-white overflow-hidden shadow-sm
                  motion-safe:transition-all motion-safe:duration-200
                  active:scale-[0.98]
                `}
              >
                <div className="relative w-28 min-w-[7rem] h-28 overflow-hidden">
                  <img
                    src={priority.image}
                    alt={priority.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 py-4 pr-4 text-left">
                  <h4 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {priority.title}
                  </h4>
                  <p className="text-[10px] font-semibold text-emerald-700 mt-1">
                    {priority.initiativesCount}
                  </p>
                  <p className="text-xs text-slate-600 leading-snug mt-1 line-clamp-2">
                    {priority.desc}
                  </p>
                  <span className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-700">
                    View Details
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================
            DESKTOP / TABLET LAYOUT
           ========================= */}
        <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
          {priorities.map((priority) => {
            const Icon = priority.icon;

            return (
              <div
                key={priority.id}
                className={`
                  group bg-slate-50 rounded-3xl p-6 xl:p-8 border border-slate-100
                  hover:shadow-2xl hover:shadow-slate-900/5
                  motion-safe:transition-all motion-safe:duration-300
                  hover:-translate-y-2 hover:scale-[1.01]
                  flex flex-col
                `}
              >
                <div className="mb-6 rounded-2xl overflow-hidden h-40 xl:h-48 w-full relative shadow-inner">
                  <img
                    src={priority.image}
                    alt={priority.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
                    <Icon className={`w-4 h-4 ${priority.accentText}`} />
                    <span className="text-xs font-bold text-slate-800">
                      {priority.subtitle}
                    </span>
                  </div>
                </div>

                <h4 className="text-xl xl:text-2xl font-extrabold text-slate-900 mb-2">
                  {priority.title}
                </h4>
                <p className="text-sm font-bold text-emerald-700 mb-3 uppercase tracking-wide">
                  {priority.initiativesCount}
                </p>
                <p className="text-slate-600 mb-6 leading-relaxed text-base flex-1">
                  {priority.desc}
                </p>
                <button
                  onClick={() => onNavigate("policies")}
                  className={`
                    font-bold inline-flex items-center text-base
                    text-emerald-700 group-hover:underline decoration-2 underline-offset-4
                  `}
                >
                  View Details <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}