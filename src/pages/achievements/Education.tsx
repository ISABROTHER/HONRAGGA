const initiatives = [
  {
    title: "High School Support Program",
    info: "Implementation of a comprehensive assistance program for senior high students across the constituency to ensure academic success.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Adisadel College Lighting",
    info: "Donation of 500 LED bulbs to alleviate persistent lighting challenges in classrooms and dormitories.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "Dual Desks Donation",
    info: "Provision of 100 high-quality dual desks to 10 basic schools to end the struggle of students sitting on the floor.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  },
  {
    title: "School Renovations",
    info: "Major infrastructure repairs and fresh painting for dilapidated school buildings in rural areas.",
    image: "https://i.imgur.com/Ozjnrli.jpeg"
  }
];

export function Education() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {initiatives.map((item, idx) => (
        <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col">
          {/* 1. Picture */}
          <img src={item.image} alt={item.title} className="w-full h-52 object-cover" />
          
          <div className="p-6">
            {/* 2. Title */}
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
              {item.title}
            </h3>
            
            {/* 3. Information */}
            <p className="text-slate-600 leading-relaxed font-medium">
              {item.info}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}