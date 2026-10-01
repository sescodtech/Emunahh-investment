import { useEffect } from 'react';

export function usePageMetadata({
  title,
  description,
  canonical,
  image,
  robots = 'index,follow',
  ogType = 'website',
}: {
  title: string;
  description?: string | null;
  canonical?: string | null;
  image?: string | null;
  robots?: string | null;
  ogType?: 'website' | 'article';
}) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let node = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!node) {
        node = document.createElement('meta');
        document.head.appendChild(node);
      }
      Object.entries(attrs).forEach(([key, value]) => node?.setAttribute(key, value));
      return node;
    };

    const ensureLink = (rel: string, href: string) => {
      let node = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!node) {
        node = document.createElement('link');
        node.rel = rel;
        document.head.appendChild(node);
      }
      node.href = href;
      return node;
    };

    ensureMeta('meta[name="description"]', { name: 'description', content: description || '' });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: robots || 'index,follow' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description || '' });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description || '' });

    if (image) {
      ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image });
      ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
    }

    if (canonical) {
      ensureLink('canonical', canonical);
      ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    }
  }, [title, description, canonical, image, robots, ogType]);
}
