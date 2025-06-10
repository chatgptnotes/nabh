import React from 'react';

export default function TestComponent() {
  return (
    <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS Test</h1>
      <p className="text-blue-100">If you can see this styled properly, Tailwind CSS is working!</p>
      <div className="mt-4 space-x-2">
        <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
          Button 1
        </button>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
          Button 2
        </button>
      </div>
    </div>
  );
}