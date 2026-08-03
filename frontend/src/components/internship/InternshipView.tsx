import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Calendar, MapPin, CheckCircle2, FileText, Cpu, ExternalLink } from 'lucide-react';

export const InternshipView: React.FC = () => {
  const { internships, documents, setPreviewDoc } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" /> Professional Internships & Work Experience
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified corporate internships backed by completion letters, offer contracts, and technical summaries
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {internships.map(item => {
          const letterDoc = item.certificateDocId ? documents.find(d => d.id === item.certificateDocId) : null;

          return (
            <div key={item.id} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-100">{item.company}</h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5">{item.position}</p>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-400 space-y-0.5">
                  <p className="flex items-center sm:justify-end gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {item.duration}
                  </p>
                  <p className="flex items-center sm:justify-end gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {item.experienceSummary}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Competencies & Skills Mastered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.skillsLearned.map((sk, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {letterDoc && (
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Verified Completion Letter: <strong className="text-slate-200">{letterDoc.fileName}</strong></span>
                  </div>
                  <button
                    onClick={() => setPreviewDoc(letterDoc)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 flex items-center gap-1 transition-all"
                  >
                    <span>Inspect Letter</span> <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
