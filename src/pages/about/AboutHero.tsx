// src/pages/about/AboutHero.tsx
export function AboutHero() {
  return (
    <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background with subtle overlay */}
      <div className="absolute inset-0 z-0 opacity-40 grayscale">
        <img 
          src="https://i.imgur.com/5H0XBuV.jpeg" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Only the Main Heading remains */}
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase animate-fade-in">
          ABOUT <span className="text-blue-500">ME.</span>
        </h1>
      </div>
    </div>
  );
}