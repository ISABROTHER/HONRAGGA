// src/pages/home/StatsStrip.tsx
import React from "react";

export function StatsStrip() {
  return (
    <section className="bg-blue-950 text-white py-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-2 md:gap-8 text-center md:divide-x md:divide-blue-800/50">
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              50K+
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Supporters
            </div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              2,500+
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Streetlights
            </div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              100+
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Scholarships
            </div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              200+
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Events Held
            </div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              15K+
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Volunteers
            </div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-0.5">
              1 Goal
            </div>
            <div className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider font-medium">
              Development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
