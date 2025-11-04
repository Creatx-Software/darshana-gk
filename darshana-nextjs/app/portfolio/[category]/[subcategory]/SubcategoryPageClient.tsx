'use client';

import { useState, useEffect } from 'react';
import type { GalleryItem } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface SubcategoryPageClientProps {
  galleryItems: GalleryItem[];
}

export default function SubcategoryPageClient({ galleryItems }: SubcategoryPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const getImageUrl = (imageObj: any) => {
    if (imageObj?.url) {
      let url = imageObj.url.startsWith('http')
        ? imageObj.url
        : `${API_URL}${imageObj.url}`;

      // Replace localhost URLs with production API URL
      url = url.replace('http://localhost:1337', API_URL);

      return url;
    }
    return 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop';
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && galleryItems.length > 0) {
      setSelectedImage((selectedImage + 1) % galleryItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && galleryItems.length > 0) {
      setSelectedImage(
        selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1
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

  useEffect(() => {
    // Add click handlers to gallery items
    const galleryItemElements = document.querySelectorAll('.gallery-item .view-btn');
    galleryItemElements.forEach((btn, index) => {
      btn.addEventListener('click', () => openLightbox(index));
    });

    return () => {
      galleryItemElements.forEach((btn, index) => {
        btn.removeEventListener('click', () => openLightbox(index));
      });
    };
  }, []);

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`lightbox ${selectedImage !== null ? 'active' : ''}`}
      id="lightbox"
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
      {selectedImage !== null && galleryItems[selectedImage] && (
        <img
          className="lightbox-image"
          id="lightbox-image"
          src={getImageUrl(galleryItems[selectedImage].image)}
          alt={galleryItems[selectedImage].title}
        />
      )}
    </div>
  );
}
