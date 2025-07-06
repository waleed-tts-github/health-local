import React from 'react';
import { X, Printer } from 'lucide-react';

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
    hospitalName: "ANGILL MEDICAL CENTER",
    hospitalAddress: "123 Medical Street, Karachi",
    licenseNumber: "876269",
    deaNumber: "GB 05455616",
    pmcdNumber: "525578858",
    medicines: [
      {
        name: "Brufein",
        dosage: "100mg",
        frequency: "One Tablet",
        duration: "BID For 3 Days"
      },
      {
        name: "Brufein",
        dosage: "100mg",
        frequency: "One Tablet",
        duration: "BID For 3 Days"
      },
      {
        name: "Brufein",
        dosage: "100mg",
        frequency: "One Tablet",
        duration: "BID For 3 Days"
      },
      {
        name: "Brufein",
        dosage: "100mg",
        frequency: "One Tablet",
        duration: "BID For 3 Days"
      }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-white bg-opacity-90 transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 h-[95vh] overflow-hidden flex flex-col border-2 border-gray-200">
        {/* Close Button - moved up and right with rounded background */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20 shadow-sm"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header Section */}
        <div className="bg-white p-4 pb-0 relative flex-shrink-0">
          <div className="relative z-10">
            <div className="flex items-start mb-2 relative">
              <div className="flex-1 mr-2">
                <h2 className="text-lg font-bold text-teal-600 mb-1">Dr. Doctor Name</h2>
                <p className="text-gray-600 text-xs font-bold tracking-wider">QUALIFICATION</p>
              </div>
              
              {/* Diagonal separator - full height of header */}
              <div className="absolute -top-4 -bottom-0 left-1/2 transform -translate-x-1/2 w-3 bg-black rotate-10 origin-center h-18"></div>
              
              <div className="text-right flex items-center flex-shrink-0 ml-2 mr-8">
                <div className="mr-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AC</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-1">Angil Clinic</h3>
                  <p className="text-gray-500 text-xs font-normal">SLOGAN HERE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teal Green Bar */}
        <div className="h-3 bg-teal-500"></div>

        {/* Patient Information Bar */}
        <div className="bg-white px-4 py-2 flex-shrink-0">
          <div className="border-2 border-teal-500 rounded p-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <span className="text-gray-700 font-normal">Patient Name:</span>
                <span className="ml-2 border-b border-gray-400 pb-0.5 min-w-28">{prescription.patientName}</span>
              </div>
              <div className="flex items-center mx-3">
                <span className="text-gray-700 font-normal">Age:</span>
                <span className="ml-2 border-b border-gray-400 pb-0.5 min-w-12">{prescription.age}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-normal">Date:</span>
                <span className="ml-2 border-b border-gray-400 pb-0.5 min-w-16">{formatDate(prescription.date)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white px-4 py-3 flex-1 overflow-y-auto relative">
          <div className="flex h-full">
            {/* Left Column */}
            <div className="w-12 border-r-4 border-gray-800 pr-3 flex flex-col items-center relative">
              <div className="text-teal-600 font-normal text-sm mb-6">Rx</div>
              <div className="text-teal-600 font-normal text-xs mb-2">D/E</div>
              <div className="flex-1"></div>
              <div className="text-teal-600 font-normal text-xs mb-4">BP=</div>
            </div>

            {/* Right Column - Prescription Area */}
            <div className="flex-1 pl-3 relative">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-40 h-40 border-6 border-teal-200 rounded-full flex items-center justify-center">
                  <div className="text-4xl font-normal text-teal-200">Rx</div>
                </div>
              </div>

              {/* Prescription Content */}
              <div className="relative z-10 space-y-2 pt-3">
                {prescription.medicines.map((medicine, index) => (
                  <div key={index} className="text-xs text-gray-800 leading-relaxed font-normal">
                    <p>{medicine.name} - {medicine.dosage} - {medicine.frequency} - {medicine.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Curved bold line from vertical border to bottom left */}
          
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
          <div className="text-center">
            <p className="text-xs text-gray-600">Address Here, Number 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetailsModal;