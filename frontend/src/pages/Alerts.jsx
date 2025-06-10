import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Alerts() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Mark All Read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Unread Alerts</h3>
          <p className="text-2xl font-bold text-orange-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Critical</h3>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Today</h3>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Document Expiration Alert</h3>
                <p className="text-gray-600 text-sm">Policy document expires in 7 days</p>
                <p className="text-gray-500 text-xs mt-1">Quality Assurance • 2 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">High</span>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Checklist Overdue</h3>
                <p className="text-gray-600 text-sm">Daily safety checklist needs completion</p>
                <p className="text-gray-500 text-xs mt-1">Emergency Department • 4 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Medium</span>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Audit Scheduled</h3>
                <p className="text-gray-600 text-sm">NABH audit scheduled for next week</p>
                <p className="text-gray-500 text-xs mt-1">System • 1 day ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}