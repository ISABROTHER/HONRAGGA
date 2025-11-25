// src/pages/home/BottomCTASection.tsx
import { Button } from "../../components/Button";
import { HandHeart } from "lucide-react";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-950 to-blue-900 text-white text-center relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* PREMIUM CENTERED HEADING BLOCK (Adapted for Dark Background) */}
        <div className="flex flex-col items-center mb-8">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/20 backdrop-blur-sm">
            <HandHeart className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-amber-400">
              Get Involved
            </span>
          </div>

          {/* Main heading with gradient hue + animation */}
          <div className="mt-4 flex flex-col items-center justify-center group">
            <h2 className="
              text-3xl sm:text-4xl md:text-6xl 
              font-extrabold leading-tight tracking-tight mb-1
              bg-gradient-to-r from-white via-blue-100 to-white
              bg-clip-text text-transparent
              motion-safe:transition-transform motion-safe:duration-500
            ">
              Ready to Make a Difference?
            </h2>
            <span className="
              mt-4 h-[3px] w-16 rounded-full
              bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500
              motion-safe:transition-all motion-safe:duration-500
              group-hover:w-32
            " />
          </div>
        </div>

        {/* Subtext */}
        <p className="
          text-base sm:text-lg md:text-xl 
          text-blue-100 font-light mb-10 max-w-2xl mx-auto
        ">
          “Together, we can build a Cape Coast North that works for everyone.”
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <Button
            onClick={() => onNavigate("volunteer")}
            variant="secondary"
            size="lg"
            className="
              w-full sm:w-auto px-10 py-4 text-base font-bold 
              shadow-2xl shadow-amber-900/20
            "
          >
            Volunteer Today
          </Button>

          <Button
            onClick={() => onNavigate("events")}
            variant="outline"
            size="lg"
            className="
              w-full sm:w-auto px-10 py-4 text-base 
              border-white text-white hover:bg-white hover:text-blue-900
            "
          >
            Upcoming Events
          </Button>

        </div>
      </div>
    </section>
  );
}