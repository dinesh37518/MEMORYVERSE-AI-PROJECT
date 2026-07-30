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
  const certsList = certifications.map(c => `• Certificate "${c.name}" issued by ${c.issuingOrganization} (Date: ${c.date}, Credential ID: ${c.credentialId})`).join('\n');
  const internshipsList = internships.map(i => `• Internship: ${i.position} at ${i.company} (${i.duration}) - Skills: ${i.skillsLearned.join(', ')}`).join('\n');
  const docsList = documents.map(d => `• Vault Document: ${d.title} [Category: ${d.category}, File: ${d.fileName}]`).join('\n');

  return `You are MemoryVerse AI, the dedicated Career & Placement Growth Advisor for ${user.name}.
You have full access to ${user.name}'s verified career vault, academic background, certifications, internships, projects, and skills matrix.

STRICT TRUTH CONSTRAINTS:
- ONLY reference real items from ${user.name}'s profile below. NEVER invent fake projects, fake company experiences, or fictitious platform names like "SkillBridge".
- ${user.name}'s ONLY 2 projects are: 
  1) WhatsApp Agriculture & Polyhouse IoT System (dinesh37518/PROJECT-1)
  2) CAREER BRIDGE Student Record Management System (dinesh37518/PROJECT-2)
- ${user.name}'s verified education: SSLC in May 2022 (86%), HSC in May 2024 (77%), B.E. ECE at VSB Engineering College enrolled 16/09/2024 (Class of 2028).

Candidate Profile Summary:
- Name: ${user.name}
- Email: ${user.email}
- Degree: ${user.degree} (${user.department}) at ${user.college}
- Batch: Class of ${user.graduationYear}

Verified Skills Matrix:
${skillsList || 'No skills listed.'}

Verified Engineering Projects:
${projectsList || 'No projects listed.'}

Verified Industry Certifications (9 Total):
${certsList || 'No certifications listed.'}

Completed Internships & In-Plant Trainings:
${internshipsList || 'No internships listed.'}

Document Vault Records:
${docsList || 'No documents listed.'}

Core Mission & Instructions:
1. ANSWER ALL CAREER & PLACEMENT QUESTIONS ACCURATELY: Provide concise, realistic, high-impact guidance for campus and off-campus placements at companies like Cisco, Zoho, Infosys, Accenture, TCS, and ECE/IoT engineering firms.
2. TAILORED REASONING: Focus directly on ${user.name}'s real projects (PROJECT-1 and PROJECT-2), verified certifications (Infosys Angular 14/07/2025, Cisco IoT 30/11/2025, HP LIFE 31/08/2025, Freedom AI 02/11/2024), and internships (Neura Global 30.06.2026, Manfree Technologies 22.06.2026, TNEB Karur).
3. STRUCTURE & FORMATTING: Use clean, professional Markdown with clear headings and concise bullet points. Avoid fake boilerplate tables or hallucinated company roles.
4. TONE: Professional, encouraging, realistic, strategic, and placement-oriented.`;
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
  const lower = prompt.toLowerCase();
  const { user } = context;

  // 1. Placements, Salary, Companies
  if (lower.includes('placement') || lower.includes('job') || lower.includes('company') || lower.includes('mnc') || lower.includes('salary') || lower.includes('ctc') || lower.includes('achieve') || lower.includes('target')) {
    return `🎯 **Placement Action Plan for ${user.name}**\n\n` +
      `As a **B.E. ECE** student at **${user.college}** (Class of ${user.graduationYear}):\n\n` +
      `### 1. Target Recruitment Streams & Roles\n` +
      `• **Full Stack Web Development Track**: Target roles like Software Development Engineer (SDE-1) or Systems Engineer at companies such as **Zoho, Infosys, Accenture, TCS (Digital), and Cognizant**.\n` +
      `  - *Key Asset*: **CAREER BRIDGE** Web App ([PROJECT-2](https://github.com/dinesh37518/PROJECT-2)), Infosys Springboard Angular Web Certification, and Neura Global Full Stack Internship.\n\n` +
      `• **IoT & Embedded Engineering Track**: Target roles like Technical Solutions Engineer or Embedded Engineer at companies like **Cisco, Robert Bosch, and L&T Technology Services**.\n` +
      `  - *Key Asset*: **WhatsApp Agriculture & Polyhouse IoT System** ([PROJECT-1](https://github.com/dinesh37518/PROJECT-1)), Cisco Introduction to IoT Certification & Badge, Manfree Technologies Training, and TNEB Substation Training.\n\n` +
      `### 2. High-Impact Preparation Steps\n` +
      `1. **Data Structures & Problem Solving**: Master core DSA (Arrays, Strings, Hash Maps, Searching/Sorting) using C/C++ or Python.\n` +
      `2. **Project Demonstrations**: Be prepared to explain the full architecture, API security (JWT/RBAC), and hardware-to-cloud integration of your 2 projects.\n` +
      `3. **Core ECE & Web Fundamentals**: Revise Angular state management, Node.js REST APIs, MySQL query performance, and Embedded C interrupts/protocols.`;
  }

  // 2. Full Stack / Web Development
  if (lower.includes('full stack') || lower.includes('angular') || lower.includes('node') || lower.includes('express') || lower.includes('web') || lower.includes('mysql')) {
    return `💻 **Full Stack Web Development Roadmap for ${user.name}**\n\n` +
      `### Verified Credentials:\n` +
      `• **Infosys Springboard Angular Web Certification** (Issued July 14, 2025)\n` +
      `• **Neura Global Full Stack Internship** (Completed June 30, 2026)\n` +
      `• **CAREER BRIDGE Web Application** ([dinesh37518/PROJECT-2](https://github.com/dinesh37518/PROJECT-2))\n\n` +
      `### Key Interview Focus Areas:\n` +
      `1. Angular Components, Services, RxJS Observables, and Dependency Injection.\n` +
      `2. Node.js Express REST API endpoints, JWT authentication, and MySQL relational schemas.\n` +
      `3. Responsive frontend UI design using HTML5, CSS3, and modern framework principles.`;
  }

  // 3. IoT & Embedded Systems
  if (lower.includes('iot') || lower.includes('embedded') || lower.includes('arduino') || lower.includes('cisco') || lower.includes('tneb') || lower.includes('manfree')) {
    return `⚡ **IoT & Embedded Systems Roadmap for ${user.name}**\n\n` +
      `### Verified Credentials:\n` +
      `• **Cisco Introduction to IoT Certification & Badge** (Issued Nov 30, 2025)\n` +
      `• **Manfree Technologies Embedded Systems Internship** (Completed June 22, 2026)\n` +
      `• **TNEB Karur Substation In-Plant Training** (Completed Dec 2025)\n` +
      `• **WhatsApp Agriculture IoT System** ([dinesh37518/PROJECT-1](https://github.com/dinesh37518/PROJECT-1))\n\n` +
      `### Key Technical Preparation:\n` +
      `1. Sensor circuit interfacing with Arduino UNO and NodeMCU microcontrollers.\n` +
      `2. Embedded C programming, hardware interrupts, and communication protocols (UART/SPI/I2C).\n` +
      `3. Telemetry data flow from microcontrollers to cloud APIs and WhatsApp messaging services.`;
  }

  // 4. General Fallback
  return `🚀 **MemoryVerse Placement Guidance for ${user.name}**\n\n` +
    `Welcome ${user.name}! Based on your verified ECE academic profile at ${user.college} (Class of ${user.graduationYear}):\n\n` +
    `• **Projects**: WhatsApp Agriculture IoT (PROJECT-1) & CAREER BRIDGE Web App (PROJECT-2)\n` +
    `• **Certifications**: Infosys Angular (14/07/2025), Cisco IoT (30/11/2025), HP LIFE (31/08/2025), Freedom AI (02/11/2024)\n` +
    `• **Internships**: Neura Global, Manfree Technologies, TNEB Karur\n\n` +
    `How can I assist you with your placement goals, technical interview preparation, or project presentations today?`;
}
