import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillItem, SkillCategory } from '../../types';
import { 
  Cpu, 
  CheckCircle2, 
  FileText, 
  Briefcase, 
  Award, 
  Building2, 
  Filter, 
  Search, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const SkillsView: React.FC = () => {
  const { skills, documents, projects, certifications, internships, setPreviewDoc } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(skills[0] || null);

  const categories = ['All', 'Technical', 'Programming Languages', 'Frameworks', 'Tools', 'Soft Skills', 'Domain Skills'];

  const filteredSkills = skills.filter(sk => {
    const matchCat = selectedCategory === 'All' || sk.category === selectedCategory;
    const matchQuery = sk.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-amber-400" /> Extracted Skills & Competencies Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized skill graph verified across original certificates, project code repositories & internship completion letters
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 text-xs text-amber-300 font-semibold px-3 py-1.5 rounded-xl border border-slate-800 focus:outline-none"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Main Grid: Skills Cards (8 Cols) & Deep Dive Pane (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Skills Cards Grid (8 Cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSkills.map(sk => {
            const isSelected = selectedSkill?.id === sk.id;

            return (
              <div
                key={sk.id}
                onClick={() => setSelectedSkill(sk)}
                className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected 
                    ? 'border-amber-500 bg-amber-950/20 shadow-xl shadow-amber-500/10' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                      {sk.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1">{sk.name}</h3>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    {sk.level}
                  </span>
                </div>

                {/* Score Bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Competency Score:</span>
                    <span className="font-mono font-bold text-amber-300">{sk.score}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${sk.score}%` }}
                    />
                  </div>
                </div>

                {/* Proof Count Summary */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {sk.verifiedCount} Verified Proofs
                  </span>
                  <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                    Inspect <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Deep Dive Sidebar (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          {selectedSkill ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  {selectedSkill.category}
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">{selectedSkill.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Assessed Proficiency Level: <span className="text-emerald-400 font-semibold">{selectedSkill.level}</span></p>
              </div>

              {/* Source Documents Link */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" /> Source Verification Documents ({selectedSkill.sourceDocumentIds.length})
                </h4>
                <div className="space-y-2">
                  {selectedSkill.sourceDocumentIds.map(docId => {
                    const doc = documents.find(d => d.id === docId);
                    if (!doc) return null;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setPreviewDoc(doc)}
                        className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-200 truncate">{doc.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Related Projects */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" /> Related Projects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {projects.filter(p => p.skillsUsed.includes(selectedSkill.name) || p.connectedSkillIds.includes(selectedSkill.id)).map(p => (
                    <span key={p.id} className="text-xs px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Internships */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Related Internships
                </h4>
                <div className="space-y-1.5">
                  {internships.map(i => (
                    <div key={i.id} className="text-xs p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <p className="font-semibold text-slate-200">{i.company}</p>
                      <p className="text-[10px] text-slate-400">{i.position}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Cpu className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p className="text-xs font-bold text-slate-300">Select a skill to inspect proof links</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
