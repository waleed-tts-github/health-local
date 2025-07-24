import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, X, User, Calendar, Check } from 'lucide-react';

const BloodVolunteers = () => {
  const [searchCity, setSearchCity] = useState('Karachi');
  const [bloodType, setBloodType] = useState('AB+');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactPlace, setContactPlace] = useState('');
  const [message, setMessage] = useState('');

  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Hammad Ali',
      age: 25,
      bloodType: 'AB+',
      address: 'Street ABC, House 123, NY, Karachi',
      isSelected: false
    },
    {
      id: 2,
      name: 'Ali Hassan',
      age: 25,
      bloodType: 'AB+',
      address: 'Street ABC, House 123, NY, Karachi',
      isSelected: true
    },
    {
      id: 3,
      name: 'Mehwish',
      age: 25,
      bloodType: 'AB+',
      address: 'Street ABC, House 123, NY, Karachi',
      isSelected: false
    }
  ]);

  const selectedCount = volunteers.filter(v => v.isSelected).length;

  const handleToggleVolunteer = (id) => {
    setVolunteers(volunteers.map(v =>
      v.id === id ? { ...v, isSelected: !v.isSelected } : v
    ));
  };

  const handleSelectAll = () => {
    const allSelected = volunteers.every(v => v.isSelected);
    setVolunteers(volunteers.map(v => ({ ...v, isSelected: !allSelected })));
  };

  const handleRequestDonation = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowRequestModal(true);
  };

  const handleSendRequest = () => {
    setShowRequestModal(false);
    setShowSuccessModal(true);
    setContactPerson('');
    setPhoneNumber('');
    setContactPlace('');
    setMessage('');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  const handleNextClick = () => {
    const selectedVolunteer = volunteers.find(v => v.isSelected);
    if (selectedVolunteer) {
      handleRequestDonation(selectedVolunteer);
    }
  };

  return (
    <div className="min-h-screen bg-white font-poppins w-full overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Search Blood Volunteers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City / Near Me
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 placeholder-gray-500"
                >
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type
              </label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 placeholder-gray-500"
              >
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1">
            <span>Advanced Search</span>
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Results ({volunteers.length.toString().padStart(2, '0')}) ({selectedCount} selected)
            </h3>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Select All</label>
              <input
                type="checkbox"
                checked={volunteers.every(v => v.isSelected)}
                onChange={handleSelectAll}
                className="h-4 w-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-500">({selectedCount})</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-base">{volunteer.name}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>({volunteer.age} Years)</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={volunteer.isSelected}
                    onChange={() => handleToggleVolunteer(volunteer.id)}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3 truncate">{volunteer.address}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {volunteer.bloodType}
                  </span>
                  <button
                    onClick={() => handleRequestDonation(volunteer)}
                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNextClick}
              className={`bg-green-600 text-white font-medium py-2 px-8 rounded-lg transition-colors text-sm ${selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
              disabled={selectedCount === 0}
            >
              Next
            </button>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2 flex-wrap">
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">‹</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">1</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">2</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">3</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">4</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">5</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">6</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">›</button>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 h-full font-poppins">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-3 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Blood Donation Volunteer</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 sm:h-5 w-3 sm:w-5" />
              </button>
            </div>
            <h6 className="text-sm font-medium text-gray-900 mb-2">
              Requesting Urgent Blood Donation Assistance (JazakAllah Khair)
            </h6>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Contact Person
                </label>
                <div className="relative">
                  <User className="absolute left-2 sm:left-3 top-2.5 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Ali Hassan"
                    className="w-full pl-8 sm:pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-xs text-gray-900 min-w-0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-2 sm:left-3 top-2.5 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0300 1234578"
                    className="w-full pl-8 sm:pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-xs text-gray-900 min-w-0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Place Of Contact
                </label>
                <div className="relative">
                  <MapPin className="absolute left-2 sm:left-3 top-2.5 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={contactPlace}
                    onChange={(e) => setContactPlace(e.target.value)}
                    placeholder="Agha Khan Hospital Karachi Pakistan"
                    className="w-full pl-8 sm:pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-xs text-gray-900 min-w-0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter Message Here"
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-xs text-gray-900 resize-none min-w-0"
                />
              </div>
              <button
                onClick={handleSendRequest}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-2xs sm:text-xs transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-4 sm:p-6 text-center">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Check className="h-6 sm:h-8 w-6 sm:w-8 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Message Sent</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              A Volunteer Will Get In Touch With You If They're Willing.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-xs sm:text-sm"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodVolunteers;