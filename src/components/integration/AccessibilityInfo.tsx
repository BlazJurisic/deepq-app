import React from 'react';
import { Accessibility } from 'lucide-react';

export default function AccessibilityInfo() {
  return (
    <div className="bg-background-card p-4 rounded-lg border mt-8">
      <div className="flex items-center space-x-2 mb-2">
        <Accessibility className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-content-primary">Accessibility Information</h3>
      </div>
      <ul className="space-y-2 text-content-secondary">
        <li>• All interactive elements are keyboard accessible</li>
        <li>• Color contrast ratios meet WCAG 2.1 AA standards (minimum 4.5:1)</li>
        <li>• Screen reader optimized with ARIA labels and semantic HTML</li>
        <li>• Focus indicators visible for keyboard navigation</li>
      </ul>
    </div>
  );
}