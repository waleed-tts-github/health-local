import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Check,
  Activity, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  X
} from 'lucide-react';
import DoctorMeetingModel from '../../components/doctor/MeetingModel';
import PatientComplaintAndMedicalAndVisitHistoryModel from '../../components/doctor/PatientComplaintWithMedicalAndVisitHistory';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import WritePrescriptionModal from '../../components/doctor/WritePrescriptionModel';
import WriteLabTestModal from '../../components/doctor/WriteLabTestModel';

const DoctorHome = () => {
  const { 
    showDoctorMeetingModel, 
    setShowDoctorMeetingModel,
    showWritePrescriptionModel, 
    setShowWritePrescriptionModel,
    showWriteLabTestModel,
    setShowWriteLabTestModel,
    showPatientComplaintWithMedicalAndVisitHistoryModel, 
    setShowPatientComplaintWithMedicalAndVisitHistoryModel,
  } = useConsultationFlow();
  const [appointmentsExpanded, setAppointmentsExpanded] = useState(true);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);

  // Mock data for appointments
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      type: 'online',
      date: '2025-08-08',
      time: '10:00 AM',
      endTime: '10:30 AM',
      status: 'scheduled',
      reason: 'Regular Checkup',
      avatar: 'SJ',
      provider: 'Private',
      fee: 150
    },
    {
      id: 2,
      patientName: 'Ahmed Ali',
      type: 'physical',
      date: '2025-08-08',
      time: '11:30 AM',
      endTime: '12:00 PM',
      status: 'in-progress',
      reason: 'Consultation',
      avatar: 'AA',
      provider: 'Angill',
      fee: 200
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      type: 'online',
      date: '2025-08-08',
      time: '02:00 PM',
      endTime: '02:30 PM',
      status: 'scheduled',
      reason: 'Follow-up',
      avatar: 'MG',
      provider: 'Private',
      fee: 120
    },
    {
      id: 4,
      patientName: 'John Smith',
      type: 'physical',
      date: '2025-08-08',
      time: '03:30 PM',
      endTime: '04:00 PM',
      status: 'scheduled',
      reason: 'Emergency Consultation',
      avatar: 'JS',
      provider: 'Angill',
      fee: 300
    }
  ]);

  // Mock data for invitations
  const [invitations] = useState([
    {
      id: 1,
      patientName: 'David Wilson',
      requestedDate: '2025-08-09',
      requestedTime: '10:00 AM',
      type: 'online',
      reason: 'Skin consultation',
      timestamp: '2 hours ago',
      avatar: 'DW',
      provider: 'Private',
      estimatedFee: 180
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
      provider: 'Angill',
      estimatedFee: 250
    }
  ]);

  const calculateTimeUntilAppointment = (date, time) => {
    const appointmentDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const diff = appointmentDateTime - now;
    
    if (diff <= 0) return 'Now';
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const closeDoctorMeetingModel = () => {
    setShowDoctorMeetingModel(false);
  };

  const closePatientComplaintWithMedicalAndVisitHistoryModel = () => {
    setShowPatientComplaintWithMedicalAndVisitHistoryModel(false);
  };

  const closeWritePrescriptionModel = () => {
    setShowWritePrescriptionModel(false);
  };

  const closeWriteLabTestModel = () => {
    setShowWriteLabTestModel(false);
  };

  const handleSavePrescription = (prescriptionData) => {
    console.log('Saving prescription:', prescriptionData);
    setShowWritePrescriptionModel(false);
  };

  const handleSaveLabTest = (labTest) => {
    setShowWriteLabTestModel(false);
  };

  const todayAppointments = appointments.filter(apt => apt.date === '2025-08-08');
  const todayEarnings = 450;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* View Invitations Button for Small Devices */}
              <button 
                className="sm:hidden px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                onClick={() => setShowInvitationsModal(true)}
              >
                View Invitations
              </button>
              {/* Doctor Status Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex items-center">
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                  </button>
                  <span className="ml-2 text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Stats Grid - Only Today's Earnings */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs font-medium">Today's Earnings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">${todayEarnings}</p>
                    <p className="text-green-500 text-xs mt-1 font-medium">+12% from yesterday</p>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments Section */}
            <div className="bg-white border border-gray-200 rounded-xl">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setAppointmentsExpanded(!appointmentsExpanded)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Today's Appointments</h2>
                    <p className="text-gray-600 text-xs">{todayAppointments.length} scheduled appointments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {todayAppointments.length}
                  </span>
                  {appointmentsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              {appointmentsExpanded && (
                <div className="border-t border-gray-100">
                  {todayAppointments.map((appointment, index) => (
                    <div key={appointment.id} className="p-4 border-b border-gray-50 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-700 font-semibold text-xs">{appointment.avatar}</span>
                            </div>
                            {appointment.status === 'in-progress' && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-base font-semibold text-gray-900">{appointment.patientName}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.provider === 'Private' 
                                  ? 'bg-gray-100 text-gray-700' 
                                  : 'bg-green-50 text-green-600'
                              }`}>
                                {appointment.provider}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-xs mb-2">{appointment.reason}</p>
                            
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center text-xs text-gray-600">
                                <Clock className="w-3 h-3 mr-1" />
                                {appointment.time} - {appointment.endTime}
                              </div>
                              
                              <div className="flex items-center text-xs font-medium text-green-600">
                                <Activity className="w-3 h-3 mr-1" />
                                In {calculateTimeUntilAppointment(appointment.date, appointment.time)}
                              </div>
                              
                              <div className="flex items-center text-xs text-gray-600">
                                {appointment.type === 'online' ? (
                                  <>
                                    <Video className="w-3 h-3 mr-1" />
                                    Video Call
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="w-3 h-3 mr-1" />
                                    In-Person
                                  </>
                                )}
                              </div>
                              
                              <div className="text-xs font-semibold text-gray-900">
                                ${appointment.fee}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full sm:w-36">
                          {appointment.type === 'online' ? (
                            <button
                              onClick={() => setShowDoctorMeetingModel(true)}
                              className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                appointment.status === 'in-progress'
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-green-500 text-white hover:bg-green-600'
                              }`}
                            >
                              <Video className="w-3 h-3 inline mr-1" />
                              {appointment.status === 'in-progress' ? 'Join Now' : 'Start Call'}
                            </button>
                          ) : (
                            <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                              <Check className="w-3 h-3 inline mr-1" />
                              Mark Present
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Hidden on Small Devices */}
          <div className="hidden lg:block w-full lg:w-80 space-y-6">
            {/* Invitations */}
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">Invitations</h3>
                  <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {invitations.length}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center relative">
                        <span className="text-gray-700 font-medium text-xs">{invitation.avatar}</span>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{invitation.patientName}</h4>
                        <p className="text-xs text-gray-600 mb-2">{invitation.reason}</p>
                        
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center text-xs text-gray-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            Aug 09, 2025
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {invitation.requestedTime}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            invitation.provider === 'Private' 
                              ? 'bg-gray-100 text-gray-700' 
                              : 'bg-green-50 text-green-600'
                          }`}>
                            {invitation.provider}
                          </span>
                          <span className="text-xs font-semibold text-gray-900">
                            ${invitation.estimatedFee}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors">
                            Decline
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitations Modal for Small Devices */}
      {showInvitationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="w-full h-full max-h-screen flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Invitations</h3>
              <button 
                onClick={() => setShowInvitationsModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              {invitations.map((invitation) => (
                <div key={invitation.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center relative">
                      <span className="text-gray-700 font-medium text-xs">{invitation.avatar}</span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">{invitation.patientName}</h4>
                      <p className="text-xs text-gray-600 mb-2">{invitation.reason}</p>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          Aug 09, 2025
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {invitation.requestedTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          invitation.provider === 'Private' 
                            ? 'bg-gray-100 text-gray-700' 
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {invitation.provider}
                        </span>
                        <span className="text-xs font-semibold text-gray-900">
                          ${invitation.estimatedFee}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors">
                          Decline
                        </button>
                        <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DoctorMeetingModel 
        isOpen={showDoctorMeetingModel} 
        onClose={closeDoctorMeetingModel}
      />
      <PatientComplaintAndMedicalAndVisitHistoryModel 
        isOpen={showPatientComplaintWithMedicalAndVisitHistoryModel} 
        onClose={closePatientComplaintWithMedicalAndVisitHistoryModel}
      />
      <WritePrescriptionModal 
        isOpen={showWritePrescriptionModel}
        onClose={closeWritePrescriptionModel}
        onSave={handleSavePrescription}
      />
      <WriteLabTestModal 
        isOpen={showWriteLabTestModel} 
        onClose={closeWriteLabTestModel} 
        onSave={handleSaveLabTest}
      />
    </div>
  );
};

export default DoctorHome;