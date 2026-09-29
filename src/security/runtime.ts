export const SECURITY = {
  adminSessionTimeoutMs: 30 * 60 * 1000,
  maxUploadBytes: 8 * 1024 * 1024,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const,
};

export function getPublicSiteUrl(): string {
  const configured = String(import.meta.env.VITE_SITE_URL || '').trim();
  if (!configured) return window.location.origin;
  try {
    const url = new URL(configured);
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') return window.location.origin;
    return url.origin;
  } catch { return window.location.origin; }
}

export function validateUpload(file: File): string | null {
  if (!SECURITY.allowedImageTypes.includes(file.type as (typeof SECURITY.allowedImageTypes)[number])) return 'Only JPG, PNG, WebP and AVIF images are allowed.';
  if (file.size > SECURITY.maxUploadBytes) return 'Image is too large. Maximum upload size is 8 MB.';
  return null;
}

export function safeInternalPath(value: string, fallback = '/'): string {
  const path = String(value || '').trim();
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return fallback;
  return path;
}

export function isAdminPath(pathname: string) { return pathname === '/admin' || pathname.startsWith('/admin/'); }
