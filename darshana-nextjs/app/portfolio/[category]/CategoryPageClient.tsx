'use client';

import { useEffect } from 'react';

export default function CategoryPageClient() {
  useEffect(() => {
    // Make entire subcategory cards clickable
    const cards = document.querySelectorAll('.subcategory-card');
    cards.forEach((card) => {
      const link = card as HTMLAnchorElement;
      if (link) {
        card.addEventListener('click', function (e) {
          // Card itself is already a link, so this just ensures smooth behavior
          if (!(e.target as HTMLElement).closest('a')) {
            link.click();
          }
        });
      }
    });
  }, []);

  return null;
}
