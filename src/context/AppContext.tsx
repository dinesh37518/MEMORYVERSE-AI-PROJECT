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
  ExperienceLevel,
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
  INITIAL_JOBS
} from '../data/initialData';

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
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: 'student' | 'admin';
  setActiveRole: (role: 'student' | 'admin') => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  auth: { isAuthenticated: boolean; email: string };
  login: (email: string) => void;
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

const STORAGE_KEY = 'memoryverse_ai_state_v5';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');

  // Purge any stale legacy memoryverse storage keys on boot
  useEffect(() => {
    try {
      ['memoryverse_ai_state_v1', 'memoryverse_ai_state_v2', 'memoryverse_ai_state_v3', 'memoryverse_ai_state_v4'].forEach(key => {
        ['user', 'documents', 'skills', 'projects', 'internships', 'certifications', 'achievements', 'timeline', 'notifications'].forEach(sub => {
          localStorage.removeItem(`${key}_${sub}`);
        });
      });
    } catch (e) {}
  }, []);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.graduationYear !== 2028) {
        return { ...parsed, graduationYear: 2028 };
      }
      return parsed;
    }
    return INITIAL_USER;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_documents');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.some((d: any) => d.url && d.url.includes('w3.org'))) {
        return INITIAL_DOCUMENTS;
      }
      return parsed;
    }
    return INITIAL_DOCUMENTS;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [internships, setInternships] = useState<InternshipItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_internships');
    return saved ? JSON.parse(saved) : INITIAL_INTERNSHIPS;
  });

  const [certifications, setCertifications] = useState<CertificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_certifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length < INITIAL_CERTIFICATIONS.length) {
        return INITIAL_CERTIFICATIONS;
      }
      return parsed;
    }
    return INITIAL_CERTIFICATIONS;
  });

  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_timeline');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const sslcItem = parsed.find((t: any) => t.id === 'tl_sslc');
        const hscItem = parsed.find((t: any) => t.id === 'tl_hsc');
        const enrollItem = parsed.find((t: any) => t.id === 'tl_college_enroll');
        if (!sslcItem || sslcItem.year !== 2022 || !hscItem || hscItem.year !== 2024 || !enrollItem || enrollItem.date !== '2024-09-16') {
          return INITIAL_TIMELINE;
        }
        return parsed;
      }
    }
    return INITIAL_TIMELINE;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [nodes, setNodes] = useState<GraphNode[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_nodes');
    return saved ? JSON.parse(saved) : INITIAL_NODES;
  });

  const [edges, setEdges] = useState<GraphEdge[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_edges');
    return saved ? JSON.parse(saved) : INITIAL_EDGES;
  });

  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; email: string }>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, email: '' };
  });
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  // Sync active profile when role switches
  useEffect(() => {
    if (activeRole === 'admin') {
      setUser(ADMIN_USER);
    } else {
      setUser(INITIAL_USER);
    }
  }, [activeRole]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY + '_documents', JSON.stringify(documents));
    localStorage.setItem(STORAGE_KEY + '_skills', JSON.stringify(skills));
    localStorage.setItem(STORAGE_KEY + '_projects', JSON.stringify(projects));
    localStorage.setItem(STORAGE_KEY + '_internships', JSON.stringify(internships));
    localStorage.setItem(STORAGE_KEY + '_certifications', JSON.stringify(certifications));
    localStorage.setItem(STORAGE_KEY + '_achievements', JSON.stringify(achievements));
    localStorage.setItem(STORAGE_KEY + '_timeline', JSON.stringify(timeline));
    localStorage.setItem(STORAGE_KEY + '_notifications', JSON.stringify(notifications));
    localStorage.setItem(STORAGE_KEY + '_nodes', JSON.stringify(nodes));
    localStorage.setItem(STORAGE_KEY + '_edges', JSON.stringify(edges));
    localStorage.setItem(STORAGE_KEY + '_jobs', JSON.stringify(jobs));
  }, [user, documents, skills, projects, internships, certifications, achievements, timeline, notifications, nodes, edges, jobs]);

  // Auth Methods
  const login = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const newAuth = { isAuthenticated: true, email: cleanEmail };
    setAuth(newAuth);
    localStorage.setItem(STORAGE_KEY + '_auth', JSON.stringify(newAuth));
    
    if (cleanEmail === 'adminofmemoryverse@gmail.com') {
      setActiveRole('admin');
      setUser(ADMIN_USER);
    } else {
      setActiveRole('student');
      setUser({ ...INITIAL_USER, email: cleanEmail });
    }
  };

  const logout = () => {
    const newAuth = { isAuthenticated: false, email: '' };
    setAuth(newAuth);
    localStorage.setItem(STORAGE_KEY + '_auth', JSON.stringify(newAuth));
  };

  // Helper function to auto-categorize file by title/content
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

  // Simulated AI Document Processing Engine
  const uploadDocument = async (file: File, overrideCategory?: DocumentCategory): Promise<DocumentItem> => {
    const category = overrideCategory || autoCategorizeFile(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() as FileType || 'pdf';
    
    const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    const inferredSkills: string[] = ['Full Stack Development', 'Problem Solving', 'Data Analytics'];
    
    const newDocId = 'doc_' + Date.now();
    const newDoc: DocumentItem = {
      id: newDocId,
      title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      fileName: file.name,
      fileType: ext,
      fileSize: file.size || 1540000,
      uploadDate: new Date().toISOString().split('T')[0],
      category,
      url: URL.createObjectURL(file),
      hash: 'hash_' + Math.random().toString(36).substring(2, 12),
      status: 'analyzed',
      originalName: file.name,
      extractedMetadata: {
        category,
        organization: 'VSB Engineering College',
        institution: 'Verified Academic Institution',
        certificateName: category === 'Certifications' ? cleanName : undefined,
        issueDate: new Date().toISOString().split('T')[0],
        skills: inferredSkills,
        technologies: ['Angular', 'Node.js', 'Python', 'Arduino'],
        languages: ['Tamil', 'English', 'Hindi'],
        keywords: [category, cleanName, 'Verified Document', 'MemoryVerse AI'],
        summary: `Parsed document "${file.name}". Extracted skills and classified under ${category}.`,
        experienceLevel: 'Advanced' as ExperienceLevel
      }
    };

    setDocuments(prev => [newDoc, ...prev]);

    const newTimelineEvent: TimelineEvent = {
      id: 'tl_' + Date.now(),
      year: new Date().getFullYear(),
      month: new Date().toLocaleString('default', { month: 'short' }),
      date: new Date().toISOString().split('T')[0],
      title: `Uploaded ${cleanName}`,
      category,
      description: `Indexed ${file.name} into Dineshkumar M's knowledge graph.`,
      documentId: newDocId,
      relatedIds: [newDocId],
      type: category === 'Certifications' ? 'cert' : category === 'Internships' ? 'internship' : category === 'Projects' ? 'project' : 'academic',
      impactScore: 90
    };
    setTimeline(prev => [newTimelineEvent, ...prev]);

    const newNode: GraphNode = {
      id: 'n_' + newDocId,
      label: cleanName,
      type: 'document',
      category: category,
      docId: newDocId,
      details: `Document (${category})`,
      x: 350 + Math.floor(Math.random() * 200),
      y: 200 + Math.floor(Math.random() * 200)
    };
    const newEdge: GraphEdge = {
      id: 'e_' + Date.now(),
      source: 'n_dinesh',
      target: 'n_' + newDocId,
      relationship: 'OWNED_BY'
    };
    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);

    const successNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      type: 'ai_analysis_complete',
      title: 'Document Processing Complete',
      message: `Indexed "${file.name}" under ${category}.`,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [successNotif, ...prev]);

    return newDoc;
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    setTimeline(prev => prev.filter(t => t.documentId !== id));
    setNodes(prev => prev.filter(n => n.docId !== id));
    if (previewDoc?.id === id) setPreviewDoc(null);
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
    setUser(prev => {
      const updated = { ...prev, ...updates };
      return updated;
    });
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
    downloadAnchor.setAttribute('download', `MemoryVerse_AI_Export_${user.name.replace(/\s+/g, '_')}_2026.json`);
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

    const successNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      type: 'upload_success',
      title: 'Original File Attached',
      message: `Attached "${file.name}" to document.`,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [successNotif, ...prev]);

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
