import { generateGeminiChatResponse } from '../chat/geminiChat';
import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../../models/types';

interface PortfolioRequest {
  user: UserProfile;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  internships: InternshipItem[];
  theme?: string;
}

export async function generatePortfolioData(reqData: PortfolioRequest): Promise<{ htmlSnippet: string; summary: string }> {
  const prompt = `Generate a modern, executive single-page HTML portfolio representation highlighting ${reqData.user.name}'s verified engineering background, key projects, certified skills, and internships. Return clean structured HTML with CSS components styling suitable for web preview.`;
  const responseText = await generateGeminiChatResponse(prompt, reqData);

  const htmlSnippet = `<div class="portfolio-container p-6 bg-slate-900 text-white rounded-xl shadow-2xl space-y-6">
    <header class="border-b border-slate-700 pb-4">
      <h1 class="text-3xl font-bold text-indigo-400">${reqData.user.name}</h1>
      <p class="text-slate-300">${reqData.user.degree || 'B.E.'} - ${reqData.user.department || 'Engineering'} | ${reqData.user.college || 'VSB Engineering College'}</p>
      <div class="flex gap-4 mt-2 text-sm text-indigo-300">
        ${reqData.user.email ? `<span>Email: ${reqData.user.email}</span>` : ''}
        ${reqData.user.github ? `<span>GitHub: ${reqData.user.github}</span>` : ''}
      </div>
    </header>

    <section>
      <h2 class="text-xl font-semibold text-emerald-400 mb-2">Verified Projects (${reqData.projects.length})</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${reqData.projects.map(p => `
          <div class="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 class="font-bold text-indigo-300">${p.name}</h3>
            <p class="text-xs text-slate-300 mt-1">${p.description}</p>
            <div class="mt-2 flex flex-wrap gap-1">
              ${p.technologies.map(t => `<span class="px-2 py-0.5 bg-indigo-900/60 text-indigo-200 text-xs rounded">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold text-amber-400 mb-2">Verified Skills Matrix</h2>
      <div class="flex flex-wrap gap-2">
        ${reqData.skills.map(s => `<span class="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-medium text-slate-200">${s.name} (${s.score}%)</span>`).join('')}
      </div>
    </section>
  </div>`;

  return {
    htmlSnippet,
    summary: `Portfolio generated for ${reqData.user.name} featuring ${reqData.projects.length} verified projects and ${reqData.skills.length} skills.`
  };
}
