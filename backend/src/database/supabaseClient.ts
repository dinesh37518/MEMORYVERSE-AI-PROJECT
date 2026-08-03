import { supabase, isSupabaseConfigured } from '../config/supabase';
import { UserProfile, DocumentItem } from '../models/types';

export class DatabaseService {
  static async upsertProfile(profile: UserProfile): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const payload = {
        reg_no: profile.regNo,
        email: profile.email.toLowerCase(),
        name: profile.name,
        department: profile.department,
        section: profile.section || 'A',
        current_year: profile.currentYear || 1,
        degree: profile.degree || 'B.E.',
        college: profile.college || 'VSB Engineering College, Karur',
        graduation_year: profile.graduationYear || 2028,
        phone: profile.phone || '',
        github: profile.github || profile.githubUrl || '',
        linkedin: profile.linkedin || profile.linkedinUrl || '',
        portfolio: profile.portfolio || '',
        bio: profile.bio || '',
        avatar_url: profile.avatarUrl || '',
        role: profile.role || 'student',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'reg_no' });

      if (error) {
        console.warn('Database error upserting profile:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Database exception upserting profile:', err);
      return false;
    }
  }

  static async getProfileByRegNo(regNo: string): Promise<Partial<UserProfile> | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('reg_no', regNo)
        .single();

      if (error || !data) return null;

      return {
        regNo: data.reg_no,
        email: data.email,
        name: data.name,
        department: data.department,
        section: data.section,
        currentYear: data.current_year,
        degree: data.degree,
        college: data.college,
        graduationYear: data.graduation_year,
        phone: data.phone,
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        role: data.role
      };
    } catch (err) {
      return null;
    }
  }

  static async upsertDocument(doc: DocumentItem, regNo: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const payload = {
        id: doc.id,
        reg_no: regNo,
        title: doc.title,
        file_name: doc.fileName,
        file_type: doc.fileType,
        file_size: doc.fileSize,
        upload_date: doc.uploadDate,
        category: doc.category,
        storage_url: doc.url || '',
        hash: doc.hash || 'hash_' + Date.now(),
        status: doc.status || 'analyzed',
        extracted_metadata: doc.extractedMetadata || {}
      };

      const { error } = await supabase
        .from('documents')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.warn('Database error upserting document:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getDocumentsByRegNo(regNo: string): Promise<DocumentItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('reg_no', regNo);

      if (error || !data) return [];

      return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        fileName: d.file_name,
        originalName: d.file_name,
        fileType: d.file_type,
        fileSize: d.file_size,
        uploadDate: d.upload_date,
        category: d.category,
        url: d.storage_url,
        hash: d.hash,
        status: d.status,
        extractedMetadata: d.extracted_metadata || {}
      }));
    } catch (err) {
      return [];
    }
  }

  static async deleteDocumentById(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Database error deleting document:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
