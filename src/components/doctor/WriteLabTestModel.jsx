import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Printer, Send } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useDoctorConsultation } from '../../contexts/DoctorConsultationContext';

const WriteLabTestModal = ({ isOpen, onClose }) => {
  const { setShowWriteLabTestModel, setShowPatientComplaintWithMedicalAndVisitHistoryModel, setIsAppointmentCompleted } = useDoctorConsultation();
  const [patientInfo, setPatientInfo] = useState({
    name: 'MR. NAIZ ZARDARI',
    age: '54',
    address: 'GULSTANE JOHAR KARACHI'
  });

  const [labTestData, setLabTestData] = useState([]);
  const [currentTest, setCurrentTest] = useState({
    category: '',
    test: '',
    priority: '',
    instructions: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTestId, setEditingTestId] = useState(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryOptions = ['Radiology', 'Lab Test'];

  const testOptions = {
    Radiology: [
      'Chest X-Ray (CXR)',
      'Abdominal X-Ray',
      'CT Scan Chest',
      'CT Scan Abdomen',
      'CT Scan Head',
      'MRI Brain',
      'MRI Spine',
      'Ultrasound Abdomen',
      'Ultrasound Pelvis',
      'Echocardiography',
      'Mammography'
    ],
    'Lab Test': [
      'Complete Blood Count (CBC)',
      'Blood Glucose (Fasting)',
      'Blood Glucose (Random)',
      'HbA1c (Glycated Hemoglobin)',
      'Lipid Profile',
      'Liver Function Tests (LFTs)',
      'Kidney Function Tests (KFTs)',
      'Serum Creatinine',
      'Blood Urea Nitrogen (BUN)',
      'Serum Electrolytes',
      'Thyroid Function Tests (TFTs)'
    ]
  };

  const priorityOptions = [
    'Routine',
    'Urgent',
    'STAT',
    'Fasting Required',
    'Pre-op',
    'Follow-up'
  ];

  if (!isOpen) return null;

  const handleAddOrUpdateTest = () => {
    if (currentTest.category && currentTest.test && currentTest.priority) {
      if (isEditing) {
        setLabTestData(labTestData.map(item =>
          item.id === editingTestId ? { ...currentTest, id: editingTestId } : item
        ));
        setIsEditing(false);
        setEditingTestId(null);
      } else {
        setLabTestData([...labTestData, { ...currentTest, id: Date.now() }]);
      }
      setCurrentTest({ category: '', test: '', priority: '', instructions: '' });
      setShowAddForm(false);
    }
  };

  const handleEditTest = (test) => {
    setCurrentTest({
      category: test.category,
      test: test.test,
      priority: test.priority,
      instructions: test.instructions
    });
    setIsEditing(true);
    setEditingTestId(test.id);
    setShowAddForm(true);
  };

  const handleRemoveTest = (id) => {
    setLabTestData(labTestData.filter(item => item.id !== id));
  };

  const handleSend = () => {
    if (labTestData.length > 0) {
      const fullLabOrder = {
        patientName: patientInfo.name,
        age: parseInt(patientInfo.age),
        address: patientInfo.address,
        date: new Date().toISOString(),
        doctorName: "DR. AZFAR HUSSAIN",
        specialty: "DOCTOR (CONSULTANT) (ENT)",
        qualification: "MBBS, FCPS (ENT)",
        hospitalName: "ANGILL CLINIC",
        hospitalAddress: "123 Medical Street, Karachi",
        licenseNumber: "876269",
        pmcdNumber: "525578858",
        labTests: labTestData,
        clinicalNotes: clinicalNotes
      };
      setIsAppointmentCompleted(true);
      setShowWriteLabTestModel(false);
      setShowPatientComplaintWithMedicalAndVisitHistoryModel(false);
    }
  };

  const formatDate = (dateString) => {
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

  const getAvailableTests = () => {
    return testOptions[currentTest.category] || [];
  };

  if (showPreview) {
    const labOrder = {
      patientName: patientInfo.name,
      age: parseInt(patientInfo.age),
      address: patientInfo.address,
      date: new Date().toISOString(),
      doctorName: "DR. AZFAR HUSSAIN",
      specialty: "DOCTOR (CONSULTANT) (ENT)",
      qualification: "MBBS, FCPS (ENT)",
      hospitalName: "ANGILL CLINIC",
      hospitalAddress: "123 Medical Street, Karachi",
      licenseNumber: "876269",
      pmcdNumber: "525578858",
      labTests: labTestData,
      clinicalNotes: clinicalNotes
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
                <div className="flex flex-col text-right mr-[15px]">
                  <h2 className="text-[11px] font-semibold text-gray-800">{labOrder.doctorName}</h2>
                  <p className="text-gray-600 text-[10px] font-medium">{labOrder.specialty}</p>
                  <p className="text-gray-600 text-[10px] font-medium">{labOrder.qualification}</p>
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
                    <span className="ml-2 text-gray-800 font-medium">{labOrder.patientName}</span>
                  </div>
                  <div className="flex items-center min-w-[50px]">
                    <span className="text-gray-700 font-normal">Age:</span>
                    <span className="ml-2 text-gray-800 font-medium">{labOrder.age}</span>
                  </div>
                  <div className="flex items-center min-w-[100px]">
                    <span className="text-gray-700 font-normal">Date & Time:</span>
                    <span className="ml-2 text-gray-800 font-medium">{formatDate(labOrder.date)}</span>
                  </div>
                </div>
              </div>

              {/* Lab Order Content */}
              <div className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="w-32 h-32 border-3 border-green-200 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-normal text-green-200">Lab</span>
                  </div>
                </div>
                <div className="relative z-10 space-y-2 h-full">
                  <div className="flex h-full">
                    <div className="w-14 pr-2 flex flex-col items-center border-r-6 border-gray-300">
                      <span className="text-green-600 font-medium text-[10px] mb-3">LAB</span>
                      <span className="text-green-600 font-medium text-[10px] mb-2">ORDER</span>
                      <div className="flex-1"></div>
                      <span className="text-green-600 font-medium text-[10px] mb-2">REP=</span>
                    </div>
                    <div className="flex-1 pl-2">
                      {labOrder.labTests.map((test, index) => (
                        <div key={index} className="text-[10px] text-gray-800 leading-relaxed font-normal mb-2 border-b border-gray-100 pb-1">
                          <p className="font-medium text-green-600">{test.category}</p>
                          <p className="ml-2">• {test.test}</p>
                          <p className="ml-2 text-gray-600">Priority: {test.priority}</p>
                          {test.instructions && (
                            <p className="ml-2 text-gray-600 italic">Note: {test.instructions}</p>
                          )}
                        </div>
                      ))}
                      {labOrder.clinicalNotes && (
                        <div className="text-[10px] text-gray-800 leading-relaxed font-normal mt-3 border-t border-gray-200 pt-2">
                          <p><strong className="text-green-600">Clinical Notes:</strong></p>
                          <p className="mt-1">{labOrder.clinicalNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 pb-3 border-t border-gray-200 flex-shrink-0">
              <div className="text-center">
                <p className="text-[10px] text-gray-600">{labOrder.hospitalAddress}</p>
                <p className="text-[10px] text-gray-500 mt-1">Lab Results to be reported within 24-48 hours</p>
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
                  <Send className="w-3 h-3 mr-1" />
                  Send
                </button>
              </div>
            </div>

            <style jsx>{`
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
                  <span className="ml-2 text-gray-800 font-medium">{formatDate(new Date())}</span>
                </div>
              </div>
            </div>

            {/* Add/Edit Test Section (shown on button click) */}
            {showAddForm && (
              <div className="border border-gray-200 rounded-xl p-2 mb-3">
                <h3 className="text-[10px] font-medium text-green-600 mb-2 flex items-center">
                  <Plus className="w-3 h-3 mr-1" />
                  {isEditing ? 'Edit Investigation' : 'Add Investigation'}
                </h3>
                <div className="space-y-2">
                  <select
                    value={currentTest.category}
                    onChange={(e) => setCurrentTest({ ...currentTest, category: e.target.value, test: '' })}
                    className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={currentTest.test}
                    onChange={(e) => setCurrentTest({ ...currentTest, test: e.target.value })}
                    className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    disabled={!currentTest.category}
                  >
                    <option value="">Select Test</option>
                    {getAvailableTests().map(test => (
                      <option key={test} value={test}>{test}</option>
                    ))}
                  </select>
                  <select
                    value={currentTest.priority}
                    onChange={(e) => setCurrentTest({ ...currentTest, priority: e.target.value })}
                    className="w-full text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Priority</option>
                    {priorityOptions.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                  <textarea
                    value={currentTest.instructions}
                    onChange={(e) => setCurrentTest({ ...currentTest, instructions: e.target.value })}
                    placeholder="Special instructions for this test (optional)"
                    className="w-full h-14 text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setIsEditing(false);
                        setEditingTestId(null);
                        setCurrentTest({ category: '', test: '', priority: '', instructions: '' });
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded-md text-[10px] font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddOrUpdateTest}
                      disabled={!currentTest.category || !currentTest.test || !currentTest.priority}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-1.5 rounded-md text-[10px] font-medium transition-colors"
                    >
                      {isEditing ? 'Update' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Test List and Clinical Notes (shown only if tests exist and not in add form) */}
            {labTestData.length > 0 && !showAddForm && (
              <>
                <div className="border border-gray-200 rounded-xl p-2 mb-3 flex-1">
                  <h3 className="text-[10px] font-medium text-green-600 mb-2">Ordered Investigations</h3>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {labTestData.map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-1.5 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <span className="text-[10px] font-medium text-green-600 block">{item.category}</span>
                          <span className="text-[10px] text-gray-800 block">• {item.test}</span>
                          <span className="text-[10px] text-gray-600">Priority: {item.priority}</span>
                          {item.instructions && (
                            <span className="text-[10px] text-gray-600 italic block">Note: {item.instructions}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditTest(item)}
                            className="text-blue-400 hover:text-blue-600 p-0.5"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemoveTest(item.id)}
                            className="text-red-400 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-2 mb-3">
                  <h3 className="text-[10px] font-medium text-green-600 mb-2">Clinical Notes</h3>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Clinical indication, symptoms, differential diagnosis, etc."
                    className="w-full h-20 text-[10px] p-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                </div>
              </>
            )}
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
              {labTestData.length > 0 && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium text-[10px] transition-all flex items-center justify-center"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Preview
                </button>
              )}
            </div>
          </div>

          {!showAddForm && (
            <button
              onClick={() => {
                setShowAddForm(true);
                setIsEditing(false);
                setEditingTestId(null);
                setCurrentTest({ category: '', test: '', priority: '', instructions: '' });
              }}
              className="absolute bottom-12 left-3 bg-green-500 text-white p-2.5 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}

          <style jsx>{`
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

export default WriteLabTestModal;