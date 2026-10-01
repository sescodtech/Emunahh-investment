import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://emunahhinvest.com').replace(/\/$/, '');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const coreRoutes = [
  ['/', 'weekly', '1.0'],
  ['/about', 'monthly', '0.8'],
  ['/services', 'weekly', '0.9'],
  ['/services/education-financing', 'monthly', '0.8'],
  ['/services/travel-financing', 'monthly', '0.8'],
  ['/services/business-financing', 'monthly', '0.8'],
  ['/services/personal-finance', 'monthly', '0.8'],
  ['/services/investment-services', 'monthly', '0.8'],
  ['/blog', 'weekly', '0.8'],
  ['/contact', 'monthly', '0.7'],
  ['/apply', 'monthly', '0.5'],
  ['/trust-security', 'monthly', '0.6'],
  ['/disclosures', 'monthly', '0.6'],
  ['/privacy', 'yearly', '0.4'],
  ['/terms', 'yearly', '0.4'],
];

let articles = [];
if (supabaseUrl && supabaseKey) {
  try {
    const now = new Date().toISOString();
    const endpoint = `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at,published_at&status=in.(published,scheduled)&published_at=lte.${encodeURIComponent(now)}&order=published_at.desc`;
    const response = await fetch(endpoint, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    if (response.ok) articles = await response.json();
    else console.warn('Sitemap: editorial fetch returned', response.status);
  } catch (error) {
    console.warn('Sitemap: editorial fetch failed; writing core routes only.', error instanceof Error ? error.message : error);
  }
}

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const entries = coreRoutes.map(([path, changefreq, priority]) => `  <url><loc>${esc(`${siteUrl}${path}`)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
for (const article of articles) {
  if (!article?.slug) continue;
  const lastmod = article.updated_at || article.published_at;
  entries.push(`  <url><loc>${esc(`${siteUrl}/blog/${article.slug}`)}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}<changefreq>monthly</changefreq><priority>0.7</priority></url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
await writeFile(resolve('public/sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated with ${entries.length} URLs.`);
