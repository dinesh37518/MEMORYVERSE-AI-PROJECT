export type DocumentCategory = 
  | 'academic'
  | 'certification'
  | 'project'
  | 'internship'
  | 'identity'
  | 'resume'
  | 'other';

export type FileType = 'pdf' | 'image' | 'doc' | 'text' | 'archive' | 'unknown';

export interface UserProfile {
  name: string;
  email: string;
  regNo: string;
  department: string;
  section?: string;
  currentYear?: number;
  degree?: string;
  college?: string;
  graduationYear?: number;
  phone?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  bio?: string;
  avatarUrl?: string;
  role?: 'student' | 'admin';
  skillsOverview?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
}

export interface ExtractedMetadata {
  summary?: string;
  issuingAuthority?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  skillsExtracted?: string[];
  gradeScore?: string;
  verificationStatus?: 'verified' | 'pending' | 'flagged';
  authenticityScore?: number;
  confidenceScore?: number;
  keyTopics?: string[];
  suggestedTags?: string[];
  extractedTextPreview?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  originalName: string;
  fileType: FileType;
  fileSize: number;
  uploadDate: string;
  category: DocumentCategory;
  url?: string;
  hash?: string;
  status: 'analyzing' | 'analyzed' | 'failed' | 'verified';
  extractedMetadata?: ExtractedMetadata;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain' | 'tool';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  score: number; // 0 - 100
  verifiedByDocId?: string;
  lastUpdated: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  githubLink?: string;
  liveLink?: string;
  verifiedDocId?: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  skillsLearned: string[];
  certificateDocId?: string;
  verifiedStatus: 'verified' | 'pending';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrganization: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  documentId?: string;
  skillsVerified: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  date: string;
  position: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: DocumentCategory | 'milestone' | 'academic';
  relatedDocId?: string;
  impactScore?: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'skill' | 'project' | 'certification' | 'internship' | 'document' | 'user';
  val: number;
  color?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
