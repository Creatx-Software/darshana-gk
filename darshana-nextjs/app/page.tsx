import type { Metadata } from 'next';
import HeroCarousel from '@/components/sections/HeroCarousel';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import GraniteColorsSection from '@/components/sections/GraniteColorsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Model3DSection from '@/components/sections/Model3DSection';
import JsonLd from '@/components/seo/JsonLd';
import {
  fetchHeroSlides,
  fetchServices,
  fetchTestimonials,
  fetchPortfolioCategories,
  fetchGraniteColors,
  fetchSiteSettings,
} from '@/lib/api/strapi';
import { SEO_CONFIG } from '@/lib/seo/config';
import { buildStrapiMetadata } from '@/lib/seo/strapi';
import { strapiMediaUrl, toPlainText } from '@/lib/seo/utils';
import { jsonLdGraph, SCHEMA_IDS, serviceListSchema } from '@/lib/seo/jsonld';

// Force dynamic rendering - don't try to statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await fetchSiteSettings().catch(() => null);

  return buildStrapiMetadata({
    seo: siteSettings?.seo,
    // The homepage owns the brand title outright — no "| brand" suffix.
    absoluteTitle: siteSettings?.seo?.metaTitle || SEO_CONFIG.title,
    description:
      toPlainText(siteSettings?.siteDescription, 300) || SEO_CONFIG.description,
    path: '/',
    fallbackImage: siteSettings?.heritageImage || siteSettings?.legacyImage,
    ogEyebrow: `Since ${SEO_CONFIG.foundingYear}`,
  });
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [heroSlides, services, testimonials, portfolioCategories, graniteColors, siteSettings] = await Promise.all([
    fetchHeroSlides(),
    fetchServices(),
    fetchTestimonials(),
    fetchPortfolioCategories(true),
    fetchGraniteColors(),
    fetchSiteSettings().catch(() => null),
  ]);

  const homeSchema = jsonLdGraph(
    {
      '@type': 'WebPage',
      '@id': `${SEO_CONFIG.url}/#webpage`,
      url: `${SEO_CONFIG.url}/`,
      name: SEO_CONFIG.title,
      description: toPlainText(siteSettings?.siteDescription, 300) || SEO_CONFIG.description,
      inLanguage: SEO_CONFIG.language,
      isPartOf: { '@id': SCHEMA_IDS.website },
      about: { '@id': SCHEMA_IDS.localBusiness },
      ...(strapiMediaUrl(heroSlides[0]?.image)
        ? { primaryImageOfPage: { '@type': 'ImageObject', url: strapiMediaUrl(heroSlides[0]?.image) } }
        : {}),
    },
    services.length
      ? serviceListSchema(
          services.map((service) => ({
            name: service.title,
            description: toPlainText(service.description, 300),
          })),
          '/'
        )
      : null,
    portfolioCategories.length
      ? {
          '@type': 'ItemList',
          name: 'Portfolio categories',
          itemListElement: portfolioCategories.map((category, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: category.name,
            url: `${SEO_CONFIG.url}/portfolio/${category.slug}`,
          })),
        }
      : null,
    // Ratings are not collected on the site, so testimonials are published as
    // quoted reviews without a numeric rating rather than as fabricated stars.
    testimonials.length
      ? {
          '@type': 'ItemList',
          name: 'Client testimonials',
          itemListElement: testimonials.map((testimonial, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Review',
              reviewBody: toPlainText(testimonial.quote, 500),
              author: { '@type': 'Person', name: testimonial.authorName },
              itemReviewed: { '@id': SCHEMA_IDS.localBusiness },
            },
          })),
        }
      : null
  );

  return (
    <main>
      <JsonLd data={homeSchema} />
      <HeroCarousel slides={heroSlides} />
      <AboutSection siteSettings={siteSettings} />
      <PortfolioSection categories={portfolioCategories} />
      <Model3DSection />
      <GraniteColorsSection colors={graniteColors} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
