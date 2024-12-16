import React from 'react';
import { UserStats } from '../../types/user';
import { Users, UserCheck, UserPlus } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

interface UserStatsProps {
  stats: UserStats;
}

export default function UserStatsDisplay({ stats }: UserStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={Users}
      />
      <StatCard
        title="Active Users"
        value={stats.activeUsers}
        icon={UserCheck}
      />
      <StatCard
        title="New Users"
        value={stats.newUsersThisMonth}
        icon={UserPlus}
      />
    </div>
  );
}