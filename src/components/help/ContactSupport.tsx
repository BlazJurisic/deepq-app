import React from 'react';

export default function ContactSupport() {
  return (
    <div className="bg-background-card rounded-lg border p-4 sm:p-6">
      <h3 className="text-xl font-semibold text-content-primary mb-4">
        Still need help?
      </h3>
      <p className="text-content-secondary mb-4">
        Our support team is available 24/7 to help you with any questions or issues.
      </p>
      <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Contact Support
      </button>
    </div>
  );
}