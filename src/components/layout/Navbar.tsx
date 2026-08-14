import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, AppView } from '../../types';
import { Compass, Command, Bell, Sun, Moon, ChevronDown, Check, User, Shield, Briefcase, GraduationCap, Building2, Sparkles, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    studentProfile,
    notifications,
    markNotificationRead,
    setIsCommandPaletteOpen,
  } = useApp();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update glassmorphic style threshold
      setIsScrolled(currentScrollY > 20);

      // Scroll direction reveal logic
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else {
        if (currentScrollY < lastScrollY.current) {
          // Scrolling UP -> reveal navbar instantly
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current + 6) {
          // Scrolling DOWN -> hide navbar smoothly
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force navbar to stay visible if menus are open
  const shouldShow = isVisible || isRoleMenuOpen || isNotificationsOpen;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roles: Array<{ id: UserRole; label: string; desc: string; icon: any; defaultView: AppView }> = [
    { id: 'student', label: 'Student Portal', desc: 'Roadmaps, AI Resumes, Tests & Contests', icon: User, defaultView: 'dashboard' },
    { id: 'company', label: 'Startup Portal', desc: 'AI Talent Matcher & ATS Pipeline', icon: Building2, defaultView: 'company-matcher' },
    { id: 'college', label: 'College Portal', desc: 'Placement Analytics & Student Roster', icon: GraduationCap, defaultView: 'college-analytics' },
    { id: 'recruiter', label: 'Recruiter Portal', desc: 'Talent Sourcing & Live Job Listings', icon: Briefcase, defaultView: 'recruiter-search' },
    { id: 'admin', label: 'Admin Portal', desc: 'Platform Health & Global Metrics', icon: Shield, defaultView: 'admin-metrics' },
  ];

  const handleSelectRole = (role: UserRole, view: AppView) => {
    setUserRole(role);
    setCurrentView(view);
    setIsRoleMenuOpen(false);
  };

  const navLinks: Record<UserRole, Array<{ view: AppView; label: string; shortLabel?: string }>> = {
    student: [
      { view: 'dashboard', label: 'Dashboard' },
      { view: 'roadmap', label: 'Roadmap' },
      { view: 'resume-builder', label: 'Resume AI' },
      { view: 'interview', label: 'Mock Interview' },
      { view: 'company-tests', label: 'Assessment Tests' },
      { view: 'coding-contest', label: 'Contests' },
      { view: 'hackathons', label: 'Hackathons & Certs' },
    ],
    company: [
      { view: 'company-matcher', label: 'Talent Matcher' },
      { view: 'company-pipeline', label: 'ATS Pipeline' },
      { view: 'company-tests', label: 'Assessments' },
    ],
    college: [
      { view: 'college-analytics', label: 'Placement Analytics' },
      { view: 'college-students', label: 'Student Roster' },
    ],
    recruiter: [
      { view: 'recruiter-search', label: 'Talent Sourcing' },
      { view: 'jobs', label: 'Job Listings' },
    ],
    admin: [
      { view: 'admin-metrics', label: 'Metrics' },
    ],
  };

  const currentNavLinks = navLinks[userRole] || [];

  return (
    <header
      className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-7xl transition-all duration-300 transform ${
        shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full text-white transition-all duration-300 border ${
          isScrolled
            ? 'bg-zinc-950/85 backdrop-blur-2xl border-white/20 shadow-2xl shadow-blue-900/30 ring-1 ring-blue-500/20'
            : 'bg-zinc-900/90 backdrop-blur-xl border-white/10 shadow-xl shadow-black/40'
        }`}
      >
        {/* Left: Brand & Role Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent hidden min-[380px]:inline">
              Navricon
            </span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Persona Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] sm:text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="capitalize">{userRole}</span>
              <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isRoleMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2.5 w-64 p-2 rounded-2xl border border-white/15 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl z-50 text-xs text-white"
                >
                  <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/10 mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1">
                      <Layers className="w-3 h-3 text-blue-400" /> Switch Ecosystem Portal
                    </span>
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = userRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleSelectRole(r.id, r.defaultView)}
                        className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/90 text-white font-medium shadow-md border border-blue-400/30'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSelected ? 'bg-white/20' : 'bg-zinc-800 border border-white/5'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs">{r.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                          </div>
                          <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-blue-100' : 'text-zinc-400'}`}>{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle: Interactive Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 max-w-[55vw] xl:max-w-none overflow-x-auto scrollbar-none">
          {currentNavLinks.map((item) => {
            const isActive = currentView === item.view || (item.view === 'hackathons' && currentView === 'certifications');
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25 border border-white/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Search, Theme, Notifications & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Search Cmd+K Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all cursor-pointer group"
            title="Command Palette (Cmd + K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-[11px] hidden lg:inline">Search</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-white/10">⌘K</kbd>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse ring-2 ring-zinc-950" />
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2.5 w-80 p-3 rounded-2xl border border-white/15 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl z-50 text-xs text-white"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="font-bold flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-blue-400" /> Notifications
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                          !n.read
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <p className="font-bold text-white text-xs">{n.title}</p>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[9px] text-zinc-500 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Level / XP Avatar Link */}
          <button
            onClick={() => setCurrentView('pricing')}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="relative">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-500/50"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950" />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-200">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400/20" />
              <span>Lvl {studentProfile.level}</span>
            </div>
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

