import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Briefcase, Sparkles, Building2, MapPin, DollarSign, Filter, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const JobsView: React.FC = () => {
  const { jobListings, applyToJob, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'applied') return matchesSearch && (job.status === 'applied' || job.status === 'interviewing');
    if (filterType === 'highMatch') return matchesSearch && job.matchScore >= 90;
    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
            Verified Startup & Enterprise Network
          </span>
          <h1 className="text-3xl font-black mt-1">Internships & Startup Projects</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Apply directly with your verified Navricon Placement Profile & ATS Resume.
          </p>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filterType === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Openings ({jobListings.length})
          </button>
          <button
            onClick={() => setFilterType('highMatch')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filterType === 'highMatch' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            90%+ Match
          </button>
          <button
            onClick={() => setFilterType('applied')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filterType === 'applied' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Applied
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-white/10 text-xs">
        <Search className="w-5 h-5 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by role (Full Stack, React 19, Gemini), company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none"
        />
      </div>

      {/* JOB LISTINGS CARDS */}
      <div className="space-y-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                {job.logo}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">
                    {job.matchScore}% AI Match
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-bold">
                    {job.type}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 flex items-center gap-2">
                  <span className="font-semibold text-zinc-300">{job.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-white"><DollarSign className="w-3 h-3 text-emerald-400" /> {job.stipend}</span>
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl pt-1">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(job.tags || []).map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-zinc-300 text-[10px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Side */}
            <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
              <span className="text-[10px] text-zinc-500 font-mono">Posted {job.postedDate}</span>
              <button
                disabled={job.status === 'applied' || job.status === 'interviewing'}
                onClick={() => applyToJob(job.id)}
                className={`px-6 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
                  job.status === 'applied' || job.status === 'interviewing'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:scale-105'
                }`}
              >
                {job.status === 'applied' || job.status === 'interviewing' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Application Submitted
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white" /> 1-Click AI Apply
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
