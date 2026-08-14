import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Search, CheckCircle2, Download, Award } from 'lucide-react';

export const CollegeStudentsView: React.FC = () => {
  const { candidates, addToast } = useApp();
  const [search, setSearch] = useState('');

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Verified Student Registry
          </span>
          <h1 className="text-3xl font-black mt-1">Verified Student Credential Directory</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Blockchain-backed transcript credentials, verified skill scores, and portfolio links.
          </p>
        </div>

        <button
          onClick={() => addToast('Exporting Directory', 'Downloaded CSV of all batch credentials.', 'info')}
          className="px-6 py-3 rounded-2xl bg-zinc-900 border border-white/10 text-white font-bold text-xs flex items-center gap-2 hover:bg-zinc-800 transition-all shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" /> Export Student Directory (CSV)
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-white/10 text-xs">
        <Search className="w-5 h-5 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Search student credentials by name, skill (React, TypeScript), or GPA..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none"
        />
      </div>

      {/* STUDENT CREDENTIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((student) => (
          <div
            key={student.id}
            className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {student.name} <Shield className="w-3.5 h-3.5 text-emerald-400" />
                </h3>
                <p className="text-xs text-zinc-400">{student.university} • GPA {student.gpa}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {(student.skills || []).map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 text-[10px] font-mono">
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold">Score: {student.placementScore}/100</span>
              <span className="text-zinc-500 text-[10px]">Credential Verified ✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
