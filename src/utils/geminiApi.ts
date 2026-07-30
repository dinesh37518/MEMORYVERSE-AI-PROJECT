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

  return `You are MemoryVerse AI, the dedicated Career & Placement Growth Advisor for ${user.name}.
You have full access to ${user.name}'s verified career vault, academic background, certifications, internships, projects, and skills matrix.

Candidate Profile Summary:
- Name: ${user.name}
- Email: ${user.email}
- Degree: ${user.degree} (${user.department}) at ${user.college}
- Batch: Class of ${user.graduationYear} (SSLC 2022: 86% | HSC 2024: 77%)

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
1. ANSWER ALL CAREER & PLACEMENT QUESTIONS: Provide comprehensive, expert answers to ANY question about career growth, campus placement strategies, technical interview preparation, salary packages, resume building, project presentations, and company selection (TCS, Wipro, Infosys, Zoho, Accenture, Cisco, Google, IoT startups).
2. TAILORED REASONING: Ground every answer in ${user.name}'s verified credentials—specifically highlighting the WhatsApp Agriculture IoT System (PROJECT-1), CAREER BRIDGE Student Management System (PROJECT-2), Infosys Angular Full Stack Certification, Cisco IoT Certification, Neuro Global Internship, Manfree Embedded Training, and TNEB Substation Training.
3. STRUCTURE & FORMATTING: Use professional Markdown with bold headings (###), bullet points, technical code snippets where helpful, and clear "Action Steps for Candidate".
4. TONE: Encouraging, authoritative, highly articulate, strategic, and placement-oriented.`;
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
                  text: `${systemInstruction}\n\nCandidate Question / Placement Query: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1800,
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
    text: generateOfflineRAGResponse(prompt, contextData),
    isRealAi: false,
  };
}

function generateOfflineRAGResponse(prompt: string, context: ContextData): string {
  const lower = prompt.toLowerCase();
  const { user, skills, projects, certifications, internships } = context;

  // 1. Placements, Salary, Companies
  if (lower.includes('placement') || lower.includes('job') || lower.includes('company') || lower.includes('salary') || lower.includes('ctc') || lower.includes('package') || lower.includes('hire')) {
    return `🎯 **Placement & Career Growth Strategy for ${user.name}**\n\n` +
      `Based on your verified **B.E. ECE** degree at **${user.college}** (Graduation: ${user.graduationYear}):\n\n` +
      `### 1. Target Salary Brackets & Roles\n` +
      `• **Full Stack Web Developer (Angular/Node.js)**: Target CTC **₹6.5 LPA – ₹14 LPA** (Companies: Zoho, TCS Digital, Cognizant Digital, Tech Startups).\n` +
      `• **IoT / Embedded Systems Engineer**: Target CTC **₹6 LPA – ₹12 LPA** (Companies: Cisco, Robert Bosch, L&T Technology Services, Ather Energy).\n\n` +
      `### 2. Strategic Placement Advantages\n` +
      `• **Dual Tech Matrix**: You possess both frontend/backend web skills and hardware IoT circuit expertise.\n` +
      `• **Verified Credentials**: Highlight your 9 certifications (Infosys Angular, Cisco IoT, HP LIFE, Freedom AI) and 3 internships (Neuro Global, Manfree Technologies, TNEB).\n\n` +
      `### 3. Immediate Action Plan\n` +
      `1. Practice System Design for **CAREER BRIDGE (PROJECT-2)** Angular & Express API.\n` +
      `2. Prepare live demonstration steps for **WhatsApp Agriculture IoT (PROJECT-1)**.\n` +
      `3. Revise Data Structures, Algorithm basics, and MySQL query optimization.`;
  }

  // 2. Full Stack / Web Development / Code
  if (lower.includes('full stack') || lower.includes('angular') || lower.includes('node') || lower.includes('express') || lower.includes('web') || lower.includes('react') || lower.includes('mysql')) {
    return `💻 **Full Stack Web Development Career Plan for ${user.name}**\n\n` +
      `### 1. Verified Core Competencies\n` +
      `• **Frontend**: Angular SPA, TypeScript, RxJS, HTML5, CSS3, Responsive Design.\n` +
      `• **Backend & Database**: Node.js REST APIs, Express.js middleware, MySQL relational database architecture.\n` +
      `• **Credentials**: Infosys Springboard Angular Web Certification, Neuro Global Full Stack Internship.\n\n` +
      `### 2. Flagship Project to Present\n` +
      `**CAREER BRIDGE Web Application** ([dinesh37518/PROJECT-2](https://github.com/dinesh37518/PROJECT-2)):\n` +
      `• Demonstrates role-based student placement management, JWT authorization, and dynamic search.\n\n` +
      `### 3. Interview Focus Areas\n` +
      `• Angular Dependency Injection, RxJS Observables vs Promises.\n` +
      `• Node.js Event Loop, Express async error handling, and SQL indexing.`;
  }

  // 3. IoT, Embedded Systems, Hardware
  if (lower.includes('iot') || lower.includes('embedded') || lower.includes('arduino') || lower.includes('sensor') || lower.includes('circuit') || lower.includes('cisco') || lower.includes('tneb')) {
    return `⚡ **IoT & Embedded Systems Career Plan for ${user.name}**\n\n` +
      `### 1. Verified Hardware & IoT Stack\n` +
      `• **Hardware**: Arduino UNO, Sensor Circuit Interfacing, MATLAB, Substation Power Grids.\n` +
      `• **Software**: Embedded C, Cisco IoT Networking Protocol, Twilio WhatsApp Bot API.\n` +
      `• **Experience**: Cisco Introduction to IoT Certification, Manfree Technologies Training, TNEB Karur Training.\n\n` +
      `### 2. Flagship Project to Showcase\n` +
      `**WhatsApp Agriculture & Polyhouse IoT Monitoring** ([dinesh37518/PROJECT-1](https://github.com/dinesh37518/PROJECT-1)):\n` +
      `• Real-time soil moisture and climate monitoring with automated WhatsApp alert notifications.\n\n` +
      `### 3. Recommended Interview Topics\n` +
      `• UART / I2C / SPI communication protocols, interrupt handling in Embedded C, and sensor calibration.`;
  }

  // 4. Interview Preparation & Questions
  if (lower.includes('interview') || lower.includes('question') || lower.includes('mock') || lower.includes('round') || lower.includes('hr')) {
    return `🎤 **Placement Interview Preparation Guide for ${user.name}**\n\n` +
      `### Top 5 Technical Questions Recruiters Will Ask You:\n\n` +
      `1. **"Explain the architecture of your WhatsApp Agriculture IoT project."**\n` +
      `   *Answer Pitch*: "I interfaced soil & temperature sensors with Arduino UNO in Embedded C, forwarding data via HTTP to a cloud service that triggers Twilio WhatsApp API notifications."\n\n` +
      `2. **"How did you implement state management in Angular for CAREER BRIDGE?"**\n` +
      `   *Answer Pitch*: "I used RxJS BehaviorSubjects and services to manage authenticated user state reactively across component views."\n\n` +
      `3. **"What is the difference between synchronous and asynchronous Node.js execution?"**\n` +
      `4. **"How do you secure Express.js REST APIs for campus recruitment portals?"**\n` +
      `5. **"What practical experience did you gain at Manfree Technologies and TNEB?"**`;
  }

  // 5. General Fallback Response
  return `🚀 **MemoryVerse Career Growth Analysis for ${user.name}**\n\n` +
    `Hello ${user.name}! I have analyzed your complete digital identity:\n\n` +
    `• **Education**: ${user.degree} (${user.department}) at ${user.college} (Class of ${user.graduationYear})\n` +
    `• **Industry Certifications**: 9 Verified Certificates (Infosys Springboard, Cisco IoT, HP LIFE, Freedom AI)\n` +
    `• **Internships**: Neuro Global (Full Stack), Manfree Technologies (Embedded), TNEB Karur (Substation)\n` +
    `• **Featured Repositories**: PROJECT-1 (IoT Agriculture) & PROJECT-2 (CareerBridge)\n\n` +
    `Ask me any question regarding your placement strategy, mock interview prep, salary expectations, or project presentation!`;
}
