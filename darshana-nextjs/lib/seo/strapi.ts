import type { Metadata } from 'next';
import type { StrapiSeo } from '@/lib/api/strapi';
import { buildMetadata, type BuildMetadataOptions, type OgImageInput } from './metadata';
import { strapiMediaSize, strapiMediaUrl, toPlainText } from './utils';

export interface StrapiMetadataInput extends BuildMetadataOptions {
  /** The `seo` component from Strapi, when the record has one. */
  seo?: StrapiSeo | null;
  /**
   * Content image to share when the editor has not uploaded a dedicated OG
   * image — a real photograph of the work beats a generated card.
   */
  fallbackImage?: any;
}

/**
 * Build page metadata from Strapi content.
 *
 * Precedence for every field: editor-entered SEO value → derived page content →
 * site-wide default. Editors only fill in what they want to override.
 */
export function buildStrapiMetadata({
  seo,
  fallbackImage,
  ...defaults
}: StrapiMetadataInput): Metadata {
  const images: OgImageInput[] = defaults.images ? [...defaults.images] : [];

  const ogImageUrl = strapiMediaUrl(seo?.ogImage) ?? strapiMediaUrl(fallbackImage);
  if (ogImageUrl && images.length === 0) {
    const { width, height } = strapiMediaSize(seo?.ogImage ?? fallbackImage);
    images.push({
      url: ogImageUrl,
      width,
      height,
      alt: seo?.ogTitle || seo?.metaTitle || defaults.title || undefined,
    });
  }

  const keywords = seo?.keywords
    ? seo.keywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : defaults.keywords;

  const metadata = buildMetadata({
    ...defaults,
    title: seo?.metaTitle || defaults.title,
    description: toPlainText(seo?.metaDescription, 300) || defaults.description,
    keywords,
    images: images.length ? images : undefined,
    noindex: Boolean(seo?.noIndex) || defaults.noindex,
  });

  // The social-only overrides sit on top of whatever buildMetadata produced.
  const ogTitle = seo?.ogTitle;
  const ogDescription = toPlainText(seo?.ogDescription, 300);

  if (ogTitle || ogDescription) {
    metadata.openGraph = {
      ...metadata.openGraph,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
    };
    metadata.twitter = {
      ...metadata.twitter,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
    };
  }

  // An explicit canonical only makes sense when the editor is pointing at a
  // different URL on purpose; otherwise keep the route's own canonical.
  if (seo?.canonicalUrl) {
    metadata.alternates = { ...metadata.alternates, canonical: seo.canonicalUrl };
  }

  return metadata;
}
