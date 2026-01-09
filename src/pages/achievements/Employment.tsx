import { motion } from 'framer-motion';

const initiatives = [
  {
    title: "Factory Revival Roadmap",
    desc: "Strategic planning and investment attraction to bring life back to dormant industrial sites.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Vocational Skills Training",
    desc: "Empowering youth with technical skills for the modern job market through hands-on workshops.",
    image: "https://i.imgur.com/saQoFLV.png"
  },
  {
    title: "Entrepreneurial Grants",
    desc: "Financial and mentorship support for local small businesses and startup founders.",
    image: "https://i.imgur.com/saQoFLV.png"
  }
];

export function Employment() {
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