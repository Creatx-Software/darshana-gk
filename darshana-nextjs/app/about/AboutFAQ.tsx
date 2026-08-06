'use client';

import { useState } from 'react';
import { faqData } from '@/lib/data/faq';

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
