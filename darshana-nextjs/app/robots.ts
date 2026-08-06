import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/config';

/**
 * robots.txt, served at /robots.txt.
 *
 * The site is fully crawlable, including `/og`. Blocking the card generator
 * would be self-defeating: it is the `image` on the LocalBusiness structured
 * data, and Google honours robots.txt when resolving those references.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
