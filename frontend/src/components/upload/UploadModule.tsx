import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCategory, DocumentItem } from '../../types';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  Eye, 
  Layers,
  StopCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

export const UploadModule: React.FC = () => {
  const { user, uploadDocument, documents, deleteDocument, setPreviewDoc } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'Auto'>('Auto');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentProcessingStep, setCurrentProcessingStep] = useState('');
  const [lastUploadedDoc, setLastUploadedDoc] = useState<DocumentItem | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTimersRef = useRef<any[]>([]);

  const categories: (DocumentCategory | 'Auto')[] = [
    'Auto', 'Certifications', 'Resume', 'Internships', 'Projects', 
    'Research', 'Academics', 'Achievements', 'Portfolio', 'Employment', 'Other'
  ];

  const clearUploadTimers = () => {
    uploadTimersRef.current.forEach(t => clearTimeout(t));
    uploadTimersRef.current = [];
  };

  const handleStopUploading = () => {
    clearUploadTimers();
    setIsUploading(false);
    setUploadProgress(0);
    setCurrentProcessingStep('');
    setUploadMessage('Upload process stopped by user. File processing aborted.');
  };

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    clearUploadTimers();
    setUploadMessage(null);
    setLastUploadedDoc(null);
    setIsUploading(true);
    setUploadProgress(15);
    setCurrentProcessingStep('Step 1: Reading binary file data & SHA-256 hash check...');

    const timer1 = setTimeout(async () => {
      setUploadProgress(50);
      setCurrentProcessingStep('Step 2: AI OCR & Text Parsing...');

      const timer2 = setTimeout(async () => {
        setUploadProgress(85);
        setCurrentProcessingStep('Step 3: Extracting skills & updating 3D Knowledge Graph...');

        const timer3 = setTimeout(async () => {
          const catOverride = selectedCategory === 'Auto' ? undefined : selectedCategory;
          const fileToUpload = files[0];
          const newDoc = await uploadDocument(fileToUpload, catOverride);
          
          setUploadProgress(100);
          setCurrentProcessingStep('Step 4: Indexed into MemoryVerse AI Store!');
          setLastUploadedDoc(newDoc);
          
          const timer4 = setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
          }, 1200);

          uploadTimersRef.current.push(timer4);
        }, 800);

        uploadTimersRef.current.push(timer3);
      }, 700);

      uploadTimersRef.current.push(timer2);
    }, 600);

    uploadTimersRef.current.push(timer1);
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

      {/* Progress Bar Overlay with Stop Uploading Action */}
      {isUploading && (
        <div className="p-6 rounded-3xl soft-3d-panel border border-indigo-500/40 space-y-4 animate-in fade-in">
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

          {/* STOP UPLOADING BUTTON */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
            <span className="text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              If any error occurs or you wish to cancel, click Stop Uploading below.
            </span>
            <button
              type="button"
              onClick={handleStopUploading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
            >
              <StopCircle className="w-4 h-4 text-white" />
              <span>Stop Uploading</span>
            </button>
          </div>
        </div>
      )}

      {/* Upload Stopped / Error Banner */}
      {uploadMessage && !isUploading && (
        <div className="p-4 rounded-3xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <XCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-200">{uploadMessage}</p>
              <p className="text-[11px] text-amber-300/80 mt-0.5">You can select another document or retry uploading.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUploadMessage(null)}
            className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-900 border border-white/10"
          >
            Dismiss
          </button>
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
              <p className="text-[11px] text-emerald-400/80 font-mono mt-0.5">
                Category: {lastUploadedDoc.category} • Size: {(lastUploadedDoc.fileSize / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPreviewDoc(lastUploadedDoc)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Inspect Document
          </button>
        </div>
      )}

      {/* Preserved File Vault List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Preserved Original File Vault ({documents.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Total Stored: {documents.length} Files
          </span>
        </div>

        {documents.length === 0 ? (
          <div className="p-10 rounded-3xl soft-3d-panel text-center text-slate-400 text-xs border border-white/10">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
            <p className="font-bold text-slate-300">Your student file vault is empty.</p>
            <p className="mt-1 text-slate-400">Upload your separated certificates, marksheets, and resumes above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="p-5 rounded-2xl soft-3d-card border border-white/10 space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white truncate max-w-[170px]" title={doc.title}>
                        {doc.title}
                      </h4>
                      <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 mt-0.5">
                        {doc.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 space-y-1 font-mono pt-1 border-t border-white/5">
                  <p>Uploaded: {doc.uploadDate}</p>
                  <p>Extracted Skills: {doc.extractedSkills?.length || 0} skills</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow"
                  >
                    <Eye className="w-3.5 h-3.5" /> View & Inspect Document
                  </button>

                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs border border-red-500/30"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
