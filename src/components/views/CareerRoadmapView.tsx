import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Sparkles, CheckCircle2, Lock, Play, ExternalLink, Code2, Clock, Plus, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CareerRoadmapView: React.FC = () => {
  const { roadmapData, setRoadmapData, addToast, addXP, triggerConfetti } = useApp();
  const [targetGoal, setTargetGoal] = useState('Full Stack AI Engineer');
  const [currentLevel, setCurrentLevel] = useState('Beginner/1st Year Student');
  const [timeframe, setTimeframe] = useState('6 months');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetGoal, currentLevel, timeframe }),
      });
      const data = await res.json();
      if (data.data) {
        setRoadmapData(data.data);
        triggerConfetti();
        addToast('🎉 Custom Roadmap Generated!', `Blueprint generated for ${targetGoal}`, 'success');
        addXP(300, 'Generated Custom Career Roadmap');
      }
    } catch {
      addToast('Error', 'Failed to generate roadmap.', 'error');
    } finally {
      setIsGenerating(false);
      setIsModalOpen(false);
    }
  };

  // Default initial roadmap if none loaded
  const displayRoadmap = roadmapData || {
    title: 'Mastery Pathway: Full Stack AI Engineer',
    description: 'A battle-tested 5-phase blueprint tailored for CS college students to reach high-concurrency placement readiness.',
    totalEstimatedWeeks: 24,
    milestones: [
      {
        id: 'm1',
        title: 'Phase 1: Advanced Frontend Architecture & Reactive Systems',
        subtitle: 'React 19, TypeScript Generics, Tailwind v4, & Performance Optimization',
        duration: 'Weeks 1-4',
        status: 'completed' as const,
        topics: ['TypeScript Generics & Utility Types', 'React 19 Server Actions & Custom Hooks', 'Tailwind CSS v4 Engine', 'Zustand State Architecture'],
        recommendedProject: {
          name: 'Real-time Collaborative Whiteboard',
          description: 'Multi-user canvas drawing tool with HTML5 Canvas, WebSockets, and optimistic state synchronization.',
          techStack: ['React 19', 'TypeScript', 'WebSockets', 'TailwindCSS'],
        },
        resourceLinks: [
          { name: 'React 19 Official Documentation', url: 'https://react.dev' },
          { name: 'TypeScript Deep Dive Handbook', url: 'https://basarat.gitbook.io' },
        ],
      },
      {
        id: 'm2',
        title: 'Phase 2: High-Concurrency Backend Services & Database Engineering',
        subtitle: 'Express, PostgreSQL Indexing, Redis In-Memory Queues & OAuth',
        duration: 'Weeks 5-10',
        status: 'in_progress' as const,
        topics: ['Express REST Architecture', 'PostgreSQL Indexing & Transactions', 'Redis In-Memory Caching', 'Authentication with OAuth & JWT'],
        recommendedProject: {
          name: 'High-Throughput Ingestion Engine',
          description: 'Analytics queue processing 10,000 req/sec with Redis queue buffering and Postgres analytical views.',
          techStack: ['Express', 'PostgreSQL', 'Redis', 'Docker'],
        },
        resourceLinks: [
          { name: 'PostgreSQL Query Optimization Guide', url: 'https://postgresql.org' },
          { name: 'System Design Primer Repository', url: 'https://github.com/donnemartin/system-design-primer' },
        ],
      },
      {
        id: 'm3',
        title: 'Phase 3: AI Engine & RAG Agent Integration',
        subtitle: 'Gemini 3.6 API, Qdrant Vector Search, Embeddings & Agents',
        duration: 'Weeks 11-16',
        status: 'locked' as const,
        topics: ['Google GenAI SDK Integration', 'Vector Databases (Qdrant/Pinecone)', 'RAG Pipelines & Chunking', 'Function Calling & Structured Outputs'],
        recommendedProject: {
          name: 'Enterprise Filing AI Analyst Agent',
          description: 'Ingest 500-page SEC PDF filings, generate vector embeddings, and answer queries with source citations.',
          techStack: ['Gemini API', 'Qdrant', 'Node.js', 'LangChain'],
        },
        resourceLinks: [
          { name: 'Google AI Studio Developer Docs', url: 'https://ai.google.dev' },
        ],
      },
      {
        id: 'm4',
        title: 'Phase 4: Cloud DevOps, CI/CD Pipelines & Containerization',
        subtitle: 'Docker Multi-stage, Cloud Run Deployment, & GitHub Actions',
        duration: 'Weeks 17-20',
        status: 'locked' as const,
        topics: ['Docker Multi-stage Builds', 'GitHub Actions Pipeline Automation', 'Cloud Run / AWS Deployment', 'Telemetry & Error Tracking'],
        recommendedProject: {
          name: 'Automated Preview Environment Pipeline',
          description: 'Create automated preview links for pull requests with GitHub Actions and Cloud Run.',
          techStack: ['Docker', 'GitHub Actions', 'Google Cloud Run'],
        },
        resourceLinks: [
          { name: 'Docker Production Guide', url: 'https://docs.docker.com' },
        ],
      },
      {
        id: 'm5',
        title: 'Phase 5: High-Frequency Placement Sprint & System Drills',
        subtitle: 'LeetCode 75, System Design Drills, & AI Voice Mock Interviews',
        duration: 'Weeks 21-24',
        status: 'locked' as const,
        topics: ['Data Structures & Algorithms Mastery', 'System Design Patterns for Entry-Level', 'STAR Method Behavioral Storytelling', 'Live Code Pair Simulations'],
        recommendedProject: {
          name: 'Portfolio Monorepo Launch',
          description: 'Package projects into a published Raycast-styled portfolio site with interactive live demos.',
          techStack: ['React', 'Framer Motion', 'TailwindCSS'],
        },
        resourceLinks: [
          { name: 'LeetCode Curated List', url: 'https://leetcode.com' },
        ],
      },
    ],
  };

  const toggleMilestoneStatus = (index: number) => {
    if (!roadmapData && displayRoadmap) {
      setRoadmapData(displayRoadmap);
    }
    const current = roadmapData || displayRoadmap;
    const updated = { ...current };
    const m = updated.milestones[index];
    if (m.status === 'in_progress') {
      m.status = 'completed';
      addXP(400, `Completed Milestone: ${m.title}`);
      triggerConfetti();
    } else if (m.status === 'locked') {
      m.status = 'in_progress';
      addToast('Milestone Unlocked!', `Started ${m.title}`, 'info');
    }
    setRoadmapData(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
            Interactive Skill Tree
          </span>
          <h1 className="text-3xl font-black mt-1 tracking-tight">{displayRoadmap.title}</h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{displayRoadmap.description}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all shrink-0 hover:scale-105"
        >
          <Sparkles className="w-4 h-4 fill-white" /> Generate Custom AI Roadmap
        </button>
      </div>

      {/* MILESTONE TIMELINE TREE */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {(displayRoadmap?.milestones || []).map((m, idx) => (
          <motion.div
            key={m.id || idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            {/* Timeline Node Icon */}
            <button
              onClick={() => toggleMilestoneStatus(idx)}
              className={`absolute -left-[37px] sm:-left-[53px] top-1 w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${
                m.status === 'completed'
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                  : m.status === 'in_progress'
                  ? 'bg-blue-600 border-blue-400 text-white animate-pulse shadow-lg shadow-blue-500/30'
                  : 'bg-zinc-900 border-white/10 text-zinc-500'
              }`}
            >
              {m.status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
              {m.status === 'in_progress' && <Play className="w-4 h-4 fill-white" />}
              {m.status === 'locked' && <Lock className="w-4 h-4" />}
            </button>

            {/* Milestone Card */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              m.status === 'in_progress'
                ? 'border-blue-500/50 bg-zinc-950/90 shadow-2xl shadow-blue-500/10'
                : 'border-white/10 bg-zinc-950/60'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max ${
                  m.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : m.status === 'in_progress'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {m.status === 'completed' ? 'Phase Completed ✓' : m.status === 'in_progress' ? 'Current Active Phase ➔' : 'Upcoming Phase'}
                </span>
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {m.duration}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white">{m.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{m.subtitle}</p>

              {/* Topics list */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Core Technical Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {(m.topics || []).map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-zinc-900 border border-white/5 text-xs text-zinc-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Project Blueprint */}
              {m.recommendedProject && (
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/30 to-indigo-950/20 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-300">Recommended Capstone Project:</span>
                    <span className="text-xs font-extrabold text-white">{m.recommendedProject.name}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{m.recommendedProject.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(m.recommendedProject.techStack || []).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resource links */}
              {m.resourceLinks && m.resourceLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {m.resourceLinks.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      {res.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* GENERATE CUSTOM ROADMAP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-950 text-white shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-1">Generate AI Career Roadmap</h3>
              <p className="text-xs text-zinc-400 mb-6">Describe your target role and timeline for Gemini AI.</p>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Target Career Role</label>
                  <input
                    type="text"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Full Stack AI Engineer, Fintech Systems Architect"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Current Experience / Year</label>
                  <input
                    type="text"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 2nd Year CS Student with basic React knowledge"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-bold text-[10px]">Sprint Timeframe</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="3 months">3 Months Sprint (Intensive)</option>
                    <option value="6 months">6 Months Standard Placement Preparation</option>
                    <option value="12 months">1 Year Comprehensive Engineering Pathway</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  disabled={isGenerating}
                  onClick={handleGenerateRoadmap}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  {isGenerating ? 'Generating...' : 'Build Roadmap'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
