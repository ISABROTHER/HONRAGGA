// src/pages/home/PrioritiesSection.tsx
import React from "react";
import { TrendingUp, Heart, Users, ChevronRight } from "lucide-react";

interface PrioritiesSectionProps {
  onNavigate: (page: string) => void;
}

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
            We are building a community where opportunity is shared, education is accessible,
            and healthcare is a right, not a privilege.
          </p>
        </div>

        {/* Cards – 1 column on phone, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {/* Economic Empowerment */}
          <div
            className="
              group bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100
              hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5
              motion-safe:transition-all motion-safe:duration-300
              hover:-translate-y-1.5 hover:scale-[1.01]
            "
          >
            <div
              className="
                w-14 h-14 bg-blue-100 text-blue-700 rounded-xl
                flex items-center justify-center mb-5
                motion-safe:transition-transform motion-safe:duration-300
                group-hover:scale-110
              "
            >
              <TrendingUp className="w-7 h-7" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
              Economic Empowerment
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              Revitalizing local markets, supporting small businesses, and driving the
              CETRA2030 agenda for youth employment.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="
                text-blue-700 font-semibold inline-flex items-center text-sm md:text-base
                group-hover:underline
              "
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Healthcare Access */}
          <div
            className="
              group bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100
              hover:border-green-100 hover:shadow-2xl hover:shadow-green-900/5
              motion-safe:transition-all motion-safe:duration-300
              hover:-translate-y-1.5 hover:scale-[1.01]
            "
          >
            <div
              className="
                w-14 h-14 bg-green-100 text-green-700 rounded-xl
                flex items-center justify-center mb-5
                motion-safe:transition-transform motion-safe:duration-300
                group-hover:scale-110
              "
            >
              <Heart className="w-7 h-7" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
              Healthcare Access
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              Improving clinic facilities in Kwaprow and Dankwakrom and ensuring maternal
              health support for all families.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="
                text-green-700 font-semibold inline-flex items-center text-sm md:text-base
                group-hover:underline
              "
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Community & Education */}
          <div
            className="
              group bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100
              hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5
              motion-safe:transition-all motion-safe:duration-300
              hover:-translate-y-1.5 hover:scale-[1.01]
            "
          >
            <div
              className="
                w-14 h-14 bg-amber-100 text-amber-600 rounded-xl
                flex items-center justify-center mb-5
                motion-safe:transition-transform motion-safe:duration-300
                group-hover:scale-110
              "
            >
              <Users className="w-7 h-7" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
              Community &amp; Education
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              From &quot;Operation Light Up&quot; to scholarships and school renovations, we
              are investing in our future leaders.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="
                text-amber-600 font-semibold inline-flex items-center text-sm md:text-base
                group-hover:underline
              "
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
