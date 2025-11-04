'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const initTimer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      }, observerOptions);

      // Observe all elements with data-aos attribute
      const animatedElements = document.querySelectorAll('[data-aos]');
      animatedElements.forEach(el => {
        observer.observe(el);

        // Check if element is already in viewport on page load
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isInViewport = rect.top < windowHeight && rect.bottom > 0;

        if (isInViewport) {
          el.classList.add('aos-animate');
        }
      });

      // Cleanup function
      return () => {
        animatedElements.forEach(el => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(initTimer);
  }, [pathname]); // Re-run when pathname changes

  return null; // This component doesn't render anything
}
