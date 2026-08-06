import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import ContactMap from './ContactMap';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, contactPageSchema, jsonLdGraph } from '@/lib/seo/jsonld';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Darshana Gal Ketayam. Visit our stone carving workshop on Kandy Road, Mudungoda, Gampaha, Sri Lanka, or call us to discuss your granite carving, memorial or Buddha statue project.',
  path: '/contact',
  ogEyebrow: 'Visit the workshop',
  keywords: [
    'contact stone carver Sri Lanka',
    'granite workshop Gampaha',
    'stone carving quote Sri Lanka',
    'Darshana Gal Ketayam contact',
  ],
});

const contactSchema = jsonLdGraph(
  contactPageSchema('/contact'),
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact' }])
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactSchema} />
      {/* Page Header */}
      <section className="page-header contact-page-header">
        <div className="page-header-bg">
          <img
            src="https://images.pexels.com/photos/1259789/pexels-photo-1259789.jpeg"
            alt="Contact Darshana Gal Ketayam"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="page-header-content">
          <div className="container">
            <div className="breadcrumb" data-aos="fade-up">
              <a href="/">Home</a>
              <span>/</span>
              <span>Contact</span>
            </div>
            <h1 className="page-title" data-aos="fade-up" data-aos-delay="100">
              Contact Us
            </h1>
            <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">
              Let us bring your vision to life in stone
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title no-underline" data-aos="fade-up">
              Find Us
            </h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
              Visit Our Workshop
            </p>
          </div>

          <div className="map-wrapper" data-aos="zoom-in" data-aos-delay="200">
            <ContactMap />
          </div>

          <div className="map-info-row" data-aos="fade-up" data-aos-delay="300">
            <div className="map-info-item">
              <div className="map-info-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4>Address</h4>
                <p>No. 263/1, Kandy Road, Miriswatta<br />Mudungoda, Gampaha, Sri Lanka</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=7.0544,80.0058"
              target="_blank"
              rel="noopener noreferrer"
              className="map-directions-btn"
            >
              Get Directions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactPageClient />
    </>
  );
}
