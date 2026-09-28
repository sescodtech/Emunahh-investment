import { createClient, type Session, type User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder',
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
);

export type AdminSession = { session: Session; user: User };

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export async function signIn(email: string, password: string): Promise<AdminSession> {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new Error(error.message);
  if (!data.session || !data.user) throw new Error('Supabase did not return a valid session.');

  let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.user.id)
    .maybeSingle();

  // If this is the configured first administrator and the Auth account exists,
  // bootstrap the protected profile server-side. No password or secret is exposed.
  if (!profile && !profileError) {
    await fetch('/api/admin/bootstrap', {
      method: 'POST',
      headers: { Authorization: `Bearer ${data.session.access_token}` },
    }).catch(() => null);

    const retry = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', data.user.id)
      .maybeSingle();
    profile = retry.data;
    profileError = retry.error;
  }

  if (profileError) throw new Error(`Unable to verify administrator permissions: ${profileError.message}`);
  if (profile?.role !== 'admin') {
    await supabase.auth.signOut();
    throw new Error('This account is not authorized for the administrator portal.');
  }

  return { session: data.session, user: data.user };
}

export async function restoreAdminSession(): Promise<AdminSession | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .maybeSingle();

  if (profile?.role !== 'admin') {
    await supabase.auth.signOut();
    return null;
  }

  return { session, user: session.user };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function sendPasswordReset(email: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${siteUrl}/admin/login`,
  });
  if (error) throw new Error(error.message);
}

export async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}
