import React, { useContext } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import { useNavigate } from 'react-router-dom';

const SuccessModal = () => {
  const { setCurrentStep } = useConsultationFlow();
  const { currentModal, closeModal, handleNextInLine, isLaterTodayBooking, isTomorrowOnwardBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  if (currentModal !== 'success') return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              Payment Successful
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
            {/* CheckCircle icon */}
            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            {/* Status message */}
            <div className="text-center w-full bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
              <h4 className="text-sm font-bold text-white bg-white/20 py-1.5 px-3 rounded-full backdrop-blur-sm">
                Appointment Booked
              </h4>
              <p className="text-sm font-semibold text-white/80 mt-2">Rs. 1500 Paid</p>
              {isTomorrowOnwardBooking || isLaterTodayBooking ? (
                <div className="flex justify-center items-center gap-4 mt-2">
                  <div>
                    <p className="text-xs text-white/80">Date</p>
                    <p className="text-xs font-semibold text-white">13/07/2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Time</p>
                    <p className="text-xs font-semibold text-white">9:30 PM</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-white/80 mt-2">Proceed to your consultation</p>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="px-4 pb-4">
            <button
              onClick={() => {
                if (isTomorrowOnwardBooking || isLaterTodayBooking) {
                  setCurrentStep(1);
                  closeModal();
                  navigate("/patient", { replace: true });
                } else {
                  handleNextInLine();
                }
              }}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm transform hover:scale-105"
            >
              OK
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
  );
};

export default SuccessModal;