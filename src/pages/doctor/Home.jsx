import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Check, X, Search, Filter, Bell } from 'lucide-react';

const DoctorHome = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data for appointments
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      type: 'online',
      date: '2025-08-05',
      time: '10:00 AM',
      status: 'scheduled',
      reason: 'Regular Checkup',
      avatar: 'SJ',
    },
    {
      id: 2,
      patientName: 'Ahmed Ali',
      type: 'physical',
      date: '2025-08-05',
      time: '11:30 AM',
      status: 'scheduled',
      reason: 'Consultation',
      avatar: 'AA',
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      type: 'online',
      date: '2025-08-05',
      time: '02:00 PM',
      status: 'in-progress',
      reason: 'Follow-up',
      avatar: 'MG',
    },
    {
      id: 4,
      patientName: 'John Smith',
      type: 'physical',
      date: '2025-08-06',
      time: '09:00 AM',
      status: 'scheduled',
      reason: 'Emergency Consultation',
      avatar: 'JS',
    },
    {
      id: 5,
      patientName: 'Fatima Khan',
      type: 'online',
      date: '2025-08-06',
      time: '03:30 PM',
      status: 'scheduled',
      reason: 'Prescription Review',
      avatar: 'FK',
    },
  ]);

  // Mock data for invitations
  const [invitations] = useState([
    {
      id: 1,
      patientName: 'David Wilson',
      requestedDate: '2025-08-08',
      requestedTime: '10:00 AM',
      type: 'online',
      reason: 'Skin consultation',
      timestamp: '2 hours ago',
      avatar: 'DW',
    },
    {
      id: 2,
      patientName: 'Lisa Chen',
      requestedDate: '2025-08-09',
      requestedTime: '02:30 PM',
      type: 'physical',
      reason: 'Routine checkup',
      timestamp: '5 hours ago',
      avatar: 'LC',
    },
    {
      id: 3,
      patientName: 'Hassan Ahmed',
      requestedDate: '2025-08-07',
      requestedTime: '11:00 AM',
      type: 'online',
      reason: 'Diabetes follow-up',
      timestamp: '1 day ago',
      avatar: 'HA',
    },
  ]);

  const handleJoinCall = (appointmentId) => {
    console.log('Joining call for appointment:', appointmentId);
  };

  const handleMarkArrived = (appointmentId) => {
    console.log('Patient arrived for appointment:', appointmentId);
  };

  const handleAcceptInvitation = (invitationId) => {
    console.log('Accepting invitation:', invitationId);
  };

  const handleDeclineInvitation = (invitationId) => {
    console.log('Declining invitation:', invitationId);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || appointment.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and patient requests</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`relative flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'appointments'
                  ? 'text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  activeTab === 'appointments' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {appointments.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`relative flex-1 px-8 py-6 text-sm font-semibold transition-all duration-300 ${
                activeTab === 'invitations'
                  ? 'text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <Bell className="w-5 h-5" />
                <span>Invitations</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  activeTab === 'invitations' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {invitations.length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="relative group">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-white appearance-none transition-all duration-200 text-gray-900 font-medium min-w-48"
                  >
                    <option value="all">All Types</option>
                    <option value="online">Online</option>
                    <option value="physical">Physical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
              {filteredAppointments.map((appointment, index) => (
                <div 
                  key={appointment.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-6 xl:space-y-0">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {appointment.avatar}
                        </div>
                        {appointment.status === 'in-progress' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{appointment.patientName}</h3>
                        <p className="text-gray-600 mb-3 font-medium">{appointment.reason}</p>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="font-medium">{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            {appointment.type === 'online' ? (
                              <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                                <Video className="w-4 h-4 mr-2" />
                                Online
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                                <MapPin className="w-4 h-4 mr-2" />
                                Physical
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {appointment.type === 'online' ? (
                        <button
                          onClick={() => handleJoinCall(appointment.id)}
                          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                            appointment.status === 'in-progress'
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 animate-pulse'
                              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                          }`}
                        >
                          <Video className="w-5 h-5 inline mr-2" />
                          {appointment.status === 'in-progress' ? 'Join Now' : 'Start Call'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkArrived(appointment.id)}
                          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <MapPin className="w-5 h-5 inline mr-2" />
                          Mark Arrived
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invitations Tab */}
        {activeTab === 'invitations' && (
          <div className="space-y-4">
            {invitations.map((invitation, index) => (
              <div 
                key={invitation.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col xl:flex-row xl:items-center justify-between space-y-6 xl:space-y-0">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg relative">
                      {invitation.avatar}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <Bell className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{invitation.patientName}</h3>
                      <p className="text-gray-600 mb-3 font-medium">{invitation.reason}</p>
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <div className="flex items-center text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="font-medium">{formatDate(invitation.requestedDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 bg-gray-100 rounded-lg px-3 py-2">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">{invitation.requestedTime}</span>
                        </div>
                        <div className="flex items-center">
                          {invitation.type === 'online' ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                              <Video className="w-4 h-4 mr-2" />
                              Online
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                              <MapPin className="w-4 h-4 mr-2" />
                              Physical
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Requested {invitation.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDeclineInvitation(invitation.id)}
                      className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <X className="w-5 h-5 inline mr-2" />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Check className="w-5 h-5 inline mr-2" />
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'appointments' && filteredAppointments.length === 0) ||
          (activeTab === 'invitations' && invitations.length === 0)) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              {activeTab === 'appointments' ? (
                <Calendar className="w-12 h-12 text-gray-400" />
              ) : (
                <Bell className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No {activeTab === 'appointments' ? 'appointments' : 'invitations'} found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              {activeTab === 'appointments'
                ? 'Your scheduled appointments will appear here.'
                : 'Patient appointment requests will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;