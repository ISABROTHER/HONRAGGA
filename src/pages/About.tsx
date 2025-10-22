import { useEffect, useRef } from 'react';
import { School, Briefcase, Award, Landmark, CheckSquare, Users, Star, Eye, BarChart3, GraduationCap } from 'lucide-react'; // Added Briefcase

// Helper component for timeline items
const TimelineItem = ({ icon: Icon, title, institution, description, children }: { icon: React.ElementType, title: string, institution?: string, description?: string | React.ReactNode, children?: React.ReactNode }) => (
  <li className="mb-10 ms-6 relative before:absolute before:left-[-1.5rem] before:top-[0.1rem] before:w-px before:h-full before:bg-gray-300 first:before:top-[1.2rem] last:before:h-[1.2rem]">
    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-[2.6rem] ring-4 ring-white">
      <Icon className="w-4 h-4 text-blue-700" />
    </span>
    <h3 className="flex items-center mb-1 text-lg font-semibold text-blue-900">
      {title} {institution && <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">{institution}</span>}
    </h3>
    {description && <p className="text-sm font-normal text-gray-600">{description}</p>}
    {children}
  </li>
);

// Helper component for animated sections
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-section-enter');
                    entry.target.classList.remove('opacity-0', 'translate-y-5');
                    observer.unobserve(entry.target); // Animate only once
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        const currentRef = ref.current;
        if (currentRef) {
            currentRef.classList.add('opacity-0', 'translate-y-5');
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return <div ref={ref} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}


export function About() {
  const heroImageUrl = "https://i.imgur.com/5H0XBuV.jpeg"; // New hero image

  // Election Results Data
  const electionResults = [
    {
        year: 2020,
        nyarkuVotes: "22,972",
        nyarkuPercent: "51.48%",
        opponentVotes: "21,643",
        opponentPercent: "48.51%",
        margin: "1,329"
    },
    {
        year: 2024,
        nyarkuVotes: "23,521",
        nyarkuPercent: "57.6%",
        opponentVotes: "17,045",
        opponentPercent: "41.7%",
        margin: "6,476"
    }
  ];

  // Educational Qualifications Data
  const educationData = [
      { institution: "University of Ghana Business School", qualification: "PhD", completed: "07-2019" },
      { institution: "University of Leicester, UK", qualification: "MBA", completed: "09-2003" },
      { institution: "University of Cape Coast", qualification: "Bachelor of Education", completed: "06-2000" },
      { institution: "Worker College", qualification: "A Level", completed: "09-1996" },
      { institution: "Komenda Training College", qualification: "Teacher Certificate A", completed: "06-1995" },
      { institution: "Adisadel College", qualification: "GCE O Level", completed: "09-1992" },
  ];

   // Employment Data
   const employmentData = [
       { institution: "University of Cape Coast", position: "Senior Lecturer" }
   ];


  // Helper to format date string (MM-YYYY or YYYY) -> Year
  const getYear = (dateStr: string) => {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      return parts.length > 1 ? parts[1] : dateStr; // Assumes YYYY or MM-YYYY
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Just an image */}
      <section className="relative w-full h-auto min-h-[250px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
        <img
          src={heroImageUrl}
          alt="Hon. Dr. Kwamena Minta Nyarku - About Me Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </section>


      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16">

        {/* Section 1: Roots */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Roots & Journey</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            My story begins in Apewosika, a quiet community in Cape Coast, where family, faith and community taught me humility, perseverance and purpose. From a young age, I came to see education not only as a way to grow personally but as a means to lift others and build stronger communities. That belief has guided my journey.
          </p>
        </AnimatedSection>

        {/* Section 2: Educational Qualifications Table */}
        <AnimatedSection delay={100}>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Educational Qualifications</h3>
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Institution</th>
                            <th scope="col" className="px-6 py-3">Qualification</th>
                            <th scope="col" className="px-6 py-3 text-right">Year Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationData.map((edu) => (
                            <tr key={edu.institution} className="bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gray-900">{edu.institution}</td>
                                <td className="px-6 py-3">{edu.qualification}</td>
                                <td className="px-6 py-3 text-right">{getYear(edu.completed)}</td>
                            </tr>
                        ))}
                         {/* Manually add UCC specific info from old timeline */}
                        <tr className="bg-blue-50 border-b border-gray-100 last:border-b-0">
                             <td className="px-6 py-3 font-medium text-gray-900">University of Cape Coast</td>
                             <td className="px-6 py-3 italic text-blue-800" colSpan={2}> {/* Spanning 2 columns for emphasis */}
                                <Star className="w-3 h-3 inline mr-1 text-amber-500" /> Served as <span className="font-semibold">JCRC President</span> of Casely Hayford Hall (Casford)
                            </td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </AnimatedSection>

        {/* Section 3: Employment History Table */}
         <AnimatedSection delay={200}>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Employment History</h3>
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Institution</th>
                            <th scope="col" className="px-6 py-3">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentData.map((job) => (
                            <tr key={job.institution} className="bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gray-900">{job.institution}</td>
                                <td className="px-6 py-3">{job.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
             <p className="text-gray-700 mt-6 leading-relaxed">
                 Before entering politics, my role as a Senior Lecturer allowed me to mentor students and see how ideas connect with the realities of Ghana’s markets, classrooms and communities. I saw the effort of traders, farmers and young people trying to make things work. That connection made me step out and serve in a bigger way.
             </p>
        </AnimatedSection>

        {/* Section 4: Parliamentary Role & Election Results */}
        <AnimatedSection delay={300}>
            <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Service in Parliament</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
                In 2020, the people of Cape Coast North elected me as their Member of Parliament on the ticket of the National Democratic Congress (NDC), and in 2024 they renewed that trust. My focus has always been on what changes lives most: quality education, good roads, reliable healthcare, clean surroundings and opportunities for the youth.
            </p>
            {/* Combined Info Blocks and Table */}
            <div className="space-y-6">
                {/* MP Info Blocks - Now a Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Elected MP */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <CheckSquare className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-blue-900">Elected MP</h4>
                            <p className="text-sm text-gray-600">Cape Coast North (2020, Re-elected 2024)</p>
                        </div>
                    </div>

                    {/* Election Results Table - Positioned after Elected MP */}
                     <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm row-start-2 md:row-start-auto md:col-start-2"> {/* Positioning */}
                         <div className="flex items-center mb-3">
                            <BarChart3 className="w-6 h-6 text-blue-700 mr-3 flex-shrink-0"/>
                            <h4 className="font-semibold text-blue-900">Election Results</h4>
                         </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="text-xs text-gray-500 uppercase border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-4 py-2">Year</th>
                                        <th scope="col" className="px-4 py-2">Votes (NDC)</th>
                                        <th scope="col" className="px-4 py-2">Margin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {electionResults.map((result) => (
                                        <tr key={result.year} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900">{result.year}</th>
                                            <td className="px-4 py-3 font-semibold text-green-700">{result.nyarkuVotes} ({result.nyarkuPercent})</td>
                                            <td className="px-4 py-3 font-medium text-blue-800">{result.margin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                     </div>

                    {/* Party Affiliation */}
                     <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm row-start-3 md:row-start-auto md:col-start-1"> {/* Positioning */}
                        <Users className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-blue-900">Party Affiliation</h4>
                            <p className="text-sm text-gray-600">National Democratic Congress (NDC)</p>
                        </div>
                    </div>

                    {/* Parliamentary Committees - Now with Bullets */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm md:col-span-2 row-start-4 md:row-start-auto"> {/* Positioning */}
                        <Landmark className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Parliamentary Committees</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li className="text-sm text-gray-600">Defence & Interior</li>
                                <li className="text-sm text-gray-600">Environment, Science & Technology</li>
                                <li className="text-sm text-gray-600">Ways & Means</li>
                            </ul>
                        </div>
                    </div>

                 </div>
             </div>
        </AnimatedSection>

        {/* Section 5: Vision */}
        <AnimatedSection delay={400}> {/* Adjusted delay */}
            <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">My Vision</h2>
            <blockquote className="relative p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-amber-500 italic rounded-r-lg shadow-sm">
                <Eye className="absolute top-4 right-4 w-8 h-8 text-amber-300 opacity-50" />
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    "For me, leadership is not about titles or recognition. It is about what endures after one’s service, the systems, opportunities and hope that remain."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    "My vision is to help build a Cape Coast North where fairness, opportunity and respect are shared by all, where everyone feels they belong and every young person knows their dream matters."
                </p>
                 <footer className="mt-4 text-md font-semibold text-blue-800">
                    — Hon. Dr. Kwamena Minta Nyarku (Ragga)
                </footer>
            </blockquote>
        </AnimatedSection>

      </div>
       {/* CSS for animations */}
      <style>{`
        .animate-section-enter {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}