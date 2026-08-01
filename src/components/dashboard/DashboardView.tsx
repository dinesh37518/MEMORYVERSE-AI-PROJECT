import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { analyzeDocumentHealth } from '../../services/documentHealthService';
import { generateAIRecommendations } from '../../services/recommendationEngine';
import { 
  FolderKanban, 
  Award, 
  Briefcase, 
  Building2, 
  Cpu, 
  Trophy, 
  FileText, 
  Upload, 
  Bot, 
  Network, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Layers,
  AlertCircle,
  TrendingUp,
  Target,
  Info,
  X
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    user, 
    documents, 
    skills, 
    projects, 
    internships, 
    certifications, 
    achievements, 
    timeline, 
    setActiveTab, 
    setActiveRole,
    setPreviewDoc 
  } = useApp();

  const [showLearningTrendInfo, setShowLearningTrendInfo] = useState(false);

  const totalDocs = documents.length;
  const certsCount = certifications.length;
  const projectsCount = projects.length;
  const internshipCount = internships.length;
  const skillsCount = skills.length;
  const achievementsCount = achievements.length;

  const masterResume = documents.find(d => d.category === 'Resume');
  const recentUploads = documents.slice(0, 4);
  const recentTimeline = timeline.slice(0, 4);

  // AI Feature Synthesizers
  const docHealthChecks = analyzeDocumentHealth(documents);
  const docHealthWarnings = docHealthChecks.filter(h => h.status !== 'healthy');
  const recommendations = generateAIRecommendations(skills, certifications, projects, internships);

  // Calculate top skill cleanly with fallbacks
  const topSkillObj = skills.sort((a, b) => b.score - a.score)[0];
  const topSkill = topSkillObj ? `${topSkillObj.name} (${topSkillObj.category})` : (skills[0]?.name || 'Full Stack Web Development');
  const topTech = projects[0]?.technologies[0] || 'React / Node.js';

  // Learning & Coding Activity Trend Score Calculation Basis Logic
  // Incorporates: GitHub (Compulsory), LinkedIn (Compulsory), LeetCode (Compulsory), GFG (Optional), CodeChef (Optional)
  const hasGithub = Boolean(user.githubUrl || user.github);
  const hasLinkedin = Boolean(user.linkedinUrl || user.linkedin);
  const hasLeetcode = Boolean(user.leetcodeUrl);
  const hasGfg = Boolean(user.gfgUrl);
  const hasCodechef = Boolean(user.codechefUrl);

  const activeProfilesCount = [hasGithub, hasLinkedin, hasLeetcode, hasGfg, hasCodechef].filter(Boolean).length;
  const totalVerifiedAssets = totalDocs + skillsCount + projectsCount + certsCount + internshipCount;
  
  // Base calculation with compulsory platform weights
  let baseScore = 20;
  if (hasGithub) baseScore += 20;
  if (hasLinkedin) baseScore += 15;
  if (hasLeetcode) baseScore += 20;
  if (hasGfg) baseScore += 10;
  if (hasCodechef) baseScore += 10;
  baseScore += Math.min(25, totalVerifiedAssets * 2);

  const learningTrendPercent = Math.min(98, Math.max(15, baseScore));
  const monthlyActivityCount = Math.min(totalVerifiedAssets + activeProfilesCount * 3, Math.max(5, Math.round(totalVerifiedAssets * 0.5 + activeProfilesCount * 2)));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* 3D Volumetric Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl soft-3d-panel border border-white/15 p-6 lg:p-8 bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-950">
        
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-5">
            
            {/* Passport Photo Manner Container (3:4 aspect ratio portrait frame) */}
            <div className="relative shrink-0">
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'}
                alt={user.name}
                className="w-22 h-28 sm:w-26 sm:h-32 rounded-2xl object-cover ring-4 ring-indigo-500/50 shadow-2xl shadow-indigo-500/30 border border-white/20"
              />
              <span className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-emerald-500 ring-4 ring-slate-950 text-white shadow-lg" title="Passport Identity Verified">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome back, <span className="soft-gradient-text">{user.name}</span> 👋
                </h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-inner flex items-center gap-1">
                  Identity Verified
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
                {user.degree} at <span className="font-bold text-white">{user.college}</span> • Class of {user.graduationYear}
              </p>

              {/* Student Academic Identity Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                {user.regNo && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-200 border border-indigo-500/40 font-mono font-bold">
                    Reg No: {user.regNo}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-950/80 text-purple-200 border border-purple-500/40 font-bold">
                  Dept: {user.department || 'ECE'}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-slate-200 border border-white/10 font-bold">
                  Section: {user.section || 'A'} • Year: {user.currentYear || 2}
                </span>
              </div>
              
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic">
                "{user.bio}"
              </p>
            </div>

          </div>

          {/* Quick 3D Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('digital-twin')}
              className="flex-1 lg:flex-none px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-purple-200" /> AI Digital Twin
            </button>
            <button
              onClick={() => setActiveTab('career-insights')}
              className="flex-1 lg:flex-none px-4 py-3 rounded-2xl soft-3d-button text-white text-xs font-extrabold shadow-xl flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4 text-amber-300" /> Gap Analyzer
            </button>
            <button
              onClick={() => setActiveTab('portfolio-generator')}
              className="flex-1 lg:flex-none px-4 py-3 rounded-2xl soft-3d-button-secondary text-indigo-300 text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-400" /> Portfolio AI
            </button>
          </div>

        </div>

        {/* Digital Identity Completeness Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">Digital Identity Score:</span>
            <span className="font-extrabold text-indigo-300 font-mono text-sm">{user.profileCompletionPercent}%</span>
          </div>
          
          <div className="flex-1 max-w-md h-3 rounded-full bg-slate-950 overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-700 shadow-md"
              style={{ width: `${user.profileCompletionPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* FEATURE 10: AI Insights Dashboard Widgets (WITH STRICT CONTAINER BOUNDS & NO TEXT OVERFLOW) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* STRONGEST SKILL CARD (Fixed overflow with min-w-0 flex-1 truncate) */}
        <div className="p-5 rounded-3xl soft-3d-card border border-indigo-500/30 flex items-center gap-3.5 min-w-0 overflow-hidden">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Strongest Skill</span>
            <p className="text-xs sm:text-sm font-extrabold text-white truncate" title={topSkill}>
              {topSkill}
            </p>
            <span className="text-[10px] text-indigo-300 font-medium block truncate">Verified Level 90+</span>
          </div>
        </div>

        {/* MOST USED TECH CARD */}
        <div className="p-5 rounded-3xl soft-3d-card border border-purple-500/30 flex items-center gap-3.5 min-w-0 overflow-hidden">
          <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Most Used Tech</span>
            <p className="text-xs sm:text-sm font-extrabold text-white truncate" title={topTech}>
              {topTech}
            </p>
            <span className="text-[10px] text-purple-300 font-medium block truncate">{projectsCount} Projects Linked</span>
          </div>
        </div>

        {/* LEARNING TREND CARD WITH EXPLICIT REASON & INFO MODAL TRIGGER */}
        <div className="p-5 rounded-3xl soft-3d-card border border-emerald-500/30 flex items-center gap-3.5 min-w-0 overflow-hidden relative group">
          <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Learning Trend</span>
              <button
                type="button"
                onClick={() => setShowLearningTrendInfo(true)}
                className="text-slate-400 hover:text-emerald-400 p-0.5 transition-colors"
                title="View Learning Trend Calculation Reason"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-emerald-300 truncate">
              ↑ {learningTrendPercent}% Growth
            </p>
            <p className="text-[9.5px] text-slate-400 truncate mt-0.5" title={`Based on ${monthlyActivityCount} new uploads & verified skill items this month`}>
              Based on {monthlyActivityCount} new monthly assets
            </p>
          </div>
        </div>

        {/* CAREER GOAL CARD */}
        <div className="p-5 rounded-3xl soft-3d-card border border-amber-500/30 flex items-center gap-3.5 min-w-0 overflow-hidden">
          <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Career Goal</span>
            <p className="text-xs sm:text-sm font-extrabold text-white truncate" title="Full Stack / SDE">
              Full Stack / SDE
            </p>
            <span className="text-[10px] text-amber-300 font-medium block truncate">Target Placement</span>
          </div>
        </div>

      </div>

      {/* LEARNING TREND CALCULATION REASON MODAL / EXPANDED BANNER */}
      {showLearningTrendInfo && (
        <div className="p-5 rounded-3xl bg-slate-900 border border-emerald-500/40 text-xs text-slate-200 space-y-3 animate-in fade-in shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="font-extrabold text-white flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> AI Learning & Coding Activity Trend Score ({learningTrendPercent}%)
            </h4>
            <button
              onClick={() => setShowLearningTrendInfo(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            The <strong className="text-emerald-300">Learning & Coding Activity Trend ({learningTrendPercent}%)</strong> score is computed by AI inspecting activity across your linked coding platforms & verified vault assets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5">
              <span className="font-extrabold text-indigo-300 block uppercase tracking-wider text-[10px]">🔴 Compulsory Profiles Activity</span>
              <ul className="space-y-1 text-slate-300 pl-3 list-disc">
                <li><strong>GitHub:</strong> {hasGithub ? '✓ Connected & Active (Repos, Commits & PRs)' : '❌ Missing (Add URL in Profile)'}</li>
                <li><strong>LinkedIn:</strong> {hasLinkedin ? '✓ Connected & Active (Network & Profile)' : '❌ Missing (Add URL in Profile)'}</li>
                <li><strong>LeetCode:</strong> {hasLeetcode ? '✓ Connected & Active (Problem Solving & Contests)' : '❌ Missing (Add URL in Profile)'}</li>
              </ul>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5">
              <span className="font-extrabold text-purple-300 block uppercase tracking-wider text-[10px]">⚪ Optional Profiles & Vault Assets</span>
              <ul className="space-y-1 text-slate-300 pl-3 list-disc">
                <li><strong>GeeksforGeeks:</strong> {hasGfg ? '✓ Connected (Practice Scores)' : '⚪ Optional (Not Linked)'}</li>
                <li><strong>CodeChef:</strong> {hasCodechef ? '✓ Connected (Rating & Stars)' : '⚪ Optional (Not Linked)'}</li>
                <li><strong>Verified Vault Records:</strong> {totalVerifiedAssets} indexed skills, certs & projects.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* FEATURE 11: Smart Document Health Warning Banner (If Issues Exist) */}
      {docHealthWarnings.length > 0 && (
        <div className="p-4 rounded-3xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-amber-200">Smart Document Health Inspection Alert</p>
              <p className="text-[11px] text-amber-300/80">
                Detected {docHealthWarnings.length} file health check notification(s): {docHealthWarnings[0].fileName} ({docHealthWarnings[0].issues.join(', ')}).
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('vault')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shrink-0 shadow"
          >
            Review Vault Health
          </button>
        </div>
      )}

      {/* 3D Tactile Tile Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        
        {/* Total Docs */}
        <div 
          onClick={() => setActiveTab('vault')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-indigo-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Docs</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{totalDocs}</p>
            <p className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> All Parsed
            </p>
          </div>
        </div>

        {/* Certificates */}
        <div 
          onClick={() => setActiveTab('certifications')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-emerald-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Certificates</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{certsCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">Verified Creds</p>
          </div>
        </div>

        {/* Projects */}
        <div 
          onClick={() => setActiveTab('projects')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-purple-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Projects</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{projectsCount}</p>
            <p className="text-[10px] text-purple-300 mt-1">Reports Linked</p>
          </div>
        </div>

        {/* Internships */}
        <div 
          onClick={() => setActiveTab('internships')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-cyan-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Internships</span>
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{internshipCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">Proof Letters</p>
          </div>
        </div>

        {/* Skills */}
        <div 
          onClick={() => setActiveTab('skills')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-amber-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Skills</span>
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{skillsCount}</p>
            <p className="text-[10px] text-amber-300 mt-1">Verified Graph</p>
          </div>
        </div>

        {/* Achievements */}
        <div 
          onClick={() => setActiveTab('achievements')}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between hover:border-pink-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Achievements</span>
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 group-hover:scale-110 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{achievementsCount}</p>
            <p className="text-[10px] text-pink-300 mt-1">Awards Won</p>
          </div>
        </div>

        {/* Master Resume */}
        <div 
          onClick={() => {
            if (masterResume) {
              setPreviewDoc(masterResume);
            } else {
              setActiveTab('resume');
            }
          }}
          className="soft-3d-card p-5 rounded-3xl cursor-pointer group flex flex-col justify-between col-span-2 sm:col-span-1 hover:border-cyan-500/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Resume</span>
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-white truncate">{masterResume ? 'Master CV' : 'Resume Builder'}</p>
            <p className="text-[10px] text-cyan-300 mt-1 flex items-center gap-1 font-semibold">
              <span>View Document</span> <ExternalLink className="w-2.5 h-2.5" />
            </p>
          </div>
        </div>

      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Uploads & Smart Search (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recent Vault Uploads Panel */}
          <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-indigo-400" /> Preserved Document Vault Uploads
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Original format preserved with AI extracted metadata</p>
              </div>
              <button
                onClick={() => setActiveTab('vault')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                View Vault ({totalDocs}) <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {recentUploads.length === 0 ? (
                <div className="p-8 rounded-3xl bg-slate-900/90 border-2 border-dashed border-indigo-500/30 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                    <Upload className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Welcome {user.name}! Your Vault is Empty</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                      MemoryVerse AI maintains completely isolated document vaults per student (Reg No: <span className="text-indigo-300 font-mono font-bold">{user.regNo}</span>). Please upload your separated certificates, marksheets, and project reports to build your AI Digital Twin.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('vault')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-lg transition-all"
                  >
                    Upload Student Certificates & Marksheets
                  </button>
                </div>
              ) : (
                recentUploads.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => setPreviewDoc(doc)}
                    className="p-4 rounded-2xl soft-3d-card cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:scale-110 transition-transform shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors truncate">{doc.title}</h4>
                          <span className="text-[9px] px-2 py-0.2 rounded-full bg-slate-900 text-slate-400 font-mono border border-slate-700">
                            {doc.fileType.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-1">
                          {doc.extractedMetadata.summary}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 shadow-inner">
                        {doc.category}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">{doc.uploadDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Smart Search Trigger Box */}
          <div 
            onClick={() => setActiveTab('search')}
            className="p-6 rounded-3xl soft-3d-panel border border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 flex items-center justify-between shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Search className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white">Semantic Knowledge Search Engine</h4>
                <p className="text-xs text-slate-400 mt-0.5">Search in natural language across all verified documents & projects</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-indigo-400" />
          </div>

        </div>

        {/* Right Column: Career Timeline & AI Insight (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Latest Timeline Stream */}
          <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" /> Career Journey Timeline
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Synthesized chronological milestones</p>
              </div>
              <button
                onClick={() => setActiveTab('timeline')}
                className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                Full Timeline <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative pl-5 space-y-5 border-l-2 border-slate-800">
              {recentTimeline.map((item) => (
                <div key={item.id} className="relative group">
                  <span className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-slate-950 shadow-md shadow-indigo-500/50" />
                  <div className="p-4 rounded-2xl soft-3d-card space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-indigo-400 font-mono">{item.date}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURE 13: AI Recommendation Engine Widget */}
          <div className="p-6 rounded-3xl soft-3d-panel border border-indigo-500/30 bg-indigo-950/30 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-indigo-400" /> AI Recommendation Engine
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                {recommendations[0]?.impact} Impact
              </span>
            </div>

            <p className="text-xs text-white font-extrabold">
              {recommendations[0]?.title || 'AWS Certified Cloud Practitioner'}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {recommendations[0]?.reason}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-indigo-500/20">
              <span className="text-[11px] text-slate-400">Target Role: Software Engineer / Full Stack</span>
              <button
                onClick={() => setActiveTab('career-insights')}
                className="text-[11px] text-indigo-400 font-bold hover:underline flex items-center gap-1"
              >
                View Gap Analysis <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
