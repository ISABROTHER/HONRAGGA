import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Operation Light Up",
    desc: "Installation of over 2,500 streetlights to enhance night-time security and local commerce.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Constituency Road Grading",
    desc: "Regular maintenance and grading of key feeder roads to facilitate easy transportation.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  },
  {
    title: "Ankaful Community Centre",
    desc: "The construction and upgrade of a central gathering space for social and civic events.",
    image: "https://i.imgur.com/AZqDymE.jpeg"
  }
];

export function Infrastructure() {
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