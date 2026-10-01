export const containsLegacyRegionalMarketing = (value?: string | null) =>
  Boolean(value && /\b(nigeria|nigerian|lagos|naira|₦|west africa)\b/i.test(value));

export const safeMarketingText = (value: string | null | undefined, fallback: string) => {
  const normalized = (value || '').trim();
  if (!normalized || containsLegacyRegionalMarketing(normalized)) return fallback;
  return normalized;
};

export const getCmsPage = (pages: any[] | undefined, slug: string) =>
  pages?.find((page: any) => page.slug === slug);

export const getCmsSection = (
  pages: any[] | undefined,
  sections: any[] | undefined,
  slug: string,
  key: string,
) => {
  const page = getCmsPage(pages, slug);
  return sections?.find(
    (section: any) => section.page_id === page?.id && section.section_key === key,
  )?.content;
};

export const safeStringList = (value: unknown, fallback: string[]) => {
  if (!Array.isArray(value)) return fallback;
  const clean = value
    .map((item) => (typeof item === 'string' ? item.trim() : String(item?.value || '').trim()))
    .filter(Boolean)
    .filter((item) => !containsLegacyRegionalMarketing(item));
  return clean.length ? clean : fallback;
};
