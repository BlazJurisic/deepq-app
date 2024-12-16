import React from 'react';
import { User } from '../../types/user';

interface UserStatusSelectProps {
  status: User['status'];
  onChange: (status: User['status']) => void;
}

export default function UserStatusSelect({ status, onChange }: UserStatusSelectProps) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as User['status'])}
      className="bg-background-primary text-content-secondary text-sm rounded px-2 py-1"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}