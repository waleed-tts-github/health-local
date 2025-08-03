import React from 'react';
import { Calendar, Clock, Activity, Eye } from 'lucide-react';

const BloodDonationsReceived = ({ filteredReceived, getStatusColor, getStatusIcon }) => {
  return (
    <div className="space-y-4">
      {filteredReceived.map((received) => (
        <div key={received.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base text-gray-900">Blood Transfusion</h4>
                <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{received.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 sm:h-4 w-3 sm:h-4" />
                    <span>{received.time}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(received.status)}`}>
                {getStatusIcon(received.status)}
                <span className="capitalize">{received.status}</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{received.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Group</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{received.bloodType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Received From</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{received.donor}</p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for transfusion ${received.id}`}>
              <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodDonationsReceived;