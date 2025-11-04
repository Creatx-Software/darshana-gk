'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSlide } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Helper function to get image URL
  const getImageUrl = (slide: HeroSlide) => {
    if (slide.image?.url) {
      let url = slide.image.url.startsWith('http')
        ? slide.image.url
        : `${API_URL}${slide.image.url}`;

      // Replace localhost URLs with production API URL
      url = url.replace('http://localhost:1337', API_URL);

      return url;
    }
    // Fallback image
    return 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80&auto=format&fit=crop';
  };

  return (
    <section className="hero" id="home">
      <div className="hero-carousel">
        {slides.map((slide, index) => (
          <div
            key={slide.documentId}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-slide-bg">
              <Image
                src={getImageUrl(slide)}
                alt={slide.imageAlt || slide.title}
                fill
                priority={index === 0}
                quality={80}
                sizes="100vw"
                unoptimized
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-decoration-top"></div>
              <h1 className="hero-title">
                <span className="hero-title-main">{slide.title}</span>
                <div className="hero-title-underline"></div>
              </h1>
              <p className="hero-subtitle">
                {slide.subtitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < slide.subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              {slide.primaryCtaText && slide.primaryCtaLink && slide.secondaryCtaText && slide.secondaryCtaLink && (
                <div className="hero-cta">
                  <Link href={slide.primaryCtaLink} className="btn btn-stone">
                    {slide.primaryCtaText}
                  </Link>
                  <Link href={slide.secondaryCtaLink} className="btn btn-carved">
                    {slide.secondaryCtaText}
                  </Link>
                </div>
              )}
              <div className="hero-decoration-bottom"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="carousel-controls">
        <button
          className="carousel-btn carousel-prev"
          aria-label="Previous Slide"
          onClick={prevSlide}
        >
          <span>‹</span>
        </button>
        <button
          className="carousel-btn carousel-next"
          aria-label="Next Slide"
          onClick={nextSlide}
        >
          <span>›</span>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>SCROLL</span>
      </div>
    </section>
  );
}
