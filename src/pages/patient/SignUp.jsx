import React, { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, CreditCard, Camera, Heart, Check, Shield, Edit2, ChevronDown, ChevronUp, X, AlertCircle } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MaskedInput from 'react-maskedinput';

const PatientSignup = () => {
  const navigate = useNavigate();
  const { formData, setFormData, currentStep, setCurrentStep, setOTPContext, isVerified } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [bloodSectionExpanded, setBloodSectionExpanded] = useState(false);
  const [showAgeErrorModal, setShowAgeErrorModal] = useState(false);
  const [dateInput, setDateInput] = useState('');

  const steps = [
    { id: 1, title: 'Account Setup', description: 'Basic credentials', icon: User },
    { id: 2, title: 'Personal Info', description: 'Identity details', icon: CreditCard },
    { id: 3, title: 'Welcome', description: 'All set!', icon: Check }
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

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

  useEffect(() => {
    if (formData.dateOfBirth) {
      const timer = setTimeout(() => {
        const age = calculateAge(formData.dateOfBirth);
        setShowAgeErrorModal(age < 18);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowAgeErrorModal(false);
    }
  }, [formData.dateOfBirth]);

  const handleDateInputChange = (e) => {
    const value = e.target.value;
    setDateInput(value);

    if (value.length === 10) {
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        setErrors(prev => ({ ...prev, dateOfBirth: 'Invalid date format (DD/MM/YYYY)' }));
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
        return;
      }

      const [day, month, year] = value.split('/').map(Number);
      if (day < 1 || day > 31) {
        setErrors(prev => ({ ...prev, dateOfBirth: 'Day must be between 01 and 31' }));
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
        return;
      }
      if (month < 1 || month > 12) {
        setErrors(prev => ({ ...prev, dateOfBirth: 'Month must be between 01 and 12' }));
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
        return;
      }
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date <= new Date()
      ) {
        setFormData(prev => ({
          ...prev,
          dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        }));
        setErrors(prev => ({ ...prev, dateOfBirth: '' }));
      } else {
        setErrors(prev => ({ ...prev, dateOfBirth: 'Invalid date' }));
        setFormData(prev => ({ ...prev, dateOfBirth: '' }));
      }
    } else {
      setErrors(prev => ({ ...prev, dateOfBirth: '' }));
      setFormData(prev => ({ ...prev, dateOfBirth: '' }));
    }
  };

  const handleDatePickerChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      dateOfBirth: value
    }));
    if (value) {
      const [year, month, day] = value.split('-').map(Number);
      setDateInput(`${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`);
      setErrors(prev => ({ ...prev, dateOfBirth: '' }));
    } else {
      setDateInput('');
      setErrors(prev => ({ ...prev, dateOfBirth: 'Date of birth is required' }));
    }
  };

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
      if (formData.bloodVolunteer && !formData.bloodGroup) {
        newErrors.bloodGroup = 'Blood group is required for volunteers';
      }
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
    setFormData(prev => ({ ...prev, dateOfBirth: '' }));
    setDateInput('');
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-red-600">Age Restriction</h3>
                  <button onClick={closeAgeErrorModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mb-6">
                  If you are under 18 years of age, please have your parent or legal guardian register you as a dependent.
                </p>
                <button
                  onClick={closeAgeErrorModal}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Form Container */}
          {currentStep === 1 && (
            <div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        Enter your first name
                      </span>
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        Enter your last name
                      </span>
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                        errors.username ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                      placeholder=" "
                    />
                    <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                      Enter your username
                    </span>
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                      placeholder=" "
                    />
                    <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                      Enter your email address
                    </span>
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray- Icelandic-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        Create a strong password
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        Confirm your password
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isVerified) {
                      setCurrentStep(2);
                    } else {
                      setOTPContext("Sign Up");
                      navigate("/verify-otp");
                    }
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {isVerified ? "Continue To Personal Details" : "Verify Email"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className=" MATLAB  w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600 text-sm">Complete your profile to get personalized care</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                    <div className="relative">
                      <span className="absolute -top-2 left-4 text-sm text-green-600 bg-white px-1 z-10">
                        DD/MM/YYYY
                      </span>
                      <MaskedInput
                        mask="11/11/1111"
                        name="dateInput"
                        value={dateInput}
                        onChange={handleDateInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.dateOfBirth ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleDatePickerChange}
                        max={getTodayDate()}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 w-8 cursor-pointer"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">CNIC Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cNIC"
                        value={formData.cNIC}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.cNIC ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        34604-0515319-5
                      </span>
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {errors.cNIC && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.cNIC}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                        placeholder=" "
                      />
                      <span className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-600 peer-focus:bg-white peer-focus:px-1">
                        03001234567
                      </span>
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                          errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      >
                        <option value="" disabled hidden>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo</label>
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
                        <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center space-x-1 bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition duration-200">
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Photo</span>
                        </label>
                        <p className="text-green-600 text-sm mt-2 font-semibold">✓ {formData.photo.name}</p>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Camera className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-gray-700 font-semibold text-base">Upload your photo</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>
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
                          <label className="block text-sm font-bold text-gray-700 mb-2">Blood Group</label>
                          <div className="relative">
                            <select
                              name="bloodGroup"
                              value={formData.bloodGroup}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 peer ${
                                errors.bloodGroup ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                              }`}
                            >
                              <option value="" disabled hidden>Select Blood Group</option>
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
                          {errors.bloodGroup && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle size={16} className="mr-1" />
                              {errors.bloodGroup}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold transition duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
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
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
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