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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      {/* Card 1: Blog Feed */}
      <div 
        onClick={() => onSelectTab('blog')}
        className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Cloudflare Blog Feed
          </span>
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <Rss className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {posts.length}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Synced Posts
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
            Latest: {latestPost ? latestPost.title : 'Cloudflare RSS Updates'}
          </p>
        </div>
      </div>

      {/* Card 2: Radar Netflows */}
      <div 
        onClick={() => onSelectTab('radar')}
        className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Radar Global Netflows
          </span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              100
            </span>
            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              Peak Traffic Index
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Avg Edge Latency: <span className="font-bold text-slate-700 dark:text-slate-200">{radarData?.keyStats.avgEdgeLatencyMs || '18ms'}</span>
          </p>
        </div>
      </div>

      {/* Card 3: Security & Attack Shield */}
      <div 
        onClick={() => onSelectTab('radar')}
        className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Mitigated Threats/sec
          </span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              74.5M
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              DDoS Blocked
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            RPKI Validation: <span className="font-bold text-slate-700 dark:text-slate-200">{radarData?.keyStats.rpkiValidationShare || '91.4%'}</span>
          </p>
        </div>
      </div>

      {/* Card 4: Worker Stack */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Architecture Stack
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              Hono + React
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deployed on <span className="font-bold text-amber-600 dark:text-amber-400">Cloudflare Workers</span>
          </p>
        </div>
      </div>

    </div>
  );
};
