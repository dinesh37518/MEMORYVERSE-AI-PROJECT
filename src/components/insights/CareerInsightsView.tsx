import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CareerTargetRole } from '../../types';
import { analyzeCareerGap } from '../../services/gapAnalyzerService';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  Gauge
} from 'lucide-react';

export const CareerInsightsView: React.FC = () => {
  const { skills, certifications, projects, internships } = useApp();
  const [selectedRole, setSelectedRole] = useState<CareerTargetRole>('Full Stack Developer');

  const roles: CareerTargetRole[] = [
    'AI Engineer',
    'Full Stack Developer',
    'Embedded Engineer',
    'Software Engineer',
    'Data Scientist',
    'Cyber Security Engineer'
  ];

  const analysis = analyzeCareerGap(
    selectedRole,
    skills,
    certifications,
    projects,
    internships
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-400" /> Career Insights & Skill Gap Analyzer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare your verified document vault with target industry roles to discover missing skills, recommended courses, and career readiness scores.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl soft-3d-panel overflow-x-auto scrollbar-none">
          <span className="text-xs text-slate-400 font-bold pl-2 hidden sm:inline">Target Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as CareerTargetRole)}
            className="bg-slate-900 text-xs text-indigo-300 font-bold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
          >
            {roles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Role Selection Buttons */}
      <div className="flex flex-wrap gap-2.5">
        {roles.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedRole === r
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/40'
                : 'soft-3d-button-secondary text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{r}</span>
          </button>
        ))}
      </div>

      {/* Hero Readiness Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Readiness Meter (4 Cols) */}
        <div className="lg:col-span-4 soft-3d-panel p-6 rounded-3xl border border-white/10 text-center space-y-4">
          <h3 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider text-[11px]">
            Career Readiness Score
          </h3>

          <div className="relative inline-flex items-center justify-center w-36 h-36 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="12" className="text-slate-900" fill="transparent" />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="12"
                className="text-indigo-500 transition-all duration-1000"
                fill="transparent"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * analysis.readinessScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{analysis.readinessScore}%</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Verified Match</span>
            </div>
          </div>

          <div>
            <h4 className="text-base font-extrabold text-white">{selectedRole}</h4>
            <p className="text-xs text-slate-400 mt-1">Based on {skills.length} skills & {projects.length} engineering projects</p>
          </div>
        </div>

        {/* Current vs Missing Skills (8 Cols) */}
        <div className="lg:col-span-8 soft-3d-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          
          {/* Matched Skills */}
          <div>
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Matched Competencies ({analysis.currentSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.currentSkills.map((sk, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-bold shadow-inner">
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Missing Skills for {selectedRole} ({analysis.missingSkills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((sk, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-bold shadow-inner">
                  ! {sk}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Recommended Certifications & Recommended Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommended Certifications */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Recommended Certifications
          </h3>
          <div className="space-y-3">
            {analysis.recommendedCertifications.map((cert, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
                <p className="text-xs font-bold text-white">{cert.title}</p>
                <p className="text-[11px] text-indigo-300 font-semibold">{cert.provider}</p>
                <p className="text-[11px] text-slate-300 leading-relaxed">{cert.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Projects */}
        <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" /> Recommended Portfolio Projects
          </h3>
          <div className="space-y-3">
            {analysis.recommendedProjects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                <p className="text-xs font-bold text-white">{proj.title}</p>
                <p className="text-[11px] text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-200 font-mono font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Learning Roadmap */}
      <div className="soft-3d-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" /> Actionable Learning Roadmap for {selectedRole}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {analysis.learningRoadmap.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {step.phase}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">{step.duration}</span>
              </div>
              <h4 className="text-xs font-extrabold text-white">{step.title}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{step.details}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
