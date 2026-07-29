import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Award, 
  Building2, 
  Briefcase, 
  Trophy, 
  FileText, 
  Calendar, 
  Sparkles, 
  ExternalLink
} from 'lucide-react';

export const TimelineView: React.FC = () => {
  const { timeline, documents, setPreviewDoc } = useApp();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const years = ['All', '2026', '2025', '2024', '2023'];
  const types = ['All', 'cert', 'internship', 'project', 'achievement', 'academic'];

  const filteredTimeline = timeline.filter(item => {
    const matchYear = selectedYear === 'All' || item.year.toString() === selectedYear;
    const matchType = selectedType === 'All' || item.type === selectedType;
    return matchYear && matchType;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'cert': return <Award className="w-5 h-5 text-emerald-400" />;
      case 'internship': return <Building2 className="w-5 h-5 text-cyan-400" />;
      case 'project': return <Briefcase className="w-5 h-5 text-purple-400" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-pink-400" />;
      default: return <FileText className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400" /> Digital Career Journey Timeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Chronological academic and professional milestones synthesized from verified document uploads
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl soft-3d-panel">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 font-bold pl-2">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-900 text-xs text-purple-300 font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 font-bold pl-2">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-900 text-xs text-indigo-300 font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none capitalize"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main 3D Timeline Stream */}
      <div className="soft-3d-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative">
        
        {/* Glowing Vertical Guide Line */}
        <div className="absolute left-9 sm:left-14 top-12 bottom-12 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-indigo-500/50" />

        <div className="space-y-8 relative">
          {filteredTimeline.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-bold text-slate-300">No milestone events match your criteria</p>
            </div>
          ) : (
            filteredTimeline.map((event) => {
              const doc = event.documentId ? documents.find(d => d.id === event.documentId) : null;

              return (
                <div key={event.id} className="flex items-start gap-5 sm:gap-7 group">
                  
                  {/* 3D Node Icon Badge */}
                  <div className="relative z-10 p-3 rounded-2xl bg-slate-950 border-2 border-indigo-400 shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform duration-300 shrink-0">
                    {getEventIcon(event.type)}
                  </div>

                  {/* 3D Soft Event Bubble Card */}
                  <div className="flex-1 soft-3d-card p-6 rounded-3xl space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-300 font-mono bg-indigo-950/80 px-3 py-1 rounded-xl border border-indigo-500/40 shadow-inner">
                          {event.date}
                        </span>
                        <span className="text-[10px] px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                          {event.category}
                        </span>
                      </div>

                      <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Impact Score: {event.impactScore}/100
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Proof Attachment Chip */}
                    {doc && (
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          <span className="truncate max-w-xs font-medium">{doc.fileName}</span>
                        </div>
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                        >
                          <span>Inspect Proof</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
