import React, { useContext } from 'react';
import { X, CreditCard, Wallet } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const PaymentModal = () => {
  const { currentModal, closeModal, handlePayment } = useContext(BookingContext);

  if (currentModal !== 'payment') return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full p-6 shadow-2xl border border-green-200/30 h-[98vh] sm:max-h-none overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Fees</h3>
            <button 
              onClick={closeModal} 
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-3 mb-5 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">Initial Amount</span>
              <span className="font-bold text-white">Rs: 1500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">Voucher Discount:</span>
              <span className="font-bold text-white">Rs: 200</span>
            </div>
            <hr className="border-white/30" />
            <div className="flex justify-between items-center font-bold">
              <span className="text-white text-sm">You Have To Pay:</span>
              <span className="text-white text-lg">Rs. 1300</span>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-base font-bold text-white mb-3 text-center bg-white/20 py-2 rounded-full backdrop-blur-sm">Select Payment Source</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button className="flex items-center justify-center gap-2 p-3 bg-white/15 border border-white/30 rounded-2xl hover:bg-white/25 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">JC</span>
                </div>
                <span className="text-xs font-semibold text-white">Jazz Cash</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-white/15 border border-white/30 rounded-2xl hover:bg-white/25 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">EP</span>
                </div>
                <span className="text-xs font-semibold text-white">Easy Paisa</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-white/15 border border-white/30 rounded-2xl hover:bg-white/25 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <span className="text-xs font-semibold text-white">Master Card</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-white/15 border border-white/30 rounded-2xl hover:bg-white/25 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <span className="text-xs font-semibold text-white">Visa Card</span>
              </button>
            </div>
            
            {/* Virtual Wallet spanning full width */}
            <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/15 border border-white/30 rounded-2xl hover:bg-white/25 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white">Virtual Wallet</span>
              <span className="text-xs font-bold text-green-300 bg-white px-2 py-1 rounded-full">Rs. 5000</span>
            </button>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={closeModal}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition-all duration-300 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Pay</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">Rs. 1300</span>
            </button>
          </div>
        </div>

        <style jsx>{`
          /* Enhanced scrollbar styling - only for small devices */
          .max-h-[90vh] {
            scrollbar-width: thin;
            scrollbar-color: #10b981 rgba(255, 255, 255, 0.2);
          }
          .max-h-[90vh]::-webkit-scrollbar {
            width: 8px;
          }
          .max-h-[90vh]::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            border-radius: 4px;
            border: 1px solid rgba(255, (255, 255, 0.2);
          }
          .max-h-[90vh]::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #059669);
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .max-h-[90vh]::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #047857);
          }
          
          /* Hide scrollbar on larger screens */
          @media (min-width: 640px) {
            .max-h-[90vh] {
              scrollbar-width: none;
            }
            .max-h-[90vh]::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PaymentModal;