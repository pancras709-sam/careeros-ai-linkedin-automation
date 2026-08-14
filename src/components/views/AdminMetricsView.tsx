import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Activity, Server, Cpu, Database, CheckCircle2 } from 'lucide-react';

export const AdminMetricsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
          Platform Infrastructure
        </span>
        <h1 className="text-3xl font-black mt-1">Navricon System Metrics & Telemetry</h1>
        <p className="text-xs text-zinc-400 mt-1">Live server latency, API request rates, and microservice status.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60">
          <p className="text-xs text-zinc-400 font-medium">Server Uptime</p>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">99.99%</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Cloud Run Instance Healthy</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60">
          <p className="text-xs text-zinc-400 font-medium">Gemini 3.6 API Latency</p>
          <h3 className="text-3xl font-black text-blue-400 mt-1">124ms</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Stream Token Ingestion</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60">
          <p className="text-xs text-zinc-400 font-medium">Daily Active Users</p>
          <h3 className="text-3xl font-black text-white mt-1">42,850 DAU</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Students & Companies</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60">
          <p className="text-xs text-zinc-400 font-medium">Active Database Connections</p>
          <h3 className="text-3xl font-black text-amber-400 mt-1">1,420 / 5,000</h3>
          <p className="text-[11px] text-zinc-500 mt-1">Express API Proxy Pool</p>
        </div>
      </div>
    </div>
  );
};
