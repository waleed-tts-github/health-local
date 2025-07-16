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
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="text-xl font-bold text-white bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Availability Confirmed
            </h3>
            <button 
              onClick={closeModal} 
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
            <div className="flex flex-col items-center space-y-8">
              {/* Heart icon */}
              <div className="w-20 h-20 bg-white/15 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              {/* Status message */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-white bg-white/20 py-3 px-6 rounded-full backdrop-blur-sm">
                  At Your Scheduled Time
                </h4>
                <div className="flex justify-center items-center gap-8 mt-4">
                  <p className="text-2xl font-bold text-white">Today</p>
                  <p className="text-2xl font-bold text-white">9:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 pb-6">
            <div className="flex gap-3">
              <button 
                onClick={closeModal}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleDoctorConfirm}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
              >
                Pay Doctor's Fee
              </button>
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
    </div>
  );
};

export default ConfirmedModal;