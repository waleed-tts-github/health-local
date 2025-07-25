import React, { useState } from 'react';
import { Eye, EyeOff, User, Phone, Calendar, Camera, Shield, Edit2, X } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useNavigate } from 'react-router-dom';

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    photo: null,
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAgeErrorModal, setShowAgeErrorModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get today's date in YYYY-MM-DD format for max date restriction
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Calculate age based on date of birth
  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({
        ...prev,
        [name]: cleanedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 11 digits';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (calculateAge(formData.dateOfBirth) < 18) {
      setShowAgeErrorModal(true);
      newErrors.dateOfBirth = 'You must be at least 18 years old';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  // Close age error modal
  const closeAgeErrorModal = () => {
    setShowAgeErrorModal(false);
    setFormData(prev => ({ ...prev, dateOfBirth: '' }));
  };

  // Handle logo click
  const handleLogoClick = () => {
    navigate('/doctor');
  };

  return (
    <div className="flex font-poppins min-h-screen bg-gray-50">
      {/* Sidebar Section */}
      <div className="hidden md:block md:w-1/5 lg:w-1/6 bg-gradient-to-b from-green-600 to-green-700 rounded-sm h-[850px] z-10">
        <div className="p-6 border-b border-green-500">
          <div className="flex items-start gap-3 mb-6 relative">
            <button onClick={handleLogoClick} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm">
                <img 
                  src={logo} 
                  alt="Angill Healthcare Logo" 
                  className="w-8 h-8 object-contain"
                  style={{ 
                    filter: 'contrast(1.2) brightness(1.1)',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-white font-bold text-lg tracking-wide">ANGILL</h1>
                  <p className="text-green-100 text-[10px] font-medium tracking-wider pt-1">
                    Healthcare
                  </p>
                </div>
              </div>
            </button>
            <p className="text-green-100 italic font-light text-xs absolute left-0 bottom-[-35px]">
              Every Illness Deserves An Angel
            </p>
          </div>
          <h2 className="text-2xl font-bold text-white mt-[60px] leading-tight">
            Empowering<br />
            <span className="text-green-200">Healthcare</span>
          </h2>
          <p className="text-green-100 text-sm leading-relaxed">
            Join our mission to deliver exceptional care. Your expertise can transform lives with ANGILL's innovative platform.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-4/5 lg:w-5/6 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8 lg:p-10 relative">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Join as a Doctor</h3>
                <p className="text-gray-600 text-base sm:text-lg">Create your account to start making a difference</p>
              </div>

              {/* Age Error Modal */}
              {showAgeErrorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 w-11/12 max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-red-500">Age Restriction</h3>
                      <button onClick={closeAgeErrorModal} className="text-gray-500 hover:text-gray-900">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <p className="text-gray-700 text-base mb-6">
                      Doctors must be at least 18 years old to register.
                    </p>
                    <button
                      onClick={closeAgeErrorModal}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-base hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.firstName ? 'border-red-400' : ''
                        }`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.lastName ? 'border-red-400' : ''
                        }`}
                        placeholder="Enter your last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.phone ? 'border-red-400' : ''
                      }`}
                      placeholder="03001234567"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      max={getTodayDate()}
                      className={`w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 text-gray-900 shadow-sm hover:shadow-md ${
                        errors.dateOfBirth ? 'border-red-400' : ''
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 pr-12 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.password ? 'border-red-400' : ''
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-green-500 focus:outline-none transition-all duration-300 pr-12 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.confirmPassword ? 'border-red-400' : ''
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-green-50/50 shadow-sm hover:shadow-md">
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
                          src={URL.createObjectURL(formData.photo)}
                          alt="Profile Preview"
                          className="w-28 h-28 rounded-full object-cover mb-2 border-none"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center space-x-1 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-all duration-300">
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Photo</span>
                        </label>
                        <p className="text-green-600 text-sm mt-2 font-medium">✓ {formData.photo.name}</p>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-700 font-medium text-base">Upload your photo</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-green-600 font-medium hover:text-green-700">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Create Doctor Account
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ANGILL Clinic!</h2>
              <p className="text-lg text-gray-600 mb-6">Your doctor account has been successfully created</p>
              
              <div className="bg-gray-50 border border-green-200 rounded-lg p-5 mb-6 shadow-sm">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-medium text-green-800">Account Activated</h3>
                </div>
                <p className="text-green-700 text-base">
                  You now have access to manage appointments, patient records, and financial accounts through our secure platform.
                </p>
              </div>
              
              <button
                onClick={() => navigate('/doctor')}
                className="w-full bg-green-600 text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Access Your Dashboard
              </button>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-base">
              Already have an account?{' '}
              <a
                onClick={() => navigate('/doctor/login')}
                className="text-green-600 font-medium hover:text-green-700 transition-colors duration-200"
              >
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;