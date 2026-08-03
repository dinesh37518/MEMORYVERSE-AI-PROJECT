import React from 'react';
import { useApp } from '../../context/AppContext';
import { generateAIDigitalTwin } from '../../services/aiTwinService';
import { 
  Bot, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Target,
  RefreshCw
} from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { user, documents, skills, projects, certifications, internships, achievements } = useApp();

  const digitalTwin = generateAIDigitalTwin(
    user,
    documents,
    skills,
    projects,
    certifications,
    internships,
    achievements
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl soft-3d-panel border border-white/15 p-6 sm:p-8 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl shadow-indigo-500/30 border border-white/20">
              <Bot className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  AI Digital Twin Profile
                </h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1 shadow-inner">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Living Profile Sync
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Autonomous AI representation synthesizing your complete academic, engineering, and career credentials from {documents.length} verified vault records.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-xs text-indigo-200 shrink-0 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" /> Auto-Regenerated
            </p>
            <p className="text-[10px] text-slate-400 font-mono">Last Sync: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Professional & Academic Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Professional Summary */}
        <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-3">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" /> AI Professional Summary
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-white/5 font-medium">
            {digitalTwin.professionalSummary}
          </p>
        </div>

        {/* Academic Summary */}
        <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-3">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" /> Academic Identity & Record
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-white/5 font-medium">
            {digitalTwin.academicSummary}
          </p>
        </div>

      </div>

      {/* Skills Matrix & Strongest Domains */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technical Skills */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" /> Verified Technical Skills ({digitalTwin.technicalSkills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {digitalTwin.technicalSkills.map((sk, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-bold shadow-inner">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Soft Skills & Leadership
          </h3>
          <div className="flex flex-wrap gap-2">
            {digitalTwin.softSkills.map((sk, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 font-bold shadow-inner">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Strongest Domains */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" /> Strongest Expertise Domains
          </h3>
          <div className="space-y-2">
            {digitalTwin.strongestDomains.map((dom, i) => (
              <div key={i} className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs font-bold text-purple-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{dom}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Strength & Growth Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strength Analysis */}
        <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Strength Analysis
          </h3>
          <div className="space-y-2.5">
            {digitalTwin.strengthAnalysis.map((st, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth & Upskilling Analysis */}
        <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" /> Growth & Upskilling Roadmap
          </h3>
          <div className="space-y-2.5">
            {digitalTwin.growthAnalysis.map((gr, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{gr}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Experience & Career Interests Summary */}
      <div className="soft-3d-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-400" /> Experience & Target Career Interests
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {digitalTwin.experienceSummary}
        </p>

        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-bold mr-2">Target Roles:</span>
          {digitalTwin.careerInterests.map((interest, i) => (
            <span key={i} className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-900 text-indigo-300 font-extrabold border border-indigo-500/30 shadow-inner">
              🎯 {interest}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
