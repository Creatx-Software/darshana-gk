import Image from 'next/image';
import type { SiteSetting } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';

interface AboutSectionProps {
  siteSettings: SiteSetting | null;
}

export default function AboutSection({ siteSettings }: AboutSectionProps) {
  // Helper function to get heritage image URL
  const getHeritageImageUrl = () => {
    if (siteSettings?.heritageImage) {
      // Try to get URL from formats.large or formats.medium, or direct url
      const imageUrl = siteSettings.heritageImage.formats?.large?.url ||
                       siteSettings.heritageImage.formats?.medium?.url ||
                       siteSettings.heritageImage.url;

      if (imageUrl) {
        let url = imageUrl.startsWith('http')
          ? imageUrl
          : `${API_URL}${imageUrl}`;

        url = url.replace('http://localhost:1337', API_URL);
        return url;
      }
    }
    return 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&auto=format&fit=crop';
  };

  return (
    <>
      {/* About Intro */}
      <section className="about-intro" id="about-intro">
        <div className="container">
          <div className="about-grid">
            <div className="about-text" data-aos="fade-right">
              <h2 className="section-title">Our Heritage</h2>
              <p className="lead-text">
                Our company stands on a foundation of time-honored granite carving traditions,
                blending artistry with advanced craftsmanship. Rooted in the heritage of skilled
                sculptors who shaped Sri Lanka's temples and sacred sites, we have evolved from
                hand-tool techniques to modern machinery and innovative processes.
              </p>
              <p>
                Today, we specialize in tombstones, statues, historical reproductions, and conservation
                projects—each piece crafted as a unique work of art that carries meaning and cultural
                significance.
              </p>
            </div>
            <div className="about-image" data-aos="fade-left">
              <Image
                src={getHeritageImageUrl()}
                alt="Stone Carving Craftsmanship"
                width={800}
                height={600}
                unoptimized
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card" data-aos="fade-up">
              <div className="mv-icon mv-icon-mission"></div>
              <h3>Our Mission</h3>
              <p>
                To preserve and continue Sri Lanka's ancient granite carving traditions through
                masterful craftsmanship, carving not just stone, but meaning, memory, and culture,
                honoring the artistry passed down through generations.
              </p>
            </div>
            <div className="mv-card" data-aos="fade-up" data-aos-delay="200">
              <div className="mv-icon mv-icon-vision"></div>
              <h3>Our Vision</h3>
              <p>
                To be a symbol of excellence in Sri Lankan granite carving, preserving our ancestral
                craft while inspiring future generations to carry forward its cultural and spiritual legacy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
