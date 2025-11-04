import type { Testimonial } from '@/lib/api/strapi';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-aos="fade-up">
            Client Testimonials
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Words From Those Who Trust Our Craftsmanship
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.documentId}
              className="testimonial-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="testimonial-quote">
                <p>"{testimonial.quote}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.authorName}</h4>
                <p>{testimonial.authorRole}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
