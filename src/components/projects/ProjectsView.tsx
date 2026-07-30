import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectItem } from '../../types';
import { 
  Briefcase, 
  Code2, 
  ExternalLink, 
  Users, 
  FileText,
  Sparkles,
  CheckCircle2,
  BookOpen,
  X,
  Layers
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, documents, setPreviewDoc } = useApp();
  const [selectedReadmeProject, setSelectedReadmeProject] = useState<ProjectItem | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" /> Academic & Software Engineering Projects
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified engineering projects connected to GitHub repositories (PROJECT-1 & PROJECT-2), README documentations, and extracted skills
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(project => {
          const reportDoc = project.reportDocId ? documents.find(d => d.id === project.reportDocId) : null;

          return (
            <div key={project.id} className="glass-panel rounded-3xl border border-slate-800 hover:border-purple-500/40 transition-all overflow-hidden flex flex-col justify-between group">
              
              {/* Project Screenshot / Header Image */}
              {project.screenshotUrls && project.screenshotUrls.length > 0 && (
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img 
                    src={project.screenshotUrls[0]} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-purple-950/80 backdrop-blur-md text-purple-300 font-semibold border border-purple-500/40">
                    {project.category}
                  </span>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-slate-900/90 text-white font-bold border border-slate-700 flex items-center gap-1.5 hover:bg-purple-600 transition-colors"
                    >
                      <Code2 className="w-3 h-3 text-purple-400" /> GitHub Repository
                    </a>
                  )}
                </div>
              )}

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" /> Team of {project.teamSize}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Extracted Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Key Project Features & Capabilities:
                      </span>
                      <ul className="space-y-1.5">
                        {project.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-slate-200 flex items-start gap-1.5 leading-snug">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Technologies Stack */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-purple-400" /> Tech Stack & Tools:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Report Attachment Link */}
                {reportDoc && (
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span className="truncate max-w-xs">{reportDoc.title}</span>
                    </div>
                    <button
                      onClick={() => setPreviewDoc(reportDoc)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      Read Report
                    </button>
                  </div>
                )}

                {/* Action Links & Readme Viewer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {project.readmeContent && (
                      <button
                        onClick={() => setSelectedReadmeProject(project)}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>View README & Features</span>
                      </button>
                    )}
                  </div>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl gradient-button text-white text-xs font-bold flex items-center gap-1.5 shadow-md ml-auto"
                    >
                      <span>GitHub Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Project README Modal */}
      {selectedReadmeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] glass-panel rounded-3xl border border-purple-500/40 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedReadmeProject.name} — README Documentation</h3>
                  <p className="text-xs text-slate-400 font-mono">Extracted from repository {selectedReadmeProject.githubLink}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReadmeProject(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Readme Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs leading-relaxed text-slate-200 font-sans">
              <div className="whitespace-pre-wrap bg-slate-900/90 p-5 rounded-2xl border border-slate-800 font-mono text-[11px] leading-relaxed">
                {selectedReadmeProject.readmeContent}
              </div>

              {/* Direct GitHub Link */}
              {selectedReadmeProject.githubLink && (
                <div className="pt-3 flex justify-end">
                  <a
                    href={selectedReadmeProject.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <span>Open Live Repository on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
