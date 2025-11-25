// src/pages/home/StatsStrip.tsx
import React, { useEffect, useState } from "react";

type StatItem = {
  label: string;
  target: number;
  format?: (value: number) => string;
  extraLabel?: string;
};

const stats: StatItem[] = [
  {
    label: "Supporters",
    target: 50000,
    format: (v) => `${Math.round(v / 1000)}K+`
  },
  {
    label: "Streetlights",
    target: 2500,
    format: (v) => `${v.toLocaleString()}+`
  },
  {
    label: "Scholarships",
    target: 100,
    format: (v) => `${v}+`
  },
  {
    label: "Events Held",
    target: 200,
    format: (v) => `${v}+`
  },
  {
    label: "Volunteers",
    target: 15000,
    format: (v) => `${Math.round(v / 1000)}K+`
  },
  {
    label: "Development",
    target: 1,
    format: (v) => (v >= 1 ? `${v} Goal` : "0")
  }
];

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}

export function StatsStrip() {
  return (
    <section
      className="text-white py-3 md:py-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #004528, #006B3F, #004528)" // NDC green hue band
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-2 md:gap-y-6 gap-x-2 md:gap-8 text-center md:divide-x md:divide-white/10">
          {stats.map((item, idx) => {
            const value = useCountUp(item.target, 1200 + idx * 150);
            const display =
              item.format && value >= 0
                ? item.format(value)
                : value.toString();

            return (
              <div key={item.label} className="p-1">
                <div className="text-lg sm:text-xl md:text-3xl font-extrabold text-amber-400 mb-0.5">
                  {display}
                </div>
                <div className="text-[9px] sm:text-xs text-amber-50 uppercase tracking-wider font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
