import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, Upload } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext'

const AddDependent = () => {
  const { handleAddDependentSubmit } = useConsultationFlow();

  const [formData, setFormData] = useState({
    guardianName: '',
    cnicNumber: '',
    gender: 'male',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    handleAddDependentSubmit(); // Navigate to HealthComplaint step
  };

  const CustomDropdown = ({ label, value, options, name, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <label className="block text-xs font-semibold text-gray-900 mb-1">{label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-2">
              {Icon && <span className="w-4 h-4 text-gray-400"><Icon /></span>}
              <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                {value || 'Select an option'}
              </span>
            </div>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    handleInputChange({ target: { name, value: option } });
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-all duration-200 first:rounded-t-lg last:rounded-b-lg text-gray-900"
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

  const InputField = ({ label, value, name, placeholder, icon: Icon, type = "text" }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-900 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          {Icon && <span className="w-4 h-4 text-gray-400"><Icon /></span>}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-gray-900"
        />
      </div>
    </div>
  );

  const TextAreaField = ({ label, value, name, placeholder, icon: Icon }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-900 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute top-3 left-0 pl-2 flex items-start pointer-events-none">
          {Icon && <span className="w-4 h-4 text-gray-400"><Icon /></span>}
        </div>
        <textarea
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={3}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-gray-900 resize-none"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-2">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-xl border border-gray-100 p-4 mb-4">
          <div className="text-center">
            <p className="text-gray-600 text-xs">Provide details to add a dependent to your account</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-4">
            <User className="w-6 h-6 text-emerald-600" />
          </div>

          <div className="space-y-6">
            {/* Guardian Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Guardian Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="1 4785 2584 215"
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

            {/* Dependent Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Dependent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative w-20">
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
                <InputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  icon={Calendar}
                  type="date"
                />
                <TextAreaField
                  label="Address"
                  name="address"
                  value={formData.address}
                  placeholder="123, Street ABC, NY, USA"
                  icon={MapPin}
                />
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Profile Image
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="inline-flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-sm font-semibold hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm">
                      <Upload className="w-4 h-4 text-gray-400" />
                      Change Profile Image
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a JPG, PNG, or GIF file (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 bg-gray-50 border border-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Add Dependent
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-3">
              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDependent;