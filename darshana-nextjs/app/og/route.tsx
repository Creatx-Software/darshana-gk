import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { OG_IMAGE_SIZE, OG_THEME, SEO_CONFIG } from '@/lib/seo/config';
import { truncate } from '@/lib/seo/utils';

/**
 * Branded 1200x630 share card, generated on demand.
 *
 * `/og?title=Sacred%20Forms&eyebrow=Portfolio`
 *
 * Pages that have real photography of the work pass that image to Open Graph
 * instead; this is the fallback for pages that do not.
 */

export const runtime = 'nodejs';
// Cards only change when the title changes, so they cache for a day.
export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = truncate(searchParams.get('title')?.trim() || SEO_CONFIG.name, 90);
  const eyebrow = truncate(searchParams.get('eyebrow')?.trim() || '', 40);

  // Long titles need to step down a size or they overflow the card.
  const titleSize = title.length > 60 ? 62 : title.length > 34 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: `linear-gradient(145deg, ${OG_THEME.background} 0%, ${OG_THEME.surface} 55%, #242424 100%)`,
          color: OG_THEME.text,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Carved edge accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 10,
            height: '100%',
            background: `linear-gradient(180deg, ${OG_THEME.accent} 0%, ${OG_THEME.muted} 45%, transparent 100%)`,
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: OG_THEME.accent,
            }}
          >
            {SEO_CONFIG.name}
          </div>
          <div
            style={{
              display: 'flex',
              width: 96,
              height: 2,
              background: OG_THEME.muted,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                fontSize: 26,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: OG_THEME.muted,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: OG_THEME.muted,
          }}
        >
          <div style={{ display: 'flex' }}>
            Sri Lankan stone carving since {SEO_CONFIG.foundingYear}
          </div>
          <div style={{ display: 'flex', color: OG_THEME.accent }}>
            {SEO_CONFIG.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_SIZE.width,
      height: OG_IMAGE_SIZE.height,
      headers: {
        'Cache-Control': 'public, immutable, no-transform, max-age=86400',
      },
    }
  );
}
