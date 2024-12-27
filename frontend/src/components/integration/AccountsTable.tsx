import React from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';
import { Account } from '../../types/integration';

interface AccountsTableProps {
  accounts: Account[];
  onRemove: (id: string) => void;
  onEnable2FA: (id: string) => void;
}

export default function AccountsTable({ accounts, onRemove, onEnable2FA }: AccountsTableProps) {
  if (accounts.length === 0) {
    return (
      <div className="bg-background-card rounded-lg p-6 border text-center">
        <p className="text-content-secondary">No accounts added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-background-card rounded-lg border overflow-hidden">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-6">Connected Accounts</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-content-secondary text-sm">
                <th className="text-left pb-4">NAME</th>
                <th className="text-left pb-4">EMAIL</th>
                <th className="text-left pb-4">AUTHENTICATION</th>
                <th className="text-left pb-4">STATUS</th>
                <th className="text-left pb-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-t">
                  <td className="py-4 text-content-primary">{account.name}</td>
                  <td className="py-4 text-content-secondary">{account.email}</td>
                  <td className="py-4">
                    <div className="flex items-center text-red-400">
                      <AlertCircle size={16} className="mr-2" />
                      <span>2FA {account.status === '2fa-enabled' ? 'Enabled' : 'Not Enabled'}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => onEnable2FA(account.id)}
                      className="px-4 py-1 rounded-full bg-background-primary text-content-secondary text-sm hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      Configure
                    </button>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => onRemove(account.id)}
                      className="p-2 text-content-secondary hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
