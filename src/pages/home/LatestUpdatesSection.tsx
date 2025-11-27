// src/pages/home/LatestUpdatesSection.tsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';

// 1. Export the interface and data so ReadStory.tsx can use them
export interface UpdateItem {
  id: number;
  date: string;
  title: string;
  image: string;
  category: string;
  content: React.ReactNode; // Changed to ReactNode to support paragraphs
}

export const UPDATES: UpdateItem[] = [
  {
    id: 1,
    date: "21 November 2025",
    title: "First Lady interacts with St. Mary’s school girls, donates learning materials and interacts with scholarship beneficiaries.",
    image: "https://i.imgur.com/Ozjnrli.jpeg", 
    category: "Education",
    content: (
      <>
        <p className="mb-6"><strong>Cape Coast, Ghana</strong> – In a heartwarming display of commitment to girl-child education, the First Lady paid a visit to St. Mary’s Senior High School today. The visit, part of her nationwide educational tour, focused on empowering young women to pursue academic excellence and leadership roles.</p>
        <p className="mb-6">During the interaction, she donated a significant consignment of learning materials, including textbooks, exercise books, and science equipment, aimed at bolstering the school's academic resources. "Education is the most powerful tool we can give our daughters," she remarked during her address to the enthusiastic assembly of students.</p>
        <p className="mb-6">Furthermore, the First Lady held a special session with beneficiaries of the constituency's scholarship scheme. She encouraged them to make the most of the opportunity, emphasizing that their success would pave the way for future generations.</p>
        <blockquote className="border-l-4 border-amber-500 pl-4 italic text-slate-700 my-8 bg-slate-50 p-4 rounded-r-lg">
          "We are building a future where every girl has the chance to shine, not just for herself, but for her community and her country."
        </blockquote>
        <p>The students expressed profound gratitude, promising to work hard to justify the investment in their future. The event concluded with a cultural performance by the school's drama troupe.</p>
      </>
    )
  },
  {
    id: 2,
    date: "14 November 2025",
    title: "First Lady takes health services to Sunyani as Bono Region battles high HIV rates.",
    image: "https://i.imgur.com/XmWnKbH.jpeg", 
    category: "Health",
    content: (
      <>
        <p className="mb-6"><strong>Sunyani, Bono Region</strong> – Addressing the critical health challenges facing the region, the First Lady led a high-level delegation of health professionals to Sunyani this week. The initiative aims to combat the rising HIV prevalence rates through education, testing, and accessible care.</p>
        <p className="mb-6">The program included a free health screening exercise attended by over 2,000 residents. "Health is wealth, and we cannot afford to lose our youth to preventable conditions," she stated.</p>
        <p>Local chiefs and community leaders pledged their support, promising to help destigmatize HIV testing and encourage their subjects to seek medical advice early.</p>
      </>
    )
  },
  {
    id: 3,
    date: "13 November 2025",
    title: "‘Nkoko Nkitinkiti’ programme launched to support local poultry farmers.",
    image: "https://i.imgur.com/TZ4jIJA.jpeg", 
    category: "Agriculture",
    content: (
      <>
        <p className="mb-6"><strong>Cape Coast North</strong> – A new dawn has risen for poultry farmers in the constituency with the launch of the ‘Nkoko Nkitinkiti’ (Small Poultry) Programme. This initiative provides starter packs, feed, and veterinary support to small-scale farmers.</p>
        <p className="mb-6">The goal is to boost local protein production and create sustainable livelihoods for youth and women in the agricultural sector.</p>
        <p>Beneficiaries received their initial stock of chicks and feed bags during the launch ceremony held at the district assembly hall.</p>
      </>
    )
  },
  {
    id: 4,
    date: "10 November 2025",
    title: "Community Town Hall: Discussing the new road infrastructure plans for Cape Coast North.",
    image: "https://i.imgur.com/AZqDymE.jpeg", 
    category: "Infrastructure",
    content: (
      <>
        <p className="mb-6"><strong>Adisadel</strong> – Residents gathered in their numbers for a town hall meeting to discuss the upcoming road rehabilitation projects. The MP's office presented the roadmap for the next 12 months, which includes the asphalting of major connector roads.</p>
        <p className="mb-6">Engineers were present to answer questions regarding drainage and timelines. "We want to ensure minimal disruption to daily life while we improve our roads," the lead contractor assured the public.</p>
      </>
    )
  },
  {
    id: 5,
    date: "05 November 2025",
    title: "Youth Employment Summit draws record attendance at University of Cape Coast.",
    image: "https://i.imgur.com/saQoFLV.png", 
    category: "Youth",
    content: (
      <>
        <p className="mb-6"><strong>UCC Campus</strong> – The CETRA2030 Youth Employment Summit has set a new benchmark for youth engagement. Over 5,000 students and job seekers attended the two-day event focused on digital skills and entrepreneurship.</p>
        <p className="mb-6">Tech leaders and industry captains shared insights on the changing landscape of work. Several attendees walked away with on-the-spot internship offers.</p>
      </>
    )
  }
];

interface LatestUpdatesSectionProps {
  onNavigate: (page: string, param?: string) => void;
}

export function LatestUpdatesSection({ onNavigate }: LatestUpdatesSectionProps) {
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
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-green-800 font-extrabold text-xs md:text-sm uppercase tracking-widest mb-3">
                PRESS RELEASES
              </h4>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
                Latest Updates
              </h2>
            </div>
            
            {/* Visual "Slide" Indicator for Mobile */}
            <div className="md:hidden flex items-center gap-1 text-slate-400 text-xs font-bold animate-pulse">
              <span>Slide</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-slate-600 text-sm md:text-lg max-w-3xl leading-relaxed">
            Stay informed with news, press releases, and stories that highlight the 
            President's work, public addresses, and key decisions.
          </p>
        </div>

        {/* Content Carousel Container */}
        <div className="relative group/carousel">
          
          {/* Scroll Left Button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-[40%] -translate-y-1/2 -ml-3 md:-ml-6 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-slate-100 p-2 md:p-3 rounded-full text-slate-700 hover:text-green-700 hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Scroll Right Button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-[40%] -translate-y-1/2 -mr-3 md:-mr-6 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-slate-100 p-2 md:p-3 rounded-full text-slate-700 hover:text-green-700 hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
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
                // Navigate to 'read-story' with the ID
                onClick={() => onNavigate('read-story', String(item.id))}
                className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start flex flex-col h-auto group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden bg-white border border-slate-100/50"
              >
                {/* Image Container */}
                <div className="h-48 md:h-60 w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-[#004528] text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                    {item.category}
                  </div>
                </div>
                
                {/* Content Container */}
                <div className="bg-[#004528] p-5 md:p-6 flex-1 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle background pattern overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl pointer-events-none"></div>

                  <div>
                    <div className="flex items-center gap-2 text-amber-400/90 text-xs font-bold uppercase tracking-wide mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time>{item.date}</time>
                    </div>
                    <h3 className="text-white text-base md:text-xl font-bold leading-snug mb-4 line-clamp-3 group-hover:text-amber-50 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-[#004528] text-xs font-extrabold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg">
                      Read Story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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