import React from 'react';
import { Heart, User, Shield, LogOut, ArrowLeft, X, Check, ChevronRight, Plus } from 'lucide-react';
import consultationBg from '../../assets/consultationpagebg.png';
import AddDependent from '../../components/patient/AddDependent';
import HealthComplaint from '../../components/patient/HealthComplaint';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const Landing = () => {
  const {
    currentStep,
    selectedService,
    handleServiceSelect,
    handleConsultationClick,
    resetFlow,
    goBack,
    handleAddDependentClick,
    handleDependentSelect,
  } = useConsultationFlow();

  // Step 1: Service Selection
  const ServiceSelection = () => (
    <div className="min-h-screen bg-white p-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-6 rounded-2xl mb-8 relative z-10 backdrop-blur-md border border-green-500/20">
        <div className="absolute -inset-2 bg-green-500/5 rounded-2xl animate-pulse-slow"></div>
        <h1 className="text-2xl font-extrabold tracking-tight">Find Your Best Specialists & Best Clinics</h1>
        <p className="text-xs font-medium text-teal-100">Top-tier treatment from Pakistan's finest, available now.</p>
      </div>

      {/* Welcome Section */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl mb-8 flex items-center justify-between border border-green-100/50 hover:shadow-xl transition-all duration-300">
        <div>
          <h2 className="text-xl font-bold text-green-700">Welcome, Niaz Ahmed</h2>
          <p className="text-xs text-gray-600 font-light">We strive to connect you with highly skilled medical professionals.</p>
        </div>
        <button className="p-2 bg-green-100/80 text-green-700 rounded-full hover:bg-green-200/80 transition-all duration-300 transform hover:scale-110 shadow-md">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Service Selection */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Choose Your Service</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Angill Doctors */}
        <div 
          onClick={() => handleServiceSelect('angill')}
          className="bg-gradient-to-br from-green-500/80 to-teal-500/80 p-6 rounded-xl text-white cursor-pointer hover:from-green-600/90 hover:to-teal-600/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-green-300/20 backdrop-blur-sm"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse-slow">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-base font-semibold text-center">Angill Doctors</h4>
          <p className="text-xs text-center text-teal-100 font-light">Fixed consultation fees</p>
        </div>

        {/* Private Doctors */}
        <div 
          onClick={() => handleServiceSelect('private')}
          className="bg-gradient-to-br from-blue-800/80 to-blue-600/80 p-6 rounded-xl text-white cursor-pointer hover:from-blue-900/90 hover:to-blue-700/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-blue-200/20 backdrop-blur-sm"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse-slow delay-500">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-base font-semibold text-center">Private Doctors</h4>
          <p className="text-xs text-center text-cyan-100 font-light">Flexible consultation fees</p>
        </div>

        {/* Angill Cyber Clinics */}
        <div 
          onClick={() => handleServiceSelect('cyber')}
          className="bg-gradient-to-br from-green-700/80 to-teal-700/80 p-6 rounded-xl text-white cursor-pointer hover:from-green-800/90 hover:to-teal-800/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-green-300/20 backdrop-blur-sm"
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse-slow delay-1000">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-base font-semibold text-center">Angill Cyber Clinics</h4>
          <p className="text-xs text-center text-teal-100 font-light">No wait, verified experts, extended hours</p>
        </div>
      </div>
    </div>
  );

  // Step 2: Consultation Details
  const ConsultationDetails = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-start">
        <button 
          onClick={goBack}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Title Section */}
        <div className="bg-white p-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-12 h-12 ${selectedService === 'private' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
              <Heart className={`w-6 h-6 ${selectedService === 'private' ? 'text-blue-600' : 'text-green-600'}`} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedService === 'angill' ? 'Angill Doctors' : selectedService === 'private' ? 'Private Doctors' : 'Angill Cyber Clinics'}
          </h1>
          <p className="text-gray-600">
            {selectedService === 'private' 
              ? 'Choose an approved private doctor of your choice from anywhere in Pakistan. Consultation fees may vary based on the doctor\'s qualifications and expertise' 
              : 'Our verified board of general practitioners and specialist doctors offer medical consultations at a fixed, transparent price.'}
          </p>
        </div>

        {/* Consultation Section */}
        <div 
          className="flex-1 relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-96"
          style={{ 
            backgroundImage: `url(${consultationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Proceed For</h2>
              <h3 className="text-sm font-thin text-white/30 tracking-[0.3em]">Emergency</h3>
            </div>
            <button 
              onClick={handleConsultationClick}
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 rounded-lg font-medium text-lg transition-colors shadow-lg"
            >
              Consultation
            </button>
            <div className="mt-6 text-sm text-gray-200">
              <p>In the event of a life-threatening situation,</p>
              <p>please contact the nearest hospital.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Patient Selection (Redesigned as a Full Page)
  const PatientSelection = () => (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-start">
        <button 
          onClick={goBack}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-green-700">
              {selectedService === 'angill' ? 'Angill Doctors' : selectedService === 'private' ? 'Private Doctors' : 'Angill Cyber Clinics'}
            </h1>
            <p className="text-gray-600 text-base mt-2">Select who needs medical assistance</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-green-100/50 hover:shadow-xl transition-all duration-300">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Who Needs Help?</h2>
            <div className="space-y-4">
              <div 
                onClick={() => handleDependentSelect('Niaz Zardari')}
                className="bg-gradient-to-r from-green-500/80 to-teal-500/80 p-4 rounded-xl text-white cursor-pointer hover:from-green-600/90 hover:to-teal-600/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-base">Niaz Zardari</span>
                  </div>
                  <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="text-center py-3">
                <span className="text-base font-bold text-gray-400">OR</span>
              </div>

              <div className="bg-white/50 p-4 rounded-xl transition-colors duration-300 border border-green-100/30 backdrop-blur-sm">
                <div className="flex items-center justify-between cursor-pointer mb-4">
                  <span className="font-medium text-base text-green-700">Dependents</span>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div 
                    onClick={() => handleDependentSelect('Ali Zardari')}
                    className="flex items-center p-3 bg-green-50/50 rounded-lg hover:bg-green-100/50 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-base text-gray-700">Ali Zardari</span>
                  </div>
                  <div 
                    onClick={() => handleDependentSelect('Sara Zardari')}
                    className="flex items-center p-3 bg-green-50/50 rounded-lg hover:bg-green-100/50 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-base text-gray-700">Sara Zardari</span>
                  </div>
                  <button 
                    onClick={handleAddDependentClick}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-lg font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Dependent
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-3 mt-6">
              <p className="text-red-600 text-sm font-light">*Add children under 18 and dependents</p>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={resetFlow}
                className="flex-1 bg-green-100/80 hover:bg-green-200/80 text-green-700 py-3 rounded-xl font-medium text-base transition-colors duration-300 shadow-md hover:shadow-md"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDependentSelect('Niaz Zardari')}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-xl font-medium text-base transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Add Dependent Page
  const AddDependentPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-start">
        <button 
          onClick={goBack}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-lg font-bold text-green-700 mb-6">Add Dependent</h2>
          <AddDependent />
        </div>
      </div>
    </div>
  );

  // Step 5: Health Complaint Page
  const HealthComplaintPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-start">
        <button 
          onClick={goBack}
          className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-lg font-bold text-green-700 mb-6">Health Complaint</h2>
          <HealthComplaint />
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-poppins text-lg antialiased">
      {currentStep === 1 && <ServiceSelection />}
      {currentStep === 2 && <ConsultationDetails />}
      {currentStep === 3 && <PatientSelection />}
      {currentStep === 4 && <AddDependentPage />}
      {currentStep === 5 && <HealthComplaintPage />}
    </div>
  );
};

export default Landing;