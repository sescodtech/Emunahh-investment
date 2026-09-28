export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  original_filename?: string;
  resource_type?: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  folder?: string;
}

export function isCloudinaryConfigured() {
  return Boolean(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
}

export async function uploadImageToCloudinary(file: File, folder = 'emunahh-invest') {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) throw new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
  if (!file.type.startsWith('image/')) throw new Error('Only image files are allowed.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Image is larger than 8MB. Please compress it before uploading.');

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', uploadPreset);
  form.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Cloudinary upload failed.');
  return data as CloudinaryUploadResult;
}
