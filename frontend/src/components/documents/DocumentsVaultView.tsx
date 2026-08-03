import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCategory } from '../../types';
import { 
  FolderKanban, 
  Eye, 
  Trash2, 
  Grid, 
  List, 
  Search
} from 'lucide-react';

export const DocumentsVaultView: React.FC = () => {
  const { user, documents, deleteDocument, setPreviewDoc } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Certifications', 'Resume', 'Internships', 'Projects', 'Academics', 'Achievements', 'Research', 'Portfolio', 'Employment', 'Other'];

  const filteredDocs = documents.filter(d => {
    const matchCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchQuery = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-400" /> Preserved Document Vault
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store original files securely while AI automatically indexes category tags & skills metadata
          </p>
        </div>

        {/* View Toggle & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200"
            />
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid or List Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                    {doc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{doc.fileType.toUpperCase()}</span>
                </div>

                <h3 
                  onClick={() => setPreviewDoc(doc)}
                  className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                >
                  {doc.title}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{doc.fileName}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {doc.extractedMetadata.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{doc.uploadDate}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold text-xs flex items-center gap-1 border border-indigo-500/30 transition-colors"
                    title="View & Inspect Document"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Document
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/60">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Type</th>
                <th className="p-3">Upload Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-200">{doc.title}</td>
                  <td className="p-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                      {doc.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">{doc.fileType.toUpperCase()}</td>
                  <td className="p-3 text-slate-400">{doc.uploadDate}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => setPreviewDoc(doc)} className="text-indigo-400 hover:underline font-semibold">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
