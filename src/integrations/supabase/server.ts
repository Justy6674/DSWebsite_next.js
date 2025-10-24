// Server-side Supabase client for use in Server Components and API routes
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables for security
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pooebqhsshfafkhvccrl.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8";

// Create a server-side client for use in Server Components
// This client is configured for server-side rendering without session persistence
export const createServerClient = () => {
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};

// Export a singleton instance for convenience in Server Components
// This is safe because server components don't have state between requests
export const supabaseServer = createServerClient();
