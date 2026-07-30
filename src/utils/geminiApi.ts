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

  const skillsList = skills.map(s => `${s.name} (${s.category}, Level: ${s.level}, Score: ${s.score}%)`).join(', ');
  const projectsList = projects.map(p => `• Project "${p.name}": ${p.description} [Tech: ${p.technologies.join(', ')}] (GitHub: ${p.githubLink || 'N/A'})`).join('\n');
  const certsList = certifications.map(c => `• Certificate "${c.name}" issued by ${c.issuingOrganization} (Credential ID: ${c.credentialId})`).join('\n');
  const internshipsList = internships.map(i => `• Internship: ${i.position} at ${i.company} (${i.duration}) - Skills: ${i.skillsLearned.join(', ')}`).join('\n');
  const docsList = documents.map(d => `• Vault Document: ${d.title} [Category: ${d.category}]`).join('\n');

  return `You are MemoryVerse AI, the official personal Career & Placement Advisor and Digital Identity Mentor for ${user.name}.
You have direct, real-time access to ${user.name}'s verified career vault, certifications, internships, projects, and skills matrix.

Candidate Profile Summary:
- Candidate Name: ${user.name}
- Email: ${user.email}
- Degree: ${user.degree} (${user.department}) at ${user.college}
- Graduation Batch: Class of ${user.graduationYear} (Joined: 2024, Graduating: 2028)
- SSLC: 2022 (86%) | HSC: 2024 (77%)

Verified Skills Matrix:
${skillsList || 'No skills listed.'}

Verified Projects:
${projectsList || 'No projects listed.'}

Verified Industry Certifications (9 Total):
${certsList || 'No certifications listed.'}

Completed Internships & In-Plant Trainings:
${internshipsList || 'No internships listed.'}

Document Vault Records:
${docsList || 'No documents listed.'}

Primary Guidelines for MemoryVerse AI Agent:
1. CAREER & PLACEMENT FOCUS: Act as an expert career strategist, technical interviewer, and placement mentor. Provide actionable advice for campus placements, software development roles (Angular / Node.js / Full Stack), and Embedded Systems / IoT engineering roles.
2. TAILORED ANSWERS: Always ground your answers in ${user.name}'s verified projects (WhatsApp Agriculture IoT System PROJECT-1 & CAREER BRIDGE PROJECT-2), certifications (Infosys Springboard, Cisco IoT, HP LIFE, Freedom with AI), and internships (Neuro Global, Manfree Technologies, TNEB).
3. MOCK INTERVIEWS & SKILL GAPS: When asked, provide mock technical interview questions (Angular, Node, MySQL, Embedded C, Python), resume improvement tips, and salary negotiation insights.
4. TONE: Professional, encouraging, highly articulate, structured with clear Markdown bullet points, bold headings, and key takeaways.`;
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

  const models = ['gemini-3.6-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
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
                  text: `${systemInstruction}\n\nUser Question / Placement Query: ${prompt}`,
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
      console.warn(`Gemini API request failed for model ${model}:`, err);
    }
  }

  return {
    text: generateOfflineRAGResponse(prompt, contextData) + "\n\n*(Note: Live Gemini API call was unsuccessful. Displaying contextual placement RAG response. Please verify your Gemini API key.)*",
    isRealAi: false,
  };
}

function generateOfflineRAGResponse(prompt: string, context: ContextData): string {
  const lower = prompt.toLowerCase();
  const { user, skills, projects, certifications, internships } = context;

  if (lower.includes('placement') || lower.includes('job') || lower.includes('career') || lower.includes('interview') || lower.includes('salary')) {
    return `🎯 **MemoryVerse Placement & Career Growth Analysis for ${user.name}**\n\n` +
      `Based on your verified B.E. ECE profile at **${user.college}** (Graduation: ${user.graduationYear}):\n\n` +
      `### 1. Dual-Domain Advantage\n` +
      `You possess a rare high-value hybrid profile bridging **Full Stack Web Development** (Angular, Node.js, Express, MySQL) and **Embedded Systems & IoT** (Arduino, Embedded C, Sensors, Cisco IoT).\n\n` +
      `### 2. High Impact Projects to Showcase\n` +
      `• **WhatsApp Agriculture IoT System (PROJECT-1)**: Highlight your Arduino hardware sensor integration and Twilio WhatsApp Bot API automation in IoT engineering interviews.\n` +
      `• **CAREER BRIDGE Web App (PROJECT-2)**: Perfect for Full Stack & Frontend Angular Developer interviews demonstrating role-based auth and Express REST APIs.\n\n` +
      `### 3. Verified Internship Credibility\n` +
      `• **Neuro Global Technologies**: 1-Month Full Stack Development Internship.\n` +
      `• **Manfree Technologies**: Hands-on Embedded Systems & Microcontrollers Training.\n` +
      `• **TNEB Karur**: Substation electrical operations and industrial transformer training.\n\n` +
      `💡 **Target Role Recommendations**: Target **Associate Software Engineer (Angular/Node)**, **IoT Systems Engineer**, or **Embedded Software Developer** with target packages ranging from **₹6 LPA - ₹18 LPA**!`;
  }

  if (lower.includes('skill') || lower.includes('know') || lower.includes('expertise') || lower.includes('strongest')) {
    const topSkills = skills.map(s => `• **${s.name}** (${s.level} — ${s.score}% readiness score)`).join('\n');
    return `Here is your verified Skills Matrix overview for **${user.name}**:\n\n${topSkills}\n\n🏆 **Top Strengths**: Angular, Node.js, Express.js, MySQL, Embedded C, Arduino, and Python Data Analytics!`;
  }

  if (lower.includes('project') || lower.includes('portfolio') || lower.includes('build') || lower.includes('agri') || lower.includes('careerbridge')) {
    const projectList = projects.map(p => `• **${p.name}**: ${p.description}\n  *Tech Stack*: ${p.technologies.join(', ')}\n  *GitHub*: ${p.githubLink || 'dinesh37518'}`).join('\n\n');
    return `Here are your highlighted projects verified in your portfolio:\n\n${projectList}\n\n🚀 Both projects feature live GitHub source code and comprehensive README documentations!`;
  }

  if (lower.includes('certif') || lower.includes('credential') || lower.includes('course') || lower.includes('nptel') || lower.includes('infosys')) {
    const certList = certifications.map(c => `• **${c.name}** issued by *${c.issuingOrganization}* (ID: \`${c.credentialId}\`)`).join('\n');
    return `You have **${certifications.length} verified certifications** stored in your repository vault:\n\n${certList}\n\n🏆 All 9 certificates link directly to your raw GitHub repository (\`dinesh37518/CERTIFICATIONS\`).`;
  }

  return `Hello **${user.name}**! I am your MemoryVerse AI Placement & Career Advisor.\n\n` +
    `I have analyzed your B.E. ECE credentials, ${certifications.length} certifications, ${internships.length} internships, and ${projects.length} engineering projects.\n\n` +
    `Ask me anything about:\n` +
    `- *"How should I prepare for Full Stack / IoT placement interviews?"*\n` +
    `- *"What salary range can I expect for my skill set?"*\n` +
    `- *"How do I highlight my WhatsApp Agriculture IoT project to recruiters?"*\n` +
    `- *"Generate mock technical interview questions for Angular and Embedded C"*`;
}
