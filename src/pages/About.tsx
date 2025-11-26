import { useEffect, useRef } from 'react';
import { 
  School, 
  Briefcase, 
  Award, 
  Landmark, 
  CheckSquare, 
  Users, 
  Star, 
  Eye, 
  BarChart3, 
  GraduationCap, 
  MapPin, 
  User, 
  Smile, 
  Briefcase as DesignationIcon, 
  Megaphone, 
  Flag,
  Phone 
} from 'lucide-react';

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

// Simple type for Assembly Members
type AssemblyMember = {
  area: string;
  name: string;
  phone: string;
  photoUrl: string;
};

// Placeholder data – replace with real Assemblymen details when ready
const assemblyMembers: AssemblyMember[] = [
  {
    area: "Abakam – Ola University Electoral Area",
    name: "Assembly Member (Update Name)",
    phone: "0XX XXX XXXX",
    photoUrl: "https://via.placeholder.com/600x800.png?text=Assembly+Member"
  },
  {
    area: "Efutu – Kakomdo – Mempeasem Electoral Area",
    name: "Assembly Member (Update Name)",
    phone: "0XX XXX XXXX",
    photoUrl: "https://via.placeholder.com/600x800.png?text=Assembly+Member"
  },
  {
    area: "Abura – Adisadel – Pedu – Nkafoa Electoral Area",
    name: "Assembly Member (Update Name)",
    phone: "0XX XXX XXXX",
    photoUrl: "https://via.placeholder.com/600x800.png?text=Assembly+Member"
  },
  // add more when you have them
];

const heroDesktopUrl = "https://i.imgur.com/6rWU7qN.png";
const heroMobileUrl = "https://i.imgur.com/abKZDVv.png";
// Single portrait image for MP information (do not interchange)
const mpPortraitUrl = "https://i.imgur.com/5H0XBuV.jpeg";

