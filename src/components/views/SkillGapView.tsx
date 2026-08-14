import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, TrendingUp, Sparkles, AlertCircle, CheckCircle2, Award, BookOpen } from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { studentProfile, setCurrentView } = useApp();

  const skillMetrics = [
    { name: 'React 19 & Frontend Design', current: 94, required: 90, status: 'Surpassed' },
    { name: 'TypeScript & Type Safety', current: 92, required: 85, status: 'Surpassed' },
    { name: 'Express REST & API Architecture', current: 88, required: 85, status: 'On Target' },
    { name: 'PostgreSQL & Database Indexing', current: 80, required: 85, status: 'Needs Improvement' },
    { name: 'Gemini 3.6 API & Vector RAG', current: 85, required: 90, status: 'Needs Improvement' },
    { name: 'Docker & DevOps CI/CD', current: 65, required: 80, status: 'Critical Skill Gap' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Real-Time Skill Gap Intelligence
          </span>
          <h1 className="text-3xl font-black mt-1">Placement Skill Radar & Salary Benchmarks</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Comparing your technical profile against 1,200+ active full-stack AI job specifications.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-right shrink-0">
          <span className="text-xs text-amber-300 font-bold block">Overall Match Benchmark</span>
          <span className="text-3xl font-extrabold text-amber-400">92 / 100</span>
        </div>
      </div>

      {/* SKILL COMPARISON BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" /> Skill Competency Breakdown
          </h2>

          <div className="space-y-5">
            {skillMetrics.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">Your Score: {skill.current}%</span>
                    <span className="text-zinc-500">| Target: {skill.required}%</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        skill.status === 'Surpassed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : skill.status === 'On Target'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {skill.status}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full transition-all duration-500 ${
                      skill.current >= skill.required ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${skill.current}%` }}
                  />
                  {/* Target Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                    style={{ left: `${skill.required}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Learning Sprint Recommendations */}
        <div className="lg:col-span-4 p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" /> Actionable Micro-Sprints
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase">Priority Gap 1</span>
              <h4 className="font-bold text-white">Docker Multi-stage Builds & Containerization</h4>
              <p className="text-zinc-400 leading-relaxed">
                Containerizing Express & Node apps will boost your placement match for Stripe & Vercel by +12%.
              </p>
              <button
                onClick={() => setCurrentView('roadmap')}
                className="mt-2 text-blue-400 font-bold hover:underline"
              >
                Launch Docker Module in Roadmap →
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Priority Gap 2</span>
              <h4 className="font-bold text-white">PostgreSQL Indexing & Concurrency</h4>
              <p className="text-zinc-400 leading-relaxed">
                Practice EXPLAIN ANALYZE queries on 100,000 mock rows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
