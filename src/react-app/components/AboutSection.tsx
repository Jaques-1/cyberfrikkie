import React from 'react';
import { ProfileData } from '../types';
import { 
  Zap, 
  Server, 
  Code2, 
  Globe, 
  ExternalLink
} from 'lucide-react';

interface AboutSectionProps {
  profile?: ProfileData | null;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <div className="space-y-8">
      
      {/* Bio & Intro Card */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20 shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Zap className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              About cyberfrikkie
            </h2>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mt-0.5">
              Cloudflare Edge Developer & Systems Engineer
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Welcome to my personal developer hub! I specialize in architecting distributed applications, real-time telemetry systems, and stateful AI workers on the Cloudflare Developer Platform. This application compiles live Cloudflare Blog updates and deep analytics from Cloudflare Radar into a high-performance web experience.
        </p>

        {/* Social / Link buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700/60"
          >
            <Code2 className="w-4 h-4 text-indigo-500" />
            GitHub Profile
          </a>

          <a
            href="https://radar.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all flex items-center gap-2 border border-indigo-500/20"
          >
            <Globe className="w-4 h-4 text-indigo-500" />
            Cloudflare Radar
          </a>

          <a
            href="https://blog.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 text-xs font-bold transition-all flex items-center gap-2 border border-amber-500/20"
          >
            <ExternalLink className="w-4 h-4 text-amber-500" />
            Cloudflare Blog
          </a>
        </div>

      </div>

      {/* Tech Stack & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Cloudflare Stack */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-500" />
            Cloudflare Infrastructure Stack
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Cloudflare Workers</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Serverless Edge API</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Hono Router</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Ultra-light HTTP Server</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Wrangler CLI & Assets</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">SPA Static Asset Binding</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Fast XML RSS Parser</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Edge Stream Feed Parsing</span>
            </div>
          </div>
        </div>

        {/* Card 2: Frontend & UI Design System */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-500" />
            Frontend & Visual Architecture
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">React 19 & Vite</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Modern Frontend Engine</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Tailwind CSS & Plus Jakarta</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Mock-LMS Design System</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Recharts Engine</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Radar Data Visualizer</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Lucide Icons</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Minimal Iconography</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
