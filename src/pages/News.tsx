import { useState, useEffect } from 'react';
import {
  Calendar,
  ArrowRight,
  FileText,
  Video,
  Newspaper,
  MapPin,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  LocateFixed,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

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
  // ---------- NEWS STATE ----------
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video':
        return Video;
      case 'press-release':
      case 'press release':
        return Newspaper;
      default:
        return FileText;
    }
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter((post) => post.category === filter);

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
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3">News & Media</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest campaign updates, press releases, and media coverage
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* REPORT AN ISSUE — frosted glass card */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Report an Issue</h2>
            <p className="text-gray-600">
              Help improve the community — share problems like broken streetlights, potholes, clinic or school issues.
            </p>
          </div>

          <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-[#FF6B00]/40 via-amber-300/30 to-[#002B5B]/40 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-xl" />
            <form
              onSubmit={onSubmitIssue}
              className="relative rounded-3xl bg-white/25 backdrop-blur-xl border border-white/40 shadow-2xl p-5 md:p-8 space-y-6"
            >
              {/* Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value as CategoryKey)}
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                      className="flex-1 px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                    <button
                      type="button"
                      onClick={getGPS}
                      className="px-3 py-3 rounded-xl border border-white/60 bg-white/80 hover:bg-white text-gray-900 flex items-center gap-2"
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
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
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
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Phone (optional)</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 024XXXXXXX"
                    className="w-full px-3 py-3 rounded-xl border border-white/60 bg-white/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                {/* Photo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Photo (optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/60 bg-white/80 hover:bg-white cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                    </label>
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-16 w-16 object-cover rounded-lg border border-white/60"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-gray-200"
                          aria-label="Remove image"
                          title="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-700 flex items-center gap-2">
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
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00] opacity-30 blur" />
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative w-full md:w-auto px-6 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#E66000] text-white font-semibold shadow-xl transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
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

              <p className="text-xs text-gray-700">
                You’ll receive a tracking code on success. Your details remain private unless you choose otherwise.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FILTER BAR FOR NEWS */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {['all', 'article', 'press-release', 'video'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">No posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const CategoryIcon = getCategoryIcon(post.category);

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title || 'News image'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                        <CategoryIcon className="w-16 h-16 text-blue-900 opacity-50" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded-full">
                          <CategoryIcon className="w-3 h-3" />
                          <span>{(post.category || '').replace('-', ' ')}</span>
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(post.published_at)}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <button className="inline-flex items-center text-blue-900 font-semibold group-hover:underline">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* NEWS MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8">
            {selectedPost.image_url && (
              <div className="h-64 md:h-96 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title || 'News'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                  {(selectedPost.category || '').replace('-', ' ')}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(selectedPost.published_at)}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h2>

              <div className="prose max-w-none">
                {selectedPost.excerpt ? (
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">{selectedPost.excerpt}</p>
                ) : null}
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL FOR ISSUE SUBMISSION */}
      {successOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSuccessOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative max-w-md w-full rounded-3xl border border-white/30 bg-white/20 backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#FF6B00] via-amber-300 to-[#FF6B00]" />
              <div className="p-6 text-white">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-extrabold">Issue submitted successfully</h3>
                </div>
                <p className="mt-3 text-white/90 text-sm">
                  Thank you. Your tracking code is:
                </p>
                <div className="mt-2 text-2xl font-black">{trackingCode}</div>
                <p className="mt-2 text-white/80 text-sm">
                  Save this code to check status with the constituency office.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSuccessOpen(false)}
                    className="px-5 py-2 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
              <button
                onClick={() =>  setSuccessOpen(false)}
                className="absolute top-3 right-3 bg-white/90 text-gray-900 rounded-full p-1 border border-gray-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
