import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../types';

const STORAGE_KEY = 'memoryverse_gemini_api_key';
const PROMPT_STORAGE_KEY = 'memoryverse_custom_gemini_prompt';

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
  const projectsList = projects.map(p => `• Project "${p.name}": ${p.description} [Tech: ${p.technologies.join(', ')}] (GitHub: ${p.githubLink || 'N/A'})`).join('\n');
  const certsList = certifications.map(c => `• Certificate "${c.name}" issued by ${c.issuingOrganization} (Date: ${c.date}, Credential ID: ${c.credentialId})`).join('\n');
  const internshipsList = internships.map(i => `• Internship: ${i.position} at ${i.company} (${i.duration}) - Skills: ${i.skillsLearned.join(', ')}`).join('\n');
  const docsList = documents.map(d => `• Vault Document: ${d.title} [Category: ${d.category}, File: ${d.fileName}]`).join('\n');

  let basePrompt = `You are MemoryVerse AI, the dedicated Career & Placement Growth Advisor for ${user.name}.
You have full access to ${user.name}'s verified career vault, academic background, certifications, internships, projects, and skills matrix.

STRICT TRUTH CONSTRAINTS:
- ONLY reference real items from ${user.name}'s profile below. NEVER invent fake projects, fake company experiences, or fictitious platform names.
- If the user asks about an experience, certificate, project, or document that DOES NOT exist in their profile data, you MUST reply: "I couldn't find that information in your uploaded documents."
- ${user.name}'s ONLY 2 projects are: 
  1) WhatsApp Agriculture & Polyhouse IoT System (dinesh37518/PROJECT-1)
  2) CAREER BRIDGE Student Record Management System (dinesh37518/PROJECT-2)
- ${user.name}'s verified education: SSLC in May 2022 (86%), HSC in May 2024 (77%), B.E. ECE at VSB Engineering College enrolled 16/09/2024 (Class of 2028).

Candidate Profile Summary:
- Name: ${user.name}
- Email: ${user.email}
- Degree: ${user.degree} (${user.department}) at ${user.college}
- Batch: Class of ${user.graduationYear}
- Compulsory Coding & Professional Links:
  - GitHub: ${user.githubUrl || user.github || 'Not provided'}
  - LinkedIn: ${user.linkedinUrl || user.linkedin || 'Not provided'}
  - LeetCode: ${user.leetcodeUrl || 'https://leetcode.com/u/dinesh37518'}
- Optional Coding Links:
  - GeeksforGeeks: ${user.gfgUrl || 'Not provided'}
  - CodeChef: ${user.codechefUrl || 'Not provided'}

Verified Skills Matrix:
${skillsList || 'No skills listed.'}

Verified Engineering Projects:
${projectsList || 'No projects listed.'}

Verified Industry Certifications:
${certsList || 'No certifications listed.'}

Completed Internships & In-Plant Trainings:
${internshipsList || 'No internships listed.'}

Document Vault Records:
${docsList || 'No documents listed.'}

Core Mission & Instructions:
1. ANSWER ALL CAREER & PLACEMENT QUESTIONS ACCURATELY: Provide concise, realistic, high-impact guidance for campus and off-campus placements at companies like Cisco, Zoho, Infosys, Accenture, TCS, and ECE/IoT engineering firms.
2. TAILORED REASONING: Focus directly on ${user.name}'s real projects, verified certifications, and internships.
3. STRUCTURE & FORMATTING: Use clean, professional Markdown with clear headings and concise bullet points.
4. TONE: Professional, encouraging, realistic, strategic, and placement-oriented.`;

  if (customPrompt) {
    basePrompt += `\n\nUSER'S CUSTOM SYSTEM PROMPT OVERRIDE:\n${customPrompt}\nFollow the above custom instructions strictly!`;
  }

  return basePrompt;
}

export async function generateGeminiResponse(
  prompt: string,
  contextData: ContextData,
  apiKeyOverride?: string
): Promise<{ text: string; isRealAi: boolean; modelUsed?: string }> {
  const apiKey = (apiKeyOverride && apiKeyOverride.trim()) ? apiKeyOverride.trim() : getStoredApiKey();

  if (!apiKey) {
    return {
      text: generateOfflineRAGResponse(prompt, contextData),
      isRealAi: false,
    };
  }

  // Use gemini-1.5-flash first for ultra-fast sub-second responses
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro'];
  const systemInstruction = buildSystemPrompt(contextData);

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nCandidate Query: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 650,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const candidate = data?.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text: text.trim(),
            isRealAi: true,
            modelUsed: model,
          };
        }
      }
    } catch (err) {
      console.warn(`Gemini API attempt for model ${model} skipped:`, err);
    }
  }

  return {
    text: generateOfflineRAGResponse(prompt, contextData),
    isRealAi: false,
  };
}

