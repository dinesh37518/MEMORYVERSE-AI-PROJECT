import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CERTIFICATIONS } from '../../data/initialData';
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
  Layers,
  X,
  ExternalLink,
  CheckCircle2,
  Building
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
  const [activeAdminModal, setActiveAdminModal] = useState<'dept' | 'docs' | 'certs' | null>(null);

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

  // Scroll smoothly to Student Directory table
  const handleSelectStudent = (stRegNo: string) => {
    setSelectedRegNo(stRegNo);
    inspectStudentByRegNo(stRegNo);
    const el = document.getElementById('vault-inspection-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans relative">
      
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
            <p className="text-xs text-slate-300 mt-1 font-mono">Logged in as <span className="text-purple-300 font-bold">vsbkaruredu@gmail.com</span></p>
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

          <div 
            onClick={scrollToDirectory}
            className="px-4 py-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-right cursor-pointer hover:border-purple-400/60 transition-all"
          >
            <span className="text-[10px] text-purple-300 font-bold uppercase block">Registered Students</span>
            <span className="text-2xl font-black text-white font-mono">{registeredStudents.length} Students</span>
          </div>
        </div>
      </div>

      {/* User Summary Stat Cards (Interactive on Click) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Registered Students */}
        <div 
          onClick={scrollToDirectory}
          className="soft-3d-card p-5 cursor-pointer hover:border-indigo-400/80 hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold group-hover:text-indigo-300 transition-colors">Total Registered Students</span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{registeredStudents.length}</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center justify-between">
            <span>Identified by Reg No</span>
            <span className="text-[10px] text-indigo-400 font-bold group-hover:underline">View Table ↓</span>
          </span>
        </div>

        {/* Card 2: College & Department */}
        <div 
          onClick={() => setActiveAdminModal('dept')}
          className="soft-3d-card p-5 cursor-pointer hover:border-emerald-400/80 hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold group-hover:text-emerald-300 transition-colors">College & Department</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 group-hover:bg-emerald-500/40 transition-colors">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-black text-white truncate">VSB Engineering College</p>
          <span className="text-[11px] text-slate-300 font-semibold mt-1 flex items-center justify-between">
            <span>Multi-Department Sync</span>
            <span className="text-[10px] text-emerald-400 font-bold group-hover:underline">Inspect Depts →</span>
          </span>
        </div>

        {/* Card 3: Total Vaulted Documents */}
        <div 
          onClick={() => setActiveAdminModal('docs')}
          className="soft-3d-card p-5 cursor-pointer hover:border-purple-400/80 hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold group-hover:text-purple-300 transition-colors">Total Vaulted Documents</span>
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 group-hover:bg-purple-500/40 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalVaultDocs} Files</p>
          <span className="text-[11px] text-purple-300 font-semibold mt-1 flex items-center justify-between">
            <span>Isolated Per Student</span>
            <span className="text-[10px] text-purple-400 font-bold group-hover:underline">View All Files →</span>
          </span>
        </div>

        {/* Card 4: Verified Certifications */}
        <div 
          onClick={() => setActiveAdminModal('certs')}
          className="soft-3d-card p-5 cursor-pointer hover:border-pink-400/80 hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-bold group-hover:text-pink-300 transition-colors">Verified Certifications</span>
            <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:bg-pink-500/40 transition-colors">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalVaultCerts} Verified</p>
          <span className="text-[11px] text-pink-300 font-semibold mt-1 flex items-center justify-between">
            <span>Separated Credential Vaults</span>
            <span className="text-[10px] text-pink-400 font-bold group-hover:underline">View Credentials →</span>
          </span>
        </div>

      </div>

      {/* MODAL 1: College & Department Breakdown Modal */}
      {activeAdminModal === 'dept' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl soft-3d-panel p-6 sm:p-8 space-y-5 border border-emerald-500/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">VSB Engineering College – Departments</h3>
                  <p className="text-xs text-slate-400">Karur, Tamil Nadu • Multi-Department Student Breakdown</p>
                </div>
              </div>
              <button
                onClick={() => setActiveAdminModal(null)}
                className="p-2 rounded-2xl soft-3d-button-secondary text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {[
                { name: 'ECE (Electronics & Communication)', code: 'ECE', students: registeredStudents.filter(s => s.department === 'ECE') },
                { name: 'CSE (Computer Science & Engineering)', code: 'CSE', students: registeredStudents.filter(s => s.department === 'CSE') },
                { name: 'IT (Information Technology)', code: 'IT', students: registeredStudents.filter(s => s.department === 'IT') },
                { name: 'AI & DS (Artificial Intelligence)', code: 'AI&DS', students: registeredStudents.filter(s => s.department === 'AI&DS') },
                { name: 'EEE (Electrical & Electronics)', code: 'EEE', students: registeredStudents.filter(s => s.department === 'EEE') },
                { name: 'Mechanical Engineering', code: 'Mech', students: registeredStudents.filter(s => s.department === 'Mech') },
              ].map((d, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">{d.name}</span>
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                      {d.students.length} Students
                    </span>
                  </div>
                  {d.students.length > 0 ? (
                    <div className="space-y-1 pt-1 border-t border-white/5">
                      {d.students.map((st, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px] text-slate-300">
                          <span>{st.name}</span>
                          <span className="font-mono text-purple-300">{st.regNo}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500 italic">No registered students yet</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveAdminModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Total Vaulted Documents Breakdown Modal */}
      {activeAdminModal === 'docs' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl soft-3d-panel p-6 sm:p-8 space-y-5 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">All Vaulted Student Documents ({totalVaultDocs})</h3>
                  <p className="text-xs text-slate-400">Separated binary file archives indexed by Student Register Number</p>
                </div>
              </div>
              <button
                onClick={() => setActiveAdminModal(null)}
                className="p-2 rounded-2xl soft-3d-button-secondary text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2.5 pr-1">
              {documents.map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white" title={doc.title}>{doc.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Category: <span className="text-purple-300 font-semibold">{doc.category}</span> • Uploaded: {doc.uploadDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPreviewDoc(doc);
                      setActiveAdminModal(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 shadow"
                  >
                    <Eye className="w-3.5 h-3.5" /> Inspect File
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveAdminModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Verified Certifications Breakdown Modal */}
      {activeAdminModal === 'certs' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl soft-3d-panel p-6 sm:p-8 space-y-5 border border-pink-500/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">9 Verified Student Certifications</h3>
                  <p className="text-xs text-slate-400">Authentic digital credentials & GitHub repository verified links</p>
                </div>
              </div>
              <button
                onClick={() => setActiveAdminModal(null)}
                className="p-2 rounded-2xl soft-3d-button-secondary text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {INITIAL_CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-extrabold text-white">{cert.name}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">Issuer: <strong className="text-pink-300">{cert.issuingOrganization}</strong></p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Credential ID: {cert.credentialId} • Issued: {cert.date}</p>
                    </div>
                  </div>

                  <a
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveAdminModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registered Students Directory Table */}
      <div id="student-directory-table" className="soft-3d-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" /> Student Directory
            </h2>
            <p className="text-xs text-slate-400">Click a student name to inspect their uploaded files and certificates</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Student Name, Year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full soft-3d-input rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200"
            />
          </div>
        </div>

        {/* Table View - Simplified to Student Name, Year, and No. of Files Uploaded */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Year</th>
                <th className="py-3 px-4 text-center">No. of Files Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-medium">
              {filteredUsers.map((st) => {
                const isSelected = selectedRegNo === st.regNo;
                return (
                  <tr 
                    key={st.regNo || st.email} 
                    onClick={() => handleSelectStudent(st.regNo)}
                    className={`cursor-pointer transition-all hover:bg-purple-950/30 ${
                      isSelected ? 'bg-purple-950/50 border-l-4 border-purple-500' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-white">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudent(st.regNo);
                        }}
                        className="flex items-center gap-3 text-left group"
                      >
                        <img src={st.avatarUrl} alt={st.name} className="w-8 h-8 rounded-xl object-cover border border-white/20 shadow-sm" />
                        <div>
                          <div className="font-extrabold text-sm text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                            <span>{st.name}</span>
                            {isSelected && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 font-normal">
                                Active Target
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-purple-400 group-hover:underline flex items-center gap-1 font-semibold mt-0.5">
                            <Eye className="w-3 h-3" /> Click to view files
                          </span>
                        </div>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-200 font-mono text-xs">
                      Year {st.currentYear || '2'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 font-mono font-black text-purple-300 text-xs inline-block">
                        {st.docsCount || 0} Files
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vault Inspection Detail Card */}
      <div id="vault-inspection-card" className="soft-3d-card p-6 border-2 border-purple-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">Active Inspection Target</span>
            <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
              <span>{selectedStudent.name}'s Vault</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">Reg No: {selectedStudent.regNo}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{selectedStudent.college} • {selectedStudent.department} Dept (Year {selectedStudent.currentYear})</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-white/10">
              Total Isolated Files: <strong className="text-emerald-400">{documents.length}</strong>
            </span>
          </div>
        </div>

        {/* Vault Document Grid */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" /> Preserved Original Certificates & Marksheets ({documents.length})
          </h4>

          {documents.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/50 text-center text-slate-400 text-xs border border-white/10">
              <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
              <p className="font-bold text-slate-300">No documents uploaded for this student ({selectedStudent.name}).</p>
              <p className="text-[11px] text-slate-400 mt-1">This student has an empty isolated vault awaiting certificate upload.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-xs font-bold text-white truncate max-w-[180px]" title={doc.title}>{doc.title}</h5>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Date: {doc.uploadDate}</p>
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="w-full py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Document
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

