import HeroCarousel from '@/components/sections/HeroCarousel';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import GraniteColorsSection from '@/components/sections/GraniteColorsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FoundersStorySection from '@/components/sections/FoundersStorySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import {
  fetchHeroSlides,
  fetchServices,
  fetchTestimonials,
  fetchPortfolioCategories,
  fetchGraniteColors,
} from '@/lib/api/strapi';

// Force dynamic rendering - don't try to statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch all data in parallel
  const [heroSlides, services, testimonials, portfolioCategories, graniteColors] = await Promise.all([
    fetchHeroSlides(),
    fetchServices(),
    fetchTestimonials(),
    fetchPortfolioCategories(true),
    fetchGraniteColors(),
  ]);

  return (
    <main>
      <HeroCarousel slides={heroSlides} />
      <AboutSection />
      <PortfolioSection categories={portfolioCategories} />
      <GraniteColorsSection colors={graniteColors} />
      <ServicesSection services={services} />
      <FoundersStorySection />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </main>
  );
}
