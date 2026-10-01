import { supabase } from './supabase';

export type BlogCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  display_order?: number | null;
};

export type BlogAuthor = {
  id: string;
  slug: string;
  name: string;
  role_title?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  hero_image_url?: string | null;
  hero_image_alt?: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  is_featured: boolean;
  tags: string[];
  reading_time_minutes: number;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  og_image_url?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  blog_categories?: BlogCategory | BlogCategory[] | null;
  blog_authors?: BlogAuthor | BlogAuthor[] | null;
};

export const unwrapRelation = <T,>(value: T | T[] | null | undefined): T | null => {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
};

export const getPostCategory = (post: BlogPost) => unwrapRelation(post.blog_categories);
export const getPostAuthor = (post: BlogPost) => unwrapRelation(post.blog_authors);

const publicPostSelect = `
  id,slug,title,excerpt,body,hero_image_url,hero_image_alt,status,is_featured,tags,
  reading_time_minutes,seo_title,seo_description,canonical_url,og_image_url,
  published_at,created_at,updated_at,
  blog_categories(id,slug,name,description,display_order),
  blog_authors(id,slug,name,role_title,bio,avatar_url)
`;

export async function fetchPublishedPosts(limit = 100): Promise<BlogPost[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blog_posts')
    .select(publicPostSelect)
    .in('status', ['published', 'scheduled'])
    .lte('published_at', now)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data || []) as unknown as BlogPost[];
}

export async function fetchPublishedPost(slug: string): Promise<BlogPost | null> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blog_posts')
    .select(publicPostSelect)
    .eq('slug', slug)
    .in('status', ['published', 'scheduled'])
    .lte('published_at', now)
    .maybeSingle();
  if (error) throw error;
  return (data || null) as unknown as BlogPost | null;
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('id,slug,name,description,display_order')
    .eq('is_active', true)
    .order('display_order')
    .order('name');
  if (error) throw error;
  return (data || []) as BlogCategory[];
}

export async function fetchRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const category = getPostCategory(post);
  const now = new Date().toISOString();
  let query = supabase
    .from('blog_posts')
    .select(publicPostSelect)
    .in('status', ['published', 'scheduled'])
    .lte('published_at', now)
    .neq('id', post.id)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (category?.id) query = query.eq('category_id', category.id);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as unknown as BlogPost[];
}

export const formatInsightDate = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};
