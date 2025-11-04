import type { GraniteColor } from '@/lib/api/strapi';

interface GraniteColorsSectionProps {
  colors: GraniteColor[];
}

export default function GraniteColorsSection({ colors }: GraniteColorsSectionProps) {
  return (
    <section className="granite-colors">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Stock Granite Colors
        </h2>
        <div className="colors-grid">
          {colors.map((color, index) => (
            <div
              key={color.documentId}
              className="color-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                className="color-swatch"
                style={{
                  background: color.colorCode
                    ? `linear-gradient(135deg, ${color.colorCode} 0%, ${color.colorCode}dd 100%)`
                    : 'linear-gradient(135deg, #6b6b6b 0%, #4a4a4a 100%)'
                }}
              >
                <div className="color-info">
                  <p className="color-origin">Origin: {color.origin}</p>
                </div>
              </button>
              <h4>{color.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
