{/* === Scrolling Announcement Bar === */}
<div className="bg-red-600 h-5 overflow-hidden relative flex items-center">
  <div
    className="absolute top-0 h-full flex flex-col justify-center animate-marquee"
    style={{
      left: '30%',
      animation: 'marqueeScroll 40s linear infinite',
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 700, // bold
      color: 'white',
      fontSize: '0.875rem', // text-sm
      lineHeight: '1.5rem', // better spacing
      whiteSpace: 'nowrap',
    }}
  >
    <div>Official Website for MP for Cape Coast</div>
    <div>—</div>
    <div>Working for the People, Building the Future</div>
    <div>—</div>
    <div>Transparency • Integrity • Progress</div>
  </div>

  <style>{`
    @keyframes marqueeScroll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .animate-marquee {
      will-change: transform;
    }
  `}</style>
</div>
