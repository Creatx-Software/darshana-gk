// Article Types
export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface ArticleContent {
  leadText: string;
  sections: ArticleSection[];
}

export interface Article {
  title: string;
  category: string;
  date: string;
  headerImage: string;
  featuredImage: string;
  content: ArticleContent;
}

export interface ArticleListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  delay: number;
}

// Gallery Types
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Portfolio Types
export interface PortfolioCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

// Service Types
export interface Service {
  icon: string;
  title: string;
  description: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Granite Color Types
export interface GraniteColor {
  name: string;
  description: string;
  image: string;
}
