import { GraphNode, GraphEdge, SkillItem, ProjectItem, CertificationItem, InternshipItem, UserProfile } from '../../models/types';

export function generateKnowledgeGraph(
  user: UserProfile,
  skills: SkillItem[] = [],
  projects: ProjectItem[] = [],
  certs: CertificationItem[] = [],
  internships: InternshipItem[] = []
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: 'user_root', label: user.name || 'Candidate', type: 'user', val: 25, color: '#6366f1' }
  ];
  const edges: GraphEdge[] = [];

  skills.forEach(skill => {
    const sId = `skill_${skill.id}`;
    nodes.push({ id: sId, label: skill.name, type: 'skill', val: 12, color: '#3b82f6' });
    edges.push({ source: 'user_root', target: sId, label: 'possesses' });
  });

  projects.forEach(proj => {
    const pId = `proj_${proj.id}`;
    nodes.push({ id: pId, label: proj.name, type: 'project', val: 18, color: '#10b981' });
    edges.push({ source: 'user_root', target: pId, label: 'built' });
  });

  certs.forEach(cert => {
    const cId = `cert_${cert.id}`;
    nodes.push({ id: cId, label: cert.name, type: 'certification', val: 15, color: '#f59e0b' });
    edges.push({ source: 'user_root', target: cId, label: 'holds' });
  });

  internships.forEach(intern => {
    const iId = `intern_${intern.id}`;
    nodes.push({ id: iId, label: `${intern.position} @ ${intern.company}`, type: 'internship', val: 20, color: '#ec4899' });
    edges.push({ source: 'user_root', target: iId, label: 'completed' });
  });

  return { nodes, edges };
}
