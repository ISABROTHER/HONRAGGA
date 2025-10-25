import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Calendar, ArrowRight, FileText, Video, Newspaper, Search, Share2, Bookmark, BookmarkCheck, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

type CategoryFilter = 'all' | 'article' | 'press-release' | 'video' | 'saved';
type SortOrder = 'latest' | 'oldest';

export function News() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9); // "Load more" batches

  // saved/bookmarked posts (localStorage)
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // reading progress (modal)
  const [readProgress, setReadProgress] = useState(0);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
    try {
      const raw = localStorage.getItem('mp_news_saved');
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Formatting
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryIcon = (category: string | null | undefined) => {
    switch ((category || '').toLowerCase()) {
      case 'video': return Video;
      case 'press-release':
      case 'press release': return Newspaper;
      default: return FileText;
    }
  };

  // Derived lists
  const normalized = useMemo(() => {
    return posts.map(p => ({
      ...p,
      _category: (p.category || '').toLowerCase().replace(' ', '-'),
    }));
  }, [posts]);

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalized;
    return normalized.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q)
    );
  }, [normalized, query]);

  const filtered = useMemo(() => {
    if (filter === 'all') return searched;
    if (filter === 'saved') return searched.filter(p => savedIds.includes(String(p.id)));
    return searched.filter(p => p._category === filter);
  }, [searched, filter, savedIds]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aDate = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bDate = b.published_at ? new Date(b.published_at).getTime() : 0;
      return sortOrder === 'latest' ? bDate - aDate : aDate - bDate;
    });
    return copy;
  }, [filtered, sortOrder]);

  const visible = useMemo(() => sorted.slice(0, visibleCount), [sorted, visibleCount]);

  // Save / Unsave
  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem('mp_news_saved', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Share
  const sharePost = async (post: BlogPost) => {
    const url = `${window.location.origin}/news/${post.id}`;
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: post.title || 'News', text: post.excerpt || '', url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Modal reading progress
  const updateProgress = useCallback(() => {
    const el = modalBodyRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const pct = Math.max(0, Math.min(100, (scrollTop / (scrollHeight || 1)) * 100));
    setReadProgress(pct);
  }, []);

  useEffect(() => {
    const el = modalBodyRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => el.removeEventListener('scroll', updateProgress as any);
  }, [selectedPost, updateProgress]);

  // Keyboard nav in modal
  useEffect(() => {
    if (!selectedPost) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedPost, sorted]);

  const currentIndex = useMemo(
    () => (selectedPost ? sorted.findIndex(p => p.id === selectedPost.id) : -1),
    [selectedPost, sorted]
  );
  const goPrev = () => {
    if (currentIndex > 0) setSelectedPost(sorted[currentIndex - 1]);
  };
  const goNext = () => {
    if (currentIndex >= 0 && currentIndex < sorted.length - 1) setSelectedPost(sorted[currentIndex + 1]);
  };

  // UI
  const FilterButton = ({
    value,
    label,
  }: {
    value: CategoryFilter;
    label: string;
  }) => (
    <button
      onClick={() => {
        setFilter(value);
        setVisibleCount(9);
      }}
      className={`px-4 py-2 rounded-full font-medium transition-all border ${
        filter === value
          ? 'bg-blue-900 text-white border-blue-900 shadow-lg'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white pt-20 pb-24">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600 blur-3xl opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Member of Parliament • Media Hub</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Latest updates, press releases, and video moments from your MP — concise, verified, and easy to share.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* TOOLBAR */}
      <section className="sticky top-16 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="hidden md:flex items-center text-gray-500 text-xs font-semibold uppercase tracking-wide">
                <Filter className="w-3 h-3 mr-1" /> Filter
              </span>
              <FilterButton value="all" label="All" />
              <FilterButton value="article" label="Articles" />
              <FilterButton value="press-release" label="Press Releases" />
              <FilterButton value="video" label="Videos" />
              <FilterButton value="saved" label="Saved" />
            </div>

            {/* Search & Sort */}
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setVisibleCount(9); }}
                  placeholder="Search news…"
                  className="pl-9 pr-3 py-2 rounded-full border border-gray-200 text-sm focus:ring-2 focus:ring-blue-900/30 focus:outline-none"
                />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="px-3 py-2 rounded-full border border-gray-200 text-sm focus:ring-2 focus:ring-blue-900/30 focus:outline-none"
                title="Sort"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">No posts available yet.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  const isSaved = savedIds.includes(String(post.id));
                  const isVideo = (post.category || '').toLowerCase() === 'video';
                  return (
                    <article
                      key={post.id}
                      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                    >
                      {/* Media */}
                      {isVideo && post.image_url ? (
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={post.image_url}
                            alt={post.title || 'video thumbnail'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-3 text-white text-sm font-semibold">
                              ▶ Play
                            </div>
                          </div>
                        </div>
                      ) : post.image_url ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title || 'article image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                          <CategoryIcon className="w-16 h-16 text-blue-900 opacity-50" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded-full">
                              <CategoryIcon className="w-3 h-3" />
                              <span>{(post.category || '').replace('-', ' ') || 'article'}</span>
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(post.published_at)}
                            </span>
                          </div>

                          {/* Save toggle */}
                          <button
                            onClick={() => toggleSave(String(post.id))}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                            aria-label={isSaved ? 'Unsave' : 'Save'}
                            title={isSaved ? 'Unsave' : 'Save for later'}
                          >
                            {isSaved ? <BookmarkCheck className="w-5 h-5 text-blue-900" /> : <Bookmark className="w-5 h-5 text-gray-500" />}
                          </button>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <button
                            className="inline-flex items-center text-blue-900 font-semibold group"
                            onClick={() => setSelectedPost(post)}
                            aria-label="Read more"
                          >
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={() => sharePost(post)}
                            className="inline-flex items-center text-gray-500 hover:text-blue-900 transition"
                            aria-label="Share"
                            title="Share"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load more */}
              {visible.length < sorted.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount(c => c + 9)}
                    className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition shadow"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* MODAL — interactive reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          {/* Reader */}
          <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8 border border-gray-100">
              {/* Progress */}
              <div className="h-1 bg-gray-100 rounded-t-2xl overflow-hidden">
                <div className="h-1 bg-blue-900" style={{ width: `${readProgress}%` }} />
              </div>

              {/* Header controls */}
              <div className="absolute top-3 right-3 flex gap-2">
                {currentIndex > 0 && (
                  <button
                    onClick={goPrev}
                    className="p-2 rounded-full bg-white/90 border border-gray-200 hover:bg-white transition"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                {currentIndex < sorted.length - 1 && (
                  <button
                    onClick={goNext}
                    className="p-2 rounded-full bg-white/90 border border-gray-200 hover:bg-white transition"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full bg-white/90 border border-gray-200 hover:bg-white transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Media */}
              {selectedPost.image_url && (
                <div className="h-64 md:h-96 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title || 'news image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Body */}
              <div ref={modalBodyRef} className="max-h-[70vh] overflow-y-auto p-6 md:p-8">
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                    {(selectedPost.category || '').replace('-', ' ') || 'article'}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedPost.published_at)}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  {selectedPost.title}
                </h2>

                {((selectedPost.category || '').toLowerCase() === 'video') && (selectedPost as any).video_url ? (
                  <div className="mb-6 aspect-video rounded-xl overflow-hidden bg-black">
                    {/* naive embed; ensure your table has video_url if you want this */}
                    <iframe
                      className="w-full h-full"
                      src={(selectedPost as any).video_url}
                      title="MP Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : null}

                <div className="prose max-w-none">
                  {selectedPost.excerpt && (
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                  )}
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>

                {/* Footer actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSave(String(selectedPost.id))}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors flex items-center"
                    >
                      {savedIds.includes(String(selectedPost.id)) ? <BookmarkCheck className="w-4 h-4 mr-2" /> : <Bookmark className="w-4 h-4 mr-2" />}
                      {savedIds.includes(String(selectedPost.id)) ? 'Saved' : 'Save'}
                    </button>
                    <button
                      onClick={() => sharePost(selectedPost)}
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
