import React, { useContext } from 'react';
import { X, Heart } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const ConfirmedModal = () => {
  const { currentModal, closeModal, handleDoctorConfirm } = useContext(BookingContext);

  if (currentModal !== 'confirmed') return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              Appointment Confirmed
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
            
            {/* Status message */}
            <div className="text-center w-full bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <h4 className="text-sm font-bold text-white bg-white/20 py-1.5 px-3 rounded-full backdrop-blur-sm">
                Scheduled Appointment
              </h4>
              <div className="flex justify-center items-center gap-4 mt-2">
                <p className="text-sm font-semibold text-white/80">Today</p>
                <p className="text-sm font-semibold text-white/80">9:30 PM</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleDoctorConfirm}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm transform hover:scale-105"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
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
  );
};

export default ConfirmedModal;