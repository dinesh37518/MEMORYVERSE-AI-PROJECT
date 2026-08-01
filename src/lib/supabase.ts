import { createClient } from '@supabase/supabase-js';
import { UserProfile, DocumentItem } from '../types';

// Read Supabase credentials from environment or provide fallback for local standalone operation
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://witsvurabxsfnznsoydn.supabase.co';
const supabaseUrl = rawUrl.includes('supabase.com/dashboard/project/')
  ? `https://${rawUrl.split('dashboard/project/')[1].replace('/', '')}.supabase.co`
  : rawUrl;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdHN2dXJhYnhzZm56bnNveWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NzE0MDgsImV4cCI6MjEwMTA0NzQwOH0.b9cnBJFkfmrytUcMlo978uNKhP13zvnVd09O1CxmbFk';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes('mock-memoryverse')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

/**
 * Sync Student Profile to Supabase database (Keyed by Register Number reg_no)
 */
export async function syncStudentProfileToSupabase(profile: UserProfile): Promise<boolean> {
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
      github: profile.github || '',
      linkedin: profile.linkedin || '',
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
      console.warn('Supabase profile sync error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('Supabase profile sync exception:', err);
    return false;
  }
}

/**
 * Sync All Registered Students to Supabase database
 */
export async function syncAllRegisteredStudentsToSupabase(students: UserProfile[]): Promise<number> {
  if (!isSupabaseConfigured() || !students || students.length === 0) return 0;

  let successCount = 0;
  for (const s of students) {
    const synced = await syncStudentProfileToSupabase(s);
    if (synced) successCount++;
  }
  return successCount;
}

/**
 * Fetch Student Profile from Supabase by Register Number (reg_no)
 */
export async function fetchStudentByRegNo(regNo: string): Promise<Partial<UserProfile> | null> {
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

/**
 * Sync Uploaded Document Record to Supabase (Keyed by Register Number reg_no)
 */
export async function syncDocumentToSupabase(doc: DocumentItem, regNo: string): Promise<boolean> {
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
      console.warn('Supabase document sync error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Fetch Student Documents from Supabase by Register Number (reg_no)
 */
export async function fetchStudentDocumentsFromSupabase(regNo: string): Promise<DocumentItem[]> {
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
