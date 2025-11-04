export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const API_BASE = `${API_URL}/api`;

export const API_ENDPOINTS = {
  portfolioCategories: `${API_BASE}/portfolio-categories`,
  portfolioSubcategories: `${API_BASE}/portfolio-subcategories`,
  galleryItems: `${API_BASE}/gallery-items`,
  services: `${API_BASE}/services`,
  testimonials: `${API_BASE}/testimonials`,
  heroSlides: `${API_BASE}/hero-slides`,
  siteSettings: `${API_BASE}/site-setting`,
  graniteColors: `${API_BASE}/granite-colors`,
  articles: `${API_BASE}/articles`,
  contactSubmissions: `${API_BASE}/contact-submissions`,
} as const;
