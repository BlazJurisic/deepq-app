import React from 'react';
import { Download } from 'lucide-react';
import { Invoice } from '../../types/billing';

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="bg-background-card rounded-lg p-4 sm:p-6 border">
      <h3 className="text-lg font-semibold text-content-primary mb-6">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-content-secondary text-sm">
              <th className="text-left pb-4">DATE</th>
              <th className="text-left pb-4">BILLING PERIOD</th>
              <th className="text-left pb-4">AMOUNT</th>
              <th className="text-left pb-4">STATUS</th>
              <th className="text-left pb-4">INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-t">
                <td className="py-4 text-content-primary">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="py-4 text-content-secondary">{invoice.billingPeriod}</td>
                <td className="py-4 text-content-primary">${invoice.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    invoice.status === 'paid'
                      ? 'bg-green-500/20 text-green-400'
                      : invoice.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <button className="p-2 text-content-secondary hover:text-content-primary transition-colors">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}