import React, { useState } from 'react';
import { ChevronDown, User, Mail, Calendar, CreditCard, Phone, Camera, Heart, Lock } from 'lucide-react';
import BackButton from '../../components/BackButton';

const PatientEditProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    cnic: '',
    phone: '',
    gender: '',
    photo: null,
    bloodVolunteer: false,
    password: '',
    confirmPassword: '',
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const genderOptions = ['Male', 'Female', 'Other'];

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
              {Icon && <span className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400"><Icon /></span>}
              <span className={value ? 'text-gray-900 text-xs sm:text-sm' : 'text-gray-500 text-xs sm:text-sm'}>
                {value || 'Select an option'}
              </span>
            </div>
            <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 text-gray-400 transition-all duration-200 transform ${isOpen ? 'rotate-180' : ''}`} />
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
          {Icon && <span className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400"><Icon /></span>}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-sm text-gray-900 text-xs sm:text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BackButton />

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Edit Your Profile</h2>
            <p className="text-xs sm:text-sm text-gray-600">Update your personal information or change your password</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-emerald-100 rounded-full mx-auto mb-4 sm:mb-6">
            <User className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex flex-wrap space-x-2 sm:space-x-4 bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-sm">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-50'
                }`}
                aria-label="Edit Profile Information"
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'password'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-50'
                }`}
                aria-label="Change Password"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
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
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  placeholder="Enter your last name"
                  icon={User}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  label="Email Address"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email address"
                  icon={Mail}
                  type="email"
                />
                <InputField
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(value) => handleInputChange('dateOfBirth', value)}
                  placeholder="YYYY-MM-DD"
                  icon={Calendar}
                  type="date"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  label="CNIC Number"
                  value={formData.cnic}
                  onChange={(value) => handleInputChange('cnic', value)}
                  placeholder="34604-0515319-5"
                  icon={CreditCard}
                />
                <InputField
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  placeholder="03001234567"
                  icon={Phone}
                  type="tel"
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
                <div className="space-y-1">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:border-emerald-500 transition-all duration-200 bg-gray-50 hover:bg-emerald-50 shadow-sm hover:shadow-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    {formData.photo ? (
                      <div className="relative flex flex-col items-center">
                        <img
                          src={previewPhoto}
                          alt="Profile Preview"
                          className="w-20 sm:w-28 h-20 sm:h-28 rounded-full object-cover mb-2 border-none"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="cursor-pointer inline-flex items-center space-x-1 bg-emerald-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all duration-200"
                        >
                          <Camera className="w-3 sm:w-4 h-3 sm:h-4" />
                          <span>Change Photo</span>
                        </label>
                        <p className="text-emerald-600 text-xs sm:text-sm mt-2 font-bold">✓ {formData.photo.name}</p>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <Camera className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                        </div>
                        <p className="text-gray-700 font-bold text-sm sm:text-base">Upload your photo</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-3 sm:p-5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                      <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-lg text-gray-900">Blood Volunteer</h3>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">Help save lives in your community</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="bloodVolunteer"
                      checked={formData.bloodVolunteer}
                      onChange={(e) => handleInputChange('bloodVolunteer', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-[16px] sm:peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => console.log('Profile updated:', { ...formData, password: undefined, confirmPassword: undefined })}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                  aria-label="Save Profile"
                >
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField
                  label="New Password"
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  placeholder="Enter new password"
                  icon={Lock}
                  type="password"
                />
                <InputField
                  label="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Confirm new password"
                  icon={Lock}
                  type="password"
                />
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => console.log('Password updated:', { password: formData.password, confirmPassword: formData.confirmPassword })}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                  aria-label="Change Password"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientEditProfile;