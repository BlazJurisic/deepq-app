import React from 'react';
import { Shield, Activity, BarChart } from 'lucide-react';
import { User } from '../../types/user';

interface UserRoleBadgeProps {
  role: User['role'];
}

const RoleIcon = ({ role }: UserRoleBadgeProps) => {
  switch (role) {
    case 'admin':
      return <Shield className="text-purple-500" size={16} />;
    case 'manager':
      return <Activity className="text-blue-500" size={16} />;
    case 'analyst':
      return <BarChart className="text-green-500" size={16} />;
  }
};

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <div className="flex items-center space-x-2">
      <RoleIcon role={role} />
      <span className="text-content-secondary text-sm capitalize">{role}</span>
    </div>
  );
}
