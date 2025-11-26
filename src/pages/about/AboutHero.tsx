// src/pages/about/AboutHero.tsx
import React from 'react';

export function AboutHero() {
  const heroDesktopUrl = "https://i.imgur.com/6rWU7qN.png";
  const heroMobileUrl = "https://i.imgur.com/abKZDVv.png";

  return (
    <section className="relative w-full h-auto min-h-[260px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden flex items-end">
      {/* Mobile hero */}
      <img
        src={heroMobileUrl}
        alt="Cape Coast North Leadership - mobile"
        className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
      />
      {/* Desktop hero */}
      <img
        src={heroDesktopUrl}
        alt="Cape Coast North Leadership - desktop"
        className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Text Overlay */}
      <div className="relative z-10 w-full text-center text-white pb-6 md:pb-10 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-1 drop-shadow-lg [text-shadow:_0_3px_6px_rgb(0_0_0_/_70%)]">
          KNOW YOUR LEADERSHIP
        </h2>
        <p className="text-sm md:text-base lg:text-lg font-medium text-amber-200 drop-shadow-md [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
          Hon. Dr. Kwamena Minta Nyarku and the Assembly Members of Cape Coast North
        </p>
      </div>
    </section>
  );
}