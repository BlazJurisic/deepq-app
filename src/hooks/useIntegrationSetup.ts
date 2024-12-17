import { useState, useCallback } from 'react';

interface SetupStep {
  id: number;
  completed: boolean;
  title: string;
}

export function useIntegrationSetup() {
  const [steps, setSteps] = useState<SetupStep[]>([
    { id: 1, completed: false, title: 'Google Workspace Authentication' },
    { id: 2, completed: false, title: 'Permission Configuration' },
    { id: 3, completed: false, title: 'Team Member Setup' }
  ]);

  const completeStep = useCallback((stepId: number) => {
    setSteps(prev => prev.map(step =>
      step.id === stepId ? { ...step, completed: true } : step
    ));
  }, []);

  const resetSetup = useCallback(() => {
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
  }, []);

  return {
    steps,
    completeStep,
    resetSetup,
    isComplete: steps.every(step => step.completed)
  };
}
