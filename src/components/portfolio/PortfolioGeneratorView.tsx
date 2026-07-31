import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generatePortfolioContent } from '../../services/portfolioGeneratorService';
import { 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Globe, 
  User, 
  Briefcase, 
  Award,
  BookOpen
} from 'lucide-react';

export const PortfolioGeneratorView: React.FC = () => {
  const { user, projects, certifications, internships } = useApp();
  const portfolio = generatePortfolioContent(user, projects, certifications, internships);

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" /> AI Portfolio Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-generate professional bios, LinkedIn About sections, project writeups, and executive summaries directly from your uploaded document vault.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-1.5 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 1-Click Copy Enabled
        </span>
      </div>

      {/* Grid of Portfolio Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Professional Bio */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" /> Professional Bio
            </h3>
            <button
              onClick={() => handleCopy(portfolio.professionalBio, 'bio')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-bold border border-indigo-500/40 flex items-center gap-1.5 transition-all"
            >
              {copiedSection === 'bio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'bio' ? 'Copied Bio!' : 'Copy Bio'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-white/5 font-medium">
            {portfolio.professionalBio}
          </p>
        </div>

        {/* LinkedIn About Section */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" /> LinkedIn About Section
            </h3>
            <button
              onClick={() => handleCopy(portfolio.linkedinAbout, 'linkedin')}
              className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-bold border border-blue-500/40 flex items-center gap-1.5 transition-all"
            >
              {copiedSection === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'linkedin' ? 'Copied LinkedIn!' : 'Copy LinkedIn'}</span>
            </button>
          </div>
          <pre className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-white/5 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
            {portfolio.linkedinAbout}
          </pre>
        </div>

        {/* Resume Summary */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> Resume Executive Summary
            </h3>
            <button
              onClick={() => handleCopy(portfolio.resumeSummary, 'resume')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 transition-all"
            >
              {copiedSection === 'resume' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'resume' ? 'Copied Summary!' : 'Copy Summary'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-white/5 font-medium">
            {portfolio.resumeSummary}
          </p>
        </div>

        {/* Career Objective */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Career Objective
            </h3>
            <button
              onClick={() => handleCopy(portfolio.careerObjective, 'objective')}
              className="px-3 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1.5 transition-all"
            >
              {copiedSection === 'objective' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'objective' ? 'Copied Objective!' : 'Copy Objective'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-white/5 font-medium">
            {portfolio.careerObjective}
          </p>
        </div>

      </div>

      {/* Engineering Project Summaries */}
      <div className="soft-3d-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" /> Auto-Generated Project Summaries
          </h3>
        </div>

        <div className="space-y-3">
          {portfolio.projectSummaries.map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{p.name}</h4>
                <button
                  onClick={() => handleCopy(p.description, `proj_${idx}`)}
                  className="px-2.5 py-1 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-[11px] font-bold border border-purple-500/40 flex items-center gap-1"
                >
                  {copiedSection === `proj_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === `proj_${idx}` ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
