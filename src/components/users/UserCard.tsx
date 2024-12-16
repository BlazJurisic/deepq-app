import React from 'react';
import { User } from '../../types/user';
import { Shield, Activity, BarChart } from 'lucide-react';
import { formatNotificationTime } from '../../utils/notificationUtils';
import UserAvatar from './UserAvatar';
import UserRoleBadge from './UserRoleBadge';
import UserStatusSelect from './UserStatusSelect';

interface UserCardProps {
  user: User;
  onStatusChange: (status: User['status']) => void;
  onDelete: () => void;
}

export default function UserCard({ user, onStatusChange, onDelete }: UserCardProps) {
  return (
    <div className="bg-background-card p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <UserAvatar user={user} />
        <div className="flex-1">
          <h3 className="text-content-primary font-medium">{user.name}</h3>
          <p className="text-content-secondary text-sm">{user.email}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <UserRoleBadge role={user.role} />
        <span className="text-content-secondary text-xs">
          Last active: {formatNotificationTime(user.lastActive)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <UserStatusSelect status={user.status} onChange={onStatusChange} />
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}