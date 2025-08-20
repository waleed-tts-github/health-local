import React, { useState, useEffect } from 'react';
import { X, PhoneOff, FileText, Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { useDoctorConsultation } from '../../contexts/DoctorConsultationContext';

const DoctorMeetingModel = ({ isOpen, onClose }) => {
  const { setShowPatientComplaintWithMedicalAndVisitHistoryModel,isAppointmentCompleted } = useDoctorConsultation();
  const [sessionTime, setSessionTime] = useState(1830); // 30:30 starting time
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [hasPatientJoined, setHasPatientJoined] = useState(false);
  

  const currentPatient = {
    name: 'Robert Thompson',
    age: 45,
    condition: 'Hypertension Follow-up',
    avatar: 'RT',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=450&fit=crop&crop=face'
  };

  const currentDoctor = {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=150&fit=crop&crop=face'
  };

  useEffect(() => {
    if (!isOpen || !isCallActive) return;

    const timer = setInterval(() => {
      setSessionTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isCallActive]);

  const formatSessionTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndMeeting = () => {
    setShowConfirmPopup(true);
  };

  const confirmEndMeeting = () => {
    setIsCallActive(false);
    setShowConfirmPopup(false);
    onClose();
  };

  const handleClose = () => {
    setShowConfirmPopup(true);
  };

  const handleVisitClick = () => {
    setShowPatientComplaintWithMedicalAndVisitHistoryModel(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-white rounded-xl w-full max-w-xs sm:max-w-md h-[95vh] sm:h-auto flex flex-col shadow-lg overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">{currentPatient.avatar}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{currentPatient.name}</h3>
                <p className="text-xs text-gray-600">Age {currentPatient.age} • {currentPatient.condition}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col p-3 space-y-3">
            {/* Appointment Completion Status */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-gray-700 mb-1">Appointment Completed</p>
              <button
                onClick={() => setIsAppointmentCompleted(!isAppointmentCompleted)}
                className={`px-3 py-1 rounded-full font-medium text-xs transition-all ${
                  isAppointmentCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {isAppointmentCompleted ? 'Yes' : 'No'}
              </button>
            </div>

            {/* Timer Display */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
              <p className="text-xs font-medium text-green-700 mb-1">Session Time</p>
              <p className={`text-lg font-bold tabular-nums ${
                sessionTime < 300 ? 'text-red-500' : 
                sessionTime < 900 ? 'text-yellow-500' : 'text-green-600'
              }`}>
                {formatSessionTime(sessionTime)}
              </p>
            </div>

            {/* Main Patient Video */}
            <div className="relative aspect-video bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              {hasPatientJoined ? (
                <>
                  <img
                    src={currentPatient.image}
                    alt="Patient"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
                    Patient Is In The Meeting
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-600 font-semibold text-xs">Waiting For Patient</p>
                </div>
              )}
              {/* Visit Button - Egg shaped */}
              <button
                onClick={handleVisitClick}
                className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white transition-all duration-200 shadow-md transform hover:scale-105"
                style={{ 
                  borderRadius: '50px', 
                  padding: '6px 12px' 
                }}
              >
                <div className="flex items-center justify-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span className="font-semibold text-xs">Visit</span>
                </div>
              </button>
            </div>
            
            {/* Doctor Picture-in-Picture */}
            <div className="relative w-20 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 self-end">
              {isVideoOn ? (
                <img
                  src={currentDoctor.image}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-600 font-semibold text-xs">Video Off</p>
                </div>
              )}
              <div className="absolute bottom-0.5 left-0.5 right-0.5">
                <p className="text-white text-xs font-semibold bg-black/50 rounded px-0.5 text-center truncate">You</p>
              </div>
              {!isMicOn && (
                <div className="absolute top-0.5 right-0.5">
                  <div className="bg-red-500 rounded-full p-0.5">
                    <MicOff className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              )}
              {!isVideoOn && (
                <div className="absolute top-0.5 left-0.5">
                  <div className="bg-red-500 rounded-full p-0.5">
                    <VideoOff className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-2 pt-1">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${
                    isVideoOn 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    {isVideoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
                    <span>{isVideoOn ? 'Turn Off Video' : 'Turn On Video'}</span>
                  </div>
                </button>
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all ${
                    isMicOn 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    {isMicOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                    <span>{isMicOn ? 'Mute' : 'Unmute'}</span>
                  </div>
                </button>
                <button
                  onClick={handleEndMeeting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium text-xs transition-all"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <PhoneOff className="w-3 h-3" />
                    <span>End Call</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation Popup */}
          {showConfirmPopup && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
              <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs w-full">
                <h3 className="text-base font-semibold text-gray-900 mb-3">End Meeting</h3>
                <p className="text-xs text-gray-600 mb-4">Are you sure you want to end the meeting?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirmPopup(false)}
                    className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium text-xs transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEndMeeting}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-xs transition-all"
                  >
                    End Meeting
                  </button>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[95vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[95vh]::-webkit-scrollbar {
              width: 5px;
            }
            .h-[95vh]::-webkit-scrollbar-track {
              background: #f3f4f6;
              border-radius: 2px;
            }
            .h-[95vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 2px;
            }
            .h-[95vh]::-webkit-scrollbar-thumb:hover {
              background: #059669;
            }

            /* Hide scrollbar on larger screens */
            @media (min-width: 640px) {
              .h-[95vh] {
                scrollbar-width: none;
              }
              .h-[95vh]::-webkit-scrollbar {
                justify-content: center;
                display: none;
              }
            }
          `}</style>
        </div>
      </div>
 
    </div>
  );
};

export default DoctorMeetingModel;