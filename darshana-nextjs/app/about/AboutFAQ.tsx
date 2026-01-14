'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How long have you been in the stone carving business?',
    answer: 'Our family has been crafting stone works since 1911, spanning four generations of master craftsmen. With over 113 years of experience, we have established ourselves as one of Sri Lanka\'s most trusted names in granite carving and memorial stonework.',
  },
  {
    question: 'What types of stone do you work with?',
    answer: 'We primarily work with premium granite varieties including Absolute Black, Vizag Blue, Kashmir White, and Red Granite. We also work with other natural stones based on project requirements. Each stone is carefully selected for its durability, aesthetic appeal, and suitability for the intended purpose.',
  },
  {
    question: 'How long does a typical project take to complete?',
    answer: 'Project timelines vary based on complexity and size. Simple memorial stones may take 2-3 weeks, while intricate Buddha statues or architectural elements can take 2-6 months. We provide detailed timelines during our initial consultation and keep you informed throughout the process.',
  },
  {
    question: 'Do you offer custom designs or only pre-made templates?',
    answer: 'We specialize in custom designs tailored to your specific vision. While we have a portfolio of designs for inspiration, our skilled artisans can create unique pieces based on your requirements, whether it\'s a personalized memorial, a sacred Buddha statue, or decorative architectural elements.',
  },
  {
    question: 'Can you ship your work outside of Sri Lanka?',
    answer: 'Yes, we have experience shipping our stone works internationally. We work with reliable shipping partners who specialize in handling heavy and fragile items. International shipping costs and timelines are provided during the quotation process.',
  },
  {
    question: 'What is your process for creating a Buddha statue?',
    answer: 'Creating a Buddha statue is a sacred process that begins with understanding the intended purpose and location. We follow traditional iconographic proportions (often inspired by historical statues like the Samadhi Pilimaya of Anuradhapura), create detailed drawings for approval, select appropriate granite, and then our master craftsmen bring the vision to life through careful carving, finishing, and sometimes gilding or painting.',
  },
  {
    question: 'Do you provide installation services?',
    answer: 'Yes, we offer complete installation services for all our stone works. Our experienced team handles transportation and installation, ensuring proper placement and structural integrity. For large installations like Buddha statues or architectural elements, we coordinate with construction teams and provide on-site supervision.',
  },
  {
    question: 'How do I get a quote for my project?',
    answer: 'You can request a quote by contacting us through our website, phone, or visiting our workshop in Mudungoda. We\'ll discuss your requirements, provide design recommendations, and offer a detailed quotation. For complex projects, we may arrange a site visit to better understand the scope and installation requirements.',
  },
];

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="about-faq-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our services and process
          </p>
        </div>

        <div className="faq-list" data-aos="fade-up" data-aos-delay="100">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <div className="faq-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta" data-aos="fade-up" data-aos-delay="200">
          <p>Still have questions?</p>
          <a href="/contact" className="btn btn-stone">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
