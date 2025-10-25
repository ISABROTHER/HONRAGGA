import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, FileText, Video, Newspaper } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from  '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export function News() {
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
      day: 'numeric'
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

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter(post => post.category === filter);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">News & Media</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest campaign updates, press releases, and media coverage
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

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
                          alt={post.title}
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
                          <span>{post.category.replace('-', ' ')}</span>
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

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8">
            {selectedPost.image_url && (
              <div className="h-64 md:h-96 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-900 text-sm font-semibold rounded-full">
                  {selectedPost.category.replace('-', ' ')}
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
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {selectedPost.excerpt}
                </p>
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
    </div>
  );
}