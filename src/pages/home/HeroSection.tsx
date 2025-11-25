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
      {/* MOBILE HERO — only buttons visible */}
      <div className="block md:hidden relative w-full bg-white overflow-hidden">
        {/* Spacer for natural image height */}
        <img src={HERO_IMAGES[0]} alt="" className="w-full h-auto invisible" />

        {/* Slideshow */}
        {HERO_IMAGES.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt="Hon. Dr. Kwamena Minta Nyarku"
            className="absolute top-0 left-0 w-full h-auto transition-opacity duration-800 ease-in-out"
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              transform: `translateY(${MOBILE_Y_OFFSET}px)`
            }}
          />
        ))}

        {/* Only the button container, kept small and readable */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="bg-slate-950/70 backdrop-blur-sm rounded-xl px-3 py-3 shadow-md flex gap-3 justify-center">
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
      </div>

      {/* DESKTOP HERO — full text + buttons (unchanged) */}
      <div className="hidden md:block w-full h-[90vh] overflow-hidden bg-white relative">
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

        {/* Desktop overlay card */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-12">
            <div className="max-w-xl bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-10 shadow-2xl shadow-slate-900/60">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-3">
                Your MP, Your Neighbour
              </p>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Working with You for a Stronger Cape Coast North
              </h1>

              <p className="text-base lg:text-lg text-slate-100/90 mb-8 leading-relaxed">
                From “Operation 2000 Desks” to lighting our communities and
                supporting our schools, every project begins with one question:{" "}
                <span className="italic">how does this help our people?</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="md"
                  className="px-6 py-3 text-sm font-semibold"
                >
                  View Community Projects
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  className="px-6 py-3 text-sm font-semibold border-white text-white hover:bg-white hover:text-slate-900"
                >
                  Share a Concern
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
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
