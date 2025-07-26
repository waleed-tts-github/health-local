import React, { useState } from 'react';
import { ChevronDown, User, Calendar, Droplets, Heart, Pill, Users, Stethoscope, Shield } from 'lucide-react';
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      <div className="relative">
        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-sm flex items-center justify-between"
            aria-label={`Select ${label}`}
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              {Icon && <Icon className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 flex-shrink-0" />}
              <span className={value ? 'text-gray-900 text-xs sm:text-sm' : 'text-gray-500 text-xs sm:text-sm'}>
                {value || 'Select an option'}
              </span>
            </div>
            <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-all duration-200 first:rounded-t-lg last:rounded-b-lg text-gray-900 text-xs sm:text-sm"
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
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 flex-shrink-0" />}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-sm text-gray-900 text-xs sm:text-sm leading-5"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Complete Your Health Profile</h2>
            <p className="text-xs sm:text-sm text-gray-600">Help us provide you with personalized healthcare services</p>
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