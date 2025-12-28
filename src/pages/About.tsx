// src/pages/about/AboutMP.tsx
import { User } from 'lucide-react';

export function AboutMP() {
  return (
    <div className="space-y-8">
      {/* Bio Section */}
      <div className="prose prose-slate max-w-none">
        <div className="inline-flex items-center gap-2 mb-6 text-blue-600 font-black uppercase tracking-widest text-xs">
          <User className="w-4 h-4" />
          <span>Biography</span>
        </div>
        
        <p className="text-xl text-slate-700 leading-relaxed font-medium">
          Hon. Dr. Kwamena Minta Nyarku is an academic, a visionary, and a dedicated servant of the people. Known affectionately as "Ragga," he represents the aspiration of every constituent in Cape Coast North for real, verifiable progress.
        </p>
        
        <p className="text-slate-600 leading-relaxed">
          With a background in advanced research and a heart for grassroots development, he has pioneered an agenda designed to turn Cape Coast North into an economic and educational powerhouse. His leadership is defined by empathy, accountability, and a relentless drive for results.
        </p>
      </div>

      {/* Note: "Know Your Assemblymen" and CTA buttons have been removed */}
    </div>
  );
}