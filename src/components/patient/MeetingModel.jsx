import React, { useState, useEffect, useContext } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Monitor, MessageSquare } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import PrescriptionDetailsModal from './PrescriptionDetailsModel';

const MeetingModal = ({ doctorName = "Dr. Smith", patientName = "You", meetingTime = "15:00" }) => {
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState(1800); // 30 minutes in seconds
  const { currentModal, handleGiveFeedback } = useContext(BookingContext);

  // Countdown timer effect
  useEffect(() => {
    if (isCallActive && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCallActive, remainingTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClosePrescription = () => {
    setIsPrescriptionModalOpen(false);
  };

  const handleOpenPrescription = () => {
    setIsPrescriptionModalOpen(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setTimeout(() => {
      // No action specified in original code
    }, 500);
  };

  if (currentModal !== 'meeting') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
              Video Consultation
            </h3>
            <button
              onClick={handleEndCall}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
            {/* Doctor Video Background */}
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-lg border border-gray-200/70">
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.Vm0gkWyZpEsZcBlbC8ZAlQHaE7?pid=Api&P=0&h=220"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
              <p className="absolute bottom-2 left-2 text-white text-xs font-medium">{doctorName}</p>
            </div>

            {/* Picture-in-Picture Patient Video */}
            <div className="relative w-24 sm:w-28 h-16 sm:h-20 bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200/70">
              {isVideoOn ? (
                <img
                  src="https://tse1.mm.bing.net/th/id/OIP.oLeEicCQNDLCvvFQmLfsowHaE7?pid=Api&P=0&h=220"
                  alt="Patient"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-1 mx-auto">
                      <span className="text-white font-bold text-xs sm:text-sm">{patientName.charAt(0)}</span>
                    </div>
                    <p className="text-gray-600 text-xs">Camera off</p>
                  </div>
                </div>
              )}
              {!isMicOn && (
                <div className="absolute top-1 right-1">
                  <div className="bg-red-500 rounded-full p-1">
                    <MicOff className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Remaining Time Display */}
            <div className="text-center w-full border border-gray-200 rounded-xl p-2">
              <h4 className="text-sm font-bold text-gray-700 bg-white/20 py-1.5 px-3 rounded-full text-center">
                Time Remaining
              </h4>
              <p className="text-gray-600 mt-2 text-xs">{formatTime(remainingTime)}</p>
            </div>

            {/* Prescription Button with Badge */}
            <div className="relative" onClick={handleOpenPrescription}>
              <button
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-green-600 font-bold text-xs">1</span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isMicOn ? '' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              </button>
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isVideoOn ? '' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
              </button>
              <button
                onClick={handleEndCall}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                End Call
              </button>
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all mt-2"
              onClick={handleGiveFeedback}
            >
              Give Feedback
            </button>
          </div>

          {/* Call Status Overlay */}
          {!isCallActive && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500/80 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <PhoneOff className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">Call Ended</h3>
                <p className="text-white/70 text-xs">Thank you for your consultation</p>
              </div>
            </div>
          )}

          <PrescriptionDetailsModal isOpen={isPrescriptionModalOpen} onClose={handleClosePrescription} />

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 8px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 4px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 4px;
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

export default MeetingModal;