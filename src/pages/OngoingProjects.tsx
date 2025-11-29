// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar, Activity } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Pedu Park Construction",
    status: "Ongoing",
    progress: 45,
    location: "Pedu",
    date: "Dec 2025", // Removed "Expected Completion:" prefix
    image: "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Major redevelopment of the Pedu Community Park into a modern astro-turf facility with lighting and spectator stands."
  }
];

export function OngoingProjects() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 border border-amber-100 mb-4">
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-amber-600">
                Development Tracker
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Ongoing Projects
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tracking the progress of infrastructure and development initiatives across Cape Coast North.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group max-w-xl mx-auto w-full relative">
                
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Badge (Bottom Left) */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {project.status}
                    </span>
                  </div>

                  {/* NEW: Circular Progress Badge (Top Right) */}
                  <div className="absolute top-4 right-4 flex items-center justify-center w-16 h-16 bg-white/95 backdrop-blur rounded-full shadow-lg border-4 border-blue-500 z-10">
                    <div className="text-center leading-none">
                      <span className="block text-xl font-black text-blue-700">{project.progress}%</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Done</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {project.date}
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Replaced Linear Bar with Activity Indicator */}
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-xl">
                    <Activity className="w-4 h-4" />
                    <span>Project is actively progressing</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}