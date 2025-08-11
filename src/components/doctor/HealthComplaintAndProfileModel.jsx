import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, ArrowLeft } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const PatientHealthComplaintModal = ({ isOpen, onClose }) => {
  const {setShowPatientHealthProfileAndComplaintModel} = useConsultationFlow()
  const [expandedSections, setExpandedSections] = useState({
    familyHistory: false
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEHRClick = () => {
    // Placeholder for EHR access
    alert('Accessing Electronic Health Record...');
  };

  // Mock patient data
  const patientData = {
    name: 'Waseem Hassan',
    age: '27 Y/o',
    phone: '+92 321 9646394',
    address: 'Street ABC, House 123, NY, USA'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100">
      <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-4 lg:px-8 py-2 sm:py-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-gray-900 font-bold text-xl sm:text-2xl hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
              Back To Meeting
            </button>
          </div>

          {/* Patient Info and EHR Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Patient Info with EHR Button */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Patient Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                    <p className="text-gray-800 text-sm">{patientData.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                    <p className="text-gray-800 text-sm">{patientData.age}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <p className="text-gray-800 text-sm">{patientData.phone}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                    <p className="text-gray-800 text-sm">{patientData.address}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={handleEHRClick}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    <Eye className="w-5 h-5" />
                    Access Full EHR
                  </button>
                </div>
              </div>

              {/* Family & Past History */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <button
                  onClick={() => toggleSection('familyHistory')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-gray-900 font-bold text-sm sm:text-base hover:bg-green-50 transition-all duration-200"
                >
                  <span>Family & Past History</span>
                  {expandedSections.familyHistory ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.familyHistory && (
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Blood Group */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>AB+</option>
                      </select>
                    </div>

                    {/* Health Conditions */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Health Conditions</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Cancer/Cardiac</option>
                      </select>
                    </div>

                    {/* Drug Allergy */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Drug Allergy</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Penicillin</option>
                      </select>
                    </div>

                    {/* Family History */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Family History</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Diabetic</option>
                      </select>
                    </div>

                    {/* Operation History */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Operation History</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Diabetic</option>
                      </select>
                    </div>

                    {/* Addictions */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Addictions</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Diabetic</option>
                      </select>
                    </div>

                    {/* Current Medications */}
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Current Medications</label>
                      <select
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                      >
                        <option>Diabetic</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Health Complaint / Examinations */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Health Complaint / Examinations</h3>
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-sm font-medium">EHR</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2 min-w-[150px] whitespace-nowrap">Temperature (°C)</label>
                    <input
                      type="text"
                      value="100"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2 min-w-[150px] whitespace-nowrap">Blood Pressure (mmHg)</label>
                    <input
                      type="text"
                      value="120/80"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2 min-w-[150px] whitespace-nowrap">Pulse (bpm)</label>
                    <input
                      type="text"
                      value="73"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2 min-w-[150px] whitespace-nowrap">Weight (kg)</label>
                    <input
                      type="text"
                      value="50"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2 min-w-[150px] whitespace-nowrap">Height (cm)</label>
                    <input
                      type="text"
                      value="170"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 font-medium text-sm">WH</span>
                    </div>
                    <span className="text-sm text-gray-600">File Name.jpg</span>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    <Eye className="w-5 h-5" />
                    View
                  </button>
                </div>
              </div>

              {/* Sign And Symptoms */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <h3 className="text-sm font-bold text-gray-700 mb-2">Sign And Symptoms</h3>
                <textarea
                  placeholder="Notes"
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                  rows="3"
                />
              </div>

              {/* Doctor's Diagnosis */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-700">Doctor's Diagnosis</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12 border-gray-200 focus:border-green-500"
                >
                  <option>Provisional/Final</option>
                </select>
                <p className="text-xs text-gray-600 mt-1">For e.g., Diabetes...</p>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  <button
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    Prescription
                  </button>
                  <button
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-200"
                  >
                    Lab Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scrollbar-custom::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-custom::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 3px
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 3px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PatientHealthComplaintModal;