import React, { useContext, useState } from 'react';
import { X, Wallet } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const PaymentModal = () => {
  const { currentModal, closeModal, handlePayment } = useContext(BookingContext);
  const [selectedPayment, setSelectedPayment] = useState('Virtual Wallet');

  if (currentModal !== 'payment') return null;

  const paymentOptions = [
    { name: 'Jazz Cash', initials: 'JC', bgColor: 'bg-red-500' },
    { name: 'Easy Paisa', initials: 'EP', bgColor: 'bg-green-600' },
    { name: 'Master Card', initials: 'MC', bgColor: 'bg-gradient-to-r from-red-500 to-yellow-500' },
    { name: 'Visa Card', initials: 'V', bgColor: 'bg-blue-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
              Fees
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
          <div className="flex-1 flex flex-col justify-center px-6 pb-4 space-y-6">
            {/* Payment summary - centered with max-width */}
            <div className="border border-gray-200 rounded-xl p-4 max-w-sm mx-auto w-full">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium text-xs">Initial Amount</span>
                <span className="font-bold text-gray-700 text-xs">Rs. 1500</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700 font-medium text-xs">Voucher Discount</span>
                <span className="font-bold text-gray-700 text-xs">Rs. 200</span>
              </div>
              <hr className="border-gray-200 my-2" />
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-700 text-xs">You Have To Pay</span>
                <span className="text-gray-700 text-sm">Rs. 1300</span>
              </div>
            </div>

            {/* Payment options - centered with max-width */}
            <div className="max-w-sm mx-auto w-full">
              <h4 className="text-sm font-bold text-gray-700 bg-gray-100 py-1.5 px-3 rounded-full text-center mb-3">
                Select Payment Source
              </h4>
              
              {/* Virtual Wallet option */}
              <button 
                onClick={() => setSelectedPayment('Virtual Wallet')}
                className={`w-full flex items-center justify-between p-3 mb-2 border ${
                  selectedPayment === 'Virtual Wallet' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                } rounded-xl transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">Virtual Wallet</span>
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-100 px-2 py-1 rounded-full">Rs. 5000</span>
              </button>

              {/* Other payment options */}
              <div className="grid grid-cols-2 gap-2">
                {paymentOptions.map((option) => (
                  <button 
                    key={option.name}
                    onClick={() => setSelectedPayment(option.name)}
                    className={`flex items-center justify-center gap-2 p-3 border ${
                      selectedPayment === option.name ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                    } rounded-xl transition-all`}
                  >
                    <div className={`w-6 h-6 ${option.bgColor} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{option.initials}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{option.name}</span>
                  </button>
                ))}
              </div>
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
                onClick={handlePayment}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Pay Now
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
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;