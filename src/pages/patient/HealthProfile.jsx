import React, { useState } from 'react';
import { ChevronDown, User, Calendar, Droplets, Heart, Pill, Users, Stethoscope, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import BackButton from '../../components/BackButton';

const HealthProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    fullName: '',
    gender: '',
    dob: '',
    bloodGroup: '',
    medicalCondition: '',
    drugAllergy: '',
    familyHistory: '',
    surgicalHistory: '',
    drugAllergySecond: ''
  });
  const [formToggle, setFormToggle] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormToggle = () => {
    setFormToggle(prev => !prev);
  };

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

  const CustomDropdown = ({ label, value, options, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-1">
        <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500"
            aria-label={`Select ${label}`}
          >
            <span className={value ? 'text-gray-800' : 'text-gray-500'}>
              {value || 'Select an option'}
            </span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {Icon && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <Icon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
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
    );
  };

  const InputField = ({ label, value, onChange, placeholder, icon: Icon, type = "text" }) => (
    <div className="space-y-1">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500"
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Complete Your Health Profile</h2>
              <p className="text-xs sm:text-sm text-gray-600">Help us provide you with personalized healthcare services</p>
            </div>
            <button
              onClick={handleFormToggle}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 border border-gray-200"
              aria-label="Toggle health profile form"
            >
              <div className={`relative w-8 sm:w-10 h-4 sm:h-5 rounded-full transition-all duration-300 ${formToggle ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-sm transform transition-all duration-300 ${formToggle ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs sm:text-sm font-medium">Hide Health Profile</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-emerald-100 rounded-full mx-auto mb-4 sm:mb-6">
            <User className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                icon={User}
              />
              
              <InputField
                label="Full Name"
                value={formData.fullName}
                onChange={(value) => handleInputChange('fullName', value)}
                placeholder="Enter your full name"
                icon={User}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <CustomDropdown
                label="Gender"
                value={formData.gender}
                options={genderOptions}
                onChange={(value) => handleInputChange('gender', value)}
                icon={User}
              />
              
              <InputField
                label="Date of Birth"
                value={formData.dob}
                onChange={(value) => handleInputChange('dob', value)}
                placeholder="YYYY-MM-DD"
                icon={Calendar}
                type="date"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <CustomDropdown
                label="Blood Group"
                value={formData.bloodGroup}
                options={bloodGroupOptions}
                onChange={(value) => handleInputChange('bloodGroup', value)}
                icon={Droplets}
              />
              
              <CustomDropdown
                label="Medical Condition"
                value={formData.medicalCondition}
                options={medicalConditions}
                onChange={(value) => handleInputChange('medicalCondition', value)}
                icon={Stethoscope}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <CustomDropdown
                label="Drug Allergy"
                value={formData.drugAllergy}
                options={allergies}
                onChange={(value) => handleInputChange('drugAllergy', value)}
                icon={Shield}
              />
              
              <CustomDropdown
                label="Family History"
                value={formData.familyHistory}
                options={familyHistoryOptions}
                onChange={(value) => handleInputChange('familyHistory', value)}
                icon={Users}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <CustomDropdown
                label="History Of Operation/Surgical Procedure"
                value={formData.surgicalHistory}
                options={surgicalOptions}
                onChange={(value) => handleInputChange('surgicalHistory', value)}
                icon={Stethoscope}
              />
              
              <CustomDropdown
                label="Additional Drug Allergies"
                value={formData.drugAllergySecond}
                options={allergies}
                onChange={(value) => handleInputChange('drugAllergySecond', value)}
                icon={Pill}
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <button
                onClick={() => console.log('Health profile saved:', formData)}
                className="w-full bg-green-600 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                aria-label="Save Health Profile"
              >
                Save Health Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfile;