export type UserRole = 'student' | 'company' | 'college' | 'recruiter' | 'admin';

export type AppView = 
  | 'landing'
  | 'dashboard'
  | 'roadmap'
  | 'resume-builder'
  | 'interview'
  | 'skill-gap'
  | 'jobs'
  | 'linkedin-ai'
  | 'portfolio'
  | 'company-matcher'
  | 'company-pipeline'
  | 'college-analytics'
  | 'college-students'
  | 'recruiter-search'
  | 'admin-metrics'
  | 'pricing'
  | 'hackathons'
  | 'certifications'
  | 'company-tests'
  | 'coding-contest'
  | 'settings';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  graduationYear: number;
  avatar: string;
  xp: number;
  coins: number;
  level: number;
  streakDays: number;
  placementScore: number; // 0-100
  bio: string;
  skills: string[];
  badges: Badge[];
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  earnedAt?: string;
  category: 'code' | 'interview' | 'community' | 'streak';
}

export interface DailyQuest {
  id: string;
  title: string;
  xpReward: number;
  progress: number; // 0 - 100
  completed: boolean;
  category: 'resume' | 'interview' | 'code' | 'networking';
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    summary: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    techStack: string[];
    link: string;
    bullets: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    databases: string[];
    tools: string[];
  };
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  status: 'locked' | 'in_progress' | 'completed';
  topics: string[];
  recommendedProject?: {
    name: string;
    description: string;
    techStack: string[];
  };
  resourceLinks?: Array<{
    name: string;
    url: string;
  }>;
}

export interface RoadmapData {
  title: string;
  description: string;
  totalEstimatedWeeks: number;
  milestones: RoadmapMilestone[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Remote';
  stipend: string;
  tags: string[];
  matchScore: number;
  applicantsCount: number;
  postedDate: string;
  description: string;
  requirements: string[];
  status?: 'saved' | 'applied' | 'interviewing' | 'offered';
}

export interface CandidateApplication {
  id: string;
  candidateName: string;
  university: string;
  major: string;
  gradYear: number;
  matchScore: number;
  appliedRole: string;
  stage: 'Screening' | 'Technical Round' | 'Culture Fit' | 'Offered' | 'Rejected';
  appliedDate: string;
  skills: string[];
  resumeUrl: string;
  aiNotes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'achievement' | 'alert';
  read: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  targetUser: 'student' | 'company' | 'college';
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  startDate: string;
  endDate: string;
  mode: 'Online' | 'Hybrid' | 'In-Person';
  prizePool: string;
  techStack: string[];
  description: string;
  status: 'Upcoming' | 'Registration Open' | 'Ongoing';
  participantsCount: number;
  registrationUrl: string;
  tracks: string[];
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  provider: 'NPTEL' | 'AWS' | 'Azure' | 'Google Cloud';
  level: 'Foundational' | 'Associate' | 'Professional' | 'Elite + Gold' | 'Specialty';
  badgeUrl: string;
  badgeIcon: string;
  category: string;
  description: string;
  skillsCovered: string[];
  examCode: string;
  recommendedPrepDays: number;
  status: 'Completed' | 'In Progress' | 'Explore';
  verificationUrl?: string;
  score?: string;
  nptelCourseId?: string;
  issueDate?: string;
}

