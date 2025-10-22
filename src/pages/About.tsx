import { useEffect, useRef } from 'react';
import { School, Briefcase, Award, Landmark, CheckSquare, Users, Star, Eye, BarChart3, GraduationCap, MapPin, User, Smile, Briefcase as DesignationIcon, Megaphone } from 'lucide-react';

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

// Helper component for Profile items
const ProfileItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start space-x-3">
        <Icon className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0"/>
        <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</h4>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    </div>
);


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

        {/* Section 1: Profile Grid */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ProfileItem icon={User} label="Full Name" value="Hon. Dr. Kwamena Minta Nyarku, PhD" />
                <ProfileItem icon={Smile} label="Nickname" value="Ragga" />
                <ProfileItem icon={DesignationIcon} label="Designation" value="MP for Cape Coast North" />
                <ProfileItem icon={Megaphone} label="Slogan" value="Obiara Ka Ho (Everyone is involved)" />
                <ProfileItem icon={MapPin} label="Place of Birth" value="Apewosika, Cape Coast" />
          </div>
          <p className="text-gray-700 leading-relaxed">
            My story begins in Apewosika, where family, faith and community taught me humility, perseverance and purpose. From a young age, I came to see education not only as a way to grow personally but as a means to lift others and build stronger communities. That belief has guided my journey.
          </p>
        </AnimatedSection>

        {/* Section 2: Educational Qualifications Table */}
        <AnimatedSection delay={100}>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Educational Qualifications</h3>
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Institution & Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationData.map((edu, index) => (
                            <tr key={edu.institution} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}>
                                <td className="px-6 py-3 whitespace-nowrap">
                                    <span className="font-medium text-gray-900 mr-4">{edu.institution}</span>
                                    <span className="text-gray-600 mr-4">Qualification: <span className="font-medium">{edu.qualification}</span></span>
                                    <span className="text-gray-600">Year: <span className="font-medium">{getYear(edu.completed)}</span></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </AnimatedSection>

        {/* Section 3: Employment History Table */}
         <AnimatedSection delay={200}>
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Employment History</h3>
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-blue-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Institution</th>
                            <th scope="col" className="px-6 py-3">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employmentData.map((job, index) => (
                            <tr key={job.institution} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}>
                                <td className="px-6 py-3 font-medium text-gray-900">{job.institution}</td>
                                <td className="px-6 py-3">{job.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </AnimatedSection>

        {/* Section 4: Parliamentary Role & Election Results */}
        <AnimatedSection delay={300}>
            <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Service in Parliament</h2>
            <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Elected MP */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <CheckSquare className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Elected MP (Cape Coast North)</h4>
                            <ul className="list-none space-y-1 mb-3">
                                {electionResults.map(result => (
                                    <li key={result.year} className="text-sm text-gray-600 flex items-center flex-wrap">
                                         <span className="font-semibold text-gray-800 mr-2">{result.year}:</span>
                                         <span className="text-green-700 font-medium mr-2">{result.nyarkuVotes} votes ({result.nyarkuPercent})</span>
                                         <span className="text-blue-800">(Margin: {result.margin})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Party Affiliation */}
                     <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm"> {/* Adjusted grid positioning */}
                        <Users className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-blue-900">Party Affiliation</h4>
                            <p className="text-sm text-gray-600">National Democratic Congress (NDC)</p>
                        </div>
                    </div>

                    {/* Parliamentary Committees - Updated List */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm md:col-span-2"> {/* Span across columns */}
                        <Landmark className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                         <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Parliamentary Committees</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li className="text-sm text-gray-600">Member, Committee on Defence & Interior</li>
                                <li className="text-sm text-gray-600">Member, Committee on Environment, Science & Technology</li>
                                <li className="text-sm text-gray-600">Member, Committee on Ways & Means</li>
                                <li className="text-sm text-gray-600">Vice-Chairman, Committee of Petitions</li> {/* Added new item */}
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