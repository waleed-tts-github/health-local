import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check, AlertCircle } from 'lucide-react';
import logo from '../../assets/Group.png';
import { replace, useNavigate } from 'react-router-dom';

const PatientResetPassword = () => {
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    const newErrors = {};

    if (!passwords.current) {
      newErrors.current = 'Current password is required';
    }

    if (!passwords.new) {
      newErrors.new = 'New password is required';
    } else if (passwords.new.length < 8) {
      newErrors.new = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwords.new)) {
      newErrors.new = 'Password must contain uppercase, lowercase, and number';
    }

    if (!passwords.confirm) {
      newErrors.confirm = 'Please confirm your new password';
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    if (passwords.current === passwords.new) {
      newErrors.new = 'New password must be different from current password';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validatePasswords();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setShowSuccessPopup(true);
    }
  };

  const handleInputChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/(?=.*[a-z])/.test(password)) strength += 1;
    if (/(?=.*[A-Z])/.test(password)) strength += 1;
    if (/(?=.*\d)/.test(password)) strength += 1;
    if (/(?=.*[@$!%*?&])/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate("/patient/login",{replace:true})
    // Navigate to login page
    console.log('Navigate to login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br font-poppins from-emerald-50 via-green-50 to-teal-50">
      {/* Left Section (Sidebar) */}
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

      {/* Right Section */}
      <div className="w-full md:w-5/6 flex items-start justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Change Password</h2>
            <p className="text-gray-600">Enter your current and new password</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            {/* Lock Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Lock size={32} className="text-green-600" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Current Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => handleInputChange('current', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 ${
                      errors.current ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.current && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.current}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => handleInputChange('new', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 ${
                      errors.new ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {passwords.new && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        getPasswordStrength(passwords.new) <= 2 ? 'text-red-500' :
                        getPasswordStrength(passwords.new) <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getStrengthText(getPasswordStrength(passwords.new))}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(passwords.new))}`}
                        style={{ width: `${(getPasswordStrength(passwords.new) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {errors.new && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.new}
                  </p>
                )}
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => handleInputChange('confirm', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 pr-12 ${
                      errors.confirm ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirm && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.confirm}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Updated!</h3>
              <p className="text-gray-600 mb-6">
                Your password has been successfully updated. You can now use your new password to sign in to your account.
              </p>
              
              <button
                onClick={closeSuccessPopup}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Continue to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientResetPassword;