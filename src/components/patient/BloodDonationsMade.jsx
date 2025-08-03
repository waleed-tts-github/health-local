import React from 'react';
import { Calendar, Clock, Droplets, Eye } from 'lucide-react';

const BloodDonationsMade = ({ filteredDonations, getStatusColor, getStatusIcon }) => {
  return (
    <div className="space-y-4">
      {filteredDonations.map((donation) => (
        <div key={donation.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Droplets className="h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base text-gray-900">Blood Donation</h4>
                <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{donation.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{donation.time}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                {getStatusIcon(donation.status)}
                <span className="capitalize">{donation.status}</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Location</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Group</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.bloodType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Recipient</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.recipient}</p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for donation ${donation.id}`}>
              <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
            </button>
          </div>
          {donation.nextEligible && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Next Eligible:</strong> {donation.nextEligible}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BloodDonationsMade;