import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, GraduationCap, Mail, Phone, Globe, Download, RotateCcw, Save, ShieldCheck } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateProfile, exportAllUserData, resetToDefaultData } = useApp();
  const [formData, setFormData] = useState(user);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" /> Digital Profile & Vault Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage student metadata, identity completion score, export vault archives, and data privacy options
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAllUserData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Export Complete Vault Data
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: Avatar & Summary (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-center">
          <div className="relative inline-block mx-auto">
            <img
              src={formData.avatarUrl}
              alt={formData.name}
              className="w-28 h-28 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-2xl mx-auto"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-slate-950 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-white" />
            </span>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">{formData.name}</h3>
            <p className="text-xs text-indigo-300 font-semibold">{formData.degree}</p>
            <p className="text-xs text-slate-400 mt-0.5">{formData.college}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Profile Completion:</span>
              <span className="font-bold text-emerald-400">{user.profileCompletionPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${user.profileCompletionPercent}%` }} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-left space-y-3 text-xs">
            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Data Privacy & Reset Options</h4>
            <button
              type="button"
              onClick={resetToDefaultData}
              className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Application State to Default
            </button>
          </div>
        </div>

        {/* Right Card: Editable Form Fields (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs">
              Profile changes updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">University / College</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Year</label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2026 })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile Link</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile Link</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full glass-input rounded-xl p-3 text-xs text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl gradient-button text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Updates
          </button>

        </div>

      </form>

    </div>
  );
};
