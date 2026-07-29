import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Code2, 
  ExternalLink, 
  Users, 
  FileText
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, documents, setPreviewDoc } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" /> Academic & Software Engineering Projects
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified project portfolio connected to research papers, skills, and hackathon certificates
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
                </div>
              )}

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div>
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
                </div>

                {/* Technologies Stack */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-600/20 text-purple-300 border border-purple-500/30">
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

                {/* Action Links */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <Code2 className="w-4 h-4 text-purple-400" /> Code Repository
                      </a>
                    )}
                  </div>

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl gradient-button text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
