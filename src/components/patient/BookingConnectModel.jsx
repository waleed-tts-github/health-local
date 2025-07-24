import React, { useContext, useState, useEffect } from 'react';
import { X, Heart, Video, Calendar } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const BookingConnectModal = () => {
  const {
    currentModal,
    closeModal,
    handleLiveConnect,
    handleBookingConfirm,
    handleIsLaterTodayBooking,
    handleScheduleAppointment,
  } = useContext(BookingContext);

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Generate available times starting from 20 minutes after current time until 12 AM
  useEffect(() => {
    const generateTimes = () => {
      const now = new Date();
      const startTime = new Date(now.getTime() + 20 * 60000); // Add 20 minutes
      const times = [];
      
      // Get end time (12:00 AM of the next day)
      const endTime = new Date(now);
      endTime.setHours(24, 0, 0, 0); // Set to 12:00 AM next day
      
      let currentTime = new Date(startTime);
      
      // Generate time slots every 20 minutes until 12 AM
      while (currentTime < endTime) {
        times.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 20);
      }
      
      setAvailableTimes(times);
    };

    generateTimes();
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (currentModal !== 'connect') return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              Connect
            </h3>
            <button 
              onClick={closeModal} 
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
            {/* Heart icon */}
            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>

            {/* Connect Live Online button */}
            <button
              onClick={handleLiveConnect}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transform hover:scale-105 backdrop-blur-sm"
            >
              <Video className="w-4 h-4" />
              Connect Live Online
            </button>

            {/* OR separator */}
            <div className="flex items-center w-full -mt-2 mb-2">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-3 text-white/70 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Schedule Appointment Section */}
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <h6 className="text-sm font-bold text-white bg-white/20 py-1.5 px-3 rounded-full backdrop-blur-sm text-center mb-2">
              Slide to select a time for your appointment later today
              </h6>
              <div className="text-lg font-bold text-white mb-2 text-center">
                {availableTimes.length > 0 ? formatTime(availableTimes[selectedTimeIndex]) : 'Loading...'}
              </div>
              <div className="mb-2">
                <input
                  type="range"
                  min="0"
                  max={availableTimes.length - 1}
                  value={selectedTimeIndex}
                  onChange={(e) => setSelectedTimeIndex(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-[10px] text-white/80 mt-1">
                  <span>Time: Available Slots</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleBookingConfirm}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2 px-4 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 backdrop-blur-sm"
                >
                  Send Request
                </button>
              </div>
            </div>

            {/* Book Tomorrow & Onwards button with disclaimer */}
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <button
                onClick={handleScheduleAppointment}
                className="w-full bg-white/15 font-bold text-lg hover:bg-white/30 border border-white/20 text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
                Schedule an appointment for any day from tomorrow onward
              </button>
              <p className="text-red-500 text-xs font-light text-center mt-2">
                *Physical Appointment Can Only Be Booked For Private Doctors*
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleLiveConnect}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5"
              >
                Continue
              </button>
            </div>
          </div>

          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 14px;
              height: 14px;
              background: linear-gradient(to right, #10b981, #059669);
              border-radius: 50%;
              cursor: pointer;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            input[type='range']::-moz-range-thumb {
              width: 14px;
              height: 14px;
              background: linear-gradient(to right, #10b981, #059669);
              border-radius: 50%;
              cursor: pointer;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 8px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(12px);
              border-radius: 4px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #10b981, #059669);
              border-radius: 4px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #059669, #047857);
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

export default BookingConnectModal;