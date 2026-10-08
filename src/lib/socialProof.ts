import { supabase } from './supabase';

export type GalleryCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  display_order: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption?: string | null;
  alt_text: string;
  image_url: string;
  cloudinary_public_id?: string | null;
  category_id?: string | null;
  is_featured: boolean;
  show_on_homepage: boolean;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
  created_at: string;
  gallery_categories?: GalleryCategory | null;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  customer_role?: string | null;
  company?: string | null;
  service_label?: string | null;
  review: string;
  rating?: number | null;
  image_url?: string | null;
  cloudinary_public_id?: string | null;
  consent_confirmed: boolean;
  is_featured: boolean;
  show_on_homepage: boolean;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
  published_at?: string | null;
};

export async function fetchGallery(options?: { homepage?: boolean; limit?: number }) {
  let query = supabase
    .from('gallery_items')
    .select('*, gallery_categories(id,slug,name,description,display_order)')
    .eq('status', 'published')
    .order('display_order')
    .order('created_at', { ascending: false });
  if (options?.homepage) query = query.eq('show_on_homepage', true);
  if (options?.limit) query = query.limit(options.limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as GalleryItem[];
}

export async function fetchGalleryCategories() {
  const { data, error } = await supabase
    .from('gallery_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
    .order('name');
  if (error) throw error;
  return (data || []) as GalleryCategory[];
}

export async function fetchTestimonials(options?: { homepage?: boolean; limit?: number }) {
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .eq('consent_confirmed', true)
    .order('display_order')
    .order('published_at', { ascending: false });
  if (options?.homepage) query = query.eq('show_on_homepage', true);
  if (options?.limit) query = query.limit(options.limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Testimonial[];
}
