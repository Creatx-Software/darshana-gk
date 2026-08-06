import { API_ENDPOINTS, API_URL } from './config';

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

/**
 * The `shared.seo` component attached to every editable content type.
 * Every field is optional — the frontend falls back to page content when a
 * value is blank, so editors only override what they care about.
 */
export interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: any;
  canonicalUrl?: string;
  noIndex?: boolean;
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
  heroImage?: any;
  subcategories?: PortfolioSubcategory[];
  seo?: StrapiSeo;
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
  seo?: StrapiSeo;
}

export interface GalleryItem extends StrapiEntity {
  title: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  image?: any;
  images?: any[];
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
  heritageImage?: any;
  legacyImage?: any;
  seo?: StrapiSeo;
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
  headerImage?: any;
  category?: string;
  readingTime?: number;
  seo?: StrapiSeo;
}

/**
 * Drop every query parameter that mentions the `seo` component.
 *
 * Split on the raw string rather than going through URLSearchParams: these
 * queries carry unencoded brackets that Strapi expects, and a round trip would
 * rewrite them.
 */
function stripSeoPopulate(url: string): string {
  const [base, query] = url.split('?');
  if (!query) return url;

  const kept = query.split('&').filter((param) => !/seo/i.test(param));
  return kept.length ? `${base}?${kept.join('&')}` : base;
}

/**
 * Fetch from Strapi, retrying without the `seo` populate if the CMS rejects it.
 *
 * The `shared.seo` component is part of this change set. The frontend and
 * backend deploy from separate workflows, so a frontend release can land first —
 * without this fallback every populate mentioning `seo` would 400 and take the
 * portfolio down until the backend caught up. Once both sides are deployed the
 * retry never fires.
 *
 * Returns null instead of throwing so callers decide what a miss means.
 */
async function strapiFetch(url: string, revalidate = 60): Promise<Response | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (res.ok) return res;

    if (res.status === 400 && /seo/i.test(url)) {
      const fallbackUrl = stripSeoPopulate(url);
      if (fallbackUrl !== url) {
        console.warn('Strapi rejected the SEO populate; retrying without it:', url);
        const retry = await fetch(fallbackUrl, { next: { revalidate } });
        if (retry.ok) return retry;
      }
    }

    return null;
  } catch (error) {
    console.error('Strapi request failed:', url, error);
    return null;
  }
}

// Fetch functions
export async function fetchPortfolioCategories(populate = true): Promise<PortfolioCategory[]> {
  const url = populate
    ? `${API_ENDPOINTS.portfolioCategories}?populate[0]=image&populate[1]=subcategories.galleryItems&sort=displayOrder:asc`
    : `${API_ENDPOINTS.portfolioCategories}?sort=displayOrder:asc`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch portfolio categories');
  const json: StrapiResponse<PortfolioCategory[]> = await res.json();
  return json.data;
}

export async function fetchPortfolioCategory(slug: string): Promise<PortfolioCategory | null> {
  const url = `${API_ENDPOINTS.portfolioCategories}?filters[slug][$eq]=${slug}&populate[0]=image&populate[1]=heroImage&populate[2]=subcategories.image&populate[3]=subcategories.galleryItems.image&populate[4]=subcategories.galleryItems.images&populate[5]=seo.ogImage`;

  const res = await strapiFetch(url);
  if (!res) return null;
  const json: StrapiResponse<PortfolioCategory[]> = await res.json();
  return json.data[0] || null;
}

export async function fetchPortfolioSubcategory(slug: string): Promise<PortfolioSubcategory | null> {
  const url = `${API_ENDPOINTS.portfolioSubcategories}?filters[slug][$eq]=${slug}&populate[0]=image&populate[1]=seo.ogImage&populate[category][populate]=image&populate[galleryItems][populate][0]=image&populate[galleryItems][populate][1]=images`;

  const res = await strapiFetch(url);
  if (!res) return null;
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
  const res = await strapiFetch(
    `${API_ENDPOINTS.siteSettings}?populate[0]=heritageImage&populate[1]=legacyImage&populate[2]=seo.ogImage`
  );
  if (!res) return null;

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
  const res = await strapiFetch(
    `${API_ENDPOINTS.articles}?sort=publishedDate:desc&populate[0]=featuredImage&populate[1]=headerImage&populate[2]=seo.ogImage`
  );
  if (!res) throw new Error('Failed to fetch articles');
  const json: StrapiResponse<Article[]> = await res.json();
  return json.data;
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  const url = `${API_ENDPOINTS.articles}?filters[slug][$eq]=${slug}&populate[0]=featuredImage&populate[1]=headerImage&populate[2]=seo.ogImage`;

  const res = await strapiFetch(url);
  if (!res) return null;
  const json: StrapiResponse<Article[]> = await res.json();
  return json.data[0] || null;
}

