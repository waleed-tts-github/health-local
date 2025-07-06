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
        <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3">
              {Icon && <span className="w-5 h-5 text-gray-400"><Icon /></span>}
              <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                {value || 'Select an option'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-4 text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-all duration-200 first:rounded-t-xl last:rounded-b-xl text-gray-900"
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
      <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <span className="w-5 h-5 text-gray-400"><Icon /></span>}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-gray-900"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <BackButton />

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Health Profile</h2>
            <p className="text-gray-600 text-sm">Help us provide you with personalized healthcare services</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-6">
            <User className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="pt-6">
              <button
                onClick={() => console.log('Health profile saved:', formData)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
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