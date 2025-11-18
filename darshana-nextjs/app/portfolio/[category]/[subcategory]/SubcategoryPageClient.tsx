'use client';

import { useState, useEffect } from 'react';
import type { GalleryItem } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface SubcategoryPageClientProps {
  galleryItems: GalleryItem[];
}

export default function SubcategoryPageClient({ galleryItems }: SubcategoryPageClientProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

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

  // Get all images for the selected item
  const getCurrentImages = () => {
    if (selectedItemIndex === null) return [];
    const item = galleryItems[selectedItemIndex];

    // If item has multiple images, use them; otherwise use the single image
    if (item.images && item.images.length > 0) {
      return item.images;
    } else if (item.image) {
      return [item.image];
    }
    return [];
  };

  const openLightbox = (itemIndex: number) => {
    setSelectedItemIndex(itemIndex);
    setSelectedImageIndex(0); // Always start with first image
  };

  const closeLightbox = () => {
    setSelectedItemIndex(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    const images = getCurrentImages();
    if (images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    const images = getCurrentImages();
    if (images.length > 0) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, selectedImageIndex]);

  useEffect(() => {
    // Add click handlers to gallery items
    const galleryItemElements = document.querySelectorAll('.gallery-item .view-btn');
    galleryItemElements.forEach((btn, index) => {
      btn.addEventListener('click', () => openLightbox(index));
    });

    return () => {
      galleryItemElements.forEach((btn) => {
        btn.removeEventListener('click', () => openLightbox);
      });
    };
  }, []);

  if (galleryItems.length === 0) {
    return null;
  }

  const currentImages = getCurrentImages();
  const currentImage = currentImages[selectedImageIndex];

  return (
    <div
      className={`lightbox ${selectedItemIndex !== null ? 'active' : ''}`}
      id="lightbox"
      onClick={closeLightbox}
    >
      <button className="lightbox-close" onClick={closeLightbox}>
        &times;
      </button>

      {/* Only show navigation if there are multiple images */}
      {currentImages.length > 1 && (
        <>
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
        </>
      )}

      {selectedItemIndex !== null && currentImage && (
        <>
          <img
            className="lightbox-image"
            id="lightbox-image"
            src={getImageUrl(currentImage)}
            alt={galleryItems[selectedItemIndex].title}
          />

          {/* Image counter */}
          {currentImages.length > 1 && (
            <div className="lightbox-counter">
              {selectedImageIndex + 1} / {currentImages.length}
            </div>
          )}

          {/* Item title */}
          <div className="lightbox-title">
            {galleryItems[selectedItemIndex].title}
          </div>
        </>
      )}
    </div>
  );
}
