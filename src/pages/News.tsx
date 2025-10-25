import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../lib/supabase'; // Import supabase client
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Road, School, HeartPulse, Zap, Users, Building, ShieldCheck, // Category Icons
  MapPin, Camera, AlertTriangle, AlertCircle, CheckCircle, Upload, // Form/Status Icons
  ArrowLeft, Send, ListChecks, ChevronDown, ChevronUp, X, Mail, Phone, Hash // UI Icons
} from 'lucide-react';

// --- Data Structure for Categories & Subcategories ---
type Subcategory = { value: string; label: string };
type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  subcategories: Subcategory[];
};

// Data based on user prompt
const categories: Category[] = [
  { id: 'roads', label: 'Roads & Infrastructure', icon: Road, subcategories: [
    { value: 'potholes', label: 'Potholes / Damaged Road' },
    { value: 'unfinished_road', label: 'Unfinished Road Project' },
    { value: 'drainage', label: 'Blocked / Broken Drainage' },
    { value: 'streetlight', label: 'Streetlight Not Working' },
    { value: 'bridge_culvert', label: 'Damaged Bridge / Culvert' },
    { value: 'flooding', label: 'Flooding After Rain' },
    { value: 'crossings_markings', label: 'Lack of Pedestrian Crossings / Markings' },
    { value: 'waste_collection', label: 'Poor Waste Collection / Litter Overflow' },
  ]},
  { id: 'education', label: 'Education & Schools', icon: School, subcategories: [
    { value: 'broken_furniture', label: 'Broken Desks / Chairs / Roofs' },
    { value: 'shortage', label: 'Shortage of Teachers / Textbooks' },
    { value: 'sanitation_school', label: 'Poor School Sanitation' },
    { value: 'unsafe_structure', label: 'Unsafe Learning Structure (e.g., under trees)' },
    { value: 'need_facilities', label: 'Need for ICT Lab / Library / Water' },
    { value: 'delayed_support', label: 'Delayed Govt. Support (Feeding, Bursaries)' },
  ]},
  { id: 'health', label: 'Health & Sanitation', icon: HeartPulse, subcategories: [
    { value: 'clinic_chps_issue', label: 'Non-functioning Clinic / CHPS' },
    { value: 'lack_staff_drugs', label: 'Lack of Drugs / Nurses / Midwives' },
    { value: 'water_sanitation_health', label: 'Water / Sanitation Problem (Borehole, Toilet)' },
    { value: 'waste_dumping', label: 'Improper Waste Dumping / Burning' },
    { value: 'mosquito_malaria', label: 'Mosquito Breeding Areas / Malaria Concerns' },
    { value: 'unsafe_transport', label: 'Unsafe Maternity / Emergency Transport' },
  ]},
  { id: 'utilities', label: 'Utilities & Environment', icon: Zap, subcategories: [
    { value: 'power_outage', label: 'Power Outage / Faulty Transformer' },
    { value: 'water_shortage', label: 'Water Shortage / Burst Pipe' },
    { value: 'refuse_disposal', label: 'Improper Refuse Disposal / Landfill Overflow' },
    { value: 'environment_damage', label: 'Deforestation / Sand Winning' },
    { value: 'pollution', label: 'Air / Noise Pollution' },
    { value: 'public_toilet_shortage', label: 'Inadequate Public Toilets' },
  ]},
  { id: 'social', label: 'Youth, Jobs & Social Welfare', icon: Users, subcategories: [
    { value: 'unemployment_hiring', label: 'Unemployment / Unfair Hiring' },
    { value: 'group_support_needed', label: 'Youth / Women Group Needs Support' },
    { value: 'abandoned_program', label: 'Abandoned Livelihood Program' },
    { value: 'delayed_grants', label: 'Delayed Grants / Support Packages' },
    { value: 'training_needed', label: 'Need for Entrepreneurship Training' },
    { value: 'child_protection', label: 'Child Protection / Abuse / Neglect Case' },
  ]},
  { id: 'community', label: 'Community Development', icon: Building, subcategories: [
    { value: 'abandoned_project', label: 'Abandoned Community Center / Project' },
    { value: 'market_facilities', label: 'Poor Market Facilities / Toilets' },
    { value: 'public_space_needed', label: 'Need for Public Seating / Parks / Lighting' },
    { value: 'broken_water_source', label: 'Broken Borehole / Water Tank / Pump' },
    { value: 'unkept_grounds', label: 'Unkept Cemetery / Community Grounds' },
    { value: 'security_concern', label: 'Security Concern (Theft, No Police Post)' },
    { value: 'traditional_dispute', label: 'Traditional Dispute Mediation Needed' },
  ]},
  { id: 'governance', label: 'Governance & Public Service', icon: ShieldCheck, subcategories: [
    { value: 'poor_conduct', label: 'Poor Conduct by Public Official' },
    { value: 'delayed_service', label: 'Delayed Govt. Forms / Permits' },
    { value: 'bribery_favouritism', label: 'Bribery / Favouritism in Public Office' },
    { value: 'no_response', label: 'Lack of Response to Previous Request' },
    { value: 'corruption_misuse', label: 'Corruption / Misuse of Public Resources' },
  ]},
];
// --- End Data Structure ---

