import Image from 'next/image';
import type { SiteSetting } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface FoundersStorySectionProps {
  siteSettings: SiteSetting | null;
}

export default function FoundersStorySection({ siteSettings }: FoundersStorySectionProps) {
  // Helper function to get legacy image URL
  const getLegacyImageUrl = () => {
    if (siteSettings?.legacyImage) {
      // Try to get URL from formats.large or formats.medium, or direct url
      const imageUrl = siteSettings.legacyImage.formats?.large?.url ||
                       siteSettings.legacyImage.formats?.medium?.url ||
                       siteSettings.legacyImage.url;

      if (imageUrl) {
        let url = imageUrl.startsWith('http')
          ? imageUrl
          : `${API_URL}${imageUrl}`;

        url = url.replace('http://localhost:1337', API_URL);
        return url;
      }
    }
    return 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80&auto=format&fit=crop';
  };

  return (
    <>
      {/* Founder's Story */}
      <section className="founders-story" id="about">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title" data-aos="fade-up">
              A Legacy Carved in Stone
            </h2>
            <div className="story-grid">
              <div className="story-text" data-aos="fade-right">
                <p className="lead-text">
                  Since 1911, our family has been shaping Sri Lanka's spiritual and cultural landscape
                  through the ancient art of granite carving.
                </p>
                <p>
                  From my grandfather's dedication to completing the Keragala Temple's stone preaching
                  hall—organizing village dramas to raise funds—to today's modern workshop, our journey
                  spans four generations of unwavering commitment to this sacred craft.
                </p>
                <p>
                  We've grown from hand-carved tombstones to creating monuments for national landmarks,
                  Buddha statues inspired by Anuradhapura's Samadhi Pilimaya, and conservation work on
                  Sri Lanka's most revered sites. Each piece carries the same dedication that began over
                  a century ago.
                </p>
              </div>
              <div className="story-image" data-aos="fade-left">
                <Image
                  src={getLegacyImageUrl()}
                  alt="Stone Carving Heritage"
                  width={800}
                  height={600}
                  unoptimized
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <div className="values-box" data-aos="fade-up">
            <h3>Our Core Values</h3>
            <p>
              Rooted in mastery and attention to detail, preserving the ancient art of Sri Lankan granite
              carving with spiritual respect and integrity. As a fourth-generation family business, we take
              pride in continuing this legacy with humility and dedication, while mentoring future artisans
              to keep our traditions alive.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
