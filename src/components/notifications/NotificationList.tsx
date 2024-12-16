import React from 'react';
import { X, Check, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Notification } from '../../types/notification';
import { formatNotificationTime } from '../../utils/notificationUtils';

interface NotificationListProps {
  onClose: () => void;
}

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'success':
      return <Check className="text-green-500" size={20} />;
    case 'warning':
      return <AlertTriangle className="text-yellow-500" size={20} />;
    case 'error':
      return <AlertCircle className="text-red-500" size={20} />;
    default:
      return <Info className="text-blue-500" size={20} />;
  }
};

export default function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, markAsRead, clearNotification, clearAll } = useNotifications();

  return (
    <div className="bg-background-card rounded-lg shadow-lg border overflow-hidden">
      <div className="p-4 border-b sticky top-0 bg-background-card z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-content-primary">Notifications</h3>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-content-secondary hover:text-content-primary transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="text-content-secondary hover:text-content-primary transition-colors lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[400px] overscroll-contain">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-content-secondary">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b flex items-start space-x-3 hover:bg-background-primary transition-colors ${
                !notification.read ? 'bg-background-primary/50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <NotificationIcon type={notification.type} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-content-primary">
                    {notification.title}
                  </h4>
                  <span className="text-xs text-content-secondary ml-2 whitespace-nowrap">
                    {formatNotificationTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-content-secondary mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(notification.id);
                }}
                className="text-content-secondary hover:text-content-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}