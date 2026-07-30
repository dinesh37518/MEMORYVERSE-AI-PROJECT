import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../types';

const STORAGE_KEY = 'memoryverse_gemini_api_key';

export const getStoredApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const setStoredApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};

interface ContextData {
  user: UserProfile;
  documents: DocumentItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  internships: InternshipItem[];
}

export function buildSystemPrompt(context: ContextData): string {
  const { user, documents, skills, projects, certifications, internships } = context;

  const skillsList = skills.map(s => `${s.name} (${s.category}, Level: ${s.level})`).join(', ');
  const projectsList = projects.map(p => `Project: ${p.name} - ${p.description} [Tech: ${p.technologies.join(', ')}]`).join('\n');
  const certsList = certifications.map(c => `Certificate: ${c.name} issued by ${c.issuingOrganization}`).join('\n');
  const internshipsList = internships.map(i => `Internship: ${i.position} at ${i.company} (${i.duration})`).join('\n');
  const docsList = documents.map(d => `Document: ${d.title} [Category: ${d.category}, Summary: ${d.extractedMetadata.summary}]`).join('\n');

  return `You are MemoryVerse AI, an intelligent personal digital identity assistant and career advisor for ${user.name}.
You have full access to ${user.name}'s verified career vault, documents, and skills matrix.

User Details:
- Name: ${user.name}
- Email: ${user.email}
- Degree/College: ${user.degree} in ${user.department} at ${user.college} (Graduating: ${user.graduationYear})
- Bio: ${user.bio}

User's Skills Matrix:
${skillsList || 'No skills added yet.'}

User's Projects:
${projectsList || 'No projects listed.'}

User's Certifications:
${certsList || 'No certifications listed.'}

User's Internships:
${internshipsList || 'No internships listed.'}

User's Vault Documents:
${docsList || 'No documents uploaded.'}

Instructions:
- Provide accurate, personalized, and encouraging responses tailored to ${user.name}'s profile.
- When answering questions about skills, projects, or documents, reference specific items from the provided profile context.
- Keep responses well-structured with clear markdown formatting, bullet points, and actionable advice.`;
}

export async function generateGeminiResponse(
  prompt: string,
  contextData: ContextData,
  apiKeyOverride?: string
): Promise<{ text: string; isRealAi: boolean; modelUsed?: string }> {
  const apiKey = apiKeyOverride ?? getStoredApiKey();

  if (!apiKey) {
    return {
      text: generateOfflineRAGResponse(prompt, contextData),
      isRealAi: false,
    };
  }

  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-pro'];
  const systemInstruction = buildSystemPrompt(contextData);

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Question: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text: text,
            isRealAi: true,
            modelUsed: model,
          };
        }
      }
    } catch (err) {
      console.warn(`Gemini model ${model} request failed, trying fallback:`, err);
    }
  }

  return {
    text: generateOfflineRAGResponse(prompt, contextData) + "\n\n*(Note: Live Gemini API call was unsuccessful. Displaying contextual offline RAG response. Please verify your Gemini API key.)*",
    isRealAi: false,
  };
}

function generateOfflineRAGResponse(prompt: string, context: ContextData): string {
  const lower = prompt.toLowerCase();
  const { user, skills, projects, certifications, documents } = context;

  if (lower.includes('skill') || lower.includes('know') || lower.includes('expertise')) {
    const topSkills = skills.slice(0, 5).map(s => `• **${s.name}** (${s.level} - ${s.score}% score)`).join('\n');
    return `Based on your MemoryVerse vault, here is your top skills overview for **${user.name}**:\n\n${topSkills}\n\n💡 **AI Recommendation**: You have strong foundation in **${skills[0]?.name || 'Technical Skills'}**. Consider pursuing an advanced certification to boost your readiness score further!`;
  }

  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('build')) {
    const projectList = projects.map(p => `• **${p.name}**: ${p.description} *(Tech: ${p.technologies.join(', ')})*`).join('\n\n');
    return `Here are your highlighted projects found in your portfolio:\n\n${projectList}\n\n🚀 **Next Step**: Adding live demo links and GitHub repositories increases recruiter engagement by over 40%!`;
  }

  if (lower.includes('certif') || lower.includes('credential') || lower.includes('course')) {
    const certList = certifications.map(c => `• **${c.name}** by *${c.issuingOrganization}*`).join('\n');
    return `You have **${certifications.length} verified certification(s)** in your vault:\n\n${certList}\n\n🏆 All credentials are linked into your interactive Knowledge Graph.`;
  }

  if (lower.includes('resume') || lower.includes('cv') || lower.includes('hire')) {
    return `I can help optimize your resume for target positions! You can use the new **📄 AI Resume Builder** tab in the top navigation to view, format, and export your official PDF resume instantly.`;
  }

  return `Hello **${user.name}**! I have analyzed your MemoryVerse digital identity.\n\n` +
    `• **Vault Documents**: ${documents.length} files processed\n` +
    `• **Skills Matrix**: ${skills.length} skills recorded\n` +
    `• **Projects**: ${projects.length} portfolio items\n\n` +
    `You can ask me questions like:\n` +
    `- *"What are my top technical skills?"*\n` +
    `- *"Summarize my project experience for an interview"*\n` +
    `- *"How can I improve my AI readiness score?"*`;
}
