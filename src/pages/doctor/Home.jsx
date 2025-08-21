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
  Currency,
  X,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoctorMeetingModel from '../../components/doctor/MeetingModel';
import PatientComplaintAndMedicalAndVisitHistoryModel from '../../components/doctor/PatientComplaintWithMedicalAndVisitHistory';
import WritePrescriptionModal from '../../components/doctor/WritePrescriptionModel';
import WriteLabTestModal from '../../components/doctor/WriteLabTestModel';
import { useDoctorConsultation } from '../../contexts/DoctorConsultationContext';

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
    setIsAppointmentCompleted
  } = useDoctorConsultation();
  
  const [appointmentsExpanded, setAppointmentsExpanded] = useState(true);
  const [showInvitationsModal, setShowInvitationsModal] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [adjustedTimes, setAdjustedTimes] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasNewInvitations, setHasNewInvitations] = useState(true);
  const navigate = useNavigate();

  // Update current time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for appointments with fees in PKR - Updated to today's date
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      type: 'online',
      date: '2025-08-21',
      time: '20:50:00', // 6:50 PM PKT
      endTime: '21:20:00', // 7:20 PM PKT
      status: 'scheduled',
      reason: 'Regular Checkup',
      avatar: 'SJ',
      provider: 'Private',
      fee: 15000
    },
    {
      id: 2,
      patientName: 'Ahmed Ali',
      type: 'physical',
      date: '2025-08-21',
      time: '19:00:00', // 7:00 PM PKT
      endTime: '19:30:00', // 7:30 PM PKT
      status: 'in-progress',
      reason: 'Consultation',
      avatar: 'AA',
      provider: 'Angill',
      fee: 20000
    },
    {
      id: 3,
      patientName: 'Maria Garcia',
      type: 'online',
      date: '2025-08-21',
      time: '20:00:00', // 8:00 PM PKT
      endTime: '20:30:00', // 8:30 PM PKT
      status: 'scheduled',
      reason: 'Follow-up',
      avatar: 'MG',
      provider: 'Private',
      fee: 12000
    },
    {
      id: 4,
      patientName: 'John Smith',
      type: 'physical',
      date: '2025-08-22',
      time: '10:30:00', // 10:30 AM PKT
      endTime: '11:00:00', // 11:00 AM PKT
      status: 'scheduled',
      reason: 'Emergency Consultation',
      avatar: 'JS',
      provider: 'Angill',
      fee: 30000
    }
  ]);

  // Mock data for invitations with fees in PKR
  const [invitations] = useState([
    {
      id: 1,
      patientName: 'David Wilson',
      requestedDate: '2025-08-22',
      requestedTime: '10:00:00',
      type: 'online',
      reason: 'Skin consultation',
      timestamp: '2 hours ago',
      avatar: 'DW',
      provider: 'Private',
      estimatedFee: 18000
    },
    {
      id: 2,
      patientName: 'Lisa Chen',
      requestedDate: '2025-08-22',
      requestedTime: '14:30:00',
      type: 'physical',
      reason: 'Routine checkup',
      timestamp: '5 hours ago',
      avatar: 'LC',
      provider: 'Angill',
      estimatedFee: 25000
    }
  ]);

  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Check if appointment is today
  const isToday = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    return (
      today.getDate() === appointmentDate.getDate() &&
      today.getMonth() === appointmentDate.getMonth() &&
      today.getFullYear() === appointmentDate.getFullYear()
    );
  };

  // Get remaining time in HH:MM:SS format for today's appointments
  const getRemainingTime = (date, time) => {
    if (!isToday(date)) return null;

    const [hours, minutes, seconds] = time.split(':').map(Number);
    const appointmentTime = new Date(currentTime);
    appointmentTime.setHours(hours, minutes, seconds, 0);

    const diff = appointmentTime - currentTime;

    if (diff <= 0) return "Time's up!";

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${diffHours.toString().padStart(2, '0')}:${diffMinutes.toString().padStart(2, '0')}:${diffSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const initial = {};
    invitations.forEach((inv) => {
      initial[inv.id] = timeToMinutes(inv.requestedTime);
    });
    setAdjustedTimes(initial);
  }, [invitations]);

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

  const handleAppointmentClick = (appointment) => {
    setIsAppointmentCompleted(false);
    if (appointment.type === 'online') {
      setShowDoctorMeetingModel(true);
    } else {
      setShowPatientComplaintWithMedicalAndVisitHistoryModel(true);
    }
  };

  const handleViewInvitations = () => {
    setHasNewInvitations(false);
    setShowInvitationsModal(true);
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
    console.log('Saving lab test:', labTest);
    setShowWriteLabTestModel(false);
  };

  const todayAppointments = appointments.filter((apt) => isToday(apt.date));
  const todayEarnings = todayAppointments.reduce((sum, apt) => sum + apt.fee, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col w-full sm:w-auto">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
                <button
                  onClick={() => navigate('/doctor/profile/complete')}
                  className="sm:hidden px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center"
                >
                  <User className="w-4 h-4 mr-2" />
                  Complete Profile
                </button>
              </div>
              {/* View Invitations Button for Small Devices with Red Alert Badge */}
              <button 
                className="sm:hidden px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors relative mt-2 w-fit"
                onClick={handleViewInvitations}
              >
                View Invitations
                {hasNewInvitations && invitations.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                    {invitations.length}
                  </span>
                )}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              {/* Complete Profile Button for Larger Devices */}
              <button
                onClick={() => navigate('/doctor/profile/complete')}
                className="hidden sm:flex px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Complete Profile
              </button>
              {/* Doctor Status Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex items-center">
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
                    onClick={() => setIsOnline(!isOnline)}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                  <span className={`ml-2 text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
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
            {/* Stats Grid - Today's Earnings in PKR */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs font-medium">Today's Earnings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">PKR {todayEarnings.toLocaleString()}</p>
                    <p className="text-green-500 text-xs mt-1 font-medium">+12% from yesterday</p>
                  </div>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Currency className="w-5 h-5 text-green-500" />
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
                  {todayAppointments.map((appointment) => (
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
                                PKR {appointment.fee.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full sm:w-36 flex flex-col items-center gap-2">
                          {appointment.type === 'online' ? (
                            <button
                              onClick={() => handleAppointmentClick(appointment)}
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
                            <button 
                              onClick={() => handleAppointmentClick(appointment)}
                              className="w-full px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"
                            >
                              Mark Arrived
                            </button>
                          )}
                          {/* Remaining Time Display */}
                          {isToday(appointment.date) && (
                            <div className="flex items-center text-lg font-bold text-black">
                              <Activity className="w-3 h-3 mr-1" />
                              {getRemainingTime(appointment.date, appointment.time)}
                            </div>
                          )}
                          {/* Non-today appointment time indicator */}
                          {!isToday(appointment.date) && (
                            <div className="flex items-center text-xs font-bold text-green-600">
                              <Activity className="w-3 h-3 mr-1" />
                              In {calculateTimeUntilAppointment(appointment.date, appointment.time)}
                            </div>
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
            {/* Invitations with Red Alert Badge */}
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center relative">
                    <h3 className="text-base font-bold text-gray-900">Invitations</h3>
                    {hasNewInvitations && invitations.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {invitations.length}
                      </span>
                    )}
                  </div>
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
                            {invitation.requestedDate}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {minutesToTime(adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Adjust Time:</p>
                          <input
                            type="range"
                            min={480}
                            max={1200}
                            step={20}
                            value={adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime)}
                            onChange={(e) => setAdjustedTimes((prev) => ({ ...prev, [invitation.id]: Number(e.target.value) }))}
                            className="w-full h-1 bg-green-100 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                          />
                          <p className="text-center text-xs text-gray-600 mt-1">
                            {minutesToTime(adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime))}
                          </p>
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
                            PKR {invitation.estimatedFee.toLocaleString()}
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
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-gray-900">Invitations</h3>
                {hasNewInvitations && invitations.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {invitations.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowInvitationsModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {invitation.requestedDate}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {minutesToTime(adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime))}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-1">Adjust Time:</p>
                        <input
                          type="range"
                          min={480}
                          max={1200}
                          step={20}
                          value={adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime)}
                          onChange={(e) => setAdjustedTimes((prev) => ({ ...prev, [invitation.id]: Number(e.target.value) }))}
                          className="w-full h-1 bg-green-100 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
                        />
                        <p className="text-center text-xs text-gray-600 mt-1">
                          {minutesToTime(adjustedTimes[invitation.id] || timeToMinutes(invitation.requestedTime))}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            invitation.provider === 'Private'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-green-50 text-green-600'
                          }`}
                        >
                          {invitation.provider}
                        </span>
                        <span className="text-xs font-semibold text-gray-900">
                          PKR {invitation.estimatedFee.toLocaleString()}
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

      {/* Modals */}
      <>
        {showDoctorMeetingModel && (
          <DoctorMeetingModel 
            isOpen={showDoctorMeetingModel} 
            onClose={closeDoctorMeetingModel} 
          />
        )}
        {showPatientComplaintWithMedicalAndVisitHistoryModel && (
          <PatientComplaintAndMedicalAndVisitHistoryModel 
            isOpen={showPatientComplaintWithMedicalAndVisitHistoryModel} 
            onClose={closePatientComplaintWithMedicalAndVisitHistoryModel} 
          />
        )}
        {showWritePrescriptionModel && (
          <WritePrescriptionModal 
            isOpen={showWritePrescriptionModel} 
            onClose={closeWritePrescriptionModel} 
            onSave={handleSavePrescription}
          />
        )}
        {showWriteLabTestModel && (
          <WriteLabTestModal 
            isOpen={showWriteLabTestModel} 
            onClose={closeWriteLabTestModel} 
            onSave={handleSaveLabTest}
          />
        )}
      </>
    </div>
  );
};

export default DoctorHome;