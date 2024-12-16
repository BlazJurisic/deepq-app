import React from 'react';
import { Platform } from '../../types/integration';

interface SetupInstructionsProps {
  platform: Platform;
  onAddAccount: () => void;
}

export default function SetupInstructions({ platform, onAddAccount }: SetupInstructionsProps) {
  return (
    <div className="bg-background-card rounded-lg p-6 border mb-8">
      <h2 className="text-xl font-bold text-content-primary mb-4">
        Let's get you connected to {platform.name}
      </h2>
      <p className="text-content-secondary mb-4">{platform.description}</p>
      
      <div className="mb-6">
        <h3 className="text-content-primary font-semibold mb-2">Setup Instructions:</h3>
        <ol className="list-decimal list-inside text-content-secondary space-y-2">
          {platform.setupInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <button
        onClick={onAddAccount}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        Add account
      </button>
    </div>
  );
}