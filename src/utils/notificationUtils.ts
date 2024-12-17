import { Notification } from '../types/notification';

type MockNotificationParams = Pick<Notification, 'title' | 'message' | 'type'>;

let notificationCounter = 0;

export function createMockNotification(params: MockNotificationParams): MockNotificationParams & { id: string } {
  return {
    ...params,
    id: `notification-${Date.now()}-${notificationCounter++}`
  };
}

export function formatNotificationTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  
  return date.toLocaleDateString();
}
