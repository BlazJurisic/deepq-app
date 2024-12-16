import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'admin',
    status: 'active',
    lastActive: new Date(),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'user-2',
    name: 'Michael Rodriguez',
    email: 'michael.r@company.com',
    role: 'manager',
    status: 'active',
    lastActive: new Date(Date.now() - 3600000),
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
  },
  {
    id: 'user-3',
    name: 'Alex Thompson',
    email: 'alex.t@company.com',
    role: 'analyst',
    status: 'inactive',
    lastActive: new Date(Date.now() - 86400000),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];