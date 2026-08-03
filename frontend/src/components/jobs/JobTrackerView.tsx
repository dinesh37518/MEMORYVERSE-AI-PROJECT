import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobApplication, JobStage } from '../../types';
import { 
  Briefcase, 
  Plus, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Check, 
  ArrowRight,
  Target
} from 'lucide-react';

const STAGES: { id: JobStage; label: string; color: string }[] = [
  { id: 'Saved', label: '🔖 Saved', color: 'border-slate-500/30 text-slate-300' },
  { id: 'Applied', label: '📤 Applied', color: 'border-indigo-500/40 text-indigo-300' },
  { id: 'Interviewing', label: '⚡ Interviewing', color: 'border-amber-500/40 text-amber-300' },
  { id: 'Offer', label: '🎉 Offer Received', color: 'border-emerald-500/40 text-emerald-300' },
  { id: 'Rejected', label: '❌ Archived', color: 'border-red-500/30 text-red-400' }
];

export const JobTrackerView: React.FC = () => {
  const { jobs, skills, addJob, updateJobStatus, deleteJob } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [reqSkillsInput, setReqSkillsInput] = useState('');
  const [notes, setNotes] = useState('');

  const calculateSkillMatch = (requiredSkills: string[]) => {
    if (!requiredSkills || requiredSkills.length === 0) return 100;
    const userSkillNames = skills.map(s => s.name.toLowerCase());
    const matched = requiredSkills.filter(req => 
      userSkillNames.some(u => u.includes(req.toLowerCase()) || req.toLowerCase().includes(u))
    );
    return Math.round((matched.length / requiredSkills.length) * 100);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    addJob({
      company,
      role,
      location: location || 'Remote',
      salary: salary || 'Market Competitive',
      status: 'Saved',
      jobUrl,
      requiredSkills: reqSkillsInput.split(',').map(s => s.trim()).filter(Boolean),
      notes
    });

    setCompany('');
    setRole('');
    setLocation('');
    setSalary('');
    setJobUrl('');
    setReqSkillsInput('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="soft-3d-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            Career & Job Application Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track job applications and compare skill requirements against your MemoryVerse matrix
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Job Application</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAGES.map((stage) => {
          const stageJobs = jobs.filter(j => j.status === stage.id);
          return (
            <div key={stage.id} className="soft-3d-card p-4 rounded-3xl space-y-3 flex flex-col min-h-[500px]">
              
              {/* Column Title */}
              <div className={`flex items-center justify-between pb-3 border-b border-white/10 ${stage.color}`}>
                <span className="text-xs font-black tracking-wide">{stage.label}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-mono font-bold">
                  {stageJobs.length}
                </span>
              </div>

              {/* Cards Stream */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {stageJobs.length === 0 ? (
                  <div className="text-center py-10 text-[11px] text-slate-400 border border-dashed border-white/10 rounded-2xl p-4">
                    No applications in {stage.id}
                  </div>
                ) : (
                  stageJobs.map((job) => {
                    const matchScore = calculateSkillMatch(job.requiredSkills);
                    return (
                      <div
                        key={job.id}
                        className="bg-[#080b11]/80 hover:bg-[#0c101a] border border-white/10 rounded-2xl p-4 space-y-3 transition-all hover:border-indigo-500/40 shadow-lg group relative"
                      >
                        {/* Company & Role */}
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-xs font-extrabold text-white leading-tight">
                              {job.role}
                            </h3>
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] font-bold text-indigo-400 mt-0.5">{job.company}</p>
                        </div>

                        {/* Metadata */}
                        <div className="text-[10px] text-slate-400 space-y-1 font-medium">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                          </div>
                          {job.salary && (
                            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                              <DollarSign className="w-3 h-3" /> {job.salary}
                            </div>
                          )}
                        </div>

                        {/* Skill Match Badge */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-slate-400 flex items-center gap-1">
                            <Target className="w-3 h-3 text-indigo-400" /> Skill Match:
                          </span>
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${
                            matchScore >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            matchScore >= 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-slate-700/50 text-slate-300'
                          }`}>
                            {matchScore}%
                          </span>
                        </div>

                        {/* Stage Selector Buttons */}
                        <div className="pt-2 flex items-center justify-between gap-1">
                          {STAGES.filter(s => s.id !== job.status).map(s => (
                            <button
                              key={s.id}
                              onClick={() => updateJobStatus(job.id, s.id)}
                              className="text-[9px] px-2 py-1 rounded-lg bg-white/5 hover:bg-indigo-600/30 text-slate-400 hover:text-indigo-300 transition-colors"
                              title={`Move to ${s.id}`}
                            >
                              {s.id}
                            </button>
                          ))}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0c1017] border border-white/10 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Add Job Application
            </h2>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google, Microsoft, TCS"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full soft-3d-input px-3 py-2 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Engineer / Embedded Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full soft-3d-input px-3 py-2 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Location</label>
                  <input
                    type="text"
                    placeholder="Bengaluru / Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full soft-3d-input px-3 py-2 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Salary / Stipend</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹12 - ₹15 LPA"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full soft-3d-input px-3 py-2 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Angular, Node.js, Embedded C, Python"
                  value={reqSkillsInput}
                  onChange={(e) => setReqSkillsInput(e.target.value)}
                  className="w-full soft-3d-input px-3 py-2 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Notes / Interview Status</label>
                <textarea
                  placeholder="Add interview details or referral contacts..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full soft-3d-input px-3 py-2 rounded-xl text-white h-20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl soft-3d-button-secondary text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save Job Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
