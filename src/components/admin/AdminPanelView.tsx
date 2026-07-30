import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Search, 
  Sparkles,
  BarChart3,
  Award,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  Eye,
  GraduationCap
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { user, documents, certifications, projects, internships, setPreviewDoc } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('dineshguru0609@gmail.com');

  // Registered Users Directory Data
  const mockUserList = [
    { 
      id: 'usr_01', 
      name: 'Dineshkumar M', 
      email: 'dineshguru0609@gmail.com', 
      role: 'Student', 
      college: 'VSB Engineering College, Karur', 
      degree: 'B.E. Electronics & Communication Engineering',
      docsCount: documents.length, 
      certsCount: certifications.length,
      projectsCount: projects.length,
      internshipsCount: internships.length,
      status: 'Active & Verified', 
      joinedDate: '2024-09-16' 
    },
    { 
      id: 'usr_02', 
      name: 'Ananya Sharma', 
      email: 'ananya.s@stanford.edu', 
      role: 'Student', 
      college: 'Stanford University', 
      degree: 'B.S. Computer Science',
      docsCount: 8, 
      certsCount: 5,
      projectsCount: 2,
      internshipsCount: 2,
      status: 'Active', 
      joinedDate: '2025-01-28' 
    },
    { 
      id: 'usr_03', 
      name: 'Marcus Chen', 
      email: 'marcus.c@mit.edu', 
      role: 'Student', 
      college: 'MIT School of Engineering', 
      degree: 'B.S. Electrical Engineering',
      docsCount: 12, 
      certsCount: 8,
      projectsCount: 4,
      internshipsCount: 3,
      status: 'Active', 
      joinedDate: '2025-01-20' 
    },
    { 
      id: 'usr_04', 
      name: 'MemoryVerse Admin', 
      email: 'adminofmemoryverse@gmail.com', 
      role: 'Admin', 
      college: 'MemoryVerse Governance Board', 
      degree: 'System Administration',
      docsCount: 14, 
      certsCount: 9,
      projectsCount: 2,
      internshipsCount: 3,
      status: 'System Admin', 
      joinedDate: '2022-01-01' 
    }
  ];

  const filteredUsers = mockUserList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = mockUserList.find(u => u.email === selectedUserEmail) || mockUserList[0];

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
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">Users Data Directory</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-mono">Logged in as <span className="text-purple-300 font-bold">adminofmemoryverse@gmail.com</span></p>
          </div>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-right">
          <span className="text-[10px] text-purple-300 font-bold uppercase block">Platform Registered Students</span>
          <span className="text-2xl font-black text-white font-mono">4 Active Accounts</span>
        </div>
      </div>

      {/* User Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Total Registered Users</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{mockUserList.length}</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Active user profiles</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Student Profiles</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">3 Students</p>
          <span className="text-[11px] text-slate-300 font-semibold mt-1 block">VSB, Stanford, MIT</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Total Vaulted Documents</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{documents.length + 20} Files</p>
          <span className="text-[11px] text-purple-300 font-semibold mt-1 block">Certificates & Resumes</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Verified Certifications</span>
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{certifications.length + 13} Verified</p>
          <span className="text-[11px] text-pink-300 font-semibold mt-1 block">Infosys, Cisco, HP LIFE</span>
        </div>
      </div>

      {/* Registered Users Directory Table */}
      <div className="soft-3d-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" /> Registered User Accounts Directory
            </h2>
            <p className="text-xs text-slate-400">Manage user accounts, colleges, and inspect candidate vault credentials</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search user name, email, or college..."
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
                <th className="p-4">College & Degree</th>
                <th className="p-4 text-center">Docs</th>
                <th className="p-4 text-center">Certs</th>
                <th className="p-4 text-right">Inspect Vault</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-200 font-medium">
              {filteredUsers.map((u) => (
                <tr 
                  key={u.id} 
                  onClick={() => setSelectedUserEmail(u.email)}
                  className={`hover:bg-white/5 transition-colors cursor-pointer ${
                    selectedUserEmail === u.email ? 'bg-purple-950/40 border-l-4 border-l-purple-500' : ''
                  }`}
                >
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
                  <td className="p-4 text-slate-300">
                    <p className="font-bold text-slate-200">{u.college}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{u.degree}</p>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-emerald-400">{u.docsCount}</td>
                  <td className="p-4 text-center font-mono font-bold text-pink-400">{u.certsCount}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelectedUserEmail(u.email)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect User</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Student User Vault Inspector */}
      {selectedUser && (
        <div className="soft-3d-panel p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{selectedUser.name}'s Academic & Career Vault</h2>
                <p className="text-xs text-slate-400 font-mono">{selectedUser.email} • {selectedUser.college}</p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Student Record
            </span>
          </div>

          {/* User Vault Records Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Certifications Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Verified Certifications ({certifications.length})
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {certifications.slice(0, 4).map(c => (
                  <li key={c.id} className="truncate">• {c.name} ({c.date})</li>
                ))}
              </ul>
            </div>

            {/* Projects Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Engineering Projects ({projects.length})
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {projects.map(p => (
                  <li key={p.id} className="truncate">• {p.name}</li>
                ))}
              </ul>
            </div>

            {/* Internships Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Internships & In-Plant ({internships.length})
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {internships.map(i => (
                  <li key={i.id} className="truncate">• {i.position} ({i.company})</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Vault Document Files List */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Uploaded Document Vault Records ({documents.length}):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {documents.map(d => (
                <div 
                  key={d.id} 
                  onClick={() => setPreviewDoc(d)}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate">{d.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{d.fileName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 shrink-0">
                    View
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

