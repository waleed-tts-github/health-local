import React from 'react';
import { X } from 'lucide-react';

const RefundRequestModal = ({ isOpen, onClose, refundReasons, refundReason, setRefundReason, customReason, setCustomReason, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-200 bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 transform transition-all duration-500 scale-100 max-h-[90vh] overflow-y-auto animate-slide-up">
        <style jsx>{`
          .modal-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .modal-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .modal-scrollbar::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 10px;
          }
          .modal-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
          @keyframes slide-up {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
        <div className="modal-scrollbar p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Request Refund</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Why do you want a refund?
              </label>
              <div className="space-y-2">
                {refundReasons.map((reason, index) => (
                  <label key={index} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="refundReason"
                      value={reason}
                      checked={refundReason === reason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
                    />
                    <span className="ml-3 text-gray-700 font-medium text-sm">{reason}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {refundReason === 'Other (Custom)' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Please specify your reason:
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Tell us more about your reason..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                  rows="3"
                />
              </div>
            )}
            
            <button
              onClick={onSubmit}
              disabled={!refundReason || (refundReason === 'Other (Custom)' && !customReason)}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-full transition-all text-sm shadow-lg"
            >
              Submit Refund Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundRequestModal;