import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

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
  const [OTPContext, setOTPContext] = useState("")
  const [isVerified,setIsVerified] = useState(false)
  const [userType,setUserType] = useState("")


  const [currentStep,setCurrentStep] = useState(1)

  return <AuthContext.Provider value={{currentStep,setCurrentStep,formData,setFormData,OTPContext,setOTPContext,isVerified,setIsVerified,userType,setUserType}}>{children}</AuthContext.Provider>;
};