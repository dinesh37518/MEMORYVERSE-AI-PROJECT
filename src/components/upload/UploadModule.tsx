import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCategory, DocumentItem } from '../../types';
import { downloadDocumentFile } from '../../utils/downloadHelper';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  Download, 
  Eye, 
  Layers
} from 'lucide-react';

export const UploadModule: React.FC = () => {
  const { user, uploadDocument, documents, deleteDocument, setPreviewDoc } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'Auto'>('Auto');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentProcessingStep, setCurrentProcessingStep] = useState('');
  const [lastUploadedDoc, setLastUploadedDoc] = useState<DocumentItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: (DocumentCategory | 'Auto')[] = [
    'Auto', 'Certifications', 'Resume', 'Internships', 'Projects', 
    'Research', 'Academics', 'Achievements', 'Portfolio', 'Employment', 'Other'
  ];

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadProgress(15);
    setCurrentProcessingStep('Step 1: Reading binary file data & SHA-256 hash check...');

    setTimeout(async () => {
      setUploadProgress(50);
      setCurrentProcessingStep('Step 2: Simulated AI OCR & NLP Text Extraction...');

      setTimeout(async () => {
        setUploadProgress(85);
        setCurrentProcessingStep('Step 3: Extracting skills & updating 3D Knowledge Graph...');

        setTimeout(async () => {
          const catOverride = selectedCategory === 'Auto' ? undefined : selectedCategory;
          const fileToUpload = files[0];
          const newDoc = await uploadDocument(fileToUpload, catOverride);
          
          setUploadProgress(100);
          setCurrentProcessingStep('Step 4: Indexed into MemoryVerse AI Store!');
          setLastUploadedDoc(newDoc);
          
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 1200);

        }, 800);
      }, 700);
    }, 600);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Upload className="w-6 h-6 text-indigo-400" /> AI Document Upload & Processing Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload PDF, DOCX, PNG, JPG, ZIP files. MemoryVerse AI extracts skills & links achievements into your digital journey.
          </p>
        </div>

        {/* Category Pre-selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl soft-3d-panel">
          <span className="text-xs text-slate-400 font-bold pl-2">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-slate-900 text-xs text-indigo-300 font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'Auto' ? '✨ Auto AI Detect' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3D Modern Drag & Drop Target */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center border-2 border-dashed transition-all cursor-pointer ${
          isDragging 
            ? 'border-indigo-400 bg-indigo-950/50 shadow-2xl scale-[1.01]' 
            : 'border-white/15 hover:border-indigo-500/50 soft-3d-panel hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.zip,.txt,.ppt,.pptx"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files);
              e.target.value = '';
            }
          }}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40 shadow-2xl shadow-indigo-500/20 group">
            <Upload className="w-10 h-10 text-indigo-300 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">
              Drag & Drop files here or <span className="soft-gradient-text underline">Browse Vault Files</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports <span className="text-slate-200 font-mono">PDF, DOCX, PNG, JPG, ZIP</span> up to 50MB per file
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {['Certificates', 'Resumes', 'Internship Letters', 'Project Reports', 'Transcripts', 'Hackathon Awards'].map((b, i) => (
              <span key={i} className="text-[10px] px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-white/10 font-semibold shadow-inner">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar Overlay */}
      {isUploading && (
        <div className="p-6 rounded-3xl soft-3d-panel border border-indigo-500/40 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" /> {currentProcessingStep}
            </span>
            <span className="font-mono font-bold text-indigo-400">{uploadProgress}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Banner */}
      {lastUploadedDoc && !isUploading && (
        <div className="p-4 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-200">
                "{lastUploadedDoc.title}" successfully processed & added to 3D Knowledge Graph!
              </p>
              <p className="text-[11px] text-emerald-400/80">
                Extracted skills: {lastUploadedDoc.extractedMetadata.skills.join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPreviewDoc(lastUploadedDoc)}
            className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 shadow-lg"
          >
            View Extracted Data
          </button>
        </div>
      )}

      {/* Preserved File Vault Table */}
      <div className="soft-3d-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Preserved Original File Vault ({documents.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Original binary files preserved with separate AI extracted metadata</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold">
                <th className="py-3 px-3">Document Title</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Format & Size</th>
                <th className="py-3 px-3">Upload Date</th>
                <th className="py-3 px-3">Skills Parsed</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-900/40 transition-colors group">
                  
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-indigo-300 transition-colors">{doc.title}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{doc.fileName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-[10px] px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 shadow-inner">
                      {doc.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400">
                    {doc.fileType.toUpperCase()} • {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                  </td>

                  <td className="py-3.5 px-3 text-slate-400">{doc.uploadDate}</td>

                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {doc.extractedMetadata.skills.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-2 rounded-xl soft-3d-button-secondary text-indigo-400"
                        title="Preview & Metadata"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => downloadDocumentFile(doc, user?.name)}
                        className="p-2 rounded-xl soft-3d-button-secondary text-slate-300"
                        title="Download File"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
