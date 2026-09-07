import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Search, Clock, ExternalLink, Rss, BookOpen, User } from 'lucide-react';

interface BlogFeedProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  isLoading: boolean;
}

// Brand content pillars & topics
const BRAND_CATEGORIES = [
  'ALL',
  'Ja Nee, AI',
  'Frikkie Explains',
  'Boer Maak \'n Plan',
  'Load-shredding',
  'Radar',
  'Security'
];

export const BlogFeed: React.FC<BlogFeedProps> = ({
  posts,
  onSelectPost,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' ||
      post.categories.some(
        (cat) => cat.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                 selectedCategory.toLowerCase().includes(cat.toLowerCase())
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#14100D] rounded-xl border border-[#4A453B]">
        
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {BRAND_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#E8672C] text-[#14100D]'
                  : 'text-[#E8E2D4] hover:bg-[#4A453B]/40'
              }`}
            >
              {category === 'ALL' ? `All Articles (${posts.length})` : category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full shrink-0">
          <Search className="w-4 h-4 text-[#4A453B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-[#14100D] rounded-lg border border-[#4A453B] focus:outline-none focus:border-[#39FF8A] transition-all text-[#E8E2D4]"
          />
        </div>

      </div>

      {/* Posts Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-[#14100D] border border-[#4A453B] animate-pulse" />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-[#14100D] rounded-xl overflow-hidden border border-[#4A453B] hover:border-[#39FF8A] transition-all cursor-pointer flex flex-col group shadow-lg"
            >
              {/* Optional Post Image */}
              {post.imageUrl ? (
                <div className="h-40 overflow-hidden relative bg-[#14100D]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100D] via-transparent to-transparent" />
                </div>
              ) : (
                <div className="h-24 bg-[#14100D] p-4 relative flex items-center justify-between border-b border-[#4A453B]">
                  <Rss className="w-6 h-6 text-[#39FF8A]" />
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#14100D] text-[#39FF8A] border border-[#39FF8A]/30">
                    Cloudflare Blog
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Category Pills & Reading Time */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#14100D] text-[#4A453B] border border-[#4A453B]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#4A453B] flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3 text-[#39FF8A]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-mono font-bold text-[#E8E2D4] line-clamp-2 group-hover:text-[#39FF8A] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-xs font-serif text-[#E8E2D4]/80 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-dashed border-[#4A453B] flex items-center justify-between text-xs text-[#4A453B] font-mono">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E8672C]" />
                    {post.author}
                  </span>

                  <span className="text-[#E8672C] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read Article <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#14100D] rounded-xl border border-[#4A453B]">
          <BookOpen className="w-10 h-10 text-[#4A453B] mx-auto mb-3" />
          <h3 className="text-base font-mono font-bold text-[#E8E2D4]">
            No articles found
          </h3>
          <p className="text-xs font-serif text-[#4A453B] mt-1">
            Try modifying your search or switching category filter options.
          </p>
        </div>
      )}

    </div>
  );
};
