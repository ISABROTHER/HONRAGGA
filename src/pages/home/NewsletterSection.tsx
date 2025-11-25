// src/pages/home/NewsletterSection.tsx
import React from "react";
import { Mail } from "lucide-react";
import { Button } from "../../components/Button";

export function NewsletterSection() {
  return (
    <section className="py-20 bg-slate-100 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Mail className="w-12 h-12 text-blue-900 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Stay Connected with Ragga
        </h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          Join our mailing list to receive updates on parliamentary activities,
          community projects, and upcoming town hall meetings.
        </p>

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
        <p className="text-xs text-slate-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
