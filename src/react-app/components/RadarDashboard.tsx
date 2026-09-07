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
      <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 animate-pulse">
        <Activity className="w-10 h-10 text-indigo-500 mx-auto animate-spin mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          Loading Cloudflare Radar Metrics...
        </h3>
      </div>
    );
  }

  const { globalNetflows, attackVectors, protocolAdoption, aiBotActivity, keyStats } = radarData;

  return (
    <div className="space-y-8">
      
      {/* Radar Section Title & Live Update Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-slate-800 text-white shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
              radar.cloudflare.com Telemetry
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Global Internet Intelligence & Security Metrics
          </h2>
          <p className="text-xs text-indigo-200 mt-1">
            Real-time edge netflows, threat vector classifications, web protocol adoption rates, and AI crawler activity.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs font-semibold shrink-0">
          Last Synced: <span className="font-bold text-amber-300">{new Date(radarData.updatedAt).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <ShieldAlert className="w-4 h-4 text-indigo-500" />
            Mitigated DDoS Req/sec
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {keyStats.globalMitigatedRequestsSec}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Protected across 330+ edge locations
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <Globe className="w-4 h-4 text-cyan-500" />
            Active BGP Routes
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {keyStats.activeBgpRoutes}
          </p>
          <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
            Global RIB Table announced
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <Server className="w-4 h-4 text-emerald-500" />
            Avg Edge Latency
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {keyStats.avgEdgeLatencyMs}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Sub-20ms to 95% global population
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <Layers className="w-4 h-4 text-amber-500" />
            RPKI ROA Validation
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {keyStats.rpkiValidationShare}
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
            Route Origin Validation Coverage
          </p>
        </div>

      </div>

      {/* Chart Row 1: Global Netflows Area Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Global Netflows & Traffic Index (7-Day Trend)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Normalized volume index of global network requests and Human vs Bot breakdown.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalNetflows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="humanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 110]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                }}
              />
              <Area
                type="monotone"
                dataKey="trafficIndex"
                name="Traffic Index"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#trafficGradient)"
              />
              <Area
                type="monotone"
                dataKey="humanPercentage"
                name="Human Share %"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#humanGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Row 2: Security Attack Vectors + Web Protocols */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security Threat Distribution */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-500" />
              Cyber Attack Vector Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Distribution of global malicious traffic mitigated at Cloudflare edge.
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackVectors}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={5}
                >
                  {attackVectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Web Protocol & Modern Standards Adoption */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-500" />
              Modern Web Protocol Adoption
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Share of global traffic utilizing TLS 1.3, HTTP/3 QUIC, IPv6, and Mobile devices.
            </p>
          </div>

          <div className="h-64 w-full my-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={protocolAdoption} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <YAxis type="category" dataKey="protocol" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="adoptionRate" name="Adoption Rate (%)" radius={[0, 8, 8, 0]}>
                  {protocolAdoption.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Chart Row 3: AI Crawler & Bot Telemetry */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-500" />
              AI Bot Crawlers & Generative Engine Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Request distribution among top AI web crawlers monitored on Cloudflare Radar.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Radar Bot Telemetry 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          <div className="lg:col-span-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiBotActivity} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="botName" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '14px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="requestShare" name="Request Share %" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Bot List Details */}
          <div className="space-y-3">
            {aiBotActivity.map((bot) => (
              <div
                key={bot.botName}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {bot.botName}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {bot.status}
                  </span>
                </div>
                <span className="font-black text-amber-600 dark:text-amber-400">
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
