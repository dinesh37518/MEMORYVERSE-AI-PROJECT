import { SkillItem, CertificationItem, ProjectItem, InternshipItem, AIRecommendation } from '../types';

export function generateAIRecommendations(
  skills: SkillItem[],
  certifications: CertificationItem[],
  projects: ProjectItem[],
  internships: InternshipItem[]
): AIRecommendation[] {
  const recommendations: AIRecommendation[] = [];

  const certNames = certifications.map(c => c.name.toLowerCase());
  const projectNames = projects.map(p => p.name.toLowerCase());
  const hasDocker = skills.some(s => s.name.toLowerCase().includes('docker'));
  const hasAWS = certNames.some(c => c.includes('aws') || c.includes('cloud'));
  const hasMicroservices = projectNames.some(p => p.includes('microservice'));

  if (!hasAWS) {
    recommendations.push({
      id: 'rec_aws_cert',
      category: 'Certification',
      title: 'AWS Certified Cloud Practitioner / Developer',
      reason: 'Enhances your Angular & Node.js skills with cloud deployment & serverless infrastructure expertise.',
      impact: 'Essential'
    });
  }

  if (!hasDocker) {
    recommendations.push({
      id: 'rec_docker_course',
      category: 'Course',
      title: 'Docker & Containerization Mastery',
      reason: 'Allows containerizing your Full Stack CAREER BRIDGE application for production DevOps pipelines.',
      impact: 'High'
    });
  }

  if (projects.length < 4) {
    recommendations.push({
      id: 'rec_rag_project',
      category: 'Project',
      title: 'Generative AI Vector Search & RAG Chatbot',
      reason: 'Complements your IoT & Web projects with high-demand Generative AI capabilities.',
      impact: 'High'
    });
  }

  recommendations.push({
    id: 'rec_resume_metrics',
    category: 'Resume',
    title: 'Quantify Engineering Impact on Master CV',
    reason: 'Include performance metrics (e.g. latency, query response time, user adoption) next to project bullet points.',
    impact: 'Medium'
  });

  recommendations.push({
    id: 'rec_github_readmes',
    category: 'Portfolio',
    title: 'Enhance GitHub Repository README Documentation',
    reason: 'Add architectural diagrams and API endpoints to dinesh37518/PROJECT-1 & PROJECT-2.',
    impact: 'Medium'
  });

  return recommendations;
}
