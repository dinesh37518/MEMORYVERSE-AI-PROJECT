import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DEPARTMENTS, DepartmentType } from '../../types';
import { DEFAULT_STUDENT_AVATAR } from '../../data/initialData';
import { 
  User, 
  GraduationCap, 
  Mail, 
  Phone, 
  Globe, 
  Download, 
  RotateCcw, 
  Save, 
  ShieldCheck, 
  Camera, 
  Hash, 
  Layers, 
  CheckCircle2, 
  Image as ImageIcon,
  BookOpen,
  Code
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateProfile, exportAllUserData, resetToDefaultData } = useApp();
  const [formData, setFormData] = useState(user);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhotoToDefault = () => {
    setFormData(prev => ({ ...prev, avatarUrl: DEFAULT_STUDENT_AVATAR }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" /> Student Profile & Passport Identity
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your student credentials, register number, department details, and passport photo for dashboard presentation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportAllUserData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Export Complete Vault Data
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: Passport Photo & Profile Badge (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-center">
          
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Official Passport Photo Frame
            </span>

            {/* Passport Photo Frame (Aspect 3:4) */}
            <div className="relative w-36 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 group">
              <img
                src={formData.avatarUrl || DEFAULT_STUDENT_AVATAR}
                alt={formData.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 p-1 rounded-lg bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>

              {/* Hover overlay to upload photo */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white text-xs font-bold"
              >
                <Camera className="w-6 h-6 text-indigo-300" />
                <span>Upload Passport Photo</span>
              </button>
            </div>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              className="hidden"
            />

            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow"
              >
                <Camera className="w-3.5 h-3.5" /> Upload Photo
              </button>
              <button
                type="button"
                onClick={handleResetPhotoToDefault}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                title="Reset to default fixed photo"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Use Fixed Photo
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              Upload passport photo or use default system photo for Dashboard.
            </p>
          </div>

          <div className="pt-2">
            <h3 className="text-xl font-extrabold text-white">{formData.name}</h3>
            <p className="text-xs text-indigo-300 font-semibold mt-0.5">{formData.degree}</p>
            <p className="text-xs text-slate-400 mt-0.5">{formData.college}</p>
            
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                Dept: {formData.department}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                Sec {formData.section || 'A'} • Yr {formData.currentYear || 2}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Profile Completeness:</span>
              <span className="font-bold text-emerald-400">{user.profileCompletionPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${user.profileCompletionPercent}%` }} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-left space-y-3 text-xs">
            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Data Privacy Options</h4>
            <button
              type="button"
              onClick={resetToDefaultData}
              className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Application State
            </button>
          </div>
        </div>

        {/* Right Card: Editable Form Fields (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
          
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Profile details updated successfully! Profile photo will now show on Dashboard.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Register Number (Reg No)</label>
              <input
                type="text"
                value={formData.regNo || ''}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                placeholder="e.g. 922524106001"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-indigo-300 font-bold bg-slate-900 border border-slate-700"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Section</label>
              <select
                value={formData.section || 'A'}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200 bg-slate-900 border border-slate-700"
              >
                {['A', 'B', 'C', 'D'].map(sec => (
                  <option key={sec} value={sec}>Section {sec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Year Studying</label>
              <select
                value={formData.currentYear || 2}
                onChange={(e) => setFormData({ ...formData, currentYear: parseInt(e.target.value) || 1 })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200 bg-slate-900 border border-slate-700"
              >
                {[1, 2, 3, 4].map(yr => (
                  <option key={yr} value={yr}>Year {yr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">University / College</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Batch Year</label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2028 })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-slate-200"
              />
            </div>

            {/* Coding & Professional Profiles (All Optional) */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" /> Coding & Professional Links (Optional)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span>GitHub Profile URL</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl || formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span>LinkedIn Profile URL</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl || formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span>LeetCode Profile URL</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.leetcodeUrl || ''}
                    onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
                    placeholder="https://leetcode.com/u/username"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Additional Competitive Coding Profiles (Optional) */}
            <div className="sm:col-span-2 pt-1">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" /> Competitive Coding Profiles (Optional)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>GeeksforGeeks URL</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.gfgUrl || ''}
                    onChange={(e) => setFormData({ ...formData, gfgUrl: e.target.value })}
                    placeholder="https://auth.geeksforgeeks.org/user/username"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>CodeChef Profile URL</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formData.codechefUrl || ''}
                    onChange={(e) => setFormData({ ...formData, codechefUrl: e.target.value })}
                    placeholder="https://www.codechef.com/users/username"
                    className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
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
            className="py-3 px-6 rounded-xl gradient-button text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile & Passport Photo
          </button>

        </div>

      </form>

    </div>
  );
};
