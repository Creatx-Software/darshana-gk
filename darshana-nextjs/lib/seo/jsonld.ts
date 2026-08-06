import { BUSINESS, SAME_AS, SEO_CONFIG, SITE_URL } from './config';
import { absoluteUrl } from './utils';

/**
 * Stable @id values so the graph nodes can reference each other instead of
 * repeating the organisation on every page.
 */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  localBusiness: `${SITE_URL}/#localbusiness`,
} as const;

type JsonLdObject = Record<string, unknown>;

function postalAddress(): JsonLdObject {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  };
}

function openingHoursSpecification(): JsonLdObject {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...BUSINESS.openingHours.days],
    opens: BUSINESS.openingHours.opens,
    closes: BUSINESS.openingHours.closes,
  };
}

/**
 * The organisation behind the site. Emitted once, in the root layout.
 */
export function organizationSchema(logoUrl = absoluteUrl('/darshana-gal-katayam-light.svg')): JsonLdObject {
  return {
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: SEO_CONFIG.name,
    legalName: SEO_CONFIG.legalName,
    alternateName: 'DGK',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      caption: `${SEO_CONFIG.name} logo`,
    },
    image: absoluteUrl('/og'),
    description: SEO_CONFIG.description,
    foundingDate: SEO_CONFIG.foundingYear,
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0],
    address: postalAddress(),
    sameAs: SAME_AS,
  };
}

/**
 * The physical workshop — this is what powers local/map results, so it carries
 * the geo coordinates, opening hours and contact points.
 */
export function localBusinessSchema(): JsonLdObject {
  return {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': SCHEMA_IDS.localBusiness,
    name: SEO_CONFIG.name,
    description: SEO_CONFIG.description,
    url: SITE_URL,
    image: absoluteUrl('/og'),
    logo: absoluteUrl('/darshana-gal-katayam-light.svg'),
    telephone: BUSINESS.phones[0],
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: 'LKR',
    foundingDate: SEO_CONFIG.foundingYear,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: `https://maps.google.com/?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    openingHoursSpecification: [openingHoursSpecification()],
    areaServed: {
      '@type': 'Country',
      name: BUSINESS.address.countryName,
    },
    contactPoint: BUSINESS.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone,
      contactType: 'customer service',
      areaServed: BUSINESS.areaServed,
      availableLanguage: ['en', 'si'],
    })),
    parentOrganization: { '@id': SCHEMA_IDS.organization },
    sameAs: SAME_AS,
  };
}

/** The site itself, so search engines can attach sitelinks to the right entity. */
export function websiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: SEO_CONFIG.name,
    description: SEO_CONFIG.description,
    inLanguage: SEO_CONFIG.language,
    publisher: { '@id': SCHEMA_IDS.organization },
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** App-relative path; omit on the final (current) crumb. */
  path?: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      ...(entry.path ? { item: absoluteUrl(entry.path) } : {}),
    })),
  };
}

export interface GalleryImage {
  url: string;
  name?: string;
  description?: string;
}

/** A portfolio category or subcategory rendered as a browsable image gallery. */
export function imageGallerySchema(input: {
  name: string;
  description?: string;
  path: string;
  images: GalleryImage[];
}): JsonLdObject {
  return {
    '@type': 'ImageGallery',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url: absoluteUrl(input.path),
    inLanguage: SEO_CONFIG.language,
    isPartOf: { '@id': SCHEMA_IDS.website },
    publisher: { '@id': SCHEMA_IDS.organization },
    ...(input.images.length
      ? {
          associatedMedia: input.images.map((image) => ({
            '@type': 'ImageObject',
            contentUrl: image.url,
            ...(image.name ? { name: image.name } : {}),
            ...(image.description ? { description: image.description } : {}),
            creditText: SEO_CONFIG.name,
            copyrightNotice: `© ${SEO_CONFIG.name}`,
          })),
        }
      : {}),
  };
}

/** A service line offered from the workshop. */
export function serviceSchema(input: {
  name: string;
  description?: string;
  path?: string;
}): JsonLdObject {
  return {
    '@type': 'Service',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(input.path ? { url: absoluteUrl(input.path) } : {}),
    serviceType: input.name,
    provider: { '@id': SCHEMA_IDS.localBusiness },
    areaServed: {
      '@type': 'Country',
      name: BUSINESS.address.countryName,
    },
  };
}

/** Wrap a set of services in an ItemList so they are read as one offering set. */
export function serviceListSchema(
  services: Array<{ name: string; description?: string }>,
  path = '/'
): JsonLdObject {
  return {
    '@type': 'ItemList',
    name: `Services by ${SEO_CONFIG.name}`,
    url: absoluteUrl(path),
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: serviceSchema({ name: service.name, description: service.description }),
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLdObject {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  section?: string;
}): JsonLdObject {
  return {
    '@type': 'Article',
    headline: input.title,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(input.path),
    },
    url: absoluteUrl(input.path),
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    inLanguage: SEO_CONFIG.language,
    author: {
      '@type': 'Organization',
      name: input.author || SEO_CONFIG.name,
      url: SITE_URL,
    },
    publisher: { '@id': SCHEMA_IDS.organization },
  };
}

/** A "get in touch" page, so the business contact details are machine-readable. */
export function contactPageSchema(path = '/contact'): JsonLdObject {
  return {
    '@type': 'ContactPage',
    name: `Contact ${SEO_CONFIG.name}`,
    url: absoluteUrl(path),
    inLanguage: SEO_CONFIG.language,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: { '@id': SCHEMA_IDS.localBusiness },
    mainEntity: { '@id': SCHEMA_IDS.localBusiness },
  };
}

export function aboutPageSchema(input: { path?: string; description?: string } = {}): JsonLdObject {
  return {
    '@type': 'AboutPage',
    name: `About ${SEO_CONFIG.name}`,
    url: absoluteUrl(input.path ?? '/about'),
    ...(input.description ? { description: input.description } : {}),
    inLanguage: SEO_CONFIG.language,
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: { '@id': SCHEMA_IDS.organization },
  };
}

export function collectionPageSchema(input: {
  name: string;
  description?: string;
  path: string;
}): JsonLdObject {
  return {
    '@type': 'CollectionPage',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url: absoluteUrl(input.path),
    inLanguage: SEO_CONFIG.language,
    isPartOf: { '@id': SCHEMA_IDS.website },
  };
}

/**
 * Combine any number of schema nodes into a single `@graph` document, which is
 * what should be rendered into the page.
 */
export function jsonLdGraph(...nodes: Array<JsonLdObject | null | undefined>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean) as JsonLdObject[],
  };
}
