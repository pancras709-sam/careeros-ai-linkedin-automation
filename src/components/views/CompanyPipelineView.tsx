import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, ChevronRight, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';

export const CompanyPipelineView: React.FC = () => {
  const { candidates, addToast } = useApp();

  const stages = [
    { id: 'applied', title: 'Screened Candidates', color: 'border-blue-500/30' },
    { id: 'interviewing', title: 'Technical Interview', color: 'border-amber-500/30' },
    { id: 'offered', title: 'Offer Extended', color: 'border-emerald-500/30' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Recruiter Kanban Pipeline
          </span>
          <h1 className="text-3xl font-black mt-1">Candidate Recruitment Pipeline</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track student application stages, technical interview scores, and offer acceptances.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stages.map((stage) => {
          const candidatesInStage = candidates.filter((c) => c.status === stage.id || (stage.id === 'applied' && !c.status));
          return (
            <div
              key={stage.id}
              className={`p-6 rounded-3xl border bg-zinc-950/60 backdrop-blur-xl space-y-4 ${stage.color}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-sm text-white">{stage.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono font-bold">
                  {candidatesInStage.length}
                </span>
              </div>

              <div className="space-y-4">
                {candidatesInStage.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-white">{candidate.name}</h4>
                        <p className="text-[11px] text-zinc-400">{candidate.university}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {(candidate.skills || []).slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] text-zinc-400">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                      <span className="text-emerald-400 font-bold">Score: {candidate.placementScore}/100</span>
                      <button
                        onClick={() => addToast('Stage Updated', `Moved ${candidate.name} to next round`, 'info')}
                        className="text-blue-400 font-bold hover:underline"
                      >
                        Advance Stage →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
