// src/pages/home/HeroSection.tsx
import React, { useEffect, useState } from "react";

/* ============================================
   TUNING KEYS – YOU CAN EDIT THESE SAFELY
   ============================================ */

// Hero behaviour
const HERO_DESKTOP_HEIGHT = "md:h-[90vh]"; // desktop hero height (e.g. md:h-[80vh], md:h-screen)
const SLIDE_INTERVAL_MS = 3000;            // time between image changes

// Mobile image vertical offset (if face is cut off, adjust this)
const MOBILE_Y_OFFSET_PX = 0;              // negative = move image up, positive = move down

// Scrim (bottom gradient overlay) config
const SCRIM_ENABLED = true;                // turn scrim on/off easily
const SCRIM_HEIGHT_CLASS = "h-32";         // thickness from the bottom (e.g. h-24, h-40)
const SCRIM_BOTTOM_OFFSET_CLASS = "bottom-0"; 
// examples: "bottom-0" (touches bottom), "bottom-2" (a bit above), "bottom-4"

// Scrim colour profile (Tailwind classes)
const SCRIM_FROM_CLASS = "from-slate-950/100"; // strongest colour at bottom
const SCRIM_VIA_CLASS = "via-slate-950/60";   // middle fade
const SCRIM_TO_CLASS = "to-transparent";      // where it ends at top

// Slider indicators position
const INDICATORS_BOTTOM_OFFSET_CLASS = "bottom-3"; // e.g. bottom-2, bottom-4

/* ============================================
   IMAGES + COMPONENT
   ============================================ */

const HERO_IMAGES = [
  "https://i.imgur.com/XC8k4zQ.jpeg",
  "https://i.imgur.com/NSWtjdU.jpeg",
  "https://i.imgur.com/EqnSMPU.jpeg",
  "https://i.imgur.com/1P4hgqC.jpeg",
  "https://i.imgur.com/lUPM6jK.jpeg",
  "https://i.imgur.com/hmaoKHa.jpeg"
];

// DESKTOP HERO POSITION (EDIT IF YOU WANT TO RE-CROP)
const HERO_POSITION = "center -200px";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(
    () => Math.floor(Math.random() * HERO_IMAGES.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    // Section matches hero height on desktop using the key above
    <section className={`relative w-full ${HERO_DESKTOP_HEIGHT}`}>
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
              transform: `translateY(${MOBILE_Y_OFFSET_PX}px)`
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
      {SCRIM_ENABLED && (
        <div
          className={`
            absolute inset-x-0 ${SCRIM_BOTTOM_OFFSET_CLASS}
            ${SCRIM_HEIGHT_CLASS}
            bg-gradient-to-t
            ${SCRIM_FROM_CLASS} ${SCRIM_VIA_CLASS} ${SCRIM_TO_CLASS}
            pointer-events-none
            z-10
          `}
        />
      )}

      {/* === SLIDER INDICATORS (ON TOP OF SCRIM) === */}
      <div
        className={`
          absolute ${INDICATORS_BOTTOM_OFFSET_CLASS}
          left-1/2 -translate-x-1/2
          flex gap-1.5 md:gap-2
          z-20
        `}
      >
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
