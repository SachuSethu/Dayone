// src/lib/supabase/client.js
// Supabase Client for DayOne.ai with Dual-Mode Resilience
// If Supabase credentials are provided, connects to real cloud PostgreSQL.
// If absent, gracefully falls back to local JSON data so the app never crashes.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env?.VITE_SUPABASE_URL || process.env?.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project-id'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!isSupabaseConfigured) {
  console.info('[DayOne.ai Storage] Running in High-Speed Local JSON Mode. Provide VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env to switch to cloud Supabase.');
} else {
  console.info('[DayOne.ai Storage] Connected to Supabase Cloud Database at:', supabaseUrl);
}
