import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, AppView, StudentProfile, ResumeData, RoadmapData, JobListing, CandidateApplication, NotificationItem, PricingPlan, DailyQuest, Hackathon, Certification } from '../types';
import { initialStudentProfile, initialDailyQuests, sampleResume, sampleJobListings, sampleCandidateApplications, pricingPlans, upcomingHackathons, featuredCertifications } from '../lib/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  roadmapData: RoadmapData | null;
  setRoadmapData: React.Dispatch<React.SetStateAction<RoadmapData | null>>;
  dailyQuests: DailyQuest[];
  completeQuest: (questId: string) => void;
  addXP: (amount: number, reason?: string) => void;

  jobListings: JobListing[];
  setJobListings: React.Dispatch<React.SetStateAction<JobListing[]>>;
  toggleApplyJob: (jobId: string) => void;

  hackathons: Hackathon[];
  setHackathons: React.Dispatch<React.SetStateAction<Hackathon[]>>;
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;

  candidateApplications: CandidateApplication[];
  setCandidateApplications: React.Dispatch<React.SetStateAction<CandidateApplication[]>>;
  updateCandidateStage: (id: string, newStage: CandidateApplication['stage']) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  selectedPlan: PricingPlan | null;
  setSelectedPlan: (plan: PricingPlan | null) => void;
  triggerCheckout: (plan: PricingPlan) => void;

  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
  addCoins: (amount: number, reason?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResume);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(initialDailyQuests);
  
  const [jobListings, setJobListings] = useState<JobListing[]>(sampleJobListings);
  const [hackathons, setHackathons] = useState<Hackathon[]>(upcomingHackathons);
  const [certifications, setCertifications] = useState<Certification[]>(featuredCertifications);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplication[]>(sampleCandidateApplications);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Interview Scheduled',
      message: 'Linear Ecosystem invited you to Technical Round 1 for Founding Engineer role.',
      timestamp: '10 mins ago',
      type: 'success',
      read: false,
    },
    {
      id: 'n2',
      title: 'Resume ATS Score Improved',
      message: 'Your resume score went from 78 -> 92 following AI suggestions.',
      timestamp: '2 hours ago',
      type: 'achievement',
      read: false,
    },
    {
      id: 'n3',
      title: 'New Recruiter Profile View',
      message: 'A talent partner from Vercel viewed your GitHub and AI Portfolio.',
      timestamp: '1 day ago',
      type: 'info',
      read: true,
    },
  ]);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(pricingPlans[1]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Command+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#007AFF', '#34C759', '#AF52DE', '#FF9500'],
    });
  };

  const addToast = (title: string, message: string, type: Toast['type'] = 'info') => {
    const id = 'toast-' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addXP = (amount: number, reason?: string) => {
    setStudentProfile((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const leveledUp = newLevel > prev.level;
      if (leveledUp) {
        triggerConfetti();
        addToast(`🎉 Level Up! You reached Level ${newLevel}!`, 'Keep building your career portfolio!', 'success');
      } else if (reason) {
        addToast(`+${amount} Career XP Earned`, reason, 'success');
      }
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const addCoins = (amount: number, reason?: string) => {
    setStudentProfile((prev) => {
      const newCoins = (prev.coins || 0) + amount;
      if (reason) {
        addToast(`🪙 +${amount} Contest Coins Reward!`, reason, 'success');
      }
      return {
        ...prev,
        coins: newCoins,
      };
    });
  };

  const completeQuest = (questId: string) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && !q.completed) {
          addXP(q.xpReward, `Completed Quest: ${q.title}`);
          return { ...q, progress: 100, completed: true };
        }
        return q;
      })
    );
  };

  const toggleApplyJob = (jobId: string) => {
    setJobListings((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const isApplied = job.status === 'applied';
          const newStatus = isApplied ? undefined : 'applied';
          if (!isApplied) {
            addXP(200, `Submitted Application for ${job.title} at ${job.company}`);
            triggerConfetti();
          }
          return { ...job, status: newStatus };
        }
        return job;
      })
    );
  };

  const updateCandidateStage = (id: string, newStage: CandidateApplication['stage']) => {
    setCandidateApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage: newStage } : app))
    );
    addToast('Stage Updated', `Candidate moved to ${newStage}`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const triggerCheckout = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentView,
        setCurrentView,
        theme,
        toggleTheme,
        studentProfile,
        setStudentProfile,
        resumeData,
        setResumeData,
        roadmapData,
        setRoadmapData,
        dailyQuests,
        completeQuest,
        addXP,
        addCoins,
        jobListings,
        setJobListings,
        toggleApplyJob,
        hackathons,
        setHackathons,
        certifications,
        setCertifications,
        candidateApplications,
        setCandidateApplications,
        updateCandidateStage,
        notifications,
        markNotificationRead,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCopilotOpen,
        setIsCopilotOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPlan,
        setSelectedPlan,
        triggerCheckout,
        toasts,
        addToast,
        removeToast,
        triggerConfetti,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
