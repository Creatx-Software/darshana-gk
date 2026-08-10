import type { Metadata } from 'next';
import { SEO_CONFIG, SITE_URL, VERIFICATION } from './config';
import { absoluteUrl, toTitle, truncate } from './utils';

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface BuildMetadataOptions {
  /** Page title without the brand suffix — the suffix is applied by the template. */
  title?: string;
  /** Set when the page needs a completely standalone title (no brand suffix). */
  absoluteTitle?: string;
  description?: string;
  /** App-relative path used for the canonical URL, e.g. `/about`. */
  path?: string;
  keywords?: readonly string[] | string[];
  images?: OgImageInput[];
  /** Falls back to the branded generated card when `images` is empty. */
  ogType?: 'website' | 'article' | 'profile';
  /** Text drawn above the title on the generated OG card. */
  ogEyebrow?: string;
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
}

/**
 * URL of the dynamically generated, on-brand OG card for a page.
 * Rendered by `app/og/route.tsx`.
 */
export function generatedOgImage(title: string, eyebrow?: string): OgImageInput {
  const params = new URLSearchParams({ title: truncate(title, 90) });
  if (eyebrow) params.set('eyebrow', truncate(eyebrow, 40));

  return {
    url: `${SITE_URL}/og?${params.toString()}`,
    width: 1200,
    height: 630,
    alt: `${title} — ${SEO_CONFIG.name}`,
  };
}

/**
 * Compose a complete `Metadata` object: canonical URL, Open Graph, Twitter card
 * and robots directives, with brand defaults filled in for anything omitted.
 */
export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title,
    absoluteTitle,
    description = SEO_CONFIG.description,
    path = '/',
    keywords,
    images,
    ogType = 'website',
    ogEyebrow,
    noindex = false,
    article,
  } = options;

  const canonical = absoluteUrl(path);
  const displayTitle = absoluteTitle ?? (title ? `${title} | ${SEO_CONFIG.name}` : SEO_CONFIG.title);
  const metaDescription = truncate(description, 300);

  const ogImages =
    images && images.length > 0
      ? images.map((image) => ({
          url: absoluteUrl(image.url),
          width: image.width ?? 1200,
          height: image.height ?? 630,
          alt: image.alt ?? displayTitle,
        }))
      : [generatedOgImage(title ?? SEO_CONFIG.name, ogEyebrow)];

  const metadata: Metadata = {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description: metaDescription,
    keywords: keywords ? [...keywords] : [...SEO_CONFIG.keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      type: ogType,
      title: displayTitle,
      description: metaDescription,
      url: canonical,
      siteName: SEO_CONFIG.name,
      locale: SEO_CONFIG.locale,
      images: ogImages,
      ...(article && ogType === 'article'
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            section: article.section,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: truncate(description, 200),
      images: ogImages.map((image) => image.url),
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };

  return metadata;
}

/**
 * Root metadata — the pieces that only belong on `app/layout.tsx` and are
 * inherited by every route (title template, icons, verification, base URL).
 */
export function buildRootMetadata(): Metadata {
  const base = buildMetadata({
    absoluteTitle: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    path: '/',
  });

  // Every page route sets its own robots directive through `buildMetadata`, so
  // the root must not assert one. What inherits it is `not-found`, where Next
  // injects its own `noindex` — leaving the root's directive in place would ship
  // two contradictory robots tags on every 404.
  const { robots: _rootRobots, ...rootBase } = base;

  return {
    ...rootBase,
    metadataBase: new URL(SITE_URL),
    title: {
      default: SEO_CONFIG.title,
      template: `%s | ${SEO_CONFIG.name}`,
    },
    applicationName: SEO_CONFIG.name,
    authors: [{ name: SEO_CONFIG.name, url: SITE_URL }],
    creator: SEO_CONFIG.name,
    publisher: SEO_CONFIG.legalName,
    category: 'Arts & Crafts',
    // No `referrer` override: browsers already default to
    // strict-origin-when-cross-origin, and Firefox logs a console warning for
    // every cross-site request when asked to loosen it.
    manifest: '/manifest.webmanifest',
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    // Icons are supplied by the `app/icon.svg` and `app/apple-icon.tsx` file
    // conventions, which Next injects automatically.
    ...(VERIFICATION.google || VERIFICATION.bing
      ? {
          verification: {
            ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
            ...(VERIFICATION.bing ? { other: { 'msvalidate.01': VERIFICATION.bing } } : {}),
          },
        }
      : {}),
  };
}

/** Convenience re-export so pages only need one import for titles. */
export { toTitle };
