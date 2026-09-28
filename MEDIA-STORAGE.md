# Emunahh-Invest Media Storage

The application keeps only lightweight WebP fallback images in `src/assets/images` so the existing public website remains functional before CMS media is configured.

Production CMS uploads should use Cloudinary. Supabase stores the media record and Cloudinary URL/public ID; image binaries should not be committed to Git.

When the existing fallback images have been uploaded to Cloudinary and their URLs are entered into the CMS/global content records, the remaining local WebP fallbacks can be removed safely in a later cleanup commit.
