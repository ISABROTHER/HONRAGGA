// src/pages/Issues.tsx
import { useState, useEffect } from 'react';
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
  MessageSquareWarning
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const LOCATIONS = {
  "Abakam- Ola University": [
    "Kwaprow", "Kwesipra", "Kokwaado", "Amamoma",
    "Apewosika", "Akotokyir", "Duakor", "Abakam",
    "Ahenboboe", "University Old Site", "University New Site",
    "Ola Medina", "Ola Low Cost", "North Ola",
    "Black Star (MOH) & Augusto Bungalows SSNIT Flats"
  ],
  "Efutu-Kakomdo-Mempeasem": [
    "Efutu", "Efutu Ekutuadze", "Efutu Seguase",
    "Efutu Mampong", "Koforidua", "Ewusikrom",
    "Efutu Kokwaado", "Ansapetu", "Nkokosa",
    "Fadur", "Ankaful", "Camp", "Nanabakrom", "Taedo",
    "Esuekyir", "Anto Esuekyir", "Esuekyir Estates",
    "Esuekyir Community 1", "Amoyaw", "Nyinasin",
    "Kakomdo", "Amisano", "Ebubonko", "C- Poly",
    "Dehia", "Kramotawia", "Mpeasem", "Brabedze",
    "Kayefi", "Senewin", "Dankwaakrom",
    "Nyeku", "Besakrom", "Akweikrom", "Akaikrom",
    "Kyirakomfo", "Wenyi Ato", "Yayaakwano", "Brimso",
    "Akwakrom", "Pomanye", "Kumease", "Nyame Bekyere",
    "Zongo", "Asenadze", "Kurowfofordo", "Ekoo", "Dunkor"
  ],
  "Abura-Adisadel-Pedu-Nkafoa": [
    "1st Ridge", "2nd Ridge", "3rd Ridge", "4th Ridge", "Nkafoa",
    "Nkafoa Nkamadze", "Nkafoa Beseadze", "Abura",
    "Etsifi", "Abota yie", "Adeebikrom", "The Boy", "Tankokrom",
    "Roman Hill", "Ba Awar", "Nkwantado", "Assim",
    "Aba Anwonakrom", "Eyifua", "Eyifua Estates", "Abura Estate",
    "Mintsiminim (Nurses Flats)", "Pedu", "Adaaso", "Pedu Junction",
    "Ngnabado", "Abakaadze", "Buwano", "Police Flats/Hqrs", "Ntwemakrom",
    "Adisadel Village", "Zongo (Adisadel)", "Adisadel College", "Staff Quarters",
    "Estates", "Tsibu Darko", "West Adisadel", "Tankoferdo"
  ]
};

// Total communities counter
const TOTAL_COMMUNITIES = Object.values(LOCATIONS).reduce(
  (acc, arr) => acc + arr.length,
  0
);

export function Issues() {
  const [cat, setCat] = useState<CategoryKey>('roads-infrastructure');
  const [subcat, setSubcat] = useState<string>(CATEGORIES['roads-infrastructure'].subs[0]);
  const [description, setDescription] = useState('');
  // Priority removed from UI – default normal for backend
  const priority: Priority = 'Normal';
  
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('');
  const [locationDetail, setLocationDetail] = useState('');
  
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

  // Custom issue when not listed
  const [useCustomSubcat, setUseCustomSubcat] = useState(false);
  const [customSubcat, setCustomSubcat] = useState('');

  useEffect(() => {
    const first = CATEGORIES[cat].subs[0];
    setSubcat(first);
    setUseCustomSubcat(false);
    setCustomSubcat('');
  }, [cat]);

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

        // 🔧 ARCHITECTURE HOOK:
        // In future, use coords here to auto-select Area + Community
        // by calling a Supabase RPC that maps GPS → nearest town.
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
    setLocationDetail('');
    setCoords({ lat: null, lng: null });
    setName('');
    setPhone('');
    setPhotoFile(null);
    setPhotoPreview(null);
    setUseCustomSubcat(false);
    setCustomSubcat('');
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
      useCustomSubcat && customSubcat.trim()
        ? customSubcat.trim()
        : subcat;

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (photoFile) {
        photo_url = await uploadPhoto();
      }

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

  // ---- Progressive section logic ----
  const isLocationComplete = !!selectedZone && !!selectedCommunity;
  const isIssueSectionOpen = isLocationComplete;
  const isIssueComplete = isIssueSectionOpen && !!description.trim();
  const isContactSectionOpen = isIssueComplete;

  const communitiesForZone = selectedZone
    ? LOCATIONS[selectedZone as keyof typeof LOCATIONS]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Consistent Heading Design */}
          <div className="flex flex-col items-center mb-12 text-center">
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
              Help improve the community — share problems like broken streetlights, potholes, or school issues directly with the MP's office.
            </p>
          </div>

          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF6B00]/40 via-amber-300/30 to-[#002B5B]/40 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-xl" />
            <form
              onSubmit={onSubmitIssue}
              className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl p-5 md:p-8 space-y-6"
            >
              {/* MAIN STACK – always vertical, no grid layout */}
              <div className="flex flex-col gap-6">
                
                {/* LOCATION SECTION */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 md:p-5 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        Location Details
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] text-blue-700 font-semibold">
                        Communities in system: {TOTAL_COMMUNITIES}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-blue-700 border border-blue-100">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                        Step 1 of 3
                      </span>
                    </div>
                  </div>
                   
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Area *
                      </label>
                      <select
                        value={selectedZone}
                        onChange={(e) => {
                          setSelectedZone(e.target.value);
                          setSelectedCommunity('');
                        }}
                        className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      >
                        <option value="">Select Area...</option>
                        {Object.keys(LOCATIONS).map((zone) => (
                          <option key={zone} value={zone}>{zone}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Community *
                      </label>
                      <select
                        value={selectedCommunity}
                        onChange={(e) => setSelectedCommunity(e.target.value)}
                        disabled={!selectedZone}
                        className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <option value="">Select Community...</option>
                        {selectedZone &&
                          communitiesForZone.map((comm) => (
                            <option key={comm} value={comm}>{comm}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Specific Landmark (Optional)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={locationDetail}
                        onChange={(e) => setLocationDetail(e.target.value)}
                        placeholder="e.g., Near the Methodist Church"
                        className="flex-1 px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      />
                      <button
                        type="button"
                        onClick={getGPS}
                        className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-900 flex items-center justify-center gap-2 transition-colors font-medium"
                        title="Use live location"
                      >
                        {locGetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
                        <span className="text-sm">Live location</span>
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Use live location only if you are standing at the exact place where the issue is.
                    </p>
                    {coords.lat && coords.lng && (
                      <div className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>GPS Captured: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ISSUE DETAILS SECTION */}
                <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Issue Details
                    </h3>
                    <span className="inline-flex items-center gap-1 self-start md:self-auto rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-amber-700 border border-amber-100">
                      <span className={`inline-block w-2 h-2 rounded-full ${isIssueSectionOpen ? 'bg-amber-500' : 'bg-slate-400'}`} />
                      Step 2 of 3
                    </span>
                  </div>

                  {!isIssueSectionOpen && (
                    <p className="mt-2 text-xs text-slate-600">
                      Fill in your <span className="font-semibold">Area</span> and <span className="font-semibold">Community</span> first to continue.
                    </p>
                  )}

                  {isIssueSectionOpen && (
                    <div className="mt-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                          <select
                            value={cat}
                            onChange={(e) => setCat(e.target.value as CategoryKey)}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          >
                            {Object.entries(CATEGORIES).map(([key, val]) => (
                              <option key={key} value={key}>
                                {val.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-1">
                            Sub-category
                          </label>
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
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          >
                            {CATEGORIES[cat].subs.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                            <option value="__custom">
                              Issue not listed – type manually
                            </option>
                          </select>

                          {useCustomSubcat && (
                            <input
                              value={customSubcat}
                              onChange={(e) => setCustomSubcat(e.target.value)}
                              placeholder="Type the issue in your own words"
                              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={3}
                          placeholder="Describe the issue in detail..."
                          className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-1">
                            Photo Evidence
                          </label>
                          <div className="flex items-center gap-3">
                            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white cursor-pointer transition-colors text-sm font-medium text-gray-700">
                              <Upload className="w-4 h-4" />
                              <span>Choose File</span>
                              <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                            </label>
                          </div>
                        </div>
                      </div>

                      {photoPreview && (
                        <div className="relative w-full max-w-xs">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-32 w-full object-cover rounded-xl border border-gray-200"
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
                  )}
                </div>

                {/* CONTACT INFO */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      Your Details (Optional)
                    </h3>
                    <span className="inline-flex items-center gap-1 self-start md:self-auto rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
                      <span className={`inline-block w-2 h-2 rounded-full ${isContactSectionOpen ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      Step 3 of 3
                    </span>
                  </div>

                  {!isContactSectionOpen && (
                    <p className="mt-2 text-xs text-slate-600">
                      Once you add a short <span className="font-semibold">description of the issue</span>, this section will open.
                    </p>
                  )}

                  {isContactSectionOpen && (
                    <div className="mt-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g., 024XXXXXXX"
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {errorMsg ? (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-800 border border-red-100">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p className="text-sm">{errorMsg}</p>
                </div>
              ) : null}

              <div className="relative pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative w-full md:w-auto px-8 py-4 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:shadow-none text-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Issue...
                    </>
                  ) : (
                    <>
                      Submit Report <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Your details remain private. You'll receive a tracking code upon submission.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {successOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSuccessOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full rounded-3xl border border-white/20 bg-[#002B5B] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00]" />
              <div className="p-8 text-white text-center">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-extrabold mb-2">Issue Submitted!</h3>
                <p className="text-blue-100 text-sm mb-6">
                  Thank you for reporting. Your tracking code is:
                </p>
                
                <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/10 backdrop-blur-sm">
                    <div className="text-3xl font-black tracking-wider text-[#FF6B00] font-mono">{trackingCode}</div>
                    <p className="text-xs text-blue-200 mt-2">
                    Save this code to check status later.
                    </p>
                </div>

                <button
                  onClick={() => setSuccessOpen(false)}
                  className="w-full px-5 py-3 rounded-xl bg-white text-[#002B5B] font-bold hover:bg-gray-100 transition shadow-lg"
                >
                  Done
                </button>
              </div>
              <button
                onClick={() =>  setSuccessOpen(false)}
                className="absolute top-4 right-4 text-blue-200 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}
