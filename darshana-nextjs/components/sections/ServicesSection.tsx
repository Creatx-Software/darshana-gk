import type { Service } from '@/lib/api/strapi';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">
            Our Services
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Comprehensive Stone Crafting Solutions
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.documentId}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
