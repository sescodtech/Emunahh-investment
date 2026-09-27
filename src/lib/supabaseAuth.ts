const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const ACCESS_TOKEN_KEY = 'emunahh_supabase_access_token';
const REFRESH_TOKEN_KEY = 'emunahh_supabase_refresh_token';
const USER_KEY = 'emunahh_supabase_user';

export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  user: SupabaseUser;
}

function assertConfigured() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
  }
}

function headers(accessToken?: string) {
  assertConfigured();
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): SupabaseUser | null {
  const raw = sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SupabaseUser;
  } catch {
    return null;
  }
}

function storeSession(session: AuthSession) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, session.access_token);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

function clearSession() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  assertConfigured();
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      ...headers(init.headers ? undefined : undefined),
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || data?.error_description || data?.error || 'Supabase request failed.');
  }
  return data;
}

export async function signIn(email: string, password: string) {
  const data = await supabaseRequest('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });

  const user = (await getCurrentUser(data.access_token)) as SupabaseUser;
  const role = user.app_metadata?.role || user.user_metadata?.role;
  if (role !== 'admin') {
    await signOut(data.access_token).catch(() => undefined);
    throw new Error('This account is not authorized for the administrator portal.');
  }

  const session: AuthSession = { ...data, user };
  storeSession(session);
  return session;
}

export async function getCurrentUser(accessToken = getAccessToken()) {
  if (!accessToken || !isSupabaseConfigured()) return null;
  try {
    const data = await supabaseRequest('/auth/v1/user', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data as SupabaseUser;
  } catch {
    return null;
  }
}

export async function refreshSession() {
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken || !isSupabaseConfigured()) return null;
  try {
    const data = await supabaseRequest('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const user = await getCurrentUser(data.access_token);
    if (!user) throw new Error('Unable to restore the administrator session.');
    const role = user.app_metadata?.role || user.user_metadata?.role;
    if (role !== 'admin') throw new Error('This account is not authorized for the administrator portal.');
    const session: AuthSession = { ...data, user };
    storeSession(session);
    return session;
  } catch {
    clearSession();
    return null;
  }
}

export async function restoreSession() {
  const accessToken = getAccessToken();
  if (accessToken) {
    const user = await getCurrentUser(accessToken);
    if (user) {
      const role = user.app_metadata?.role || user.user_metadata?.role;
      if (role === 'admin') return { access_token: accessToken, user };
    }
  }
  return refreshSession();
}

export async function signOut(accessToken = getAccessToken()) {
  if (accessToken && isSupabaseConfigured()) {
    await supabaseRequest('/auth/v1/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => undefined);
  }
  clearSession();
}

export async function sendPasswordReset(email: string) {
  return supabaseRequest('/auth/v1/recover', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
}

export function authHeaders(accessToken = getAccessToken()) {
  return {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}
