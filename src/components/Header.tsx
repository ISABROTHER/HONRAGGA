{/* === SCROLLING MINI HEADER (RED VERSION) === */}
<div className="bg-red-600 h-5 overflow-hidden relative flex items-center">
  <div
    className="marquee-track absolute top-0 left-0 h-full flex items-center whitespace-nowrap font-bold text-white"
    style={{
      willChange: 'transform',
      fontFamily: "'Roboto', sans-serif",
      fontSize: '0.6rem',
      letterSpacing: '0.05em',
    }}
  >
    <div style={{ minWidth: '30vw' }} />
    <div className="marquee-content flex items-center gap-3">
      <span>OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH</span>
      <span className="text-white opacity-70">◆</span>
      <span>HON. DR. KWAMENA MINTA NYARKU</span>
      <span className="text-white opacity-70">◆</span>
      <span>TRANSPARENCY • OBIARA KA HO</span>
      <span style={{ paddingLeft: '2rem' }} />
    </div>

    <div className="marquee-content flex items-center gap-3" aria-hidden="true">
      <span>OFFICIAL WEBSITE FOR MP FOR CAPE COAST NORTH</span>
      <span className="text-white opacity-70">◆</span>
      <span>HON. DR. KWAMENA MINTA  NYARKU</span>
      <span className="text-white opacity-70">◆</span>
      <span>TRANSPARENCY • OBIARA KA HO</span>
      <span style={{ paddingLeft: '2rem' }} />
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
