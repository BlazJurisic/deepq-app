import { useState, useCallback } from 'react';
import { Notification, NotificationContextType } from '../types/notification';

export function useNotificationState(): NotificationContextType {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'> & { id: string }) => {
    const newNotification: Notification = {
      ...notification,
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    markAsRead,
    clearNotification,
    clearAll
  };
}
