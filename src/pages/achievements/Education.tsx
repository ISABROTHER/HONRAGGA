


import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "High School Support Program",
    desc: "A comprehensive assistance program providing resources and guidance to SHS students across the constituency.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Adisadel College Lighting",
    desc: "Donation of 500 LED bulbs to resolve persistent lighting challenges in classrooms and dormitories.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Dual Desks Donation",
    desc: "Provision of 100 high-quality dual desks to 10 basic schools to improve the learning environment.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "School Renovations",
    desc: "Major infrastructure repairs and fresh painting for dilapidated school buildings in rural areas.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  }
];

export function Education() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {initiatives.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className="h-48 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-5">
            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}