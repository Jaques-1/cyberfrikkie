import React from 'react';
import { ProfileData } from '../types';
import { ShieldCheck, Cpu, Globe, Server } from 'lucide-react';

interface HeroBannerProps {
  profile: ProfileData | null;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile }) => {
  const defaultProfile = {
    username: 'cyberfrikkie',
    displayName: 'CyberFrikkie',
    title: 'Cloudflare & Edge Systems Developer',
    location: 'Global Edge Network',
    bio: 'Building hyper-fast web applications, AI agents, and security analytics on Cloudflare Workers, Hono, and React.',
    avatar: 'https://avatars.githubusercontent.com/u/1024097?v=4',
    status: 'Online • Cloudflare Worker Active',
    stats: {
      workerUptime: '99.99%',
      globalLocations: 330,
      radarDataFeeds: 12,
      activeProjects: 8
    }
  };

  const p = profile || defaultProfile;

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
      {/* Glowing background ambient lights matching mock-lms */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        
        {/* Profile Info */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={p.avatar}
              alt={p.displayName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-2xl bg-slate-800"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-slate-900 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-300" />
                @{p.username}
              </span>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3 text-amber-400" />
                {p.location}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
              {p.displayName}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium mt-1 max-w-xl">
              {p.bio}
            </p>
          </div>
        </div>

        {/* Cloudflare Edge Badge Summary */}
        <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 flex items-center gap-5 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
          <div>
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block flex items-center gap-1">
              <Server className="w-3 h-3 text-emerald-400" />
              Worker Uptime
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              {p.stats.workerUptime}
            </span>
          </div>

          <div className="h-10 w-px bg-white/20" />

          <div>
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              Edge Locations
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              {p.stats.globalLocations}+
            </span>
          </div>

          <div className="h-10 w-px bg-white/20" />

          <div>
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block flex items-center gap-1">
              <Cpu className="w-3 h-3 text-amber-400" />
              Radar Feeds
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white">
              {p.stats.radarDataFeeds}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
