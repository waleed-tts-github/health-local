import React, { useContext, useState, useEffect } from 'react';
import { X, Heart, Video, Calendar } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import logo from '../../assets/Group.png'

const BookingConnectModal = () => {
  const {
    currentModal,
    closeModal,
    handleLiveConnect,
    handleBookingConfirm,
    handleScheduleAppointment,
  } = useContext(BookingContext);
  const { isBookingThroughClinic } = useConsultationFlow();

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-3 pb-1">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-2 py-1 rounded-full">
              Connect
            </h3>
            <button 
              onClick={closeModal} 
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content - tightened spacing */}
          <div className="flex-1 flex flex-col px-3 pt-1 pb-3 space-y-2">
            {/* Heart icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <img src={logo} className="w-8 h-8 rounded-sm" />
            </div>

            {/* Today Section */}
            <div className="w-full border border-gray-200 rounded-xl p-2">
              <h6 className="text-sm font-bold text-gray-700 bg-white/20 py-0.5 px-2 rounded-full text-center mb-1">
                Connect Today
              </h6>
              {/* Connect Live Online button - only show if isBookingThroughClinic is false */}
              {!isBookingThroughClinic && (
                <button
                  onClick={handleLiveConnect}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 mb-1"
                >
                  <Video className="w-4 h-4" />
                  Connect Live Online
                </button>
              )}

              {/* OR separator - only show if Connect Live Online button is shown */}
              {!isBookingThroughClinic && (
                <div className="flex items-center w-full mb-1">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="px-2 text-gray-600 text-xs font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
              )}

              {/* Schedule Appointment Later Today */}
              <div className="w-full">
                <h6 className="text-sm font-bold text-gray-700 bg-white/20 py-0.5 px-2 rounded-full text-center mb-1">
                  Slide to select a time for your appointment later today
                </h6>
                <div className="text-lg font-bold text-gray-800 mb-1 text-center">
                  {availableTimes.length > 0 ? formatTime(availableTimes[selectedTimeIndex]) : 'Loading...'}
                </div>
                <div className="mb-1">
                  <input
                    type="range"
                    min="0"
                    max={availableTimes.length - 1}
                    value={selectedTimeIndex}
                    onChange={(e) => setSelectedTimeIndex(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
                    <span>Time: Available Slots</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleBookingConfirm}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-xl font-medium text-xs transition-all"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>

            {/* Tomorrow & Onwards Section - increased height and moved downwards */}
            <div className="w-full border border-gray-200 rounded-xl p-4 mt-3">
              <button
                onClick={handleScheduleAppointment}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Schedule Appointment For Tomorrow Onward
              </button>
              <p className="text-red-500 text-xs font-light text-center mt-2">
                *Physical Appointment Can Only Be Booked For Private Doctors*
              </p>
            </div>
          </div>

          {/* Buttons - tightened spacing */}
          <div className="px-3 pb-2">
            <div className="flex gap-1">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded-xl font-medium text-xs transition-all"
              >
                Cancel
              </button>
             
            </div>
          </div>

          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 14px;
              height: 14px;
              background: #10b981;
              border-radius: 50%;
              cursor: pointer;
            }
            input[type='range']::-moz-range-thumb {
              width: 14px;
              height: 14px;
              background: #10b981;
              border-radius: 50%;
              cursor: pointer;
            }
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

export default BookingConnectModal;