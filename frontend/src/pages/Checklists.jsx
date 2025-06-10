import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Checklists() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Checklists</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Checklist
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Checklist Templates</h2>
          <div className="text-gray-500">
            No checklist templates found. Create your first checklist to get started.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h2>
          <div className="text-gray-500">
            No recent checklist entries found.
          </div>
        </div>
      </div>
    </div>
  );
}