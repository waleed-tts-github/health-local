import React from 'react';
import { X, User, FileText, AlertCircle } from 'lucide-react';

const LabReportDetailsModal = ({ isOpen, onClose, selectedReport }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-200 bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 transform transition-all duration-500 scale-100 max-h-[90vh] overflow-y-auto animate-slide-up">
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
            <h2 className="text-2xl font-bold text-gray-900">Lab Report Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {selectedReport && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedReport.labName}</h3>
                    <p className="text-sm text-gray-600">Laboratory Services</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Date: {formatDate(selectedReport.date)}</p>
                    <p className="text-sm text-gray-600">Time: {selectedReport.time}</p>
                  </div>
                </div>
              </div>

              {/* Doctor and Test Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    Doctor Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedReport.doctorName}</p>
                    <p><span className="font-medium">Specialty:</span> {selectedReport.specialty}</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Test Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Test Name:</span> {selectedReport.testName}</p>
                    <p><span className="font-medium">Report ID:</span> {selectedReport.reportId}</p>
                    <p><span className="font-medium">Appointment:</span> {selectedReport.appointment.id} - {selectedReport.appointment.type} ({formatDate(selectedReport.appointment.date)})</p>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Test Results
                </h4>
                <div className="space-y-3">
                  {selectedReport.results.map((result, index) => (
                    <div key={index} className="border border-emerald-200 rounded-xl p-4 bg-emerald-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800 mb-2">{result.parameter}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">Value:</span> {result.value}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Reference Range:</span> {result.referenceRange}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                  Notes
                </h4>
                <p className="text-sm text-gray-700 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                  {selectedReport.notes}
                </p>
              </div>

              {/* Doctor Signature */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-end">
                  <div className="text-right">
                    <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-xs text-gray-500">Digital Signature</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{selectedReport.doctorName}</p>
                    <p className="text-xs text-gray-600">Licensed Medical Practitioner</p>
                    <p className="text-xs text-gray-500 mt-1">ID: {selectedReport.reportId}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabReportDetailsModal;