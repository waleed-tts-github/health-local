import React, { useContext } from 'react';
import { X, Heart } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const NotAvailableModal = () => {
  const { currentModal, closeModal, setCurrentModal } = useContext(BookingContext);

  if (currentModal !== 'notAvailable') return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-auto sm:p-5 p-3 shadow-2xl border border-green-100/30 text-center">
        <div className="flex items-center justify-between sm:mb-4 mb-2">
          <h3 className="sm:text-sm text-xs font-bold text-green-700">Doctor Not Available</h3>
          <button 
            onClick={closeModal} 
            className="sm:p-1.5 p-1 bg-green-100/80 hover:bg-green-200/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <X className="sm:w-4 sm:h-4 w-3 h-3 text-green-700" />
          </button>
        </div>

        <div className="sm:mb-4 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto sm:mb-4 mb-2">
            <Heart className="sm:w-6 sm:h-6 w-5 h-5 text-green-600" />
          </div>
          <div className="flex justify-center sm:gap-2 gap-1.5 sm:mb-3 mb-2">
            <div className="sm:w-3 sm:h-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="sm:w-3 sm:h-3 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
            <div className="sm:w-3 sm:h-3 w-2 h-2 bg-green-600 rounded-full animate-pulse delay-200"></div>
          </div>
          <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900 sm:mb-1 mb-0.5">Waiting For Doctor's Confirmation</h4>
          <p className="text-amber-500 sm:text-xs text-[10px] font-medium">Sorry, Doctor Not Available</p>
        </div>

        <div className="flex sm:gap-2 gap-1 sm:mt-4 mt-2">
          <button 
            onClick={() => setCurrentModal('connect')}
            className="flex-1 sm:py-1.5 py-1 bg-green-100/80 hover:bg-green-200/80 text-green-700 rounded-lg font-medium sm:text-xs text-[10px] transition-colors duration-300"
          >
            Find Another Doctor
          </button>
          <button
            onClick={() => setCurrentModal('connect')}
            className="flex-1 sm:py-1.5 py-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg font-medium sm:text-xs text-[10px] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Retry
          </button>
        </div>

        <style jsx>{`
          /* Custom Scrollbar for Smaller Devices */
          @media (max-width: 640px) {
            .max-h-[80vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 rgba(255, 255, 255, 0.9);
            }
            .max-h-[80vh]::-webkit-scrollbar {
              width: 6px;
            }
            .max-h-[80vh]::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
              border-radius: 3px;
              border: 1px solid rgba(209, 250, 229, 0.3);
            }
            .max-h-[80vh]::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #10b981, #14b8a6);
              border-radius: 3px;
            }
            .max-h-[80vh]::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #059669, #0d9488);
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
  );
};

export default NotAvailableModal;