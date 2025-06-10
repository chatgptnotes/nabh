import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Incidents() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Report Incident
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Open Incidents</h3>
          <p className="text-2xl font-bold text-red-600">2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Investigating</h3>
          <p className="text-2xl font-bold text-yellow-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Resolved</h3>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Critical</h3>
          <p className="text-2xl font-bold text-purple-600">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Hand Hygiene Non-Compliance</h3>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Medium</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Emergency Department</p>
              <p className="text-gray-500 text-xs">Reported by Nurse Mary ED</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Ventilator Malfunction</h3>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">High</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Intensive Care Unit</p>
              <p className="text-gray-500 text-xs">Reported by Nurse John ICU</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}