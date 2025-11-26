// src/pages/home/LatestUpdatesSection.tsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const UPDATES = [
  {
    id: 1,
    date: "21 November 2025",
    title: "First Lady interacts with St. Mary’s school girls, donates learning materials and interacts with scholarship beneficiaries.",
    image: "https://i.imgur.com/Ozjnrli.jpeg", // Education context
    category: "Education"
  },
  {
    id: 2,
    date: "14 November 2025",
    title: "First Lady takes health services to Sunyani as Bono Region battles high HIV rates.",
    image: "https://i.imgur.com/XmWnKbH.jpeg", // Health context
    category: "Health"
  },
  {
    id: 3,
    date: "13 November 2025",
    title: "‘Nkoko Nkitinkiti’ programme launched to support local poultry farmers.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg", // Agriculture context
    category: "Agriculture"
  },
  {
    id: 4,
    date: "10 November 2025",
    title: "Community Town Hall: Discussing the new road infrastructure plans for Cape Coast North.",
    image: "https://i.imgur.com/AZqDymE.jpeg", // Infrastructure context
    category: "Infrastructure"
  },
  {
    id: 5,
    date: "05 November 2025",
    title: "Youth Employment Summit draws record attendance at University of Cape Coast.",
    image: "https://i.imgur.com/saQoFLV.png", // Employment context
    category: "Youth"
  }
];

export function LatestUpdatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by roughly the width of a card
      const scrollAmount = 320; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF7] border-b border-slate-100 relative z-10">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 md:mb-14">
          <h4 className="text-green-700 font-extrabold text-xs md:text-sm uppercase tracking-widest mb-3">
            PRESS RELEASES
          </h4>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Latest Updates
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl leading-relaxed">
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
            className="flex overflow-x-auto gap-5 md:gap-8 pb-8 scrollbar-hide snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {UPDATES.map((item) => (
              <article 
                key={item.id} 
                // Mobile: w-[85vw] ensures it fits on screen with a peek of the next card.
                // Desktop: Fixed width for consistency.
                className="w-[85vw] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-start flex flex-col h-auto group cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-300 rounded-none overflow-hidden"
              >
                {/* Image Container */}
                <div className="h-56 md:h-64 w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Container - Green Background */}
                <div className="bg-[#16A34A] p-6 md:p-8 flex-1 flex flex-col justify-between transition-colors group-hover:bg-[#15803d]">
                  <div>
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wide mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time>{item.date}</time>
                    </div>
                    <h3 className="text-white text-lg md:text-xl font-bold leading-snug mb-4 line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-white/30 rounded-full mt-4 group-hover:w-20 transition-all duration-500"></div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}