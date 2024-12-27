import React, { useState } from 'react';
import PlatformSelector from '../components/integration/PlatformSelector';
import SetupInstructions from '../components/integration/SetupInstructions';
import AccountsTable from '../components/integration/AccountsTable';
import AddAccountModal from '../components/integration/AddAccountModal';
import { useIntegration } from '../hooks/useIntegration';

export default function IntegrationView() {
  const {
    selectedPlatform,
    setSelectedPlatform,
    accounts,
    addAccount,
    removeAccount,
    enable2FA,
    platforms
  } = useIntegration();

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-content-primary">Integration</h2>
      </div>

      {/* Platform Selection */}
      <PlatformSelector
        platforms={platforms}
        selectedPlatform={selectedPlatform}
        onSelect={setSelectedPlatform}
      />

      {/* Setup Instructions */}
      <SetupInstructions
        platform={platforms.find(p => p.id === selectedPlatform)!}
        onAddAccount={() => setShowAddModal(true)}
      />

      {/* Accounts Table */}
      <AccountsTable
        accounts={accounts.filter(a => a.platform === selectedPlatform)}
        onRemove={removeAccount}
        onEnable2FA={enable2FA}
      />

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(name, email) => {
          addAccount(email, name);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}
