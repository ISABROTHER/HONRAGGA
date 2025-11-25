// src/pages/home/PrioritiesSection.tsx
import React from "react";
import { TrendingUp, Heart, Users, ChevronRight } from "lucide-react";

interface PrioritiesSectionProps {
  onNavigate: (page: string) => void;
}

export function PrioritiesSection({ onNavigate }: PrioritiesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
            My Vision
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Priorities for Cape Coast North
          </h3>
          <p className="text-lg text-slate-600">
            We are building a community where opportunity is shared, education
            is accessible, and healthcare is a right, not a privilege.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              Economic Empowerment
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Revitalizing local markets, supporting small businesses, and
              driving the CETRA2030 agenda for youth employment.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="text-blue-700 font-semibold inline-flex items-center group-hover:underline"
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-green-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              Healthcare Access
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Improving clinic facilities in Kwaprow and Dankwakrom and ensuring
              maternal health support for all families.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="text-green-700 font-semibold inline-flex items-center group-hover:underline"
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-amber-100 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-3">
              Community & Education
            </h4>
            <p className="text-slate-600 mb-6 leading-relaxed">
              From "Operation Light Up" to scholarships and school renovations,
              we are investing in our future leaders.
            </p>
            <button
              onClick={() => onNavigate("policies")}
              className="text-amber-600 font-semibold inline-flex items-center group-hover:underline"
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
