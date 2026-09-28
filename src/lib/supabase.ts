import { createClient } from '@supabase/supabase-js';

// Vite is the current build system. NEXT_PUBLIC_* is accepted as a backwards-compatible
// fallback because earlier deployments may still have those variable names configured.
const env = import.meta.env as Record<string, string | undefined>;
const url = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigError = !url || !key
  ? 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to Vercel, or keep the legacy NEXT_PUBLIC_* names temporarily.'
  : null;

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  },
);
