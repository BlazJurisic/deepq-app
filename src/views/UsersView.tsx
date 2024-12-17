import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserCard from '../components/users/UserCard';
import UserStats from '../components/users/UserStats';
import AddUserModal from '../components/users/AddUserModal';
import { Plus } from 'lucide-react';

export default function UsersView() {
  const { users, addUser, updateUserStatus, deleteUser } = useUsers();
  const [showAddModal, setShowAddModal] = useState(false);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    newUsersThisMonth: users.filter(u => 
      u.lastActive.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    ).length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-content-primary">Users</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Plus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UserStats stats={stats} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onStatusChange={(status) => updateUserStatus(user.id, status)}
            onDelete={() => deleteUser(user.id)}
          />
        ))}
      </div>

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(userData) => addUser({ ...userData, status: 'active' })}
      />
    </div>
  );
}
