export function Infrastructure() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Transforming the constituency through modern lighting, better roads, and community spaces.
      </p>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Initiatives</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-slate-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Operation Light Up:</strong> Installation of over 2,500 streetlights across the constituency for safety and security.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-slate-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Road Improvement:</strong> Major road grading projects and securing 10km of asphalted roads.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-slate-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Community Center:</strong> Construction and refurbishment of the Ankaful Community Centre.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}