// src/pages/home/BottomCTASection.tsx
import { Share, Heart, ShieldCheck, Star, TrendingUp } from "lucide-react";

interface BottomCTASectionProps {
  onNavigate: (page: string) => void;
}

export function BottomCTASection({ onNavigate }: BottomCTASectionProps) {
  return (
    <section className="py-8 md:py-16 bg-white font-sans text-slate-900">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. TITLE SECTION */}
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight font-heading">
          Operation 500,000 Exercise Books
          <span className="hidden md:inline text-slate-500 font-normal"> (Education Support)</span>
        </h2>

        {/* 2. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* LEFT COLUMN (Image & Story) */}
          <div className="flex flex-col gap-6">
            
            {/* FEATURED IMAGE */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video shadow-sm">
              <img 
                src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Students with books" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              {/* Simulated carousel dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
                <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
              </div>
            </div>

            {/* ORGANIZER & STORY (Mobile: Appears AFTER Image, Desktop: Stays in Left Col) */}
            <div className="flex flex-col gap-6 order-3 lg:order-2">
              
              {/* Organizer Row */}
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border border-gray-200 flex-shrink-0">
                   {/* Placeholder Avatar */}
                   <div className="w-full h-full flex items-center justify-center bg-[#002B5B] text-white font-bold text-lg">
                     R
                   </div>
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">Hon. Dr. Kwamena Minta Nyarku</p>
                  <p className="text-sm text-slate-500">Organizer</p>
                </div>
              </div>

              {/* Trust Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E8F7F0] text-[#0D5F35] text-xs font-bold tracking-wide uppercase mb-2">
                  <ShieldCheck className="w-4 h-4" /> Donation protected
                </div>
              </div>

              {/* Story Content */}
              <div className="prose prose-slate max-w-none text-[16px] leading-7 text-slate-700">
                <p>
                  Hello, my name is <strong>Ragga</strong>, and I am launching <strong>Operation 500,000</strong> to support the basic education needs of students in Cape Coast North.
                </p>
                <p>
                  In many of our schools, brilliant young minds are held back simply because they lack basic learning materials like exercise books. This project aims to bridge that gap directly.
                </p>
                <p>
                  We have already made significant progress, distributing thousands of books to schools in the constituency. However, to reach our goal of <strong>500,000 books</strong>, we need the support of the entire community.
                </p>
                <p>
                  Your contribution—whether big or small—goes directly to purchasing these essential supplies. Together, we can ensure that no child goes to class empty-handed.
                </p>
                <button 
                  onClick={() => onNavigate('policies')} 
                  className="font-bold underline mt-2 text-slate-900 hover:text-slate-700"
                >
                  Read more
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Donation Card) */}
          {/* On Mobile: This is Order 2 (between Image and Story). On Desktop: Right Column */}
          <div className="order-2 lg:order-2">
            <div className="lg:sticky lg:top-24 bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6">
              
              {/* Progress Header */}
              <div className="flex items-start gap-5 mb-6">
                {/* Circular Progress Ring */}
                <div className="relative w-16 h-16 flex-shrink-0">
                   <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                     {/* Background Ring */}
                     <path 
                        className="text-gray-100" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3.5" 
                     />
                     {/* Progress Ring (Green) */}
                     <path 
                        className="text-[#4ADE80]" 
                        strokeDasharray="56, 100" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center pt-1">
                      <span className="text-xs font-extrabold text-slate-900">56%</span>
                   </div>
                </div>
                
                <div className="pt-1">
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">
                    £27,682 <span className="text-base font-normal text-slate-600">raised</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    £50K target • 1.9K donations
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mb-6">
                <button 
                  onClick={() => onNavigate('volunteer')}
                  className="w-full py-3.5 px-4 bg-[#1a5c41] hover:bg-[#144833] text-white font-bold text-lg rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center"
                >
                  Donate
                </button>
                
                <button 
                  className="w-full py-3.5 px-4 bg-white border border-slate-300 text-slate-900 font-bold text-lg rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Share <Share className="w-4 h-4" />
                </button>
              </div>

              {/* Recent Activity Notification */}
              <div className="flex items-center gap-3 mb-6 text-[#7B2CBF] bg-purple-50/80 p-3 rounded-lg text-sm font-bold">
                <TrendingUp className="w-5 h-5" />
                <span>219 people have just made a donation</span>
              </div>

              {/* Donor List */}
              <div className="space-y-5">
                
                {/* Item 1 */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Anonymous</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-slate-900">£10</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                      <span>Recent donation</span>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Grace Keeling</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-slate-900">£500</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                      <span className="text-slate-600">Top donation</span>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Peter Castro</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-slate-900">£76</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                      <span>1 hr</span>
                    </div>
                  </div>
                </div>

                 {/* Item 4 */}
                 <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Anonymous</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-slate-900">£25</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                      <span>4 hrs</span>
                    </div>
                  </div>
                </div>

                 {/* Item 5 */}
                 <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Kelsada Taylor</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-slate-900">£10</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-slate-400"></span>
                      <span>31 mins</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 mt-8 pt-2">
                <button className="flex-1 py-2.5 border border-slate-300 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  See all
                </button>
                <button className="flex-1 py-2.5 border border-slate-300 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                  <Star className="w-4 h-4" /> See top
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}