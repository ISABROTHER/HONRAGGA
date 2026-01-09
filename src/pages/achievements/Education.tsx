 import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, GraduationCap, School } from 'lucide-react';

const initiatives = [
  {
    title: "High School Support Program",
    desc: "A flagship assistance framework providing elite academic resources and mentorship to ensure no student in Cape Coast North is left behind.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    icon: GraduationCap,
    stat: "Constituency Wide",
    color: "blue"
  },
  {
    title: "The Adisadel Lighting Project",
    desc: "Installation of high-efficiency LED systems across classrooms and dormitories, transforming the learning environment after sunset.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    icon: Lightbulb,
    stat: "500+ Units",
    color: "amber"
  },
  {
    title: "Primary Furniture Initiative",
    desc: "Eradicating 'floor-learning' by providing custom-engineered dual desks to ten priority basic schools across the district.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    icon: School,
    stat: "10 Schools",
    color: "emerald"
  },
  {
    title: "Academic Infrastructure Renewal",
    desc: "Precision restoration of historic and dilapidated school blocks, combining modern safety standards with community heritage.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    icon: BookOpen,
    stat: "Phase 1 Complete",
    color: "indigo"
  }
];

export function Education() {
  return (
    <div className="space-y-12 mt-12">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="group relative flex flex-col lg:flex-row items-center bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 hover:border-blue-500/30 transition-all duration-500"
        >
          {/* Image Container with "Prestige" Overlay */}
          <div className="w-full lg:w-[400px] h-[300px] lg:h-[400px] overflow-hidden relative">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <item.icon className="w-4 h-4 text-blue-700" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.stat}</span>
            </div>
          </div>

          {/* Premium Content Area */}
          <div className="p-8 lg:p-12 flex-1">
            <div className="mb-6 inline-block">
               <span className="h-1 w-12 bg-blue-600 block rounded-full" />
            </div>
            
            <h4 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-[1.1] group-hover:text-blue-700 transition-colors">
              {item.title}
            </h4>
            
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mb-8 max-w-xl">
              {item.desc}
            </p>

            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
               </div>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter italic">Verified Achievement</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}