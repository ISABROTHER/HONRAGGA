// src/pages/OngoingProjects.tsx
import { HardHat, MapPin, Calendar } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Pedu Park Construction",
    status: "Ongoing",
    progress: 45,
    location: "Pedu",
    date: "Dec 2025",
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
                
                {/* Image Section */}
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
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Meta Details */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {project.date}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* New Segmented Progress Visualization */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completion</span>
                      <span className="text-2xl font-black text-blue-700">{project.progress}%</span>
                    </div>
                    {/* 10-Block Segmented Bar */}
                    <div className="flex gap-1 h-3">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm transition-all duration-500 ${
                            i < Math.round(project.progress / 10)
                              ? 'bg-blue-600 shadow-sm'
                              : 'bg-blue-100/50'
                          }`}
                        />
                      ))}
                    </div>
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