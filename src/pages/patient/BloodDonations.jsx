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
  TrendingUp
} from 'lucide-react';

const BloodDonations = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

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
        return <CheckCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blood Received</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lives Saved</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Eligible</p>
                <p className="text-lg font-bold text-gray-900">15 Jun 2024</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('donations')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'donations'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Donations ({donationsMade.length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'received'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Blood Received ({bloodReceived.length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'donations' ? (
              <div className="space-y-4">
                {filteredDonations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Droplets className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Blood Donation</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{donation.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{donation.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {getStatusIcon(donation.status)}
                          <span className="capitalize">{donation.status}</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                        <p className="font-medium text-gray-900">{donation.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="font-medium text-gray-900">{donation.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="font-medium text-gray-900">{donation.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Recipient</p>
                        <p className="font-medium text-gray-900">{donation.recipient}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{donation.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {donation.certificate && (
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            View Certificate
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {donation.nextEligible && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
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
                  <div key={received.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Blood Transfusion</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{received.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{received.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(received.status)}`}>
                          {getStatusIcon(received.status)}
                          <span className="capitalize">{received.status}</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                        <p className="font-medium text-gray-900">{received.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="font-medium text-gray-900">{received.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reason</p>
                        <p className="font-medium text-gray-900">{received.reason}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>
                        <p className="font-medium text-gray-900">{received.doctor}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{received.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          Batch: {received.batchNumber}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
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