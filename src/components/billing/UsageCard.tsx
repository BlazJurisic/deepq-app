import React from 'react';
import { UsageMetrics } from '../../types/billing';

interface UsageCardProps {
  metrics: UsageMetrics;
}

export default function UsageCard({ metrics }: UsageCardProps) {
  const calculatePercentage = (used: number, limit: number) => (used / limit) * 100;

  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold text-content-primary mb-6">Current Usage</h3>
      <div className="space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2">
            <span className="text-content-primary">Scans Used</span>
            <span className="text-content-secondary">
              {metrics.scansUsed.toLocaleString()} / {metrics.scansLimit.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-background-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${calculatePercentage(metrics.scansUsed, metrics.scansLimit)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2">
            <span className="text-content-primary">API Calls</span>
            <span className="text-content-secondary">
              {metrics.apiCalls.toLocaleString()} / {metrics.apiLimit.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-background-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${calculatePercentage(metrics.apiCalls, metrics.apiLimit)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm mb-2">
            <span className="text-content-primary">Storage</span>
            <span className="text-content-secondary">
              {(metrics.storageUsed / 1024).toFixed(1)}GB / {(metrics.storageLimit / 1024).toFixed(1)}GB
            </span>
          </div>
          <div className="h-2 bg-background-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${calculatePercentage(metrics.storageUsed, metrics.storageLimit)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
