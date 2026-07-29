import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ExternalLink, ShieldCheck, FileText, Calendar, CheckCircle2, Download } from 'lucide-react';
import { downloadDocumentFile } from '../../utils/downloadHelper';

export const CertificationsView: React.FC = () => {
  const { user, certifications, documents, setPreviewDoc } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" /> Verified Certifications & Credentials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Industry & cloud certifications automatically validated through credential IDs and PDF document extraction
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map(cert => {
          const doc = cert.documentId ? documents.find(d => d.id === cert.documentId) : null;

          return (
            <div key={cert.id} className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {cert.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{cert.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100">{cert.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">{cert.issuingOrganization}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 font-mono">
                <p className="text-slate-400">Credential ID: <span className="text-indigo-300 font-bold">{cert.credentialId}</span></p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Skills Gained:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsGained.map((sk, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                {doc && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" /> View Certificate
                    </button>

                    <button
                      onClick={() => downloadDocumentFile(doc, user?.name)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      title="Download Official Certificate File"
                    >
                      <Download className="w-3.5 h-3.5" /> Download File
                    </button>
                  </div>
                )}

                {cert.verificationLink && (
                  <a
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all ml-auto"
                  >
                    <span>Verify</span> <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
