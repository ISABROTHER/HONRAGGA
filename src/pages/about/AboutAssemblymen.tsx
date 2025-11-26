// src/pages/about/AboutAssemblymen.tsx
import React from 'react';
import { Users, Phone } from 'lucide-react';
import { AnimatedSection } from '../../components/AnimatedSection';
import { LOCATIONS } from '../../data/locations';

export function AboutAssemblymen() {
  const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  return (
    <>
       {/* SECTION: Who handles your issues */}
        <AnimatedSection delay={50}>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
            Who Handles Your Issues?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MP Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-green-100 bg-gray-100">
                  <img
                    src={mpPortraitUrl}
                    alt="Hon. Dr. Kwamena Minta Nyarku"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Your Member of Parliament
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Hon. Dr. Kwamena Minta Nyarku (Ragga)
                  </p>
                  <p className="text-xs text-gray-600">
                    MP for Cape Coast North
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                All issues submitted on this platform are received by the MP&apos;s office. 
                Some matters are handled directly by the MP&apos;s team; others are delivered 
                through Assembly Members, departments and agencies for action.
              </p>
              <p className="text-xs text-gray-500">
                The goal is simple: every genuine concern should find its way to the right desk.
              </p>
            </div>

            {/* Assemblymen Role Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Your Assembly Members
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Local Representatives in Each Electoral Area
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Assembly Members are the first point of contact for day-to-day community issues 
                such as drains, streetlights, sanitation, and local projects. They work closely 
                with the MP&apos;s office so that no community is left behind.
              </p>
              <p className="text-xs text-gray-500">
                Issues can be followed up directly with your Assembly Member, or through 
                the MP&apos;s office, depending on the nature of the problem.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Assembly Members grid */}
        <AnimatedSection delay={120}>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Assembly Members in Cape Coast North
          </h3>
          <p className="text-sm text-gray-700 mb-6">
            Each electoral area has an Assembly Member who represents residents at the local level. 
            These profiles help you identify your representative. You can contact them directly, or raise 
            your concern through the MP&apos;s office using the issues page.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {LOCATIONS.map((member) => (
              <div
                key={member.zone}
                className="flex flex-col items-center text-center group bg-white border border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden rounded-lg mb-3 relative">
                  {/* Placeholder for photo - using random color/initials if no photo url in data */}
                  <div className="absolute inset-0 flex items-center justify-center text-amber-300/50 font-black text-6xl">
                     {member.assemblyman.charAt(0)}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-1/3"></div>
                </div>
                
                <div className="space-y-1 w-full">
                  <p className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">
                    {member.zone}
                  </p>
                  <p className="text-xs font-black text-gray-900 leading-snug uppercase line-clamp-2 h-8 flex items-center justify-center">
                    {member.assemblyman}
                  </p>
                  <div className="pt-2 border-t border-gray-100 w-full mt-2">
                    <p className="text-[11px] text-gray-600 flex items-center justify-center gap-1.5 font-medium bg-gray-50 py-1.5 rounded-full">
                      <Phone className="w-3 h-3 text-green-600" />
                      <span>{member.phone}</span>
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