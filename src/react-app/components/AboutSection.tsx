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
      
      {/* Bio & Brand Essence Card */}
      <div className="scanlines bg-[#14100D] p-6 sm:p-8 rounded-2xl border border-[#4A453B] space-y-6">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#39FF8A] bg-[#14100D] flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-[#E8672C]" />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-black tracking-tight text-[#39FF8A]">
                cyber
              </span>
              <span className="font-mono text-2xl font-black tracking-tight text-[#E8672C]">
                frikkie
              </span>
            </div>
            <p className="text-xs font-mono text-[#39FF8A] uppercase tracking-wider mt-0.5">
              The smart friend at the braai who happens to know how AI works
            </p>
          </div>
        </div>

        <p className="text-base font-serif text-[#E8E2D4] leading-relaxed">
          Ja nee, tech moves fast — but it doesn't need to be buried in Big Tech jargon. Cyberfrikkie translates AI, gadgets, edge networks, and digital culture in plain, warm, South African-flavoured language so ordinary ouens can actually understand how things work.
        </p>

        {/* Social / External Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#14100D] border border-[#4A453B] hover:border-[#39FF8A] text-[#E8E2D4] text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-[#39FF8A]" />
            GitHub Repository
          </a>

          <a
            href="https://radar.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#14100D] border border-[#4A453B] hover:border-[#E8672C] text-[#E8E2D4] text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#E8672C]" />
            Cloudflare Radar
          </a>

          <a
            href="https://blog.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#14100D] border border-[#4A453B] hover:border-[#39FF8A] text-[#E8E2D4] text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#39FF8A]" />
            Cloudflare Blog
          </a>
        </div>

      </div>

      {/* Content Pillars & Infrastructure Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Content Pillars */}
        <div className="bg-[#14100D] p-6 rounded-2xl border border-[#4A453B] space-y-4">
          <h3 className="text-base font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#E8672C]" />
            Content Pillars & Series
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#39FF8A]">Ja Nee, AI</span>
              <span className="text-[#4A453B]">AI news with healthy SA skepticism</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8672C]">Boer Maak 'n Plan</span>
              <span className="text-[#4A453B]">DIY fixes & clever workarounds</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#39FF8A]">Frikkie Explains</span>
              <span className="text-[#4A453B]">Plain-language tech explainers</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8672C]">Load-shredding</span>
              <span className="text-[#4A453B]">Power backup & surviving gear</span>
            </div>
          </div>
        </div>

        {/* Card 2: Technical Architecture */}
        <div className="bg-[#14100D] p-6 rounded-2xl border border-[#4A453B] space-y-4">
          <h3 className="text-base font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
            <Server className="w-5 h-5 text-[#39FF8A]" />
            Edge Worker Architecture
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8E2D4]">Cloudflare Workers</span>
              <span className="text-[#39FF8A]">Edge API Backend</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8E2D4]">Hono Server</span>
              <span className="text-[#39FF8A]">RSS & Telemetry Proxy</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8E2D4]">React 19 & Vite</span>
              <span className="text-[#E8672C]">Modern UI Runtime</span>
            </div>

            <div className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between">
              <span className="font-bold text-[#E8E2D4]">JetBrains Mono & Lora</span>
              <span className="text-[#E8672C]">Terminal / Human Typography</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
