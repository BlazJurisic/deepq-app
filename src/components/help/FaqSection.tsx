import React from 'react';
import { faqs } from '../../data/faqData';

export default function FaqSection() {
  return (
    <div className="bg-background-card rounded-lg border p-4 sm:p-6">
      <h3 className="text-xl font-semibold text-content-primary mb-6">
        Frequently Asked Questions
      </h3>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-lg font-medium text-content-primary">{faq.question}</h4>
            <p className="text-content-secondary">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}