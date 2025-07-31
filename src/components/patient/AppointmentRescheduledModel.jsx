import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import logo from '../../assets/Group.png';

const AppointmentRescheduledModal = () => {
  const { currentModal, closeModal, handleDoctorConfirm } = useContext(BookingContext);

  if (currentModal !== 'rescheduled') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
              Appointment Rescheduled
            </h3>
            <button 
              onClick={closeModal} 
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
            {/* Logo icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <img src={logo} className="w-8 h-8" alt="ANGILL Logo" />
            </div>
            
            {/* Status message */}
            <div className="text-center w-full border border-gray-200 rounded-xl p-2">
              <h4 className="text-sm font-bold text-gray-700 bg-white/20 py-1.5 px-3 rounded-full text-center">
                New Appointment Schedule
              </h4>
              <div className="flex justify-center items-center gap-4 mt-2">
                <p className="text-sm font-semibold text-gray-600">Tomorrow</p>
                <p className="text-sm font-semibold text-gray-600">10:00 AM</p>
              </div>
            </div>

            {/* Loading dots */}
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDoctorConfirm}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>

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
            
            /* Pulse Animation for Loading Dots */
            .animate-pulse {
              animation: pulse 1.5s infinite;
            }
            .delay-100 {
              animation-delay: 0.1s;
            }
            .delay-200 {
              animation-delay: 0.2s;
            }
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRescheduledModal;