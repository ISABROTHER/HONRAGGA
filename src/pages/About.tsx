import { useEffect, useRef } from 'react';
import { School, Briefcase, Award, Landmark, CheckSquare, Users, Star, Eye, BarChart3, GraduationCap } from 'lucide-react'; // Added BarChart3, GraduationCap

// Helper component for timeline items
const TimelineItem = ({ icon: Icon, title, institution, description }: { icon: React.ElementType, title: string, institution?: string, description: string }) => (
  <li className="mb-10 ms-6 relative before:absolute before:left-[-1.5rem] before:top-[0.1rem] before:w-px before:h-full before:bg-gray-300 first:before:top-[1.2rem] last:before:h-[1.2rem]">
    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-[2.6rem] ring-4 ring-white">
      <Icon className="w-4 h-4 text-blue-700" />
    </span>
    <h3 className="flex items-center mb-1 text-lg font-semibold text-blue-900">
      {title} {institution && <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">{institution}</span>}
    </h3>
    <p className="text-sm font-normal text-gray-600">{description}</p>
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

        {/* Section 1: Roots & Educational Journey */}
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-green-800 mb-6 border-b-2 border-amber-500 pb-2 inline-block">Roots & Educational Journey</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            My story begins in Apewosika, a quiet community in Cape Coast, where family, faith and community taught me humility, perseverance and purpose. From a young age, I came to see education not only as a way to grow personally but as a means to lift others and build stronger communities. That belief has guided my journey.
          </p>
          {/* Timeline Replaced by Table Below */}
        </AnimatedSection>

        {/* Section 1.5: Educational Qualifications Table */}
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
                                <td className="px-6 py-3">{edu.