type ReportStatus = 'Submitted' | 'In Progress' | 'Resolved';
type PriorityLevel = 'Normal' | 'Urgent' | 'Life-threatening';

// Define the structure for a submitted report
interface Report {
  id: string; // Unique ID (e.g., generated or from DB)
  trackingId: string; // User-facing tracking ID
  submittedAt: Date;
  category: Category; // Store the whole category object
  subcategory: Subcategory; // Store the whole subcategory object
  description: string;
  location: string;
  priority: PriorityLevel;
  photo?: File | null; // Optional photo
  photoPreview?: string; // For displaying uploaded image
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  status: ReportStatus;
}

// Initial form state
const initialReportData = {
  category: null as Category | null,
  subcategoryValue: '',
  description: '',
  location: '',
  priority: 'Normal' as PriorityLevel,
  photo: null as File | null,
  photoPreview: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
};

// --- Helper Components ---
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver( ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('animate-section-enter'); entry.target.classList.remove('opacity-0', 'translate-y-5'); observer.unobserve(entry.target); } }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }, ); const currentRef = ref.current; if (currentRef) { currentRef.classList.add('opacity-0', 'translate-y-5'); observer.observe(currentRef); } return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return ( <div ref={ref} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}> {children} </div> );
};

const StatusBadge = ({ status }: { status: ReportStatus }) => {
  const statusConfig = {
    Submitted: { icon: Send, color: 'bg-blue-100 text-blue-800', label: 'Submitted' },
    'In Progress': { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' },
    Resolved: { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Resolved' },
  };
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <config.icon className="-ml-0.5 mr-1.5 h-3 w-3" />
      {config.label}
    </span>
  );
};

// Helper to format timestamps relative to now (moved outside component)
function formatRelativeTime(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); // e.g., 25 Oct
}

// Helper to generate mock tracking ID
function generateTrackingId(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CCN-${year}${month}${day}-${random}`;
}

// --- Main Page Component ---
export function News() {
  const [reportData, setReportData] = useState(initialReportData);
  const [submittedReports, setSubmittedReports] = useState<Report[]>([]); // Local state for mock tracking
  const [loading, setLoading] = useState(false); // For form submission
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; trackingId?: string } | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock fetching existing reports on load
  useEffect(() => {
    // --- MOCK DATA ---
    const mockReports: Report[] = [
        { id: 'rep-001', trackingId: 'CCN-20251024-4J5B', submittedAt: new Date(Date.now() - 86400000 * 2), category: categories[0], subcategory: categories[0].subcategories[1], description: 'Road near market needs urgent repair.', location: 'Market Junction', priority: 'Urgent', status: 'In Progress', photoPreview: 'https://via.placeholder.com/100x100.png?text=Mock+1'},
        { id: 'rep-002', trackingId: 'CCN-20251021-9FGA', submittedAt: new Date(Date.now() - 86400000 * 5), category: categories[1], subcategory: categories[1].subcategories[0], description: 'Broken chairs in P6 classroom.', location: 'St. Peter\'s Basic School', priority: 'Normal', status: 'Resolved' },
        { id: 'rep-003', trackingId: 'CCN-20251026-T2D1', submittedAt: new Date(Date.now() - 3600000 * 3), category: categories[3], subcategory: categories[3].subcategories[0], description: 'Transformer sparking dangerously.', location: 'Adisadel Estate, Blk 5', priority: 'Life-threatening', status: 'Submitted' },
    ];
    setSubmittedReports(mockReports.sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime()));
    // --- END MOCK DATA ---
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReportData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category: Category) => {
    setReportData(prev => ({ ...initialReportData, category: category, priority: prev.priority }));
    setMessage(null); 
  };
  
  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
       setReportData(prev => ({ ...prev, priority: e.target.value as PriorityLevel }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
          setMessage({type: 'error', text: 'Image size should not exceed 5MB.'});
          if(fileInputRef.current) fileInputRef.current.value = "";
          return;
      }
      setReportData(prev => ({ ...prev, photo: file, photoPreview: URL.createObjectURL(file) }));
    } else {
      setReportData(prev => ({ ...prev, photo: null, photoPreview: '' }));
    }
  };

  const removePhoto = () => {
      setReportData(prev => ({ ...prev, photo: null, photoPreview: '' }));
      if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reportData.category || !reportData.subcategoryValue || !reportData.description || !reportData.location) {
      setMessage({ type: 'error', text: 'Please fill in all required fields (Issue Type, Description, Location).' });
      return;
    }
    setLoading(true);
    setMessage(null);

    const subcategory = reportData.category.subcategories.find(sc => sc.value === reportData.subcategoryValue);
    if (!subcategory) {
        setMessage({ type: 'error', text: 'Invalid subcategory selected.' });
        setLoading(false);
        return;
    }

    const trackingId = generateTrackingId();
    const newReport: Report = {
      id: `rep-${Date.now()}`, 
      trackingId: trackingId,
      submittedAt: new Date(),
      category: reportData.category,
      subcategory: subcategory, 
      description: reportData.description,
      location: reportData.location,
      priority: reportData.priority,
      photo: reportData.photo,
      photoPreview: reportData.photoPreview,
      contactName: reportData.contactName,
      contactPhone: reportData.contactPhone,
      contactEmail: reportData.contactEmail,
      status: 'Submitted',
    };

    /* --- SUPABASE INSERT (Placeholder) ---
    try {
        // 1. Upload photo
        let photoUrl: string | null = null;
        if (reportData.photo) {
             const fileExt = reportData.photo.name.split('.').pop();
             const fileName = `${Date.now()}.${fileExt}`;
             const filePath = `issues/${fileName}`;
             const { error: uploadError } = await supabase.storage
                 .from('issues') // BUCKET NAME: 'issues'
                 .upload(filePath, reportData.photo);
             if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`);
             const { data: urlData } = supabase.storage.from('issues').getPublicUrl(filePath);
             photoUrl = urlData.publicUrl;
        }

        // 2. Insert report
        const { error: insertError } = await supabase
            .from('constituent_reports') // TABLE NAME: 'constituent_reports'
            .insert([{
                tracking_id: trackingId,
                category_id: reportData.category.id,
                subcategory_value: reportData.subcategoryValue,
                description: reportData.description,
                location: reportData.location,
                priority: reportData.priority,
                photo_url: photoUrl,
                contact_name: reportData.contactName || null,
                contact_phone: reportData.contactPhone || null,
                contact_email: reportData.contactEmail || null,
                status: 'Submitted',
                submitted_at: newReport.submittedAt.toISOString(),
            }]);
        
        if (insertError) throw new Error(`Database insert failed: ${insertError.message}`);

        // If successful:
        setSubmittedReports(prev => [newReport, ...prev].sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime()));
        setMessage({ type: 'success', text: 'Report submitted successfully!', trackingId: trackingId });
        setShowSuccessModal(true); // Show success modal
        setReportData(initialReportData); // Reset form
        setShowContactInfo(false);

    } catch (err: any) {
        console.error("Error submitting report:", err);
        setMessage({ type: 'error', text: `Submission failed: ${err.message || 'Please try again.'}` });
    } finally {
        setLoading(false);
    }
    */

    // --- MOCK SUBMISSION ---
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    setSubmittedReports(prev => [newReport, ...prev].sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime()));
    setReportData(initialReportData); // Reset form
    setShowContactInfo(false); // Hide optional fields
    setMessage({ type: 'success', text: 'Report submitted successfully!', trackingId: trackingId });
    setShowSuccessModal(true); // Show success modal
    setLoading(false);
    // --- END MOCK ---
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}> 
      {/* Hero Section */}
       <section className="relative bg-green-900 text-white py-20 md:py-28">
           <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(800px 400px at 100% 20%, rgba(255,255,255,0.08), transparent 50%)', }} /> <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-[#FF6B00]/10" /> <AnimatedSection> <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-4 text-[#FF6B00]"> Report an Issue </h1> <div className="flex justify-center"><span className="h-1 w-20 md:w-24 rounded-full bg-white/50" /></div> <p className="mt-5 md:mt-6 text-lg md:text-xl text-green-100/90 max-w-3xl mx-auto leading-relaxed">Help us make Cape Coast North better—one report at a time.</p> </div> </AnimatedSection>
      </section>

      {/* Report Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
             {!reportData.category ? (
                 // --- Step 1: Category Selection ---
                 <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                     <AnimatedSection>
                         <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">
                            What type of issue are you reporting?
                         </h2>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    onClick={() => handleCategorySelect(cat)}
                                    className="flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] transition-all text-center group"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <cat.icon size={32} className="text-green-800 mb-2 transition-colors group-hover:text-[#FF6B00]"/>
                                    <span className="text-sm font-semibold text-green-900">{cat.label}</span>
                                </motion.button>
                            ))}
                         </div>
                     </AnimatedSection>
                 </motion.div>
             ) : (
                 // --- Step 2: Details Form ---
                 <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                     <AnimatedSection delay={50}>
                        <div className="flex items-center justify-between mb-6">
                            <Button variant="ghost" size="sm" onClick={() => { setReportData(initialReportData); setMessage(null); }} className="text-gray-600 hover:text-green-800 px-2 py-1">
                                <ArrowLeft size={16} className="mr-1"/> Back
                            </Button>
                            <div className="flex items-center space-x-2 text-green-800 font-semibold text-sm border border-green-200 bg-green-50 px-3 py-1 rounded-full">
                                <reportData.category.icon size={16}/>
                                <span>{reportData.category.label}</span>
                            </div>
                        </div>

                        {/* "Frosted Glass" Form Card */}
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                            {/* Subcategory */}
                            <div>
                               <label htmlFor="subcategoryValue" className="block text-sm font-medium text-gray-700 mb-1">Specific Issue *</label>
                               <select
                                 id="subcategoryValue" name="subcategoryValue" required
                                 value={reportData.subcategoryValue} onChange={handleInputChange}
                                 className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 appearance-none"
                               >
                                  <option value="" disabled>-- Select the specific issue --</option>
                                  {reportData.category.subcategories.map(sub => (
                                      <option key={sub.value} value={sub.value}>{sub.label}</option>
                                  ))}
                               </select>
                            </div>

                            {/* Description */}
                            <div>
                               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description * <span className="text-xs text-gray-500">(Max 250 words)</span></label>
                               <textarea
                                 id="description" name="description" rows={4} required maxLength={1500} 
                                 value={reportData.description} onChange={handleInputChange}
                                 className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                                 placeholder="Please provide details about the issue..."
                               />
                            </div>

                            {/* Location */}
                            <div className="relative">
                               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                               <input
                                 type="text" id="location" name="location" required
                                 value={reportData.location} onChange={handleInputChange}
                                 className="w-full text-base px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 pr-10" 
                                 placeholder="e.g., Near Adisadel Junction, Abura Road"
                               />
                               <button 
                                  type="button" 
                                  onClick={() => alert("Auto-location feature coming soon. Please enter manually.")} // Placeholder for geolocation
                                  className="absolute top-8 right-2 p-1.5 text-gray-400 hover:text-green-700" 
                                  title="Use current location"
                                >
                                   <MapPin size={20}/>
                               </button>
                            </div>

                            {/* Priority */}
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                               <div className="flex flex-wrap gap-x-4 gap-y-2">
                                  {(['Normal', 'Urgent', 'Life-threatening'] as PriorityLevel[]).map(level => (
                                      <label key={level} className={`flex items-center px-3 py-1.5 border rounded-full cursor-pointer transition-colors ${reportData.priority === level ? 'bg-green-100 border-green-600 ring-1 ring-green-600' : 'border-gray-300 hover:bg-gray-50'}`}>
                                          <input type="radio" name="priority" value={level} checked={reportData.priority === level} onChange={handlePriorityChange} className="h-4 w-4 mr-2 border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]/50"/>
                                           {level === 'Life-threatening' ? <AlertTriangle size={14} className="mr-1 text-red-600"/> : level === 'Urgent' ? <AlertCircle size={14} className="mr-1 text-yellow-600"/> : null}
                                          <span className={`text-xs font-medium ${reportData.priority === level ? 'text-green-900' : 'text-gray-700'}`}>{level}</span>
                                      </label>
                                  ))}
                               </div>
                            </div>

                            {/* Photo Upload */}
                            <div>
                               <label className="block text-sm font-medium text-gray-700 mb-1">Add Photo (Optional)</label>
                               {reportData.photoPreview ? (
                                   <div className="flex items-center space-x-3">
                                       <img src={reportData.photoPreview} alt="Preview" className="h-16 w-16 rounded-lg object-cover border border-gray-300"/>
                                       <button type="button" onClick={removePhoto} className="text-xs text-red-600 hover:underline">Remove</button>
                                   </div>
                               ) : (
                                   <label className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                       <Upload size={20} className="text-gray-400 mr-2"/>
                                       <span className="text-sm text-gray-600">Click to upload image (Max 5MB)</span>
                                       <input ref={fileInputRef} type="file" name="photo" accept="image/*" onChange={handlePhotoChange} className="sr-only"/>
                                   </label>
                               )}
                            </div>

                            {/* Optional Contact Info */}
                            <div>
                                <button type="button" onClick={() => setShowContactInfo(!showContactInfo)} className="flex items-center text-sm text-green-700 hover:underline mb-3 font-medium">
                                    {showContactInfo ? <ChevronUp size={16} className="mr-1"/> : <ChevronDown size={16} className="mr-1"/>}
                                    Add Contact Info (Optional - for updates)
                                </button>
                                <AnimatePresence>
                                {showContactInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 overflow-hidden border-t border-gray-200 pt-4"
                                    >
                                         <input type="text" name="contactName" value={reportData.contactName} onChange={handleInputChange} placeholder="Your Name" className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                                         <input type="tel" name="contactPhone" value={reportData.contactPhone} onChange={handleInputChange} placeholder="Phone Number" className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                                         <input type="email" name="contactEmail" value={reportData.contactEmail} onChange={handleInputChange} placeholder="Email Address" className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"/>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>

                            {/* Submission Feedback (non-modal) */}
                             <div aria-live="polite" className="min-h-[1rem]">
                              {message && message.type === 'error' && ( // Only show errors here
                                <div className="p-3 rounded-lg text-sm bg-red-100 text-red-800">
                                  {message.text}
                                </div>
                              )}
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                size="lg" 
                                className="w-full bg-[#FF6B00] hover:bg-[#E66000] text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-shadow animate-pulse hover:animate-none" // Glowing effect
                                disabled={loading}
                            >
                               {loading ? 'Submitting...' : 'Submit Report'}
                               {!loading && <Send size={18} className="ml-2"/>}
                            </Button>
                        </form>
                     </AnimatedSection>
                 </motion.div>
             )}
            </AnimatePresence>
        </div>
      </section>

      {/* Submitted Reports Section */}
      <section id="submitted-reports" className="py-12 md:py-16 bg-green-50 border-t border-green-100">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection delay={200}>
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 text-center">My Reported Issues</h2>
                {submittedReports.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">You haven't submitted any reports yet.</p>
                ) : (
                    <div className="space-y-4">
                        {submittedReports.map(report => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between"
                            >
                                <div className="flex-1 mb-3 sm:mb-0 sm:pr-4">
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                        <span className="flex items-center font-medium">
                                            <report.category.icon size={14} className="mr-1.5 text-green-700 flex-shrink-0"/>
                                            {report.category.label} &rarr; {report.subcategory.label}
                                        </span>
                                        <span className="font-bold text-gray-600 sm:hidden block"><Hash size={12} className="inline mr-0.5"/>{report.trackingId.split('-')[2]}</span> {/* Show short ID on mobile */}
                                    </div>
                                    <p className="text-sm text-gray-800 mb-1.5 line-clamp-2 leading-snug">{report.description}</p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <MapPin size={12} className="mr-1 flex-shrink-0"/> {report.location} 
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 sm:hidden">
                                         {formatRelativeTime(report.submittedAt.toISOString())}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 flex sm:flex-col items-end sm:items-center space-x-3 sm:space-x-0 sm:space-y-2">
                                     {report.photoPreview && <img src={report.photoPreview} alt="Report attachment" className="h-10 w-10 rounded object-cover"/>}
                                    <StatusBadge status={report.status} />
                                    <span className="text-xs text-gray-400 hidden sm:block">
                                         {formatRelativeTime(report.submittedAt.toISOString())}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatedSection>
         </div>
      </section>

      {/* --- Success Modal --- */}
      <AnimatePresence>
        {showSuccessModal && message && message.type === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-green-900 mt-4 mb-2">Report Submitted!</h2>
                    <p className="text-gray-600 mb-4">Thank you for helping improve our community. Your report has been received.</p>
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Your Tracking ID is:</p>
                        <p className="text-lg font-bold text-green-800 tracking-wider">{message.trackingId}</p>
                    </div>
                     <Button 
                        size="md" 
                        className="w-full mt-6 bg-[#FF6B00] hover:bg-[#E66000] text-white"
                        onClick={() => setShowSuccessModal(false)}
                     >
                        Done
                     </Button>
                </div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* CSS */}
      <style>{`
        .animate-section-enter { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .transition-all, .animate-section-enter { transition: none !important; } }
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.7rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.8rem;
          appearance: none; 
        }
      `}</style>
    </div>
  );
}

/*
--- Supabase Table Structure (constituent_reports) ---
(You MUST create this table in your Supabase SQL editor)

CREATE TABLE constituent_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text UNIQUE NOT NULL, -- User-facing ID e.g., CCN-20251026-A1B2
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional: Link to logged-in user
  submitted_at timestamptz DEFAULT now(),
  
  -- Report Details
  category_id text NOT NULL, -- e.g., 'roads', 'education'
  subcategory_value text NOT NULL, -- e.g., 'potholes', 'broken_furniture'
  description text NOT NULL CHECK (char_length(description) <= 1500),
  location text NOT NULL,
  priority text NOT NULL DEFAULT 'Normal', -- 'Normal', 'Urgent', 'Life-threatening'
  photo_url text, -- URL from Supabase Storage
  
  -- Optional Contact Info
  contact_name text,
  contact_phone text,
  contact_email text,
  
  -- Status Tracking
  status text NOT NULL DEFAULT 'Submitted', -- 'Submitted', 'In Progress', 'Resolved'
  resolved_at timestamptz, -- Optional: Track resolution time
  notes text -- Optional: For MP office internal notes
);

-- Enable RLS
ALTER TABLE constituent_reports ENABLE ROW LEVEL SECURITY;

-- Policies (Example: Allow insert, allow user to see their own reports)
CREATE POLICY "Allow authenticated users to insert reports"
  ON constituent_reports FOR INSERT TO authenticated WITH CHECK (true);

-- This policy allows anonymous (non-logged-in) users to submit reports
CREATE POLICY "Allow anonymous users to insert reports"
  ON constituent_reports FOR INSERT TO anon WITH CHECK (true);

-- This policy allows users to see reports they submitted (if you implement user_id tracking)
-- CREATE POLICY "Allow users to view their own reports"
--   ON constituent_reports FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- FOR THE MOCK TRACKER: You need a policy that lets *everyone* read *some* data
-- THIS IS INSECURE for real user data, but OK for mock.
-- A better way is to track anonymous reports via a local session/cookie.
-- For now, let's just allow read access for the demo.
CREATE POLICY "Allow public read access to submitted reports"
  ON constituent_reports FOR SELECT TO anon, authenticated
  USING (true);


-- Storage Bucket (report-photos)
-- 1. Create a bucket named 'issues' in Supabase Storage.
-- 2. Set policies, e.g., public insert (INSECURE, for demo only)
--    OR, better, authenticated insert:
--    CREATE POLICY "Allow authenticated users to upload issues"
--    ON storage.objects FOR INSERT TO authenticated
--    WITH CHECK ( bucket_id = 'issues' AND auth.uid() = (storage.foldername(name))[1] );
--    (This policy assumes photos are stored in a folder matching the user's ID)

*/