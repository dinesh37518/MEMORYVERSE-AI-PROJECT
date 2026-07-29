import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, PieChart, TrendingUp, Cpu, Award, Building2, Briefcase, FileText } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { documents, skills, projects, internships, certifications, timeline } = useApp();

  // Category counts
  const categoryCounts: Record<string, number> = {};
  documents.forEach(d => {
    categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
  });

  // Skills level distribution
  const levelCounts: Record<string, number> = { Expert: 0, Advanced: 0, Intermediate: 0, Beginner: 0 };
  skills.forEach(s => {
    if (levelCounts[s.level] !== undefined) levelCounts[s.level]++;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-400" /> Digital Identity Analytics & Growth Metrics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Data insights, document volume distribution, skill mastery velocity, and career journey trajectory
          </p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Vault Volume</span>
          <p className="text-3xl font-black text-white mt-1">{documents.length}</p>
          <p className="text-[10px] text-emerald-400 mt-1">100% Parsed via OCR</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Index Score</span>
          <p className="text-3xl font-black text-amber-300 mt-1">
            {Math.round(skills.reduce((acc, s) => acc + s.score, 0) / (skills.length || 1))} / 100
          </p>
          <p className="text-[10px] text-slate-400 mt-1">{skills.length} Extracted Skills</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Career Milestone Velocity</span>
          <p className="text-3xl font-black text-purple-300 mt-1">{timeline.length}</p>
          <p className="text-[10px] text-purple-400 mt-1">Verified Timeline Events</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Credentials</span>
          <p className="text-3xl font-black text-emerald-300 mt-1">{certifications.length + internships.length}</p>
          <p className="text-[10px] text-emerald-400 mt-1">Proof Certificates Attached</p>
        </div>
      </div>

      {/* Charts Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Document Category Distribution Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-400" /> Vault Document Category Distribution
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / documents.length) * 100);

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">{cat}</span>
                    <span className="text-indigo-400 font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill Mastery Level Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" /> Assessed Skill Level Breakdown
          </h3>

          <div className="space-y-3">
            {Object.entries(levelCounts).map(([lvl, count]) => {
              const pct = Math.round((count / (skills.length || 1)) * 100);

              return (
                <div key={lvl} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">{lvl} Level</span>
                    <span className="text-amber-400 font-mono">{count} Skills ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
