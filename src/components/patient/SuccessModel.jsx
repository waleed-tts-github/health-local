import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, successMessage }) => {
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
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">{successMessage}</p>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-all text-sm shadow-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;