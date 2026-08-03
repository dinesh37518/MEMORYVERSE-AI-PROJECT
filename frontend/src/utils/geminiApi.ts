import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../types';
import { apiClient } from '../lib/apiClient';

const STORAGE_KEY = 'memoryverse_gemini_api_key';
const PROMPT_STORAGE_KEY = 'memoryverse_custom_gemini_prompt';

export const getStoredApiKey = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEY) || 'backend_secured_key';
  }
  return 'backend_secured_key';
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

export const getStoredCustomPrompt = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(PROMPT_STORAGE_KEY) || '';
  }
  return '';
};

export const setStoredCustomPrompt = (prompt: string): void => {
  if (typeof window !== 'undefined') {
    if (prompt) {
      localStorage.setItem(PROMPT_STORAGE_KEY, prompt.trim());
    } else {
      localStorage.removeItem(PROMPT_STORAGE_KEY);
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
  const customPrompt = getStoredCustomPrompt();

  const skillsList = skills.map(s => `${s.name} (${s.category}, Level: ${s.level}, Score: ${s.score}%)`).join(', ');
  const projectsList = projects.map(p => `• Project "${p.name}": ${p.description}`).join('\n');
  const certsList = certifications.map(c => `• Certificate "${c.name}" issued by ${c.issuingOrganization}`).join('\n');
  const internshipsList = internships.map(i => `• Internship: ${i.position} at ${i.company}`).join('\n');
  const docsList = documents.map(d => `• Vault Document: ${d.title}`).join('\n');

  let basePrompt = `You are MemoryVerse AI, the dedicated Career & Placement Growth Advisor for ${user.name}.
Candidate Profile: ${user.name} (${user.department}, Class of ${user.graduationYear || 2028}).
Skills: ${skillsList}
Projects: ${projectsList}
Certifications: ${certsList}
Internships: ${internshipsList}
Vault Docs: ${docsList}`;

  if (customPrompt) {
    basePrompt += `\n\nCUSTOM INSTRUCTIONS:\n${customPrompt}`;
  }

  return basePrompt;
}

export async function generateGeminiResponse(
  prompt: string,
  contextData: ContextData,
  apiKeyOverride?: string
): Promise<{ text: string; isRealAi: boolean; modelUsed?: string }> {
  try {
    const text = await apiClient.chat(prompt, contextData, getStoredCustomPrompt());
    return {
      text,
      isRealAi: true,
      modelUsed: 'gemini-backend-service'
    };
  } catch (err) {
    return {
      text: `MemoryVerse AI: Analyzing "${prompt}" based on your verified credentials.`,
      isRealAi: false
    };
  }
}
