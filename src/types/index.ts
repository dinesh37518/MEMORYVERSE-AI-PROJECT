export type DocumentCategory = 
  | 'Certifications' 
  | 'Projects' 
  | 'Skills' 
  | 'Resume' 
  | 'Internships' 
  | 'Academics' 
  | 'Achievements' 
  | 'Research' 
  | 'Portfolio' 
  | 'Employment' 
  | 'Other';

export type FileType = 'pdf' | 'docx' | 'doc' | 'png' | 'jpg' | 'jpeg' | 'zip';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ExtractedMetadata {
  category: DocumentCategory;
  organization?: string;
  institution?: string;
  skills: string[];
  technologies: string[];
  languages: string[];
  certificateName?: string;
  internshipCompany?: string;
  projectName?: string;
  issueDate?: string;
  duration?: string;
  keywords: string[];
  summary: string;
  achievementLevel?: string;
  experienceLevel?: ExperienceLevel;
  credentialId?: string;
  verificationUrl?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  fileType: FileType;
  fileSize: number; // in bytes
  uploadDate: string;
  category: DocumentCategory;
  url: string;
  hash: string;
  status: 'analyzed' | 'processing' | 'error';
  originalName: string;
  extractedMetadata: ExtractedMetadata;
}

export type SkillCategory = 
  | 'Technical' 
  | 'Programming Languages' 
  | 'Frameworks' 
  | 'Tools' 
  | 'Soft Skills' 
  | 'Domain Skills';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: ExperienceLevel;
  score: number; // 1-100
  sourceDocumentIds: string[];
  relatedProjectIds: string[];
  relatedCertificateIds: string[];
  relatedInternshipIds: string[];
  verifiedCount: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  skillsUsed: string[];
  teamSize: number;
  githubLink?: string;
  demoLink?: string;
  reportDocId?: string;
  screenshotUrls: string[];
  connectedCertIds: string[];
  connectedSkillIds: string[];
  date: string;
  category: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  skillsLearned: string[];
  documentIds: string[];
  certificateDocId?: string;
  offerLetterDocId?: string;
  experienceSummary: string;
  location: string;
  status: 'Completed' | 'Ongoing';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrganization: string;
  date: string;
  credentialId: string;
  verificationLink?: string;
  skillsGained: string[];
  documentId: string;
  status: 'Active' | 'Expired';
}

export interface AchievementItem {
  id: string;
  title: string;
  type: 'Award' | 'Competition' | 'Hackathon' | 'Leadership' | 'Club' | 'Academic';
  date: string;
  issuerOrEvent: string;
  description: string;
  documentId?: string;
  impactScore?: number;
}

export type NodeType = 'document' | 'skill' | 'project' | 'internship' | 'certificate' | 'achievement';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  category: string;
  docId?: string;
  score?: number;
  details?: string;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month: string;
  date: string;
  title: string;
  category: DocumentCategory;
  description: string;
  documentId?: string;
  relatedIds: string[];
  type: 'cert' | 'internship' | 'project' | 'academic' | 'achievement';
  impactScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  contextDocIds?: string[];
  contextSkillIds?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  college: string;
  department: string;
  degree: string;
  graduationYear: number;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;
  bio: string;
  role: 'student' | 'admin';
  createdAt: string;
  profileCompletionPercent: number;
}

export interface AppNotification {
  id: string;
  type: 'upload_success' | 'ai_analysis_complete' | 'duplicate_warning' | 'timeline_update' | 'resume_generated';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface StorageMetrics {
  totalDocuments: number;
  storageUsedBytes: number;
  storageLimitBytes: number;
  categoryCounts: Record<DocumentCategory, number>;
  monthlyUploads: { month: string; count: number }[];
}
