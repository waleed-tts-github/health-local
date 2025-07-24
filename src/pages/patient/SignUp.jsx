import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, CreditCard, Camera, Heart, Check, Shield, Edit2, ChevronDown, ChevronUp, X } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useNavigate } from 'react-router-dom';

const PatientSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    cNIC: '',
    phone: '',
    gender: '',
    bloodVolunteer: false,
    bloodGroup: '',
    photo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [bloodSectionExpanded, setBloodSectionExpanded] = useState(false);
  const [showAgeErrorModal, setShowAgeErrorModal] = useState(false);

  const steps = [
    { id: 1, title: 'Account Setup', description: 'Basic credentials', icon: User },
    { id: 2, title: 'Personal Info', description: 'Identity details', icon: CreditCard },
    { id: 3, title: 'Welcome', description: 'All set!', icon: Check }
  ];

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

  // Effect to check age whenever dateOfBirth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = calculateAge(formData.dateOfBirth);
      setShowAgeErrorModal(age < 18);
    } else {
      setShowAgeErrorModal(false);
    }
  }, [formData.dateOfBirth]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({
        ...prev,
        [name]: cleanedValue
      }));
    } else if (name === 'cNIC') {
      let cleanedValue = value.replace(/[^0-9-]/g, '');
      if (cleanedValue.length > 5 && cleanedValue[5] !== '-') {
        cleanedValue = cleanedValue.slice(0, 5) + '-' + cleanedValue.slice(5);
      }
      if (cleanedValue.length > 13 && cleanedValue[13] !== '-') {
        cleanedValue = cleanedValue.slice(0, 13) + '-' + cleanedValue.slice(13);
      }
      cleanedValue = cleanedValue.slice(0, 15);
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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
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
    } else if (step === 2) {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      }
      if (!formData.cNIC) {
        newErrors.cNIC = 'CNIC is required';
      } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cNIC)) {
        newErrors.cNIC = 'CNIC must be in the format 12345-1234567-1';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{11}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be exactly 11 digits';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateStep(2) && !showAgeErrorModal) {
      setCurrentStep(3);
      console.log('Form submitted:', formData);
    }
  };

  const closeAgeErrorModal = () => {
    setShowAgeErrorModal(false);
    setFormData(prev => ({ ...prev, dateOfBirth: '' })); // Reset date of birth
  };

  return (
    <div className="min-h-screen bg-gradient-to-br font-poppins from-emerald-50 via-green-50 to-teal-50 flex">
      {/* Sidebar Section (Left ~16%) */}
      <div className="hidden md:block w-full md:w-1/6 bg-gradient-to-br from-emerald-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col h-full p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-13 h-13 flex items-center justify-center rounded-full p-2">
              <img src={logo} alt="ANGILL Logo" />
            </div>
            <div className="mt-2 text-center">
              <h1 className="text-xl font-bold text-white">ANGILL</h1>
            </div>
            <p className="text-white italic font-light text-xs" style={{ color: '#FFFFFF' }}>
              Every illness deserves an angel.
            </p>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
            Your Health,<br />
            <span className="text-emerald-200">Our Priority</span>
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Expert care right to your side, when and where you need it most. From everyday checkups to urgent help, ANGILL is here to heal, support and guide you as an angel would.
          </p>
        </div>
      </div>

      {/* Form Section (Right ~84%) */}
      <div className="w-full md:w-5/6 flex items-start justify-center py-6 px-4 mt-[-10px] relative">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 relative">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h3>
            <p className="text-gray-600 text-base">Join our healthcare in just a few steps</p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-2 shadow-md border border-gray-100">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm' 
                        : 'text-gray-500'
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        currentStep > step.id 
                          ? 'bg-white text-emerald-600' 
                          : currentStep === step.id 
                          ? 'bg-white text-emerald-600' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <IconComponent className="w-4 h-4" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <p className="font-semibold text-sm">{step.title}</p>
                        <p className="text-xs opacity-75">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-6 h-0.5 ${
                        currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-300'
                      } transition-all duration-300`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Age Error Modal */}
          {showAgeErrorModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-red-200 w-11/12 sm:w-96 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-red-600">Age Restriction</h3>
                  <button onClick={closeAgeErrorModal} className="text-gray-500 hover:text-gray-900">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
                  If you are under 18 years of age, please have your parent or legal guardian register you as a dependent.
                </p>
                <button
                  onClick={closeAgeErrorModal}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full font-bold text-sm sm:text-base hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Form Container */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Setup</h2>
                <p className="text-gray-600 text-sm">Create your secure healthcare account</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.firstName ? 'border-red-400' : ''
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.lastName ? 'border-red-400' : ''
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 block">Username</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.username ? 'border-red-400' : ''
                      }`}
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.email ? 'border-red-400' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 pr-12 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.password ? 'border-red-400' : ''
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 pr-12 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.confirmPassword ? 'border-red-400' : ''
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-full font-bold text-base hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  Continue to Personal Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600 text-sm">Complete your profile to get personalized care</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        max={getTodayDate()}
                        className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 shadow-sm hover:shadow-md ${
                          errors.dateOfBirth ? 'border-red-400' : ''
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">CNIC Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="cNIC"
                        value={formData.cNIC}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.cNIC ? 'border-red-400' : ''
                        }`}
                        placeholder="34604-0515319-5"
                      />
                    </div>
                    {errors.cNIC && <p className="text-red-500 text-xs mt-1">{errors.cNIC}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.phone ? 'border-red-400' : ''
                        }`}
                        placeholder="03001234567"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 block">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 shadow-sm hover:shadow-md ${
                        errors.gender ? 'border-red-400' : ''
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 block">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-3xl p-6 text-center hover:border-emerald-500 transition-all duration-300 bg-gray-50 hover:bg-emerald-50 shadow-sm hover:shadow-md">
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
                        <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center space-x-1 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all duration-300">
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Photo</span>
                        </label>
                        <p className="text-emerald-600 text-sm mt-2 font-bold">✓ {formData.photo.name}</p>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-700 font-bold text-base">Upload your photo</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>

                {/* Enhanced Blood Volunteer Section */}
                <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border-2 border-red-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                          <Heart className="w-7 h-7 text-white" fill="currentColor" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">Blood Donation Volunteer</h3>
                          <p className="text-gray-600 text-sm mt-1">Help save lives by becoming a blood donor</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setBloodSectionExpanded(!bloodSectionExpanded)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-100"
                        >
                          {bloodSectionExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="bloodVolunteer"
                            checked={formData.bloodVolunteer}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-[24px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-sm"></div>
                        </label>
                      </div>
                    </div>
                    
                    {/* Expandable Content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      bloodSectionExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-white bg-opacity-60 rounded-2xl p-4 space-y-3 backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div className="space-y-2">
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              Saving a life can be as simple as donating blood. It's an easy, selfless way to help your community.
                            </p>
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              Blood donation can benefit both your physical and emotional health according to The Mental Health Foundation.
                            </p>
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              Most people can donate whole blood every 56 days according to the American Red Cross.
                            </p>
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              Your temperature, blood pressure, pulse, and hemoglobin levels will be checked if you're eligible.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              The donation area will be cleaned and sterilized before a new sterile needle is inserted.
                            </p>
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              While your blood is being drawn, you can relax. Some blood centers show movies or have a television playing to keep you distracted.
                            </p>
                            <p className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              Once your blood has been drawn, a small bandage and dressing will be placed on your arm. You'll rest for about 15 minutes and be given a light snack or something to drink, and you'll then be free to go.
                            </p>
                          </div>
                        </div>
                        <p className="text-red-500 text-sm mt-2">*Minimum Age For Blood Volunteer Male: 18 - Female: 19</p>
                      </div>
                      {formData.bloodVolunteer && (
                        <div className="space-y-1 mt-4">
                          <label className="text-sm font-bold text-gray-700 block">Blood Group</label>
                          <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 shadow-sm hover:shadow-md"
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full font-bold text-base hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-full font-bold text-base hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                    disabled={showAgeErrorModal}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ANGILL Clinic!</h2>
              <p className="text-lg text-gray-600 mb-6">Your account has been successfully created</p>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-3xl p-5 mb-6 shadow-sm">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-emerald-800">Account Activated</h3>
                </div>
                <p className="text-emerald-700 text-base">
                  You now have access to all our healthcare services including consultations, 
                  medical records, and emergency care.
                </p>
              </div>
              
              <button
                onClick={() => window.location.href = '/patient'}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-8 rounded-full font-bold text-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
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
                onClick={() => navigate('/patient/login')}
                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors duration-200"
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

export default PatientSignup;