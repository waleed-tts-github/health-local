import React from 'react';
import { Calendar, Clock, Award, Eye } from 'lucide-react';

const FeeDonationsMade = ({ filteredFeeDonations, getStatusColor, getStatusIcon }) => {
  return (
    <div className="space-y-4">
      {filteredFeeDonations.map((donation) => (
        <div key={donation.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base text-gray-900">Fee Donation</h4>
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Date</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Time</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.time}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Donated To</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.donatedTo}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Amount</p>
              <p className="font-medium text-sm sm:text-base text-gray-900">{donation.amount}</p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for fee donation ${donation.id}`}>
              <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeeDonationsMade;