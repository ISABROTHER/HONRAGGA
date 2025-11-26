// src/pages/Issues.tsx
import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  LocateFixed,
  Loader2,
  Image as ImageIcon,
  ArrowRight,
  MessageSquareWarning,
  Search,
  ChevronDown,
  Check,
  ChevronUp,
  User,
  Phone
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATIONS } from '../data/locations'; // Import the centralized data

type Priority = 'Normal' | 'Urgent' | 'Life-threatening';

type CategoryKey =
  | 'roads-infrastructure'
  | 'education-schools'
  | 'health-sanitation'
  | 'utilities-environment'
  | 'youth-jobs-welfare'
  | 'community-development'
  | 'governance-feedback';

const CATEGORIES: Record<
  CategoryKey,
  { label: string; subs: string[] }
> = {
  'roads-infrastructure': {
    label: 'Roads & Infrastructure',
    subs: [
      'Potholes / Damaged road',
      'Streetlight not working',
      'Blocked drainage',
      'Bridge/Culvert damage',
      'Flooding',
      'Road markings missing',
      'Waste overflow',
    ],
  },
  'education-schools': {
    label: 'Education & Schools',
    subs: [
      'Broken furniture/roof',
      'Shortage of teachers/textbooks',
      'Poor sanitation',
      'Unsafe structures',
      'ICT/Library needs',
      'Water access',
      'Feeding/bursary delay',
    ],
  },
  'health-sanitation': {
    label: 'Health & Sanitation',
    subs: [
      'Clinic/CHPS non-functioning',
      'Drug/staff shortage',
      'Water/sanitation issue',
      'Waste dumping/burning',
      'Mosquito breeding',
      'Maternity/emergency transport',
    ],
  },
  'utilities-environment': {
    label: 'Utilities & Environment',
    subs: [
      'Power outage/Transformer',
      'Water shortage/Burst pipe',
      'Refuse landfill overflow',
      'Deforestation/sand winning',
      'Air/Noise pollution',
      'Public toilets inadequate',
    ],
  },
  'youth-jobs-welfare': {
    label: 'Youth, Jobs & Welfare',
    subs: [
      'Unemployment/Unfair hiring',
      'Youth/Women groups support',
      'Abandoned livelihood program',
      'Grant disbursement delay',
      'Need entrepreneurship training',
      'Child protection concerns',
    ],
  },
  'community-development': {
    label: 'Community Development',
    subs: [
      'Abandoned community project',
      'Market facilities/toilets',
      'Parks/Lighting needed',
      'Broken boreholes/pumps',
      'Unkept cemeteries/grounds',
      'Security concerns',
      'Mediation support',
    ],
  },
  'governance-feedback': {
    label: 'Governance & Public Service',
    subs: [
      'Extortion/Absenteeism',
      'Permit/forms delay',
      'Bribery/Favouritism',
      'No response from office',
      'Corruption/misuse',
    ],
  },
};

export function Issues() {
  // ---------- ISSUE REPORTING STATE ----------
  const [cat, setCat] = useState<CategoryKey>('roads-infrastructure');
  const [subcat, setSubcat] = useState<string>(CATEGORIES['roads-infrastructure'].subs[0]);
  const [description, setDescription] = useState('');
  // Priority is fixed to "Normal" (hidden from user)
  const priority: Priority = 'Normal';
  
  // Location State
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const [locationDetail, setLocationDetail] = useState(''); 
  
  // Community Search State
  const [communitySearch, setCommunitySearch] = useState('');
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const communityDropdownRef = useRef<HTMLDivElement>(null);
  
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [locGetting, setLocGetting] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string>('');

  // Custom "issue not listed" state
  const [useCustomSubcat, setUseCustomSubcat] = useState(false);
  const [customSubcat, setCustomSubcat] = useState('');

  // Click outside listener for community dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (communityDropdownRef.current && !communityDropdownRef.current.contains(event.target as Node)) {
        setIsCommunityDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto set subcat list when category changes
  useEffect(() => {
    const first = CATEGORIES[cat].subs[0];
    setSubcat(first);
    setUseCustomSubcat(false);
    setCustomSubcat('');
  }, [cat]);

  // --- Helper to get active location data based on selection ---
  const activeLocationData = LOCATIONS.find((loc: any) => loc.zone === selectedZone);
  
  // Filter communities based on search
  const filteredCommunities = activeLocationData
    ? activeLocationData.communities.filter((c: string) =>
        c.toLowerCase().includes(communitySearch.toLowerCase())
      )
    : [];

  // Total communities for display
  const totalCommunities = LOCATIONS.reduce(
    (sum: number, loc: any) => sum + (loc.communities?.length || 0),
    0
  );

  // Completion Checks
  const isLocationComplete = selectedZone !== '' && selectedCommunity !== '';
  const isIssueComplete = description.trim().length > 0;

  const getGPS = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation not supported on this device.');
      return;
    }
    setLocGetting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocGetting(false);
      },
      () => {
        setErrorMsg('Unable to get location. Please enter it manually.');
        setLocGetting(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setPhotoFile(f || null);
    setPhotoPreview(f ? URL.createObjectURL(f) : null);
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null;
    const ext = photoFile.name.split('.').pop() || 'jpg';
    const path = `public/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from('issues').upload(path, photoFile, {
      cacheControl: '3600',
      upsert: false,
      contentType: photoFile.type || 'image/jpeg',
    });
    if (upErr) throw upErr;
    const { data } = supabase.storage.from('issues').getPublicUrl(path);
    return data.publicUrl || null;
  };

  const makeTracking = (id: string | number | null) => {
    const y = new Date().getFullYear();
    const short = String(id || '').slice(-4) || Math.floor(Math.random() * 8999 + 1000).toString();
    return `CCN-${y}-${short.toUpperCase()}`;
  };

  const resetForm = () => {
    setCat('roads-infrastructure');
    setSubcat(CATEGORIES['roads-infrastructure'].subs[0]);
    setDescription('');
    setSelectedZone('');
    setSelectedCommunity('');
    setCommunitySearch('');
    setLocationDetail('');
    setCoords({ lat: null, lng: null });
    setName('');
    setPhone('');
    setPhotoFile(null);
    setPhotoPreview(null);
    setUseCustomSubcat(false);
    setCustomSubcat('');
    setErrorMsg(null);
  };

  const onSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!description.trim()) {
      setErrorMsg('Please enter a short description.');
      return;
    }
    
    if (!selectedZone || !selectedCommunity) {
      setErrorMsg('Please select your Area and Community.');
      return;
    }

    const finalSubcategory =
      useCustomSubcat && customSubcat.trim() ? customSubcat.trim() : subcat;

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (photoFile) {
        photo_url = await uploadPhoto();
      }

      // Compose a location string
      const fullLocation = `${selectedZone} > ${selectedCommunity}${locationDetail ? ` (${locationDetail})` : ''}`;
      const locCombined = coords.lat && coords.lng
          ? `${fullLocation} • ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
          : fullLocation;

      const insertPayload = {
        category: CATEGORIES[cat].label,
        subcategory: finalSubcategory,
        description: description.trim(),
        location: locCombined.trim(),
        priority,
        photo_url,
        name: name.trim() || null,
        phone: phone.trim() || null,
        status: 'Pending',
      };

      const { data, error } = await supabase
        .from('issues')
        .insert(insertPayload)
        .select('id')
        .single();

      if (error) throw error;

      const code = makeTracking(data?.id ?? null);
      setTrackingCode(code);
      setSuccessOpen(true);
      resetForm();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Consistent Heading Design */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 border border-green-100 mb-4">
              <MessageSquareWarning className="w-3.5 h-3.5 text-green-700" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-green-700">
                Citizen Reporting
              </span>
            </div>

            <div className="flex flex-col items-center justify-center group">
              <h2 className="
                text-3xl sm:text-4xl md:text-5xl 
                font-extrabold leading-tight tracking-tight mb-2
                bg-gradient-to-r from-slate-900 via-green-700 to-slate-900
                bg-clip-text text-transparent
                motion-safe:transition-transform motion-safe:duration-500
              ">
                Report an Issue
              </h2>
              <span className="
                mt-4 h-[3px] w-20 rounded-full
                bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
                motion-safe:transition-all motion-safe:duration-500
                group-hover:w-32
              " />
            </div>
            
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed">
              Help improve the community — share problems like broken streetlights, potholes, or school issues so your MP and Assemblyman can act on them.
            </p>
          </div>

          {/* NEW: MP + ASSEMBLYMAN INFO STRIP */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* MP CARD */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#002B5B] via-slate-700 to-[#FF6B00] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  MP
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-1">
                  Member of Parliament
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  Hon. Dr. Kwamena Minta Nyarku
                </p>
                <p className="text-xs text-slate-500 mb-2">MP, Cape Coast North Constituency</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The MP’s office receives all reports and works with Assemblymen, departments and agencies to ensure community issues are addressed and delivered.
                </p>
              </div>
            </div>

            {/* ASSEMBLYMAN CARD (DYNAMIC) */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 shadow-sm p-4 sm:p-5 flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-700/90 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  <User className="w-6 h-6" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-blue-700 mb-1">
                  Your Assemblyman
                </p>

                {activeLocationData ? (
                  <>
                    <p className="text-sm sm:text-base font-bold text-blue-900">
                      {activeLocationData.assemblyman}
                    </p>
                    <p className="text-xs text-blue-800 mb-1.5">
                      Electoral Area: {activeLocationData.zone}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-blue-800 mb-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{activeLocationData.phone}</span>
                    </div>
                    <p className="text-[11px] text-blue-900/80 leading-relaxed">
                      Local issues in this area can be handled directly by your Assemblyman, or through the MP’s office where follow-up and delivery are needed.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      Select your Area to view details
                    </p>
                    <p className="text-[11px] text-blue-900/80 leading-relaxed">
                      Once you choose your Area below, we will show the Assemblyman responsible for that zone, together with their contact.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmitIssue} className="space-y-6">
            
            {/* ------------------------------------------ */}
            {/* SECTION 1: LOCATION DETAILS (BLUE SHADE) */}
            {/* ------------------------------------------ */}
            <motion.div 
              className="rounded-3xl overflow-hidden border border-blue-100 bg-blue-50/50 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> Location Details
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-blue-800">
                    <span className="font-semibold">
                      Communities in system: {totalCommunities}
                    </span>
                    {isLocationComplete && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 border border-blue-200 text-[11px] font-semibold text-blue-800">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Location set
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Area (Zone) Selector */}
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-1">
                      Area (Electoral Area / Zone) *
                    </label>
                    <div className="relative">
                      <select
                        value={selectedZone}
                        onChange={(e) => {
                          setSelectedZone(e.target.value);
                          setSelectedCommunity('');
                          setCommunitySearch('');
                        }}
                        className="w-full appearance-none px-4 py-3.5 rounded-xl border border-blue-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      >
                        <option value="">Select Area...</option>
                        {LOCATIONS.map((loc: any) => (
                          <option key={loc.zone} value={loc.zone}>{loc.zone}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Searchable Community Selector */}
                  <div ref={communityDropdownRef} className="relative">
                    <label className="block text-sm font-medium text-blue-800 mb-1">Community *</label>
                    
                    <div 
                      className={`relative w-full rounded-xl border bg-white text-gray-900 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm ${!selectedZone ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-blue-200 cursor-text'}`}
                      onClick={() => selectedZone && setIsCommunityDropdownOpen(true)}
                    >
                      <div className="flex items-center px-4 py-3.5">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                          type="text"
                          value={communitySearch}
                          onChange={(e) => {
                            setCommunitySearch(e.target.value);
                            setIsCommunityDropdownOpen(true);
                            if (selectedCommunity && e.target.value !== selectedCommunity) {
                              setSelectedCommunity(''); // Clear selection if user types
                            }
                          }}
                          onFocus={() => selectedZone && setIsCommunityDropdownOpen(true)}
                          disabled={!selectedZone}
                          placeholder={selectedZone ? "Search or select community..." : "Select an Area first"}
                          className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
                        />
                        {selectedCommunity && (
                          <Check className="w-4 h-4 text-blue-600 ml-2" />
                        )}
                      </div>

                      {/* Dropdown List */}
                      <AnimatePresence>
                        {isCommunityDropdownOpen && selectedZone && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white rounded-xl border border-blue-100 shadow-xl z-20"
                          >
                            {filteredCommunities.length > 0 ? (
                              filteredCommunities.map((comm: string) => (
                                <button
                                  key={comm}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCommunity(comm);
                                    setCommunitySearch(comm);
                                    setIsCommunityDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm ${selectedCommunity === comm ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                                >
                                  {comm}
                                </button>
                              ))
                            ) : (
                              <div className="p-4 text-center text-sm text-gray-500">No communities found</div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-blue-800 mb-1">Specific Landmark (Optional)</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={locationDetail}
                      onChange={(e) => setLocationDetail(e.target.value)}
                      placeholder="e.g., Near the Methodist Church"
                      className="flex-1 px-4 py-3.5 rounded-xl border border-blue-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={getGPS}
                      className="px-5 py-3.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-blue-900 flex items-center justify-center gap-2 transition-colors font-semibold shadow-sm"
                      title="Use GPS"
                    >
                      {locGetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
                      <span className="sm:inline text-sm">Live location</span>
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-blue-900/80">
                    Use live location only if you are standing at the exact place where the issue is.
                  </p>
                  {coords.lat && coords.lng && (
                    <div className="text-xs text-blue-600 mt-2 flex items-center gap-1.5 font-medium bg-blue-100/50 px-3 py-1.5 rounded-lg w-fit">
                      <MapPin className="w-3 h-3" />
                      <span>GPS Captured: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------ */}
            {/* SECTION 2: ISSUE DETAILS (AMBER SHADE) */}
            {/* ------------------------------------------ */}
            <AnimatePresence>
              {isLocationComplete && (
                <motion.div 
                  className="rounded-3xl overflow-hidden border border-amber-100 bg-amber-50/50 shadow-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> Issue Details
                      </h3>
                      {isIssueComplete && (
                        <CheckCircle className="w-6 h-6 text-amber-600" />
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-amber-800 mb-1">Category</label>
                        <div className="relative">
                          <select
                            value={cat}
                            onChange={(e) => setCat(e.target.value as CategoryKey)}
                            className="w-full appearance-none px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                          >
                            {Object.entries(CATEGORIES).map(([key, val]) => (
                              <option key={key} value={key}>{val.label}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Sub-category with "Issue not listed" */}
                      <div>
                        <label className="block text-sm font-medium text-amber-800 mb-1">Sub-category</label>
                        <div className="relative">
                          <select
                            value={useCustomSubcat ? '__custom' : subcat}
                            onChange={(e) => {
                              if (e.target.value === '__custom') {
                                setUseCustomSubcat(true);
                                setCustomSubcat('');
                              } else {
                                setUseCustomSubcat(false);
                                setSubcat(e.target.value);
                              }
                            }}
                            className="w-full appearance-none px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                          >
                            {CATEGORIES[cat].subs.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                            <option value="__custom">Issue not listed – type manually</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        {useCustomSubcat && (
                          <input
                            value={customSubcat}
                            onChange={(e) => setCustomSubcat(e.target.value)}
                            placeholder="Type the issue in your own words"
                            className="mt-2 w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-amber-800 mb-1">Description *</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Describe the issue in detail..."
                        className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                      />
                    </div>

                    {/* Photo */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-amber-800 mb-1">Photo Evidence</label>
                        <label className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 cursor-pointer transition-colors text-sm font-medium text-amber-900 shadow-sm">
                          <Upload className="w-4 h-4" />
                          <span>{photoFile ? 'Change Photo' : 'Upload Photo'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </label>
                      </div>
                    </div>

                    {photoPreview && (
                      <div className="relative w-full max-w-xs mt-4">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-40 w-full object-cover rounded-2xl border border-amber-200 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm hover:bg-red-50 transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ------------------------------------------ */}
            {/* SECTION 3: CONTACT & SUBMIT (GREEN SHADE) */}
            {/* ------------------------------------------ */}
            <AnimatePresence>
              {isLocationComplete && isIssueComplete && (
                <motion.div 
                  className="rounded-3xl overflow-hidden border border-green-100 bg-green-50/50 shadow-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-green-900 flex items-center gap-2 mb-6">
                      <CheckCircle className="w-5 h-5" /> Your Details (Optional)
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-green-800 mb-1">Name</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3.5 rounded-xl border border-green-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-green-800 mb-1">Phone</label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g., 024XXXXXXX"
                          className="w-full px-4 py-3.5 rounded-xl border border-green-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2 p-4 rounded-2xl bg-red-50 text-red-800 border border-red-100 mb-6">
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium">{errorMsg}</p>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="
                          relative w-full md:w-auto px-10 py-4 rounded-2xl 
                          bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600
                          text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 
                          transition-all duration-300 
                          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                          flex items-center justify-center gap-3
                        "
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Report <ArrowRight className="w-6 h-6" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-green-700 font-medium text-center">
                        Your details remain private. You'll receive a tracking code upon submission.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </div>
      </section>

      {/* SUCCESS MODAL */}
      {successOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSuccessOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-md w-full rounded-[2rem] border border-white/20 bg-[#002B5B] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden z-10"
          >
            <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00]" />
            <div className="p-10 text-white text-center">
              <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-extrabold mb-3 tracking-tight">Issue Submitted!</h3>
              <p className="text-blue-100 text-base mb-8">
                Thank you for reporting. Your tracking code is:
              </p>
              
              <div className="bg-white/10 rounded-2xl p-5 mb-8 border border-white/10 backdrop-blur-md">
                  <div className="text-4xl font-black tracking-widest text-[#FF6B00] font-mono">{trackingCode}</div>
                  <p className="text-xs text-blue-200 mt-3 font-medium uppercase tracking-wide">
                  Save this code
                  </p>
              </div>

              <button
                onClick={() => setSuccessOpen(false)}
                className="w-full px-6 py-4 rounded-xl bg-white text-[#002B5B] font-bold hover:bg-gray-50 transition shadow-lg text-lg"
              >
                Done
              </button>
            </div>
            <button
              onClick={() =>  setSuccessOpen(false)}
              className="absolute top-5 right-5 text-blue-300 hover:text-white p-2 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      )}
    </div> 
  );
}
