import React from 'react';
import { X, User, FileText } from 'lucide-react';

const AppointmentDetailsModal = ({ isOpen, onClose, selectedAppointment, onCancel, onRefund }) => {
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
            <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedAppointment.doctorName}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{selectedAppointment.specialty}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 text-xs">Fee Paid</span>
                      <p className="font-bold text-lg text-gray-900">PKR {selectedAppointment.fee}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Consultation Type</span>
                      <p className="font-semibold text-sm text-gray-900">{selectedAppointment.consultationType}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-500 text-xs">Date & Time</span>
                      <p className="font-semibold text-sm text-gray-900">{selectedAppointment.date}</p>
                      <p className="font-semibold text-sm text-gray-900">{selectedAppointment.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Category</span>
                      <p className="font-semibold text-sm text-gray-900">{selectedAppointment.category}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-4 rounded-full transition-all duration-200 border border-red-200 text-sm"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={onRefund}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 text-sm shadow-lg"
                >
                  Request Refund
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;