// src/pages/home/NewsletterSection.tsx
import React from "react";
import { Button } from "../../components/Button";

export function NewsletterSection() {
  return (
    <section className="py-20 bg-slate-100 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* ================================
            PREMIUM CENTERED HEADING BLOCK
        ================================= */}
        <div className="text-center mb-10">
          
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 border border-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 motion-safe:animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-blue-700">
              Updates &amp; Alerts
            </span>
          </p>

          {/* Main heading */}
          <div className="mt-3 flex flex-col items-center justify-center group">
            <h2
              className="
                text-2xl sm:text-3xl md:text-4xl 
                font-extrabold tracking-tight text-center
                bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900
                bg-clip-text text-transparent
                motion-safe:transition-transform motion-safe:duration-500
              "
            >
              Stay Connected with Ragga
            </h2>
            <span
              className="
                mt-2 h-[3px] w-12 rounded-full
                bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-24
              "
            />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
            Join our mailing list to receive updates on parliamentary activities,
            community projects, and upcoming town hall meetings.
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 px-5 py-4 rounded-xl border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
            required
          />
          <Button variant="primary" size="md" className="sm:w-auto w-full py-4">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}