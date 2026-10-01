import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const sb = createClient(supabaseUrl, serviceKey);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

function hex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer)).map((value) => value.toString(16).padStart(2, '0')).join('');
}

async function sha256(value: string) {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function sha1(value: string) {
  return hex(await crypto.subtle.digest('SHA-1', new TextEncoder().encode(value)));
}

function base64url(value: Uint8Array | string) {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function safeSegment(value: string, fallback = 'file') {
  return String(value || fallback)
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100) || fallback;
}

function extension(filename: string) {
  const match = String(filename || '').toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] || '';
}

async function getSettings() {
  const { data, error } = await sb.from('site_settings').select('*').eq('id', 1).single();
  if (error) throw error;
  return data;
}

async function validateUploadSession(applicationId: string, token: string) {
  if (!applicationId || !token) throw new Error('A valid secure document link is required.');
  const { data: application, error } = await sb
    .from('applications')
    .select('id,reference,status,details,application_type,created_at')
    .eq('id', applicationId)
    .maybeSingle();
  if (error || !application) throw new Error('Application not found.');

  const storedHash = String(application.details?.document_upload_token_hash || '');
  const suppliedHash = await sha256(token);
  if (!storedHash || storedHash !== suppliedHash) throw new Error('This secure document link is invalid or has been replaced.');
  const issuedAt = Date.parse(String(application.details?.document_upload_token_issued_at || ''));
  if (Number.isFinite(issuedAt) && Date.now() - issuedAt > 30 * 24 * 60 * 60 * 1000) {
    throw new Error('This secure document link has expired. Please request a new link from the review team.');
  }
  if (['DECLINED', 'CLOSED'].includes(String(application.status || '').toUpperCase())) {
    throw new Error('Document uploads are no longer available for this application.');
  }
  return application;
}

async function requireStaff(req: Request, permission: string) {
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('Unauthorized.');

  const { data: { user } } = await sb.auth.getUser(token);
  if (!user) throw new Error('Unauthorized.');

  const userClient = createClient(supabaseUrl, serviceKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: allowed, error } = await userClient.rpc('has_permission', { permission_key: permission });
  if (error || !allowed) throw new Error('You do not have permission to perform this action.');
  return user;
}

function pemToArrayBuffer(pem: string) {
  const clean = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function googleAccessToken() {
  const raw = Deno.env.get('GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON');
  if (!raw) throw new Error('GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON is not configured.');
  const credentials = JSON.parse(raw);
  if (!credentials.client_email || !credentials.private_key) throw new Error('Google Drive service account credentials are incomplete.');

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(credentials.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned)));
  const assertion = `${unsigned}.${base64url(signature)}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) throw new Error(result?.error_description || 'Unable to authenticate with Google Drive.');
  return String(result.access_token);
}

async function uploadToGoogleDrive(file: File, settings: any, reference: string, documentType: string) {
  const accessToken = await googleAccessToken();
  const folderId = String(settings.document_google_drive_folder_id || Deno.env.get('GOOGLE_DRIVE_FOLDER_ID') || '').trim();
  if (!folderId) throw new Error('Google Drive destination folder is not configured.');

  const fileName = `${safeSegment(reference)}_${safeSegment(documentType)}_${safeSegment(file.name)}`;
  const metadata = { name: fileName, parents: [folderId], description: `Emunahh-Invest application document — ${reference} — ${documentType}` };
  const start = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true&fields=id,name,mimeType,size,webViewLink,driveId', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': file.type || 'application/octet-stream',
      'X-Upload-Content-Length': String(file.size),
    },
    body: JSON.stringify(metadata),
  });
  if (!start.ok) throw new Error((await start.text()) || 'Google Drive upload session could not be created.');
  const location = start.headers.get('Location');
  if (!location) throw new Error('Google Drive did not return an upload session URL.');

  const upload = await fetch(location, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Length': String(file.size),
    },
    body: await file.arrayBuffer(),
  });
  const result = await upload.json();
  if (!upload.ok || !result.id) throw new Error(result?.error?.message || 'Google Drive rejected the file.');
  return {
    provider_file_id: String(result.id),
    public_url: `gdrive://${result.id}`,
    storage_path: String(result.id),
    resource_type: 'raw',
    format: extension(file.name) || null,
    metadata: { name: result.name, webViewLink: result.webViewLink || null, driveId: result.driveId || null },
  };
}

