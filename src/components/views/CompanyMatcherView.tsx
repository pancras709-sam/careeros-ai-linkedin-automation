import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Sparkles, UserCheck, Star, Search, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const CompanyMatcherView: React.FC = () => {
  const { candidates, addToast, triggerConfetti } = useApp();
  const [jdText, setJdText] = useState(
    'Looking for a Full Stack Software Engineer intern proficient in React 19, TypeScript, Node.js/Express, and PostgreSQL with high-concurrency experience.'
  );
  const [isMatching, setIsMatching] = useState(false);
  const [rankedCandidates, setRankedCandidates] = useState<any[]>(candidates);

  const handleMatchTalent = async () => {
    setIsMatching(true);
    try {
      const res = await fetch('/api/ai/talent-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jdText, filterSkills: [] }),
      });
      const data = await res.json();
      const matchedList = data.candidates || data.matchedCandidates;
      if (matchedList && Array.isArray(matchedList)) {
        const formatted = matchedList.map((c: any, i: number) => ({
          id: c.id || `match-${i}`,
          name: c.name || c.candidateName || 'Candidate',
          avatar: c.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          university: c.university || 'University Student',
          year: c.year || 4,
          gpa: c.gpa || '3.9',
          matchScore: c.matchScore || 95,
          placementScore: c.placementScore || 92,
          skills: c.skills || c.keyMatchingSkills || ['React', 'TypeScript', 'Node.js'],
          aiFitAnalysis: c.aiFitAnalysis || c.aiVerdict || 'Strong candidate profile match.',
        }));
        setRankedCandidates(formatted);
        triggerConfetti();
        addToast('Match Complete!', `Ranked top candidates for job specification.`, 'success');
      }
    } catch {
      addToast('Error', 'Failed to match candidates.', 'error');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            Startup & Recruiter Talent Matcher
          </span>
          <h1 className="text-3xl font-black mt-1">AI Verified Student Sourcing Engine</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Paste your Job Description to instantly rank and screen verified student candidates.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* Input JD Box */}
      <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-4">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Paste Job Description / Requirements</label>
        <textarea
          rows={3}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
          placeholder="Paste full JD text here..."
        />
        <div className="flex justify-end">
          <button
            disabled={isMatching}
            onClick={handleMatchTalent}
            className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
          >
            {isMatching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 fill-white" />}
            {isMatching ? 'Screening Candidates...' : 'Run AI Talent Match'}
          </button>
        </div>
      </div>

      {/* RANKED CANDIDATES LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Top Verified Student Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rankedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-purple-500/40 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{candidate.name}</h3>
                    <p className="text-xs text-zinc-400">{candidate.university} • Year {candidate.year}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">GPA {candidate.gpa} / 4.0</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs block">
                    {candidate.matchScore || 95}% Match
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Score: {candidate.placementScore}/100</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {(candidate.skills || []).map((skill: string, idx: number) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-300 text-[10px] font-mono">
                    {skill}
                  </span>
                ))}
              </div>

              {/* AI Fit Analysis */}
              {candidate.aiFitAnalysis && (
                <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                  <span className="font-bold text-[10px] text-purple-400 uppercase block mb-0.5">AI Fit Summary:</span>
                  <p className="text-[11px] leading-snug">{candidate.aiFitAnalysis}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] text-zinc-500">Verified Resume & Portfolio</span>
                <button
                  onClick={() => addToast('Interview Requested!', `Invite sent to ${candidate.name}`, 'success')}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all"
                >
                  Schedule Interview →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
