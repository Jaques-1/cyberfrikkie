import React from 'react';
import { RadarData } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Activity, ShieldAlert, Cpu, Bot, Globe, Server, Layers } from 'lucide-react';

interface RadarDashboardProps {
  radarData: RadarData | null;
}

export const RadarDashboard: React.FC<RadarDashboardProps> = ({ radarData }) => {
  if (!radarData) {
    return (
      <div className="p-12 text-center bg-[#14100D] rounded-xl border border-[#4A453B] animate-pulse">
        <Activity className="w-10 h-10 text-[#39FF8A] mx-auto animate-spin mb-3" />
        <h3 className="text-base font-mono font-bold text-[#E8E2D4]">
          Loading Cloudflare Radar Metrics...
        </h3>
      </div>
    );
  }

  const { globalNetflows, protocolAdoption, aiBotActivity, keyStats } = radarData;

  // Custom Brand Attack Vectors with Cyber Green, Frikkie Rust, Khaki & Off-white
  const brandAttackVectors = [
    { name: "Layer 3/4 DDoS", percentage: 48, color: "#39FF8A" },
    { name: "Layer 7 HTTP Floods", percentage: 32, color: "#E8672C" },
    { name: "Credential Stuffing", percentage: 12, color: "#E8E2D4" },
    { name: "WAF Exploits", percentage: 8, color: "#4A453B" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-[#14100D] rounded-xl border border-[#4A453B] text-[#E8E2D4]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF8A] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF8A]">
              radar.cloudflare.com Telemetry
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-black text-[#E8E2D4] mt-1">
            Global Internet Intelligence & Threat Metrics
          </h2>
          <p className="text-xs font-serif text-[#E8E2D4]/70 mt-1">
            Real-time edge netflows, attack vector classifications, web protocol adoption, and AI bot crawler activity.
          </p>
        </div>

        <div className="bg-[#14100D] px-4 py-2 rounded-lg border border-[#4A453B] text-xs font-mono shrink-0">
          Last Synced: <span className="font-bold text-[#E8672C]">{new Date(radarData.updatedAt).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#14100D] p-5 rounded-xl border border-[#4A453B]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4A453B] uppercase">
            <ShieldAlert className="w-4 h-4 text-[#39FF8A]" />
            Mitigated DDoS Req/sec
          </div>
          <p className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4] mt-2">
            {keyStats.globalMitigatedRequestsSec}
          </p>
          <p className="text-[11px] font-mono text-[#39FF8A] font-semibold mt-1">
            Protected across 330+ edge nodes
          </p>
        </div>

        <div className="bg-[#14100D] p-5 rounded-xl border border-[#4A453B]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4A453B] uppercase">
            <Globe className="w-4 h-4 text-[#E8672C]" />
            Active BGP Routes
          </div>
          <p className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4] mt-2">
            {keyStats.activeBgpRoutes}
          </p>
          <p className="text-[11px] font-mono text-[#E8672C] font-semibold mt-1">
            Global RIB Table announced
          </p>
        </div>

        <div className="bg-[#14100D] p-5 rounded-xl border border-[#4A453B]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4A453B] uppercase">
            <Server className="w-4 h-4 text-[#39FF8A]" />
            Avg Edge Latency
          </div>
          <p className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4] mt-2">
            {keyStats.avgEdgeLatencyMs}
          </p>
          <p className="text-[11px] font-mono text-[#39FF8A] font-semibold mt-1">
            Sub-20ms to 95% global population
          </p>
        </div>

        <div className="bg-[#14100D] p-5 rounded-xl border border-[#4A453B]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4A453B] uppercase">
            <Layers className="w-4 h-4 text-[#E8672C]" />
            RPKI ROA Validation
          </div>
          <p className="text-2xl sm:text-3xl font-mono font-black text-[#E8E2D4] mt-2">
            {keyStats.rpkiValidationShare}
          </p>
          <p className="text-[11px] font-mono text-[#E8672C] font-semibold mt-1">
            Route Origin Validation Coverage
          </p>
        </div>

      </div>

      {/* Chart Row 1: Global Netflows */}
      <div className="bg-[#14100D] p-6 rounded-xl border border-[#4A453B]">
        <div className="mb-6">
          <h3 className="text-lg font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#39FF8A]" />
            Global Netflows & Traffic Index (7-Day Trend)
          </h3>
          <p className="text-xs font-serif text-[#4A453B] mt-0.5">
            Normalized volume index of global network requests and Human vs Bot breakdown.
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalNetflows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39FF8A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#39FF8A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="humanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8672C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E8672C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A453B" opacity={0.3} />
              <XAxis dataKey="timestamp" stroke="#4A453B" fontSize={11} tickLine={false} />
              <YAxis stroke="#4A453B" fontSize={11} tickLine={false} domain={[0, 110]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#14100D',
                  borderColor: '#4A453B',
                  borderRadius: '8px',
                  color: '#E8E2D4',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Area
                type="monotone"
                dataKey="trafficIndex"
                name="Traffic Index"
                stroke="#39FF8A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#trafficGradient)"
              />
              <Area
                type="monotone"
                dataKey="humanPercentage"
                name="Human Share %"
                stroke="#E8672C"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#humanGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Row 2: Threat Breakdown & Web Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Threat Distribution */}
        <div className="bg-[#14100D] p-6 rounded-xl border border-[#4A453B] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#39FF8A]" />
              Cyber Attack Vector Breakdown
            </h3>
            <p className="text-xs font-serif text-[#4A453B] mt-0.5">
              Distribution of global malicious traffic mitigated at Cloudflare edge.
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandAttackVectors}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={5}
                >
                  {brandAttackVectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14100D',
                    borderColor: '#4A453B',
                    borderRadius: '8px',
                    color: '#E8E2D4',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Web Protocols */}
        <div className="bg-[#14100D] p-6 rounded-xl border border-[#4A453B] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#E8672C]" />
              Modern Web Protocol Adoption
            </h3>
            <p className="text-xs font-serif text-[#4A453B] mt-0.5">
              Share of global traffic utilizing TLS 1.3, HTTP/3 QUIC, IPv6, and Mobile devices.
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={protocolAdoption} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A453B" opacity={0.3} />
                <XAxis type="number" stroke="#4A453B" fontSize={11} domain={[0, 100]} />
                <YAxis type="category" dataKey="protocol" stroke="#4A453B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14100D',
                    borderColor: '#4A453B',
                    borderRadius: '8px',
                    color: '#E8E2D4',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Bar dataKey="adoptionRate" name="Adoption Rate (%)" fill="#39FF8A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Chart Row 3: AI Bot Activity */}
      <div className="bg-[#14100D] p-6 rounded-xl border border-[#4A453B]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-mono font-extrabold text-[#E8E2D4] flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#E8672C]" />
              AI Bot Crawlers & Generative Engine Activity
            </h3>
            <p className="text-xs font-serif text-[#4A453B] mt-0.5">
              Request distribution among top AI web crawlers monitored on Cloudflare Radar.
            </p>
          </div>
          <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-[#14100D] text-[#E8672C] border border-[#E8672C]/40">
            Radar Bot Telemetry 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiBotActivity} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A453B" opacity={0.3} />
                <XAxis dataKey="botName" stroke="#4A453B" fontSize={11} tickLine={false} />
                <YAxis stroke="#4A453B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14100D',
                    borderColor: '#4A453B',
                    borderRadius: '8px',
                    color: '#E8E2D4',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Bar dataKey="requestShare" name="Request Share %" fill="#E8672C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Bot List Details */}
          <div className="space-y-3">
            {aiBotActivity.map((bot) => (
              <div
                key={bot.botName}
                className="p-3 rounded-lg bg-[#14100D] border border-[#4A453B] flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-[#E8E2D4] block">
                    {bot.botName}
                  </span>
                  <span className="text-[10px] text-[#4A453B]">
                    {bot.status}
                  </span>
                </div>
                <span className="font-bold text-[#39FF8A]">
                  {bot.requestShare}%
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};
