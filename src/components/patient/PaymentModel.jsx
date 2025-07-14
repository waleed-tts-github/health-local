import React, { useContext } from 'react';
import { X, CreditCard } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const PaymentModal = () => {
  const { currentModal, closeModal, handlePayment } = useContext(BookingContext);

  if (currentModal !== 'payment') return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-auto sm:p-5 p-3 shadow-2xl border border-green-100/30">
        <div className="flex items-center justify-between sm:mb-4 mb-2">
          <h3 className="sm:text-sm text-xs font-bold text-green-700">Fees</h3>
          <button 
            onClick={closeModal} 
            className="sm:p-1.5 p-1 bg-green-100/80 hover:bg-green-200/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <X className="sm:w-4 sm:h-4 w-3 h-3 text-green-700" />
          </button>
        </div>

        <div className="sm:space-y-3 space-y-2 sm:mb-4 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 sm:text-xs text-[10px]">Initial Amount</span>
            <span className="font-semibold text-gray-800 sm:text-xs text-[10px]">Rs: 1500</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 sm:text-xs text-[10px]">Voucher Discount:</span>
            <span className="font-semibold text-green-600 sm:text-xs text-[10px]">Rs: 200</span>
          </div>
          <hr className="border-green-100/30" />
          <div className="flex justify-between items-center sm:text-base text-sm font-bold">
            <span className="text-gray-800 sm:text-xs text-[10px]">You Have To Pay:</span>
            <span className="text-green-600 sm:text-xs text-[10px]">Rs. 1300</span>
          </div>
        </div>

        <div className="sm:mb-4 mb-2">
          <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900 sm:mb-2 mb-1 text-center">Select Payment Source</h4>
          <div className="grid grid-cols-2 sm:gap-3 gap-2 sm:mb-3 mb-2">
            <button className="flex items-center justify-center sm:gap-2 gap-1.5 sm:p-2 p-1.5 bg-white/70 border border-green-100/30 rounded-lg hover:bg-green-100/50 transition-all duration-300 backdrop-blur-sm">
              <div className="sm:w-5 sm:h-5 w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white sm:text-[10px] text-[8px] font-bold">JC</span>
              </div>
              <span className="sm:text-xs text-[10px] font-medium">Jazz Cash</span>
            </button>
            <button className="flex items-center justify-center sm:gap-2 gap-1.5 sm:p-2 p-1.5 bg-white/70 border border-green-100/30 rounded-lg hover:bg-green-100/50 transition-all duration-300 backdrop-blur-sm">
              <div className="sm:w-5 sm:h-5 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white sm:text-[10px] text-[8px]">EP</span>
              </div>
              <span className="sm:text-xs text-[10px] font-medium">Easy Paisa</span>
            </button>
            <button className="flex items-center justify-center sm:gap-2 gap-1.5 sm:p-2 p-1.5 bg-white/70 border border-green-100/30 rounded-lg hover:bg-green-100/50 transition-all duration-300 backdrop-blur-sm">
              <div className="sm:w-5 sm:h-5 w-4 h-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center">
                <span className="text-white sm:text-[10px] text-[8px]">MC</span>
              </div>
              <span className="sm:text-xs text-[10px] font-medium">Master Card</span>
            </button>
            <button className="flex items-center justify-center sm:gap-2 gap-1.5 sm:p-2 p-1.5 bg-white/70 border border-green-100/30 rounded-lg hover:bg-green-100/50 transition-all duration-300 backdrop-blur-sm">
              <div className="sm:w-5 sm:h-5 w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white sm:text-[10px] text-[8px]">V</span>
              </div>
              <span className="sm:text-xs text-[10px] font-medium">Visa Card</span>
            </button>
          </div>
        </div>

        <div className="flex sm:gap-2 gap-1 sm:mt-4 mt-2">
          <button 
            onClick={closeModal}
            className="flex-1 sm:py-1.5 py-1 bg-green-100/80 hover:bg-green-200/80 text-green-700 rounded-lg font-medium sm:text-xs text-[10px] transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 sm:py-1.5 py-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg font-medium sm:text-xs text-[10px] transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center sm:gap-2 gap-1"
          >
            <CreditCard className="sm:w-4 sm:h-4 w-3 h-3" />
            <span>Pay Now</span>
            <span className="font-bold">Rs. 1300</span>
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
        `}</style>
      </div>
    </div>
  );
};

export default PaymentModal;