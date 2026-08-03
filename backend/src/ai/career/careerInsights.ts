import { UserProfile, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../../models/types';

interface CareerInsightsRequest {
  user: UserProfile;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  internships: InternshipItem[];
  targetDomain?: string;
}

export function generateCareerInsightsData(reqData: CareerInsightsRequest) {
  const targetDomain = reqData.targetDomain || 'Software Development & Embedded IoT Engineering';
  const existingSkills = reqData.skills.map(s => s.name.toLowerCase());

  const recommendedSkills = [
    'System Architecture',
    'Docker & Containerization',
    'REST & GraphQL API Design',
    'Data Structures & Algorithms (Advanced)',
    'Cloud Computing (AWS / GCP)'
  ].filter(s => !existingSkills.includes(s.toLowerCase()));

  const actionItems = [
    'Complete at least 1 complex end-to-end full-stack or IoT capstone project.',
    'Earn an industry-recognized cloud certificate (AWS Certified Developer / Cloud Practitioner).',
    'Solve 50+ medium LeetCode questions focusing on Dynamic Programming and Graphs.'
  ];

  return {
    targetDomain,
    skillMatchPercentage: Math.min(65 + reqData.skills.length * 5, 95),
    recommendedSkills,
    actionItems,
    marketDemand: 'Very High',
    roadmap: [
      { step: 1, title: 'Foundational Mastery', detail: 'Consolidate core languages (TypeScript/C++) and Data Structures.' },
      { step: 2, title: 'Project Verification', detail: 'Deploy live projects with clean documentation and unit tests.' },
      { step: 3, title: 'Company Specific Prep', detail: 'Practice aptitude, technical interview rounds, and mock interviews.' }
    ]
  };
}
