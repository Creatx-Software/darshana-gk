import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchSiteSettings } from '@/lib/api/strapi';
import { API_URL } from '@/lib/api/config';
import AboutFAQ from './AboutFAQ';

export const metadata: Metadata = {
  title: 'About Us | Darshana Gal Ketayam',
  description: 'Discover the story of Darshana Gal Ketayam - four generations of Sri Lankan stone carving excellence since 1911. Learn about our heritage, craftsmanship, and dedication to preserving this sacred art.',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const siteSettings = await fetchSiteSettings().catch(() => null);

  // Helper function to get legacy image URL
  const getLegacyImageUrl = () => {
    if (siteSettings?.legacyImage) {
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

  // Helper function to get heritage image URL
  const getHeritageImageUrl = () => {
    if (siteSettings?.heritageImage) {
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
    return 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80&auto=format&fit=crop';
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header about-page-header">
        <div className="page-header-bg">
          <img
            src="https://images.pexels.com/photos/14705328/pexels-photo-14705328.jpeg"
            alt="About Darshana Gal Ketayam"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="container">
            <div className="breadcrumb" data-aos="fade-up">
              <a href="/">Home</a>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h1 className="page-title" data-aos="fade-up" data-aos-delay="100">
              About Us
            </h1>
            <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">
              Four Generations of Stone Carving Excellence
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content" data-aos="fade-right">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Where Tradition Meets Artistry</h2>
              <p className="lead-text">
                For over a century, our hands have shaped stone into sacred forms,
                memorial tributes, and architectural wonders that stand the test of time.
              </p>
              <p>
                What began in 1911 as a humble stone carving workshop in the heart of
                Sri Lanka has evolved into a legacy of craftsmanship that spans four
                generations. Each chisel strike carries the wisdom of our ancestors,
                while embracing the precision of modern techniques.
              </p>
              <p>
                Our workshop in Mudungoda has witnessed the transformation of countless
                granite blocks into Buddha statues that inspire devotion, memorial stones
                that honor loved ones, and architectural elements that define landmarks
                across the nation.
              </p>
              <div className="about-stats">
                <div className="about-stat-item">
                  <span className="stat-number">113+</span>
                  <span className="stat-label">Years of Heritage</span>
                </div>
                <div className="about-stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Generations</span>
                </div>
                <div className="about-stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>
            </div>
            <div className="about-story-image" data-aos="fade-left">
              <div className="image-frame">
                <Image
                  src={getHeritageImageUrl()}
                  alt="Stone Carving Workshop"
                  width={600}
                  height={700}
                  unoptimized
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
              <div className="image-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section (A Legacy Carved in Stone) */}
      <section className="about-legacy-section">
        <div className="container">
          <div className="about-legacy-grid">
            <div className="about-legacy-image" data-aos="fade-right">
              <Image
                src={getLegacyImageUrl()}
                alt="Stone Carving Heritage"
                width={800}
                height={600}
                unoptimized
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="about-legacy-content" data-aos="fade-left">
              <span className="section-label">Our Heritage</span>
              <h2 className="section-title">A Legacy Carved in Stone</h2>
              <p className="lead-text">
                Since 1911, our family has been shaping Sri Lanka's spiritual and cultural
                landscape through the ancient art of granite carving.
              </p>
              <p>
                From my grandfather's dedication to completing the Keragala Temple's stone
                preaching hall—organizing village dramas to raise funds—to today's modern
                workshop, our journey spans four generations of unwavering commitment to
                this sacred craft.
              </p>
              <p>
                We've grown from hand-carved tombstones to creating monuments for national
                landmarks, Buddha statues inspired by Anuradhapura's Samadhi Pilimaya, and
                conservation work on Sri Lanka's most revered sites. Each piece carries the
                same dedication that began over a century ago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Mastery</h3>
              <p>Every piece is crafted with precision and expertise passed down through generations, ensuring exceptional quality in every detail.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Heritage</h3>
              <p>We preserve the ancient art of Sri Lankan granite carving while honoring the traditions and techniques of our ancestors.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Spiritual Respect</h3>
              <p>We approach sacred commissions with reverence, understanding the spiritual significance each piece holds for its patrons.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Family Legacy</h3>
              <p>As a fourth-generation family business, we take pride in mentoring future artisans to keep our traditions alive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <AboutFAQ />
    </>
  );
}
