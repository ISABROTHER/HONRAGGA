// src/pages/home/BottomCTASection.tsx
import { Button } from "../../components/Button";
import { HandHeart, BookOpen, TrendingUp } from "lucide-react";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
          
          {/* Eyebrow Pill - Improved Contrast */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 border border-blue-200 mb-4">
            <HandHeart className="w-3.5 h-3.5 text-blue-800" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-blue-900">
              Support The Agenda
            </span>
          </div>

          {/* Main heading - Solid High Contrast Color */}
          <div className="flex flex-col items-center justify-center group">
            <h2 className="
              text-3xl sm:text-4xl md:text-5xl 
              font-extrabold leading-tight tracking-tight mb-2
              text-blue-950
            ">
              Powering Our Future Together
            </h2>
            <span className="
              mt-4 h-1.5 w-20 rounded-full
              bg-amber-500
              group-hover:w-32 transition-all duration-500
            " />
          </div>
          
          <p className="mt-6 text-slate-800 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Real change requires collective action. Contributing to specific projects helps build Cape Coast North directly.
          </p>
        </div>

        {/* ACTION CARD */}
        <div className="max-w-4xl mx-auto">

          {/* FEATURED PROJECT CARD */}
          <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-300">
            
            {/* Image Side */}
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Books" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              
              <div className="absolute bottom-6 left-6">
                <div className="inline-flex items-center gap-1.5 bg-amber-500 text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Project
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-blue-950">Operation 500,000</h3>
              </div>
              
              <p className="text-slate-700 mb-8 leading-relaxed font-medium">
                Our goal is to distribute <strong>500,000 exercise books</strong> to students across the constituency to support basic education and reduce the burden on families.
              </p>

              {/* Progress Bar Section */}
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-bold text-blue-900">325,000 <span className="text-sm font-bold text-slate-600">books raised</span></span>
                  <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">65%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-green-600 h-4 rounded-full w-[65%] shadow-sm"></div>
                </div>
                <div className="mt-2 text-xs font-bold text-slate-500 text-right">Target: 500,000 books</div>
              </div>

              <Button 
                onClick={() => onNavigate('volunteer')}
                size="lg"
                className="w-full justify-center bg-blue-900 hover:bg-blue-800 text-white py-4 text-lg font-bold shadow-lg"
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