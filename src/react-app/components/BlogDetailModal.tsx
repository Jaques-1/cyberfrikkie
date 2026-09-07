import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { X, ExternalLink, Clock, Calendar, User } from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14100D]/85 backdrop-blur-sm">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#14100D] rounded-2xl shadow-2xl border border-[#4A453B] flex flex-col overflow-hidden z-10">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#14100D] text-[#E8E2D4] flex items-start justify-between gap-4 border-b border-[#4A453B] relative">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#14100D] text-[#39FF8A] border border-[#39FF8A]/40"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-mono font-black text-[#E8E2D4] tracking-tight leading-snug">
              {post.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#4A453B] pt-1">
              <span className="flex items-center gap-1.5 text-[#E8672C]">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5 text-[#E8E2D4]">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5 text-[#39FF8A]">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#14100D] border border-[#4A453B] hover:border-[#E8672C] text-[#E8E2D4] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#E8E2D4]">
          
          {post.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[#4A453B] max-h-72">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Summary Block */}
          <div className="p-4 rounded-xl bg-[#14100D] border border-dashed border-[#4A453B] text-sm font-serif leading-relaxed">
            <span className="font-mono font-bold block uppercase tracking-wider text-[11px] text-[#39FF8A] mb-1">
              Plain-Language Summary
            </span>
            {post.description}
          </div>

          {/* Main Article Content */}
          <div 
            className="font-serif text-sm sm:text-base leading-relaxed space-y-4 text-[#E8E2D4]"
            dangerouslySetInnerHTML={{ __html: post.content || post.description }}
          />

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#14100D] border-t border-[#4A453B] flex items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#4A453B] hidden sm:block">
            Published via Cloudflare Official RSS Feed
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[#14100D] border border-[#4A453B] hover:border-[#E8E2D4] text-[#E8E2D4] transition-colors"
            >
              Close Reader
            </button>

            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#E8672C] hover:bg-[#d6571c] text-[#14100D] transition-all flex items-center gap-2"
            >
              View Original Post
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
