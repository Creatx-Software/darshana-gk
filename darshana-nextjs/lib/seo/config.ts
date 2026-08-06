/**
 * Central SEO configuration.
 *
 * Everything that appears in <head>, in structured data, in the sitemap or in
 * generated OG images resolves back to the values in this file.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://darshanagalketayam.lk';

/** Site origin with no trailing slash, e.g. `https://darshanagalketayam.lk` */
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

export const SEO_CONFIG = {
  url: SITE_URL,
  name: 'Darshana Gal Ketayam',
  /** Used as the `title.template` suffix and the OG `siteName`. */
  shortName: 'Darshana Gal Ketayam',
  legalName: 'Darshana Gal Ketayam (Pvt) Ltd',
  title: 'Darshana Gal Ketayam — Sri Lankan Stone & Granite Carving Since 1911',
  description:
    "Four generations of master craftsmen preserving Sri Lanka's ancient art of granite carving since 1911. Buddha statues, memorials, architectural stonework and custom granite design from our Gampaha workshop.",
  /** Short description used where a compact string reads better (Twitter, manifest). */
  shortDescription:
    "Four generations of Sri Lankan master stone carvers since 1911 — Buddha statues, memorials and custom granite work.",
  locale: 'en_LK',
  /** BCP-47 language for <html lang>. */
  language: 'en',
  foundingYear: '1911',
  keywords: [
    'stone carving Sri Lanka',
    'granite carving',
    'Buddha statue Sri Lanka',
    'gal ketayam',
    'memorial stones Sri Lanka',
    'tombstones Sri Lanka',
    'granite memorials Gampaha',
    'architectural stonework',
    'custom granite design',
    'stone sculptor Sri Lanka',
    'Darshana Gal Ketayam',
  ],
} as const;

export const BUSINESS = {
  email: 'darshandgk@gmail.com',
  phones: ['+94 33 222 3714', '+94 77 388 2531', '+94 77 741 1942'],
  address: {
    street: 'No. 263/1, Kandy Road, Miriswatta',
    locality: 'Mudungoda',
    region: 'Gampaha',
    postalCode: '11100',
    country: 'LK',
    countryName: 'Sri Lanka',
  },
  geo: {
    latitude: 7.0544,
    longitude: 80.0058,
  },
  /** Schema.org OpeningHoursSpecification — Mon–Sun 08:00–17:00. */
  openingHours: {
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '17:00',
  },
  priceRange: '$$',
  areaServed: 'LK',
} as const;

export const SOCIAL = {
  facebook: 'https://www.facebook.com/DGK.SL',
  instagram: 'https://instagram.com/dgk.sl',
} as const;

/** All social profiles as a flat list, for schema.org `sameAs`. */
export const SAME_AS: string[] = Object.values(SOCIAL);

/**
 * Search-console / ownership verification tokens.
 * Populate via env once the properties are claimed — empty values are omitted.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
} as const;

/**
 * The articles section is not linked from the primary navigation yet and still
 * renders placeholder copy. While this is `false` the article routes are marked
 * `noindex` and kept out of the sitemap. Flip to `true` (and uncomment the nav
 * links) when the section ships.
 */
export const ARTICLES_ENABLED = false;

/** Brand palette reused by the generated OG images. */
export const OG_THEME = {
  background: '#0a0a0a',
  surface: '#1a1a1a',
  text: '#f5f5f5',
  muted: '#a0a0a0',
  accent: '#c0c0c0',
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
