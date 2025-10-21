{/* === SCROLLING MINI HEADER (with OBIARA KA HO) === */}
<div className="bg-red-600 h-5 overflow-hidden relative flex items-center" style={{ top: '-1%' }}>
  <div
    className="marquee-track absolute top-0 left-0 h-full flex items-center whitespace-nowrap font-bold text-white"
    style={{
      willChange: 'transform',
      fontFamily: "'Roboto', sans-serif",
      fontSize: '0.65rem',
      letterSpacing: '0.05em',
    }}
  >
    <div style={{ minWidth: '30vw' }} />

    <div className="marquee-content flex items-center gap-4">
      <span>OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH</span>
      <span className="text-white/80 px-2">II</span>
      <span>HON. DR. KWAMENA MINTA NYARKU</span>
      <span className="text-white/80 px-2">II</span>
      <span>OBIARA KA HO</span>
      <span className="text-white/80 px-2">II</span>
    </div> 

    <div className="marquee-content flex items-center gap-4" aria-hidden="true">
      <span>OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH</span>
      <span className="text-white/80 px-2">II</span>
      <span>HON. DR. KWAMENA MINTA NYARKU</span>
      <span className="text-white/80 px-2">II</span>
      <span>OBIARA KA HO</span>
      <span className="text-white/80 px-2">II</span>
    </div>
  </div>

  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track {
      animation: marquee 40s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
  `}</style>
</div>
