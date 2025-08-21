import React, { useContext, useState } from 'react';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import logo from '../assets/Group.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const {userType} = useContext(AuthContext)  
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  
    navigate("/verify-otp")
  };

  const handleBackToLogin = () => {
    // Navigate back to login - you can implement your navigation logic here
    if(userType=="patient")
    {
    navigate("/patient/login",{replace:true})

    }
    else{
    navigate("/doctor/sign-in",{replace:true})

    }
  };

  const closePopup = () => {
    setShowPopup(false);
    // Optionally navigate back to login after closing popup
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
         

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            {/* Mail Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-green-600" />
              </div>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!email || isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              {/* Help Text */}
              <div className="text-center text-sm text-gray-500">
                Remember your password?{' '}
                <button 
                  onClick={handleBackToLogin}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Sign In
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
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Email Sent!</h3>
              <p className="text-gray-600 mb-6">
                A reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={closePopup}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                  Got it!
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full text-gray-600 hover:text-green-600 font-medium py-2 transition duration-200"
                >
                  Resend Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;