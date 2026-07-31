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
  features?: string[];
  readmeContent?: string;
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

export const DEPARTMENTS = [
  'CSE',
  'EEE',
  'ECE',
  'IT',
  'MECH',
  'CIVIL',
  'AIDS',
  'AIML',
  'CCE',
  'CSBS',
  'Chemical',
  'Biotech',
  'Bio Medical'
] as const;

export type DepartmentType = typeof DEPARTMENTS[number] | string;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  regNo?: string;
  section?: string;
  currentYear?: number; // 1, 2, 3, 4
  avatarUrl: string;
  college: string;
  department: DepartmentType;
  degree: string;
  graduationYear: number;
  phone: string;
  github: string;
  linkedin: string;
  portfolio: string;

  // Compulsory Coding & Professional Links
  githubUrl?: string; // Compulsory
  linkedinUrl?: string; // Compulsory
  leetcodeUrl?: string; // Compulsory

  // Optional Coding Profiles
  gfgUrl?: string; // Optional (GeeksforGeeks)
  codechefUrl?: string; // Optional (CodeChef)

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

export type JobStage = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  status: JobStage;
  appliedDate: string;
  jobUrl?: string;
  requiredSkills: string[];
  notes?: string;
}

export type NavigationTab = 
  | 'dashboard' 
  | 'digital-twin'
  | 'career-insights'
  | 'portfolio-generator'
  | 'vault' 
  | 'graph' 
  | 'timeline' 
  | 'skills' 
  | 'projects' 
  | 'internships' 
  | 'certifications' 
  | 'achievements' 
  | 'ai-assistant' 
  | 'search' 
  | 'analytics' 
  | 'resume' 
  | 'jobs' 
  | 'profile' 
  | 'admin';

export interface AIDigitalTwin {
  professionalSummary: string;
  academicSummary: string;
  technicalSkills: string[];
  softSkills: string[];
  strongestDomains: string[];
  experienceSummary: string;
  careerInterests: string[];
  strengthAnalysis: string[];
  growthAnalysis: string[];
  achievementSummary: string;
  generatedAt: string;
}

export type CareerTargetRole = 
  | 'AI Engineer' 
  | 'Software Engineer' 
  | 'Data Scientist' 
  | 'Embedded Engineer' 
  | 'Cyber Security Engineer' 
  | 'Full Stack Developer';

export interface CareerGapAnalysis {
  targetRole: CareerTargetRole;
  readinessScore: number;
  currentSkills: string[];
  missingSkills: string[];
  recommendedCertifications: { title: string; provider: string; reason: string }[];
  recommendedProjects: { title: string; tech: string[]; description: string }[];
  learningRoadmap: { phase: string; title: string; details: string; duration: string }[];
}

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number; // 0 - 100
}

export interface DocumentHealthCheck {
  id: string;
  docId: string;
  fileName: string;
  status: 'healthy' | 'warning' | 'error';
  issues: string[];
}

export interface AIRecommendation {
  id: string;
  category: 'Course' | 'Certification' | 'Project' | 'Internship' | 'Resume' | 'Portfolio';
  title: string;
  reason: string;
  impact: 'High' | 'Medium' | 'Essential';
}

export interface GeneratedPortfolio {
  professionalBio: string;
  portfolioSummary: string;
  projectSummaries: { name: string; description: string; tech: string[] }[];
  linkedinAbout: string;
  resumeSummary: string;
  careerObjective: string;
}