async function uploadToCloudinary(file: File, settings: any, reference: string, documentType: string) {
  const cloudName = String(settings.cloudinary_cloud_name || Deno.env.get('CLOUDINARY_CLOUD_NAME') || '').trim();
  const apiKey = String(Deno.env.get('CLOUDINARY_API_KEY') || '').trim();
  const apiSecret = String(Deno.env.get('CLOUDINARY_API_SECRET') || '').trim();
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary document-storage credentials are not fully configured.');

  const resourceType = file.type.startsWith('image/') ? 'image' : 'raw';
  const rootFolder = String(settings.document_cloudinary_folder || 'emunahh-invest/applications').split('/').map((part: string) => safeSegment(part)).filter(Boolean).join('/') || 'emunahh-invest/applications';
  const folder = `${rootFolder}/${safeSegment(reference)}`;
  const base = safeSegment(file.name.replace(/\.[^.]+$/, ''), 'document');
  const ext = extension(file.name);
  const publicId = `${safeSegment(documentType)}-${crypto.randomUUID().slice(0, 8)}-${base}${resourceType === 'raw' && ext ? `.${ext}` : ''}`;
  const body = new FormData();
  body.append('file', file);
  body.append('folder', folder);
  body.append('public_id', publicId);
  body.append('overwrite', 'false');
  body.append('tags', `application-document,${safeSegment(reference)}`);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/${resourceType}/authenticated`, {
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}` },
    body,
  });
  const result = await response.json();
  if (!response.ok || !result.public_id) throw new Error(result?.error?.message || 'Cloudinary rejected the document.');
  return {
    provider_file_id: String(result.public_id),
    provider_asset_id: result.asset_id ? String(result.asset_id) : null,
    public_url: `protected://cloudinary/${result.asset_id || result.public_id}`,
    storage_path: String(result.public_id),
    resource_type: String(result.resource_type || resourceType),
    format: result.format ? String(result.format) : ext || null,
    metadata: { type: String(result.type || 'authenticated'), version: result.version || null, bytes: result.bytes || file.size },
  };
}

