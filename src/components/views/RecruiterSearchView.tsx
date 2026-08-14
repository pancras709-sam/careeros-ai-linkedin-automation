import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Filter, Briefcase, Mail } from 'lucide-react';

export const RecruiterSearchView: React.FC = () => {
  const { candidates, addToast } = useApp();
  const [query, setQuery] = useState('');

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
          Executive Sourcing Portal
        </span>
        <h1 className="text-3xl font-black mt-1">Recruiter Candidate Search & Outreach</h1>
        <p className="text-xs text-zinc-400 mt-1">Search 100,000+ top engineering candidates with verified skill scores.</p>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-white/10 text-xs">
        <Search className="w-5 h-5 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Filter by skill, university, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-white focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((candidate) => (
          <div key={candidate.id} className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">{candidate.name}</h3>
              <span className="text-emerald-400 font-bold text-xs">{candidate.placementScore}/100</span>
            </div>
            <p className="text-xs text-zinc-400">{candidate.university} • Year {candidate.year}</p>
            <div className="flex flex-wrap gap-1">
              {(candidate.skills || []).map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-300">{s}</span>
              ))}
            </div>
            <button
              onClick={() => addToast('Outreach Sent!', `InMail message delivered to ${candidate.name}`, 'success')}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Send Verified InMail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
