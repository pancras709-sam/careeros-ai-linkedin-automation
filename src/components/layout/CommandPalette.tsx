import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppView, UserRole } from '../../types';
import { Search, Sparkles, LayoutDashboard, FileText, Video, Compass, Briefcase, Award, Linkedin, Shield, X, UserCheck, Users, BarChart3, Trophy, Code, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setCurrentView, setUserRole, setIsCopilotOpen } = useApp();
  const [search, setSearch] = useState('');

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (view: AppView, role?: UserRole) => {
    if (role) setUserRole(role);
    setCurrentView(view);
    setIsCommandPaletteOpen(false);
  };

  const commandItems = [
    { title: 'Student Dashboard', category: 'Student Portal', icon: LayoutDashboard, action: () => navigateTo('dashboard', 'student') },
    { title: 'AI Career Roadmap Generator', category: 'Student Portal', icon: Compass, action: () => navigateTo('roadmap', 'student') },
    { title: 'AI Resume Builder & ATS Scanner', category: 'Student Portal', icon: FileText, action: () => navigateTo('resume-builder', 'student') },
    { title: 'AI Voice Mock Interview Studio', category: 'Student Portal', icon: Video, action: () => navigateTo('interview', 'student') },
    { title: 'TCS, Cognizant, Zoho & Accenture Tests', category: 'Student Portal', icon: Building2, action: () => navigateTo('company-tests', 'student') },
    { title: 'LeetCode Contest Arena & Coin Rewards', category: 'Student Portal', icon: Code, action: () => navigateTo('coding-contest', 'student') },
    { title: 'Skill Gap & Placement Score Radar', category: 'Student Portal', icon: Award, action: () => navigateTo('skill-gap', 'student') },
    { title: 'Internships & Projects Finder', category: 'Student Portal', icon: Briefcase, action: () => navigateTo('jobs', 'student') },
    { title: 'Upcoming Hackathons & TechSprints', category: 'Student Portal', icon: Trophy, action: () => navigateTo('hackathons', 'student') },
    { title: 'NPTEL, AWS & Azure Certifications Hub', category: 'Student Portal', icon: Award, action: () => navigateTo('certifications', 'student') },
    { title: 'LinkedIn AI Post Generator', category: 'Student Portal', icon: Linkedin, action: () => navigateTo('linkedin-ai', 'student') },
    
    { title: 'Startup Talent Matcher Engine', category: 'Company Portal', icon: UserCheck, action: () => navigateTo('company-matcher', 'company') },
    { title: 'Candidate Pipeline Kanban', category: 'Company Portal', icon: Users, action: () => navigateTo('company-pipeline', 'company') },
    
    { title: 'University Placement Analytics', category: 'College Portal', icon: BarChart3, action: () => navigateTo('college-analytics', 'college') },
    { title: 'Student Credential Directory', category: 'College Portal', icon: Shield, action: () => navigateTo('college-students', 'college') },
    
    { title: 'Recruiter Sourcing Search', category: 'Recruiter Portal', icon: Search, action: () => navigateTo('recruiter-search', 'recruiter') },
    { title: 'Admin System Metrics', category: 'Admin Portal', icon: Shield, action: () => navigateTo('admin-metrics', 'admin') },
  ];

  const filtered = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-4 shadow-2xl text-white overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command, page name, or portal view..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm placeholder-zinc-500 focus:outline-none"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick AI Trigger */}
          <div className="p-2 border-b border-white/5">
            <button
              onClick={() => {
                setIsCommandPaletteOpen(false);
                setIsCopilotOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 transition-all text-xs font-semibold"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Open Navricon Copilot
              </span>
              <span className="text-[10px] opacity-70">Pro</span>
            </button>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <p className="text-center py-6 text-xs text-zinc-500">No matching command or page found.</p>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-zinc-200 group-hover:text-white">{item.title}</p>
                        <p className="text-[10px] text-zinc-500">{item.category}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">Jump →</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-3 pt-2 text-[10px] text-zinc-500 border-t border-white/5">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 font-mono">ESC</kbd> to exit</span>
            <span>Navigated by Navricon Engine</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
