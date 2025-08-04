
import React, { useState } from 'react';
import { User, Phone, MapPin, Upload, AlertCircle, Hand } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import MaskedInput from 'react-maskedinput';

const OtpModal = ({ isOpen, onClose, onVerify, phoneNumber, error }) => {
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState('');

  const handleVerify = async () => {
    try {
      // Simulate OTP verification API call (replace with actual API)
      const isValid = await simulateOtpVerification(otp);
      if (isValid) {
        onVerify();
      } else {
        setLocalError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setLocalError('Failed to verify OTP. Please try again.');
    }
  };

  const simulateOtpVerification = async (enteredOtp) => {
    // Simulate API call (replace with actual endpoint)
    return new Promise((resolve) => {
      setTimeout(() => resolve(enteredOtp === '123456'), 1000); // Mock OTP is '123456'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full mb-4">
          Verify OTP
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          An OTP has been sent to {phoneNumber}. Please enter it below.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setLocalError('');
            }}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm border-gray-200"
            maxLength={6}
            autoComplete="off"
            aria-label="OTP input"
          />
          {(localError || error) && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle size={16} className="mr-1" />
              {localError || error}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddDependent = () => {
  const { handleAddDependentSubmit } = useConsultationFlow();

  // Separate state variables for each field
  const [guardianName, setGuardianName] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dependentFirstName, setDependentFirstName] = useState('');
  const [dependentLastName, setDependentLastName] = useState('');
  const [dependentUsername, setDependentUsername] = useState('');
  const [dependentRelation, setDependentRelation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('92');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleCnicChange = (e) => {
    let value = e.target.value.replace(/[^0-9-]/g, '');
    if (value.length > 5 && value[5] !== '-') {
      value = value.slice(0, 5) + '-' + value.slice(5);
    }
    if (value.length > 13 && value[13] !== '-') {
      value = value.slice(0, 13) + '-' + value.slice(13);
    }
    value = value.slice(0, 15);
    setCnicNumber(value);
    setErrors((prev) => ({ ...prev, cnicNumber: '' }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(value);
    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setErrors((prev) => ({ ...prev, profileImage: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!cnicNumber) {
      newErrors.cnicNumber = 'CNIC number is required';
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(cnicNumber)) {
      newErrors.cnicNumber = 'CNIC must be in the format 12345-1234567-1';
    }
    if (!gender) newErrors.gender = 'Gender is required';
    if (!dependentFirstName.trim()) newErrors.dependentFirstName = 'First name is required';
    if (!dependentLastName.trim()) newErrors.dependentLastName = 'Last name is required';
    if (!dependentUsername.trim()) newErrors.dependentUsername = 'Username is required';
    if (!dependentRelation) newErrors.dependentRelation = 'Relation is required';
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 11 digits';
    }
    if (!countryCode) newErrors.countryCode = 'Country code is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!profileImage) newErrors.profileImage = 'Profile image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Simulate sending OTP (replace with actual API call)
        await simulateSendOtp(`+${countryCode}${phoneNumber}`);
        setIsOtpModalOpen(true);
      } catch (err) {
        setErrors((prev) => ({ ...prev, phoneNumber: 'Failed to send OTP. Please try again.' }));
      }
    }
  };

  const simulateSendOtp = async (phoneNumber) => {
    // Simulate OTP sending API call (replace with actual endpoint)
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleOtpVerify = async () => {
    try {
      // Create formData object for API call
      const formData = {
        guardianName,
        cnicNumber,
        gender,
        dependentFirstName,
        dependentLastName,
        dependentUsername,
        dependentRelation,
        phoneNumber,
        countryCode,
        address,
        dateOfBirth,
        profileImage,
      };
      await handleAddDependentSubmit(formData);
      setIsOtpModalOpen(false);
      // Optionally, show a success message or redirect
    } catch (err) {
      setOtpError('Failed to add dependent. Please try again.');
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
            <Hand className="w-8 h-8 text-green-600" title="Volunteer Willingness" />
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Guardian Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Guardian Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="guardianName"
                      value={guardianName}
                      onChange={(e) => {
                        setGuardianName(e.target.value);
                        setErrors((prev) => ({ ...prev, guardianName: '' }));
                      }}
                      placeholder="Enter guardian's full name"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.guardianName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.guardianName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.guardianName}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">CNIC Number</label>
                  <div className="relative">
                    <MaskedInput
                      mask="11111-1111111-1"
                      name="cnicNumber"
                      value={cnicNumber}
                      onChange={handleCnicChange}
                      placeholder="12345-1234567-1"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.cnicNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.cnicNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.cnicNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        setErrors((prev) => ({ ...prev, gender: '' }));
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 ${
                        errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Dependent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dependent First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dependentFirstName"
                      value={dependentFirstName}
                      onChange={(e) => {
                        setDependentFirstName(e.target.value);
                        setErrors((prev) => ({ ...prev, dependentFirstName: '' }));
                      }}
                      placeholder="Enter first name"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.dependentFirstName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dependentFirstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.dependentFirstName}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dependent Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dependentLastName"
                      value={dependentLastName}
                      onChange={(e) => {
                        setDependentLastName(e.target.value);
                        setErrors((prev) => ({ ...prev, dependentLastName: '' }));
                      }}
                      placeholder="Enter last name"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.dependentLastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dependentLastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.dependentLastName}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dependent Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dependentUsername"
                      value={dependentUsername}
                      onChange={(e) => {
                        setDependentUsername(e.target.value);
                        setErrors((prev) => ({ ...prev, dependentUsername: '' }));
                      }}
                      placeholder="Enter username"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.dependentUsername ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dependentUsername && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.dependentUsername}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dependent Relation</label>
                  <div className="relative">
                    <select
                      name="dependentRelation"
                      value={dependentRelation}
                      onChange={(e) => {
                        setDependentRelation(e.target.value);
                        setErrors((prev) => ({ ...prev, dependentRelation: '' }));
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 ${
                        errors.dependentRelation ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    >
                      <option value="">Select an option</option>
                      <option value="Child">Child</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dependentRelation && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.dependentRelation}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
                      }}
                      placeholder="Select date"
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                        errors.dateOfBirth ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="flex gap-3 items-center md:items-start">
                    <div className="w-28">
                      <div className="relative">
                        <select
                          name="countryCode"
                          value={countryCode}
                          onChange={(e) => {
                            setCountryCode(e.target.value);
                            setErrors((prev) => ({ ...prev, countryCode: '' }));
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 ${
                            errors.countryCode ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                          }`}
                        >
                          <option value="">Select</option>
                          <option value="92">+92</option>
                          <option value="1">+1</option>
                          <option value="44">+44</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.countryCode && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.countryCode}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder="03001234567"
                          autoComplete="off"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center ${
                            errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                          }`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={16} className="mr-1" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors((prev) => ({ ...prev, address: '' }));
                      }}
                      placeholder="123, Street ABC, NY, USA"
                      rows={3}
                      autoComplete="off"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 ${
                        errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                    <div className="absolute right-3 top-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                Profile Image
              </h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
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
                  {profileImage && (
                    <p className="text-green-600 text-sm mt-2 font-semibold">✓ {profileImage.name}</p>
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
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleOtpVerify}
        phoneNumber={`+${countryCode}${phoneNumber}`}
        error={otpError}
      />
    </div>
  );
};

export default AddDependent;
