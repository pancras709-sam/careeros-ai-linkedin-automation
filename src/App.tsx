import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { AICopilotDrawer } from './components/layout/AICopilotDrawer';
import { CommandPalette } from './components/layout/CommandPalette';
import { PaymentModal } from './components/modals/PaymentModal';
import { ToastContainer } from './components/layout/ToastContainer';

import { LandingView } from './components/views/LandingView';
import { StudentDashboard } from './components/views/StudentDashboard';
import { CareerRoadmapView } from './components/views/CareerRoadmapView';
import { ResumeBuilderView } from './components/views/ResumeBuilderView';
import { MockInterviewView } from './components/views/MockInterviewView';
import { SkillGapView } from './components/views/SkillGapView';
import { JobsView } from './components/views/JobsView';
import { LinkedInAIView } from './components/views/LinkedInAIView';
import { CompanyMatcherView } from './components/views/CompanyMatcherView';
import { CompanyPipelineView } from './components/views/CompanyPipelineView';
import { CollegeAnalyticsView } from './components/views/CollegeAnalyticsView';
import { CollegeStudentsView } from './components/views/CollegeStudentsView';
import { RecruiterSearchView } from './components/views/RecruiterSearchView';
import { AdminMetricsView } from './components/views/AdminMetricsView';
import { PricingView } from './components/views/PricingView';
import { HackathonsCertificationsView } from './components/views/HackathonsCertificationsView';
import { CompanyTestsView } from './components/views/CompanyTestsView';
import { CodingContestView } from './components/views/CodingContestView';

const MainContent: React.FC = () => {
  const { currentView, setIsCommandPaletteOpen } = useApp();

  // Keyboard shortcut listener for Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'roadmap':
        return <CareerRoadmapView />;
      case 'resume-builder':
        return <ResumeBuilderView />;
      case 'interview':
        return <MockInterviewView />;
      case 'skill-gap':
        return <SkillGapView />;
      case 'jobs':
        return <JobsView />;
      case 'linkedin-ai':
        return <LinkedInAIView />;
      case 'company-matcher':
        return <CompanyMatcherView />;
      case 'company-pipeline':
        return <CompanyPipelineView />;
      case 'college-analytics':
        return <CollegeAnalyticsView />;
      case 'college-students':
        return <CollegeStudentsView />;
      case 'recruiter-search':
        return <RecruiterSearchView />;
      case 'admin-metrics':
        return <AdminMetricsView />;
      case 'pricing':
        return <PricingView />;
      case 'hackathons':
      case 'certifications':
        return <HackathonsCertificationsView />;
      case 'company-tests':
        return <CompanyTestsView />;
      case 'coding-contest':
        return <CodingContestView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500 selection:text-white relative">
      <Navbar />
      <main className="w-full">{renderView()}</main>
      <AICopilotDrawer />
      <CommandPalette />
      <PaymentModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
