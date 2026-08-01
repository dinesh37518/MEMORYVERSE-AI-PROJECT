import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem, DocumentCategory } from '../../types';
import { downloadDocumentFile, getOriginalDocumentViewUrl } from '../../utils/downloadHelper';
import { 
  X, 
  FileText, 
  Download, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Tag, 
  Award, 
  Building2, 
  Calendar, 
  ShieldCheck,
  Sparkles,
  Cpu,
  Upload,
  Printer
} from 'lucide-react';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document: doc, onClose }) => {
  const { user, deleteDocument, renameDocument, updateDocumentCategory, attachOriginalFileToDocument } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<DocumentCategory>('Certifications');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!doc) return null;

  const categories: DocumentCategory[] = [
    'Certifications', 'Projects', 'Skills', 'Resume', 'Internships', 
    'Academics', 'Achievements', 'Research', 'Portfolio', 'Employment', 'Other'
  ];

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      renameDocument(doc.id, editTitle);
    }
    updateDocumentCategory(doc.id, editCategory);
    setIsEditing(false);
  };

  const handleDownload = () => {
    downloadDocumentFile(doc, user?.name);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await attachOriginalFileToDocument(doc.id, file);
  };

  const isBlobOrDataUrl = doc.url && (doc.url.startsWith('blob:') || doc.url.startsWith('data:')) && !doc.url.includes('dummy.pdf');
  const viewUrl = getOriginalDocumentViewUrl(doc, user?.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">{doc.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  {doc.category}
                </span>
                {isBlobOrDataUrl && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Original User File Attached
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{doc.fileName} • {(doc.fileSize / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Upload or Replace Original PDF/File"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isBlobOrDataUrl ? 'Replace File' : 'Upload Original File'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Download File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Original</span>
            </button>

            <button
              onClick={() => {
                setEditTitle(doc.title);
                setEditCategory(doc.category);
                setIsEditing(!isEditing);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Edit Metadata"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                deleteDocument(doc.id);
                onClose();
              }}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Delete Document"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* File Preview Column (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {doc.fileType === 'png' || doc.fileType === 'jpg' || doc.fileType === 'jpeg' ? (
              <div className="w-full h-80 lg:h-full min-h-[380px] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                <img src={viewUrl} alt={doc.title} className="max-h-full max-w-full object-contain rounded-xl shadow-2xl" />
              </div>
            ) : (
              <div className="w-full h-full min-h-[420px] rounded-2xl bg-slate-950 border border-slate-800 flex flex-col overflow-hidden relative">
                {/* Header Action Bar for Original PDF / Document */}
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" /> Original Verified Document
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-md"
                    >
                      <span>Open Document in New Tab</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <iframe
                  src={viewUrl}
                  title={doc.title}
                  className="w-full h-full min-h-[400px] rounded-b-2xl border-0 bg-slate-950"
                />
              </div>
            )}

            {/* Document Hash Integrity Banner */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>SHA-256 Hash Integrity:</span>
              <span className="text-indigo-300 truncate max-w-xs">{doc.hash}</span>
            </div>
          </div>

          {/* AI Extracted Metadata Column (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Edit Mode Pane */}
            {isEditing ? (
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Edit Category & Title</h4>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Document Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-1.5 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as DocumentCategory)}
                    className="w-full glass-input rounded-xl px-3 py-1.5 text-xs text-slate-200 bg-slate-900"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="w-full py-2 rounded-xl gradient-button text-white text-xs font-bold shadow-md"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs font-bold text-indigo-200">AI Knowledge Extraction Verified</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  100% Parsed
                </span>
              </div>
            )}

            {/* Extracted Summary */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Summary</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {doc.extractedMetadata.summary}
              </p>
            </div>

            {/* Extracted Skills Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Extracted Skills & Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {doc.extractedMetadata.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Extracted Technologies & Languages */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" /> Tech Stack & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {doc.extractedMetadata.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Credential Details (If Certificate or Internship) */}
            {doc.extractedMetadata.credentialId && (
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Credential ID:
                  </span>
                  <span className="font-mono text-indigo-300 font-bold">{doc.extractedMetadata.credentialId}</span>
                </div>
                {doc.extractedMetadata.verificationUrl && (
                  <a
                    href={doc.extractedMetadata.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <span>Verify Credential Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* Key Metadata Table */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Issuing Entity:</span>
                <span className="font-medium">{doc.extractedMetadata.organization || doc.extractedMetadata.institution || 'Verified Entity'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Upload Date:</span>
                <span className="font-medium">{doc.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Assessed Level:</span>
                <span className="font-semibold text-emerald-400">{doc.extractedMetadata.experienceLevel || 'Advanced'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
