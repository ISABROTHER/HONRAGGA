// src/pages/home/NewsletterSection.tsx
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "../../components/Button";

export function NewsletterSection() {
  return (
    <section className="py-10 md:py-14 bg-slate-50 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Centered Heading Block (Reused Style) */}
        <div className="mb-8 flex flex-col items-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 border border-green-100">
            <Mail className="w-3 h-3 text-green-700" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-green-700">
              Newsletter
            </span>
          </p>

          <div className="mt-3 flex flex-col items-center justify-center group">
            <h2 className="
              text-xl sm:text-2xl md:text-3xl 
              font-extrabold tracking-tight text-center
              bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
              bg-clip-text text-transparent
              motion-safe:transition-transform motion-safe:duration-500
            ">
              Stay Connected with Ragga
            </h2>
            <span className="
              mt-2 h-[3px] w-12 rounded-full
              bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
              motion-safe:transition-all motion-safe:duration-500
              group-hover:w-24
            " />
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
          Join our mailing list to receive updates on parliamentary activities,
          community projects, and upcoming town hall meetings.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 px-5 py-3 rounded-xl border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm text-sm"
            required
          />
          <Button variant="primary" size="md" className="sm:w-auto w-full py-3 text-sm">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-slate-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}