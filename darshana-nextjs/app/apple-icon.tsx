import { ImageResponse } from 'next/og';
import { OG_THEME } from '@/lib/seo/config';

/**
 * Apple touch icon (home-screen bookmark on iOS).
 *
 * Rendered as a monogram rather than the logo SVG: the logo relies on CSS
 * classes inside a <style> block, which the OG renderer does not apply.
 */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(145deg, ${OG_THEME.background} 0%, ${OG_THEME.surface} 60%, #2a2a2a 100%)`,
          color: OG_THEME.text,
          fontFamily: 'sans-serif',
          fontSize: 62,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        DGK
      </div>
    ),
    size
  );
}
