import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, FileText, Cpu, Briefcase, Award, Building2, ExternalLink } from 'lucide-react';

export const SmartSearchView: React.FC = () => {
  const { globalSearchQuery, setGlobalSearchQuery, documents, skills, projects, certifications, internships, setPreviewDoc } = useApp();

  const query = globalSearchQuery.toLowerCase().trim();

  // Matched Documents
  const matchedDocs = documents.filter(d => 
    d.title.toLowerCase().includes(query) || 
    d.category.toLowerCase().includes(query) ||
    d.extractedMetadata.summary.toLowerCase().includes(query) ||
    d.extractedMetadata.skills.some(s => s.toLowerCase().includes(query))
  );

  // Matched Skills
  const matchedSkills = skills.filter(s => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));

  // Matched Projects
  const matchedProjects = projects.filter(p => p.name.toLowerCase().includes(query) || p.technologies.some(t => t.toLowerCase().includes(query)));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Search Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-400" /> Smart Natural Language Search Engine
        </h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Type anything (e.g. 'AWS cert', 'Python projects', 'Meta internship')..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full glass-input rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-100 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Results summary */}
      <div className="space-y-6">
        
        {/* Documents match */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-indigo-400" /> Matched Vault Documents ({matchedDocs.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => setPreviewDoc(doc)}
                className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-100">{doc.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                    {doc.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{doc.extractedMetadata.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills match */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-amber-400" /> Matched Verified Skills ({matchedSkills.length})
          </h3>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.map(sk => (
              <div key={sk.id} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-semibold text-amber-200">
                {sk.name} ({sk.level} • {sk.score}/100)
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
