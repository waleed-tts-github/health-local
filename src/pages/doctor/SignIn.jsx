import React, { useContext, useState } from 'react';
import { Eye, EyeOff, UserCircle } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const DoctorSignIn = () => {
  const {setUserType,setOTPContext} = useContext(AuthContext)  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            Your Expertise,<br />
            <span className="text-emerald-200">Our Mission</span>
          </h2>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Deliver expert care with ANGILL, connecting you to patients who need your skills most. From consultations to urgent care, we're here to support your practice.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-5/6 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Login as a Doctor</h2>
            <p className="text-gray-600">Sign in by entering the information below</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            {/* Profile Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center">
                <UserCircle />
              </div>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800 font-medium"
                  placeholder="Email"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 text-gray-800 pr-12"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <button
                  onClick={() => {
                    setUserType("doctor")
                    setOTPContext("ForgotPassword");
                    navigate("/forgot-password");
                  }}
                  className="text-sm text-gray-600 hover:text-green-600"
                  aria-label="Forgot Password"
                >
                  Forget Password
                </button>
              </div>

              {/* Terms and Privacy */}
              <div className="text-center text-sm text-gray-600">
                By proceeding you agree to the{' '}
                <button className="text-blue-600 hover:underline" aria-label="View terms of services">
                  terms of services
                </button>
                {' '}&{' '}
                <button className="text-blue-600 hover:underline" aria-label="View privacy policy">
                  privacy policy
                </button>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                onClick={() => navigate("/doctor")}
                aria-label="Login as Doctor"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-gray-600">Need An Account? </span>
                <button
                  onClick={() => navigate("/doctor/sign-up")}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                  aria-label="Sign up as Doctor"
                >
                  Sign Up
                </button>
              </div>

              {/* Social Login (Commented Out) */}
              {/* <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition duration-200"
                  aria-label="Login with Facebook"
                >
                  <span className="font-bold">f</span>
                </button>
                <button
                  className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition duration-200"
                  aria-label="Login with Google"
                >
                  <span className="font-bold">G</span>
                </button>
                <button
                  className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition duration-200"
                  aria-label="Login with Apple"
                >
                  <span className="font-bold">🍎</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignIn;