// src/pages/News.tsx
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

export function News() {
  // ---------- ISSUE REPORTING STATE ----------
  const [cat, setCat] = useState<CategoryKey>('roads-infrastructure');
  const [subcat, setSubcat] = useState<string>(CATEGORIES['roads-infrastructure'].subs[0]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Normal');

  const [locationText, setLocationText] = useState('');
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

  // auto set subcat list when category changes
  useEffect(() => {
    const first = CATEGORIES[cat].subs[0];
    setSubcat(first);
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
        // if no manual location text, seed it with lat/lng
        if (!locationText) {
          setLocationText(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
        }
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
    setPriority('Normal');
    setLocationText('');
    setCoords({ lat: null, lng: null });
    setName('');
    setPhone('');
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const onSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!description.trim()) {
      setErrorMsg('Please enter a short description.');
      return;
    }
    if (!locationText.trim() && (!coords.lat || !coords.lng)) {
      setErrorMsg('Please provide a location or use GPS.');
      return;
    }

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (photoFile) {
        photo_url = await uploadPhoto();
      }

      // Compose a location string with coords if available
      const locCombined =
        coords.lat && coords.lng
          ? `${locationText ? locationText + ' • ' : ''}${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
          : locationText;

      const insertPayload = {
        category: CATEGORIES[cat].label,
        subcategory: subcat,
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
      {/* REPORT AN ISSUE — frosted glass card */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Report an Issue</h2>
            <p className="text-gray-600">
              Help improve the community — share problems like broken streetlights, potholes, clinic or school issues.
            </p>
          </div>

          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF6B00]/40 via-amber-300/30 to-[#002B5B]/40 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-xl" />
            <form
              onSubmit={onSubmitIssue}
              className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl p-5 md:p-8 space-y-6"
            >
              {/* Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Category */}
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

                {/* Sub-category */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Sub-category</label>
                  <select
                    value={subcat}
                    onChange={(e) => setSubcat(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    {CATEGORIES[cat].subs.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Short description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="e.g., Streetlight near the new market junction has been off for two weeks."
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Location / Landmark</label>
                  <div className="flex gap-2">
                    <input
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      placeholder="e.g., Adisadel Estate Junction"
                      className="flex-1 px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                    <button
                      type="button"
                      onClick={getGPS}
                      className="px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-900 flex items-center gap-2 transition-colors"
                      title="Use GPS"
                    >
                      {locGetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
                      <span className="text-sm">GPS</span>
                    </button>
                  </div>
                  {coords.lat && coords.lng ? (
                    <div className="text-xs text-gray-700 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    {(['Normal', 'Urgent', 'Life-threatening'] as Priority[]).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Your name (optional)</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Phone (optional)</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 024XXXXXXX"
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Photo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Photo (optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                    </label>
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-gray-200 shadow-sm hover:bg-red-50 transition-colors"
                          aria-label="Remove image"
                          title="Remove image"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        <span>Attach a clear photo if possible.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Error */}
              {errorMsg ? (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-800 border border-red-100">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <p className="text-sm">{errorMsg}</p>
                </div>
              ) : null}

              {/* Submit */}
              <div className="relative">
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative w-full md:w-auto px-8 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E66000] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:shadow-none"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting…
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Submit Issue
                    </span>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500">
                You’ll receive a tracking code on success. Your details remain private unless you choose otherwise.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* SUCCESS MODAL FOR ISSUE SUBMISSION */}
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