import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <div className="mb-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200 group"
      >
        <div className="p-2 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-semibold text-gray-900">Back</span>
      </button>
    </div>
  );
};

export default BackButton;