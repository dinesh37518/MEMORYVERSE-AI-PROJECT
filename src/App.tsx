import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/dashboard/DashboardView';
import { KnowledgeGraphView } from './components/graph/KnowledgeGraphView';
import { UploadModule } from './components/upload/UploadModule';
import { TimelineView } from './components/timeline/TimelineView';
import { SkillsView } from './components/skills/SkillsView';
import { ProjectsView } from './components/projects/ProjectsView';
import { InternshipView } from './components/internship/InternshipView';
import { CertificationsView } from './components/certifications/CertificationsView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { AIAssistantView } from './components/ai/AIAssistantView';
import { SmartSearchView } from './components/search/SmartSearchView';
import { ProfileView } from './components/profile/ProfileView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AdminPanelView } from './components/admin/AdminPanelView';
import { DocumentViewerModal } from './components/documents/DocumentViewerModal';
import { AuthModal } from './components/auth/AuthModal';
import { LoginPageView } from './components/auth/LoginPageView';

export function App() {
  const { activeTab, activeRole, auth, previewDoc, setPreviewDoc } = useApp();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Requirement: Show Login Page FIRST if unauthenticated
  if (!auth.isAuthenticated) {
    return <LoginPageView />;
  }

  // Render view based on active navigation tab or active role
  const renderActiveView = () => {
    // If logged in as Admin, show Admin User Counts Portal
    if (activeRole === 'admin') {
      return <AdminPanelView />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'vault':
        return <UploadModule />;
      case 'quick-upload':
        return <UploadModule />;
      case 'graph':
        return <KnowledgeGraphView />;
      case 'timeline':
        return <TimelineView />;
      case 'skills':
        return <SkillsView />;
      case 'projects':
        return <ProjectsView />;
      case 'internships':
        return <InternshipView />;
      case 'certifications':
        return <CertificationsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'search':
        return <SmartSearchView />;
      case 'profile':
        return <ProfileView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'admin':
        return <AdminPanelView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 3D Modern Top Floating Navigation */}
      <Navigation onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {renderActiveView()}
      </main>

      {/* Global Document Inspector Drawer/Modal */}
      <DocumentViewerModal 
        document={previewDoc} 
        onClose={() => setPreviewDoc(null)} 
      />

      {/* Auth Modal for Quick Switch / Profile Manage */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

    </div>
  );
}

export default App;
