import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import { dashboardApi } from '../services/api';

export default function SimpleDashboard() {
  const { user } = useAuth();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardApi.getStats(),
    enabled: !!user,
  });

  const stats = statsData?.data?.stats || {};

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to NABH Dashboard
        </h1>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
          <p><strong>Department:</strong> {user?.department?.name || 'N/A'}</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Pending Checklists</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.pendingChecklists || 0}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900">Overdue Tasks</h3>
            <p className="text-2xl font-bold text-red-600">{stats.overdueChecklists || 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900">Unread Alerts</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.unreadAlerts || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Compliance Rate</h3>
            <p className="text-2xl font-bold text-green-600">{stats.complianceRate || 0}%</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Open Incidents</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.openIncidents || 0}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900">Expiring Documents</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.expiringDocuments || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}