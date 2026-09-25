-- server/scripts/schema.sql
-- DayOne.ai Complete Supabase PostgreSQL Schema
-- Execute this once in your Supabase Project -> SQL Editor

-- 1. COMPANIES
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  industry TEXT,
  location TEXT,
  website TEXT,
  logo TEXT,
  accent_color TEXT,
  about TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. VACANCIES (COMPANY DROPPED JOBS)
CREATE TABLE IF NOT EXISTS vacancies (
  id TEXT PRIMARY KEY,
  company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT,
  title TEXT NOT NULL,
  role_id TEXT NOT NULL,
  location TEXT,
  experience TEXT,
  salary_range TEXT,
  description TEXT,
  required_skills JSONB DEFAULT '{}'::jsonb,
  interview_questions JSONB DEFAULT '[]'::jsonb,
  is_company_posted BOOLEAN DEFAULT true,
  posted_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CANDIDATES (VERIFIED TALENT POOL)
CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  candidate_tag TEXT,
  name TEXT NOT NULL,
  role_id TEXT NOT NULL,
  target_role TEXT NOT NULL,
  headline TEXT,
  experience_years NUMERIC DEFAULT 1,
  location TEXT,
  skills JSONB DEFAULT '{}'::jsonb,
  skill_score INT DEFAULT 80,
  task_score INT DEFAULT 85,
  role_match INT DEFAULT 80,
  overall_performance INT DEFAULT 82,
  task_summary JSONB DEFAULT '{}'::jsonb,
  interested_in_companies JSONB DEFAULT '[]'::jsonb,
  resume_summary TEXT,
  personal_info_protected BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. APPLICATIONS (AI SHORTLISTED CANDIDATES)
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT,
  job_id TEXT,
  job_title TEXT,
  candidate_id TEXT,
  candidate_tag TEXT,
  candidate_name TEXT,
  candidate_role TEXT,
  candidate_headline TEXT,
  readiness_score INT DEFAULT 80,
  experience TEXT,
  location TEXT,
  cv_name TEXT,
  applied_at TIMESTAMPTZ DEFAULT now(),
  cover_note TEXT,
  ai_shortlist JSONB DEFAULT '{}'::jsonb,
  sent_to_hr BOOLEAN DEFAULT false,
  sent_to_hr_at TIMESTAMPTZ,
  hr_lead_email TEXT,
  hr_notes TEXT
);

-- 5. TASKS (192 MAIN SIMULATION TASKS)
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  role_id TEXT NOT NULL,
  level INT NOT NULL,
  difficulty TEXT,
  title TEXT NOT NULL,
  competency TEXT,
  subtasks JSONB DEFAULT '[]'::jsonb,
  capture_flags JSONB DEFAULT '[]'::jsonb
);

-- 6. MICRO COURSES (33 VIDEO MODULES)
CREATE TABLE IF NOT EXISTS micro_courses (
  id TEXT PRIMARY KEY,
  role_id TEXT NOT NULL,
  title TEXT NOT NULL,
  domains_covered JSONB DEFAULT '[]'::jsonb,
  video_title TEXT,
  provider TEXT,
  video_url TEXT,
  thumbnail_url TEXT
);

-- 7. INTERVIEW QUESTIONS (60 QUESTIONS & RUBRICS)
CREATE TABLE IF NOT EXISTS interview_questions (
  id TEXT PRIMARY KEY,
  role_id TEXT NOT NULL,
  section TEXT NOT NULL,
  skill TEXT NOT NULL,
  question TEXT NOT NULL,
  marks INT DEFAULT 10,
  expected_answer_points JSONB DEFAULT '[]'::jsonb,
  rubric JSONB DEFAULT '{}'::jsonb
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR SAFE PUBLIC READ & WRITE
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE micro_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access" ON companies FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON vacancies FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON candidates FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON applications FOR ALL USING (true);
CREATE POLICY "Public Read Access" ON tasks FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON micro_courses FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON interview_questions FOR SELECT USING (true);
