import React, { useState, useEffect, useContext } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Monitor, MessageSquare } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import PrescriptionDetailsModal from './PrescriptionDetailsModel';

const MeetingModal = ({ doctorName = "Dr. Smith", patientName = "You", meetingTime = "15:00" }) => {
  const [isPrescriptionModelOpen,setIsPrescriptionModelOpen] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(true);
  const { currentModal, handleGiveFeedback } = useContext(BookingContext);

  const handleClosePrescription = ()=>{
    setIsPrescriptionModelOpen(false)
  } 
  const handleOpenPrescription = ()=>{
    setIsPrescriptionModelOpen(true)
  }

  const handleEndCall = () => {
    setIsCallActive(false);
    setTimeout(() => {
      
    }, 500);
  };

  if (currentModal !== 'meeting') return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl h-[600px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Main Doctor Video Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop&crop=face"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Prescription Button with Badge */}
        <div className="absolute top-4 right-4 z-30" onClick={handleOpenPrescription}>
          <div className="relative">
            <button 
              className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-indigo-600 font-bold text-xs">1</span>
            </div>
          </div>
        </div>

        {/* Picture-in-Picture Patient Video */}
        <div className="absolute top-6 right-20 w-48 h-36 bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-white/50 z-20">
          {isVideoOn ? (
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face"
              alt="Patient"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-white font-bold text-sm">
                    {patientName.charAt(0)}
                  </span>
                </div>
                <p className="text-white/80 text-xs">Camera off</p>
              </div>
            </div>
          )}
          
          {/* Muted Indicator on Patient Video */}
          {!isMicOn && (
            <div className="absolute top-2 right-2">
              <div className="bg-red-500 rounded-full p-1">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Time Display */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
            <div className="text-white text-3xl font-light tracking-wide">
              {meetingTime}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-6">
            
            {/* Screen Share Button */}
            <button className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Monitor className="w-7 h-7 text-white" />
            </button>

            {/* End Call Button */}
            <button
              onClick={handleGiveFeedback}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <PhoneOff className="w-7 h-7 text-white" />
            </button>

            {/* Microphone Button */}
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg ${
                isMicOn 
                  ? 'bg-indigo-600 hover:bg-indigo-700' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {isMicOn ? <Mic className="w-7 h-7 text-white" /> : <MicOff className="w-7 h-7 text-white" />}
            </button>
          </div>
        </div>

        {/* Call Status Overlay */}
        {!isCallActive && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4 mx-auto">
                <PhoneOff className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Call Ended</h3>
              <p className="text-white/70">Thank you for your consultation</p>
            </div>
          </div>
        )}
      </div>
      <PrescriptionDetailsModal isOpen={isPrescriptionModelOpen} onClose={handleClosePrescription}/>
    </div>
  );
};

export default MeetingModal;