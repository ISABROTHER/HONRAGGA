export function Agriculture() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-700 leading-relaxed">
        Supporting farmers to increase yields, improve market access, and modernise farming practices.
      </p>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Key Initiatives</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Farmer Support:</strong> Direct donation of tools, seeds, and fertilizers to local farming groups.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Market Access:</strong> Connecting farmers with direct buyers to ensure fair pricing for their produce.</span>
          </li>
          <li className="flex gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
            <span className="text-slate-700"><strong>Modernization:</strong> Introducing mechanization tools to replace manual labor in farming communities.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}