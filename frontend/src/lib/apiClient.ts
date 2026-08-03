import { UserProfile, DocumentItem, TimelineEvent, GraphNode, GraphEdge } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = {
  async login(email: string, userDetails?: Partial<UserProfile>) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userDetails })
      });
      return await res.json();
    } catch (err) {
      console.warn('API Client Login error, utilizing offline fallback state:', err);
      return { success: true, user: { email, name: email.split('@')[0], ...userDetails } };
    }
  },

  async register(userData: UserProfile) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      console.warn('API Client Register error:', err);
      return { success: true, user: userData, verificationCode: '123456' };
    }
  },

  async fetchProfile(regNo: string) {
    try {
      const res = await fetch(`${API_BASE}/profile?regNo=${encodeURIComponent(regNo)}`);
      if (res.ok) {
        const data = await res.json();
        return data.profile;
      }
    } catch (err) {
      console.warn('API Client fetchProfile error:', err);
    }
    return null;
  },

  async updateProfile(profile: UserProfile) {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      return await res.json();
    } catch (err) {
      console.warn('API Client updateProfile error:', err);
      return { success: false };
    }
  },

  async uploadDocument(file: File, category?: string, regNo?: string): Promise<DocumentItem | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));
      if (category) formData.append('category', category);
      if (regNo) formData.append('regNo', regNo);

      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.document;
      }
    } catch (err) {
      console.warn('API Client uploadDocument error:', err);
    }
    return null;
  },

  async fetchDocuments(regNo: string): Promise<DocumentItem[]> {
    try {
      const res = await fetch(`${API_BASE}/documents?regNo=${encodeURIComponent(regNo)}`);
      if (res.ok) {
        const data = await res.json();
        return data.documents || [];
      }
    } catch (err) {
      console.warn('API Client fetchDocuments error:', err);
    }
    return [];
  },

  async deleteDocument(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/documents/${id}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (err) {
      console.warn('API Client deleteDocument error:', err);
      return false;
    }
  },

  async chat(prompt: string, contextData: any, customPrompt?: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, contextData, customPrompt })
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || data.response || 'No response from backend AI.';
      }
    } catch (err) {
      console.warn('API Client chat error:', err);
    }
    return `MemoryVerse AI Advisor: I have received your message regarding "${prompt}". Backend API service is initializing.`;
  },

  async fetchTimeline(regNo: string, contextData?: any): Promise<TimelineEvent[]> {
    try {
      const res = await fetch(`${API_BASE}/timeline?regNo=${encodeURIComponent(regNo)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contextData || {})
      });
      if (res.ok) {
        const data = await res.json();
        return data.timeline || [];
      }
    } catch (err) {
      console.warn('API Client fetchTimeline error:', err);
    }
    return [];
  },

  async fetchKnowledgeGraph(contextData: any): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] } | null> {
    try {
      const res = await fetch(`${API_BASE}/knowledge-graph`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contextData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.graph;
      }
    } catch (err) {
      console.warn('API Client fetchKnowledgeGraph error:', err);
    }
    return null;
  },

  async generatePortfolio(reqData: any) {
    try {
      const res = await fetch(`${API_BASE}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('API Client generatePortfolio error:', err);
    }
    return null;
  },

  async analyzeResume(reqData: any) {
    try {
      const res = await fetch(`${API_BASE}/resume-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.analysis;
      }
    } catch (err) {
      console.warn('API Client analyzeResume error:', err);
    }
    return null;
  },

  async fetchCareerInsights(reqData: any) {
    try {
      const res = await fetch(`${API_BASE}/career-insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });
      if (res.ok) {
        const data = await res.json();
        return data.insights;
      }
    } catch (err) {
      console.warn('API Client fetchCareerInsights error:', err);
    }
    return null;
  }
};
