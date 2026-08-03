import { config } from '../../config/env';
import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../../models/types';

interface ContextData {
  user: UserProfile;
  documents?: DocumentItem[];
  skills?: SkillItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  internships?: InternshipItem[];
}

export function buildSystemPrompt(context: ContextData, customPrompt?: string): string {
  const user = context.user || { name: 'Student', email: '', regNo: '' };
  const docs = context.documents || [];
  const skills = context.skills || [];
  const projects = context.projects || [];
  const certs = context.certifications || [];
  const internships = context.internships || [];

  const skillsList = skills.map(s => `${s.name} (${s.category}, Level: ${s.level})`).join(', ');
  const projectsList = projects.map(p => `• Project "${p.name}": ${p.description}`).join('\n');
  const certsList = certs.map(c => `• Certificate "${c.name}" by ${c.issuingOrganization}`).join('\n');
  const internshipsList = internships.map(i => `• Internship: ${i.position} at ${i.company}`).join('\n');
  const docsList = docs.map(d => `• Vault Doc: ${d.title} (${d.category})`).join('\n');

  let basePrompt = `You are MemoryVerse AI, the dedicated Career & Placement Growth Advisor for ${user.name}.
You have full access to ${user.name}'s verified career vault, academic background, certifications, internships, projects, and skills matrix.

STRICT TRUTH CONSTRAINTS:
- ONLY reference real items from ${user.name}'s profile data below. NEVER invent fake projects or fake experiences.
- Maintain a highly professional, encouraging, placement-focused tone.

Candidate Profile Summary:
- Name: ${user.name}
- Email: ${user.email}
- Degree: ${user.degree || 'Engineering'} (${user.department || 'General'}) at ${user.college || 'VSB Engineering College'}
- Registration No: ${user.regNo || 'N/A'}
- Batch: Class of ${user.graduationYear || '2028'}

Verified Skills:
${skillsList || 'No skills listed.'}

Verified Projects:
${projectsList || 'No projects listed.'}

Verified Certifications:
${certsList || 'No certifications listed.'}

Verified Internships:
${internshipsList || 'No internships listed.'}

Verified Documents Vault:
${docsList || 'No documents uploaded.'}`;

  if (customPrompt && customPrompt.trim()) {
    basePrompt += `\n\nCUSTOM USER ADVISORY INSTRUCTIONS:\n${customPrompt.trim()}`;
  }

  return basePrompt;
}

export async function generateGeminiChatResponse(prompt: string, contextData: ContextData, customPrompt?: string): Promise<string> {
  const apiKey = config.geminiApiKey;
  const systemInstruction = buildSystemPrompt(contextData, customPrompt);

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemInstruction}\n\nUser Question: ${prompt}` }
            ]
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          return textResponse;
        }
      }
    } catch (err) {
      console.warn('Gemini REST API error, generating intelligent local fallback:', err);
    }
  }

  // Fallback intelligent career advisor response based on candidate context
  const userName = contextData.user?.name || 'Student';
  const query = prompt.toLowerCase();

  if (query.includes('placement') || query.includes('job') || query.includes('interview')) {
    return `Based on ${userName}'s profile and verified credentials, here is a recommended placement strategy:\n\n1. **Technical Foundation**: Highlight your projects and skills in your resume.\n2. **Aptitude & Coding**: Practice 2-3 LeetCode problems daily and work on core CS topics (Data Structures, DBMS, Networking).\n3. **Mock Interviews**: Prepare structured STAR methodology responses for behavioral and technical rounds.\n4. **Resume Alignment**: Tailor your resume summary based on verified certificates and internships.`;
  }

  if (query.includes('project') || query.includes('iot') || query.includes('whatsapp')) {
    return `For ${userName}'s technical projects, recruiters will focus on architecture, problem statement, technology stack, and real-world impact. Be prepared to explain system integration and database design choices clearly.`;
  }

  return `Hello ${userName}! As your MemoryVerse AI Placement & Career Growth Advisor, I am analyzing your verified profile and credentials. Feel free to ask about placement preparation, resume tailoring, skill gap analysis, or company interview strategies!`;
}
