import { useEffect, useCallback } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { createMockNotification } from './notificationUtils';

export function useMockNotifications() {
  const { showNotification } = useNotifications();

  const showInitialNotifications = useCallback(() => {
    showNotification(createMockNotification({
      title: 'Suspicious Activity Detected',
      message: 'A potential deepfake was detected in the latest Google Meet call.',
      type: 'warning'
    }));

    showNotification(createMockNotification({
      title: 'System Update',
      message: 'DeepDetect v2.1 has been successfully deployed.',
      type: 'success'
    }));
  }, [showNotification]);

  const setupPeriodicNotifications = useCallback(() => {
    const showPeriodic = () => {
      showNotification(createMockNotification({
        title: 'New Scan Complete',
        message: 'Call analysis completed with 99.7% confidence score.',
        type: 'info'
      }));

      setTimeout(() => {
        showNotification(createMockNotification({
          title: 'Model Performance Update',
          message: 'Detection accuracy increased to 99.8% after latest training.',
          type: 'success'
        }));
      }, 5000);
    };

    const interval = setInterval(showPeriodic, 60000);
    return () => clearInterval(interval);
  }, [showNotification]);

  useEffect(() => {
    showInitialNotifications();
    return setupPeriodicNotifications();
  }, [showInitialNotifications, setupPeriodicNotifications]);
}