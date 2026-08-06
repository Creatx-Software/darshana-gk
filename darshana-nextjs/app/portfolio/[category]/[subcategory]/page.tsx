import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPortfolioCategory, fetchPortfolioSubcategory } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';
import SubcategoryPageClient from './SubcategoryPageClient';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';
import { SEO_CONFIG } from '@/lib/seo/config';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildStrapiMetadata } from '@/lib/seo/strapi';
import { strapiMediaUrl, toPlainText, truncate } from '@/lib/seo/utils';
import {
  breadcrumbSchema,
  collectionPageSchema,
  imageGallerySchema,
  jsonLdGraph,
} from '@/lib/seo/jsonld';

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const [category, subcategory] = await Promise.all([
    fetchPortfolioCategory(categorySlug),
    fetchPortfolioSubcategory(subcategorySlug),
  ]);

  const path = `/portfolio/${categorySlug}/${subcategorySlug}`;

  if (!category || !subcategory) {
    return buildMetadata({ title: 'Collection not found', path, noindex: true });
  }

  // The Sinhala name is what many local searches actually use, so it belongs in
  // the title when the record has one.
  const displayName = subcategory.sinhalaName
    ? `${subcategory.name} (${subcategory.sinhalaName})`
    : subcategory.name;

  const description =
    toPlainText(subcategory.description, 300) ||
    truncate(
      `${subcategory.name} hand-carved in granite by ${SEO_CONFIG.name} — part of our ${category.name} collection. Sri Lankan stone craftsmanship since ${SEO_CONFIG.foundingYear}.`,
      300
    );

  return buildStrapiMetadata({
    seo: subcategory.seo,
    title: displayName,
    description,
    path,
    ogEyebrow: category.name,
    fallbackImage:
      subcategory.image || subcategory.galleryItems?.[0]?.image || category.heroImage || category.image,
    keywords: [
      `${subcategory.name} Sri Lanka`,
      `granite ${subcategory.name.toLowerCase()}`,
      ...(subcategory.sinhalaName ? [subcategory.sinhalaName] : []),
      `${category.name} Sri Lanka`,
      ...SEO_CONFIG.keywords.slice(0, 3),
    ],
  });
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const [category, subcategory] = await Promise.all([
    fetchPortfolioCategory(categorySlug),
    fetchPortfolioSubcategory(subcategorySlug)
  ]);

  if (!category || !subcategory) {
    notFound();
  }

  const path = `/portfolio/${categorySlug}/${subcategorySlug}`;

  const galleryImages = (subcategory.galleryItems || [])
    .flatMap((item) => {
      const media = [item.image, ...(item.images || [])];
      return media
        .map((entry) => strapiMediaUrl(entry))
        .filter((url): url is string => Boolean(url))
        .map((url) => ({
          url,
          name: item.title || subcategory.name,
          description: toPlainText(item.description, 200) || undefined,
        }));
    })
    .slice(0, 40);

  const subcategorySchema = jsonLdGraph(
    collectionPageSchema({
      name: `${subcategory.name} | ${category.name}`,
      description: toPlainText(subcategory.description, 300) || undefined,
      path,
    }),
    imageGallerySchema({
      name: subcategory.name,
      description: toPlainText(subcategory.description, 300) || undefined,
      path,
      images: galleryImages,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/#portfolio' },
      { name: category.name, path: `/portfolio/${category.slug}` },
      { name: subcategory.name },
    ])
  );

  // Helper function to get image URL
  const getImageUrl = (imageObj: any) => {
    if (imageObj?.url) {
      let url = imageObj.url.startsWith('http')
        ? imageObj.url
        : `${API_URL}${imageObj.url}`;

      // Replace localhost URLs with production API URL
      url = url.replace('http://localhost:1337', API_URL);

      return url;
    }
    return null;
  };

  const headerImageUrl = subcategory.galleryItems && subcategory.galleryItems.length > 0
    ? getImageUrl(subcategory.galleryItems[0].image)
    : getImageUrl(category.image);

  const fallbackImage = 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop';

  return (
    <>
      <JsonLd data={subcategorySchema} />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg">
          <img
            src={headerImageUrl || fallbackImage}
            alt={subcategory.name}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="container">
            <div className="breadcrumb" data-aos="fade-up">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/#portfolio">Portfolio</a>
              <span>/</span>
              <a href={`/portfolio/${categorySlug}`}>{category.name}</a>
              <span>/</span>
              <span>{subcategory.name}</span>
            </div>
            <h1 className="page-title" data-aos="fade-up" data-aos-delay="100">
              {subcategory.name}
            </h1>
            {subcategory.sinhalaName && (
              <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">
                {subcategory.sinhalaName}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-intro">
            <p className="lead-text">{subcategory.description}</p>
          </div>

          {subcategory.galleryItems && subcategory.galleryItems.length > 0 ? (
            <div className="gallery-grid">
              {subcategory.galleryItems.map((item, index) => {
                const imageUrl = getImageUrl(item.image) || fallbackImage;
                return (
                  <div
                    key={item.documentId}
                    className="gallery-item"
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                    data-image={imageUrl}
                    data-title={item.title}
                    data-index={index}
                  >
                    <div className="gallery-image">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        width={800}
                        height={600}
                        unoptimized
                      />
                      <div className="gallery-overlay">
                        <button className="view-btn">
                          View Images
                        </button>
                      </div>
                    </div>
                    <div className="gallery-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p className="lead-text">Gallery coming soon. Contact us for custom designs.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Commission Your Custom Stone Art</h2>
            <p>
              Work with our master craftsmen to create a meaningful piece that honors tradition and
              spirituality.
            </p>
            <a href="/contact" className="btn btn-stone">
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      <SubcategoryPageClient galleryItems={subcategory.galleryItems || []} />
    </>
  );
}
