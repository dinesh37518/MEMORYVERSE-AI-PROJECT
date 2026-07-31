import { DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../types';

export interface ResumeAuditReport {
  overallScore: number;
  missingSkillsFromResume: string[];
  omittedProjects: string[];
  omittedCertifications: string[];
  omittedInternships: string[];
  improvementSuggestions: string[];
}

export function auditResumeIntelligence(
  documents: DocumentItem[],
  skills: SkillItem[],
  projects: ProjectItem[],
  certifications: CertificationItem[],
  internships: InternshipItem[]
): ResumeAuditReport {
  const masterResume = documents.find(d => d.category === 'Resume');
  const resumeText = masterResume ? `${masterResume.title} ${masterResume.fileName} ${masterResume.extractedMetadata.summary} ${masterResume.extractedMetadata.skills.join(' ')}`.toLowerCase() : '';

  const missingSkills: string[] = [];
  skills.forEach(s => {
    if (s.score > 70 && !resumeText.includes(s.name.toLowerCase())) {
      missingSkills.push(s.name);
    }
  });

  const omittedProjects: string[] = [];
  projects.forEach(p => {
    if (!resumeText.includes(p.name.toLowerCase())) {
      omittedProjects.push(p.name);
    }
  });

  const omittedCerts: string[] = [];
  certifications.forEach(c => {
    if (!resumeText.includes(c.name.toLowerCase())) {
      omittedCerts.push(`${c.name} (${c.issuingOrganization})`);
    }
  });

  const omittedInternships: string[] = [];
  internships.forEach(i => {
    if (!resumeText.includes(i.company.toLowerCase())) {
      omittedInternships.push(`${i.position} at ${i.company}`);
    }
  });

  const improvementSuggestions: string[] = [
    'Add your verified Cisco Introduction to IoT Certification to the education & certifications section.',
    'Highlight quantifiable metrics in your WhatsApp Agri IoT project (e.g. "Reduced water usage by 35% using automated micro-controllers").',
    'Include live GitHub links (dinesh37518/PROJECT-1 & PROJECT-2) directly next to engineering project titles.',
    'List Infosys Springboard Angular Web Certification to highlight Full-Stack frontend capabilities.'
  ];

  const totalItems = skills.length + projects.length + certifications.length + internships.length;
  const missingCount = missingSkills.length + omittedProjects.length + omittedCerts.length + omittedInternships.length;
  const overallScore = Math.max(70, Math.min(98, Math.round(((totalItems - missingCount / 2) / Math.max(totalItems, 1)) * 100)));

  return {
    overallScore,
    missingSkillsFromResume: Array.from(new Set(missingSkills)).slice(0, 5),
    omittedProjects: omittedProjects.slice(0, 3),
    omittedCertifications: omittedCerts.slice(0, 4),
    omittedInternships: omittedInternships.slice(0, 3),
    improvementSuggestions
  };
}
