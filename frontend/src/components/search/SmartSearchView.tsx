import React from 'react';
import { useApp } from '../../context/AppContext';
import { performSemanticSearch } from '../../services/semanticSearchService';
import { 
  Search, 
  FileText, 
  Cpu, 
  Briefcase, 
  Award, 
  Building2, 
  Trophy, 
  Sparkles, 
  ExternalLink,
  Bot
} from 'lucide-react';

export const SmartSearchView: React.FC = () => {
  const { 
    globalSearchQuery, 
    setGlobalSearchQuery, 
    documents, 
    skills, 
    projects, 
    certifications, 
    internships, 
    achievements, 
    setPreviewDoc 
  } = useApp();

  const searchResults = performSemanticSearch(
    globalSearchQuery || 'python projects certificates',
    documents,
    skills,
    projects,
    certifications,
    internships,
    achievements
  );

  const sampleQueries = [
    'Show all my certificates.',
    'Show projects using Python.',
    'Show AI projects.',
    'Show my latest resume.',
    'Show internship documents.',
    'Generate portfolio summary.',
    'Summarize my achievements.'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Search Header Bar */}
      <div className="soft-3d-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-400" /> Semantic AI Natural Language Search Engine
          </h1>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
            Semantic Vector Matching
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Ask naturally (e.g. 'Show projects using Python', 'Show AI certificates', 'Summarize achievements')..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full soft-3d-input rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 font-medium"
          />
        </div>

        {/* Quick Query Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-400 font-bold mr-1">Quick Prompts:</span>
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              onClick={() => setGlobalSearchQuery(sq)}
              className="text-[10px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-white/10 font-semibold shadow-inner transition-all hover:scale-105"
            >
              ✨ {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Semantic Intent Banner */}
      <div className="p-4 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-center justify-between gap-4 animate-in fade-in">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <p className="font-bold text-white">Semantic AI Intent Classification: {searchResults.matchedCategory}</p>
            <p className="text-[11px] text-indigo-300">{searchResults.summaryText}</p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        
        {/* Matched Documents */}
        {searchResults.matchingDocuments.length > 0 && (
          <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-indigo-400" /> Matched Vault Documents ({searchResults.matchingDocuments.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matchingDocuments.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setPreviewDoc(doc)}
                  className="p-4 rounded-2xl soft-3d-card cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">{doc.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{doc.extractedMetadata.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Projects */}
        {searchResults.matchingProjects.length > 0 && (
          <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-purple-300 flex items-center gap-2 uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-purple-400" /> Matched Engineering Projects ({searchResults.matchingProjects.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matchingProjects.map(p => (
                <div key={p.id} className="p-4 rounded-2xl soft-3d-card space-y-2">
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.technologies.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-purple-950 text-purple-200 border border-purple-500/30 font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Certifications */}
        {searchResults.matchingCertifications.length > 0 && (
          <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-2 uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" /> Matched Certifications ({searchResults.matchingCertifications.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matchingCertifications.map(c => (
                <div key={c.id} className="p-4 rounded-2xl soft-3d-card space-y-1.5">
                  <h4 className="text-xs font-bold text-white">{c.name}</h4>
                  <p className="text-[11px] text-emerald-300 font-semibold">{c.issuingOrganization} • {c.date}</p>
                  <p className="text-[10px] text-slate-400 font-mono">ID: {c.credentialId}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Skills */}
        {searchResults.matchingSkills.length > 0 && (
          <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-amber-300 flex items-center gap-2 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-amber-400" /> Matched Verified Skills ({searchResults.matchingSkills.length})
            </h3>

            <div className="flex flex-wrap gap-2">
              {searchResults.matchingSkills.map(sk => (
                <div key={sk.id} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-bold text-amber-200 shadow-inner">
                  {sk.name} ({sk.level} • {sk.score}/100)
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
