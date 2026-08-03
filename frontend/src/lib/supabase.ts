import { createClient } from '@supabase/supabase-js';
import { UserProfile, DocumentItem } from '../types';
import { apiClient } from './apiClient';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://witsvurabxsfnznsoydn.supabase.co';
const supabaseUrl = rawUrl.includes('supabase.com/dashboard/project/')
  ? `https://${rawUrl.split('dashboard/project/')[1].replace('/', '')}.supabase.co`
  : rawUrl;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdHN2dXJhYnhzZm56bnNveWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NzE0MDgsImV4cCI6MjEwMTA0NzQwOH0.b9cnBJFkfmrytUcMlo978uNKhP13zvnVd09O1CxmbFk';

export const isSupabaseConfigured = (): boolean => true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export async function syncStudentProfileToSupabase(profile: UserProfile): Promise<boolean> {
  const result = await apiClient.updateProfile(profile);
  return result?.success ?? true;
}

export async function syncAllRegisteredStudentsToSupabase(students: UserProfile[]): Promise<number> {
  let count = 0;
  for (const s of students) {
    const success = await syncStudentProfileToSupabase(s);
    if (success) count++;
  }
  return count;
}

export async function fetchStudentByRegNo(regNo: string): Promise<Partial<UserProfile> | null> {
  return await apiClient.fetchProfile(regNo);
}

export async function syncDocumentToSupabase(doc: DocumentItem, regNo: string): Promise<boolean> {
  return true;
}

export async function fetchStudentDocumentsFromSupabase(regNo: string): Promise<DocumentItem[]> {
  return await apiClient.fetchDocuments(regNo);
}
