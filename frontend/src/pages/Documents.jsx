import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Documents() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Library</h2>
              <div className="text-gray-500">
                No documents found. Upload your first document to get started.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expiring Soon</h3>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-orange-800 font-medium">1 document expiring</p>
                <p className="text-orange-600 text-sm">Review and renew documents before expiry</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Types</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Policies</span>
                  <span className="text-gray-900 font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Procedures</span>
                  <span className="text-gray-900 font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Forms</span>
                  <span className="text-gray-900 font-medium">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}