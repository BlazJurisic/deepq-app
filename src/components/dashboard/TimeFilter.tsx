import React from 'react';
import { TimeRange } from '../../types/dashboard';
import { TIME_RANGES } from '../../utils/constants';

interface TimeFilterProps {
  currentRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export default function TimeFilter({ currentRange, onChange }: TimeFilterProps) {
  return (
    <div className="flex space-x-2">
      {TIME_RANGES.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id as TimeRange)}
          className={`px-4 py-2 rounded-lg transition-colors border ${
            currentRange === id
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-background-card text-content-primary hover:border-purple-600 border-border'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}