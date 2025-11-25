// src/pages/home/PrioritiesSection.tsx
import React from "react";
import {
  BookOpen,
  HeartPulse,
  Briefcase,
  Construction,
  Sprout,
  Users,
  Megaphone,
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
  },
  {
    id: "social",
    title: "Social Welfare",
    subtitle: "Social Welfare",
    desc: "Empowering women, youth, and vulnerable groups.",
    initiativesCount: "3 initiatives listed",
    icon: Users,
    accentBg: "bg-rose-100",
    accentText: "text-rose-700",
    accentBorder: "border-rose-200",
    image:
      "https://images.pexels.com/photos/936018/pexels-photo-936018.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "civic",
    title: "Civic Engagement",
    subtitle: "Civic Engagement",
    desc: "Promoting transparency, accountability, and participation.",
    initiativesCount: "1 initiative listed",
    icon: Megaphone,
    accentBg: "bg-indigo-100",
    accentText: "text-indigo-700",
    accentBorder: "border-indigo-200",
    image:
      "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export function PrioritiesSection({ onNavigate }: PrioritiesSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">
            My Vision
          </h2>

          {/* Gradient + animated underline heading */}
          <div className="flex flex-col items-center justify-center group">
            <h3
              className="
                text-2xl sm:text-3xl md:text-4xl 
                font-extrabold tracking-tight text-center
                bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
                bg-clip-text text-transparent
              "
            >
              Priorities for Cape Coast North
            </h3>
            <span
              className="
                mt-2 h-[3px] w-12 rounded-full
                bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-24
              "
            />
          </div>

          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            We are building a community where opportunity is shared, education is
            accessible, and healthcare is a right, not a privilege.
          </p>
        </div>

        {/* =========================
            MOBILE LAYOUT (NEWS-STYLE WITH PICTURES)
           ========================= */}
        <div className="md:hidden space-y-4">
          {priorities.map((priority, index) => {
            const Icon = priority.icon;

            // First item = featured (big image style)
            if (index === 0) {
              return (
                <div
                  key={priority.id}
                  className="
                    rounded-2xl overflow-hidden border border-slate-200 bg-white
                    shadow-md
                  "
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={priority.image}
                      alt={priority.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1">
                        <Icon className="w-3.5 h-3.5 text-slate-800" />
                        <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-slate-800">
                          Key Priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-extrabold mb-1 leading-snug text-slate-900">
                      {priority.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-emerald-700 mb-1">
                      {priority.initiativesCount}
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed mb-3">
                      {priority.desc}
                    </p>
                    <button
                      onClick={() => onNavigate("policies")}
                      className="inline-flex items-center text-xs font-semibold text-emerald-700"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              );
            }

            // Remaining items = list style with thumbnail image + text
            return (
              <button
                key={priority.id}
                type="button"
                onClick={() => onNavigate("policies")}
                className={`
                  w-full flex items-stretch gap-3 rounded-xl border ${priority.accentBorder}
                  bg-white overflow-hidden shadow-sm
                  motion-safe:transition-all motion-safe:duration-200
                  active:scale-[0.98]
                `}
              >
                {/* Thumbnail picture on the left */}
                <div className="relative w-24 min-w-[6rem] h-24 overflow-hidden">
                  <img
                    src={priority.image}
                    alt={priority.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text on the right */}
                <div className="flex-1 py-3 pr-3 text-left">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {priority.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                    {priority.initiativesCount}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug mt-0.5 line-clamp-3">
                    {priority.desc}
                  </p>
                  <span className="mt-1 inline-flex items-center text-[11px] font-semibold text-emerald-700">
                    View Details
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================
            DESKTOP / TABLET LAYOUT (CARDS)
           ========================= */}
        <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {priorities.map((priority) => {
            const Icon = priority.icon;

            return (
              <div
                key={priority.id}
                className={`
                  group bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100
                  hover:shadow-2xl hover:shadow-slate-900/5
                  motion-safe:transition-all motion-safe:duration-300
                  hover:-translate-y-1.5 hover:scale-[1.01]
                  flex flex-col
                `}
              >
                <div className="mb-4 rounded-xl overflow-hidden h-28 w-full relative">
                  <img
                    src={priority.image}
                    alt={priority.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1">
                    <Icon className={`w-4 h-4 ${priority.accentText}`} />
                    <span className="text-[11px] font-semibold text-slate-800">
                      {priority.subtitle}
                    </span>
                  </div>
                </div>

                <h4 className="text-base md:text-lg font-bold text-slate-900 mb-1">
                  {priority.title}
                </h4>
                <p className="text-xs font-semibold text-emerald-700 mb-1">
                  {priority.initiativesCount}
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed text-sm flex-1">
                  {priority.desc}
                </p>
                <button
                  onClick={() => onNavigate("policies")}
                  className={`
                    font-semibold inline-flex items-center text-sm
                    text-emerald-700 group-hover:underline
                  `}
                >
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
