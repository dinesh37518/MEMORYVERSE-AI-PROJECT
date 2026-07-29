import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Database, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Sparkles,
  BarChart3,
  HardDrive
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Admin User Metrics Overview
  const mockUserList = [
    { id: 'usr_01', name: 'Dineshkumar M', email: 'dineshguru0609@gmail.com', role: 'Student', college: 'VSB Engineering College, Karur', docsCount: 10, status: 'Active', joinedDate: '2026-02-01' },
    { id: 'usr_02', name: 'Ananya Sharma', email: 'ananya.s@stanford.edu', role: 'Student', college: 'Stanford University', docsCount: 8, status: 'Active', joinedDate: '2026-01-28' },
    { id: 'usr_03', name: 'Marcus Chen', email: 'marcus.c@mit.edu', role: 'Student', college: 'MIT School of Engineering', docsCount: 12, status: 'Active', joinedDate: '2026-01-20' },
    { id: 'usr_04', name: 'Priya Venkatesh', email: 'priya.v@iitm.ac.in', role: 'Student', college: 'IIT Madras', docsCount: 6, status: 'Active', joinedDate: '2026-01-15' },
    { id: 'usr_05', name: 'MemoryVerse Admin', email: 'adminofmemoryverse@gmail.com', role: 'Admin', college: 'MemoryVerse Governance Board', docsCount: 42, status: 'System Admin', joinedDate: '2022-01-01' }
  ];

  const filteredUsers = mockUserList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Banner */}
      <div className="soft-3d-panel p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-16 h-16 rounded-2xl border-2 border-purple-400/40 object-cover shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">MemoryVerse Admin Portal</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">User Analytics Only</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-mono">Logged in as {user.email}</p>
          </div>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-right">
          <span className="text-[10px] text-purple-300 font-bold uppercase block">Total Platform Registered Users</span>
          <span className="text-2xl font-black text-white font-mono">1,428 Students</span>
        </div>
      </div>

      {/* User Count Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-bold">Total Registered Users</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">1,428</p>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +42 signups today
          </span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-bold">Active Student Identities</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">1,394</p>
          <span className="text-[11px] text-slate-400 font-semibold mt-1 block">97.6% Verified Identities</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-bold">Total Documents Vaulted</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">8,940</p>
          <span className="text-[11px] text-purple-300 font-semibold mt-1 block">Across all user vaults</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-bold">Total Storage Allocated</span>
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">4.2 / 10 TB</p>
          <span className="text-[11px] text-amber-300 font-semibold mt-1 block">42% System Capacity</span>
        </div>

      </div>

      {/* User Directory & Counts Table */}
      <div className="soft-3d-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" /> Platform Registered User Counts Directory
            </h2>
            <p className="text-xs text-slate-400">View user counts, student colleges, and document vault status</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user name or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full soft-3d-input rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] text-slate-400 uppercase tracking-wider font-extrabold border-b border-white/10">
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">College / University</th>
                <th className="p-4 text-center">Docs Vaulted</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-200 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                      {u.name.charAt(0)}
                    </div>
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      u.role === 'Admin' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{u.college}</td>
                  <td className="p-4 text-center font-mono font-bold text-emerald-400">{u.docsCount} docs</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {u.status}
                    </span>
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
