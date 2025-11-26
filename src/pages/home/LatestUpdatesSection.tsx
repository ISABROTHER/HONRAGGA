// src/pages/home/LatestUpdatesSection.tsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const UPDATES = [
  {
    id: 1,
    date: "21 November 2025",
    title: "First Lady interacts with St. Mary’s school girls, donates learning materials and interacts with scholarship beneficiaries.",
    image: "https://i.imgur.com/Ozjnrli.jpeg", 
    category: "Education"
  },
  {
    id: 2,
    date: "14 November 2025",
    title: "First Lady takes health services to Sunyani as Bono Region battles high HIV rates.",
    image: "https://i.imgur.com/XmWnKbH.jpeg", 
    category: "Health"
  },
  {
    id: 3,
    date: "13 November 2025",
    title: "‘Nkoko Nkitinkiti’ programme launched to support local poultry farmers.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg", 
    category: "Agriculture"
  },
  {
    id: 4,
    date: "10 November 2025",
    title: "Community Town Hall: Discussing the new road infrastructure plans for Cape Coast North.",
    image: "https://i.imgur.com/AZqDymE.jpeg", 
    category: "Infrastructure"
  },
  {
    id: 5,
    date: "05 November 2025",
    title: "Youth Employment Summit draws record attendance at University of Cape Coast.",
    image: "https://i.imgur.com/saQoFLV.png", 
    category: "Youth"
  }
];

export function LatestUpdatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-[#FFFDF7] border-b border-slate-100 relative z-10">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <h4 className="text-green-700 font-extrabold text-xs md:text-sm uppercase tracking-widest mb-3">
            PRESS RELEASES
          </h4>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
            Latest Updates
          </h2>
          <p className="text-slate-600 text-sm md:text-lg max-w-3xl leading-relaxed">
            Stay informed with news, press releases, and stories that highlight the 
            President's work, public addresses, and key decisions.
          </p>
        </div>

        {/* Content Carousel Container */}
        <div className="relative group/carousel">
          
          {/* Desktop Scroll Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-30 bg-white shadow-xl border border-slate-100 p-3 rounded-full text-slate-700 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Desktop Scroll Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-30 bg-white shadow-xl border border-slate-100 p-3 rounded-full text-slate-700 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-6 scrollbar-hide snap-x snap-mandatory scroll-pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {UPDATES.map((item) => (
              <article 
                key={item.id} 
                // FIXED: Reduced width to 280px on mobile to fit comfortably
                className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start flex flex-col h-auto group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden bg-white border border-slate-100"
              >
                {/* Image Container */}
                <div className="h-48 md:h-60 w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-green-600/90 text-white text-[10px] font-bold uppercase tracking-wide">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="bg-[#16A34A] p-5 md:p-6 flex-1 flex flex-col justify-between transition-colors group-hover:bg-[#15803d]">
                  <div>
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wide mb-2">
                      <Calendar className="w-3 h-3" />
                      <time>{item.date}</time>
                    </div>
                    <h3 className="text-white text-base md:text-xl font-bold leading-snug mb-3 line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Arrow Hint */}
                  <div className="mt-4 flex items-center text-white/90 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    Read Article <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}