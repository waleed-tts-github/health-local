import React, { useState, useEffect } from 'react';
import { X, PhoneOff, FileText, Mic, MicOff,Phone } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const DoctorMeetingModel = ({ isOpen, onClose }) => {
  const { setShowPatientHealthProfileAndComplaintModel } = useConsultationFlow();
  const [sessionTime, setSessionTime] = useState(1830); // 30:30 starting time
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

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
    setShowPatientHealthProfileAndComplaintModel(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md h-[98vh] sm:h-auto flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentPatient.avatar}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{currentPatient.name}</h3>
                <p className="text-xs text-gray-600">Age {currentPatient.age} • {currentPatient.condition}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col p-4 space-y-4">
            {/* Timer Display */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-xs font-medium text-green-700 mb-1">Session Time</p>
              <p className={`text-xl sm:text-2xl font-bold tabular-nums ${
                sessionTime < 300 ? 'text-red-500' : 
                sessionTime < 900 ? 'text-yellow-500' : 'text-green-600'
              }`}>
                {formatSessionTime(sessionTime)}
              </p>
            </div>

            {/* Main Patient Video */}
            <div className="relative aspect-video bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src={currentPatient.image}
                alt="Patient"
                className="w-full h-full object-cover"
              />
              {/* Visit Button - Egg shaped */}
              <button
                onClick={handleVisitClick}
                className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white transition-all duration-200 shadow-lg transform hover:scale-105"
                style={{ 
                  borderRadius: '50px', 
                  padding: '8px 16px' 
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-xs sm:text-sm">Visit</span>
                </div>
              </button>
            </div>
            
            {/* Doctor Picture-in-Picture */}
            <div className="relative w-\/sm:w-28 h-16 sm:h-20 bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 self-end">
              <img
                src={currentDoctor.image}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-white text-xs font-semibold bg-black/50 rounded px-1 text-center truncate">You</p>
              </div>
              {!isMicOn && (
                <div className="absolute top-1 right-1">
                  <div className="bg-red-500 rounded-full p-1">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    isMicOn 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span>{isMicOn ? 'Mute' : 'Unmute'}</span>
                  </div>
                </button>
                
                <button
                  onClick={handleEndMeeting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <Phone VoxIconPlus className="w-4 h-4" />
                    <span>End Call</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Confirmation Popup */}
          {showConfirmPopup && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
              <div className="bg-white rounded-xl p-6 shadow-lg max-w-xs w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">End Meeting</h3>
                <p className="text-sm text-gray-600 mb-6">Are you sure you want to end the meeting?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmPopup(false)}
                    className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEndMeeting}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-all"
                  >
                    End Meeting
                  </button>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 6px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: #f3f4f6;
              border-radius: 3px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 3px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb:hover {
              background: #059669;
            }

            /* Hide scrollbar on larger screens */
            @media (min-width: 640px) {
              .h-[98vh] {
                scrollbar-width: none;
              }
              .h-[98vh]::-webkit-scrollbar {
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