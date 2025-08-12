import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Printer } from 'lucide-react';
import logo from '../../assets/Group.png';

const WritePrescriptionModal = ({ isOpen, onClose, onSave }) => {
  const [patientInfo, setPatientInfo] = useState({
    name: 'MR. NAIZ ZARDARI',
    age: '54',
    address: 'GULSTANE JOHAR KARACHI'
  });

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState({
    medicine: '',
    type: '',
    frequency: '',
    duration: ''
  });

  const [instructions, setInstructions] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const medicineOptions = [
    'Brufein', 'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Azithromycin',
    'Omeprazole', 'Metformin', 'Aspirin', 'Ciprofloxacin', 'Doxycycline'
  ];

  const typeOptions = [
    '100mg', '200mg', '250mg', '500mg', '750mg', '1000mg',
    'Syrup', 'Injection', 'Drops', 'Cream', 'Ointment'
  ];

  const frequencyOptions = [
    'One Tablet', 'Two Tablets', 'Half Tablet', 'One Teaspoon',
    'Two Teaspoons', 'One Drop', 'Two Drops', 'As Needed'
  ];

  const durationOptions = [
    'BID For 3 Days', 'BID For 5 Days', 'BID For 7 Days',
    'TID For 3 Days', 'TID For 5 Days', 'TID For 7 Days',
    'QID For 3 Days', 'QID For 5 Days', 'Once Daily For 7 Days',
    'Twice Daily For 10 Days', 'As Required'
  ];

  if (!isOpen) return null;

  const handleAddMedicine = () => {
    if (currentMedicine.medicine && currentMedicine.type && 
        currentMedicine.frequency && currentMedicine.duration) {
      setPrescriptionData([...prescriptionData, { 
        ...currentMedicine, 
        id: Date.now(),
        name: currentMedicine.medicine,
        dosage: currentMedicine.type
      }]);
      setCurrentMedicine({ medicine: '', type: '', frequency: '', duration: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveMedicine = (id) => {
    setPrescriptionData(prescriptionData.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (prescriptionData.length > 0) {
      const fullPrescription = {
        patientName: patientInfo.name,
        age: parseInt(patientInfo.age),
        address: patientInfo.address,
        date: new Date().toISOString().split('T')[0],
        doctorName: "DR. AZFAR HUSSAIN",
        specialty: "DOCTOR (CONSULTANT) (ENT)",
        qualification: "MBBS, FCPS (ENT)",
        hospitalName: "ANGILL CLINIC",
        hospitalAddress: "123 Medical Street, Karachi",
        licenseNumber: "876269",
        deaNumber: "GB 05455616",
        pmcdNumber: "525578858",
        medicines: prescriptionData,
        instructions: instructions
      };
      onSave && onSave(fullPrescription);
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (showPreview) {
    const prescription = {
      patientName: patientInfo.name,
      age: parseInt(patientInfo.age),
      address: patientInfo.address,
      date: new Date().toISOString().split('T')[0],
      doctorName: "DR. AZFAR HUSSAIN",
      specialty: "DOCTOR (CONSULTANT) (ENT)",
      qualification: "MBBS, FCPS (ENT)",
      hospitalName: "ANGILL CLINIC",
      hospitalAddress: "123 Medical Street, Karachi",
      licenseNumber: "876269",
      deaNumber: "GB 05455616",
      pmcdNumber: "525578858",
      medicines: prescriptionData,
      instructions: instructions
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
                onClick={() => setShowPreview(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-2 right-2"
                aria-label="Back to edit"
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
                        <div key={index} className="text-xs text-gray-800 leading-relaxed font-normal mb-1">
                          <p>{medicine.name} - {medicine.dosage} - {medicine.frequency} - {medicine.duration}</p>
                        </div>
                      ))}
                      {prescription.instructions && (
                        <div className="text-xs text-gray-800 leading-relaxed font-normal mt-4">
                          <p><strong>Other Instructions:</strong> {prescription.instructions}</p>
                        </div>
                      )}
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
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Save & Print
                </button>
              </div>
            </div>

            <style jsx>{`
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
  }

  // Edit mode
  return (
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible border border-gray-200 relative">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 pb-3 border-b border-gray-200">
            <div className="flex flex-col flex-1">
              <h2 className="text-base font-bold text-green-600">Write Prescription</h2>
              <p className="text-gray-600 text-xs font-medium">Add medicines and patient details</p>
            </div>
            <div className="w-[4px] h-15 bg-black mx-4"></div>
            <div className="flex items-center flex-1 justify-end">
              <div className="w-10 h-10 bg-green-500 rounded-sm sm:rounded-sm flex items-center justify-center mr-3">
                <img src={logo} className="w-10 h-10 p-1" alt="Angill Logo" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700">ANGILL CLINIC</h3>
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

          {/* Content */}
          <div className="px-4 py-3 flex-1 flex flex-col overflow-y-auto">
            {/* Patient Information */}
            <div className="border border-gray-200 rounded-xl p-3 mb-4">
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center min-w-[120px]">
                  <span className="text-gray-700 font-normal">Patient:</span>
                  <span className="ml-2 text-gray-800 font-medium">{patientInfo.name}</span>
                </div>
                <div className="flex items-center min-w-[60px]">
                  <span className="text-gray-700 font-normal">Age:</span>
                  <span className="ml-2 text-gray-800 font-medium">{patientInfo.age}</span>
                </div>
                <div className="flex items-center min-w-[80px]">
                  <span className="text-gray-700 font-normal">Date:</span>
                  <span className="ml-2 text-gray-800 font-medium">{formatDate(new Date())}</span>
                </div>
              </div>
            </div>

            {/* Add Medicine Section (shown on button click) */}
            {showAddForm && (
              <div className="border border-gray-200 rounded-xl p-3 mb-4">
                <h3 className="text-xs font-medium text-green-600 mb-2 flex items-center">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Medicine
                </h3>
                <div className="space-y-2">
                  <select
                    value={currentMedicine.medicine}
                    onChange={(e) => setCurrentMedicine({...currentMedicine, medicine: e.target.value})}
                    className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Medicine</option>
                    {medicineOptions.map(med => (
                      <option key={med} value={med}>{med}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <select
                      value={currentMedicine.type}
                      onChange={(e) => setCurrentMedicine({...currentMedicine, type: e.target.value})}
                      className="flex-1 text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Dosage</option>
                      {typeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <select
                      value={currentMedicine.frequency}
                      onChange={(e) => setCurrentMedicine({...currentMedicine, frequency: e.target.value})}
                      className="flex-1 text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Frequency</option>
                      {frequencyOptions.map(freq => (
                        <option key={freq} value={freq}>{freq}</option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={currentMedicine.duration}
                    onChange={(e) => setCurrentMedicine({...currentMedicine, duration: e.target.value})}
                    className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Duration</option>
                    {durationOptions.map(dur => (
                      <option key={dur} value={dur}>{dur}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMedicine}
                      disabled={!currentMedicine.medicine || !currentMedicine.type || !currentMedicine.frequency || !currentMedicine.duration}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-md text-xs font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Medicine List and Instructions (shown only if medicines exist and not in add form) */}
            {prescriptionData.length > 0 && !showAddForm && (
              <>
                <div className="border border-gray-200 rounded-xl p-3 mb-4 flex-1">
                  <h3 className="text-xs font-medium text-green-600 mb-2">Added Medicines</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {prescriptionData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <span className="text-xs text-gray-800 flex-1">
                          {item.name} - {item.dosage} - {item.frequency} - {item.duration}
                        </span>
                        <button
                          onClick={() => handleRemoveMedicine(item.id)}
                          className="text-red-400 hover:text-red-600 p-1 ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-3 mb-4">
                  <h3 className="text-xs font-medium text-green-600 mb-2">Other Instructions</h3>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Enter additional instructions, things to avoid, dietary advice, etc."
                    className="w-full h-24 text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 pb-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2 mt-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Cancel
              </button>
              {prescriptionData.length > 0 && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  Preview
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={prescriptionData.length === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center"
              >
                <Printer className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
          </div>

          <style jsx>{`
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
        {!showPreview && (
          <button
            onClick={() => setShowAddForm(true)}
            className="absolute bottom-14 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WritePrescriptionModal;