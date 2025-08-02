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
  HandHeart,
  Users
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

  // Sample data for fee donations
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

  // Sample data for donations received
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

  // Sample data for blood requests
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

  const handleBloodVolunteerChange = (e) => {
    setIsBloodVolunteer(e.target.checked);
    if (!e.target.checked) {
      setBloodGroup('');
    }
  };

  const handleAcknowledgeDonor = (requestId, donorId) => {
    // Placeholder for acknowledging donor - in a real app, this would update the backend
    console.log(`Acknowledging donor ${donorId} for request ${requestId}`);
    // You would typically make an API call here to update the donor status to 'acknowledged'
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
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <Heart className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed A Need — Give the Gift of Life</h3>
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
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 shadow-sm"></div>
                </label>
              </div>
              {isBloodVolunteer && (
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 text-sm shadow-sm hover:shadow-md"
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
              <p className="text-sm text-blue-600 font-medium mt-4">
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
            ) : activeTab === 'received' ? (
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
            ) : activeTab === 'feeDonations' ? (
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
            ) : activeTab === 'donationsReceived' ? (
              <div className="space-y-4">
                {filteredDonationsReceived.map((received) => (
                  <div key={received.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base text-gray-900">Donation Received</h4>
                          <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{received.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span>{received.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Received From</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.receivedFrom}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="font-medium text-sm sm:text-base text-gray-900">{received.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-700" aria-label={`View details for donation received ${received.id}`}>
                        <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBloodRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all bg-white">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonations;