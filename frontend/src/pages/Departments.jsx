import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Departments() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Emergency Department</h3>
          <p className="text-gray-600 text-sm mb-4">Emergency medical care and trauma</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Intensive Care Unit</h3>
          <p className="text-gray-600 text-sm mb-4">Critical care and monitoring</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Operating Theater</h3>
          <p className="text-gray-600 text-sm mb-4">Surgical procedures and sterile environment</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Pharmacy</h3>
          <p className="text-gray-600 text-sm mb-4">Medication management and dispensing</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Laboratory</h3>
          <p className="text-gray-600 text-sm mb-4">Diagnostic testing and analysis</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
          <p className="text-gray-600 text-sm mb-4">Quality management and compliance</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Pending Tasks</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-medium text-red-600">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}