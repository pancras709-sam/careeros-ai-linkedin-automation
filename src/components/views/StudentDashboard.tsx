import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, Rocket, Briefcase, Flame, Award, ArrowUpRight, Sparkles, CheckCircle2, ChevronRight, Play, RefreshCw, Layers, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export const StudentDashboard: React.FC = () => {
  const { studentProfile, dailyQuests, completeQuest, setCurrentView, jobListings, addToast, hackathons, certifications } = useApp();

  const appliedJobsCount = jobListings.filter((j) => j.status === 'applied' || j.status === 'interviewing').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-blue-950/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
              Student Command Center
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">{studentProfile.university}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {studentProfile.name} 👋
          </h1>
          <p className="text-xs text-zinc-400">
            Your Placement Score is in the top <span className="text-emerald-400 font-bold">3%</span> of your batch. 5 recruiters viewed your portfolio this week.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => setCurrentView('resume-builder')}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 fill-white" /> Scan Resume
          </button>
          <button
            onClick={() => setCurrentView('interview')}
            className="px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 text-emerald-400" /> Start Mock Interview
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => setCurrentView('skill-gap')}
          className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl cursor-pointer hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10">
              Top 3% Batch
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Placement Score</p>
          <h3 className="text-3xl font-black mt-1 text-white">{studentProfile.placementScore} / 100</h3>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
            View Skill Radar & Benchmark →
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">
              Lvl {studentProfile.level} Architect
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Career XP</p>
          <h3 className="text-3xl font-black mt-1 text-white">{studentProfile.xp.toLocaleString()} XP</h3>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-400 h-full w-[70%]" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => setCurrentView('jobs')}
          className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl cursor-pointer hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10">
              3 Interviews Scheduled
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Active Applications</p>
          <h3 className="text-3xl font-black mt-1 text-white">{appliedJobsCount || 4}</h3>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
            Manage Job Pipelines →
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => setCurrentView('coding-contest')}
          className="p-6 rounded-3xl border border-amber-500/30 bg-zinc-950/60 backdrop-blur-xl cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10">
              {studentProfile.streakDays} Days Streak 🔥
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">LeetCode Coins</p>
          <h3 className="text-3xl font-black mt-1 text-amber-400">🪙 {studentProfile.coins || 450}</h3>
          <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
            Solve Arena Problems & Redeem →
          </p>
        </motion.div>
      </div>

      {/* QUICK LAUNCH BAR FOR PLACEMENT PREP & RESUME ATS */}
      <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            Placement Readiness Suite
          </span>
          <h3 className="text-lg font-black text-white">TCS, Cognizant, Zoho, Accenture Prep & ATS Scanner</h3>
          <p className="text-xs text-zinc-400">Upload your resume for ATS score, practice company tests, and complete mock interviews.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentView('company-tests')}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 font-black text-xs text-black transition-all shadow-lg shadow-amber-500/20"
          >
            🏢 Company Tests (TCS, Zoho)
          </button>
          <button
            onClick={() => setCurrentView('coding-contest')}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 font-extrabold text-xs text-white transition-all shadow-lg shadow-blue-500/20"
          >
            🪙 LeetCode Arena
          </button>
          <button
            onClick={() => setCurrentView('resume-builder')}
            className="px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 font-bold text-xs text-white transition-all"
          >
            📄 Upload Resume for ATS
          </button>
        </div>
      </div>

      {/* MAIN TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Active Roadmap & Quests */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Roadmap Progress */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">Active Pathway</span>
                <h2 className="text-xl font-bold mt-0.5">Full Stack AI Engineering Pathway</h2>
              </div>
              <button
                onClick={() => setCurrentView('roadmap')}
                className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                View Full Roadmap <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Phase 1: React 19 & Advanced Frontend Design</h4>
                    <p className="text-[11px] text-zinc-400">TypeScript, Tailwind v4, State Architecture</p>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold">Completed</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-blue-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs animate-pulse">
                    ➔
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Phase 2: High-Concurrency Backend Services</h4>
                    <p className="text-[11px] text-zinc-400">Express, PostgreSQL Indexing, Redis Queueing</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('roadmap')}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors"
                >
                  Continue Sprint
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 opacity-60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center font-bold text-xs">
                    🔒
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Phase 3: AI Engine & RAG Agent Pipeline</h4>
                    <p className="text-[11px] text-zinc-400">Gemini 3.6 API, Vector Databases & Embeddings</p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">Locked</span>
              </div>
            </div>
          </div>

          {/* High Impact Internship Recommendations */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">AI Recommended Internships</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Matched with your skills (TypeScript, React 19, Express)</p>
              </div>
              <button
                onClick={() => setCurrentView('jobs')}
                className="text-xs text-blue-400 font-semibold hover:underline"
              >
                Explore All Jobs →
              </button>
            </div>

            <div className="space-y-4">
              {(jobListings || []).slice(0, 2).map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-xl shrink-0">
                      {job.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{job.title}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          {job.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{job.company} • {job.location}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {(job.tags || []).slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-white">{job.stipend}</p>
                    <button
                      onClick={() => setCurrentView('jobs')}
                      className="mt-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
                    >
                      {job.status === 'applied' ? 'Applied ✓' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Hackathons & Cloud Certifications Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span>🚀 Upcoming Hackathons & Cloud Certifications</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">AWS Bedrock Sprints, Azure AI Summit & NPTEL Elite Credentials</p>
              </div>
              <button
                onClick={() => setCurrentView('hackathons')}
                className="text-xs text-amber-400 font-semibold hover:underline"
              >
                View All Hackathons & Certs →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Highlight Hackathon */}
              {(hackathons || []).slice(0, 1).map((h) => (
                <div key={h.id} className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-zinc-900 border border-amber-500/30 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase font-mono">
                      {h.status}
                    </span>
                    <span className="text-xs font-bold text-amber-400">{h.prizePool}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{h.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{h.description}</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('hackathons')}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all"
                  >
                    Generate AI Pitch Deck & Register
                  </button>
                </div>
              ))}

              {/* Highlight Certificate */}
              {(certifications || []).slice(0, 1).map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-zinc-900 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase font-mono">
                      {c.provider} • {c.level}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">{c.examCode}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{c.description}</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('certifications')}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                  >
                    Launch 14-Day AI Study Prep
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Quests & Badges */}
        <div className="space-y-8">
          {/* Daily Quests Widget */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Rocket className="w-5 h-5 text-amber-400" /> Daily XP Quests
              </h3>
              <span className="text-xs text-amber-400 font-bold">+700 XP Possible</span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    quest.completed
                      ? 'bg-emerald-500/10 border-emerald-500/20'
                      : 'bg-zinc-900 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{quest.title}</span>
                    <span className="text-[10px] font-bold text-amber-400">+{quest.xpReward} XP</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="w-2/3 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: `${quest.progress}%` }}
                      />
                    </div>

                    {quest.completed ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => completeQuest(quest.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] transition-all"
                      >
                        Claim XP
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" /> Verified Credentials & Badges
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {(studentProfile.badges || []).map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-center flex flex-col items-center hover:border-blue-500/30 transition-all"
                >
                  <span className="text-3xl mb-1">{badge.icon}</span>
                  <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
