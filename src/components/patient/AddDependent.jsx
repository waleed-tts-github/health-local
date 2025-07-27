import React, { useState } from 'react';
import { User, Phone, MapPin, Upload, AlertCircle } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext'

const AddDependent = () => {
  const { handleAddDependentSubmit } = useConsultationFlow();

  const [formData, setFormData] = useState({
    guardianName: '',
    cnicNumber: '',
    gender: '',
    dependentFirstName: '',
    dependentLastName: '',
    dependentUsername: '',
    dependentRelation: '',
    phoneNumber: '',
    countryCode: '92',
    address: '',
    dateOfBirth: '',
    profileImage: null
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.cnicNumber) {
      newErrors.cnicNumber = 'CNIC number is required';
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnicNumber)) {
      newErrors.cnicNumber = 'CNIC must be in the format 12345-1234567-1';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dependentFirstName.trim()) newErrors.dependentFirstName = 'First name is required';
    if (!formData.dependentLastName.trim()) newErrors.dependentLastName = 'Last name is required';
    if (!formData.dependentUsername.trim()) newErrors.dependentUsername = 'Username is required';
    if (!formData.dependentRelation) newErrors.dependentRelation = 'Relation is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{9,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 9-11 digits';
    }
    if (!formData.countryCode) newErrors.countryCode = 'Country code is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.profileImage) newErrors.profileImage = 'Profile image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      handleAddDependentSubmit();
    }
  };

  const CustomDropdown = ({ label, value, options, name, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
              errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
            }`}
          >
            <span className={value ? 'text-gray-800' : 'text-gray-500'}>
              {value || 'Select an option'}
            </span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-8 top-1/2 -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {Icon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    handleInputChange({ target: { name, value: option } });
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
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle size={16} className="mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const InputField = ({ label, value, name, placeholder, icon: Icon, type = "text" }) => (
    <div className="space-y-1">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
            errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
          }`}
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle size={16} className="mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const TextAreaField = ({ label, value, name, placeholder, icon: Icon }) => (
    <div className="space-y-1">
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <textarea
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 ${
            errors[name] ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
          }`}
        />
        {Icon && (
          <div className="absolute right-3 top-3">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle size={16} className="mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen font-poppins">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">Guardian Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Guardian Name"
                  name="guardianName"
                  value={formData.guardianName}
                  placeholder="Enter guardian's full name"
                  icon={User}
                />
                <InputField
                  label="CNIC Number"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  placeholder="12345-1234567-1"
                  icon={User}
                />
                <CustomDropdown
                  label="Gender"
                  value={formData.gender}
                  options={['Male', 'Female', 'Other']}
                  name="gender"
                  icon={User}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">Dependent Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Dependent First Name"
                  name="dependentFirstName"
                  value={formData.dependentFirstName}
                  placeholder="Enter first name"
                  icon={User}
                />
                <InputField
                  label="Dependent Last Name"
                  name="dependentLastName"
                  value={formData.dependentLastName}
                  placeholder="Enter last name"
                  icon={User}
                />
                <InputField
                  label="Dependent Username"
                  name="dependentUsername"
                  value={formData.dependentUsername}
                  placeholder="Enter username"
                  icon={User}
                />
                <CustomDropdown
                  label="Dependent Relation"
                  value={formData.dependentRelation}
                  options={['Child', 'Spouse', 'Parent', 'Sibling', 'Other']}
                  name="dependentRelation"
                  icon={User}
                />
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  placeholder="Select date"
                  icon={User}
                  type="date"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="flex gap-3 items-center">
                    <div className="relative w-28">
                      <CustomDropdown
                        label=""
                        value={formData.countryCode}
                        options={['92', '1', '44']}
                        name="countryCode"
                        icon={Phone}
                      />
                    </div>
                    <InputField
                      label=""
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      placeholder="125874682"
                      icon={Phone}
                      type="tel"
                    />
                  </div>
                </div>
                <TextAreaField
                  label="Address"
                  name="address"
                  value={formData.address}
                  placeholder="123, Street ABC, NY, USA"
                  icon={MapPin}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">Profile Image</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image-upload"
                    />
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-200">
                      <Upload className="w-5 h-5" />
                      Change Profile Image
                    </div>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">Upload a JPG, PNG, or GIF file (max 5MB)</p>
                  {formData.profileImage && (
                    <p className="text-green-600 text-sm mt-2 font-semibold">✓ {formData.profileImage.name}</p>
                  )}
                  {errors.profileImage && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.profileImage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition duration-200 flex items-center justify-center"
              >
                Add Dependent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDependent;