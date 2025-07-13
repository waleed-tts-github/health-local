import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, CreditCard, Camera, Heart, Check, Shield, Edit2 } from 'lucide-react';

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    cnic: '',
    phone: '',
    gender: '',
    bloodVolunteer: false,
    photo: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Account Setup', description: 'Basic credentials', icon: User },
    { id: 2, title: 'Personal Info', description: 'Identity details', icon: CreditCard },
    { id: 3, title: 'Welcome', description: 'All set!', icon: Check }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      // Allow only digits and limit to 11 characters
      const cleanedValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData(prev => ({
        ...prev,
        [name]: cleanedValue
      }));
    } else if (name === 'cnic') {
      // Allow digits and hyphens, format as 5-7-1
      let cleanedValue = value.replace(/[^0-9-]/g, '');
      if (cleanedValue.length > 5 && cleanedValue[5] !== '-') {
        cleanedValue = cleanedValue.slice(0, 5) + '-' + cleanedValue.slice(5);
      }
      if (cleanedValue.length > 13 && cleanedValue[13] !== '-') {
        cleanedValue = cleanedValue.slice(0, 13) + '-' + cleanedValue.slice(13);
      }
      cleanedValue = cleanedValue.slice(0, 15); // Limit to 14 characters (5+1+7+1)
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
    // Clear error for the field being edited
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
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.cnic) {
        newErrors.cnic = 'CNIC is required';
      } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
        newErrors.cnic = 'CNIC must be in the format 12345-1234567-1';
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
    setErrors({}); // Clear errors when going back
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      setCurrentStep(3);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex">
      {/* Sidebar Section (Left 20%) */}
      <div className="hidden md:block w-1/5 bg-gradient-to-br from-emerald-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col h-full p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ANGILL</h1>
              <p className="text-emerald-100 text-xs">Every illness deserves an angel</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
            Your Health,<br />
            <span className="text-emerald-200">Our Priority</span>
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Expert care right to your side, when and where you need it most. From everyday checkups to urgent help, ANGILL is here to heal, support and guide you as an angil would.
          </p>
        </div>
      </div>

      {/* Form Section (Right 80%) */}
      <div className="w-full md:w-4/5 flex items-start justify-center py-6 px-3 mt-[-10px]">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h3>
            <p className="text-gray-600 text-base">Join our healthcare community in just a few steps</p>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1.5 shadow-md border border-gray-100">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      currentStep >= step.id 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm' 
                        : 'text-gray-500'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        currentStep > step.id 
                          ? 'bg-white text-emerald-600' 
                          : currentStep === step.id 
                          ? 'bg-white text-emerald-600' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {currentStep > step.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <IconComponent className="w-3 h-3" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <p className="font-semibold text-xs">{step.title}</p>
                        <p className="text-[10px] opacity-75">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-5 h-0.5 ${
                        currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-300'
                      } transition-all duration-300`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Container */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <User className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Account Setup</h2>
                <p className="text-gray-600 text-sm">Create your secure healthcare account</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">First Name</label>
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
                    <label className="text-xs font-bold text-gray-700 block">Last Name</label>
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
                  <label className="text-xs font-bold text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                        errors.email ? 'border-red-400' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 pr-11 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.password ? 'border-red-400' : ''
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 pr-11 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.confirmPassword ? 'border-red-400' : ''
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-3 text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600 text-sm">Complete your profile to get personalized care</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 shadow-sm hover:shadow-md ${
                          errors.dateOfBirth ? 'border-red-400' : ''
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">CNIC Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.cnic ? 'border-red-400' : ''
                        }`}
                        placeholder="34604-0515319-5"
                      />
                    </div>
                    {errors.cnic && <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:bg-white focus:border-emerald-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md ${
                          errors.phone ? 'border-red-400' : ''
                        }`}
                        placeholder="03001234567"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Gender</label>
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
                  <label className="text-xs font-bold text-gray-700 block">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-3xl p-5 text-center hover:border-emerald-500 transition-all duration-300 bg-gray-50 hover:bg-emerald-50 shadow-sm hover:shadow-md">
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
                          className="w-24 h-24 rounded-full object-cover mb-2 border-none"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center space-x-1 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-emerald-700 transition-all duration-300">
                          <Edit2 className="w-4 h-4" />
                          <span>Edit Photo</span>
                        </label>
                        <p className="text-emerald-600 text-xs mt-2 font-bold">✓ {formData.photo.name}</p>
                      </div>
                    ) : (
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-gray-700 font-bold text-sm">Upload your photo</p>
                        <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-900">Blood Volunteer</h3>
                        <p className="text-gray-600 text-xs mt-1">Help save lives in your community</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="bloodVolunteer"
                        checked={formData.bloodVolunteer}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-5 rounded-full font-bold text-sm hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-5 rounded-full font-bold text-sm hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
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
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ANGILL Clinic!</h2>
              <p className="text-base text-gray-600 mb-4">Your account has been successfully created</p>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-3xl p-4 mb-4 shadow-sm">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-emerald-800">Account Activated</h3>
                </div>
                <p className="text-emerald-700 text-sm">
                  You now have access to all our healthcare services including consultations, 
                  medical records, and emergency care.
                </p>
              </div>
              
              <button
                onClick={() => window.location.href = '/patient'}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-full font-bold text-base hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                Access Your Dashboard
              </button>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a
                href="/login"
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