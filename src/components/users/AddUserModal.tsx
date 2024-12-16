import React from 'react';
import { User } from '../../types/user';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: Omit<User, 'id' | 'lastActive' | 'status'>) => void;
}

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  const [newUser, setNewUser] = React.useState({
    name: '',
    email: '',
    role: 'analyst' as const
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-background-card p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold text-content-primary mb-4">Add New User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-content-secondary mb-2">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-background-primary rounded-lg text-content-primary"
            />
          </div>
          <div>
            <label className="block text-content-secondary mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-background-primary rounded-lg text-content-primary"
            />
          </div>
          <div>
            <label className="block text-content-secondary mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as User['role'] }))}
              className="w-full px-3 py-2 bg-background-primary rounded-lg text-content-primary"
            >
              <option value="analyst">Analyst</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-content-secondary hover:text-content-primary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (newUser.name && newUser.email) {
                  onAdd(newUser);
                  setNewUser({ name: '', email: '', role: 'analyst' });
                  onClose();
                }
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}