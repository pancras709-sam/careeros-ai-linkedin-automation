import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, BarChart3, TrendingUp, Users, Award, FileSpreadsheet, Sparkles } from 'lucide-react';

export const CollegeAnalyticsView: React.FC = () => {
  const { addToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            University Placement Cell Dashboard
          </span>
          <h1 className="text-3xl font-black mt-1">Stanford & Tech Partner Placement Intelligence</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Batch-wide skill gap heatmaps, recruiter engagement metrics, and NAAC accreditation reports.
          </p>
        </div>

        <button
          onClick={() => addToast('Report Downloaded', 'Exported NAAC Placement Report (PDF).', 'success')}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export NAAC Audit Report
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          <p className="text-xs text-zinc-400 font-medium">Placed Students Rate</p>
          <h3 className="text-3xl font-black mt-1 text-emerald-400">94.2%</h3>
          <p className="text-[11px] text-zinc-500 mt-2">+6.8% YoY Increase</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          <p className="text-xs text-zinc-400 font-medium">Average Annual CTC Offer</p>
          <h3 className="text-3xl font-black mt-1 text-white">$142,000</h3>
          <p className="text-[11px] text-emerald-400 mt-2">Highest Offer: $240,000 (Stripe)</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          <p className="text-xs text-zinc-400 font-medium">Active Recruiting Partners</p>
          <h3 className="text-3xl font-black mt-1 text-blue-400">184 Startups</h3>
          <p className="text-[11px] text-zinc-500 mt-2">32 Campus Drives Scheduled</p>
        </div>
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          <p className="text-xs text-zinc-400 font-medium">Avg ATS Resume Score</p>
          <h3 className="text-3xl font-black mt-1 text-amber-400">91.4 / 100</h3>
          <p className="text-[11px] text-zinc-500 mt-2">Top 1% Nationwide Benchmark</p>
        </div>
      </div>

      {/* DEPARTMENT HEATMAP */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" /> Department-Level Placement Performance
        </h2>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">Computer Science & AI Engineering</h4>
              <p className="text-zinc-400 mt-0.5">340 Students • 98.2% Placement Rate</p>
            </div>
            <span className="text-emerald-400 font-bold text-sm">$155,000 Avg CTC</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white text-sm">Electrical & Embedded Systems</h4>
              <p className="text-zinc-400 mt-0.5">210 Students • 91.5% Placement Rate</p>
            </div>
            <span className="text-emerald-400 font-bold text-sm">$128,000 Avg CTC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
