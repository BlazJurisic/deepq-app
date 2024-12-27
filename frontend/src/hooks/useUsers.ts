import { useState, useCallback, useEffect } from 'react';
import { User } from '../types/user';
import { usersApi } from '../services/api/users';
import { useNotifications } from '../contexts/NotificationContext';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotifications();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to fetch users',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback(async (userData: Omit<User, 'id' | 'lastActive'>) => {
    try {
      await usersApi.create(userData);
      fetchUsers();
      showNotification({
        title: 'Success',
        message: 'User added successfully',
        type: 'success'
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to add user',
        type: 'error'
      });
    }
  }, [fetchUsers, showNotification]);

  const updateUserStatus = useCallback(async (userId: string, status: User['status']) => {
    try {
      await usersApi.update(userId, { status });
      fetchUsers();
      showNotification({
        title: 'Success',
        message: 'User status updated',
        type: 'success'
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to update user status',
        type: 'error'
      });
    }
  }, [fetchUsers, showNotification]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      await usersApi.delete(userId);
      fetchUsers();
      showNotification({
        title: 'Success',
        message: 'User deleted successfully',
        type: 'success'
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to delete user',
        type: 'error'
      });
    }
  }, [fetchUsers, showNotification]);

  return {
    users,
    isLoading,
    addUser,
    updateUserStatus,
    deleteUser
  };
}
