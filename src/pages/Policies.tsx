import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Heart, GraduationCap, Leaf, Scale, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Policy = Database['public']['Tables']['policies']['Row'];

const iconMap: Record<string, any> = {
  TrendingUp,
  Heart,
  GraduationCap,
  Leaf,
  Scale,
  Home
};

export function Policies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setPolicies(data || []);
    } catch (error) {
      console.error('Error fetching policies:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePolicy = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Policy Platform</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for the challenges facing our communities
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading policies...</p>
            </div>
          ) : policies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No policies available yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {policies.map((policy) => {
                const Icon = iconMap[policy.icon] || TrendingUp;
                const isExpanded = expandedId === policy.id;

                return (
                  <div
                    key={policy.id}
                    className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                  >
                    <button
                      onClick={() => togglePolicy(policy.id)}
                      className="w-full px-6 py-6 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {policy.title}
                          </h3>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded-full">
                            {policy.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Have Questions About Our Policies?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We believe in transparent, accessible policy discussions. Reach out to learn more about
            how these plans will impact your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:policy@janedoe2026.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:from-blue-800 hover:to-blue-600"
            >
              Contact Policy Team
            </a>
            <a
              href="#"
              className="inline-block px-8 py-4 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-900 hover:text-white transition-all"
            >
              Download Full Platform
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}