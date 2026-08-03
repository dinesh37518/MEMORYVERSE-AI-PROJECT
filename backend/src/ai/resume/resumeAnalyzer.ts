import { UserProfile, DocumentItem, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../../models/types';

interface ResumeAnalysisRequest {
  user: UserProfile;
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  internships: InternshipItem[];
  targetRole?: string;
}

export function analyzeResumeData(reqData: ResumeAnalysisRequest) {
  const targetRole = reqData.targetRole || 'Full Stack Software Engineer / ECE Core Engineer';
  const projectCount = reqData.projects.length;
  const certCount = reqData.certifications.length;
  const internshipCount = reqData.internships.length;

  let score = 70;
  if (projectCount >= 2) score += 10;
  if (certCount >= 1) score += 10;
  if (internshipCount >= 1) score += 10;

  const strengths = [
    `Strong verified background with ${projectCount} hands-on technical project(s).`,
    `Verified credentials backed by ${certCount} professional certification(s).`,
    `Real-world experience with ${internshipCount} industry internship(s).`
  ];

  const improvements = [
    'Quantify project outcomes with measurable metrics (e.g., improved system throughput by 25%).',
    'Include direct links to GitHub repositories and live deployments.',
    'Add relevant keywords matching modern ATS automated screening filters for target job roles.'
  ];

  return {
    score: Math.min(score, 98),
    targetRole,
    strengths,
    improvements,
    atsCompatibility: 'High (Verified Vault Credentials)',
    summary: `Resume score calculated at ${score}% ATS alignment for target position "${targetRole}".`
  };
}
