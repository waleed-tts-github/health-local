import React, { useState } from 'react';
import { User, Calendar, Droplets, Heart, Pill, Users, Stethoscope, Shield, Cigarette } from 'lucide-react';
import BackButton from '../../components/BackButton';

const MedicalHistory = () => {
  const [firstName, setFirstName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [drugAllergy, setDrugAllergy] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [surgicalHistory, setSurgicalHistory] = useState('');
  const [drugAllergySecond, setDrugAllergySecond] = useState('');
  const [addiction, setAddiction] = useState('');
  const [hideMedicalHistoryToggle, setHideMedicalHistoryToggle] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isBloodGroupOpen, setIsBloodGroupOpen] = useState(false);
  const [isMedicalConditionOpen, setIsMedicalConditionOpen] = useState(false);
  const [isDrugAllergyOpen, setIsDrugAllergyOpen] = useState(false);
  const [isFamilyHistoryOpen, setIsFamilyHistoryOpen] = useState(false);
  const [isSurgicalHistoryOpen, setIsSurgicalHistoryOpen] = useState(false);
  const [isDrugAllergySecondOpen, setIsDrugAllergySecondOpen] = useState(false);
  const [isAddictionOpen, setIsAddictionOpen] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const medicalConditions = [
    'Not That I Know Of',
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Asthma',
    'Arthritis',
    'Kidney Disease',
    'Liver Disease',
    'Cancer',
    'Thyroid Disorder',
    'Other'
  ];
  const allergies = [
    'Not That I Know Of',
    'Penicillin',
    'Aspirin',
    'Ibuprofen',
    'Sulfa drugs',
    'Latex',
    'Contrast dye',
    'Anesthesia',
    'Other'
  ];
  const familyHistoryOptions = [
    'Not That I Know Of',
    'Heart Disease',
    'Diabetes',
    'Cancer',
    'Hypertension',
    'Stroke',
    'Mental Health Issues',
    'Genetic Disorders',
    'Other'
  ];
  const surgicalOptions = [
    'Not That I Know Of',
    'Appendectomy',
    'Gallbladder Surgery',
    'Heart Surgery',
    'Orthopedic Surgery',
    'Brain Surgery',
    'Eye Surgery',
    'Cosmetic Surgery',
    'Other'
  ];
  const addictionOptions = [
    'None',
    'Smoking',
    'Alcohol',
    'Marijuana',
    'Opioids',
    'Cocaine',
    'Methamphetamine',
    'Other'
  ];

  const handleHideMedicalHistoryToggle = () => {
    setHideMedicalHistoryToggle(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Complete Your Medical History</h2>
              <p className="text-xs sm:text-sm text-gray-600">Help us provide you with personalized healthcare services</p>
            </div>
            <button
              onClick={handleHideMedicalHistoryToggle}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 border border-gray-200"
              aria-label="Toggle medical history form"
            >
              <div className={`relative w-8 sm:w-10 h-4 sm:h-5 rounded-full transition-all duration-300 ${hideMedicalHistoryToggle ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-sm transform transition-all duration-300 ${hideMedicalHistoryToggle ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs sm:text-sm font-medium">Hide Medical History</span>
            </button>
          </div>
        </div>

        {!hideMedicalHistoryToggle && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-emerald-100 rounded-full mx-auto mb-4 sm:mb-6">
              <User className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsGenderOpen(!isGenderOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Gender"
                    >
                      <span className={gender ? 'text-gray-800' : 'text-gray-500'}>
                        {gender || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isGenderOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isGenderOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {genderOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setGender(option);
                              setIsGenderOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsBloodGroupOpen(!isBloodGroupOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Blood Group"
                    >
                      <span className={bloodGroup ? 'text-gray-800' : 'text-gray-500'}>
                        {bloodGroup || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isBloodGroupOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Droplets className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isBloodGroupOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {bloodGroupOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setBloodGroup(option);
                              setIsBloodGroupOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Medical Condition</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsMedicalConditionOpen(!isMedicalConditionOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Medical Condition"
                    >
                      <span className={medicalCondition ? 'text-gray-800' : 'text-gray-500'}>
                        {medicalCondition || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isMedicalConditionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Stethoscope className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isMedicalConditionOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {medicalConditions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setMedicalCondition(option);
                              setIsMedicalConditionOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Drug Allergy</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDrugAllergyOpen(!isDrugAllergyOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Drug Allergy"
                    >
                      <span className={drugAllergy ? 'text-gray-800' : 'text-gray-500'}>
                        {drugAllergy || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isDrugAllergyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Shield className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isDrugAllergyOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {allergies.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setDrugAllergy(option);
                              setIsDrugAllergyOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Family History</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsFamilyHistoryOpen(!isFamilyHistoryOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Family History"
                    >
                      <span className={familyHistory ? 'text-gray-800' : 'text-gray-500'}>
                        {familyHistory || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isFamilyHistoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isFamilyHistoryOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {familyHistoryOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setFamilyHistory(option);
                              setIsFamilyHistoryOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">History Of Operation/Surgical Procedure</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSurgicalHistoryOpen(!isSurgicalHistoryOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Surgical History"
                    >
                      <span className={surgicalHistory ? 'text-gray-800' : 'text-gray-500'}>
                        {surgicalHistory || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isSurgicalHistoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Stethoscope className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isSurgicalHistoryOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {surgicalOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSurgicalHistory(option);
                              setIsSurgicalHistoryOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Drug Allergies</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDrugAllergySecondOpen(!isDrugAllergySecondOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Additional Drug Allergies"
                    >
                      <span className={drugAllergySecond ? 'text-gray-800' : 'text-gray-500'}>
                        {drugAllergySecond || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isDrugAllergySecondOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Pill className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isDrugAllergySecondOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {allergies.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setDrugAllergySecond(option);
                              setIsDrugAllergySecondOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Addiction History</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsAddictionOpen(!isAddictionOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Addiction History"
                    >
                      <span className={addiction ? 'text-gray-800' : 'text-gray-500'}>
                        {addiction || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isAddictionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <Cigarette className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isAddictionOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {addictionOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setAddiction(option);
                              setIsAddictionOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => console.log('Medical history saved:', { firstName, fullName, gender, dob, bloodGroup, medicalCondition, drugAllergy, familyHistory, surgicalHistory, drugAllergySecond, addiction })}
                  className="w-full bg-green-500 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                  aria-label="Save Medical History"
                >
                  Save Medical History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;