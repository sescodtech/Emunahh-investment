# Emunahh-Invest — restored public website + CMS foundation

This build restores the original public page components and routes from the last verified working project.
The CMS is additive: it does NOT replace the existing public pages with a blank renderer.

Key fixes:
- Restored original Home/About/Student Loans/Investments/Business Financing/Personal Finance/Other Services/Blog/Contact/Apply/Terms/Privacy routes.
- Kept the upgraded admin Website CMS.
- Added CMS page/section data to ContentContext without removing the existing API content fallbacks.
- Restored SPA history fallback in vercel.json so refreshing /about, /admin, /student-loans, etc. does not return a Vercel 404.
- Existing bundled website assets remain in the project.
- Cloudinary remains the intended CMS media store; no existing local images were deleted.

Deploy:
1. Replace the repository contents with this project.
2. git add .
3. git commit -m "Restore public website and add non-destructive CMS foundation"
4. git push origin main
5. Run CMS migrations only if 004 and 005 have not already succeeded.
6. Redeploy Vercel.

Do NOT delete the Supabase project or existing data.
