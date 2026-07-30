import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ExternalLink, ShieldCheck, FileText, Calendar, CheckCircle2, Download, Upload, FileCheck } from 'lucide-react';
import { downloadDocumentFile } from '../../utils/downloadHelper';

export const CertificationsView: React.FC = () => {
  const { user, certifications, documents, setPreviewDoc, attachOriginalFileToDocument } = useApp();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileUpload = async (certId: string, docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await attachOriginalFileToDocument(docId, file);
    alert(`Original certificate file "${file.name}" attached successfully!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" /> Verified Certifications & Credentials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Official NPTEL, Infosys Springboard & industry credentials. Click to view or download original certificates, or upload custom PDF files.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map(cert => {
          const doc = (cert.documentId ? documents.find(d => d.id === cert.documentId) : null) || 
                      documents.find(d => d.title.toLowerCase().includes(cert.name.toLowerCase()) || cert.name.toLowerCase().includes(d.title.toLowerCase()));
          const hasOriginalFile = doc && (doc.url.startsWith('blob:') || doc.url.startsWith('data:'));

          return (
            <div 
              key={cert.id} 
              onClick={() => doc && setPreviewDoc(doc)}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {cert.status}
                  </span>

                  {hasOriginalFile ? (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-indigo-400" /> Original File Attached
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">{cert.date}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  {cert.name}
                </h3>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">{cert.issuingOrganization}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 font-mono">
                <p className="text-slate-400">Credential ID: <span className="text-indigo-300 font-bold">{cert.credentialId}</span></p>
                {doc && <p className="text-slate-400 text-[11px]">File: <span className="text-slate-200">{doc.fileName}</span></p>}
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

              {/* Actions & File Attachment */}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {doc && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="text-xs text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <FileText className="w-4 h-4" /> View & Inspect Certificate
                      </button>

                      <button
                        onClick={() => downloadDocumentFile(doc, user?.name)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20"
                        title="Download Certificate File"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  )}

                  {cert.verificationLink && (
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-purple-200 border border-purple-500/40 text-xs font-bold flex items-center gap-1 transition-all ml-auto"
                    >
                      <span>Verify</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Upload Original File Helper */}
                {doc && (
                  <div className="pt-1">
                    <input
                      type="file"
                      ref={el => { fileInputRefs.current[cert.id] = el; }}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileUpload(cert.id, doc.id, e)}
                    />
                    <button
                      onClick={() => fileInputRefs.current[cert.id]?.click()}
                      className="w-full text-[11px] py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold flex items-center justify-center gap-1.5 border border-slate-700/80 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{hasOriginalFile ? 'Replace Attached File (PDF/Image)' : 'Upload Original Certificate File (PDF/Image)'}</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
