import React from 'react';
import { Video, Phone } from 'lucide-react';
import { Activity } from '../../types/dashboard';

interface ActivityTableProps {
  activities: Activity[];
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="bg-background-card rounded-lg p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-content-primary">Latest activity</h2>
        <button className="text-content-secondary hover:text-content-primary">•••</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-content-secondary text-sm">
              <th className="text-left pb-4">CHANNEL</th>
              <th className="text-left pb-4">BRANCH</th>
              <th className="text-left pb-4">DATE & TIME</th>
              <th className="text-left pb-4">DURATION</th>
              <th className="text-left pb-4">CALL ID</th>
              <th className="text-left pb-4">ACTIVITY</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-t">
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    {activity.channel === 'Google Meet' ? (
                      <Video size={16} className="text-blue-400" />
                    ) : (
                      <Phone size={16} className="text-green-400" />
                    )}
                    <span className="text-content-primary">{activity.channel}</span>
                  </div>
                </td>
                <td className="py-4 text-content-secondary">{activity.branch}</td>
                <td className="py-4 text-content-secondary">{activity.dateTime}</td>
                <td className="py-4 text-content-secondary">{activity.duration}</td>
                <td className="py-4 text-content-secondary">{activity.callId}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    activity.status === 'Safe' 
                      ? 'bg-green-500/20 text-green-600'
                      : 'bg-yellow-500/20 text-yellow-600'
                  }`}>
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}