import { generateKnowledgeGraph } from '../ai/knowledgeGraph/graphGenerator';
import { UserProfile, SkillItem, ProjectItem, CertificationItem, InternshipItem } from '../models/types';

export class KnowledgeGraphService {
  static getKnowledgeGraph(context: { user: UserProfile; skills?: SkillItem[]; projects?: ProjectItem[]; certs?: CertificationItem[]; internships?: InternshipItem[] }) {
    return generateKnowledgeGraph(context.user, context.skills, context.projects, context.certs, context.internships);
  }
}
