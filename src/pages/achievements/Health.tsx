export function Health() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Improving healthcare access and public hygiene is a cornerstone of Hon. Ragga's vision for a healthier Cape Coast North.
      </p>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Initiatives</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-green-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Facility Support:</strong> Significant support provided to health centers in Kwaprow and Dankwakrom.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-green-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Public Sanitation:</strong> Construction of modern public toilets to improve community hygiene.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-green-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Drainage & Waste:</strong> Installation of manholes and improved waste management systems in high-density areas.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}