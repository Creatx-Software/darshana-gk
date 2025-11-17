'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CustomDesignPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample custom design showcase data
  const customDesigns = [
    {
      id: 1,
      title: 'Sacred Buddha Statue',
      description: 'Custom carved Buddha statue with intricate details',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    },
    {
      id: 2,
      title: 'Memorial Monument',
      description: 'Personalized memorial with custom engravings',
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80',
    },
    {
      id: 3,
      title: 'Architectural Column',
      description: 'Ornate column with traditional Sri Lankan motifs',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
    },
    {
      id: 4,
      title: 'Custom Fountain',
      description: 'Elegant water fountain with carved details',
      image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800&q=80',
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && customDesigns.length > 0) {
      setSelectedImage((selectedImage + 1) % customDesigns.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && customDesigns.length > 0) {
      setSelectedImage(
        selectedImage === 0 ? customDesigns.length - 1 : selectedImage - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="page-header-bg">
          <img
            src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80&auto=format&fit=crop"
            alt="Custom Design"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="container">
            <div className="breadcrumb" data-aos="fade-up">
              <a href="/">Home</a>
              <span>/</span>
              <span>Custom Design</span>
            </div>
            <h1 className="page-title" data-aos="fade-up" data-aos-delay="100">
              Custom Design Services
            </h1>
            <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">
              Bringing Your Vision to Life in Stone
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="custom-design-intro">
        <div className="container">
          <div className="section-intro">
            <h2 className="section-title" data-aos="fade-up">
              Tailored Stone Artistry
            </h2>
            <p className="lead-text" data-aos="fade-up" data-aos-delay="100">
              At Darshana Gal Ketayam, we understand that every project is unique. Our custom design
              service allows you to bring your vision to life with the expertise of four generations
              of master craftsmen.
            </p>
            <p data-aos="fade-up" data-aos-delay="200">
              Whether you're looking for a sacred statue with specific dimensions, a memorial with
              personalized engravings, or an architectural element that matches your aesthetic, we
              work closely with you from concept to completion. Our team combines traditional
              craftsmanship with modern techniques to create pieces that exceed expectations.
            </p>
          </div>

          <div className="custom-design-features" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                </div>
                <h3>Design Consultation</h3>
                <p>Work directly with our master craftsmen to refine your vision</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3>Precise Measurements</h3>
                <p>Custom dimensions to fit your exact specifications</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                </div>
                <h3>Material Selection</h3>
                <p>Choose from various granite types and finishes</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path>
                    <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>
                  </svg>
                </div>
                <h3>Expert Craftsmanship</h3>
                <p>Handcrafted by skilled artisans with decades of experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Download Section */}
      <section className="catalog-section">
        <div className="container">
          <div className="catalog-box" data-aos="zoom-in">
            <div className="catalog-content">
              <h2>Download Our Design Catalog</h2>
              <p>
                Explore our collection of past custom projects and get inspired for your own design.
                Our catalog showcases the range of possibilities available with custom stone carving.
              </p>
              <button className="btn btn-stone catalog-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: '8px' }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Catalog (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="custom-design-gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" data-aos="fade-up">
              Custom Design Showcase
            </h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
              Examples of Our Custom Work
            </p>
          </div>

          <div className="gallery-grid">
            {customDesigns.map((design, index) => (
              <div
                key={design.id}
                className="gallery-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="gallery-image">
                  <Image
                    src={design.image}
                    alt={design.title}
                    width={800}
                    height={600}
                    unoptimized
                  />
                  <div className="gallery-overlay">
                    <button className="view-btn" onClick={() => openLightbox(index)}>
                      View Full Image
                    </button>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>{design.title}</h3>
                  <p>{design.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Custom Project?</h2>
            <p>
              Let's discuss your vision and create something truly unique together.
              Our team is ready to bring your ideas to life in stone.
            </p>
            <Link href="/#contact" className="btn btn-stone">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox ${selectedImage !== null ? 'active' : ''}`}
        onClick={closeLightbox}
      >
        <button className="lightbox-close" onClick={closeLightbox}>
          &times;
        </button>
        <button
          className="lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          ‹
        </button>
        <button
          className="lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          ›
        </button>
        {selectedImage !== null && customDesigns[selectedImage] && (
          <img
            className="lightbox-image"
            src={customDesigns[selectedImage].image}
            alt={customDesigns[selectedImage].title}
          />
        )}
      </div>
    </>
  );
}
