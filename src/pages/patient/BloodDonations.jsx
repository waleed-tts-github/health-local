import React, { useState } from 'react';
import { Heart, Calendar, Clock, Activity, Award, TrendingUp, Users, Filter, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import BloodRequests from '../../components/patient/BloodRequests';
import BloodDonationsMade from '../../components/patient/BloodDonationsMade';
import BloodDonationsReceived from '../../components/patient/BloodDonationsReceived';
import FeeDonationsMade from '../../components/patient/FeeDonationsMade';
import FeeDonationsReceived from '../../components/patient/FeeDonationsReceived';
import FANVolunteer from '../../components/patient/FANVolunteer';

const Donations = () => {
  const [activeTab, setActiveTab] = useState('donations');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isBloodVolunteer, setIsBloodVolunteer] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('');

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
      recipient: 'Ahmed Ali',
      status: 'completed',
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
      nextEligible: null
    }
  ];

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

  const feeDonations = [
    {
      id: 1,
      date: '2024-05-10',
      time: '10:00 AM',
      amount: 'PKR 5000',
      donatedTo: 'Fatima Khan',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-06-15',
      time: '01:30 PM',
      amount: 'PKR 3000',
      donatedTo: 'Ali Raza',
      status: 'completed'
    }
  ];

  const donationsReceived = [
    {
      id: 1,
      date: '2024-04-20',
      time: '09:45 AM',
      amount: 'PKR 7000',
      receivedFrom: 'Sana Malik',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-07-01',
      time: '03:00 PM',
      amount: 'PKR 4000',
      receivedFrom: 'Imran Ahmed',
      status: 'completed'
    }
  ];

  const bloodRequests = [
    {
      id: 1,
      name: 'Ayesha Siddiqui',
      contact: '+92 321 1234567',
      email: 'ayesha.siddiqui@email.com',
      message: 'Urgent blood needed for surgery',
      location: 'Agha Khan Hospital, Stadium Road, Karachi',
      bloodType: 'AB+',
      status: 'pending',
      potentialDonors: [
        { id: 1, name: 'Hassan Ali', contact: '+92 333 9876543', bloodType: 'AB+', status: 'pending' },
        { id: 2, name: 'Zainab Khan', contact: '+92 300 4567890', bloodType: 'AB+', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'Omar Farooq',
      contact: '+92 345 6789012',
      email: 'omar.farooq@email.com',
      message: 'Blood required for dialysis treatment',
      location: 'Liaquat National Hospital, National Stadium Road, Karachi',
      bloodType: 'O+',
      status: 'pending',
      potentialDonors: [
        { id: 3, name: 'Bilal Ahmed', contact: '+92 322 3456789', bloodType: 'O+', status: 'pending' }
      ]
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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
      case 'pending':
        return <AlertCircle className="h-3 sm:h-4 w-3 sm:w-4" />;
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

  const filteredFeeDonations = feeDonations.filter(donation => {
    if (filterStatus === 'all') return true;
    return donation.status === filterStatus;
  });

  const filteredDonationsReceived = donationsReceived.filter(received => {
    if (filterStatus === 'all') return true;
    return received.status === filterStatus;
  });

  const filteredBloodRequests = bloodRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  const handleAcknowledgeDonor = (requestId, donorId) => {
    console.log(`Acknowledging donor ${donorId} for request ${requestId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <FANVolunteer
          isBloodVolunteer={isBloodVolunteer}
          setIsBloodVolunteer={setIsBloodVolunteer}
          bloodGroup={bloodGroup}
          setBloodGroup={setBloodGroup}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Blood Donations</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredDonations.length}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Blood Donations Received</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredReceived.length}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Fee Donation</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredFeeDonations.length}</p>
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
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredDonationsReceived.length}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Blood Requests</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{filteredBloodRequests.length}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

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
                aria-label="View Blood Donations"
              >
                Blood Donations ({filteredDonations.length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'received'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View Blood Donations Received"
              >
                Blood Donations Received ({filteredReceived.length})
              </button>
              <button
                onClick={() => setActiveTab('feeDonations')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'feeDonations'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View Fee Donation"
              >
                Fee Donation ({filteredFeeDonations.length})
              </button>
              <button
                onClick={() => setActiveTab('donationsReceived')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'donationsReceived'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View Donation Received"
              >
                Donation Received ({filteredDonationsReceived.length})
              </button>
              <button
                onClick={() => setActiveTab('bloodRequests')}
                className={`py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm ${
                  activeTab === 'bloodRequests'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                aria-label="View Blood Requests"
              >
                Blood Requests ({filteredBloodRequests.length})
              </button>
            </div>
          </div>

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
                    <option value="pending">Pending</option>
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

          <div className="p-4 sm:p-6">
            {activeTab === 'donations' && (
              <BloodDonationsMade
                filteredDonations={filteredDonations}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            )}
            {activeTab === 'received' && (
              <BloodDonationsReceived
                filteredReceived={filteredReceived}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            )}
            {activeTab === 'feeDonations' && (
              <FeeDonationsMade
                filteredFeeDonations={filteredFeeDonations}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            )}
            {activeTab === 'donationsReceived' && (
              <FeeDonationsReceived
                filteredDonationsReceived={filteredDonationsReceived}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
              />
            )}
            {activeTab === 'bloodRequests' && (
              <BloodRequests
                filteredBloodRequests={filteredBloodRequests}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                handleAcknowledgeDonor={handleAcknowledgeDonor}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;