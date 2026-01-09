export function Employment() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Creating sustainable jobs and empowering local entrepreneurs to build a thriving local economy.
      </p>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Initiatives</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Industrial Revival:</strong> Vision and roadmap for the revival of dormant local factories.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Skills Training:</strong> Vocational and technical skills training programs for the youth.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Business Support:</strong> Mentorship and support programs for local small business owners.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}