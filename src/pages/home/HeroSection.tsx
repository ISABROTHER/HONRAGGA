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

// DESKTOP HERO POSITION (EDIT THIS ONLY FOR WEB)
const HERO_POSITION = "center -200px";

// MOBILE VERTICAL OFFSET (EDIT THIS ONLY FOR PHONE)
// 0 = current, negative = pull image UP, positive = push image DOWN
const MOBILE_Y_OFFSET = 0;

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(
    () => Math.floor(Math.random() * HERO_IMAGES.length)
  );

  // Change image every 3 seconds with smooth cross-fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full">
      {/* Mobile: maintain natural height using an invisible spacer image */}
      <div className="block md:hidden w-full bg-white overflow-hidden relative">
        {/* Spacer to keep the original height */}
        <img
          src={HERO_IMAGES[0]}
          alt=""
          className="w-full h-auto invisible"
        />

        {/* Cross-fade stack */}
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
      </div>

      {/* Desktop: large hero with controlled crop, cross-fade */}
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
      </div>

      {/* Desktop overlay text */}
      <div className="hidden md:block absolute inset-0">
        <div className="max-w-7xl mx-auto h-full px-8 lg:px-12 flex items-center">
          <div className="max-w-xl bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-3xl px-8 py-10 shadow-2xl shadow-slate-900/60">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-3">
              Your MP, Your Neighbour
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Working with You for a Stronger Cape Coast North
            </h1>
            <p className="text-base lg:text-lg text-slate-100/90 mb-8 leading-relaxed">
              From “Operation 2000 Desks” to lighting our communities and
              supporting our schools, every project begins with one question:{" "}
              <span className="italic">
                how does this help our people?
              </span>
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

      {/* Mobile text block (below image) */}
      <div className="block md:hidden bg-white px-4 pt-5 pb-7">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-700 mb-2">
          Your MP, Your Neighbour
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900 leading-snug mb-3">
          Working with You for a Stronger Cape Coast North
        </h1>
        <p className="text-sm text-slate-700 mb-5">
          From “Operation 2000 Desks” to lighting our communities and supporting
          our schools, every project begins with one question:{" "}
          <span className="italic">how does this help our people?</span>
        </p>
        <div className="flex flex-col xs:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            className="w-full text-sm font-semibold"
          >
            View Community Projects
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full text-sm font-semibold"
          >
            Share a Concern
          </Button>
        </div>
      </div>

      {/* Slider indicators (6 dots) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
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
