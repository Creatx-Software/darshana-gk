import type { MetadataRoute } from 'next';
import { fetchSitemapArticles, fetchSitemapCategories } from '@/lib/api/strapi';
import { ARTICLES_ENABLED } from '@/lib/seo/config';
import { absoluteUrl } from '@/lib/seo/utils';

/**
 * XML sitemap, served at /sitemap.xml.
 *
 * Portfolio routes come from Strapi, so publishing a new category or collection
 * puts it in the sitemap on the next revalidation without a redeploy. Anything
 * the CMS marks `seo.noIndex` is left out, as are the article routes while the
 * section is unfinished (see `ARTICLES_ENABLED`).
 */

// Re-read from the CMS hourly.
export const revalidate = 3600;

/** A safe `lastModified` — Strapi timestamps are trusted, junk is dropped. */
function lastModified(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: absoluteUrl('/custom-design'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];

  const [categories, articles] = await Promise.all([
    fetchSitemapCategories(),
    ARTICLES_ENABLED ? fetchSitemapArticles() : Promise.resolve([]),
  ]);

  const portfolioRoutes: MetadataRoute.Sitemap = categories
    .filter((category) => !category.noIndex)
    .flatMap((category) => [
      {
        url: absoluteUrl(`/portfolio/${category.slug}`),
        lastModified: lastModified(category.updatedAt) ?? now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        // The work itself is the product here, so declare the lead image and
        // let it surface in image search.
        ...(category.imageUrl ? { images: [category.imageUrl] } : {}),
      },
      ...category.subcategories
        .filter((sub) => !sub.noIndex)
        .map((sub) => ({
          url: absoluteUrl(`/portfolio/${category.slug}/${sub.slug}`),
          lastModified: lastModified(sub.updatedAt) ?? now,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
          ...(sub.imageUrl ? { images: [sub.imageUrl] } : {}),
        })),
    ]);

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES_ENABLED
    ? [
        {
          url: absoluteUrl('/articles'),
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        },
        ...articles
          .filter((article) => !article.noIndex)
          .map((article) => ({
            url: absoluteUrl(`/articles/${article.slug}`),
            lastModified: lastModified(article.updatedAt) ?? now,
            changeFrequency: 'monthly' as const,
            priority: 0.5,
          })),
      ]
    : [];

  return [...staticRoutes, ...portfolioRoutes, ...articleRoutes];
}
