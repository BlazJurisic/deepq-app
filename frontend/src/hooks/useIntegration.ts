import { useState } from 'react';
import { PlatformId, Account } from '../types/integration';
import { platforms } from '../data/platforms';

export function useIntegration() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('google-meet');
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Ethan Johnson',
      email: 'ethan@deepq.io',
      platform: 'google-meet',
      status: '2fa-disabled',
      dateAdded: '2024-03-20'
    },
    {
      id: '2',
      name: 'Liam Anderson',
      email: 'liam@deepq.io',
      platform: 'google-meet',
      status: '2fa-disabled',
      dateAdded: '2024-03-20'
    }
  ]);

  const addAccount = (email: string, name: string) => {
    const newAccount: Account = {
      id: Date.now().toString(),
      name,
      email,
      platform: selectedPlatform,
      status: '2fa-disabled',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setAccounts([...accounts, newAccount]);
  };

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const enable2FA = (id: string) => {
    setAccounts(accounts.map(account =>
      account.id === id
        ? { ...account, status: '2fa-enabled' as const }
        : account
    ));
  };

  return {
    selectedPlatform,
    setSelectedPlatform,
    accounts,
    addAccount,
    removeAccount,
    enable2FA,
    platforms
  };
}
