import React from 'react';
import { Check } from 'lucide-react';
import { Plan } from '../../types/billing';

interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
}

export default function PlanCard({ plan, isActive, onSelect }: PlanCardProps) {
  return (
    <div className={`p-6 rounded-lg border-2 transition-all h-full flex flex-col ${
      isActive 
        ? 'border-purple-600 bg-purple-600/10'
        : 'border-gray-200 dark:border-gray-700 bg-background-card hover:border-purple-600/50'
    }`}>
      <div className="flex-1">
        {plan.isPopular && (
          <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
            Most Popular
          </span>
        )}
        <h3 className="text-xl font-bold text-content-primary">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-content-primary">${plan.price}</span>
          <span className="text-content-secondary">/{plan.interval}</span>
        </div>
        <ul className="mt-6 space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center text-content-secondary">
              <Check size={16} className="text-purple-600 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onSelect}
        className={`mt-6 w-full py-2 rounded-lg font-medium transition-colors ${
          isActive
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : 'bg-background-primary text-content-primary hover:bg-purple-600 hover:text-white'
        }`}
      >
        {isActive ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  );
}