export interface CustomDesignItem extends StrapiEntity {
  title: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  image?: any;
}

export interface CustomDesignPage {
  catalogTitle?: string;
  catalogDescription?: string;
  catalogFile?: any;
  seo?: StrapiSeo;
}

export async function fetchCustomDesignItems(): Promise<CustomDesignItem[]> {
  try {
    const res = await fetch(`${API_ENDPOINTS.customDesignItems}?sort=displayOrder:asc&populate=image`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json: StrapiResponse<CustomDesignItem[]> = await res.json();
    return json.data;
  } catch (error) {
    return [];
  }
}

export async function fetchCustomDesignPage(): Promise<CustomDesignPage | null> {
  const res = await strapiFetch(
    `${API_ENDPOINTS.customDesignPage}?populate[0]=catalogFile&populate[1]=seo.ogImage`
  );
  if (!res) return null;

  const json: StrapiResponse<CustomDesignPage> = await res.json();
  return json.data;
}

/**
 * Slugs and last-modified timestamps for every indexable route, used to build
 * `app/sitemap.ts`. Deliberately minimal — no media, no gallery payloads — so a
 * sitemap request never drags the whole catalogue across the wire.
 *
 * Never throws: if Strapi is unreachable the sitemap still renders with its
 * static routes rather than failing the build.
 */
export interface SitemapEntry {
  slug: string;
  updatedAt: string;
  noIndex: boolean;
  /** Absolute URL of the entry's lead image, for the sitemap image extension. */
  imageUrl?: string;
}

export interface SitemapCategory extends SitemapEntry {
  subcategories: SitemapEntry[];
}

/** Turn a `{ url }` media stub into an absolute, production-safe URL. */
function sitemapImageUrl(media: any): string | undefined {
  const raw: string | undefined = media?.url;
  if (!raw) return undefined;

  const url = raw.startsWith('http') ? raw : `${API_URL}${raw}`;
  return url.replace(/^https?:\/\/localhost:1337/, API_URL);
}

export async function fetchSitemapCategories(): Promise<SitemapCategory[]> {
  try {
    // One lead image per entry — enough for the sitemap image extension without
    // dragging every gallery item into the request.
    const url =
      `${API_ENDPOINTS.portfolioCategories}` +
      `?fields[0]=slug&fields[1]=updatedAt&fields[2]=isActive` +
      `&populate[image][fields][0]=url` +
      `&populate[subcategories][fields][0]=slug&populate[subcategories][fields][1]=updatedAt&populate[subcategories][fields][2]=isActive` +
      `&populate[subcategories][populate][image][fields][0]=url` +
      `&populate[seo][fields][0]=noIndex&populate[subcategories][populate][seo][fields][0]=noIndex` +
      `&sort=displayOrder:asc&pagination[pageSize]=200`;

    const res = await strapiFetch(url, 3600);
    if (!res) return [];
    const json: StrapiResponse<any[]> = await res.json();

    return (json.data || [])
      .filter((category) => category?.slug && category?.isActive !== false)
      .map((category) => ({
        slug: category.slug,
        updatedAt: category.updatedAt,
        noIndex: Boolean(category.seo?.noIndex),
        imageUrl: sitemapImageUrl(category.image),
        subcategories: (category.subcategories || [])
          .filter((sub: any) => sub?.slug && sub?.isActive !== false)
          .map((sub: any) => ({
            slug: sub.slug,
            updatedAt: sub.updatedAt,
            noIndex: Boolean(sub.seo?.noIndex),
            imageUrl: sitemapImageUrl(sub.image),
          })),
      }));
  } catch (error) {
    console.error('Sitemap: failed to fetch portfolio categories', error);
    return [];
  }
}

export async function fetchSitemapArticles(): Promise<
  Array<{ slug: string; updatedAt: string; noIndex: boolean }>
> {
  try {
    const url =
      `${API_ENDPOINTS.articles}` +
      `?fields[0]=slug&fields[1]=updatedAt&populate[seo][fields][0]=noIndex` +
      `&sort=publishedAt:desc&pagination[pageSize]=500`;

    const res = await strapiFetch(url, 3600);
    if (!res) return [];
    const json: StrapiResponse<any[]> = await res.json();

    return (json.data || [])
      .filter((article) => article?.slug)
      .map((article) => ({
        slug: article.slug,
        updatedAt: article.updatedAt,
        noIndex: Boolean(article.seo?.noIndex),
      }));
  } catch (error) {
    console.error('Sitemap: failed to fetch articles', error);
    return [];
  }
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
