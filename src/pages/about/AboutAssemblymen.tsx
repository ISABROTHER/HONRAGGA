// src/pages/about/AboutAssemblymen.tsx
import React from "react";
import { Users, Phone, Info, MapPin } from "lucide-react";
import { AnimatedSection } from "../../components/AnimatedSection";
import { LOCATIONS } from "../../data/locations";

export function AboutAssemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <>
      {/* SECTION: Who handles your issues */}
      <AnimatedSection delay={50}>
        <div className="mb-8 md:mb-10">
          {/* Eyebrow + heading */}
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 border border-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-emerald-700">
              Representation &amp; Contact
            </span>
          </p>
          <h2
            className="
              mt-3 text-2xl md:text-3xl lg:text-4xl 
              font-extrabold tracking-tight text-slate-900
            "
          >
            <span className="bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 bg-clip-text text-transparent">
              Who Handles Your Issues?
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl">
            Know exactly who speaks for you, and how to reach them—whether it is
            the MP&apos;s office or your local Assembly Member.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* MP Card */}
          <div className="bg-white rounded-2xl border border-emerald-50 shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-emerald-500/70 shadow-sm bg-gray-100">
                <img
                  src={mpPortraitUrl}
                  alt="Hon. Dr. Kwamena Minta Nyarku"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center rounded-full bg-emerald-600 text-[9px] font-semibold text-white px-2 py-0.5 shadow">
                  MP
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Member of Parliament
                </p>
                <p className="text-sm md:text-base font-bold text-slate-900">
                  Hon. Dr. Kwamena Minta Nyarku (Ragga)
                </p>
                <p className="text-xs md:text-sm text-slate-600">
                  MP for Cape Coast North
                </p>
              </div>
            </div>

            <p className="text-sm md:text-[15px] text-slate-700 leading-relaxed">
              All issues submitted on this platform are received by the MP&apos;s
              office. Some matters are handled directly by the MP&apos;s team;
              others are routed through Assembly Members, departments and
              agencies for action.
            </p>

            <div className="flex items-start gap-2 text-xs md:text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
              <Info className="w-4 h-4 text-emerald-600 mt-0.5" />
              <p>
                The goal is simple: every genuine concern should find its way to
                the right desk, and receive a clear response.
              </p>
            </div>
          </div>

          {/* Assemblymen Role Card */}
          <div className="bg-white rounded-2xl border border-blue-50 shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <Users className="w-7 h-7 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Assembly Members
                </p>
                <p className="text-sm md:text-base font-bold text-slate-900">
                  Local Representatives in Each Electoral Area
                </p>
              </div>
            </div>

            <p className="text-sm md:text-[15px] text-slate-700 leading-relaxed">
              Assembly Members are the first point of contact for day-to-day
              community issues such as drains, streetlights, sanitation and
              local projects. They work closely with the MP&apos;s office so
              that no community is left behind.
            </p>

            <div className="flex items-start gap-2 text-xs md:text-sm text-slate-500 bg-blue-50/60 border border-blue-100 rounded-xl px-3 py-2">
              <MapPin className="w-4 h-4 text-blue-700 mt-0.5" />
              <p>
                You can speak directly to your Assembly Member, or raise your
                concern through the MP&apos;s office. Both channels are linked
                and coordinated.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Assembly Members grid */}
      <AnimatedSection delay={120}>
        <div className="mt-10 md:mt-14 mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
              Assembly Members in Cape Coast North
            </h3>
            <p className="mt-2 text-sm md:text-[15px] text-slate-600 max-w-2xl">
              Each electoral area has an Assembly Member who represents residents
              at the local level. Tap on a contact below to call your
              representative directly, or use the Issues page to reach the
              MP&apos;s office.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 border border-slate-200">
            <Phone className="w-4 h-4 text-emerald-600" />
            <p className="text-xs md:text-sm font-semibold text-slate-700">
              On mobile, tap the number to call your Assembly Member.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {LOCATIONS.map((member) => (
            <div
              key={member.zone}
              className="
                flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden
                shadow-[0_10px_30px_rgba(15,23,42,0.04)]
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]
                transition-all duration-300 group
              "
            >
              {/* Photo area */}
              <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
                <img
                  src={member.photoUrl}
                  alt={member.assemblyman}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                {/* Zone pill */}
                <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-800">
                    {member.zone}
                  </span>
                </div>
              </div>

              {/* Text + contact – NEW STYLE */}
              <div className="flex-1 flex flex-col items-center px-3.5 md:px-4 pb-3.5 md:pb-4 pt-3">
                {/* Name */}
                <p className="text-sm md:text-[15px] font-extrabold text-slate-900 text-center leading-snug line-clamp-3">
                  {member.assemblyman}
                </p>

                {/* Position + zone in one clean line */}
                <p className="mt-1 text-[11px] md:text-xs text-slate-500 font-medium text-center uppercase tracking-[0.14em]">
                  Assembly Member • {member.zone}
                </p>

                {/* Phone button */}
                <div className="mt-3 w-full">
                  <a
                    href={`tel:${member.phone}`}
                    className="
                      w-full inline-flex items-center justify-center gap-2 
                      text-xs md:text-sm font-semibold
                      text-emerald-800 bg-emerald-50 hover:bg-emerald-100
                      rounded-full py-2.5 px-3
                      border border-emerald-200 hover:border-emerald-400
                      transition-all duration-200
                      group-hover:shadow-sm
                    "
                  >
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </a>
                  <p className="mt-1 text-[10px] text-slate-500 text-center">
                    Tap to call your Assembly Member.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
