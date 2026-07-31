import { DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem, AchievementItem } from '../types';

export interface SemanticSearchResult {
  query: string;
  matchedCategory: string;
  summaryText: string;
  matchingDocuments: DocumentItem[];
  matchingSkills: SkillItem[];
  matchingProjects: ProjectItem[];
  matchingCertifications: CertificationItem[];
  matchingInternships: InternshipItem[];
  matchingAchievements: AchievementItem[];
}

export function performSemanticSearch(
  query: string,
  documents: DocumentItem[],
  skills: SkillItem[],
  projects: ProjectItem[],
  certifications: CertificationItem[],
  internships: InternshipItem[],
  achievements: AchievementItem[]
): SemanticSearchResult {
  const q = query.toLowerCase().trim();

  // Intent classification based on natural language queries
  const isCertQuery = q.includes('cert') || q.includes('certification') || q.includes('course') || q.includes('infosys') || q.includes('cisco') || q.includes('hp');
  const isProjectQuery = q.includes('project') || q.includes('agri') || q.includes('career bridge') || q.includes('whatsapp') || q.includes('system') || q.includes('code');
  const isSkillQuery = q.includes('skill') || q.includes('python') || q.includes('angular') || q.includes('java') || q.includes('node') || q.includes('c++') || q.includes('embedded') || q.includes('iot');
  const isResumeQuery = q.includes('resume') || q.includes('cv') || q.includes('biodata') || q.includes('master');
  const isInternQuery = q.includes('intern') || q.includes('training') || q.includes('experience') || q.includes('company') || q.includes('neura') || q.includes('manfree') || q.includes('tneb');
  const isAchievementQuery = q.includes('achiev') || q.includes('award') || q.includes('winner') || q.includes('honor') || q.includes('ideathon');
  const isPortfolioQuery = q.includes('portfolio') || q.includes('summary') || q.includes('bio') || q.includes('about');

  let matchedCategory = 'General Semantic Match';
  if (isCertQuery) matchedCategory = 'Certifications & Industry Badges';
  else if (isProjectQuery) matchedCategory = 'Engineering Projects';
  else if (isSkillQuery) matchedCategory = 'Skills & Technical Competencies';
  else if (isResumeQuery) matchedCategory = 'Resume & Master CV Vault';
  else if (isInternQuery) matchedCategory = 'Internships & In-Plant Trainings';
  else if (isAchievementQuery) matchedCategory = 'Honors & Achievements';
  else if (isPortfolioQuery) matchedCategory = 'Portfolio & Identity Overview';

  const matchingDocuments = documents.filter(d => 
    d.title.toLowerCase().includes(q) ||
    d.fileName.toLowerCase().includes(q) ||
    d.category.toLowerCase().includes(q) ||
    d.extractedMetadata?.skills?.some(s => s.toLowerCase().includes(q)) ||
    d.extractedMetadata?.summary?.toLowerCase().includes(q)
  );

  const matchingSkills = skills.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.level.toLowerCase().includes(q)
  );

  const matchingProjects = projects.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.technologies.some(t => t.toLowerCase().includes(q))
  );

  const matchingCertifications = certifications.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.issuingOrganization.toLowerCase().includes(q) ||
    c.skillsGained.some(s => s.toLowerCase().includes(q))
  );

  const matchingInternships = internships.filter(i => 
    i.company.toLowerCase().includes(q) ||
    i.position.toLowerCase().includes(q) ||
    i.experienceSummary.toLowerCase().includes(q) ||
    i.skillsLearned.some(s => s.toLowerCase().includes(q))
  );

  const matchingAchievements = achievements.filter(a => 
    a.title.toLowerCase().includes(q) ||
    a.issuerOrEvent.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  );

  // Synthesize semantic natural language explanation
  let summaryText = `Found results related to "${query}" under ${matchedCategory}.`;
  if (matchingDocuments.length > 0) {
    summaryText += ` Matched ${matchingDocuments.length} document(s) in your vault.`;
  }
  if (matchingProjects.length > 0) {
    summaryText += ` Matched ${matchingProjects.length} engineering project(s).`;
  }
  if (matchingCertifications.length > 0) {
    summaryText += ` Matched ${matchingCertifications.length} verified certification(s).`;
  }

  return {
    query,
    matchedCategory,
    summaryText,
    matchingDocuments,
    matchingSkills,
    matchingProjects,
    matchingCertifications,
    matchingInternships,
    matchingAchievements
  };
}