async function cloudinaryDownload(document: any, settings: any) {
  const cloudName = String(settings.cloudinary_cloud_name || Deno.env.get('CLOUDINARY_CLOUD_NAME') || '').trim();
  const apiKey = String(Deno.env.get('CLOUDINARY_API_KEY') || '').trim();
  const apiSecret = String(Deno.env.get('CLOUDINARY_API_SECRET') || '').trim();
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary credentials are not configured.');

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 300;
  const params: Record<string, string> = {
    expires_at: String(expiresAt),
    format: String(document.format || extension(document.filename) || ''),
    public_id: String(document.provider_file_id || document.storage_path || ''),
    resource_type: String(document.resource_type || (document.mime_type?.startsWith('image/') ? 'image' : 'raw')),
    timestamp: String(now),
    type: 'authenticated',
  };
  const toSign = Object.entries(params).filter(([, value]) => value).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `${key}=${value}`).join('&');
  const signature = await sha1(`${toSign}${apiSecret}`);
  const query = new URLSearchParams({ ...params, api_key: apiKey, signature });
  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/${encodeURIComponent(params.resource_type)}/download?${query.toString()}`);
  if (!response.ok) throw new Error('Unable to retrieve the protected Cloudinary document.');
  return response;
}

async function googleDriveDownload(document: any) {
  const token = await googleAccessToken();
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(document.provider_file_id || document.storage_path)}?alt=media&supportsAllDrives=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Unable to retrieve the Google Drive document.');
  return response;
}

async function providerHealth(settings: any) {
  const provider = String(settings.document_storage_provider || 'disabled');
  if (settings.document_test_mode) return { provider, test_mode: true, message: 'Test mode is active. The workflow is enabled, but uploaded file bytes are not retained externally.' };
  if (provider === 'cloudinary') {
    const cloudName = String(settings.cloudinary_cloud_name || Deno.env.get('CLOUDINARY_CLOUD_NAME') || '').trim();
    const apiKey = String(Deno.env.get('CLOUDINARY_API_KEY') || '').trim();
    const apiSecret = String(Deno.env.get('CLOUDINARY_API_SECRET') || '').trim();
    if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary cloud name, API key and API secret are required.');
    const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/resources/image?max_results=1`, {
      headers: { Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}` },
    });
    if (!response.ok) throw new Error('Cloudinary credentials could not be verified.');
    return { provider, test_mode: false, message: 'Cloudinary credentials are valid and document storage is ready.' };
  }
  if (provider === 'google_drive') {
    const accessToken = await googleAccessToken();
    const folderId = String(settings.document_google_drive_folder_id || Deno.env.get('GOOGLE_DRIVE_FOLDER_ID') || '').trim();
    if (!folderId) throw new Error('Google Drive folder ID is required.');
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(folderId)}?fields=id,name,mimeType,driveId&supportsAllDrives=true`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const folder = await response.json();
    if (!response.ok || folder.mimeType !== 'application/vnd.google-apps.folder') throw new Error(folder?.error?.message || 'Google Drive folder could not be verified.');
    return { provider, test_mode: false, message: `Google Drive folder “${folder.name || folder.id}” is accessible and ready.` };
  }
  throw new Error('Choose Cloudinary or Google Drive before testing document storage.');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url);
      if (url.searchParams.get('action') !== 'download') return json({ error: 'Unsupported action.' }, 400);
      await requireStaff(req, 'applications.view');
      const documentId = String(url.searchParams.get('document_id') || '');
      const { data: document, error } = await sb.from('application_documents').select('*').eq('id', documentId).maybeSingle();
      if (error || !document) return json({ error: 'Document not found.' }, 404);
      if (document.provider === 'test') return json({ error: 'Test-mode entries do not retain file bytes.' }, 404);
      const settings = await getSettings();
      const source = document.provider === 'google_drive'
        ? await googleDriveDownload(document)
        : document.provider === 'cloudinary'
          ? await cloudinaryDownload(document, settings)
          : null;
      if (!source) return json({ error: 'This legacy document does not have a managed download provider.' }, 400);
      return new Response(source.body, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': source.headers.get('Content-Type') || document.mime_type || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${safeSegment(document.filename, 'document')}"`,
          'Cache-Control': 'private, no-store',
        },
      });
    }

    if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    const contentType = req.headers.get('Content-Type') || '';

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const action = String(form.get('action') || 'upload');
      if (action !== 'upload') return json({ error: 'Unsupported upload action.' }, 400);
      const applicationId = String(form.get('application_id') || '');
      const token = String(form.get('token') || '');
      const documentType = safeSegment(String(form.get('document_type') || ''), 'supporting');
      const file = form.get('file');
      if (!(file instanceof File)) return json({ error: 'Choose a document to upload.' }, 400);

      const settings = await getSettings();
      if (!settings.document_uploads_enabled || settings.document_storage_provider === 'disabled') {
        return json({ error: 'Document uploads are not currently enabled.' }, 400);
      }
      const application = await validateUploadSession(applicationId, token);
      const maxSize = Math.max(1, Math.min(Number(settings.document_max_size_mb || 10), 25)) * 1024 * 1024;
      if (file.size <= 0 || file.size > maxSize) return json({ error: `The file must be smaller than ${settings.document_max_size_mb || 10} MB.` }, 400);
      const allowed = String(settings.document_allowed_extensions || 'pdf,jpg,jpeg,png,webp').toLowerCase().split(',').map((value: string) => value.trim()).filter(Boolean);
      const ext = extension(file.name);
      if (!ext || !allowed.includes(ext)) return json({ error: `Allowed file types: ${allowed.join(', ')}.` }, 400);
      if (!/^[a-z0-9_-]{2,64}$/i.test(documentType)) return json({ error: 'Invalid document type.' }, 400);

      let stored: any;
      let provider = String(settings.document_storage_provider);
      let storageStatus = 'stored';
      if (settings.document_test_mode) {
        provider = 'test';
        storageStatus = 'test';
        const testId = crypto.randomUUID();
        stored = {
          provider_file_id: `test-${testId}`,
          provider_asset_id: null,
          public_url: `test://not-retained/${testId}`,
          storage_path: `test/${application.reference}/${documentType}/${safeSegment(file.name)}`,
          resource_type: file.type.startsWith('image/') ? 'image' : 'raw',
          format: ext,
          metadata: { test_mode: true, retained: false, selected_provider: settings.document_storage_provider },
        };
      } else if (provider === 'cloudinary') {
        stored = await uploadToCloudinary(file, settings, application.reference, documentType);
      } else if (provider === 'google_drive') {
        stored = await uploadToGoogleDrive(file, settings, application.reference, documentType);
      } else {
        return json({ error: 'A document storage provider has not been selected.' }, 400);
      }

      const { data: record, error: insertError } = await sb.from('application_documents').insert({
        application_id: application.id,
        filename: file.name,
        public_url: stored.public_url,
        storage_path: stored.storage_path,
        mime_type: file.type || 'application/octet-stream',
        file_size: file.size,
        document_type: documentType,
        uploaded_by: null,
        provider,
        provider_file_id: stored.provider_file_id || null,
        provider_asset_id: stored.provider_asset_id || null,
        resource_type: stored.resource_type || null,
        format: stored.format || ext || null,
        storage_status: storageStatus,
        metadata: stored.metadata || {},
      }).select('id,application_id,filename,document_type,mime_type,file_size,provider,storage_status,created_at').single();
      if (insertError) throw insertError;

      await sb.from('audit_logs').insert({
        actor_id: null,
        action: 'PUBLIC_APPLICATION_DOCUMENT_UPLOADED',
        entity_type: 'application_document',
        entity_id: record.id,
        metadata: { application_id: application.id, reference: application.reference, document_type: documentType, provider, test_mode: Boolean(settings.document_test_mode) },
      });
      return json({ success: true, document: record });
    }

    const body = await req.json();
    const action = String(body?.action || '');

    if (action === 'session') {
      const application = await validateUploadSession(String(body.application_id || ''), String(body.token || ''));
      const settings = await getSettings();
      const { data: documents } = await sb.from('application_documents')
        .select('id,application_id,filename,document_type,mime_type,file_size,provider,storage_status,created_at')
        .eq('application_id', application.id)
        .order('created_at', { ascending: false });
      return json({ success: true, session: {
        application_id: application.id,
        reference: application.reference,
        service_slug: application.details?.service_slug || 'personal-finance',
        service_label: application.details?.service_label || 'Client application',
        config: {
          enabled: Boolean(settings.document_uploads_enabled && settings.document_storage_provider !== 'disabled'),
          test_mode: Boolean(settings.document_test_mode),
          max_size_mb: Math.max(1, Math.min(Number(settings.document_max_size_mb || 10), 25)),
          allowed_extensions: String(settings.document_allowed_extensions || 'pdf,jpg,jpeg,png,webp'),
        },
        documents: documents || [],
      }});
    }

    if (action === 'create_request_link') {
      const actor = await requireStaff(req, 'applications.update');
      const applicationId = String(body.application_id || '');
      const { data: application, error } = await sb.from('applications').select('id,details').eq('id', applicationId).maybeSingle();
      if (error || !application) return json({ error: 'Application not found.' }, 404);
      const token = `${crypto.randomUUID()}${crypto.randomUUID()}`.replaceAll('-', '');
      const tokenHash = await sha256(token);
      const details = { ...(application.details || {}), document_upload_token_hash: tokenHash, document_upload_token_issued_at: new Date().toISOString() };
      const { error: updateError } = await sb.from('applications').update({ details }).eq('id', applicationId);
      if (updateError) throw updateError;
      const settings = await getSettings();
      const path = `/documents/${applicationId}?token=${encodeURIComponent(token)}`;
      const websiteUrl = String(settings.website_url || '').replace(/\/$/, '');
      await sb.from('audit_logs').insert({ actor_id: actor.id, action: 'APPLICATION_DOCUMENT_LINK_CREATED', entity_type: 'application', entity_id: applicationId, metadata: {} });
      return json({ success: true, path, url: websiteUrl ? `${websiteUrl}${path}` : path });
    }

    if (action === 'health') {
      await requireStaff(req, 'settings.manage');
      const settings = await getSettings();
      const result = await providerHealth(settings);
      return json({ success: true, ...result });
    }

    return json({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Document-storage request failed.';
    const status = message === 'Unauthorized.' ? 401 : message.includes('permission') ? 403 : 400;
    return json({ error: message }, status);
  }
});
