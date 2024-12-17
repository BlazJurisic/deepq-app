import React from 'react';
import ResourceCard from '../components/help/ResourceCard';
import FaqSection from '../components/help/FaqSection';
import ContactSupport from '../components/help/ContactSupport';
import { resources } from '../data/helpResources';

export default function HelpSupportView() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-content-primary mb-6">Help & Support</h2>

      <div className="space-y-6">
        {/* Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>

        {/* FAQs */}
        <FaqSection />

        {/* Contact Support */}
        <ContactSupport />
      </div>
    </div>
  );
}
