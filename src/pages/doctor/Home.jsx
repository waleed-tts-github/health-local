import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Check, X, Search, Filter } from 'lucide-react';

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
      date: '2025-07-25',
      time: '10:00 AM',
      status: 'scheduled',
      reason: 'Regular Checkup',
      avatar: 'SJ',
    },
    {
      id: 2,
      patientName: 'Ahmed Ali',
      type: 'physical',
      date: '2025-07-25',
      time: '11:30 AM',
      status: 'scheduled',
      reason: 'Consultation',
      avatar: 'AA',
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      type: 'online',
      date: '2025-07-25',
      time: '02:00 PM',
      status: 'in-progress',
      reason: 'Follow-up',
      avatar: 'MG',
    },
    {
      id: 4,
      patientName: 'John Smith',
      type: 'physical',
      date: '2025-07-26',
      time: '09:00 AM',
      status: 'scheduled',
      reason: 'Emergency Consultation',
      avatar: 'JS',
    },
    {
      id: 5,
      patientName: 'Fatima Khan',
      type: 'online',
      date: '2025-07-26',
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
      requestedDate: '2025-07-28',
      requestedTime: '10:00 AM',
      type: 'online',
      reason: 'Skin consultation',
      timestamp: '2 hours ago',
      avatar: 'DW',
    },
    {
      id: 2,
      patientName: 'Lisa Chen',
      requestedDate: '2025-07-29',
      requestedTime: '02:30 PM',
      type: 'physical',
      reason: 'Routine checkup',
      timestamp: '5 hours ago',
      avatar: 'LC',
    },
    {
      id: 3,
      patientName: 'Hassan Ahmed',
      requestedDate: '2025-07-27',
      requestedTime: '11:00 AM',
      type: 'online',
      reason: 'Diabetes follow-up',
      timestamp: '1 day ago',
      avatar: 'HA',
    },
  ]);

  const handleJoinCall = (appointmentId) => {
    console.log('Joining call for appointment:', appointmentId);
    // Handle video call join logic
  };

  const handleMarkArrived = (appointmentId) => {
    console.log('Patient arrived for appointment:', appointmentId);
    // Handle arrival logic
  };

  const handleAcceptInvitation = (invitationId) => {
    console.log('Accepting invitation:', invitationId);
    // Handle accept invitation logic
  };

  const handleDeclineInvitation = (invitationId) => {
    console.log('Declining invitation:', invitationId);
    // Handle decline invitation logic
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
    <div className="min-h-screen bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'appointments'
                  ? 'text-green-600 border-b-2 border-green-500 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'invitations'
                  ? 'text-green-600 border-b-2 border-green-500 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" /> {/* Replaced Bell with Calendar for consistency */}
              Invitations ({invitations.length})
            </button>
          </div>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 appearance-none bg-white transition-colors"
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
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold flex-shrink-0">
                        {appointment.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.reason}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center">
                            {appointment.type === 'online' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Video className="w-3 h-3 mr-1" />
                                Online
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <MapPin className="w-3 h-3 mr-1" />
                                Physical
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {appointment.type === 'online' ? (
                        <button
                          onClick={() => handleJoinCall(appointment.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            appointment.status === 'in-progress'
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          <Video className="w-4 h-4 inline mr-2" />
                          {appointment.status === 'in-progress' ? 'Join Now' : 'Start Call'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkArrived(appointment.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                          <MapPin className="w-4 h-4 inline mr-2" />
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
            {invitations.map((invitation) => (
              <div key={invitation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold flex-shrink-0">
                      {invitation.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{invitation.patientName}</h3>
                      <p className="text-sm text-gray-600">{invitation.reason}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(invitation.requestedDate)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {invitation.requestedTime}
                        </div>
                        <div className="flex items-center">
                          {invitation.type === 'online' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Video className="w-3 h-3 mr-1" />
                              Online
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <MapPin className="w-3 h-3 mr-1" />
                              Physical
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Requested {invitation.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDeclineInvitation(invitation.id)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4 inline mr-2" />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAcceptInvitation(invitation.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-4 h-4 inline mr-2" />
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'appointments' ? (
                <Calendar className="w-8 h-8 text-gray-400" />
              ) : (
                <Calendar className="w-8 h-8 text-gray-400" /> 
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'appointments' ? 'appointments' : 'invitations'} found
            </h3>
            <p className="text-gray-500">
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