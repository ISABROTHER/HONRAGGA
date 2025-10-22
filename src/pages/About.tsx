import { useEffect, useRef } from 'react';
import { School, Briefcase, Award, Landmark, CheckSquare, Users, Star, Eye, BarChart3, GraduationCap, MapPin, User, Smile, Briefcase as DesignationIcon, Megaphone, Flag } from 'lucide-react';

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
const ProfileItem = ({ icon: Icon, label, value, baseFontSize }: { icon: React.ElementType, label: string, value: string, baseFontSize: number }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start space-x-3">
        <Icon className="w-5 h-5 text-blue-700 mt-1 flex-shrink-0"/>
        <div>
             {/* Adjusted font size using baseFontSize */}
            <h4 className="font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: `${baseFontSize * 0.75}rem` }}>{label}</h4>
            <p className="font-medium text-gray-800" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>{value}</p>
        </div>
    </div>
);


export function About() {
  const heroImageUrl = "https://i.imgur.com/5H0XBuV.jpeg";

  // --- SCALING CONTROLS ---
  const baseFontSize = 1;         // 🔧 Base font size in rem (e.g., 1rem = 16px). Paragraphs use this.
  const headingScale = 1.875;     // 🔧 Multiplier for main section headings (h2). Default: 1.875 (maps to text-3xl)
  const subHeadingScale = 1.25;   // 🔧 Multiplier for sub-headings (h3, h4). Default: 1.25 (maps to text-xl/lg)
  const spacingScale = 1;         // 🔧 Multiplier for vertical space between sections and margins. 1 = default (space-y-16 -> 4rem).
  // --- END SCALING CONTROLS ---

  // Election Results Data
  const electionResults = [
    { year: 2020, nyarkuVotes: "22,972", nyarkuPercent: "51.48%", margin: "1,329" },
    { year: 2024, nyarkuVotes: "23,521", nyarkuPercent: "57.6%", margin: "6,476" }
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
       { institution: "University of Cape Coast", position: "Senior Lecturer" },
       { institution: "GOIL PLC (Ghana Oil Company)", position: "Board Member" }
   ];


  // Helper to format date string -> Year
  const getYear = (dateStr: string) => {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      return parts.length > 1 ? parts[1] : dateStr;
  }

  // Calculate dynamic spacing values
  const sectionSpacing = `${4 * spacingScale}rem`; // Original space-y-16 is 4rem
  const headingMarginBottom = `${1.5 * spacingScale}rem`; // Original mb-6 is 1.5rem
  const subHeadingMarginBottom = `${1 * spacingScale}rem`; // Original mb-4 is 1rem


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-auto min-h-[250px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden flex items-end">
        <img
          src={heroImageUrl}
          alt="Hon. Dr. Kwamena Minta Nyarku - About Me Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent"></div>
        <div className="relative z-10 w-full text-center text-white pb-8 px-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-2 drop-shadow-lg [text-shadow:_0_3px_6px_rgb(0_0_0_/_70%)]">
                KNOW YOUR MP
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-300 drop-shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
                HON. DR. KWAMENA MINTA NYARKU
            </p>
        </div>
      </section>


      {/* Main Content Sections - Using dynamic spacing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20" style={{ display: 'flex', flexDirection: 'column', gap: sectionSpacing }}>

        {/* Section 1: Profile Grid */}
        <AnimatedSection>
          {/* Using dynamic font size and margin */}
          <h2 className="font-bold text-green-800 border-b-2 border-amber-500 pb-2 inline-block" style={{ fontSize: `${baseFontSize * headingScale}rem`, marginBottom: headingMarginBottom }}>Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Removed mb-6 */}
                {/* Passing baseFontSize to ProfileItem */}
                <ProfileItem icon={User} label="Full Name" value="Hon. Dr. Kwamena Minta Nyarku, PhD" baseFontSize={baseFontSize} />
                <ProfileItem icon={DesignationIcon} label="Designation" value="MP for Cape Coast North" baseFontSize={baseFontSize}/>
                <ProfileItem icon={Megaphone} label="Slogan" value="Obiara Ka Ho (Everyone is involved)" baseFontSize={baseFontSize}/>
                <ProfileItem icon={MapPin} label="Place of Birth" value="Apewosika, Cape Coast" baseFontSize={baseFontSize}/>
                <ProfileItem icon={Flag} label="Nationality" value="Ghanaian" baseFontSize={baseFontSize}/>
          </div>
        </AnimatedSection>

        {/* Section 2: Educational Qualifications Table */}
        <AnimatedSection delay={100}>
             {/* Using dynamic font size and margin */}
            <h3 className="font-semibold text-blue-900" style={{ fontSize: `${baseFontSize * subHeadingScale * 1.2}rem`, marginBottom: subHeadingMarginBottom }}>Educational Qualifications</h3> {/* Slightly larger sub-heading */}
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}> {/* Base table font size */}
                    <thead className="text-xs text-gray-500 uppercase bg-blue-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Institution & Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {educationData.map((edu, index) => (
                            <tr key={edu.institution} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}>
                                <td className="px-6 py-3">
                                    <span className="font-medium text-gray-900 block">{edu.institution}</span>
                                    <div className="mt-1 text-gray-600">
                                        <span className="mr-4">Qualification: <span className="font-medium text-gray-800">{edu.qualification}</span></span> {/* Emphasized value */}
                                        <span>Year: <span className="font-medium text-gray-800">{getYear(edu.completed)}</span></span> {/* Emphasized value */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </AnimatedSection>

        {/* Section 3: Employment History Table */}
         <AnimatedSection delay={200}>
            {/* Using dynamic font size and margin */}
            <h3 className="font-semibold text-blue-900" style={{ fontSize: `${baseFontSize * subHeadingScale * 1.2}rem`, marginBottom: subHeadingMarginBottom }}>Employment History</h3>
             <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full text-left text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}> {/* Base table font size */}
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
             {/* Using dynamic font size and margin */}
            <h2 className="font-bold text-green-800 border-b-2 border-amber-500 pb-2 inline-block" style={{ fontSize: `${baseFontSize * headingScale}rem`, marginBottom: headingMarginBottom }}>Service in Parliament</h2>
            {/* Using dynamic spacing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: `${1.5 * spacingScale}rem` }}> {/* space-y-6 equivalent */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Elected MP */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <CheckSquare className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                             {/* Using dynamic font size */}
                            <h4 className="font-semibold text-blue-900 mb-1" style={{ fontSize: `${baseFontSize * subHeadingScale}rem` }}>Elected MP (Cape Coast North)</h4>
                            <ul className="list-none space-y-1 mb-3">
                                {electionResults.map(result => (
                                    <li key={result.year} className="text-gray-600 flex items-center flex-wrap" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>
                                         <span className="font-semibold text-gray-800 mr-2">{result.year}:</span>
                                         <span className="text-green-700 font-medium mr-2">{result.nyarkuVotes} votes ({result.nyarkuPercent})</span>
                                         <span className="text-blue-800">(Margin: {result.margin})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Party Affiliation */}
                     <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                        <Users className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                        <div>
                             {/* Using dynamic font size */}
                            <h4 className="font-semibold text-blue-900" style={{ fontSize: `${baseFontSize * subHeadingScale}rem` }}>Party Affiliation</h4>
                            <p className="text-gray-600" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>National Democratic Congress (NDC)</p>
                        </div>
                    </div>

                    {/* Parliamentary Committees */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm md:col-span-2">
                        <Landmark className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0"/>
                         <div>
                             {/* Using dynamic font size */}
                            <h4 className="font-semibold text-blue-900 mb-2" style={{ fontSize: `${baseFontSize * subHeadingScale}rem` }}>Parliamentary Committees</h4>
                             <div className="space-y-1.5">
                                 <p className="text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>Member, Committee on Defence & Interior.</p>
                                 <p className="text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>Member, Committee on Environment, Science & Technology.</p>
                                 <p className="text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>Member, Committee on Ways & Means.</p>
                                 <p className="text-gray-700" style={{ fontSize: `${baseFontSize * 0.875}rem` }}>Vice-Chairman, Committee of Petitions.</p>
                             </div>
                        </div>
                    </div>

                 </div>
             </div>
        </AnimatedSection>

        {/* Section 5: Vision */}
        <AnimatedSection delay={400}>
             {/* Using dynamic font size and margin */}
            <h2 className="font-bold text-green-800 border-b-2 border-amber-500 pb-2 inline-block" style={{ fontSize: `${baseFontSize * headingScale}rem`, marginBottom: headingMarginBottom }}>My Vision</h2>
            <blockquote className="relative p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-amber-500 italic rounded-r-lg shadow-sm">
                <Eye className="absolute top-4 right-4 w-8 h-8 text-amber-300 opacity-50" />
                 {/* Using dynamic font size */}
                <p className="text-gray-700 leading-relaxed mb-4" style={{ fontSize: `${baseFontSize * 1.125}rem` }}> {/* text-lg equivalent */}
                    "For me, leadership is not about titles or recognition. It is about what endures after one’s service, the systems, opportunities and hope that remain."
                </p>
                <p className="text-gray-700 leading-relaxed" style={{ fontSize: `${baseFontSize * 1.125}rem` }}>
                    "My vision is to help build a Cape Coast North where fairness, opportunity and respect are shared by all, where everyone feels they belong and every young person knows their dream matters."
                </p>
                 <footer className="mt-4 font-semibold text-blue-800" style={{ fontSize: `${baseFontSize}rem` }}> {/* text-md equivalent is base */}
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