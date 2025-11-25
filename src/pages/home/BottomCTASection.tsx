// src/pages/home/BottomCTASection.tsx
import React from "react";
import { Button } from "../../components/Button";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900 text-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light">
          "Together, we can build a Cape Coast North that works for everyone."
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            onClick={() => onNavigate("volunteer")}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-10 py-4 text-lg font-bold shadow-2xl shadow-amber-900/20"
          >
            Volunteer Today
          </Button>
          <Button
            onClick={() => onNavigate("events")}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-10 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-900"
          >
            Upcoming Events
          </Button>
        </div>
      </div>
    </section>
  );
}
