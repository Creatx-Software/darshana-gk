import { API_ENDPOINTS } from './config';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Type definitions for our content
export interface PortfolioCategory extends StrapiEntity {
  slug: string;
  name: string;
  description?: string;
  tagline?: string;
  displayOrder: number;
  isActive: boolean;
  image?: any;
  subcategories?: PortfolioSubcategory[];
}

export interface PortfolioSubcategory extends StrapiEntity {
  slug: string;
  name: string;
  sinhalaName?: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  image?: any;
  category?: PortfolioCategory;
  galleryItems?: GalleryItem[];
}

export interface GalleryItem extends StrapiEntity {
  title: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  image?: any;
  subcategory?: PortfolioSubcategory;
}

export interface Service extends StrapiEntity {
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Testimonial extends StrapiEntity {
  quote: string;
  authorName: string;
  authorRole: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HeroSlide extends StrapiEntity {
  title: string;
  subtitle: string;
  imageAlt?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  displayOrder: number;
  isActive: boolean;
  image?: any;
}

export interface SiteSetting {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  founderYear: number;
  email: string;
  phonePrimary: string;
  phoneSecondary?: string;
  phoneTertiary?: string;
  address: string;
  businessHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  logo?: any;
}

export interface GraniteColor extends StrapiEntity {
  name: string;
  description?: string;
  colorCode?: string;
  origin?: string;
  isStock: boolean;
  displayOrder: number;
  isActive: boolean;
  image?: any;
}

export interface Article extends StrapiEntity {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  publishedDate: string;
  author?: string;
  isActive: boolean;
  featuredImage?: any;
}

// Fetch functions
export async function fetchPortfolioCategories(populate = true): Promise<PortfolioCategory[]> {
  const url = populate
    ? `${API_ENDPOINTS.portfolioCategories}?populate[subcategories][populate]=galleryItems&sort=displayOrder:asc`
    : `${API_ENDPOINTS.portfolioCategories}?sort=displayOrder:asc`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch portfolio categories');
  const json: StrapiResponse<PortfolioCategory[]> = await res.json();
  return json.data;
}

export async function fetchPortfolioCategory(slug: string): Promise<PortfolioCategory | null> {
  const url = `${API_ENDPOINTS.portfolioCategories}?filters[slug][$eq]=${slug}&populate[subcategories][populate][0]=image&populate[subcategories][populate][1]=galleryItems.image`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json: StrapiResponse<PortfolioCategory[]> = await res.json();
  return json.data[0] || null;
}

export async function fetchPortfolioSubcategory(slug: string): Promise<PortfolioSubcategory | null> {
  const url = `${API_ENDPOINTS.portfolioSubcategories}?filters[slug][$eq]=${slug}&populate[0]=image&populate[category][populate]=image&populate[galleryItems][populate]=image`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json: StrapiResponse<PortfolioSubcategory[]> = await res.json();
  return json.data[0] || null;
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${API_ENDPOINTS.services}?sort=displayOrder:asc`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch services');
  const json: StrapiResponse<Service[]> = await res.json();
  return json.data;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_ENDPOINTS.testimonials}?sort=displayOrder:asc`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  const json: StrapiResponse<Testimonial[]> = await res.json();
  return json.data;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const res = await fetch(`${API_ENDPOINTS.heroSlides}?sort=displayOrder:asc&populate=image`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch hero slides');
  const json: StrapiResponse<HeroSlide[]> = await res.json();
  return json.data;
}

export async function fetchSiteSettings(): Promise<SiteSetting | null> {
  const res = await fetch(`${API_ENDPOINTS.siteSettings}?populate=logo`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json: StrapiResponse<SiteSetting> = await res.json();
  return json.data;
}

export async function fetchGraniteColors(): Promise<GraniteColor[]> {
  const res = await fetch(`${API_ENDPOINTS.graniteColors}?sort=displayOrder:asc&populate=image`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch granite colors');
  const json: StrapiResponse<GraniteColor[]> = await res.json();
  return json.data;
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${API_ENDPOINTS.articles}?sort=publishedDate:desc&populate=featuredImage`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch articles');
  const json: StrapiResponse<Article[]> = await res.json();
  return json.data;
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const url = `${API_ENDPOINTS.articles}?filters[slug][$eq]=${slug}&populate=featuredImage`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json: StrapiResponse<Article[]> = await res.json();
  return json.data[0] || null;
}

// Contact form submission
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}): Promise<boolean> {
  try {
    const res = await fetch(API_ENDPOINTS.contactSubmissions, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch (error) {
    console.error('Contact form submission error:', error);
    return false;
  }
}