function generateOfflineRAGResponse(prompt: string, context: ContextData): string {
  const query = prompt.trim().toLowerCase();
  const { user, documents, skills, projects, certifications, internships } = context;

  // 1. Specific Projects
  if (query.includes('project') || query.includes('whatsapp') || query.includes('agri') || query.includes('polyhouse') || query.includes('bridge') || query.includes('record')) {
    const matchedProjects = projects.filter(p => 
      query.includes(p.name.toLowerCase()) || 
      p.technologies.some(t => query.includes(t.toLowerCase())) ||
      query.includes('project')
    );

    let res = `🛠️ **Engineering Projects Summary for ${user.name}**\n\n`;
    const projList = matchedProjects.length > 0 ? matchedProjects : projects;
    projList.forEach(p => {
      res += `### • ${p.name}\n`;
      res += `**Tech Stack**: ${p.technologies.join(', ')}\n`;
      res += `**Description**: ${p.description}\n`;
      if (p.githubLink) res += `**GitHub Repo**: [${p.githubLink}](${p.githubLink})\n`;
      res += `\n`;
    });
    res += `💡 **Recruiter Tip**: Be prepared to explain system architecture, API authentication (JWT), hardware-to-cloud integration, and database query performance.`;
    return res;
  }

  // 2. Certifications & Credentials
  if (query.includes('certif') || query.includes('badge') || query.includes('cisco') || query.includes('infosys') || query.includes('hp') || query.includes('freedom') || query.includes('credential')) {
    let res = `📜 **Verified Industry Certifications for ${user.name}** (${certifications.length} Total):\n\n`;
    certifications.forEach(c => {
      res += `• **${c.name}**\n  - **Issuer**: ${c.issuingOrganization}\n  - **Date**: ${c.date}\n  - **Credential ID**: ${c.credentialId || 'Verified Vault Record'}\n  - **Skills**: ${c.skillsGained.join(', ')}\n\n`;
    });
    return res;
  }

  // 3. Skills Matrix
  if (query.includes('skill') || query.includes('python') || query.includes('angular') || query.includes('java') || query.includes('c++') || query.includes('mysql') || query.includes('stack') || query.includes('matrix') || query.includes('know')) {
    let res = `⚡ **Verified Technical Skills & Competency Matrix for ${user.name}**:\n\n`;
    const techSkills = skills.filter(s => s.category !== 'Soft Skills');
    const softSkills = skills.filter(s => s.category === 'Soft Skills');

    res += `### Technical & Engineering Skills:\n`;
    techSkills.forEach(s => {
      res += `• **${s.name}** (${s.category}) – Level: *${s.level}* (${s.score}% Competency)\n`;
    });

    if (softSkills.length > 0) {
      res += `\n### Soft Skills & Leadership:\n`;
      softSkills.forEach(s => {
        res += `• **${s.name}** – *${s.level}*\n`;
      });
    }
    return res;
  }

  // 4. Internships & Work Experience
  if (query.includes('intern') || query.includes('company') || query.includes('experience') || query.includes('neura') || query.includes('manfree') || query.includes('tneb') || query.includes('work')) {
    let res = `💼 **Industry Internships & Work Experience for ${user.name}** (${internships.length} Completed):\n\n`;
    internships.forEach(i => {
      res += `• **${i.position}** at **${i.company}**\n  - **Duration**: ${i.duration}\n  - **Skills Learned**: ${i.skillsLearned.join(', ')}\n  - **Key Contributions**: ${i.description}\n\n`;
    });
    return res;
  }

  // 5. Education & Academics
  if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('mark') || query.includes('sslc') || query.includes('hsc') || query.includes('gpa') || query.includes('cgpa') || query.includes('vsb') || query.includes('ece') || query.includes('reg') || query.includes('percentage')) {
    return `🎓 **Academic Record & Educational Identity for ${user.name}**\n\n` +
      `• **Degree**: ${user.degree} (${user.department})\n` +
      `• **Institution**: ${user.college}\n` +
      `• **Registration No**: ${user.regNo || '922524106001'}\n` +
      `• **Batch**: Class of ${user.graduationYear} (Year ${user.currentYear || 3}, Section ${user.section || 'B'})\n\n` +
      `### Verified Academic Milestones:\n` +
      `• **HSC (Class XII)**: 77% (May 2024)\n` +
      `• **SSLC (Class X)**: 86% (May 2022)\n` +
      `• **Enrolled Date**: 16/09/2024 at VSB Engineering College, Karur.`;
  }

  // 6. Resume, Profile & Social Links
  if (query.includes('resume') || query.includes('github') || query.includes('linkedin') || query.includes('leetcode') || query.includes('profile') || query.includes('link')) {
    return `📄 **Professional Profile & Coding Links for ${user.name}**\n\n` +
      `• **GitHub**: [https://github.com/dinesh37518](https://github.com/dinesh37518)\n` +
      `• **LeetCode**: [https://leetcode.com/u/dinesh37518](https://leetcode.com/u/dinesh37518)\n` +
      `• **LinkedIn**: [https://linkedin.com/in/dineshkumar-m](https://linkedin.com/in/dineshkumar-m)\n` +
      `• **Email**: ${user.email}\n` +
      `• **Degree**: B.E. ECE at VSB Engineering College (Class of 2028)`;
  }

  // 7. Placements & Technical Interviews
  if (query.includes('placement') || query.includes('interview') || query.includes('salary') || query.includes('ctc') || query.includes('recruiter') || query.includes('job') || query.includes('prepare')) {
    return `🎯 **Placement Action Plan & Recruiter Focus for ${user.name}**\n\n` +
      `### 1. Dual Track Placement Readiness\n` +
      `• **Full Stack Web Track**: Target roles like SDE-1 / Software Developer at companies like **Zoho, Infosys, Accenture, TCS (Digital)**.\n` +
      `  - *Key Evidence*: **CAREER BRIDGE** Web App ([PROJECT-2](https://github.com/dinesh37518/PROJECT-2)), Infosys Springboard Angular Certification, and Neura Global Full Stack Internship.\n\n` +
      `• **IoT & Embedded Track**: Target roles like Technical Engineer at companies like **Cisco, Bosch, L&T Technology Services**.\n` +
      `  - *Key Evidence*: **WhatsApp Agriculture IoT System** ([PROJECT-1](https://github.com/dinesh37518/PROJECT-1)), Cisco IoT Badge, and Manfree Technologies Internship.\n\n` +
      `### 2. High-Frequency Interview Questions for Your Projects:\n` +
      `1. *"Explain how your NodeMCU sensors send real-time data to WhatsApp via cloud webhooks."*\n` +
      `2. *"How does Angular handle state management and REST API communication in CAREER BRIDGE?"*\n` +
      `3. *"How do you design secure relational MySQL tables for multi-tenant student records?"*`;
  }

  // 8. Dynamic Search Fallback across Vault Documents
  const matchedDocs = documents.filter(d => 
    query.split(' ').some(w => w.length > 3 && (d.title.toLowerCase().includes(w) || d.category.toLowerCase().includes(w) || d.fileName.toLowerCase().includes(w)))
  );

  let searchRes = `🤖 **MemoryVerse Assistant Analysis for "${prompt}"**\n\n`;
  if (matchedDocs.length > 0) {
    searchRes += `I found ${matchedDocs.length} matching document(s) in your vault:\n\n`;
    matchedDocs.forEach(d => {
      searchRes += `• **${d.title}** [Category: ${d.category}]\n  - File: \`${d.fileName}\` (Uploaded: ${d.uploadDate})\n`;
    });
    searchRes += `\n`;
  } else {
    searchRes += `Based on ${user.name}'s verified vault data (${documents.length} credentials, ${skills.length} skills, ${projects.length} engineering projects, ${certifications.length} certifications, and ${internships.length} internships):\n\n`;
  }

  searchRes += `**Summary of Profile Assets:**\n`;
  searchRes += `• **Student**: ${user.name} (${user.degree}, ${user.college}, Class of ${user.graduationYear})\n`;
  searchRes += `• **Projects**: WhatsApp Agriculture IoT & CAREER BRIDGE Web App\n`;
  searchRes += `• **Certifications**: Infosys Angular, Cisco IoT, HP LIFE, Freedom AI\n`;
  searchRes += `• **Internships**: Neura Global, Manfree Technologies, TNEB Karur\n\n`;
  searchRes += `Feel free to ask specific questions about your projects, certifications, skills, internships, or placement strategy!`;

  return searchRes;
}
