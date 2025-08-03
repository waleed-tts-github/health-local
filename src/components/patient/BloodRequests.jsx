import React from 'react';
import { User, MapPin, CheckCircle, Eye } from 'lucide-react';

const BloodRequests = ({ filteredBloodRequests, getStatusColor, getStatusIcon, handleAcknowledgeDonor }) => {
  return (
    <div className="space-y-4">
      {filteredBloodRequests.map((request) => (
        <div key={request.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base text-gray-900">Blood Request</h4>
                <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <User className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{request.name}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{request.location}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                {getStatusIcon(request.status)}
                <span className="capitalize">{request.status}</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Contact</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{request.contact}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{request.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Group</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{request.bloodType}</p>
            </div>
          </div>
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-gray-500 mb-1">Message</p>
            <p className="font-medium text-sm sm:text-base text-gray-900">{request.message}</p>
          </div>
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-gray-500 mb-2">Potential Donors</p>
            {request.potentialDonors.length > 0 ? (
              <div className="space-y-2">
                {request.potentialDonors.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{donor.name}</p>
                      <p className="text-xs text-gray-500">{donor.contact} | {donor.bloodType}</p>
                    </div>
                    <button
                      onClick={() => handleAcknowledgeDonor(request.id, donor.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      aria-label={`Acknowledge donor ${donor.name} for request ${request.id}`}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs">Acknowledge</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No potential donors yet</p>
            )}
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for request ${request.id}`}>
              <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloodRequests;