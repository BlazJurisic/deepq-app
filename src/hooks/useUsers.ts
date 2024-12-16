import { useState, useCallback } from 'react';
import { User } from '../types/user';
import { mockUsers } from '../data/mockUsers';

export function useUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addUser = useCallback((user: Omit<User, 'id' | 'lastActive'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      lastActive: new Date(),
    };
    setUsers(prev => [...prev, newUser]);
  }, []);

  const updateUserStatus = useCallback((userId: string, status: User['status']) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, status } : user
      )
    );
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  return {
    users,
    addUser,
    updateUserStatus,
    deleteUser,
  };
}