import { supabase } from './supabase';
import type { ApplicationServiceSlug } from '../config/applicationArchitecture';

export interface PublicDocumentConfig {
  enabled: boolean;
  test_mode: boolean;
  max_size_mb: number;
  allowed_extensions: string;
}

export interface ApplicationDocumentRecord {
  id: string;
  application_id: string;
  filename: string;
  document_type: string;
  mime_type?: string | null;
  file_size?: number | null;
  provider?: string | null;
  storage_status?: string | null;
  created_at?: string | null;
}

export interface DocumentUploadSession {
  application_id: string;
  reference: string;
  service_slug: ApplicationServiceSlug;
  service_label: string;
  config: PublicDocumentConfig;
  documents: ApplicationDocumentRecord[];
}

const disabledConfig: PublicDocumentConfig = {
  enabled: false,
  test_mode: true,
  max_size_mb: 10,
  allowed_extensions: 'pdf,jpg,jpeg,png,webp',
};

export async function getDocumentUploadConfig(): Promise<PublicDocumentConfig> {
  const { data, error } = await supabase.rpc('get_public_document_upload_config');
  if (error || !data) return disabledConfig;
  return {
    enabled: Boolean(data.enabled),
    test_mode: Boolean(data.test_mode),
    max_size_mb: Number(data.max_size_mb || 10),
    allowed_extensions: String(data.allowed_extensions || disabledConfig.allowed_extensions),
  };
}

export async function getDocumentUploadSession(applicationId: string, token: string): Promise<DocumentUploadSession> {
  const { data, error } = await supabase.functions.invoke('document-storage', {
    body: { action: 'session', application_id: applicationId, token },
  });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || 'Unable to open the secure document session.');
  return data.session as DocumentUploadSession;
}

export async function uploadApplicationDocument(input: {
  applicationId: string;
  token: string;
  documentType: string;
  file: File;
}) {
  const body = new FormData();
  body.append('action', 'upload');
  body.append('application_id', input.applicationId);
  body.append('token', input.token);
  body.append('document_type', input.documentType);
  body.append('file', input.file);

  const { data, error } = await supabase.functions.invoke('document-storage', { body });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || 'Document upload failed.');
  return data.document as ApplicationDocumentRecord;
}

export async function createDocumentRequestLink(applicationId: string) {
  const { data, error } = await supabase.functions.invoke('document-storage', {
    body: { action: 'create_request_link', application_id: applicationId },
  });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || 'Unable to create a secure document link.');
  return String(data.path || data.url || '');
}

export async function testDocumentStorage() {
  const { data, error } = await supabase.functions.invoke('document-storage', {
    body: { action: 'health' },
  });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || 'Storage configuration check failed.');
  return data as { success: true; provider: string; test_mode: boolean; message: string };
}

export async function downloadAdminDocument(documentId: string, filename: string) {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error('Your admin session has expired.');

  const baseUrl = String(import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
  const publishableKey = String(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '');
  const response = await fetch(`${baseUrl}/functions/v1/document-storage?action=download&document_id=${encodeURIComponent(documentId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: publishableKey,
    },
  });
  if (!response.ok) {
    let message = 'Unable to download this document.';
    try { message = (await response.json())?.error || message; } catch { /* ignore */ }
    throw new Error(message);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename || 'application-document';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
