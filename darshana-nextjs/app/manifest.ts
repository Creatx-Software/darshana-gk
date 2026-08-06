import type { MetadataRoute } from 'next';
import { OG_THEME, SEO_CONFIG } from '@/lib/seo/config';

/** Web app manifest, served at /manifest.webmanifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.name,
    short_name: 'DGK',
    description: SEO_CONFIG.shortDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: OG_THEME.background,
    theme_color: OG_THEME.background,
    lang: SEO_CONFIG.language,
    categories: ['business', 'art', 'shopping'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
