import React, { useState, useEffect } from 'react';
import { Heart, User, Shield, LogOut, ArrowLeft, Check, Plus, Search, MapPin, Star, Calendar } from 'lucide-react';
import consultationBg from '../../assets/consultationpagebg.png';
import AddDependent from '../../components/patient/AddDependent';
import HealthComplaint from '../../components/patient/HealthComplaint';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import ScheduledAppointments from '../../components/patient/ScheduledAppointments';

const Landing = () => {
  const {
    currentStep,
    selectedService,
    handleShowCyberClinics,
    handleServiceSelect,
    handleShowHealthComplaint,
    handleConsultationClick,
    resetFlow,
    goBack,
    handleAddDependentClick,
    handleDependentSelect,
  } = useConsultationFlow();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Preload the consultation background image
  useEffect(() => {
    const img = new Image();
    img.src = consultationBg;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true); // Fallback in case of error
  }, []);

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
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Today's Appointments</span>
          </button>
          <button className="p-2 bg-green-100/80 text-green-700 rounded-full hover:bg-green-200/80 transition-all duration-300 transform hover:scale-110 shadow-md">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
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
          onClick={handleShowCyberClinics}
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

      {/* Scheduled Appointments Modal */}
      <ScheduledAppointments open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );

  // Step 2: Consultation Details
  const ConsultationDetails = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center h-[48px]">
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Title Section */}
        <div className="bg-white p-4 text-center max-w-4xl mx-auto">
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
          className={`flex-1 relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-96 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: isImageLoaded ? `url(${consultationBg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          )}
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

  // Step 3: Patient Selection
  const PatientSelection = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-green-700">
              {selectedService === 'angill' ? 'Angill Doctors' : selectedService === 'private' ? 'Private Doctors' : 'Angill Cyber Clinics'}
            </h1>
            <p className="text-gray-600 text-xs mt-1">
              {selectedService === 'private' ? 'Price varies' : 'Fixed price'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Who Needs Help?
            </h2>
            <p className="text-gray-600 text-sm">
              Tell me who needs our doctor's help, you or other dependents.
            </p>
          </div>

          <div className="space-y-4">
            {/* Me Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Me</h3>
              <div 
                onClick={() => {
                  setSelectedPatient('Thomas K.');
                  handleDependentSelect('Thomas K.');
                }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-900 font-medium">Thomas K.</span>
                </div>
                <div className={`w-5 h-5 rounded border-2 ${selectedPatient === 'Thomas K.' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                  {selectedPatient === 'Thomas K.' && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>

            {/* Dependents Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Dependents</h3>
                <button 
                  onClick={() => handleAddDependentClick()}
                  className="p-1 hover:bg-gray-100 rounded mr-[9px]"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div 
                  onClick={() => {
                    setSelectedPatient('Karl K.');
                    handleDependentSelect('Karl K.');
                  }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">Karl K.</div>
                      <div className="text-xs text-gray-500">Depends on you</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 ${selectedPatient === 'Karl K.' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                    {selectedPatient === 'Karl K.' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setSelectedPatient('Rannie K.');
                    handleDependentSelect('Rannie K.');
                  }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">Rannie K.</div>
                      <div className="text-xs text-gray-500">Depends on you</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 ${selectedPatient === 'Rannie K.' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                    {selectedPatient === 'Rannie K.' && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50/80 border border-red-200/50 rounded-lg p-3">
              <p className="text-red-600 text-xs font-light">*Add children under 18 and dependents</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Security Notice */}
      <div className="fixed bottom-4 right-4">
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-600">All your data will be encrypted</span>
        </div>
      </div>
    </div>
  );

  // Step 4: Add Dependent Page
  const AddDependentPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-green-700">Add Dependent</h1>
            <p className="text-gray-600 text-xs mt-1">Add a new dependent for medical consultations</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        <div className="max-w-4xl mx-auto w-full">
          <AddDependent />
        </div>
      </div>
    </div>
  );

  // Step 5: Health Complaint Page
  const HealthComplaintPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-green-700">Health Complaint</h1>
            <p className="text-gray-600 text-xs mt-1">Provide your health details</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8">
        <div className="max-w-4xl mx-auto w-full">
          <HealthComplaint />
        </div>
      </div>
    </div>
  );

  // Step 6: Cyber Clinics Map Page
  const CyberClinicsPage = () => {
    // Mock clinic data
    const clinics = [
      {
        id: 1,
        name: "George Cyber Angill Clinic",
        rating: 4.9,
        reviews: 48,
        hours: "Open 24 Hours",
        position: { top: '45%', left: '55%' }
      },
      {
        id: 2,
        name: "Central Angill Clinic",
        rating: 4.8,
        reviews: 32,
        hours: "Open 24 Hours",
        position: { top: '60%', left: '45%' }
      },
      {
        id: 3,
        name: "North Angill Clinic",
        rating: 4.7,
        reviews: 28,
        hours: "Open 24 Hours",
        position: { top: '35%', left: '65%' }
      },
      {
        id: 4,
        name: "East Angill Clinic",
        rating: 4.9,
        reviews: 55,
        hours: "Open 24 Hours",
        position: { top: '50%', left: '75%' }
      },
      {
        id: 5,
        name: "West Angill Clinic",
        rating: 4.6,
        reviews: 41,
        hours: "Open 24 Hours",
        position: { top: '70%', left: '35%' }
      }
    ];

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-4 mb-4">
          <div className="flex items-center max-w-6xl mx-auto relative">
            <button 
              onClick={goBack}
              className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-green-600" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-green-700">Angill Cyber Clinics</h1>
              <p className="text-gray-600 text-xs mt-1">Find the nearest cyber clinic to you</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Clinics Near Me"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 placeholder-gray-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-green-50 to-teal-50 rounded-xl h-96 overflow-hidden border border-green-100">
            {/* Background map pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
                <path d="M0 200L100 180L200 220L300 160L400 240L500 180L600 200L700 160L800 200V400H0V200Z" fill="#10b981" opacity="0.1"/>
                <path d="M0 100L150 120L300 80L450 140L600 100L800 120V400H0V100Z" fill="#0d9488" opacity="0.1"/>
              </svg>
            </div>
            
            {/* Map markers and clinic info */}
            {clinics.map((clinic) => (
              <div key={clinic.id}>
                {/* Map Pin */}
                <div 
                  className="absolute w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-700 transition-colors z-10"
                  style={clinic.position}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                
                {/* Clinic Info Card (show for featured clinic) */}
                {clinic.id === 1 && (
                  <div 
                    className="absolute bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-64 z-20"
                    style={{ top: '35%', left: '65%' }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{clinic.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{clinic.rating} ({clinic.reviews})</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">{clinic.hours}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Angill Logo in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Shield className="w-8 h-8 text-green-600" />
                  <span className="text-lg font-bold text-green-700">Angill</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-poppins text-lg antialiased">
      {currentStep === 1 && <ServiceSelection />}
      {currentStep === 2 && selectedService === "cyber" && <CyberClinicsPage />}
      {currentStep === 2 && selectedService !== "cyber" && <ConsultationDetails />}
      {currentStep === 3 && <PatientSelection />}
      {currentStep === 4 && <AddDependentPage />}
      {currentStep === 5 && <HealthComplaintPage />}
    </div>
  );
};

export default Landing;