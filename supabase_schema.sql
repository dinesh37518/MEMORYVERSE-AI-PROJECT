-- MEMORYVERSE AI – SUPABASE DATABASE SCHEMA (FEATURE 15)
-- Run this SQL in your Supabase SQL Editor to initialize all tables, RLS policies, and triggers.

-- 1. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  reg_no TEXT,
  department TEXT,
  section TEXT,
  current_year INT,
  degree TEXT,
  college TEXT,
  graduation_year INT,
  phone TEXT,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Document Vault Records Table
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  hash TEXT NOT NULL,
  status TEXT DEFAULT 'analyzed',
  extracted_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Verified Skills Matrix Table
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  score INT NOT NULL DEFAULT 85,
  source_document_ids TEXT[],
  verified_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Engineering Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[],
  skills_used TEXT[],
  team_size INT DEFAULT 1,
  github_link TEXT,
  demo_link TEXT,
  screenshot_urls TEXT[],
  date DATE DEFAULT CURRENT_DATE,
  category TEXT DEFAULT 'Full Stack',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Internships Table
CREATE TABLE IF NOT EXISTS public.internships (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  skills_learned TEXT[],
  experience_summary TEXT,
  location TEXT,
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE NOT NULL,
  credential_id TEXT,
  verification_link TEXT,
  skills_gained TEXT[],
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  achievement_date DATE NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  impact_score INT DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Digital Journey Timeline Table
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  year INT NOT NULL,
  month TEXT NOT NULL,
  event_date DATE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  document_id TEXT,
  related_ids TEXT[],
  event_type TEXT NOT NULL,
  impact_score INT DEFAULT 85,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Knowledge Graph Nodes & Edges Tables
CREATE TABLE IF NOT EXISTS public.knowledge_graph_nodes (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  node_type TEXT NOT NULL,
  category TEXT NOT NULL,
  doc_id TEXT,
  details TEXT,
  pos_x INT,
  pos_y INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.knowledge_graph_edges (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  target TEXT NOT NULL,
  relationship TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI Chat History & Turn Memory
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  suggested_actions TEXT[],
  context_doc_ids TEXT[]
);

-- 11. System Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Enablement
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Basic User Ownership RLS Policies
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);
