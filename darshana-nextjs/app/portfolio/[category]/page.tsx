import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPortfolioCategory } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = await fetchPortfolioCategory(categorySlug);

  if (!category) {
    notFound();
  }

  // Helper function to get image URL
  const getCategoryImageUrl = () => {
    if (category.image?.url) {
      return category.image.url.startsWith('http')
        ? category.image.url
        : `${API_URL}${category.image.url}`;
    }
    return 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop';
  };

  const getSubcategoryImageUrl = (subcategory: any) => {
    // First, try subcategory's own image
    if (subcategory.image?.url) {
      return subcategory.image.url.startsWith('http')
        ? subcategory.image.url
        : `${API_URL}${subcategory.image.url}`;
    }
    // Then try to get first gallery item image
    if (subcategory.galleryItems && subcategory.galleryItems.length > 0) {
      const firstItem = subcategory.galleryItems[0];
      if (firstItem.image?.url) {
        return firstItem.image.url.startsWith('http')
          ? firstItem.image.url
          : `${API_URL}${firstItem.image.url}`;
      }
    }
    // Fallback to category image or default
    return getCategoryImageUrl();
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg">
          <img src={getCategoryImageUrl()} alt={category.name} />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="container">
            <div className="breadcrumb" data-aos="fade-up">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/#portfolio">Portfolio</a>
              <span>/</span>
              <span>{category.name}</span>
            </div>
            <h1 className="page-title" data-aos="fade-up" data-aos-delay="100">
              {category.name}
            </h1>
            <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">
              {category.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Categories Section */}
      <section className="subcategories-section">
        <div className="container">
          <div className="section-intro">
            <p className="lead-text">{category.description}</p>
          </div>

          <div className="subcategories-grid">
            {category.subcategories && category.subcategories.map((subcategory, index) => (
              <Link
                key={subcategory.documentId}
                href={`/portfolio/${categorySlug}/${subcategory.slug}`}
                className="subcategory-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="subcategory-image">
                  <Image
                    src={getSubcategoryImageUrl(subcategory)}
                    alt={subcategory.name}
                    width={800}
                    height={600}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="subcategory-overlay">
                    <span className="view-category">View Collection →</span>
                  </div>
                </div>
                <div className="subcategory-content">
                  <h3>{subcategory.name}</h3>
                  {subcategory.sinhalaName && (
                    <p className="subcategory-subtitle">{subcategory.sinhalaName}</p>
                  )}
                  <p>{subcategory.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategoryPageClient />
    </>
  );
}
