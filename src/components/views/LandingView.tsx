import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, CheckCircle2, Star, Zap, Bot, Compass, FileText, Video, Award, Building2, GraduationCap, ChevronRight, Play, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingView: React.FC = () => {
  const { setCurrentView, setUserRole, triggerCheckout, pricingPlans } = useApp();
  const [activeTab, setActiveTab] = useState<'resume' | 'roadmap' | 'interview'>('resume');
  const [sampleResumeInput, setSampleResumeInput] = useState('Senior CS student building React 19 apps and Express APIs with PostgreSQL.');
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleQuickScanner = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/resume-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: sampleResumeInput, targetRole: 'Full Stack Engineer' }),
      });
      const data = await res.json();
      setResumeResult(data.data);
    } catch {
      // Fallback
      setResumeResult({
        overallScore: 88,
        atsReadability: 91,
        missingKeywords: ['Docker', 'CI/CD Pipelines', 'System Architecture'],
        actionableTips: ['Quantify project metrics with user scale or performance gains.', 'Add cloud infrastructure keywords.'],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const universities = [
    'Stanford University', 'MIT', 'IIT Bombay', 'UC Berkeley', 'IIT Delhi', 'ETH Zürich', 'Carnegie Mellon', 'Harvard'
  ];

  const hiringCompanies = [
    'Google', 'Microsoft', 'Vercel', 'Linear', 'Stripe', 'OpenAI', 'Y Combinator', 'Anthropic'
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden pt-28 pb-20">
      {/* Background Aurora / Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        {/* Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-500/30 bg-zinc-900/90 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg"
        >
          <Compass className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 font-bold">Navricon Career Ecosystem Platform</span>
          <span className="text-zinc-600">|</span>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-white hover:text-blue-400 font-bold transition-colors flex items-center gap-1"
          >
            <span>Explore Live Portals</span>
            <span>→</span>
          </button>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white max-w-5xl"
        >
          The Unified Career & <br />
          Sourcing Ecosystem <br />
          <span className="text-blue-400 font-black">
            Built For Navricon Talent.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl font-light leading-relaxed"
        >
          Dedicated portals for Students, Startups, Colleges, and Recruiters. 
          Upload resumes for instant comprehensive summaries, conduct audio & video mock interviews, and access verified talent pipelines.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              setUserRole('student');
              setCurrentView('dashboard');
            }}
            className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-sm flex items-center gap-2 shadow-xl shadow-white/10 transition-all hover:scale-105"
          >
            Enter Student Portal <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setUserRole('company');
              setCurrentView('company-matcher');
            }}
            className="px-8 py-4 rounded-full bg-zinc-900 border border-white/15 text-white hover:bg-zinc-800 font-bold text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <Building2 className="w-4 h-4 text-blue-400" /> Hire Talent (Startups)
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium"
        >
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Credentials</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 10,000+ Students</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-blue-400" /> Instant ATS Optimization</span>
        </motion.div>

        {/* INTERACTIVE DEMO PREVIEW CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 w-full max-w-5xl rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 text-left"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-zinc-500">career-os-ai-demo.v2.4</span>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/5 text-xs">
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'resume' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Resume Scanner
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'roadmap' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                AI Roadmap
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'interview' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Voice Interview
              </button>
            </div>
          </div>

          {/* Interactive Demo Content */}
          {activeTab === 'resume' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">Test our Gemini 3.6 ATS Resume Analyzer directly below:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={sampleResumeInput}
                  onChange={(e) => setSampleResumeInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Paste a resume bullet or summary..."
                />
                <button
                  disabled={isAnalyzing}
                  onClick={handleQuickScanner}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center justify-center gap-2 transition-all shrink-0"
                >
                  {isAnalyzing ? 'Scanning...' : 'Scan Resume Bullet'}
                </button>
              </div>

              {resumeResult && (
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">ATS Match Score</span>
                    <span className="text-xl font-black text-emerald-400">{resumeResult.overallScore} / 100</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                    <div>
                      <span className="font-semibold text-rose-400 block mb-1">Missing Keywords:</span>
                      <div className="flex flex-wrap gap-1">
                        {resumeResult.missingKeywords?.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px]">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-400 block mb-1">AI Recommendation:</span>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {resumeResult.actionableTips?.[0] || 'Quantify user metrics and cloud tech stack.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-300">Target Pathway: Full-Stack AI Engineer</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">24-Week Sprint</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Phase 1: Advanced Frontend & Reactive Systems</p>
                    <p className="text-[11px] text-zinc-400">React 19, TypeScript, Tailwind v4, Zustand</p>
                  </div>
                  <span className="text-emerald-400 font-bold text-[11px]">Completed ✓</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-blue-500/30 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Phase 2: High-Concurrency Backend Services</p>
                    <p className="text-[11px] text-zinc-400">Express, PostgreSQL Indexing, Redis Queues</p>
                  </div>
                  <span className="text-blue-400 font-bold text-[11px]">In Progress ➔</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Gemini Recruiter Simulator</p>
                  <p className="text-[11px] text-zinc-400">"How do you handle API rate limiting in high-concurrency Express servers?"</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-between">
                <span className="text-zinc-400">Voice Response Confidence Score:</span>
                <span className="text-emerald-400 font-bold">94% (High Depth)</span>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">100,000+</h3>
            <p className="text-xs text-zinc-400 mt-1">Students Onboarded</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-400">94.2%</h3>
            <p className="text-xs text-zinc-400 mt-1">Placement Success Rate</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">1,200+</h3>
            <p className="text-xs text-zinc-400 mt-1">Hiring Tech Startups</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">$12.4M+</h3>
            <p className="text-xs text-zinc-400 mt-1">Stipends & Offers Secured</p>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES & HIRING PARTNERS */}
      <section className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-6">Trusted by Students & Recruiters from Global Ecosystems</p>
        <div className="flex flex-wrap items-center justify-center gap-6 opacity-60">
          {universities.map((u, i) => (
            <span key={i} className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-xs font-semibold text-zinc-300">
              {u}
            </span>
          ))}
          {hiringCompanies.map((c, i) => (
            <span key={i} className="px-4 py-2 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs font-semibold text-blue-300">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURE MODULES GRID */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">An Ecosystem Built For Every Step</h2>
          <p className="mt-4 text-zinc-400 text-sm max-w-xl mx-auto">From 1st-year skill development to final company offers and recruiter sourcing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => { setUserRole('student'); setCurrentView('resume-builder'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI Resume & ATS Builder</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Real-time resume scoring against actual job descriptions, missing keyword extraction, and instant metric bullet rewrites.
            </p>
          </div>

          <div
            onClick={() => { setUserRole('student'); setCurrentView('roadmap'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Personalized AI Roadmaps</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dynamic milestone pathways tailored to your target job role with project blueprints, learning links, and skill verification.
            </p>
          </div>

          <div
            onClick={() => { setUserRole('student'); setCurrentView('interview'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">AI Voice Mock Interviewer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Practice role-specific technical & behavioral questions with real-time voice speech analysis and Gemini TTS audio feedback.
            </p>
          </div>

          <div
            onClick={() => { setUserRole('company'); setCurrentView('company-matcher'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Startup Talent Sourcing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Paste your job specification to automatically screen, rank, and match top verified student engineering talent.
            </p>
          </div>

          <div
            onClick={() => { setUserRole('college'); setCurrentView('college-analytics'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">University Placement Cell</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Comprehensive analytics, department-level skill gap heatmaps, and automated batch reports for university deans.
            </p>
          </div>

          <div
            onClick={() => { setUserRole('student'); setCurrentView('linkedin-ai'); }}
            className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">LinkedIn & Viral Content AI</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Generate viral technical posts, project launch carousels, and personalized recruiter outreach messages.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Simple, Transparent Investment</h2>
          <p className="mt-4 text-zinc-400 text-sm">Choose the plan that accelerates your career goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(pricingPlans || []).slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                plan.popular
                  ? 'border-blue-500 bg-gradient-to-b from-blue-950/30 via-zinc-950 to-zinc-950 shadow-2xl shadow-blue-500/10'
                  : 'border-white/10 bg-zinc-950/60'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-lg">
                  Most Popular Pass
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-2 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl font-extrabold">${plan.priceMonthly}</span>
                  <span className="text-zinc-500 text-xs"> / month</span>
                </div>

                <div className="space-y-3 mb-8">
                  {(plan.features || []).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => triggerCheckout(plan)}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition-all ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 mt-32 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">N</div>
          <span className="font-bold text-white">Navricon</span>
          <span>© 2026 Navricon Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Security</span>
          <span className="hover:text-white cursor-pointer">Hackathon Specs</span>
        </div>
      </footer>
    </div>
  );
};
