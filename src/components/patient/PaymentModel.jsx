import React, { useContext, useState } from 'react';
import { X, Wallet } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const PaymentModal = () => {
  const { currentModal, closeModal, handlePayment } = useContext(BookingContext);
  const [selectedPayment, setSelectedPayment] = useState('Virtual Wallet'); // Default selected option

  if (currentModal !== 'payment') return null;

  const paymentOptions = [
    { name: 'Jazz Cash', initials: 'JC', bgColor: 'bg-red-500' },
    { name: 'Easy Paisa', initials: 'EP', bgColor: 'bg-green-600' },
    { name: 'Master Card', initials: 'MC', bgColor: 'bg-gradient-to-r from-red-500 to-yellow-500' },
    { name: 'Visa Card', initials: 'V', bgColor: 'bg-blue-600' },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">Fees</h3>
            <button 
              onClick={closeModal} 
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
            <div className="w-full space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-xs">Initial Amount</span>
                  <span className="font-bold text-white text-xs">Rs. 1500</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-white font-medium text-xs">Voucher Discount</span>
                  <span className="font-bold text-white text-xs">Rs. 200</span>
                </div>
                <hr className="border-white/30 my-2" />
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white text-xs">You Have To Pay</span>
                  <span className="text-white text-sm">Rs. 1300</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white bg-white/20 py-1.5 px-3 rounded-full backdrop-blur-sm text-center mb-2">Select Payment Source</h4>
                <button 
                  onClick={() => setSelectedPayment('Virtual Wallet')}
                  className={`w-full flex items-center justify-between p-2 bg-${
                    selectedPayment === 'Virtual Wallet' ? 'gradient-to-r from-green-500 to-teal-600' : 'white/15'
                  } border border-white/30 rounded-xl hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-700 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-md">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white">Virtual Wallet</span>
                  </div>
                  <span className="text-xs font-bold text-green-300 bg-white/20 px-2 py-1 rounded-full">Rs. 5000</span>
                </button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {paymentOptions.map((option) => (
                    <button 
                      key={option.name}
                      onClick={() => setSelectedPayment(option.name)}
                      className={`flex items-center justify-center gap-2 p-2 bg-${
                        selectedPayment === option.name ? 'gradient-to-r from-green-500 to-teal-600' : 'white/15'
                      } border border-white/30 rounded-xl hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-700 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:scale-105`}
                    >
                      <div className={`w-6 h-6 ${option.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
                        <span className="text-white text-[10px] font-bold">{option.initials}</span>
                      </div>
                      <span className="text-xs font-semibold text-white">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl font-medium text-xs transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
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

export default PaymentModal;