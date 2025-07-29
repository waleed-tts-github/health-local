import React, { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Droplets,
  Activity,
  Award,
  TrendingUp,
  HandHeart
} from 'lucide-react';

const BloodDonations = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isBloodVolunteer, setIsBloodVolunteer] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('');

  // Sample data for donations made by patient
  const donationsMade = [
    {
      id: 1,
      date: '2024-03-15',
      time: '09:30 AM',
      bloodType: 'AB+',
      quantity: '450ml',
      location: 'Agha Khan Hospital',
      address: 'Stadium Road, Karachi',
      recipient: 'Emergency Case #12345',
      status: 'completed',
      certificate: 'CERT-2024-001',
      nextEligible: '2024-06-15'
    },
    {
      id: 2,
      date: '2024-01-20',
      time: '02:15 PM',
      bloodType: 'AB+',
      quantity: '450ml',
      location: 'Liaquat National Hospital',
      address: 'National Stadium Road, Karachi',
      recipient: 'Patient: Ahmed Ali',
      status: 'completed',
      certificate: 'CERT-2024-002',
      nextEligible: '2024-04-20'
    },
    {
      id: 3,
      date: '2024-07-10',
      time: '11:00 AM',
      bloodType: 'AB+',
      quantity: '450ml',
      location: 'Sindh Institute of Urology',
      address: 'Clifton, Karachi',
      recipient: 'Scheduled Donation',
      status: 'scheduled',
      certificate: null,
      nextEligible: null
    }
  ];

  // Sample data for blood received by patient
  const bloodReceived = [
    {
      id: 1,
      date: '2023-12-10',
      time: '03:45 PM',
      bloodType: 'AB+',
      quantity: '2 Units (900ml)',
      location: 'Agha Khan Hospital',
      address: 'Stadium Road, Karachi',
      donor: 'Anonymous Donor',
      reason: 'Emergency Surgery',
      status: 'completed',
      doctor: 'Dr. Sarah Khan',
      batchNumber: 'BAT-2023-789'
    },
    {
      id: 2,
      date: '2023-08-22',
      time: '07:20 AM',
      bloodType: 'AB+',
      quantity: '1 Unit (450ml)',
      location: 'Liaquat National Hospital',
      address: 'National Stadium Road, Karachi',
      donor: 'Voluntary Donor',
      reason: 'Anemia Treatment',
      status: 'completed',
      doctor: 'Dr. Ahmed Hassan',
      batchNumber: 'BAT-2023-456'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 sm:h-4 w-3 sm:w-4" />;
      case 'scheduled':
        return <Clock className="h-3 sm:h-4 w-3 sm:w-4" />;
      case 'cancelled':
        return <XCircle className="h-3 sm:h-4 w-3 sm:w-4" />;
      default:
        return <AlertCircle className="h-3 sm:h-4 w-3 sm:w-4" />;
    }
  };

  const filteredDonations = donationsMade.filter(donation => {
    if (filterStatus === 'all') return true;
    return donation.status === filterStatus;
  });

  const filteredReceived = bloodReceived.filter(received => {
    if (filterStatus === 'all') return true;
    return received.status === filterStatus;
  });

  const handleBloodVolunteerChange = (e) => {
    setIsBloodVolunteer(e.target.checked);
    if (!e.target.checked) {
      setBloodGroup('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* FAN Volunteer Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-sm mb-6 shadow-lg">
              <HandHeart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-500 mr-3" />
              FAN Volunteer
            </h2>
            <p className="text-sm text-gray-600 mb-2">"Feed A Need. Be the Help Someone Wasn’t Expecting."</p>
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              Join our growing network of FAN Volunteers — everyday people stepping up in extraordinary ways. Whether it’s through blood donation, sponsoring medical consultations, or simply being there in a time of need, your kindness matters. Every act of care helps restore dignity, hope, and health — when it’s needed the most, and often when it’s least expected.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <CheckCircle className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed A Need — Give the Gift of Health</h3>
              <p className="text-sm text-gray-600">
                Many people around us — domestic workers, staff, or community members — lack health insurance or financial means to consult a doctor. With Social Pay, you can donate consultation fees directly from your virtual wallet, allowing someone in need to access verified, quality medical care. A small gesture from you can make a life-changing impact for someone else.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300">
              <Heart className="w-6 h-6 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed A Need — Donate Blood, Give the Gift of Life</h3>
              <p className="text-sm text-gray-600 mb-4">
                Donating blood is a simple, selfless act that can save lives and it is more than generosity — it's building bonds, creating new friendships, and saving lives. According to the Mental Health Foundation, blood donation can also improve your emotional and physical well-being, offering a sense of connection and purpose.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Become a volunteer</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBloodVolunteer}
                    onChange={handleBloodVolunteerChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-sm"></div>
                </label>
              </div>
              {isBloodVolunteer && (
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-red-500 focus:outline-none transition-all duration-300 text-gray-900 text-sm shadow-sm hover:shadow-md"
                    aria-label="Select Blood Group"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              )}
              <p className="text-sm text-red-600 font-medium mt-4">
                Be the Reason Someone Survives. Donate Today.
              </p>
            </div>
          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Blodd Donation Requests</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Blood Donation Received</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Doctor Fees Donation</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">36</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              </div>
            </div>
          </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Donation Received</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">36</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="h-5 sm:h-6 w-5 sm:w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Next Eligible</p>
                <p className="text-base sm:text-lg font-bold text-gray-900">15 Jun 2024</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap space-x-4 sm:space-x-8 px-4 sm:px-6">
              <button
                onClick={() => setActiveTab('donations')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'donations'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View My Donations"
              >
                My Donations ({filteredDonations.length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'received'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View Blood Received"
              >
                Blood Received ({filteredReceived.length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-3 sm:h-4 w-3 sm:w-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-green-500 bg-white shadow-sm"
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-green-500 bg-white shadow-sm"
                  aria-label="Filter by date range"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all bg-white shadow-sm hover:shadow-md" aria-label="Export data">
                  <Download className="h-3 sm:h-4 w-3 sm:w-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-700">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'donations' ? (
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{donation.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{donation.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{donation.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Recipient</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{donation.recipient}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                        <MapPin className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span>{donation.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        {donation.certificate && (
                          <button className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium" aria-label={`View certificate for donation ${donation.id}`}>
                            View Certificate
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for donation ${donation.id}`}>
                          <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                        </button>
                      </div>
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
            ) : (
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reason</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.reason}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.doctor}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                        <MapPin className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span>{received.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Batch: {received.batchNumber}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for transfusion ${received.id}`}>
                          <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-green-800">
                        <strong>Donor:</strong> {received.donor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonations;