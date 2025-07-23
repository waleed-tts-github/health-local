import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import logo from '../assets/Group.png';

const OTPPage = ({ role = 'patient' }) => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // Timer for OTP expiry
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);
    setError('');
    // Simulate API call to verify OTP
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
      // Assume OTP is valid; in a real app, verify with backend
      setIsSubmitting(false);
      setShowPopup(true);
    } catch (err) {
      setIsSubmitting(false);
      setError('Invalid OTP. Please try again or resend.');
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setError('');
    // Simulate API call to resend OTP
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimer(300); // Reset timer
    setIsSubmitting(false);
  };

  const handleBackToLogin = () => {
    // Navigate back to login (implement navigation logic, e.g., react-router)
    console.log('Navigate to login');
  };

  const handleContinue = () => {
    // Redirect based on role (implement navigation logic, e.g., react-router)
    console.log(`Navigate to ${role}/dashboard`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
      <div className="w-full md:w-5/6 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-gray-600 hover:text-green-600 mb-8 transition duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Login
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h2>
            <p className="text-gray-600">
              Enter the 6-digit code sent to your {role === 'patient' ? 'phone/email' : 'registered email'}.
            </p>
            <p className="text-gray-500 text-sm mt-2">Code expires in {formatTime(timer)}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            {/* Lock Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Lock size={32} className="text-green-600" />
              </div>
            </div>

            <div className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800 text-center tracking-widest"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={otp.length !== 6 || isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Verify OTP'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center text-sm text-gray-500">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResend}
                  disabled={isSubmitting}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all">
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">OTP Verified!</h3>
              <p className="text-gray-600 mb-6">
                Your OTP has been successfully verified. You can now proceed to your {role} dashboard.
              </p>

              <button
                onClick={handleContinue}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPPage;