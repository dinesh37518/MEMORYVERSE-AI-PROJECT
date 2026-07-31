import { createClient } from '@supabase/supabase-js';

// Read Supabase credentials from environment or provide fallback for local standalone operation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-memoryverse.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-memoryverse-ai';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!import.meta.env.VITE_SUPABASE_URL &&
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes('mock-memoryverse')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
