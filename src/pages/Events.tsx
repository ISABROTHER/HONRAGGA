import { useEffect, useRef } from 'react';
import { School, Briefcase, Award, Landmark, CheckSquare, Users, Star, Eye, BarChart3, GraduationCap, MapPin, User, Smile, Briefcase as DesignationIcon, Megaphone, Flag } from 'lucide-react'; // Added Flag

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
          {/* Reordered Profile Items and Added Nationality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ProfileItem icon={User} label="Full Name" value="Hon. Dr. Kwamena Minta Nyarku, PhD" />
                <ProfileItem icon={Smile} label="Nickname" value="Ragga" />
                <ProfileItem icon={Flag} label="Nationality" value="Ghanaian" />
                <ProfileItem icon={Design