// src/pages/home/LatestUpdatesSection.tsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data using your existing project images to match the context
const UPDATES = [
  {
    id: 1,
    date: "21 November 2025",
    title: "First Lady interacts with St. Mary's school girls, donates learning materials and interacts with scholarship beneficiaries.",
    image: "https://i.imgur.com/Ozjnrli.jpeg", // Education image
    category: "Education"
  },
  {
    id: 2,
    date: "14 November 2025",
    title: "First Lady takes health services to Sunyani as Bono Region battles high HIV rates.",
    image: "https://i.imgur.com/XmWnKbH.jpeg", // Health image
    category: "Health"
  },
  {
    id: 3,
    date: "13 November 2025",
    title: "'Nkoko Nkitinkiti' programme launched to support local poultry farmers.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg", // Agriculture image
    category: "Agriculture"
  },
  {
    id: 4,
    date: "10 November 2025",
    title: "Community Town Hall: Discussing the new road infrastructure plans for Cape Coast North.",
    image: "https://i.imgur.com/AZqDymE.jpeg", // Infrastructure image
    category: "Infrastructure"
  },
  {
    id: 5,
    date: "05 November 2025",
    title: "Youth Employment Summit draws record attendance at University of Cape Coast.",
    image: "https://i.imgur.com/saQoFLV.png", // Employment image
    category: "Youth"
  }
];

export function LatestUpdatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll by roughly the width of a card
      const scrollAmount = 350; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-16 bg-[#FFFDF7] border-b border-slate-100">
      <div className="max-w-[95%] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h4 className="text-green-700 font-extrabold text-sm uppercase tracking-widest mb-2">
            PRESS RELEASES
          </h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Latest Updates
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Stay informed with news, press releases, and stories that highlight the 
            President's work, public addresses, and key decisions.
          </p>
        </div>

        {/* Content Carousel */}
        <div className="relative group/carousel">
          
          {/* Scroll Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 bg-white shadow-xl border border-slate-100 p-3 rounded-full text-slate-700 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroll Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 bg-white shadow-xl border border-slate-100 p-3 rounded-full text-slate-700 hover:text-green-600 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {UPDATES.map((item) => (
              <article 
                key={item.id} 
                className="min-w-[300px] md:min-w-[380px] flex-shrink-0 snap-start flex flex-col h-full group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="h-64 w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Container - Green Background */}
                <div className="bg-[#16A34A] p-6 flex-1 flex flex-col justify-between min-h-[220px] transition-colors group-hover:bg-[#15803d]">
                  <div>
                    <time className="text-white/80 text-sm font-medium mb-3 block">
                      {item.date}
                    </time>
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-4 line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-white/30 rounded-full mt-auto"></div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}