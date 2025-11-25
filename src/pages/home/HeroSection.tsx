// src/pages/home/HeroSection.tsx
import React, { useEffect, useState } from "react";

const HERO_IMAGES = [
  "https://i.imgur.com/XC8k4zQ.jpeg",
  "https://i.imgur.com/NSWtjdU.jpeg",
  "https://i.imgur.com/EqnSMPU.jpeg",
  "https://i.imgur.com/1P4hgqC.jpeg",
  "https://i.imgur.com/lUPM6jK.jpeg",
  "https://i.imgur.com/hmaoKHa.jpeg"
];

const HERO_POSITION = "center -200px";
const MOBILE_Y_OFFSET = 0;

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(
    () => Math.floor(Math.random() * HERO_IMAGES.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    // Section matches hero height on desktop
    <section className="relative w-full md:h-[90vh]">
      {/* === HERO IMAGE SLIDESHOW (MOBILE + DESKTOP) === */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Spacer for natural image height on mobile */}
        <img
          src={HERO_IMAGES[0]}
          alt=""
          className="block md:hidden w-full h-auto invisible"
        />

        {/* Mobile slideshow */}
        {HERO_IMAGES.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt="Hon. Dr. Kwamena Minta Nyarku"
            className="absolute md:hidden top-0 left-0 w-full h-auto transition-opacity duration-800 ease-in-out"
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              transform: `translateY(${MOBILE_Y_OFFSET}px)`
            }}
          />
        ))}

        {/* Desktop slideshow fills the section height */}
        <div className="hidden md:block w-full h-full relative overflow-hidden">
          {HERO_IMAGES.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="Hon. Dr. Kwamena Minta Nyarku"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ease-in-out"
              style={{
                opacity: idx === currentIndex ? 1 : 0,
                objectPosition: HERO_POSITION
              }}
            />
          ))}
        </div>
      </div>

      {/* === BOTTOM GRADIENT SCRIM (FULL-WIDTH, FADES UP) === */}
      <div
        className="
          absolute inset-x-0 bottom-0 
          h-32 
          bg-gradient-to-t 
          from-slate-950/85 via-slate-950/45 to-transparent
          pointer-events-none
          z-10
        "
      />

      {/* === SLIDER INDICATORS (ON TOP OF SCRIM) === */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full border border-white/60 ${
              idx === currentIndex ? "bg-white" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
