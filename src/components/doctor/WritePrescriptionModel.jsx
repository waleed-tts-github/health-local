import React, { useState } from 'react';
import { X, Plus, Trash2, Printer, Edit2 } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import { useDoctorConsultation } from '../../contexts/DoctorConsultationContext';

const WritePrescriptionModal = ({ isOpen, onClose}) => {
  const {setShowWritePrescriptionModel,setShowPatientComplaintWithMedicalAndVisitHistoryModel,setIsAppointmentCompleted} = useDoctorConsultation()
  const [patientInfo, setPatientInfo] = useState({
    name: 'MR. NAIZ ZARDARI',
    age: '54',
    address: 'GULSTANE JOHAR KARACHI',
  });

  const [prescriptionData, setPrescriptionData] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState({
    medicine: '',
    type: '',
    strength: '',
    frequency: '',
    duration: '',
    instructions: '',
  });
  const [instructions, setInstructions] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState(null);

  const medicineOptions = [
    'Brufein', 'Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Azithromycin',
    'Omeprazole', 'Metformin', 'Aspirin', 'Ciprofloxacin', 'Doxycycline',
  ];

  const typeOptions = [
    'Tablet', 'Capsule', 'Syrup', 'Injection', 'Drops', 'Cream', 'Ointment',
  ];

  const strengthOptions = [
    '100 mg', '200 mg', '250 mg', '500 mg', '750 mg', '1000 mg',
    '5 mL', '10 mL', '0.1%', '1%', '2%',
  ];

  const frequencyOptions = [
    'Once Daily', 'Twice Daily', 'Three Times Daily', 'Four Times Daily',
    'Every 6 Hours', 'Every 8 Hours', 'As Needed',
  ];

  const durationOptions = [
    'For 3 Days', 'For 5 Days', 'For 7 Days', 'For 10 Days', 'For 14 Days', 'As Required',
  ];

  if (!isOpen) return null;

  const handleAddOrUpdateMedicine = () => {
    if (
      currentMedicine.medicine &&
      currentMedicine.type &&
      currentMedicine.strength &&
      currentMedicine.frequency &&
      currentMedicine.duration
    ) {
      if (editingMedicineId) {
        // Update existing medicine
        setPrescriptionData(
          prescriptionData.map((item) =>
            item.id === editingMedicineId ? { ...currentMedicine, id: editingMedicineId, name: currentMedicine.medicine } : item
          )
        );
        setEditingMedicineId(null);
      } else {
        // Add new medicine
        setPrescriptionData([
          ...prescriptionData,
          {
            ...currentMedicine,
            id: Date.now(),
            name: currentMedicine.medicine,
          },
        ]);
      }
      setCurrentMedicine({
        medicine: '',
        type: '',
        strength: '',
        frequency: '',
        duration: '',
        instructions: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditMedicine = (medicine) => {
    setCurrentMedicine({
      medicine: medicine.name,
      type: medicine.type,
      strength: medicine.strength,
      frequency: medicine.frequency,
      duration: medicine.duration,
      instructions: medicine.instructions,
    });
    setEditingMedicineId(medicine.id);
    setShowAddForm(true);
  };

  const handleRemoveMedicine = (id) => {
    setPrescriptionData(prescriptionData.filter((item) => item.id !== id));
  };

  const handleSend = () => {
    if (prescriptionData.length > 0) {
      const fullPrescription = {
        patientName: patientInfo.name,
        age: parseInt(patientInfo.age),
        address: patientInfo.address,
        date: new Date().toISOString(),
        doctorName: 'DR. AZFAR HUSSAIN',
        specialty: 'DOCTOR (CONSULTANT) (ENT)',
        qualification: 'MBBS, FCPS (ENT)',
        hospitalName: 'ANGILL CLINIC',
        hospitalAddress: '123 Medical Street, Karachi',
        licenseNumber: '876269',
        deaNumber: 'GB 05455616',
        pmcdNumber: '525578858',
        medicines: prescriptionData,
        instructions: instructions,
        followUp: followUp,
      };
      setIsAppointmentCompleted(true)
      setShowWritePrescriptionModel(false)
      setShowPatientComplaintWithMedicalAndVisitHistoryModel(false)
      
    }
  };


  //PatientConsulationContext  //DoctorConsulationContext

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(',', '');
  };

  if (showPreview) {
    const prescription = {
      patientName: patientInfo.name,
      age: parseInt(patientInfo.age),
      address: patientInfo.address,
      date: new Date().toISOString(),
      doctorName: 'DR. AZFAR HUSSAIN',
      specialty: 'DOCTOR (CONSULTANT) (ENT)',
      qualification: 'MBBS, FCPS (ENT)',
      hospitalName: 'ANGILL CLINIC',
      hospitalAddress: '123 Medical Street, Karachi',
      licenseNumber: '876269',
      deaNumber: 'GB 05455616',
      pmcdNumber: '525578858',
      medicines: prescriptionData,
      instructions: instructions,
      followUp: followUp,
    };

    return (
      <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 px-3">
        <div className="bg-white rounded-2xl max-w-md w-full h-[95vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible border border-gray-200">
          <div className="relative z-10 flex flex-col h-full">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-50 to-white p-3 border-b border-gray-200 shadow-sm">
              <div className="flex items-center justify-between space-x-2 relative">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
                    <img src={logo} className="h-5 w-5" alt="Angill Logo" />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Angill
                    </h1>
                    <p className="text-green-600 text-[10px] font-medium">Healthcare</p>
                  </div>
                </div>
                <div className="flex flex-col text-right mr-[10px]">
                  <h2 className="text-[11px] font-semibold text-gray-800">{prescription.doctorName}</h2>
                  <p className="text-gray-600 text-[10px] font-medium">{prescription.specialty}</p>
                  <p className="text-gray-600 text-[10px] font-medium">{prescription.qualification}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-[-10px] right-[-10px]"
                  aria-label="Back to edit"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Doctor and Patient Info */}
            <div className="px-3 py-2 flex-1 flex flex-col">
              <div className="border border-gray-200 rounded-xl p-2 mb-3">
                <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 text-[10px]">
                  <div className="flex items-center min-w-[100px]">
                    <span className="text-gray-700 font-normal">Patient:</span>
                    <span className="ml-2 text-gray-800 font-medium">{prescription.patientName}</span>
                  </div>
                  <div className="flex items-center min-w-[50px]">
                    <span className="text-gray-700 font-normal">Age:</span>
                    <span className="ml-2 text-gray-800 font-medium">{prescription.age}</span>
                  </div>
                  <div className="flex items-center min-w-[100px]">
                    <span className="text-gray-700 font-normal">Date & Time:</span>
                    <span className="ml-2 text-gray-800 font-medium">{formatDateTime(prescription.date)}</span>
                  </div>
                </div>
              </div>

              {/* Prescription Content */}
              <div className="flex-1 overflow-y-auto relative">
                <div className="relative z-10 space-y-2 h-full">
                  <div className="flex h-full">
                    <div className="relative">
                      <span className="absolute top-0 left-0 text-xl font-bold text-green-600 px-1 py-0.5 rounded-md">Rx</span>
                      <div className="flex-1 pl-3 pt-7">
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="text-[10px] text-gray-800 leading-relaxed font-normal mb-2">
                            <p>
                              <strong>
                                {medicine.name} - {medicine.strength} - {medicine.type} - {medicine.frequency} - {medicine.duration}
                              </strong>
                            </p>
                            {medicine.instructions && (
                              <p className="mt-1 italic">{medicine.instructions}</p>
                            )}
                          </div>
                        ))}
                        {prescription.instructions && (
                          <div className="text-[10px] text-gray-800 leading-relaxed font-normal mt-3">
                            <p><strong>Other Instructions:</strong> {prescription.instructions}</p>
                          </div>
                        )}
                        {prescription.followUp && (
                          <div className="text-[10px] text-gray-800 leading-relaxed font-normal mt-2">
                            <p><strong>Follow-Up:</strong> {prescription.followUp}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 pb-3 border-t border-gray-200 flex-shrink-0">
              <div className="text-center">
                <p className="text-[10px] text-gray-600">{prescription.hospitalAddress}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium text-[10px] transition-all"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSend}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium text-[10px] transition-all flex items-center justify-center"
                >
                  <Printer className="w-3 h-3 mr-1" />
                  Send
                </button>
              </div>
            </div>

            <style>{`
              .h-[95vh] {
                scrollbar-width: thin;
                scrollbar-color: #10b981 #e5e7eb;
              }
              .h-[95vh]::-webkit-scrollbar {
                width: 6px;
              }
              .h-[95vh]::-webkit-scrollbar-track {
                background: #e5e7eb;
                border-radius: 3px;
              }
              .h-[95vh]::-webkit-scrollbar-thumb {
                background: #10b981;
                border-radius: 3px;
              }
              .h-[95vh]::-webkit-scrollbar-thumb:hover {
                background: #059669;
              }
              @media (min-width: 640px) {
                .h-[95vh] {
                  scrollbar-width: none;
                }
                .h-[95vh]::-webkit-scrollbar {
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
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 px-3">
      <div className="bg-white rounded-2xl max-w-md w-full h-[95vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible border border-gray-200 relative">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-50 to-white p-3 border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between space-x-2 relative">
              <div className="flex items-center space-x-2">
                <div className="p-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
                  <img src={logo} className="h-5 w-5" alt="Angill Logo" />
                </div>
                <div>
                  <h1 className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Angill
                  </h1>
                  <p className="text-green-600 text-[10px] font-medium">Healthcare</p>
                </div>
              </div>
              <div className="flex flex-col text-right mr-[15px]">
                <h2 className="text-[11px] font-semibold text-gray-800">DR. AZFAR HUSSAIN</h2>
                <p className="text-gray-600 text-[10px] font-medium">DOCTOR (CONSULTANT) (ENT)</p>
                <p className="text-gray-600 text-[10px] font-medium">MBBS, FCPS (ENT)</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-[-10px] right-[-10px]"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-3 py-2 flex-1 flex flex-col">
            {/* Patient Information */}
            <div className="border border-gray-200 rounded-xl p-2 mb-3">
              <div className="flex flex-row flex-wrap gap-x-3 gap-y-1 text-[10px]">
                <div className="flex items-center min-w-[100px]">
                  <span className="text-gray-700 font-normal">Patient:</span>
                  <span className="ml-2 text-gray-800 font-medium">{patientInfo.name}</span>
                </div>
                <div className="flex items-center min-w-[50px]">
                  <span className="text-gray-700 font-normal">Age:</span>
                  <span className="ml-2 text-gray-800 font-medium">{patientInfo.age}</span>
                </div>
                <div className="flex items-center min-w-[100px]">
                  <span className="text-gray-700 font-normal">Date & Time:</span>
                  <span className="ml-2 text-gray-800 font-medium">{formatDateTime(new Date())}</span>
                </div>
              </div>
            </div>

            {/* Prescription Content */}
            <div className="flex-1 relative">
              <div className="relative z-10 space-y-2 h-full">
                <div className="flex h-full">
                  <div className="relative">
                    <span className="absolute top-0 left-0 text-xl font-bold text-green-600 px-1 py-0.5 rounded-md">Rx</span>
                    <div className="flex-1 pl-3 pt-7">
                      {/* Add/Edit Medicine Section (shown on button click) */}
                      {showAddForm && (
                        <div className="border border-gray-200 rounded-xl p-2 mb-3">
                          <h3 className="text-[10px] font-medium text-green-600 mb-2 flex items-center">
                            <Plus className="w-3 h-3 mr-1" />
                            {editingMedicineId ? 'Edit Medicine' : 'Add Medicine'}
                          </h3>
                          <div className="space-y-2">
                            <select
                              value={currentMedicine.medicine}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, medicine: e.target.value })
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Medicine</option>
                              {medicineOptions.map((med) => (
                                <option key={med} value={med}>
                                  {med}
                                </option>
                              ))}
                            </select>
                            <select
                              value={currentMedicine.strength}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, strength: e.target.value })
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Strength</option>
                              {strengthOptions.map((strength) => (
                                <option key={strength} value={strength}>
                                  {strength}
                                </option>
                              ))}
                            </select>
                            <select
                              value={currentMedicine.type}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, type: e.target.value })
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Type</option>
                              {typeOptions.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <select
                              value={currentMedicine.frequency}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, frequency: e.target.value })
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Frequency</option>
                              {frequencyOptions.map((freq) => (
                                <option key={freq} value={freq}>
                                  {freq}
                                </option>
                              ))}
                            </select>
                            <select
                              value={currentMedicine.duration}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, duration: e.target.value })
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Duration</option>
                              {durationOptions.map((dur) => (
                                <option key={dur} value={dur}>
                                  {dur}
                                </option>
                              ))}
                            </select>
                            <textarea
                              value={currentMedicine.instructions}
                              onChange={(e) =>
                                setCurrentMedicine({ ...currentMedicine, instructions: e.target.value })
                              }
                              placeholder="Enter specific instructions for this medicine (e.g., take with food)"
                              className="w-full h-14 text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => {
                                  setShowAddForm(false);
                                  setEditingMedicineId(null);
                                  setCurrentMedicine({
                                    medicine: '',
                                    type: '',
                                    strength: '',
                                    frequency: '',
                                    duration: '',
                                    instructions: '',
                                  });
                                }}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded-md text-[10px] font-medium transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={handleAddOrUpdateMedicine}
                                disabled={
                                  !currentMedicine.medicine ||
                                  !currentMedicine.type ||
                                  !currentMedicine.strength ||
                                  !currentMedicine.frequency ||
                                  !currentMedicine.duration
                                }
                                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-1.5 rounded-md text-[10px] font-medium transition-colors"
                              >
                                {editingMedicineId ? 'Update' : 'Add'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Medicine List and Instructions (shown only if medicines exist and not in add form) */}
                      {prescriptionData.length > 0 && !showAddForm && (
                        <>
                          <div className="border border-gray-200 rounded-xl p-2 mb-3">
                            <h3 className="text-[10px] font-medium text-green-600 mb-2">Added Medicines</h3>
                            <div className="space-y-2 max-h-36 overflow-y-auto">
                              {prescriptionData.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-start justify-between p-1.5 bg-gray-50 rounded-md"
                                >
                                  <div className="text-[10px] text-gray-800 flex-1">
                                    <p>
                                      <strong>
                                        {item.name} - {item.strength} - {item.type} - {item.frequency} - {item.duration}
                                      </strong>
                                    </p>
                                    {item.instructions && (
                                      <p className="mt-1 italic">{item.instructions}</p>
                                    )}
                                  </div>
                                  <div className="flex space-x-2 ml-2">
                                    <button
                                      onClick={() => handleEditMedicine(item)}
                                      className="text-blue-400 hover:text-blue-600 p-1"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleRemoveMedicine(item.id)}
                                      className="text-red-400 hover:text-red-600 p-1"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-xl p-2 mb-3">
                            <h3 className="text-[10px] font-medium text-green-600 mb-2">Other Instructions</h3>
                            <textarea
                              value={instructions}
                              onChange={(e) => setInstructions(e.target.value)}
                              placeholder="Enter additional instructions, things to avoid, dietary advice, etc."
                              className="w-full h-20 text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                            />
                          </div>

                          <div className="border border-gray-200 rounded-xl p-2 mb-3">
                            <h3 className="text-[10px] font-medium text-green-600 mb-2">Follow-Up</h3>
                            <input
                              type="text"
                              value={followUp}
                              onChange={(e) => setFollowUp(e.target.value)}
                              placeholder="Enter follow-up period (e.g., 2 Days)"
                              className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 pb-3 border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2 mt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium text-[10px] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPreview(true)}
                disabled={prescriptionData.length === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-xl font-medium text-[10px] transition-all flex items-center justify-center"
              >
                Preview
              </button>
            </div>
          </div>

          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="absolute bottom-12 left-3 bg-green-500 text-white p-2.5 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}

          <style>{`
            .h-[95vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[95vh]::-webkit-scrollbar {
              width: 6px;
            }
            .h-[95vh]::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 3px;
            }
            .h-[95vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 3px;
            }
            .h-[95vh]::-webkit-scrollbar-thumb:hover {
              background: #059669;
            }
            @media (min-width: 640px) {
              .h-[95vh] {
                scrollbar-width: none;
              }
              .h-[95vh]::-webkit-scrollbar {
                display: none;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default WritePrescriptionModal;