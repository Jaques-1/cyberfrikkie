import React from 'react';
import { ProfileData } from '../types';
import { ShieldCheck, Globe, Server, Cpu } from 'lucide-react';

interface HeroBannerProps {
  profile: ProfileData | null;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ profile }) => {
  const defaultProfile = {
    username: 'cyberfrikkie',
    displayName: 'cyberfrikkie',
    title: 'Tech, translated for the rest of us',
    location: 'South Africa • Global Edge Network',
    bio: 'The smart friend at the braai who happens to know how AI works. Plain-spoken, dry, and quietly sharp.',
    avatar: 'https://avatars.githubusercontent.com/u/1024097?v=4',
    status: 'Online • Edge Worker Active',
    stats: {
      workerUptime: '99.99%',
      globalLocations: 330,
      radarDataFeeds: 12,
      activeProjects: 8
    }
  };

  const p = profile || defaultProfile;

  return (
    <div className="scanlines bg-[#14100D] rounded-2xl p-6 sm:p-8 text-[#E8E2D4] shadow-xl relative overflow-hidden border border-[#4A453B]">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        
        {/* Profile Details */}
        <div className="flex items-start sm:items-center gap-5">
          <div className="relative shrink-0">
            <img
              src={p.avatar}
              alt={p.displayName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover ring-2 ring-[#39FF8A]/50 bg-[#14100D]"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#39FF8A] ring-4 ring-[#14100D] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14100D]" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold bg-[#14100D] text-[#39FF8A] border border-[#39FF8A]/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#39FF8A]" />
                @{p.username}
              </span>
              <span className="text-xs font-mono text-[#4A453B] flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#E8672C]" />
                {p.location}
              </span>
            </div>

            {/* Main Brand Logo Lockup with CRT Glitch Offset */}
            <div className="relative inline-flex items-baseline font-mono font-bold tracking-tight text-3xl sm:text-5xl select-none mt-1">
              <div className="absolute top-0.5 left-0.5 opacity-30 blur-[0.5px] pointer-events-none" aria-hidden="true">
                <span className="text-[#39FF8A]">cyber</span>
                <span className="text-[#E8672C]">frikkie</span>
              </div>
              <div className="relative z-10">
                <span className="text-[#39FF8A]">cyber</span>
                <span className="text-[#E8672C]">frikkie</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-serif text-[#E8E2D4] mt-2 max-w-xl leading-relaxed">
              {p.bio}
            </p>
          </div>
        </div>

        {/* Brand Stat Badges */}
        <div className="bg-[#14100D] p-4 sm:p-5 rounded-xl border border-[#4A453B] flex items-center gap-5 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#4A453B] uppercase tracking-wider block flex items-center gap-1">
              <Server className="w-3 h-3 text-[#39FF8A]" />
              Worker Uptime
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4]">
              {p.stats.workerUptime}
            </span>
          </div>

          <div className="h-10 w-px bg-[#4A453B]" />

          <div>
            <span className="text-[10px] font-mono font-bold text-[#4A453B] uppercase tracking-wider block flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#E8672C]" />
              Edge Nodes
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4]">
              {p.stats.globalLocations}+
            </span>
          </div>

          <div className="h-10 w-px bg-[#4A453B]" />

          <div>
            <span className="text-[10px] font-mono font-bold text-[#4A453B] uppercase tracking-wider block flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[#39FF8A]" />
              Radar Feeds
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#E8672C]">
              {p.stats.radarDataFeeds}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
