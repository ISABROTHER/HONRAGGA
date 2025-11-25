// src/pages/home/BottomCTASection.tsx
import { Button } from "../../components/Button";
import { HandHeart, BookOpen, TrendingUp } from "lucide-react";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-950 to-blue-900 text-white relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 border border-white/20 backdrop-blur-sm mb-4">
            <HandHeart className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-amber-400">
              Support The Agenda
            </span>
          </div>

          {/* Main heading with gradient hue + animation */}
          <div className="flex flex-col items-center justify-center group">
            <h2 className="
              text-3xl sm:text-4xl md:text-5xl 
              font-extrabold leading-tight tracking-tight mb-2
              bg-gradient-to-r from-white via-blue-100 to-white
              bg-clip-text text-transparent
              motion-safe:transition-transform motion-safe:duration-500
            ">
              Powering Our Future Together
            </h2>
            <span className="
              mt-4 h-[3px] w-20 rounded-full
              bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500
              motion-safe:transition-all motion-safe:duration-500
              group-hover:w-32
            " />
          </div>
          
          <p className="mt-6 text-blue-100 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Real change requires collective action. Contributing to specific projects helps build Cape Coast North directly.
          </p>
        </div>

        {/* ACTION CARD (Centered Single Featured Project) */}
        <div className="max-w-4xl mx-auto">

          {/* FEATURED PROJECT CARD (Operation 500,000 Exercise Books) */}
          <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 flex flex-col md:flex-row group">
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Books" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Project
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Operation 500,000</h3>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our goal is to distribute <strong>500,000 exercise books</strong> to students across the constituency to support basic education and reduce the burden on families.
              </p>

              {/* Progress Bar Vibe */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-slate-700">325,000 Raised</span>
                  <span className="text-green-600">65% Goal</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full w-[65%] shadow-sm"></div>
                </div>
              </div>

              <Button 
                onClick={() => onNavigate('volunteer')}
                size="lg"
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white py-4 text-lg shadow-xl shadow-slate-900/10"
              >
                Donate to Project
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}