import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Upload, 
  Network, 
  Clock, 
  Cpu, 
  Briefcase, 
  Building2, 
  Award, 
  Trophy, 
  Bot, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  Search, 
  Bell, 
  UserCheck, 
  LogOut, 
  Sparkles,
  ChevronDown,
  FileText
} from 'lucide-react';

interface NavigationProps {
  onOpenAuth: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenAuth }) => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    activeRole, 
    setActiveRole, 
    notifications, 
    markNotificationAsRead, 
    clearAllNotifications, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    auth,
    logout
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'digital-twin', label: 'AI Digital Twin', icon: Bot, badge: 'Twin' },
    { id: 'career-insights', label: 'Career Insights', icon: ShieldCheck, badge: 'Gap' },
    { id: 'portfolio-generator', label: 'Portfolio Generator', icon: Sparkles, badge: 'AI' },
    { id: 'vault', label: 'Vault', icon: FolderKanban },
    { id: 'quick-upload', label: 'Quick Upload', icon: Upload, badge: 'OCR' },
    { id: 'graph', label: 'Knowledge Graph', icon: Network, highlight: true },
    { id: 'timeline', label: 'Career Journey', icon: Clock },
    { id: 'skills', label: 'Skills Matrix', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'internships', label: 'Internships', icon: Building2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'Gemini' },
    { id: 'resume', label: 'Resume Builder', icon: FileText, badge: 'PDF' },
    { id: 'jobs', label: 'Job Tracker', icon: Briefcase, badge: 'Match' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, adminOnly: true },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <>
      {/* Top Floating 3D Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3 bg-[#080b11]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* 3D Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/30 border border-white/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <span className="absolute inset-0 rounded-2xl bg-white/10 blur-sm group-hover:blur-md transition-all" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Memory<span className="soft-gradient-text">Verse</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 shadow-inner">
                  3D AI v2.6
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block tracking-wide">Intelligent Digital Memory Platform</p>
            </div>
          </div>

          {/* Global Smart Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search natural language (e.g. 'AWS cert', 'Python projects', 'Meta internship')..."
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  if (activeTab !== 'search' && e.target.value.trim().length > 0) {
                    setActiveTab('search');
                  }
                }}
                className="w-full soft-3d-input rounded-2xl pl-11 pr-12 py-2.5 text-xs text-slate-200 placeholder-slate-400 shadow-inner"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-slate-700 font-mono shadow">⌘K</span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Ask AI Shortcut */}
            <button
              onClick={() => setActiveTab('assistant')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl soft-3d-button-secondary text-indigo-300 text-xs font-semibold"
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Ask AI</span>
            </button>

            {/* Quick Upload Button */}
            <button
              onClick={() => setActiveTab('upload')}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl soft-3d-button text-white text-xs font-bold shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Docs</span>
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2.5 rounded-2xl soft-3d-button-secondary text-slate-300"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-md shadow-pink-500/50 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 soft-3d-panel rounded-3xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-400" /> System Notifications
                    </h4>
                    {notifications.length > 0 && (
                      <button 
                        onClick={clearAllNotifications}
                        className="text-[10px] text-slate-400 hover:text-indigo-400"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                            n.read 
                              ? 'bg-slate-900/40 border-white/5 text-slate-400' 
                              : 'bg-indigo-950/40 border-indigo-500/30 text-slate-200 shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-indigo-300">{n.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="hidden sm:flex items-center p-1 rounded-2xl bg-slate-950/80 border border-white/10 shadow-inner">
              <button
                onClick={() => setActiveRole('student')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveRole('admin')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeRole === 'admin'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Admin
              </button>
            </div>

            {/* User Profile Avatar */}
            {auth.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 rounded-2xl soft-3d-button-secondary"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/50"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-60 soft-3d-panel rounded-3xl p-3 z-50">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-sm font-bold text-slate-100">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        {user.degree}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 rounded-xl flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4 text-indigo-400" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={() => { setActiveTab('analytics'); setShowProfileMenu(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/60 rounded-xl flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4 text-purple-400" />
                        <span>Analytics</span>
                      </button>
                      <button
                        onClick={() => { logout(); setShowProfileMenu(false); onOpenAuth(); }}
                        className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl flex items-center gap-2 mt-1 border-t border-white/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-2xl soft-3d-button text-white text-xs font-bold shadow-md"
              >
                Sign In
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Main Tab Navigation Bar */}
      <nav className="w-full bg-[#080b11]/80 backdrop-blur-lg border-b border-white/10 overflow-x-auto scrollbar-none px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2 min-w-max">
          {navItems.map((item) => {
            if (item.adminOnly && activeRole !== 'admin') return null;
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-indigo-200 border border-indigo-500/40 shadow-lg shadow-indigo-500/15'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-200 font-bold border border-indigo-400/30">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
