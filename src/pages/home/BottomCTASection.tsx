// src/pages/home/BottomCTASection.tsx
import { Button } from "../../components/Button";
import { HandHeart, BookOpen, TrendingUp } from "lucide-react";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 border border-green-100 mb-4">
            <HandHeart className="w-3.5 h-3.5 text-green-700" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-green-700">
              Support The Agenda
            </span>
          </div>

          {/* Main heading */}
          <div className="flex flex-col items-center justify-center group">
            <h2 className="
              text-xl sm:text-2xl md:text-5xl 
              font-extrabold leading-tight tracking-tight mb-2
              bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
              bg-clip-text text-transparent
              motion-safe:transition-transform motion-safe:duration-500
            ">
              Powering Our Future Together
            </h2>
            <span className="
              mt-3 h-1 w-20 rounded-full
              bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
              motion-safe:transition-all motion-safe:duration-500
              group-hover:w-32
            " />
          </div>
          
          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-base md:text-lg font-normal leading-relaxed">
            Real change requires collective action. Contributing to specific projects helps build Cape Coast North directly.
          </p>
        </div>

        {/* FEATURED PROJECT CARD (Wide Layout) */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white text-slate-900 rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-72 md:h-auto overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Books" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r"></div>
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Project
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-700">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">Operation 500,000</h3>
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Our goal is to distribute <strong>500,000 exercise books</strong> to students across the constituency to support basic education and reduce the burden on families.
              </p>

              {/* Progress Bar */}
              <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-2xl md:text-3xl font-bold text-slate-900">325,000 <span className="text-sm md:text-base font-medium text-slate-500">books raised</span></span>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-lg">65%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full w-[65%] shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
                  </div>
                </div>
                <div className="mt-3 text-xs md:text-sm text-slate-500 text-right font-medium">Target: 500,000 books</div>
              </div>

              <Button 
                onClick={() => onNavigate('volunteer')}
                size="lg"
                className="w-full justify-center bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white py-5 text-lg md:text-xl font-bold shadow-xl shadow-slate-900/10 rounded-2xl"
              >
                Support This Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}