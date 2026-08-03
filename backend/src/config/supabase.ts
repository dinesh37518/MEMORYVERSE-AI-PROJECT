import { createClient } from '@supabase/supabase-js';
import { config } from './env';

export const isSupabaseConfigured = (): boolean => {
  return (
    !!config.supabaseUrl &&
    !!config.supabaseAnonKey &&
    !config.supabaseUrl.includes('mock-memoryverse')
  );
};

export const supabase = createClient(
  config.supabaseUrl, 
  config.supabaseServiceRoleKey || config.supabaseAnonKey, 
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);
