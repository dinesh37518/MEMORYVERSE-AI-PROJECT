import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Globe, 
  Mail, 
  Phone, 
  Github, 
  Linkedin,
  Layers
} from 'lucide-react';

export const ResumeBuilderView: React.FC = () => {
  const { user, skills, projects, internships, certifications, achievements } = useApp();

  const [template, setTemplate] = useState<'modern' | 'executive' | 'ats'>('modern');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownResume = () => {
    return `# ${user.name}
${user.department} | ${user.college}
Email: ${user.email} | Phone: ${user.phone}
GitHub: ${user.github} | LinkedIn: ${user.linkedin} | Portfolio: ${user.portfolio}

---

## 👤 PROFESSIONAL SUMMARY
${user.bio}

---

## 💡 KEY SKILLS
${skills.map(s => `- **${s.name}** (${s.category}): ${s.level} proficiency`).join('\n')}

---

## 💼 INTERNSHIPS & EXPERIENCE
${internships.map(i => `### ${i.position} - ${i.company}
*${i.duration} | ${i.location}*
${i.experienceSummary}
**Skills**: ${i.skillsLearned.join(', ')}
`).join('\n')}

---

## 🚀 FEATURED PROJECTS
${projects.map(p => `### ${p.name}
*Tech Stack: ${p.technologies.join(', ')}*
${p.description}
Link: ${p.githubLink || 'N/A'}
`).join('\n')}

---

## 🏅 CERTIFICATIONS
${certifications.map(c => `- **${c.name}** - ${c.issuingOrganization} (${c.date})`).join('\n')}

---

## 🎓 EDUCATION
- **${user.degree}** in ${user.department}
  ${user.college} | Graduation Year: ${user.graduationYear}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="print:hidden soft-3d-panel p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            AI Dynamic Resume Builder & PDF Exporter
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Auto-compiled from your verified MemoryVerse vault data for {user.name}
          </p>
        </div>

        {/* Template Selector & Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#080b11] p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                template === 'modern' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('executive')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                template === 'executive' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Executive Clean
            </button>
            <button
              onClick={() => setTemplate('ats')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                template === 'ats' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Minimalist ATS
            </button>
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2.5 rounded-2xl soft-3d-button-secondary text-slate-200 text-xs font-bold flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            {copied ? 'Copied Markdown' : 'Copy Markdown'}
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            <span>Export Official PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Container */}
      <div className={`mx-auto max-w-4xl bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl transition-all print:p-0 print:shadow-none print:bg-white print:text-black ${
        template === 'modern' ? 'border-t-8 border-indigo-600' : template === 'executive' ? 'border-t-8 border-slate-900' : 'border border-slate-200'
      }`}>
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-6 flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              {user.name}
            </h1>
            <p className="text-sm font-bold text-indigo-600 mt-1 uppercase tracking-wider">
              {user.department} Engineer • {user.degree} Candidate
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {user.college} (Graduating {user.graduationYear})
            </p>
          </div>

          <div className="text-xs space-y-1 text-slate-600 text-right">
            <p className="flex items-center justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" /> {user.email}
            </p>
            <p className="flex items-center justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-600" /> {user.phone}
            </p>
            <p className="flex items-center justify-end gap-1.5 font-mono text-[11px]">
              <Github className="w-3.5 h-3.5 text-indigo-600" /> {user.github}
            </p>
            <p className="flex items-center justify-end gap-1.5 font-mono text-[11px]">
              <Globe className="w-3.5 h-3.5 text-indigo-600" /> {user.portfolio}
            </p>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-2 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
            <Sparkles className="w-3.5 h-3.5" /> Professional Profile Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {user.bio}
          </p>
        </div>

        {/* Skills Matrix */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
            <Code className="w-3.5 h-3.5" /> Core Competencies & Skills Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100 print:bg-white print:border-none print:p-0">
                <span className="font-bold text-slate-800">{skill.name}</span>
                <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Internships & Experience */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-3 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
            <Briefcase className="w-3.5 h-3.5" /> Internship & Practical Experience
          </h2>
          <div className="space-y-4">
            {internships.map((int) => (
              <div key={int.id} className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap">
                  <h3 className="text-xs font-bold text-slate-900">
                    {int.position} — <span className="text-indigo-600">{int.company}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">{int.duration} | {int.location}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{int.experienceSummary}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {int.skillsLearned.map((s, idx) => (
                    <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium print:border print:border-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-3 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
            <Layers className="w-3.5 h-3.5" /> Engineering & Web Projects
          </h2>
          <div className="space-y-3">
            {projects.map((prj) => (
              <div key={prj.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    {prj.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">{prj.date}</span>
                </div>
                <p className="text-xs text-slate-700">{prj.description}</p>
                <p className="text-[11px] text-indigo-600 font-mono font-medium">
                  Tech: {prj.technologies.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-2 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
              <Award className="w-3.5 h-3.5" /> Certifications
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {certifications.map((c) => (
                <li key={c.id} className="leading-snug">
                  <span className="font-bold text-slate-800">{c.name}</span>
                  <span className="block text-[10px] text-slate-500 font-mono">{c.issuingOrganization} ({c.date})</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase text-indigo-700 tracking-wider mb-2 flex items-center gap-1.5 border-b border-indigo-100 pb-1">
              <GraduationCap className="w-3.5 h-3.5" /> Education
            </h2>
            <div className="text-xs text-slate-700">
              <p className="font-bold text-slate-900">{user.degree} in {user.department}</p>
              <p className="text-slate-600">{user.college}</p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">Expected Graduation: {user.graduationYear}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
