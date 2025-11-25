// src/pages/home/BottomCTASection.tsx
import { Button } from "../../components/Button";
import { HandHeart, BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react";

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
        
        {/* HEADER BLOCK (Matching 'Constituency Services' Vibe) */}
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
            Real change requires collective action. Whether you contribute to a specific project or volunteer your time, you are building Cape Coast North.
          </p>
        </div>

        {/* ACTION CARDS GRID */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

          {/* CARD 1: FEATURED PROJECT (Operation 500,000 Exercise Books) */}
          <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/20 flex flex-col md:flex-row group">
            
            {/* Image Side */}
            <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Books" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-1">
                  <TrendingUp className="w-3 h-3" /> Featured
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h3 className="text-xl font-bold text-slate-900">Operation 500,000</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Our goal is to distribute <strong>500,000 exercise books</strong> to students across the constituency to support basic education.
              </p>

              {/* Progress Bar Vibe */}
              <div className="mb-5">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">325,000 Raised</span>
                  <span className="text-green-600">65% Goal</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full w-[65%] shadow-sm"></div>
                </div>
              </div>

              <Button 
                onClick={() => onNavigate('volunteer')}
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white"
              >
                Donate to Project
              </Button>
            </div>
          </div>

          {/* CARD 2: VOLUNTEER / GENERAL SUPPORT */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-center hover:bg-white/10 transition-colors duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 text-green-400">
              <Users className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Join the Campaign Team</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed flex-1">
              Not everything costs money. We need boots on the ground for door-to-door campaigns, event organization, and polling station monitoring.
            </p>

            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={() => onNavigate('volunteer')}
                className="flex-1 justify-center border-white/30 text-white hover:bg-white hover:text-blue-900"
              >
                Volunteer
              </Button>
              <button 
                onClick={() => onNavigate('volunteer')}
                className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors px-2"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}