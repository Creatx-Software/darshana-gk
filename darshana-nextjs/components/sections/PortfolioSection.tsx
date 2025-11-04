'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import type { PortfolioCategory } from '@/lib/api/strapi';

interface PortfolioSectionProps {
  categories: PortfolioCategory[];
}

export default function PortfolioSection({ categories }: PortfolioSectionProps) {
  useEffect(() => {
    // Make entire portfolio card clickable
    const portfolioCards = document.querySelectorAll('.portfolio-item');
    portfolioCards.forEach((item) => {
      const link = item.querySelector('.portfolio-link') as HTMLAnchorElement;
      if (link) {
        (item as HTMLElement).style.cursor = 'pointer';
        item.addEventListener('click', function (e) {
          // Don't trigger if clicking the link itself
          if (e.target !== link) {
            window.location.href = link.href;
          }
        });
      }
    });
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <div className="container-full">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">
            Our Portfolio
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Five Timeless Categories of Stone Artistry
          </p>
        </div>

        <div className="portfolio-grid">
          {categories.map((category, index) => (
            <div
              key={category.documentId}
              className="portfolio-item"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="portfolio-image">
                <Image
                  src={category.image?.url ? (category.image.url.startsWith('http') ? category.image.url : `http://localhost:1337${category.image.url}`) : 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop'}
                  alt={`${category.name} - Stone Carving`}
                  width={800}
                  height={600}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="portfolio-content">
                <div className="portfolio-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="portfolio-title">{category.name}</h3>
                <p className="portfolio-description">{category.tagline}</p>
                <Link href={`/portfolio/${category.slug}`} className="portfolio-link">
                  Explore Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
