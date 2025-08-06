import React, { useState } from 'react';
import { User, Mail, Calendar, CreditCard, Phone, Camera, Heart, Lock } from 'lucide-react';
import BackButton from '../../components/BackButton';

const PatientEditProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState(null);
  const [bloodVolunteer, setBloodVolunteer] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BackButton />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-emerald-100 rounded-full mx-auto mb-4 sm:mb-6">
            <User className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600" />
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Edit Profile</h2>

          {/* Tabs */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex flex-wrap space-x-2 sm:space-x-4 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'profile' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-black'
                }`}
                aria-label="Edit Profile Information"
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 ${
                  activeTab === 'password' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-black'
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
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">CNIC Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      placeholder="CNIC number"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsGenderOpen(!isGenderOpen)}
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                      aria-label="Select Gender"
                    >
                      <span className={gender ? 'text-gray-800' : 'text-gray-500'}>
                        {gender || 'Select an option'}
                      </span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isGenderOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                    {isGenderOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {genderOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setGender(option);
                              setIsGenderOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 text-center hover:border-emerald-500 transition-all duration-200 bg-white hover:bg-green-50 shadow-sm hover:shadow-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    {photo ? (
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
                        <p className="text-emerald-600 text-xs sm:text-sm mt-2 font-bold">✓ {photo.name}</p>
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
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-3 sm:p-5 hover:shadow-md transition-all duration-200">
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
                      checked={bloodVolunteer}
                      onChange={(e) => setBloodVolunteer(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-[16px] sm:peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => console.log('Profile updated:', { firstName, lastName, username, email, dateOfBirth, cnic, phone, gender, photo, bloodVolunteer })}
                  className="w-full bg-green-500 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
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
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-10 h-12 flex items-center border-gray-200 focus:border-green-500 pl-9"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => console.log('Password updated:', { password, confirmPassword })}
                  className="w-full bg-green-500 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
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