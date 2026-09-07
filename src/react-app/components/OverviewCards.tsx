import React from 'react';
import { BlogPost, RadarData } from '../types';
import { Rss, ShieldAlert, Activity, Cpu } from 'lucide-react';

interface OverviewCardsProps {
  posts: BlogPost[];
  radarData: RadarData | null;
  onSelectTab: (tab: 'blog' | 'radar') => void;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  posts,
  radarData,
  onSelectTab
}) => {
  const latestPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Blog Feed */}
      <div 
        onClick={() => onSelectTab('blog')}
        className="bg-[#14100D] rounded-xl p-5 border border-[#4A453B] hover:border-[#39FF8A] transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-[#4A453B] uppercase tracking-wider">
            Cloudflare Blog Feed
          </span>
          <div className="p-2 rounded-lg bg-[#39FF8A]/10 text-[#39FF8A] group-hover:scale-110 transition-transform">
            <Rss className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-[#E8E2D4]">
              {posts.length}
            </span>
            <span className="text-xs font-mono font-semibold text-[#39FF8A]">
              Synced Posts
            </span>
          </div>
          <p className="text-xs font-serif text-[#E8E2D4]/70 mt-1 line-clamp-1">
            Latest: {latestPost ? latestPost.title : 'Cloudflare RSS Updates'}
          </p>
        </div>
      </div>

      {/* Card 2: Radar Netflows */}
      <div 
        onClick={() => onSelectTab('radar')}
        className="bg-[#14100D] rounded-xl p-5 border border-[#4A453B] hover:border-[#E8672C] transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-[#4A453B] uppercase tracking-wider">
            Radar Global Netflows
          </span>
          <div className="p-2 rounded-lg bg-[#E8672C]/10 text-[#E8672C] group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-[#E8E2D4]">
              100
            </span>
            <span className="text-xs font-mono font-semibold text-[#E8672C]">
              Peak Traffic Index
            </span>
          </div>
          <p className="text-xs font-serif text-[#E8E2D4]/70 mt-1">
            Avg Edge Latency: <span className="font-mono font-bold text-[#39FF8A]">{radarData?.keyStats.avgEdgeLatencyMs || '18ms'}</span>
          </p>
        </div>
      </div>

      {/* Card 3: Security Shield */}
      <div 
        onClick={() => onSelectTab('radar')}
        className="bg-[#14100D] rounded-xl p-5 border border-[#4A453B] hover:border-[#39FF8A] transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-[#4A453B] uppercase tracking-wider">
            Mitigated Threats/sec
          </span>
          <div className="p-2 rounded-lg bg-[#39FF8A]/10 text-[#39FF8A] group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-[#E8E2D4]">
              74.5M
            </span>
            <span className="text-xs font-mono font-semibold text-[#39FF8A]">
              DDoS Blocked
            </span>
          </div>
          <p className="text-xs font-serif text-[#E8E2D4]/70 mt-1">
            RPKI Validation: <span className="font-mono font-bold text-[#E8672C]">{radarData?.keyStats.rpkiValidationShare || '91.4%'}</span>
          </p>
        </div>
      </div>

      {/* Card 4: Architecture Stack */}
      <div className="bg-[#14100D] rounded-xl p-5 border border-[#4A453B] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-[#4A453B] uppercase tracking-wider">
            Architecture Stack
          </span>
          <div className="p-2 rounded-lg bg-[#E8672C]/10 text-[#E8672C]">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-mono font-black text-[#E8E2D4]">
              Hono + React
            </span>
          </div>
          <p className="text-xs font-serif text-[#E8E2D4]/70 mt-1">
            Deployed on <span className="font-mono font-bold text-[#39FF8A]">Cloudflare Workers</span>
          </p>
        </div>
      </div>

    </div>
  );
};
