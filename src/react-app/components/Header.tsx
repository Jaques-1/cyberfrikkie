import React from 'react';
import { TabType } from '../types';
import { 
  Rss, 
  BarChart3, 
  User, 
  RefreshCw, 
  Activity 
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onRefreshData,
  isRefreshing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#14100D]/95 backdrop-blur-md border-b border-[#4A453B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Icon Mark Lockup */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3.5 cursor-pointer group py-2"
          >
            {/* Icon Mark: Circular 'braai tongs meets circuit trace' */}
            <div className="w-11 h-11 rounded-full border-2 border-[#39FF8A] bg-[#14100D] flex items-center justify-center relative shadow-[0_0_15px_rgba(57,255,138,0.2)] group-hover:border-[#E8672C] transition-colors shrink-0">
              <svg className="w-6 h-6 text-[#39FF8A] group-hover:text-[#E8672C] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path d="M7 7L17 17M17 7L7 17" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 4V7M12 17V20M4 12H7M17 12H20" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.5" fill="#39FF8A" className="animate-pulse" />
              </svg>
            </div>

            {/* Split Wordmark with CRT Glitch Offset */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="relative inline-flex items-baseline font-mono font-bold tracking-tight text-xl sm:text-2xl select-none">
                  {/* Subtle CRT Glitch Shadow Layer */}
                  <div className="absolute top-0.5 left-0.5 opacity-30 blur-[0.5px] pointer-events-none" aria-hidden="true">
                    <span className="text-[#39FF8A]">cyber</span>
                    <span className="text-[#E8672C]">frikkie</span>
                  </div>
                  {/* Primary Front Layer */}
                  <div className="relative z-10">
                    <span className="text-[#39FF8A]">cyber</span>
                    <span className="text-[#E8672C]">frikkie</span>
                  </div>
                </div>

                <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#4A453B] text-[#39FF8A] bg-[#14100D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF8A] animate-pulse" />
                  Cloudflare Worker
                </span>
              </div>
              
              <p className="text-[11px] font-mono text-[#4A453B] hidden sm:block mt-0.5">
                Tech, translated for the rest of us
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-[#14100D] rounded-xl border border-[#4A453B]">
            <button
              onClick={() => onSelectTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[#E8672C] text-[#14100D]'
                  : 'text-[#E8E2D4] hover:bg-[#4A453B]/30'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Overview
            </button>

            <button
              onClick={() => onSelectTab('blog')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'blog'
                  ? 'bg-[#E8672C] text-[#14100D]'
                  : 'text-[#E8E2D4] hover:bg-[#4A453B]/30'
              }`}
            >
              <Rss className="w-3.5 h-3.5" />
              Cloudflare Blog
            </button>

            <button
              onClick={() => onSelectTab('radar')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'radar'
                  ? 'bg-[#E8672C] text-[#14100D]'
                  : 'text-[#E8E2D4] hover:bg-[#4A453B]/30'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Radar Telemetry
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === 'about'
                  ? 'bg-[#E8672C] text-[#14100D]'
                  : 'text-[#E8E2D4] hover:bg-[#4A453B]/30'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              About
            </button>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              title="Refresh Feeds"
              className="p-2.5 rounded-lg bg-[#14100D] border border-[#4A453B] hover:border-[#39FF8A] text-[#E8E2D4] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#39FF8A]' : ''}`} />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-[#4A453B] overflow-x-auto gap-1">
          <button
            onClick={() => onSelectTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#E8672C] text-[#14100D]' : 'text-[#E8E2D4]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Overview
          </button>
          <button
            onClick={() => onSelectTab('blog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'blog' ? 'bg-[#E8672C] text-[#14100D]' : 'text-[#E8E2D4]'
            }`}
          >
            <Rss className="w-3.5 h-3.5" />
            Blog
          </button>
          <button
            onClick={() => onSelectTab('radar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'radar' ? 'bg-[#E8672C] text-[#14100D]' : 'text-[#E8E2D4]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Radar
          </button>
          <button
            onClick={() => onSelectTab('about')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'about' ? 'bg-[#E8672C] text-[#14100D]' : 'text-[#E8E2D4]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            About
          </button>
        </div>

      </div>
    </header>
  );
};
