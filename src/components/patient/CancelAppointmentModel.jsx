import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const CancelAppointmentModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-200 bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-gray-100 transform transition-all duration-500 scale-100 max-h-[90vh] overflow-y-auto animate-slide-up">
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
        <div className="modal-scrollbar p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Appointment?</h3>
          <p className="text-gray-600 mb-6 text-sm">This action cannot be undone. Are you sure you want to cancel?</p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-full transition-colors text-sm"
            >
              Keep
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-full transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;