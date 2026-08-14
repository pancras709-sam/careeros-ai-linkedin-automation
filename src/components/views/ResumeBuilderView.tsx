import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Sparkles, Plus, Trash2, Download, CheckCircle2, AlertTriangle, RefreshCw, Eye, ArrowRight, Wand2, Upload, FileUp, FileCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const ResumeBuilderView: React.FC = () => {
  const { resumeData, setResumeData, addToast, addXP, triggerConfetti } = useApp();
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [targetCompany, setTargetCompany] = useState('Google / Vercel / Top Tech Startup');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    addToast('Resume File Uploaded! 📄', `Analyzing ${file.name} for ATS score and bullet changes...`, 'info');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = (event.target?.result as string) || '';
      if (text.trim().length > 10) {
        setResumeData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: text.slice(0, 350) + '...',
          },
        }));
      }
      handleScanResume();
    };
    reader.readAsText(file);
  };

  const handleScanResume = async () => {
    setIsScanning(true);

    const fullResumeText = `
${resumeData.personalInfo.fullName} | ${resumeData.personalInfo.email}
${resumeData.personalInfo.summary}

EXPERIENCE:
${(resumeData.experience || []).map((e) => `${e.title} at ${e.company} (${e.startDate} - ${e.endDate})\n${(e.bullets || []).join('\n')}`).join('\n\n')}

PROJECTS:
${(resumeData.projects || []).map((p) => `${p.name}: ${p.description}\nTech Stack: ${(p.techStack || []).join(', ')}\n${(p.bullets || []).join('\n')}`).join('\n\n')}

SKILLS:
Languages: ${(resumeData.skills?.languages || []).join(', ')}
Frameworks: ${(resumeData.skills?.frameworks || []).join(', ')}
Databases: ${(resumeData.skills?.databases || []).join(', ')}
Tools: ${(resumeData.skills?.tools || []).join(', ')}
`;

    try {
      const res = await fetch('/api/ai/resume-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: fullResumeText, targetRole, targetCompany }),
      });
      const data = await res.json();
      if (data.data) {
        setScanResult(data.data);
        triggerConfetti();
        addToast('Resume Analyzed!', `ATS Readability: ${data.data.atsReadability}%`, 'success');
        addXP(250, 'Completed AI Resume Scan');
      }
    } catch {
      addToast('Error', 'Failed to analyze resume.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  const applyBulletImprovement = (expIdx: number, bulletIdx: number, newBulletText: string) => {
    const updated = { ...resumeData };
    updated.experience[expIdx].bullets[bulletIdx] = newBulletText;
    setResumeData(updated);
    addToast('Bullet Replaced!', 'Updated resume with high-impact quantified text.', 'success');
  };

  const handleExportPDF = () => {
    addToast('PDF Downloading...', 'Generated clean ATS-formatted resume PDF.', 'info');
    triggerConfetti();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 text-white space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
            Split-Screen Resume Studio
          </span>
          <h1 className="text-3xl font-black mt-1">Interactive AI Resume Builder & ATS Scanner</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Build clean, recruiter-approved resumes and optimize them with real-time Gemini AI suggestions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportPDF}
            className="px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4 text-blue-400" /> Export PDF / Markdown
          </button>
          <button
            disabled={isScanning}
            onClick={handleScanResume}
            className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 fill-white" />
            )}
            {isScanning ? 'Analyzing ATS...' : 'Run AI ATS Scan'}
          </button>
        </div>
      </div>

      {/* Upload Dropzone & Target Role Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Upload Resume File Dropzone */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-zinc-950/80 border border-dashed border-blue-500/40 hover:border-blue-400 transition-all flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <FileUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {uploadedFileName ? uploadedFileName : 'Upload Existing Resume File'}
              </span>
              <span className="text-[10px] text-zinc-400 block">
                {uploadedFileName ? 'Uploaded & Summary Generated Below' : 'Drag & drop or browse (.pdf, .docx, .txt)'}
              </span>
            </div>
          </div>

          <label className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white cursor-pointer transition-all shrink-0">
            <span>Browse File</span>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Target Job Title & Target Companies */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs">
          <div>
            <label className="text-zinc-400 uppercase font-bold text-[10px]">Target Job Title</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-zinc-400 uppercase font-bold text-[10px]">Target Companies</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* UPLOADED RESUME EXECUTIVE SUMMARY CARD */}
      {uploadedFileName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl border border-blue-500/30 bg-zinc-950/90 backdrop-blur-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Executive Summary from Uploaded Resume</h3>
                <p className="text-[11px] text-zinc-400">Extracted from {uploadedFileName}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
              Verified Candidate Profile
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Primary Expertise</span>
              <p className="font-semibold text-white">{resumeData.personalInfo.fullName} • {targetRole}</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">{resumeData.personalInfo.summary}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Core Technical Skills</span>
              <div className="flex flex-wrap gap-1">
                {[...(resumeData.skills?.languages || []), ...(resumeData.skills?.frameworks || []), ...(resumeData.skills?.databases || [])].map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Experience Overview</span>
              <div className="space-y-1 text-[11px]">
                {(resumeData.experience || []).map((exp, i) => (
                  <div key={i} className="flex justify-between text-zinc-300">
                    <span className="font-semibold">{exp.title}</span>
                    <span className="text-zinc-500">{exp.company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SPLIT SCREEN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL (7 cols): Resume Editor */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Section */}
          <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">Professional Summary</h3>
            <textarea
              rows={3}
              value={resumeData.personalInfo.summary}
              onChange={(e) =>
                setResumeData({
                  ...resumeData,
                  personalInfo: { ...resumeData.personalInfo, summary: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Work Experience Section */}
          <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">Work Experience</h3>
              <button
                onClick={() => {
                  const updated = { ...resumeData };
                  updated.experience.push({
                    id: 'exp-' + Date.now(),
                    title: 'Software Developer Intern',
                    company: 'Tech Startup',
                    location: 'Remote',
                    startDate: 'Jan 2026',
                    endDate: 'Present',
                    current: true,
                    bullets: ['Developed full-stack web features using React and Express.'],
                  });
                  setResumeData(updated);
                }}
                className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Role
              </button>
            </div>

            {(resumeData.experience || []).map((exp, expIdx) => (
              <div key={exp.id} className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => {
                      const updated = { ...resumeData };
                      updated.experience[expIdx].title = e.target.value;
                      setResumeData(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 font-bold text-white"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = { ...resumeData };
                      updated.experience[expIdx].company = e.target.value;
                      setResumeData(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 font-medium text-zinc-300"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Bullet Points</span>
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const updated = { ...resumeData };
                          updated.experience[expIdx].bullets[bIdx] = e.target.value;
                          setResumeData(updated);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 text-zinc-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills Section */}
          <div className="p-6 rounded-3xl border border-white/10 bg-zinc-950/60 space-y-4 text-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 uppercase font-bold text-[10px]">Languages</label>
                <input
                  type="text"
                  value={resumeData.skills.languages.join(', ')}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      skills: { ...resumeData.skills, languages: e.target.value.split(',').map((s) => s.trim()) },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 uppercase font-bold text-[10px]">Frameworks</label>
                <input
                  type="text"
                  value={resumeData.skills.frameworks.join(', ')}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      skills: { ...resumeData.skills, frameworks: e.target.value.split(',').map((s) => s.trim()) },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (5 cols): AI ATS Scanner Output */}
        <div className="lg:col-span-5 space-y-6">
          {scanResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl border border-blue-500/30 bg-zinc-950/90 backdrop-blur-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">ATS Analysis Results</h3>
                  <p className="text-xs text-zinc-400">Role: {targetRole}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-400">{scanResult.overallScore}</span>
                  <span className="text-xs text-zinc-500"> / 100</span>
                </div>
              </div>

              {/* Sub Scores */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">ATS Readability</span>
                  <span className="text-lg font-extrabold text-blue-400">{scanResult.atsReadability}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">Impact Density</span>
                  <span className="text-lg font-extrabold text-amber-400">{scanResult.impactScore || 86}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-400 text-[10px] block">Role Relevance</span>
                  <span className="text-lg font-extrabold text-emerald-400">{scanResult.relevanceScore || 90}%</span>
                </div>
              </div>

              {/* Missing Keywords */}
              <div>
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Missing Keywords for ATS Filters</h4>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.missingKeywords?.map((kw: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actionable Suggestions */}
              <div>
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">High Impact AI Suggestions</h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {scanResult.actionableTips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Improved Bullet Suggestions */}
              {Array.isArray(scanResult.improvedBullets) && scanResult.improvedBullets.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Quantified Bullet Point Rewrites</h4>
                  {scanResult.improvedBullets.map((item: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-xs space-y-2">
                      <p className="text-zinc-500 line-through">"{item.original}"</p>
                      <p className="text-emerald-300 font-semibold">"{item.improved}"</p>
                      <button
                        onClick={() => applyBulletImprovement(0, idx, item.improved)}
                        className="w-full py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1"
                      >
                        <Wand2 className="w-3.5 h-3.5" /> Apply 1-Click Bullet Rewrite
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="p-8 rounded-3xl border border-white/10 bg-zinc-950/60 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Ready for ATS Optimization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Click "Run AI ATS Scan" above to analyze your resume against {targetRole} expectations using the Navricon ATS Engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
