import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Search, 
  Award,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  Eye,
  GraduationCap,
  Hash,
  Layers
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { 
    user, 
    documents, 
    certifications, 
    projects, 
    internships, 
    registeredStudents, 
    inspectStudentByRegNo, 
    setPreviewDoc 
  } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegNo, setSelectedRegNo] = useState<string>(user.regNo || '922524106001');

  // Filter registered students list by RegNo, Name, Department, or Email
  const filteredUsers = registeredStudents.filter(u => 
    (u.regNo && u.regNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudent = registeredStudents.find(u => u.regNo === selectedRegNo) || registeredStudents[0] || user;

  const totalVaultDocs = registeredStudents.reduce((sum, s) => sum + (s.docsCount || 0), 0);
  const totalVaultCerts = registeredStudents.reduce((sum, s) => sum + (s.certsCount || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      
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
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">Registered Students Directory</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-mono">Logged in as <span className="text-purple-300 font-bold">adminofmemoryverse@gmail.com</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              const { syncAllRegisteredStudentsToSupabase } = await import('../../lib/supabase');
              const count = await syncAllRegisteredStudentsToSupabase(registeredStudents);
              alert(`Successfully synced ${count} student records to Supabase database (indexed by Reg No)!`);
            }}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Sync All to Supabase</span>
          </button>

          <div className="px-4 py-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-right">
            <span className="text-[10px] text-purple-300 font-bold uppercase block">Registered Students</span>
            <span className="text-2xl font-black text-white font-mono">{registeredStudents.length} Students</span>
          </div>
        </div>
      </div>

      {/* User Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Total Registered Students</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{registeredStudents.length}</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Identified by Reg No</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">College & Department</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-black text-white truncate">VSB Engineering College</p>
          <span className="text-[11px] text-slate-300 font-semibold mt-1 block">Multi-Department Sync</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Total Vaulted Documents</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalVaultDocs} Files</p>
          <span className="text-[11px] text-purple-300 font-semibold mt-1 block">Isolated Per Student</span>
        </div>

        <div className="soft-3d-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold">Verified Certifications</span>
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalVaultCerts} Verified</p>
          <span className="text-[11px] text-pink-300 font-semibold mt-1 block">Separated Credential Vaults</span>
        </div>

      </div>

      {/* Registered Students Directory Table */}
      <div className="soft-3d-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" /> Student Directory (Identified by Register Number)
            </h2>
            <p className="text-xs text-slate-400">Search student accounts by Reg No, Name, or Department to inspect separated document vaults</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Reg No (e.g. 922524106058), Name, Dept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full soft-3d-input rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 font-mono"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] text-slate-400 uppercase tracking-wider font-extrabold border-b border-white/10">
                <th className="p-4">Register Number (Reg No)</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Dept / Sec / Year</th>
                <th className="p-4">Email Address</th>
                <th className="p-4 text-center">Docs</th>
                <th className="p-4 text-center">Certs</th>
                <th className="p-4 text-right">Inspect Vault</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-200 font-medium">
              {filteredUsers.map((u) => (
                <tr 
                  key={u.id || u.email} 
                  onClick={() => setSelectedRegNo(u.regNo || '')}
                  className={`hover:bg-white/5 transition-colors cursor-pointer ${
                    selectedRegNo === u.regNo ? 'bg-purple-950/40 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <td className="p-4 font-mono font-extrabold text-indigo-300">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40">
                      {u.regNo || '922524106000'}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-white flex items-center gap-2.5">
                    <img 
                      src={u.avatarUrl || DEFAULT_STUDENT_AVATAR} 
                      alt={u.name} 
                      className="w-7 h-7 rounded-xl object-cover border border-white/20 shrink-0" 
                    />
                    <span>{u.name}</span>
                  </td>

                  <td className="p-4 text-slate-300">
                    <span className="font-bold text-purple-300">{u.department || 'ECE'}</span> • Sec {u.section || 'A'} • Year {u.currentYear || 1}
                  </td>

                  <td className="p-4 font-mono text-slate-400 text-[11px]">{u.email}</td>
                  
                  <td className="p-4 text-center font-mono font-bold text-emerald-400">
                    {u.docsCount || 0}
                  </td>

                  <td className="p-4 text-center font-mono font-bold text-pink-400">
                    {u.certsCount || 0}
                  </td>

                  <td className="p-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (u.regNo) inspectStudentByRegNo(u.regNo);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition-all ml-auto shadow"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Vault</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Student User Vault Inspector */}
      {selectedStudent && (
        <div className="soft-3d-panel p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={selectedStudent.avatarUrl || DEFAULT_STUDENT_AVATAR} 
                alt={selectedStudent.name} 
                className="w-12 h-14 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">{selectedStudent.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/40">
                    Reg No: {selectedStudent.regNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {selectedStudent.email} • {selectedStudent.department} (Section {selectedStudent.section}, Year {selectedStudent.currentYear})
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedStudent.regNo) inspectStudentByRegNo(selectedStudent.regNo);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow"
            >
              <Eye className="w-4 h-4" /> Load Student Dashboard
            </button>
          </div>

          {/* User Vault Records Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Certifications Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Verified Certifications ({selectedStudent.certsCount || 0})
              </span>
              <p className="text-[11px] text-slate-400">
                {(selectedStudent.certsCount || 0) === 0 ? 'No certificates uploaded yet by student.' : `${selectedStudent.certsCount} verified certificate records.`}
              </p>
            </div>

            {/* Projects Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Engineering Projects ({selectedStudent.projectsCount || 0})
              </span>
              <p className="text-[11px] text-slate-400">
                {(selectedStudent.projectsCount || 0) === 0 ? 'No projects uploaded yet by student.' : `${selectedStudent.projectsCount} engineering project reports.`}
              </p>
            </div>

            {/* Internships Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Internships ({selectedStudent.internshipsCount || 0})
              </span>
              <p className="text-[11px] text-slate-400">
                {(selectedStudent.internshipsCount || 0) === 0 ? 'No internships uploaded yet by student.' : `${selectedStudent.internshipsCount} proof letters linked.`}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
