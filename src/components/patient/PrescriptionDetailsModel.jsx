import React from 'react';
import { X, Printer } from 'lucide-react';
import logo from '../../assets/Group.png';

const PrescriptionDetailsModal = ({ isOpen, onClose, selectedPrescription }) => {
  if (!isOpen) return null;

  // Sample data if none provided
  const prescription = selectedPrescription || {
    patientName: "MR. NAIZ ZARDARI",
    age: 54,
    address: "GULSTANE JOHAR KARACHI",
    date: "2024-02-24",
    doctorName: "DR. AZFAR HUSSAIN",
    specialty: "DOCTOR (CONSULTANT) (ENT)",
    qualification: "MBBS, FCPS (ENT)",
    hospitalName: "ANGILL CLINIC",
    hospitalAddress: "123 Medical Street, Karachi",
    licenseNumber: "876269",
    deaNumber: "GB 05455616",
    pmcdNumber: "525578858",
    medicines: [
      { name: "Brufein", dosage: "100mg", frequency: "One Tablet", duration: "BID For 3 Days" },
      { name: "Brufein", dosage: "100mg", frequency: "One Tablet", duration: "BID For 3 Days" },
      { name: "Brufein", dosage: "100mg", frequency: "One Tablet", duration: "BID For 3 Days" },
      { name: "Brufein", dosage: "100mg", frequency: "One Tablet", duration: "BID For 3 Days" },
    ],
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible border border-gray-200">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200">
            <div className="flex flex-col flex-1">
              <h2 className="text-base font-bold text-green-600">{prescription.doctorName}</h2>
              <p className="text-gray-600 text-xs font-medium">{prescription.qualification}</p>
            </div>
            <div className="w-[4px] h-15 bg-black mx-4"></div>
            <div className="flex items-center flex-1 justify-end">
              <div className="w-10 h-10 bg-green-500 rounded-sm sm:rounded-sm flex items-center justify-center mr-3">
                <img src={logo} className="w-10 h-10 p-1" alt="Angill Logo" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700">{prescription.hospitalName}</h3>
                <p className="text-gray-500 text-xs font-normal">Every illness deserves an Angill</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-2 right-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Doctor and Patient Info */}
          <div className="px-4 py-3 flex-1 flex flex-col">
            <div className="border border-gray-200 rounded-xl p-3 mb-4">
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center min-w-[120px]">
                  <span className="text-gray-700 font-normal">Patient:</span>
                  <span className="ml-2 text-gray-800 font-medium">{prescription.patientName}</span>
                </div>
                <div className="flex items-center min-w-[60px]">
                  <span className="text-gray-700 font-normal">Age:</span>
                  <span className="ml-2 text-gray-800 font-medium">{prescription.age}</span>
                </div>
                <div className="flex items-center min-w-[80px]">
                  <span className="text-gray-700 font-normal">Date:</span>
                  <span className="ml-2 text-gray-800 font-medium">{formatDate(prescription.date)}</span>
                </div>
              </div>
            </div>

            {/* Prescription Content */}
            <div className="flex-1 overflow-y-auto relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-40 h-40 border-4 border-green-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-normal text-green-200">Rx</span>
                </div>
              </div>
              <div className="relative z-10 space-y-2 h-full">
                <div className="flex h-full">
                  <div className="w-12 pr-3 flex flex-col items-center border-r-8 border-gray-300">
                    <span className="text-green-600 font-medium text-xs mb-4">Rx</span>
                    <span className="text-green-600 font-medium text-xs mb-2">D/E</span>
                    <div className="flex-1"></div>
                    <span className="text-green-600 font-medium text-xs mb-3">BP=</span>
                  </div>
                  <div className="flex-1 pl-3">
                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="text-xs text-gray-800 leading-relaxed font-normal">
                        <p>{medicine.name} - {medicine.dosage} - {medicine.frequency} - {medicine.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pb-4 border-t border-gray-200 flex-shrink-0">
            <div className="text-center">
              <p className="text-xs text-gray-600">{prescription.hospitalAddress}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Close
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>

          <style jsx>{`
            /* Enhanced scrollbar styling for small devices */
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

export default PrescriptionDetailsModal;