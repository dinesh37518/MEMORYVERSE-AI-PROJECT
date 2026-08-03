import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem, AchievementItem, AIDigitalTwin } from '../types';

export function generateAIDigitalTwin(
  user: UserProfile,
  documents: DocumentItem[],
  skills: SkillItem[],
  projects: ProjectItem[],
  certifications: CertificationItem[],
  internships: InternshipItem[],
  achievements: AchievementItem[]
): AIDigitalTwin {
  const topSkillNames = skills.slice(0, 8).map(s => s.name);
  const techSkills = skills.filter(s => s.category === 'Technical' || s.category === 'Programming Languages' || s.category === 'Frameworks' || s.category === 'Tools').map(s => s.name);
  const softSkills = skills.filter(s => s.category === 'Soft Skills').map(s => s.name);
  
  if (softSkills.length === 0) {
    softSkills.push('Problem Solving', 'Technical Communication', 'Team Leadership', 'Project Management');
  }

  const projectNames = projects.map(p => p.name);
  const certNames = certifications.map(c => `${c.name} (${c.issuingOrganization})`);
  const internNames = internships.map(i => `${i.position} at ${i.company}`);
  const awardNames = achievements.map(a => a.title);

  const domains: string[] = [];
  if (techSkills.some(s => s.toLowerCase().includes('angular') || s.toLowerCase().includes('stack') || s.toLowerCase().includes('web') || s.toLowerCase().includes('node'))) {
    domains.push('Full Stack Web Development');
  }
  if (techSkills.some(s => s.toLowerCase().includes('iot') || s.toLowerCase().includes('arduino') || s.toLowerCase().includes('embedded') || s.toLowerCase().includes('cisco'))) {
    domains.push('IoT & Embedded Systems Engineering');
  }
  if (techSkills.some(s => s.toLowerCase().includes('data') || s.toLowerCase().includes('python') || s.toLowerCase().includes('mysql'))) {
    domains.push('Data Analytics & Relational Databases');
  }
  if (domains.length === 0) domains.push('Software Engineering', 'Electronics & Communication');

  const professionalSummary = `${user.name} is a highly accomplished ${user.degree} student at ${user.college} (Class of ${user.graduationYear}). Demonstrating verified hands-on expertise across ${domains.join(' and ')}, ${user.name} has completed ${internships.length} industry internships, delivered ${projects.length} major engineering projects, and earned ${certifications.length} verified technical certifications.`;

  const academicSummary = `Enrolled in ${user.degree} (Department of ${user.department}, Reg No: ${user.regNo || 'N/A'}, Section ${user.section || 'A'}, Year ${user.currentYear || 2}) at ${user.college}. Academic record includes strong foundations in C/C++, Java, Embedded Systems, Web Technologies, and Data Communications.`;

  const experienceSummary = internships.length > 0 
    ? `Completed ${internships.length} industry experiences including ${internNames.join('; ')}.`
    : `Active student developer building verified engineering projects.`;

  const achievementSummary = achievements.length > 0
    ? `Recognized for ${awardNames.join(', ')}.`
    : `Holds 9+ verified industry certifications and 3 major project deployments.`;

  const strengthAnalysis = [
    `Strong core proficiency in ${topSkillNames.slice(0, 4).join(', ')}.`,
    `Demonstrated ability to build end-to-end applications (e.g. ${projectNames[0] || 'Web Systems'}).`,
    `Proven industry exposure through ${internships.length} internships and ${certifications.length} certifications.`,
    `Versatile skill matrix bridging hardware (IoT/Arduino) and software (Full Stack/Angular/Node.js).`
  ];

  const growthAnalysis = [
    `Expand Cloud Architecture expertise (AWS/GCP DevOps pipelines).`,
    `Deepen Data Structures & Advanced Algorithm problem-solving for top-tier SDE technical interviews.`,
    `Integrate automated CI/CD testing workflows into future full-stack projects.`
  ];

  return {
    professionalSummary,
    academicSummary,
    technicalSkills: techSkills.length > 0 ? techSkills : ['Full Stack Development', 'Angular', 'Node.js', 'Python', 'Embedded C', 'IoT', 'MySQL'],
    softSkills,
    strongestDomains: domains,
    experienceSummary,
    careerInterests: ['Full Stack Web Developer', 'IoT & Embedded Engineer', 'Software Development Engineer (SDE-1)', 'Data Analyst'],
    strengthAnalysis,
    growthAnalysis,
    achievementSummary,
    generatedAt: new Date().toISOString()
  };
}
