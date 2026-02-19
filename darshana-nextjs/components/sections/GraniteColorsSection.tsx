import type { GraniteColor } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface GraniteColorsSectionProps {
  colors: GraniteColor[];
}

function getImageUrl(image: any): string | null {
  if (!image?.url) return null;
  const url = image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`;
  return url.replace('http://localhost:1337', API_URL);
}

export default function GraniteColorsSection({ colors }: GraniteColorsSectionProps) {
  return (
    <section className="granite-colors">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Stock Granite Colors
        </h2>
        <div className="colors-grid">
          {colors.map((color, index) => {
            const imageUrl = getImageUrl(color.image);
            return (
              <div
                key={color.documentId}
                className="color-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div
                  className="color-swatch"
                  style={{
                    background: imageUrl
                      ? 'none'
                      : color.colorCode
                        ? `linear-gradient(135deg, ${color.colorCode} 0%, ${color.colorCode}dd 100%)`
                        : 'linear-gradient(135deg, #6b6b6b 0%, #4a4a4a 100%)'
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={color.name}
                      className="color-swatch-img"
                    />
                  )}
                  <div className="color-info">
                    <p className="color-origin">Origin: {color.origin}</p>
                  </div>
                </div>
                <h4>{color.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
