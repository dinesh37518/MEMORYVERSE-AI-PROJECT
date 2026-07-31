-- MEMORYVERSE AI – SUPABASE DATABASE SCHEMA (MULTI-TENANT REGISTER NUMBER IDENTIFIED)
-- Run this SQL in your Supabase SQL Editor: https://supabase.com/dashboard/project/witsvurabxsfnznsoydn/sql/new

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles Table (Primary key identified by Reg No)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reg_no TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  section TEXT DEFAULT 'A',
  current_year INT DEFAULT 1,
  degree TEXT DEFAULT 'B.E.',
  college TEXT DEFAULT 'VSB Engineering College, Karur',
  graduation_year INT DEFAULT 2028,
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

-- Index for instant lookup by Register Number
CREATE INDEX IF NOT EXISTS idx_profiles_reg_no ON public.profiles(reg_no);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. Document Vault Records Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_documents_reg_no ON public.documents(reg_no);

-- 3. Verified Skills Matrix Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  score INT NOT NULL DEFAULT 85,
  source_document_ids TEXT[],
  verified_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_reg_no ON public.skills(reg_no);

-- 4. Engineering Projects Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_projects_reg_no ON public.projects(reg_no);

-- 5. Internships Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.internships (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_internships_reg_no ON public.internships(reg_no);

-- 6. Certifications Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_certifications_reg_no ON public.certifications(reg_no);

-- 7. Achievements Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  achievement_date DATE NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  impact_score INT DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_reg_no ON public.achievements(reg_no);

-- 8. Digital Journey Timeline Table (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.timeline_events (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_timeline_events_reg_no ON public.timeline_events(reg_no);

-- 9. Knowledge Graph Nodes & Edges Tables (Keyed by reg_no)
CREATE TABLE IF NOT EXISTS public.knowledge_graph_nodes (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
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

CREATE INDEX IF NOT EXISTS idx_kg_nodes_reg_no ON public.knowledge_graph_nodes(reg_no);

CREATE TABLE IF NOT EXISTS public.knowledge_graph_edges (
  id TEXT PRIMARY KEY,
  reg_no TEXT NOT NULL REFERENCES public.profiles(reg_no) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  target TEXT NOT NULL,
  relationship TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kg_edges_reg_no ON public.knowledge_graph_edges(reg_no);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Allow Public Access / Custom RLS for Student Identification by Reg No
CREATE POLICY "Public read profiles by reg_no" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public read documents by reg_no" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Public insert documents" ON public.documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete documents" ON public.documents FOR DELETE USING (true);
