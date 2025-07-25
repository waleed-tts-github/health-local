import React, { useState } from 'react';
import { User, Camera, Shield, Book, Hospital, ChevronDown, Lock, Check, Plus, ArrowLeft } from 'lucide-react';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    cnic: '12345-6789012-3',
    photo: null,
    pmdcReg: 'PMC-12345',
    issueDate: '2023-07-25',
    expiryDate: '2028-07-25',
    degrees: [{ title: '', file: null }],
    experience: '',
    hospitalAffiliation: '',
    professionalCategory: '',
    specialty: '',
    preferredLanguage: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (index !== undefined) {
      const newDegrees = [...formData.degrees];
      newDegrees[index] = {
        ...newDegrees[index],
        [name]: type === 'checkbox' ? checked : value,
      };
      setFormData((prev) => ({ ...prev, degrees: newDegrees }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newDegrees = [...formData.degrees];
      newDegrees[index] = { ...newDegrees[index], file };
      setFormData((prev) => ({ ...prev, degrees: newDegrees }));
      setErrors((prev) => ({ ...prev, [`degreeFile${index}`]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const addDegreeField = () => {
    setFormData((prev) => ({
      ...prev,
      degrees: [...prev.degrees, { title: '', file: null }],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Profile completed:', formData);
      // navigate('/doctor/dashboard');
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gray-50  py-4 px-3 sm:py-6 sm:px-4 lg:px-8">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Complete Your Profile
          </h2>

          <div className="space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-500" /> Personal Information
              </h3>
              
              {/* Mobile: Stack all fields vertically, Desktop: Use grid */}
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 appearance-none bg-white transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">CNIC</label>
                  <input
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">PMDC Registration</label>
                  <input
                    type="text"
                    name="pmdcReg"
                    value={formData.pmdcReg}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Expiry/Renewal Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                  />
                </div>
              </div>
              
              {/* Profile Photo - Full width on mobile */}
              <div className="mt-6 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0">
                    {formData.photo ? (
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <label className="cursor-pointer bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors text-center block sm:inline-block">
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Professional Academics Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-green-500" /> Professional Academics
              </h3>
              
              <div className="space-y-6">
                {formData.degrees.map((degree, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Degree Title {index + 1}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={degree.title}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                        placeholder="e.g., MBBS"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Upload Degree Certificate</label>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="w-full sm:w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                          {degree.file ? (
                            <div className="text-center p-2">
                              <span className="text-xs text-gray-700 break-all">{degree.file.name}</span>
                            </div>
                          ) : (
                            <Camera className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <label className="cursor-pointer bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors text-center block sm:inline-block">
                          Upload PDF
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, index)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addDegreeField}
                  className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" /> Add Another Degree
                </button>
              </div>
            </div>

            {/* Experience & Affiliations Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Hospital className="w-5 h-5 mr-2 text-green-500" /> Experience & Affiliations
              </h3>
              
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                    placeholder="e.g., 5"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Hospital Affiliation</label>
                  <input
                    type="text"
                    name="hospitalAffiliation"
                    value={formData.hospitalAffiliation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                    placeholder="e.g., City Hospital"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Professional Category</label>
                  <div className="relative">
                    <select
                      name="professionalCategory"
                      value={formData.professionalCategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 appearance-none bg-white transition-colors"
                    >
                      <option value="">Select Category</option>
                      <option value="General Practitioner">General Practitioner</option>
                      <option value="Specialist">Specialist</option>
                      <option value="Surgeon">Surgeon</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Specialty</label>
                  <div className="relative">
                    <select
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 appearance-none bg-white transition-colors"
                    >
                      <option value="">Select Specialty</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                  <div className="relative">
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 appearance-none bg-white transition-colors"
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Punjabi">Punjabi</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-500" /> Security
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                    placeholder="Create a strong password"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-900 transition-colors"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                
                <div className="flex items-start space-x-3 py-2">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-green-500 border-gray-300 rounded focus:outline-none focus:border-green-500 mt-0.5 flex-shrink-0"
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    I agree to the{' '}
                    <a href="/terms" className="text-green-500 font-medium hover:text-green-600 underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg mt-6"
                >
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;