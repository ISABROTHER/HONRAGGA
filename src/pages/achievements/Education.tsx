import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "High School Support Program",
    info: "A comprehensive program designed to provide secondary students with materials and mentorship to ensure academic success in national examinations.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Adisadel College Lighting",
    info: "Donation and installation of 500 LED bulbs across the campus to solve persistent lighting challenges in classrooms and dorms.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Dual Desks Provision",
    info: "Direct donation of 100 high-quality dual desks to ten basic schools across the constituency to improve the learning environment.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Classroom Infrastructure Renewal",
    info: "Supervised renovations and repairs of dilapidated school buildings to provide a safe and dignified space for students.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  }
];

export function Education() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-lg flex flex-col"
        >
          {/* 1. Picture */}
          <div className="h-60 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8">
            {/* 2. Title */}
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
              {item.title}
            </h3>
            
            {/* 3. Information */}
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              {item.info}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}