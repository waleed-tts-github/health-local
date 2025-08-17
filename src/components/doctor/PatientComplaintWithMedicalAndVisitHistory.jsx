import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, ArrowLeft, Calendar, MapPin, Video, User, FileText, Activity } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const PatientComplaintWithMedicalAndVisitHistoryModel = ({ isOpen, onClose }) => {
  const { setShowWritePrescriptionModel,setShowWriteLabTestModel } = useConsultationFlow();
  const [expandedSections, setExpandedSections] = useState({
    patientInfo: false,
    familyHistory: false,
    healthComplaint: false,
    visitHistory: false
  });

  const [expandedVisits, setExpandedVisits] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleVisit = (visitId) => {
    setExpandedVisits((prev) => ({
      ...prev,
      [visitId]: !prev[visitId]
    }));
  };

  const handleEHRClick = () => {
    alert('Accessing Electronic Health Record...');
  };

  // Mock patient data
  const patientData = {
    name: 'Waseem Hassan',
    age: '27 Y/o',
    phone: '+92 321 9646394',
    address: 'Street ABC, House 123, NY, USA',
    gender: 'Male',
    emergencyContact: '+92 300 1234567',
    email: 'waseem.hassan@email.com'
  };

  // Mock visit history data
  const visitHistory = [
    {
      id: 1,
      date: '2024-08-15',
      time: '10:30 AM',
      type: 'Physical',
      location: 'Main Clinic - Room 205',
      vitalSigns: {
        temperature: '98.6°F',
        bloodPressure: '118/78 mmHg',
        pulse: '72 bpm',
        weight: '48 kg',
        height: '170 cm'
      },
      examination: 'Patient presented with mild headache and fatigue. No fever detected. Lymph nodes normal.',
      diagnosis: 'Tension headache, mild dehydration'
    },
    {
      id: 2,
      date: '2024-08-10',
      time: '2:15 PM',
      type: 'Online',
      location: 'Telemedicine',
      vitalSigns: {
        temperature: 'Not measured',
        bloodPressure: 'Self-reported: 120/80',
        pulse: 'Not measured',
        weight: '48 kg',
        height: '170 cm'
      },
      examination: 'Follow-up consultation for previous symptoms. Patient reports improvement in condition.',
      diagnosis: 'Recovery progressing well'
    },
    {
      id: 3,
      date: '2024-08-05',
      time: '11:00 AM',
      type: 'Physical',
      location: 'Emergency Department',
      vitalSigns: {
        temperature: '101.2°F',
        bloodPressure: '125/82 mmHg',
        pulse: '78 bpm',
        weight: '47 kg',
        height: '170 cm'
      },
      examination: 'Initial presentation with fever and body aches. Physical examination revealed mild throat inflammation.',
      diagnosis: 'Viral syndrome, supportive care recommended'
    }
  ];

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

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Patient Information - Collapsible */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <button
                  onClick={() => toggleSection('patientInfo')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-gray-900 font-bold text-lg hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    <span>Patient Information</span>
                  </div>
                  {expandedSections.patientInfo ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.patientInfo && (
                  <div className="p-4 sm:p-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                        <p className="text-gray-800 text-sm">{patientData.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                        <p className="text-gray-800 text-sm">{patientData.age}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                        <p className="text-gray-800 text-sm">{patientData.gender}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <p className="text-gray-800 text-sm">{patientData.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <p className="text-gray-800 text-sm">{patientData.email}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                        <p className="text-gray-800 text-sm">{patientData.address}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                        <p className="text-gray-800 text-sm">{patientData.emergencyContact}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleEHRClick}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                      >
                        <Eye className="w-5 h-5" />
                        Access Full EHR
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Family & Past History */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <button
                  onClick={() => toggleSection('familyHistory')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-gray-900 font-bold text-base hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span>Family & Past History</span>
                  </div>
                  {expandedSections.familyHistory ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.familyHistory && (
                  <div className="p-4 sm:p-6 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>AB+</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>O+</option>
                          <option>O-</option>
                          <option>AB-</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Health Conditions</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>Cancer/Cardiac</option>
                          <option>Diabetes</option>
                          <option>Hypertension</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Drug Allergy</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>Penicillin</option>
                          <option>Aspirin</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Family History</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>Diabetic</option>
                          <option>Hypertension</option>
                          <option>Cancer</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Operation History</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>None</option>
                          <option>Appendectomy</option>
                          <option>Cardiac Surgery</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Addictions</label>
                        <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                          <option>None</option>
                          <option>Smoking</option>
                          <option>Alcohol</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Current Medications</label>
                      <textarea
                        placeholder="List current medications..."
                        className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        rows="3"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Visit History */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <button
                  onClick={() => toggleSection('visitHistory')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-gray-900 font-bold text-base hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span>Visit History ({visitHistory.length} visits)</span>
                  </div>
                  {expandedSections.visitHistory ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.visitHistory && (
                  <div className="border-t border-gray-100">
                    {visitHistory.map((visit) => (
                      <div key={visit.id} className="border-b border-gray-50 last:border-b-0">
                        <button
                          onClick={() => toggleVisit(visit.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            {visit.type === 'Physical' ? (
                              <MapPin className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Video className="w-4 h-4 text-green-600" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{visit.date} at {visit.time}</div>
                              <div className="text-xs text-gray-600">{visit.type} - {visit.location}</div>
                            </div>
                          </div>
                          {expandedVisits[visit.id] ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        {expandedVisits[visit.id] && (
                          <div className="p-4 bg-gray-50 space-y-4">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2 text-sm">Vital Signs</h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>Temperature: {visit.vitalSigns.temperature}</div>
                                <div>BP: {visit.vitalSigns.bloodPressure}</div>
                                <div>Pulse: {visit.vitalSigns.pulse}</div>
                                <div>Weight: {visit.vitalSigns.weight}</div>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2 text-sm">Examination</h5>
                              <p className="text-xs text-gray-700">{visit.examination}</p>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2 text-sm">Diagnosis</h5>
                              <p className="text-xs text-gray-700">{visit.diagnosis}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Health Complaint / Examinations - Collapsible */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100">
                <button
                  onClick={() => toggleSection('healthComplaint')}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-gray-900 font-bold text-base hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Health Complaint</span>
                  </div>
                  {expandedSections.healthComplaint ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSections.healthComplaint && (
                  <div className="p-4 sm:p-6 border-t border-gray-100 space-y-6">
                    <div className="flex items-center justify-end">
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-sm font-medium">EHR</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Temperature (°C)</label>
                        <input
                          type="text"
                          defaultValue="100"
                          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Blood Pressure (mmHg)</label>
                        <input
                          type="text"
                          defaultValue="120/80"
                          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pulse (bpm)</label>
                        <input
                          type="text"
                          defaultValue="73"
                          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
                        <input
                          type="text"
                          defaultValue="50"
                          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Height (cm)</label>
                        <input
                          type="text"
                          defaultValue="170"
                          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* File Upload Section - Inside Health Complaint */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-3">Medical Files</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-600 font-medium text-xs">WH</span>
                          </div>
                          <span className="text-sm text-gray-600">Medical_Report.pdf</span>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-all duration-200">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Examination */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <h3 className="text-sm font-bold text-gray-700 mb-2">Examination</h3>
                <textarea
                  placeholder="Physical examination findings..."
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500"
                  rows="3"
                />
              </div>

              {/* Doctor's Diagnosis */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-700">Diagnosis</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
                <select className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500">
                  <option>Provisional/Final</option>
                  <option>Provisional</option>
                  <option>Final</option>
                  <option>Differential</option>
                </select>
                <textarea
                  placeholder="Enter diagnosis details..."
                  className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200 focus:border-green-500 mt-3"
                  rows="2"
                />
                <p className="text-xs text-gray-600 mt-1">For e.g., Diabetes, Hypertension...</p>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  <button
                    onClick={() => {
                      setShowWritePrescriptionModel(true);
                    }}
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200"
                  >
                    Prescription
                  </button>
                  <button
                    onClick={() => {
                      setShowWriteLabTestModel(true)
                    }}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-200"
                  >
                    Lab Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientComplaintWithMedicalAndVisitHistoryModel;