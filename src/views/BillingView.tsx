import React, { useState } from 'react';
import PlanCard from '../components/billing/PlanCard';
import UsageCard from '../components/billing/UsageCard';
import InvoiceTable from '../components/billing/InvoiceTable';
import { Plan } from '../types/billing';

export default function BillingView() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 49,
      interval: 'monthly',
      features: [
        'Up to 1,000 scans/month',
        '5,000 API calls',
        '10GB storage',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 99,
      interval: 'monthly',
      features: [
        'Up to 10,000 scans/month',
        '50,000 API calls',
        '100GB storage',
        'Priority support',
        'Advanced analytics'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      interval: 'monthly',
      features: [
        'Unlimited scans',
        'Unlimited API calls',
        '1TB storage',
        '24/7 support',
        'Custom integration',
        'SLA guarantee'
      ]
    }
  ];

  const usageMetrics = {
    scansUsed: 7523,
    scansLimit: 10000,
    apiCalls: 35842,
    apiLimit: 50000,
    storageUsed: 45056, // in MB
    storageLimit: 102400 // in MB
  };

  const invoices = [
    {
      id: '1',
      date: '2024-03-01',
      amount: 99,
      status: 'paid',
      billingPeriod: 'Mar 1 - Mar 31, 2024'
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 99,
      status: 'paid',
      billingPeriod: 'Feb 1 - Feb 29, 2024'
    },
    {
      id: '3',
      date: '2024-01-01',
      amount: 99,
      status: 'paid',
      billingPeriod: 'Jan 1 - Jan 31, 2024'
    }
  ] as const;

  return (
    <div className="space-y-8">
      {/* Subscription Plans */}
      <div>
        <h2 className="text-xl font-bold text-content-primary mb-6">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageCard metrics={usageMetrics} />
        
        {/* Current Plan Summary */}
        <div className="bg-background-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-content-primary mb-4">Current Plan</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-content-secondary">Plan</span>
              <span className="text-content-primary font-medium">Professional</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-content-secondary">Billing Period</span>
              <span className="text-content-primary">Monthly</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-content-secondary">Next Payment</span>
              <span className="text-content-primary">April 1, 2024</span>
            </div>
            <div className="pt-4 border-t">
              <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="overflow-x-auto">
        <InvoiceTable invoices={invoices} />
      </div>
    </div>
  );
}