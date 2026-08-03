import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Sparkles, FileText, Calendar } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, documents, setPreviewDoc } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-pink-400" /> Hackathons, Awards & Leadership Roles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Competitive trophies, college honors, leadership positions, and hackathon wins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map(item => {
          const doc = item.documentId ? documents.find(d => d.id === item.documentId) : null;

          return (
            <div key={item.id} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-pink-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">{item.issuerOrEvent}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                {item.description}
              </p>

              {item.impactScore && (
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Impact Rating: {item.impactScore}/100
                </div>
              )}

              {doc && (
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 truncate max-w-xs">{doc.fileName}</span>
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Inspect Award Proof
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
