import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, FileText } from 'lucide-react';
import logo from '../../assets/Group.png';

const WriteLabTestModal = ({ isOpen, onClose, onSave }) => {
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

  const [clinicalNotes, setClinicalNotes] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryOptions = [
    'Hematology',
    'Clinical Chemistry',
    'Microbiology',
    'Radiology',
    'Cardiology',
    'Endocrinology',
    'Immunology',
    'Pathology',
    'Urology',
    'Gastroenterology'
  ];

  const testOptions = {
    'Hematology': [
      'Complete Blood Count (CBC)',
      'Hemoglobin (Hb)',
      'Hematocrit (HCT)',
      'Platelet Count',
      'White Blood Cell Count (WBC)',
      'Red Blood Cell Count (RBC)',
      'ESR (Erythrocyte Sedimentation Rate)',
      'Bleeding Time',
      'Clotting Time',
      'Prothrombin Time (PT)',
      'Partial Thromboplastin Time (PTT)'
    ],
    'Clinical Chemistry': [
      'Blood Glucose (Fasting)',
      'Blood Glucose (Random)',
      'HbA1c (Glycated Hemoglobin)',
      'Lipid Profile',
      'Liver Function Tests (LFTs)',
      'Kidney Function Tests (KFTs)',
      'Serum Creatinine',
      'Blood Urea Nitrogen (BUN)',
      'Serum Electrolytes',
      'Serum Protein',
      'Serum Albumin'
    ],
    'Microbiology': [
      'Blood Culture',
      'Urine Culture',
      'Stool Culture',
      'Throat Swab Culture',
      'Sputum Culture',
      'Wound Culture',
      'Hepatitis B Surface Antigen (HBsAg)',
      'Hepatitis C Antibody (Anti-HCV)',
      'HIV Screening',
      'Malaria Parasite (MP)',
      'Widal Test'
    ],
    'Radiology': [
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
    'Cardiology': [
      'Electrocardiogram (ECG)',
      'Echocardiography',
      'Stress Test',
      'Holter Monitoring',
      'Cardiac Enzymes',
      'Troponin I',
      'Troponin T',
      'CK-MB',
      'BNP (B-type Natriuretic Peptide)',
      'D-Dimer'
    ],
    'Endocrinology': [
      'Thyroid Function Tests (TFTs)',
      'TSH (Thyroid Stimulating Hormone)',
      'Free T3',
      'Free T4',
      'Insulin Level',
      'Cortisol Level',
      'Growth Hormone',
      'Prolactin',
      'Testosterone',
      'Estrogen',
      'Progesterone'
    ],
    'Immunology': [
      'Rheumatoid Factor (RF)',
      'Anti-CCP Antibodies',
      'ANA (Antinuclear Antibodies)',
      'Anti-dsDNA',
      'Complement C3',
      'Complement C4',
      'Immunoglobulin G (IgG)',
      'Immunoglobulin M (IgM)',
      'Immunoglobulin A (IgA)',
      'Immunoglobulin E (IgE)'
    ],
    'Pathology': [
      'Biopsy Examination',
      'Fine Needle Aspiration (FNA)',
      'Pap Smear',
      'Histopathology',
      'Cytology',
      'Frozen Section',
      'Immunohistochemistry',
      'Bone Marrow Examination'
    ],
    'Urology': [
      'Urine Routine Examination',
      'Urine Culture',
      'PSA (Prostate Specific Antigen)',
      'Semen Analysis',
      'Kidney Function Tests',
      'Urine Protein',
      '24-Hour Urine Collection',
      'Creatinine Clearance'
    ],
    'Gastroenterology': [
      'Stool Routine Examination',
      'Stool for Occult Blood',
      'H. Pylori Antigen',
      'Liver Function Tests',
      'Hepatitis Panel',
      'Celiac Disease Panel',
      'Inflammatory Bowel Disease Panel',
      'Fecal Calprotectin'
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

  const handleAddTest = () => {
    if (currentTest.category && currentTest.test && currentTest.priority) {
      setLabTestData([...labTestData, { 
        ...currentTest, 
        id: Date.now()
      }]);
      setCurrentTest({ category: '', test: '', priority: '', instructions: '' });
      setShowAddForm(false);
    }
  };

  const handleRemoveTest = (id) => {
    setLabTestData(labTestData.filter(item => item.id !== id));
  };

  const handleSave = () => {
    if (labTestData.length > 0) {
      const fullLabOrder = {
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
        pmcdNumber: "525578858",
        labTests: labTestData,
        clinicalNotes: clinicalNotes
      };
      onSave && onSave(fullLabOrder);
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

  const getAvailableTests = () => {
    return currentTest.category ? testOptions[currentTest.category] || [] : [];
  };

  if (showPreview) {
    const labOrder = {
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
      pmcdNumber: "525578858",
      labTests: labTestData,
      clinicalNotes: clinicalNotes
    };

    return (
      <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible border border-gray-200">
          <div className="relative z-10 flex flex-col h-full">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b border-gray-200 shadow-sm">
              <div className="flex items-center justify-between space-x-2 relative">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
                    <img src={logo} className="h-6 w-6" alt="Angill Logo" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Angill
                    </h1>
                    <p className="text-green-600 text-xs font-medium">
                      Healthcare
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-right mr-[15px]">
                  <h2 className="text-sm font-semibold text-gray-800">{labOrder.doctorName}</h2>
                  <p className="text-gray-600 text-xs font-medium">{labOrder.specialty}</p>
                  <p className="text-gray-600 text-xs font-medium">{labOrder.qualification}</p>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-[-15px] right-[-15px]"
                  aria-label="Back to edit"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Doctor and Patient Info */}
            <div className="px-4 py-3 flex-1 flex flex-col">
              <div className="border border-gray-200 rounded-xl p-3 mb-4">
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center min-w-[120px]">
                    <span className="text-gray-700 font-normal">Patient:</span>
                    <span className="ml-2 text-gray-800 font-medium">{labOrder.patientName}</span>
                  </div>
                  <div className="flex items-center min-w-[60px]">
                    <span className="text-gray-700 font-normal">Age:</span>
                    <span className="ml-2 text-gray-800 font-medium">{labOrder.age}</span>
                  </div>
                  <div className="flex items-center min-w-[80px]">
                    <span className="text-gray-700 font-normal">Date:</span>
                    <span className="ml-2 text-gray-800 font-medium">{formatDate(labOrder.date)}</span>
                  </div>
                </div>
              </div>

              {/* Lab Order Content */}
              <div className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="w-40 h-40 border-4 border-green-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-normal text-green-200">Lab</span>
                  </div>
                </div>
                <div className="relative z-10 space-y-2 h-full">
                  <div className="flex h-full">
                    <div className="w-16 pr-3 flex flex-col items-center border-r-8 border-gray-300">
                      <span className="text-green-600 font-medium text-xs mb-4">LAB</span>
                      <span className="text-green-600 font-medium text-xs mb-2">ORDER</span>
                      <div className="flex-1"></div>
                      <span className="text-green-600 font-medium text-xs mb-3">REP=</span>
                    </div>
                    <div className="flex-1 pl-3">
                      {labOrder.labTests.map((test, index) => (
                        <div key={index} className="text-xs text-gray-800 leading-relaxed font-normal mb-3 border-b border-gray-100 pb-2">
                          <p className="font-medium text-green-600">{test.category}</p>
                          <p className="ml-2">• {test.test}</p>
                          <p className="ml-2 text-gray-600">Priority: {test.priority}</p>
                          {test.instructions && (
                            <p className="ml-2 text-gray-600 italic">Note: {test.instructions}</p>
                          )}
                        </div>
                      ))}
                      {labOrder.clinicalNotes && (
                        <div className="text-xs text-gray-800 leading-relaxed font-normal mt-4 border-t border-gray-200 pt-3">
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
            <div className="px-4 pb-4 border-t border-gray-200 flex-shrink-0">
              <div className="text-center">
                <p className="text-xs text-gray-600">{labOrder.hospitalAddress}</p>
                <p className="text-xs text-gray-500 mt-1">Lab Results to be reported within 24-48 hours</p>
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
                  
                  Send
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
          <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between space-x-2 relative">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
                  <img src={logo} className="h-6 w-6" alt="Angill Logo" />
                </div>
                <div>
                  <h1 className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Angill
                  </h1>
                  <p className="text-green-600 text-xs font-medium">
                    Healthcare
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-right mr-[20px]">
                <h2 className="text-sm font-semibold text-gray-800">DR. AZFAR HUSSAIN</h2>
                <p className="text-gray-600 text-xs font-medium">DOCTOR (CONSULTANT) (ENT)</p>
                <p className="text-gray-600 text-xs font-medium">MBBS, FCPS (ENT)</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 absolute top-[-15px] right-[-15px]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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

            {/* Add Test Section (shown on button click) */}
            {showAddForm && (
              <div className="border border-gray-200 rounded-xl p-3 mb-4">
                <h3 className="text-xs font-medium text-green-600 mb-2 flex items-center">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Lab Test
                </h3>
                <div className="space-y-2">
                  <select
                    value={currentTest.category}
                    onChange={(e) => setCurrentTest({...currentTest, category: e.target.value, test: ''})}
                    className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select
                    value={currentTest.test}
                    onChange={(e) => setCurrentTest({...currentTest, test: e.target.value})}
                    className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    disabled={!currentTest.category}
                  >
                    <option value="">Select Test</option>
                    {getAvailableTests().map(test => (
                      <option key={test} value={test}>{test}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <select
                      value={currentTest.priority}
                      onChange={(e) => setCurrentTest({...currentTest, priority: e.target.value})}
                      className="flex-1 text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Priority</option>
                      {priorityOptions.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={currentTest.instructions}
                    onChange={(e) => setCurrentTest({...currentTest, instructions: e.target.value})}
                    placeholder="Special instructions for this test (optional)"
                    className="w-full h-16 text-xs p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddTest}
                      disabled={!currentTest.category || !currentTest.test || !currentTest.priority}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-md text-xs font-medium transition-colors"
                    >
                      Add Test
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Test List and Clinical Notes (shown only if tests exist and not in add form) */}
            {labTestData.length > 0 && !showAddForm && (
              <>
                <div className="border border-gray-200 rounded-xl p-3 mb-4 flex-1">
                  <h3 className="text-xs font-medium text-green-600 mb-2">Ordered Tests</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {labTestData.map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-green-600 block">{item.category}</span>
                          <span className="text-xs text-gray-800 block">• {item.test}</span>
                          <span className="text-xs text-gray-600">Priority: {item.priority}</span>
                          {item.instructions && (
                            <span className="text-xs text-gray-600 italic block">Note: {item.instructions}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveTest(item.id)}
                          className="text-red-400 hover:text-red-600 p-1 ml-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-3 mb-4">
                  <h3 className="text-xs font-medium text-green-600 mb-2">Clinical Notes</h3>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Clinical indication, symptoms, differential diagnosis, etc."
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
              {labTestData.length > 0 && (
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
                disabled={labTestData.length === 0}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                Save
              </button>
            </div>
          </div>

          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="absolute bottom-14 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}

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
};

export default WriteLabTestModal;