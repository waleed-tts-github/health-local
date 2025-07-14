import React, { useContext } from 'react';
import { X, Heart, Video, Calendar } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const BookingConnectModal = () => {
  const {
    currentModal,
    closeModal,
    handleLiveConnect,
    handleScheduleAppointment,
    timeMinutes,
    timeSeconds,
    setTimeMinutes,
    formatTime,
  } = useContext(BookingContext);

  if (currentModal !== 'connect') return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-md w-full p-4 shadow-2xl border border-green-100/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-green-700">Connect</h3>
          <button 
            onClick={closeModal} 
            className="p-1.5 bg-green-100/80 hover:bg-green-200/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <X className="w-4 h-4 text-green-700" />
          </button>
        </div>

        <div className="text-center mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Heart className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <button
          onClick={handleLiveConnect}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 mb-2"
        >
          <Video className="w-4 h-4" />
          Connect Live Online
        </button>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 text-center">Schedule An Appointment For Today?</h3>
          <p className="text-gray-600 text-xs text-center mb-2">Please Select A Time</p>
          <div className="text-xl font-bold text-gray-800 mb-2 text-center">
            {formatTime(timeMinutes, timeSeconds)}
          </div>
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max="120"
              value={timeMinutes}
              onChange={(e) => setTimeMinutes(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Time: Minutes</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleScheduleAppointment}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-1.5 px-3 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Later Today
            </button>
          </div>
        </div>

        <button
          onClick={handleScheduleAppointment}
          className="w-full bg-white/50 hover:bg-white/70 border border-green-100/30 text-green-700 py-2 rounded-xl font-medium text-xs transition-all duration-300 flex items-center justify-center gap-1.5 backdrop-blur-sm"
        >
          <Calendar className="w-4 h-4" />
          Book (Schedule An Appointment) Tomorrow & Onwards
        </button>

        <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-1.5 mt-2 backdrop-blur-sm">
          <p className="text-red-600 text-xs font-light text-center">
            *Physical Appointment Can Only Be Booked For Private Doctors*
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={closeModal}
            className="flex-1 bg-green-100/80 hover:bg-green-200/80 text-green-700 py-1.5 rounded-xl font-medium text-xs transition-colors duration-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleLiveConnect}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-1.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        </div>

        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            background: linear-gradient(to right, #10b981, #14b8a6);
            border-radius: 50%;
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: linear-gradient(to right, #10b981, #14b8a6);
            border-radius: 50%;
            cursor: pointer;
            border: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingConnectModal;