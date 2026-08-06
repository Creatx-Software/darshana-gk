import { API_URL } from '@/lib/api/config';
import { SITE_URL } from './config';

/**
 * Resolve an app-relative path to an absolute URL on the public site origin.
 * Already-absolute URLs are returned untouched.
 */
export function absoluteUrl(path = '/'): string {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Resolve a Strapi media object to an absolute, publicly reachable URL.
 *
 * Strapi stores relative upload paths, and older records in this database were
 * written while the CMS ran on localhost — both cases are normalised here so the
 * URL is safe to hand to Facebook, X and Google.
 */
export function strapiMediaUrl(media: any): string | null {
  if (!media) return null;

  // Accept both `{ url }` and Strapi v4-style `{ data: { attributes: { url } } }`.
  const node = media?.data?.attributes ?? media;
  const raw: string | undefined =
    node?.formats?.large?.url ||
    node?.formats?.medium?.url ||
    node?.url ||
    node?.formats?.small?.url;

  if (!raw) return null;

  const url = raw.startsWith('http') ? raw : `${API_URL}${raw}`;
  return url.replace(/^https?:\/\/localhost:1337/, API_URL);
}

/** Pixel dimensions of a Strapi media object, when it reports them. */
export function strapiMediaSize(media: any): { width?: number; height?: number } {
  const node = media?.data?.attributes ?? media;
  const format = node?.formats?.large || node?.formats?.medium || node;
  return {
    width: typeof format?.width === 'number' ? format.width : undefined,
    height: typeof format?.height === 'number' ? format.height : undefined,
  };
}

/**
 * Flatten Strapi richtext / markdown into a single line of plain text suitable
 * for a meta description, trimmed to `maxLength` on a word boundary.
 */
export function toPlainText(input: unknown, maxLength = 160): string {
  if (!input) return '';

  let text = '';

  if (typeof input === 'string') {
    text = input;
  } else if (Array.isArray(input)) {
    // Strapi "blocks" richtext: [{ children: [{ text }] }]
    text = input
      .map((block: any) =>
        Array.isArray(block?.children)
          ? block.children.map((child: any) => child?.text ?? '').join('')
          : ''
      )
      .join(' ');
  } else {
    return '';
  }

  const cleaned = text
    .replace(/<[^>]*>/g, ' ') // html tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links -> label
    .replace(/[#*_>`~]/g, ' ') // markdown syntax
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();

  return truncate(cleaned, maxLength);
}

/** Truncate on a word boundary, appending an ellipsis when text was cut. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
}

/** Strip anything that would break a `<title>` and clamp it to a sane length. */
export function toTitle(text: string, maxLength = 60): string {
  return truncate(text.replace(/\s+/g, ' ').trim(), maxLength);
}
