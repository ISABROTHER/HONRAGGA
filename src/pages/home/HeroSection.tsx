// src/pages/home/HeroSection.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";

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
    <section className="relative w-full">
      {/* === HERO IMAGE SLIDESHOW (MOBILE + DESKTOP) === */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Spacer for natural image height on mobile */}
        <img src={HERO_IMAGES[0]} alt="" className="block md:hidden w-full h-auto invisible" />

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

        {/* Desktop slideshow */}
        <div className="hidden md:block w-full h-[90vh] relative overflow-hidden">
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

      {/* === BUTTON CONTAINER — ALWAYS VISIBLE (MOBILE & DESKTOP) === */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20 px-4">
        <div className="bg-slate-950/70 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex gap-4">
          <Button
            variant="primary"
            size="sm"
            className="px-4 py-2 text-[11px] font-semibold"
          >
            View Projects
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-4 py-2 text-[11px] font-semibold border-white text-white hover:bg-white hover:text-slate-900"
          >
            Share Concern
          </Button>
        </div>
      </div>

      {/* === SLIDER INDICATORS === */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
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
