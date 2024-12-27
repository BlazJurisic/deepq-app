export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  billingPeriod: string;
}

export interface UsageMetrics {
  scansUsed: number;
  scansLimit: number;
  apiCalls: number;
  apiLimit: number;
  storageUsed: number;
  storageLimit: number;
}
