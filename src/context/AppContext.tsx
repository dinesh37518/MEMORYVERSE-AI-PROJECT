import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  DocumentItem, 
  SkillItem, 
  ProjectItem, 
  InternshipItem, 
  CertificationItem, 
  AchievementItem, 
  TimelineEvent, 
  AppNotification, 
  GraphNode, 
  GraphEdge,
  DocumentCategory,
  FileType,
  JobApplication
} from '../types';
import { 
  INITIAL_USER, 
  ADMIN_USER,
  INITIAL_DOCUMENTS, 
  INITIAL_SKILLS, 
  INITIAL_PROJECTS, 
  INITIAL_INTERNSHIPS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_TIMELINE, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_NODES, 
  INITIAL_EDGES,
  INITIAL_JOBS,
  DEFAULT_STUDENT_AVATAR
} from '../data/initialData';
import { syncStudentProfileToSupabase, syncDocumentToSupabase } from '../lib/supabase';

interface RegisteredStudentSummary extends UserProfile {
  docsCount: number;
  certsCount: number;
  projectsCount: number;
  internshipsCount: number;
}

interface AppContextType {
  user: UserProfile;
  documents: DocumentItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  internships: InternshipItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  timeline: TimelineEvent[];
  notifications: AppNotification[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  jobs: JobApplication[];
  registeredStudents: RegisteredStudentSummary[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: 'student' | 'admin';
  setActiveRole: (role: 'student' | 'admin') => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  auth: { isAuthenticated: boolean; email: string };
  login: (email: string, userDetails?: Partial<UserProfile>) => void;
  logout: () => void;
  
  // Handlers
  uploadDocument: (file: File, overrideCategory?: DocumentCategory) => Promise<DocumentItem>;
  deleteDocument: (id: string) => void;
  renameDocument: (id: string, newTitle: string) => void;
  updateDocumentCategory: (id: string, newCategory: DocumentCategory) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  exportAllUserData: () => void;
  resetToDefaultData: () => void;

  // Admin student inspection by RegNo
  inspectStudentByRegNo: (regNo: string) => void;

  // Job Tracker Handlers
  addJob: (job: Omit<JobApplication, 'id' | 'appliedDate'>) => void;
  updateJobStatus: (id: string, status: JobApplication['status']) => void;
  deleteJob: (id: string) => void;
  
  // Selected Document detail modal
  previewDoc: DocumentItem | null;
  setPreviewDoc: (doc: DocumentItem | null) => void;
  attachOriginalFileToDocument: (docId: string, file: File) => Promise<DocumentItem>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORES_PREFIX = 'memoryverse_user_store_v10_';
const REGISTRY_KEY = 'memoryverse_registered_students_v10';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');

  const [auth, setAuth] = useState<{ isAuthenticated: boolean; email: string }>({ 
    isAuthenticated: false, 
    email: '' 
  });

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [internships, setInternships] = useState<InternshipItem[]>(INITIAL_INTERNSHIPS);
  const [certifications, setCertifications] = useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(INITIAL_EDGES);
  const [jobs, setJobs] = useState<JobApplication[]>(INITIAL_JOBS);

  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudentSummary[]>(() => {
    const saved = localStorage.getItem(REGISTRY_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        ...INITIAL_USER,
        docsCount: INITIAL_DOCUMENTS.length,
        certsCount: INITIAL_CERTIFICATIONS.length,
        projectsCount: INITIAL_PROJECTS.length,
        internshipsCount: INITIAL_INTERNSHIPS.length
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Load store for specific user email
  const loadUserStore = (email: string, userDetails?: Partial<UserProfile>) => {
    const cleanEmail = email.trim().toLowerCase();
    const storeKey = USER_STORES_PREFIX + cleanEmail;
    const saved = localStorage.getItem(storeKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const mergedUser = { ...parsed.user, ...userDetails };
        setUser(mergedUser);
        setDocuments(parsed.documents || []);
        setSkills(parsed.skills || []);
        setProjects(parsed.projects || []);
        setInternships(parsed.internships || []);
        setCertifications(parsed.certifications || []);
        setAchievements(parsed.achievements || []);
        setTimeline(parsed.timeline || []);
        setNotifications(parsed.notifications || []);
        setNodes(parsed.nodes || []);
        setEdges(parsed.edges || []);
        setJobs(parsed.jobs || []);
        return;
      } catch (e) {}
    }

    // Default for demo student (Dineshkumar M)
    if (cleanEmail === 'dineshguru0609@gmail.com' || cleanEmail.includes('dineshkumar')) {
      const dineshUser = { ...INITIAL_USER, email: cleanEmail, ...userDetails };
      setUser(dineshUser);
      setDocuments(INITIAL_DOCUMENTS);
      setSkills(INITIAL_SKILLS);
      setProjects(INITIAL_PROJECTS);
      setInternships(INITIAL_INTERNSHIPS);
      setCertifications(INITIAL_CERTIFICATIONS);
      setAchievements(INITIAL_ACHIEVEMENTS);
      setTimeline(INITIAL_TIMELINE);
      setNotifications(INITIAL_NOTIFICATIONS);
      setNodes(INITIAL_NODES);
      setEdges(INITIAL_EDGES);
      setJobs(INITIAL_JOBS);
    } else {
      // BRAND NEW STUDENT (e.g. Angu abhishek)!
      // Clean, empty vault asking student to upload their separated certificates
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: userDetails?.name || 'New Student',
        email: cleanEmail,
        regNo: userDetails?.regNo || `922524106${Math.floor(100 + Math.random() * 899)}`,
        section: userDetails?.section || 'A',
        currentYear: userDetails?.currentYear || 1,
        department: userDetails?.department || 'ECE',
        degree: `B.E. – ${userDetails?.department || 'ECE'}`,
        college: 'VSB Engineering College, Karur',
        graduationYear: 2028,
        avatarUrl: userDetails?.avatarUrl || DEFAULT_STUDENT_AVATAR,
        phone: '+91 9000000000',
        github: '',
        linkedin: '',
        portfolio: '',
        bio: `${userDetails?.department || 'ECE'} student at VSB Engineering College. Upload your separated certificates & marksheets to build your AI Digital Twin.`,
        role: 'student',
        createdAt: new Date().toISOString(),
        profileCompletionPercent: 30,
        ...userDetails
      };

      setUser(newUser);
      setDocuments([]);
      setSkills([]);
      setProjects([]);
      setInternships([]);
      setCertifications([]);
      setAchievements([]);
      setTimeline([]);
      setNotifications([
        {
          id: 'notif_welcome',
          type: 'ai_analysis_complete',
          title: `Welcome to MemoryVerse AI, ${newUser.name}!`,
          message: 'Your isolated student vault is ready. Please upload your separated certificates and marksheets.',
          date: new Date().toISOString(),
          read: false
        }
      ]);
      setNodes([]);
      setEdges([]);
      setJobs([]);
    }
  };

  // Sync state to LocalStorage for active student
  useEffect(() => {
    if (!auth.isAuthenticated || activeRole === 'admin') return;

    const cleanEmail = user.email.trim().toLowerCase();
    const storeKey = USER_STORES_PREFIX + cleanEmail;
    
    const studentStoreData = {
      user,
      documents,
      skills,
      projects,
      internships,
      certifications,
      achievements,
      timeline,
      notifications,
      nodes,
      edges,
      jobs
    };

    localStorage.setItem(storeKey, JSON.stringify(studentStoreData));

    // Update global registered students registry for Admin view
    setRegisteredStudents(prev => {
      const existingIdx = prev.findIndex(s => s.email.toLowerCase() === cleanEmail || (s.regNo && s.regNo === user.regNo));
      const summary: RegisteredStudentSummary = {
        ...user,
        docsCount: documents.length,
        certsCount: certifications.length,
        projectsCount: projects.length,
        internshipsCount: internships.length
      };

      let updatedList: RegisteredStudentSummary[];
      if (existingIdx >= 0) {
        updatedList = [...prev];
        updatedList[existingIdx] = summary;
      } else {
        updatedList = [summary, ...prev];
      }

      localStorage.setItem(REGISTRY_KEY, JSON.stringify(updatedList));
      return updatedList;
    });

    // Cloud sync to Supabase database (indexed by reg_no)
    syncStudentProfileToSupabase(user);

  }, [user, documents, skills, projects, internships, certifications, achievements, timeline, notifications, nodes, edges, jobs, auth.isAuthenticated, activeRole]);

  // Auth Methods
  const login = (email: string, userDetails?: Partial<UserProfile>) => {
    const cleanEmail = email.trim().toLowerCase();
    const newAuth = { isAuthenticated: true, email: cleanEmail };
    setAuth(newAuth);
    localStorage.setItem('memoryverse_auth_session', JSON.stringify(newAuth));

    if (cleanEmail === 'vsbkaruredu@gmail.com' || userDetails?.role === 'admin') {
      setActiveRole('admin');
      setUser({ ...ADMIN_USER, email: cleanEmail, ...userDetails });
    } else {
      setActiveRole('student');
      loadUserStore(cleanEmail, userDetails);
    }
  };

  const logout = () => {
    const newAuth = { isAuthenticated: false, email: '' };
    setAuth(newAuth);
    localStorage.removeItem('memoryverse_auth_session');
  };

  // Inspect student by RegNo for Admin
  const inspectStudentByRegNo = (regNo: string) => {
    const student = registeredStudents.find(s => s.regNo === regNo);
    if (student) {
      loadUserStore(student.email, student);
      // Keep activeRole as admin while inspecting in Admin Portal
    }
  };

  // Auto-categorize file
  const autoCategorizeFile = (filename: string): DocumentCategory => {
    const lower = filename.toLowerCase();
    if (lower.includes('cert') || lower.includes('nptel') || lower.includes('infosys') || lower.includes('course')) return 'Certifications';
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('biodata')) return 'Resume';
    if (lower.includes('intern') || lower.includes('training') || lower.includes('completion')) return 'Internships';
    if (lower.includes('project') || lower.includes('agri') || lower.includes('careerbridge')) return 'Projects';
    if (lower.includes('paper') || lower.includes('research')) return 'Research';
    if (lower.includes('transcript') || lower.includes('marksheet') || lower.includes('hsc') || lower.includes('sslc')) return 'Academics';
    if (lower.includes('award') || lower.includes('ideathon') || lower.includes('hackathon') || lower.includes('winner')) return 'Achievements';
    if (lower.includes('portfolio')) return 'Portfolio';
    return 'Certifications';
  };

  // Upload document for current logged-in student
  const uploadDocument = async (file: File, overrideCategory?: DocumentCategory): Promise<DocumentItem> => {
    const category = overrideCategory || autoCategorizeFile(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() as FileType || 'pdf';
    
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    
    // Smart Skill & Technology Extractor based on filename
    const lowerName = cleanName.toLowerCase();
    const inferredSkills: string[] = [];
    if (lowerName.includes('python')) inferredSkills.push('Python');
    if (lowerName.includes('java')) inferredSkills.push('Java Programming');
    if (lowerName.includes('c++') || lowerName.includes('cpp')) inferredSkills.push('C++');
    if (lowerName.includes('angular')) inferredSkills.push('Angular Framework');
    if (lowerName.includes('react')) inferredSkills.push('React.js');
    if (lowerName.includes('node')) inferredSkills.push('Node.js & Express');
    if (lowerName.includes('sql') || lowerName.includes('dbms')) inferredSkills.push('Database Systems & SQL');
    if (lowerName.includes('aws') || lowerName.includes('cloud')) inferredSkills.push('AWS Cloud Computing');
    if (lowerName.includes('cisco') || lowerName.includes('network')) inferredSkills.push('Cisco Computer Networks');
    if (lowerName.includes('iot') || lowerName.includes('embedded') || lowerName.includes('arduino')) inferredSkills.push('IoT & Embedded Microcontrollers');
    if (lowerName.includes('ml') || lowerName.includes('ai') || lowerName.includes('machine')) inferredSkills.push('Machine Learning & AI');
    if (inferredSkills.length === 0) {
      inferredSkills.push('Technical Competency', 'Problem Solving', `${category} Expertise`);
    }
    
    let fileDataUrl = '';
    try {
      fileDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string || '');
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
    } catch (e) {
      fileDataUrl = '';
    }

    const newDoc: DocumentItem = {
      id: 'doc_' + Date.now(),
      title: cleanName,
      fileName: file.name,
      originalName: file.name,
      fileType: ext,
      fileSize: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      category,
      url: fileDataUrl || URL.createObjectURL(file),
      hash: 'hash_' + Math.random().toString(36).substring(2, 10),
      status: 'analyzed',
      extractedMetadata: {
        category,
        organization: user.college,
        institution: user.college,
        skills: inferredSkills,
        technologies: inferredSkills.slice(0, 3),
        languages: ['English', 'Tamil'],
        certificateName: category === 'Certifications' ? cleanName : undefined,
        projectName: category === 'Projects' ? cleanName : undefined,
        issueDate: new Date().toISOString().split('T')[0],
        keywords: [category, cleanName, user.department],
        summary: `Preserved original ${ext.toUpperCase()} document "${file.name}" for ${user.name} (RegNo: ${user.regNo}). Analyzed and indexed by MemoryVerse AI Parser.`
      }
    };

    setDocuments(prev => [newDoc, ...prev]);

    // Add extracted skills to Skills Matrix
    const newSkillItems: SkillItem[] = inferredSkills.map((skName, i) => ({
      id: `sk_${Date.now()}_${i}`,
      name: skName,
      category: 'Technical',
      level: 'Advanced',
      score: 85 + (i * 3) % 15,
      sourceDocumentIds: [newDoc.id],
      relatedProjectIds: [],
      relatedCertificateIds: [newDoc.id],
      relatedInternshipIds: [],
      verifiedCount: 1
    }));
    setSkills(prev => [...newSkillItems, ...prev]);

    // If it's a Certification, add to Certifications array
    if (category === 'Certifications' || lowerName.includes('cert') || lowerName.includes('nptel') || lowerName.includes('infosys')) {
      const newCert: CertificationItem = {
        id: 'cert_' + Date.now(),
        name: cleanName,
        issuingOrganization: user.college || 'Industry Authority',
        date: new Date().toISOString().split('T')[0],
        credentialId: `CRED-${newDoc.hash.substring(0, 10).toUpperCase()}`,
        verificationLink: newDoc.url,
        skillsGained: inferredSkills,
        documentId: newDoc.id
      };
      setCertifications(prev => [newCert, ...prev]);
    }

    // Generate notification
    const newNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      type: 'upload_success',
      title: 'Document Uploaded & AI Parsed',
      message: `Document "${file.name}" analyzed for ${user.name}. ${inferredSkills.length} new skills indexed into Vault.`,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Recalculate completion
    const newDocCount = documents.length + 1;
    const newCompletion = Math.min(100, Math.max(35, Math.round(newDocCount * 12)));
    setUser(prev => ({ ...prev, profileCompletionPercent: newCompletion }));

    // Update registered students registry for Admin view
    setRegisteredStudents(prev => {
      return prev.map(s => {
        if (s.email.toLowerCase() === user.email.toLowerCase() || s.regNo === user.regNo) {
          return {
            ...s,
            docsCount: newDocCount,
            certsCount: category === 'Certifications' ? (s.certsCount || 0) + 1 : (s.certsCount || 0)
          };
        }
        return s;
      });
    });

    // Sync uploaded document record to Supabase database (indexed by reg_no)
    syncDocumentToSupabase(newDoc, user.regNo);

    return newDoc;
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    setSkills(prev => prev.filter(s => !s.sourceDocumentIds.includes(id)));
    if (previewDoc?.id === id) {
      setPreviewDoc(null);
    }
  };

  const renameDocument = (id: string, newTitle: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, title: newTitle } : d));
  };

  const updateDocumentCategory = (id: string, newCategory: DocumentCategory) => {
    setDocuments(prev => prev.map(d => d.id === id ? { 
      ...d, 
      category: newCategory, 
      extractedMetadata: { ...d.extractedMetadata, category: newCategory } 
    } : d));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const exportAllUserData = () => {
    const data = {
      user,
      documents,
      skills,
      projects,
      internships,
      certifications,
      achievements,
      timeline,
      exportDate: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `MemoryVerse_AI_${user.name.replace(/\s+/g, '_')}_${user.regNo || 'RegNo'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const resetToDefaultData = () => {
    setUser(INITIAL_USER);
    setDocuments(INITIAL_DOCUMENTS);
    setSkills(INITIAL_SKILLS);
    setProjects(INITIAL_PROJECTS);
    setInternships(INITIAL_INTERNSHIPS);
    setCertifications(INITIAL_CERTIFICATIONS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setTimeline(INITIAL_TIMELINE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    setJobs(INITIAL_JOBS);
    localStorage.clear();
  };

  const attachOriginalFileToDocument = async (docId: string, file: File): Promise<DocumentItem> => {
    const ext = file.name.split('.').pop()?.toLowerCase() as FileType || 'pdf';
    const blobUrl = URL.createObjectURL(file);

    let updatedDoc: DocumentItem | null = null;

    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        updatedDoc = {
          ...d,
          url: blobUrl,
          fileName: file.name,
          originalName: file.name,
          fileType: ext,
          fileSize: file.size,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        return updatedDoc;
      }
      return d;
    }));

    if (previewDoc && previewDoc.id === docId && updatedDoc) {
      setPreviewDoc(updatedDoc);
    }

    return updatedDoc || documents.find(d => d.id === docId)!;
  };

  const addJob = (newJob: Omit<JobApplication, 'id' | 'appliedDate'>) => {
    const created: JobApplication = {
      ...newJob,
      id: `job_${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [created, ...prev]);
  };

  const updateJobStatus = (id: string, status: JobApplication['status']) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user,
      documents,
      skills,
      projects,
      internships,
      certifications,
      achievements,
      timeline,
      notifications,
      nodes,
      edges,
      jobs,
      registeredStudents,
      activeTab,
      setActiveTab,
      activeRole,
      setActiveRole,
      globalSearchQuery,
      setGlobalSearchQuery,
      auth,
      login,
      logout,
      uploadDocument,
      deleteDocument,
      renameDocument,
      updateDocumentCategory,
      updateProfile,
      markNotificationAsRead,
      clearAllNotifications,
      exportAllUserData,
      resetToDefaultData,
      inspectStudentByRegNo,
      addJob,
      updateJobStatus,
      deleteJob,
      previewDoc,
      setPreviewDoc,
      attachOriginalFileToDocument
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
