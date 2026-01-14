import HeroCarousel from '@/components/sections/HeroCarousel';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import GraniteColorsSection from '@/components/sections/GraniteColorsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FoundersStorySection from '@/components/sections/FoundersStorySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Model3DSection from '@/components/sections/Model3DSection';
import {
  fetchHeroSlides,
  fetchServices,
  fetchTestimonials,
  fetchPortfolioCategories,
  fetchGraniteColors,
  fetchSiteSettings,
} from '@/lib/api/strapi';

// Force dynamic rendering - don't try to statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  return (
    <main>
      <HeroCarousel slides={heroSlides} />
      <AboutSection siteSettings={siteSettings} />
      <PortfolioSection categories={portfolioCategories} />
      <Model3DSection />
      <GraniteColorsSection colors={graniteColors} />
      <ServicesSection services={services} />
      <FoundersStorySection siteSettings={siteSettings} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </main>
  );
}
