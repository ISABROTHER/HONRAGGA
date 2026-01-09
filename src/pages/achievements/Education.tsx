import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "High School Support Program",
    desc: "A comprehensive assistance program providing resources and guidance to SHS students across the constituency to ensure academic success.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    tag: "Education"
  },
  {
    title: "Adisadel College Lighting",
    desc: "Donation of 500 LED bulbs to resolve persistent lighting challenges in classrooms and dormitories, creating a safer learning environment.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    tag: "Infrastructure"
  },
  {
    title: "Dual Desks Donation",
    desc: "Provision of 100 high-quality dual desks to 10 basic schools, ending the struggle of students sitting on the floor or sharing cramped spaces.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    tag: "Equipment"
  },
  {
    title: "School Renovations",
    desc: "Major infrastructure repairs and fresh painting for dilapidated school buildings, restoring pride and safety to community schools.",
    image: "https://i.imgur.com/Ozjnrli.jpeg",
    tag: "Construction"
  }
];

export function Education() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-md shadow-slate-200/50 border border-white hover:border-blue-200 transition-all duration-300"
        >
          {/* Image Left Side */}
          <div className="md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>

          {/* Text Right Side */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                {item.tag}
              </span>
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
              {item.title}
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}