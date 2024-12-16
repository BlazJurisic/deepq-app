import React from 'react';
import { User } from '../../types/user';

interface UserAvatarProps {
  user: User;
  size?: number;
}

export default function UserAvatar({ user, size = 12 }: UserAvatarProps) {
  return (
    <img
      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
      alt={user.name}
      className={`w-${size} h-${size} rounded-full`}
    />
  );
}