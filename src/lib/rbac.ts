import { supabase } from './supabase';

export type AppRole = 'super_admin'|'admin'|'editor'|'staff';
export type PermissionKey = string;

export async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('profiles').select('id,full_name,role,created_at,updated_at').eq('id', user.id).maybeSingle();
  if (error) throw error;
  return data ? { ...data, email: user.email || '' } : null;
}

export async function hasPermission(permission: PermissionKey) {
  const { data, error } = await supabase.rpc('has_permission', { permission_key_input: permission });
  if (error) return false;
  return Boolean(data);
}

export async function writeAudit(action: string, entityType: string, entityId = '', metadata: Record<string, unknown> = {}) {
  await supabase.rpc('write_audit', { action_input: action, entity_type_input: entityType, entity_id_input: entityId, metadata_input: metadata });
}