export function About() {
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
       { institution: "University of Cape Coast", position: "Senior Lecturer" },
       { institution: "GOIL PLC (Ghana Oil Company)", position: "Board Member" }
   ];

  // Helper to format date string (MM-YYYY or YYYY) -> Year
  const getYear = (dateStr: string) => {
      if (!dateStr) return 'N/A';
      const parts = dateStr.split('-');
      return parts.length > 1 ? parts[1] : dateStr; // Assumes YYYY or MM-YYYY
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - responsive images */}
      <section className="relative w-full h-auto min-h-[260px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden flex items-end">
        {/* Mobile hero */}
        <img
          src={heroMobileUrl}
          alt="Cape Coast North Leadership - mobile"
          className="absolute inset-0 w-full h-full object-cover object-center md:hidden"
        />
        {/* Desktop hero */}
        <img
          src={heroDesktopUrl}
          alt="Cape Coast North Leadership - desktop"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        />
        {/* Subtle gradient overlay to improve text visibility if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Text Overlay */}
        <div className="relative z-10 w-full text-center text-white pb-6 md:pb-10 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-1 drop-shadow-lg [text-shadow:_0_3px_6px_rgb(0_0_0_/_70%)]">
                KNOW YOUR LEADERSHIP
            </h2>
            <p className="text-sm md:text-base lg:text-lg font-medium text-amber-200 drop-shadow-md [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
                Hon. Dr. Kwamena Minta Nyarku and the Assembly Members of Cape Coast North
            </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16">

        {/* MP Welcome / Summary Card */}
        <AnimatedSection>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7 flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-green-100 shadow-md bg-gray-100">
                <img
                  src={mpPortraitUrl}
                  alt="Hon. Dr. Kwamena Minta Nyarku portrait"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green-700 mb-1">
                  Member of Parliament
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                  Hon. Dr. Kwamena Minta Nyarku (Ragga)
                </h1>
                <p className="text-sm font-medium text-slate-700">
                  MP for Cape Coast North · National Democratic Congress (NDC)
                </p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Welcome to the official page of the Member of Parliament for Cape Coast North. 
                This space is for every resident, student, worker and visitor who believes our 
                constituency can be fairer, safer and more hopeful for all.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Here, you can get to know your MP, learn about his work in Parliament and in the 
                constituency, and see how Assembly Members and local leaders are partnering with 
                the MP&apos;s office to address everyday issues across our communities.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-green-50 text-green-800 border border-green-100">
                  Apewosika · Cape Coast North
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100">
                  Obiara Ka Ho (Everyone is involved)
                </span>
              </div>
              <div className="pt-2">
                <a
                  href="/about/full-profile"
                  className="inline-flex items-center text-sm font-semibold text-[#FF6B00] hover:text-[#E66000] underline underline-offset-4"
                >
                  View full profile &amp; service record
                </a>
                <p className="text-[11px] text-gray-500 mt-1">
                  This link can lead to a dedicated page with the complete profile, education, employment history and parliamentary work.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* SECTION: Who handles your issues */}
        <AnimatedSection delay={50}>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
            Who Handles Your Issues?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MP Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-green-100 bg-gray-100">
                  <img
                    src={mpPortraitUrl}
                    alt="Hon. Dr. Kwamena Minta Nyarku"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Your Member of Parliament
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Hon. Dr. Kwamena Minta Nyarku (Ragga)
                  </p>
                  <p className="text-xs text-gray-600">
                    MP for Cape Coast North
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                All issues submitted on this platform are received by the MP&apos;s office. 
                Some matters are handled directly by the MP&apos;s team; others are delivered 
                through Assembly Members, departments and agencies for action.
              </p>
              <p className="text-xs text-gray-500">
                The goal is simple: every genuine concern should find its way to the right desk.
              </p>
            </div>

            {/* Assemblymen Role Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Your Assembly Members
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Local Representatives in Each Electoral Area
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Assembly Members are the first point of contact for day-to-day community issues 
                such as drains, streetlights, sanitation, and local projects. They work closely 
                with the MP&apos;s office so that no community is left behind.
              </p>
              <p className="text-xs text-gray-500">
                Issues can be followed up directly with your Assembly Member, or through 
                the MP&apos;s office, depending on the nature of the problem.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Assembly Members grid in portrait style */}
        <AnimatedSection delay={120}>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Assembly Members in Cape Coast North
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Each electoral area has an Assembly Member who represents residents at the local level. 
            These portraits help you put a face to the name. You can contact them directly, or raise 
            your concern through the MP&apos;s office using the issues page.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {assemblyMembers.map((member) => (
              <div
                key={member.area}
                className="flex flex-col items-center text-center"
              >
                <div className="w-full aspect-[3/4] bg-amber-50 overflow-hidden">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500 uppercase">
                    Assembly Member
                  </p>
                  <p className="text-xs font-black text-gray-900 leading-snug uppercase">
                    {member.name}
                  </p>
                  <p className="text-[11px] text-gray-700 leading-snug">
                    {member.area}
                  </p>
                  <p className="text-[11px] text-gray-600 flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* FULL MP INFORMATION SECTION (kept under MP, good for future full-page) */}
        <AnimatedSection delay={180}>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
            Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <ProfileItem icon={User} label="Full Name" value="Hon. Dr. Kwamena Minta Nyarku, PhD" />
            <ProfileItem icon={Smile} label="Nickname" value="Ragga" />
            <ProfileItem icon={Flag} label="Nationality" value="Ghanaian" />
            <ProfileItem icon={DesignationIcon} label="Designation" value="MP for Cape Coast North" />
            <ProfileItem icon={MapPin} label="Place of Birth" value="Apewosika, Cape Coast" />
            <ProfileItem icon={Megaphone} label="Slogan" value="Obiara Ka Ho (Everyone is involved)" />
          </div>
        </AnimatedSection>

        {/* Educational Qualifications */}
        <AnimatedSection delay={220}>
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
                  <tr
                    key={edu.institution}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}
                  >
                    <td className="px-6 py-3">
                      <span className="font-medium text-gray-900 block">{edu.institution}</span>
                      <div className="mt-1 text-gray-600">
                        <span className="mr-4">
                          Qualification:{" "}
                          <span className="font-medium">{edu.qualification}</span>
                        </span>
                        <span>
                          Year:{" "}
                          <span className="font-medium">{getYear(edu.completed)}</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Employment History */}
        <AnimatedSection delay={260}>
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
                  <tr
                    key={job.institution}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-100 last:border-b-0 hover:bg-gray-50`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {job.institution}
                    </td>
                    <td className="px-6 py-3">{job.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Service in Parliament */}
        <AnimatedSection delay={300}>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
            Service in Parliament
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Elected MP */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                <CheckSquare className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Elected MP (Cape Coast North)
                  </h4>
                  <ul className="list-none space-y-1 mb-3">
                    {electionResults.map((result) => (
                      <li
                        key={result.year}
                        className="text-sm text-gray-600 flex items-center flex-wrap"
                      >
                        <span className="font-semibold text-gray-800 mr-2">
                          {result.year}:
                        </span>
                        <span className="text-green-700 font-medium mr-2">
                          {result.nyarkuVotes} votes ({result.nyarkuPercent})
                        </span>
                        <span className="text-blue-800">
                          (Margin: {result.margin})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Party Affiliation */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm">
                <Users className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900">Party Affiliation</h4>
                  <p className="text-sm text-gray-600">
                    National Democratic Congress (NDC)
                  </p>
                </div>
              </div>

              {/* Parliamentary Committees */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start shadow-sm md:col-span-2">
                <Landmark className="w-6 h-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Parliamentary Committees
                  </h4>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-700">
                      Member, Committee on Defence & Interior.
                    </p>
                    <p className="text-sm text-gray-700">
                      Member, Committee on Environment, Science & Technology.
                    </p>
                    <p className="text-sm text-gray-700">
                      Member, Committee on Ways & Means.
                    </p>
                    <p className="text-sm text-gray-700">
                      Vice-Chairman, Committee of Petitions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Vision / Welcome Philosophy */}
        <AnimatedSection delay={340}>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">
            My Vision
          </h2>
          <blockquote className="relative p-6 bg-gradient-to-r from-blue-50 to-white border-l-4 border-amber-500 italic rounded-r-lg shadow-sm">
            <Eye className="absolute top-4 right-4 w-8 h-8 text-amber-300 opacity-50" />
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              "For me, leadership is not about titles or recognition. It is about what endures
              after one’s service, the systems, opportunities and hope that remain."
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              "My vision is to help build a Cape Coast North where fairness, opportunity and
              respect are shared by all, where everyone feels they belong and every young person
              knows their dream matters."
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
