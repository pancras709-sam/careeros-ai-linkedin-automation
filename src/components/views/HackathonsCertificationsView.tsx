import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hackathon, Certification } from '../../types';
import { Trophy, Award, Sparkles, ExternalLink, Calendar, Users, CheckCircle2, Search, Zap, BookOpen, ShieldCheck, ArrowRight, X, Clock } from 'lucide-react';

export const HackathonsCertificationsView: React.FC = () => {
  const { hackathons, certifications, addToast, addXP, triggerConfetti, setResumeData, setStudentProfile } = useApp();

  const [activeTab, setActiveTab] = useState<'hackathons' | 'certifications'>('hackathons');
  
  // Hackathon filters
  const [hackathonFilter, setHackathonFilter] = useState<string>('all');
  const [hackSearch, setHackSearch] = useState<string>('');

  // Cert filters
  const [certProviderFilter, setCertProviderFilter] = useState<string>('all');
  const [certSearch, setCertSearch] = useState<string>('');

  // Pitch Modal state
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [pitchIdeaName, setPitchIdeaName] = useState('');
  const [pitchProblem, setPitchProblem] = useState('');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [pitchResult, setPitchResult] = useState<any>(null);

  // Cert Prep Modal state
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isGeneratingCertPrep, setIsGeneratingCertPrep] = useState(false);
  const [certPrepResult, setCertPrepResult] = useState<any>(null);

  // Filtered lists
  const filteredHackathons = hackathons.filter((h) => {
    const matchesSearch = h.title.toLowerCase().includes(hackSearch.toLowerCase()) ||
                          h.organizer.toLowerCase().includes(hackSearch.toLowerCase()) ||
                          h.techStack.some((t) => t.toLowerCase().includes(hackSearch.toLowerCase()));
    if (hackathonFilter === 'all') return matchesSearch;
    if (hackathonFilter === 'open') return matchesSearch && h.status === 'Registration Open';
    if (hackathonFilter === 'aws') return matchesSearch && (h.organizer.includes('AWS') || h.techStack.includes('AWS Bedrock'));
    if (hackathonFilter === 'azure') return matchesSearch && (h.organizer.includes('Azure') || h.organizer.includes('Microsoft'));
    if (hackathonFilter === 'nptel') return matchesSearch && (h.organizer.includes('NPTEL') || h.title.includes('NPTEL'));
    return matchesSearch;
  });

  const filteredCertifications = certifications.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
                          c.examCode.toLowerCase().includes(certSearch.toLowerCase()) ||
                          c.skillsCovered.some((s) => s.toLowerCase().includes(certSearch.toLowerCase()));
    if (certProviderFilter === 'all') return matchesSearch;
    return matchesSearch && c.provider.toLowerCase() === certProviderFilter.toLowerCase();
  });

  // Handle Register for Hackathon
  const handleRegisterHackathon = (hackathon: Hackathon) => {
    addToast('Registered Successfully! 🚀', `Joined ${hackathon.title}. +100 XP Earned!`, 'success');
    addXP(100, `Registered for ${hackathon.title}`);
    triggerConfetti();
  };

  // Handle Generate Pitch
  const handleGeneratePitch = async () => {
    if (!selectedHackathon) return;
    setIsGeneratingPitch(true);
    setPitchResult(null);

    try {
      const res = await fetch('/api/ai/hackathon-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hackathonTitle: selectedHackathon.title,
          track: selectedHackathon.tracks[0] || 'General AI',
          ideaName: pitchIdeaName || 'Navricon Agent',
          techStack: selectedHackathon.techStack,
          problemStatement: pitchProblem || 'Automating student career readiness and skill gap analysis',
        }),
      });
      const data = await res.json();
      if (data.data) {
        setPitchResult(data.data);
        addToast('Pitch Deck Generated!', 'AI Judge breakdown created.', 'success');
        addXP(150, 'Generated Hackathon AI Pitch');
        triggerConfetti();
      }
    } catch {
      addToast('Error', 'Failed to generate hackathon pitch deck.', 'error');
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // Handle Cert Study Plan
  const handleGenerateCertPrep = async (cert: Certification) => {
    setSelectedCert(cert);
    setIsGeneratingCertPrep(true);
    setCertPrepResult(null);

    try {
      const res = await fetch('/api/ai/cert-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certTitle: cert.title,
          provider: cert.provider,
          examCode: cert.examCode,
          currentKnowledgeLevel: 'Intermediate Developer',
        }),
      });
      const data = await res.json();
      if (data.data) {
        setCertPrepResult(data.data);
        addToast('Study Plan Generated!', `14-Day Roadmap created for ${cert.examCode}.`, 'success');
        addXP(100, 'Generated Certification Study Plan');
      }
    } catch {
      addToast('Error', 'Failed to generate study plan.', 'error');
    } finally {
      setIsGeneratingCertPrep(false);
    }
  };

  // Add Certificate to Resume & Profile
  const handleAddCertToProfile = (cert: Certification) => {
    setStudentProfile((prev) => ({
      ...prev,
      skills: Array.from(new Set([...prev.skills, ...cert.skillsCovered])),
      xp: prev.xp + 250,
    }));

    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        tools: Array.from(new Set([...prev.skills.tools, `${cert.provider} (${cert.examCode})`])),
      },
    }));

    addToast('Certificate Added! 🏆', `Added ${cert.title} to Resume & Profile (+250 XP)`, 'success');
    triggerConfetti();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-10">
      {/* View Header */}
      <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold text-xs uppercase tracking-wider">
              National & Global Talent Hub
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
              Verified Credentials
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Upcoming Hackathons & Verified Certifications
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Participate in top AWS, Azure, and NPTEL tech sprints, build AI hackathon pitches, and add verified cloud & deep learning certifications directly to your resume.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hackathons'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Hackathons ({hackathons.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'certifications'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>NPTEL, AWS & Azure ({certifications.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UPCOMING HACKATHONS */}
      {/* ========================================================================= */}
      {activeTab === 'hackathons' && (
        <div className="space-y-6">
          {/* Hackathon Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-white/10">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setHackathonFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  hackathonFilter === 'all' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                All Hackathons
              </button>
              <button
                onClick={() => setHackathonFilter('open')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  hackathonFilter === 'open' ? 'bg-emerald-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Registration Open
              </button>
              <button
                onClick={() => setHackathonFilter('aws')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  hackathonFilter === 'aws' ? 'bg-amber-500/20 border border-amber-500 text-amber-300' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                ☁️ AWS Sprints
              </button>
              <button
                onClick={() => setHackathonFilter('azure')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  hackathonFilter === 'azure' ? 'bg-blue-500/20 border border-blue-500 text-blue-300' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                🔷 Azure AI
              </button>
              <button
                onClick={() => setHackathonFilter('nptel')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  hackathonFilter === 'nptel' ? 'bg-purple-500/20 border border-purple-500 text-purple-300' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                🎓 NPTEL TechSprint
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hackathons or tech..."
                value={hackSearch}
                onChange={(e) => setHackSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Hackathons Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="p-6 rounded-3xl border border-white/10 bg-zinc-950/70 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-xl"
              >
                {/* Featured Gradient Accent */}
                {hackathon.featured && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-amber-500 to-amber-600 text-black text-[10px] font-black uppercase tracking-wider rounded-bl-2xl">
                    Featured Event
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                      {hackathon.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                        {hackathon.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{hackathon.organizer}</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">{hackathon.description}</p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2">
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs">
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">Prize Pool</span>
                      <span className="font-bold text-amber-400">{hackathon.prizePool}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs">
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">Mode</span>
                      <span className="font-semibold text-white">{hackathon.mode}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 text-xs col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-zinc-500 block uppercase font-mono">Registered</span>
                      <span className="font-semibold text-blue-400">{hackathon.participantsCount.toLocaleString()} hackers</span>
                    </div>
                  </div>

                  {/* Tracks & Tech Stack */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(hackathon.tracks || []).map((track, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono">
                          🎯 {track}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(hackathon.techStack || []).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{hackathon.startDate} - {hackathon.endDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedHackathon(hackathon);
                        setPitchIdeaName('');
                        setPitchProblem('');
                        setPitchResult(null);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>AI Pitch Deck</span>
                    </button>

                    <button
                      onClick={() => handleRegisterHackathon(hackathon)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/20 transition-all"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VERIFIED CERTIFICATIONS (NPTEL, AWS, AZURE) */}
      {/* ========================================================================= */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          {/* Provider Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-white/10">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCertProviderFilter('all')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  certProviderFilter === 'all' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                All Certifications
              </button>
              <button
                onClick={() => setCertProviderFilter('nptel')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  certProviderFilter === 'nptel' ? 'bg-purple-600 text-white font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                🎓 NPTEL (IITs)
              </button>
              <button
                onClick={() => setCertProviderFilter('aws')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  certProviderFilter === 'aws' ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                🟧 AWS Cloud
              </button>
              <button
                onClick={() => setCertProviderFilter('azure')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  certProviderFilter === 'azure' ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                🟦 Microsoft Azure
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search exam code, NPTEL, skill..."
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-3xl border border-white/10 bg-zinc-950/70 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Provider & Level Pill */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      cert.provider === 'NPTEL' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      cert.provider === 'AWS' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {cert.provider} • {cert.level}
                    </span>

                    {cert.status === 'Completed' && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Title & Badge Icon */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-xl shrink-0">
                      {cert.badgeIcon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold group-hover:text-emerald-400 transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Exam Code: {cert.examCode}</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed min-h-[48px]">{cert.description}</p>

                  {/* Score or Status Info */}
                  {cert.score && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
                      <span className="text-[10px] text-emerald-400 font-mono uppercase block">Score / Distinction</span>
                      <span className="font-bold text-white">{cert.score}</span>
                    </div>
                  )}

                  {/* Skills Tagged */}
                  <div className="flex flex-wrap gap-1.5">
                    {(cert.skillsCovered || []).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleGenerateCertPrep(cert)}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>14-Day Study AI</span>
                    </button>

                    <button
                      onClick={() => handleAddCertToProfile(cert)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sync to Resume</span>
                    </button>
                  </div>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-white text-[11px] flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Verify Credential Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: AI HACKATHON PITCH DECK GENERATOR */}
      {/* ========================================================================= */}
      {selectedHackathon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedHackathon(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                Gemini 3.6 Hackathon Pitch Engine
              </span>
              <h2 className="text-2xl font-black mt-1">
                Generate Pitch Deck for {selectedHackathon.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Input your hackathon project concept to generate a judge-focused pitch, 30-second elevator pitch script, and architecture breakdown.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Project / App Name</label>
                <input
                  type="text"
                  placeholder="e.g. Navricon, AgentPulse"
                  value={pitchIdeaName}
                  onChange={(e) => setPitchIdeaName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Problem Statement & Hackathon Concept</label>
                <textarea
                  rows={3}
                  placeholder="Describe the problem your team is tackling during this sprint..."
                  value={pitchProblem}
                  onChange={(e) => setPitchProblem(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 font-bold text-xs text-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>{isGeneratingPitch ? 'Generating AI Pitch Deck...' : 'Build Winning Pitch Deck'}</span>
              </button>
            </div>

            {/* AI Pitch Result */}
            {pitchResult && (
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-amber-500/30 space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">1-Liner Tagline</span>
                  <p className="text-base font-bold text-white mt-0.5">"{pitchResult.tagline}"</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block">Problem Narrative</span>
                    <p className="text-zinc-300 mt-1">{pitchResult.problemStatement}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block">Solution Overview</span>
                    <p className="text-zinc-300 mt-1">{pitchResult.solutionOverview}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Key Judge Features</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {pitchResult.keyFeatures?.map((f: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">30-Second Demo Pitch Script</span>
                  <p className="text-zinc-200 italic mt-1 leading-relaxed">"{pitchResult.demoScript30s}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CERTIFICATION 14-DAY AI STUDY PLAN */}
      {/* ========================================================================= */}
      {selectedCert && certPrepResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedCert(null);
                setCertPrepResult(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                14-Day AI Certification Prep Schedule
              </span>
              <h2 className="text-2xl font-black mt-1">
                {selectedCert.provider} {selectedCert.title} ({selectedCert.examCode})
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{certPrepResult.examSummary}</p>
            </div>

            {/* Top Topics */}
            <div>
              <h4 className="text-xs font-bold text-zinc-300 uppercase font-mono mb-2">Top Domain Objectives</h4>
              <div className="flex flex-wrap gap-1.5">
                {certPrepResult.topExamTopics?.map((topic: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    • {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 14 Day Plan List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase font-mono">14-Day Sprint Roadmap</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {certPrepResult.schedule14Days?.map((item: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-blue-400 block">{item.topic}</span>
                      <p className="text-zinc-400 mt-0.5">{item.focus}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 shrink-0">
                      {item.handsOnLab}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                handleAddCertToProfile(selectedCert);
                setSelectedCert(null);
                setCertPrepResult(null);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              Sync Study Schedule & Skill Badge to My Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
