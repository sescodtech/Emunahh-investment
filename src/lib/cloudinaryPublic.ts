import { validateUpload } from '../security/runtime';

export async function uploadPublicImage(file: File, folder: string) {
  const validation = validateUpload(file);
  if (validation) throw new Error(validation);
  const cloud = String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
  const preset = String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim();
  if (!cloud || !preset) throw new Error('Cloudinary upload variables are not configured.');

  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', preset);
  body.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/image/upload`, {
    method: 'POST',
    body,
  });
  if (!response.ok) throw new Error('Cloudinary image upload failed.');
  const data = await response.json();
  return {
    url: String(data.secure_url || ''),
    publicId: String(data.public_id || ''),
    width: Number(data.width || 0),
    height: Number(data.height || 0),
    format: String(data.format || ''),
  };
}
