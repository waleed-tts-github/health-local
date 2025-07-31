import React, { useState, useEffect } from 'react';
import { Heart, User, Shield, LogOut, ArrowLeft, Check, Plus, Search, MapPin, Star, Calendar,Clock,Video ,ChevronDownCircle,ChevronUp} from 'lucide-react';
import consultationBg from '../../assets/consultationpagebg.png';
import AddDependent from '../../components/patient/AddDependent';
import HealthComplaint from '../../components/patient/HealthComplaint';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import ScheduledAppointments from '../../components/patient/ScheduledAppointments';
import homepagebg from '../../assets/homepagebg.png'
import AngillCyberClinics from '../../components/patient/CyberClinics';

const Home = () => {
  const {
    currentStep,
    selectedService,
    handleShowCyberClinics,
    handleServiceSelect,
    handleShowHealthComplaint,
    handleConsultationClick,
    resetFlow,
    goBack,
    setCurrentStep,
    setIsBookingThroughClinic,
    isBookingThroughClinic,
    handleAddDependentClick,
    handleDependentSelect,
  } = useConsultationFlow();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [isAppointmentsExpanded, setIsAppointmentsExpanded] = useState(false);
  
  
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Ali Khan",
      type: "Physical",
      location: "Agha Khan Hospital, Karachi",
      dateTime: "2025-07-27T14:30:00",
      status: "Upcoming"
    }
  ]);

  // Calculate remaining time for each appointment
  const getRemainingTime = (dateTime) => {
    const now = new Date();
    const appointmentTime = new Date(dateTime);
    const diff = appointmentTime - now;
    
    if (diff <= 0) return "Missed";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const img = new Image();
    img.src = consultationBg;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setIsImageLoaded(true);
  }, []);

const ServiceSelection = () => (
  <div className="min-h-screen bg-white px-4 sm:px-8 py-2 sm:py-4">
    <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 relative z-10 backdrop-blur-sm border border-green-200/20">
      <div className="absolute inset-0 bg-green-500/5 rounded-lg opacity-50"></div>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-3 sm:mb-0 text-center sm:text-left sm:flex-1">
          <h1 className="text-xl sm:text-2xl leading-tight">
            <span className="font-light">Find Your</span><br />
            <span className="font-extrabold">Best Specialists</span><br />
            <span className="font-extrabold">& Best Clinics</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-teal-100 mt-1">Treatment from the best specialists from all over Pakistan</p>
        </div>
        <div className="w-full sm:w-1/3 max-w-sm">
          <img
            src={homepagebg}
            alt="Healthcare professional"
            className="w-full h-auto max-h-[calc(100px+40px)] sm:max-h-[calc(120px+40px)] object-contain rounded-xl transform scale-110"
          />
        </div>
      </div>
    </div>

    <div className="bg-white/90 backdrop-blur-lg p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 border border-green-100/50 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between relative">
        <div className="mb-3 sm:mb-0 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold text-green-700">Welcome, Niaz Ahmed</h2>
          <p className="text-xs sm:text-sm text-gray-600 font-light">We strive to connect you with highly skilled medical professionals.</p>
        </div>
        <div className="flex items-center justify-center w-full sm:w-auto sm:justify-end relative">
          <button
            onClick={() => setIsAppointmentsExpanded(!isAppointmentsExpanded)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Today's Appointments</span>
            <div className={`transform transition-transform duration-300 ${isAppointmentsExpanded ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDownCircle className="w-5 h-5" />
            </div>
          </button>
          <button className="p-2 bg-green-100/80 text-green-700 rounded-full hover:bg-green-200/80 transition-all duration-300 transform hover:scale-110 shadow-md absolute right-0 sm:static sm:ml-3">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expandable Appointments Section */}
      {isAppointmentsExpanded && (
        <div className="mt-6 transition-all duration-500 ease-in-out">
          {/* Header with subtle divider */}
          <div className="flex items-center mb-5">
            <div className="flex-1 h-px"></div>
            <h3 className="px-0 text-sm font-semibold text-green-700 bg-green-50/50 rounded-full py-1">
              Your Appointments Today
            </h3>
            <div className="flex-1 h-px"></div>
          </div>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map(appointment => (
                <div key={appointment.id}>
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">
                          {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                          Dr. {appointment.doctorName}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">
                          {appointment.specialty || 'General Practice'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium shadow-sm ${
                        appointment.status === "Upcoming"
                          ? "bg-green-100 text-green-700 border border-green-200/50"
                          : "bg-gray-100 text-gray-600 border border-gray-200/50"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  {/* Details Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/60 rounded-xl p-3 border border-green-50">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">
                          {new Date(appointment.dateTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        {appointment.type === "Physical" ? (
                          <>
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span className="text-sm">In Person</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Video Call</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">
                        {getRemainingTime(appointment.dateTime)}
                      </p>
                      <p className="text-xs text-gray-500">remaining</p>
                    </div>
                  </div>
                  {/* Location for physical appointments */}
                  {appointment.type === "Physical" && appointment.location && (
                    <div className="mt-3 flex items-center space-x-2 text-gray-600 bg-green-50/50 rounded-lg p-2">
                      <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-base font-medium text-gray-700 mb-2">No appointments today</h4>
                <p className="text-sm text-gray-500 mb-4">You have a clear schedule for today</p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md">
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    <div className="text-center mb-1 sm:mb-2">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Choose Your Service</h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10">
      <div
        onClick={() => {setIsBookingThroughClinic(false);handleServiceSelect('angill')}}
        className="bg-gradient-to-br from-green-500/80 to-teal-500/80 p-4 sm:p-6 rounded-xl text-white cursor-pointer hover:from-green-600/90 hover:to-teal-600/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-green-300/20 backdrop-blur-sm"
      >
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        <h4 className="text-sm sm:text-base font-semibold text-center">Angill Doctors</h4>
        <p className="text-xs text-center text-teal-100 font-light">Fixed consultation fees</p>
      </div>
      <div
        onClick={() =>{setIsBookingThroughClinic(false);
           handleServiceSelect('private')}}
        className="bg-gradient-to-br from-blue-800/80 to-blue-600/80 p-4 sm:p-6 rounded-xl text-white cursor-pointer hover:from-blue-900/90 hover:to-blue-700/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-blue-200/20 backdrop-blur-sm"
      >
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse delay-200">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        <h4 className="text-sm sm:text-base font-semibold text-center">Private Doctors</h4>
        <p className="text-xs text-center text-cyan-100 font-light">Flexible consultation fees</p>
      </div>
      <div
        onClick={handleShowCyberClinics}
        className="bg-gradient-to-br from-green-700/80 to-teal-700/80 p-4 sm:p-6 rounded-xl text-white cursor-pointer hover:from-green-800/90 hover:to-teal-800/90 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg border border-gray-200/20 backdrop-blur-sm"
      >
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center animate-pulse delay-400">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
        <h4 className="text-sm sm:text-base font-semibold text-center">Angill Cyber Clinics</h4>
        <p className="text-xs text-center text-teal-100 font-light">No wait, same-day appointments</p>
      </div>
    </div>

    <ScheduledAppointments open={isModalOpen} onClose={() => setIsModalOpen(false)} />
  </div>
);
  const ConsultationDetails = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={()=>{
              if(isBookingThroughClinic)
              {
                handleServiceSelect("cyber")
                setCurrentStep(2)
              }
              else{
                goBack()
              }
            }}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center h-10 sm:h-[48px]"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${selectedService === 'private' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
              <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${selectedService === 'private' ? 'text-blue-600' : 'text-green-600'}`}/>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {selectedService === 'angill' ? 'Angill Doctors' : selectedService === 'private' ? 'Private Doctors' : 'Angill Cyber Clinics'}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {selectedService === 'private' 
              ? 'Choose an approved private doctor of your choice from anywhere in Pakistan. Consultation fees may vary based on the doctor\'s qualifications and expertise' 
              : 'Our verified board of general practitioners and specialist doctors offer medical consultations at a fixed, transparent price.'}
          </p>
        </div>

        <div 
          className={`flex-1 relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-[300px] sm:min-h-96 transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: isImageLoaded ? `url(${consultationBg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-4">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-medium mb-2">Proceed For</h2>
              <h3 className="text-xs sm:text-sm font-thin text-white/30 tracking-[0.3em]">Emergency</h3>
            </div>
            <button 
              onClick={handleConsultationClick}
              className="bg-green-500 hover:bg-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-colors shadow-lg"
            >
              Consultation
            </button>
            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-200">
              <p>In the event of a life-threatening situation,</p>
              <p> please contact the nearest hospital or emergency services immediately.</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientSelection = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-lg font-bold text-green-700">
              {selectedService === 'angill' ? 'Angill Doctors' : selectedService === 'private' ? 'Private Doctors' : 'Angill Today'}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {selectedService === 'private' ? 'Price varies' : 'Fixed price'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
              Who Needs Help?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Tell me who needs our doctor's help, you or other dependents.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3">Me</h3>
              <div 
                onClick={() => {
                  setSelectedPatient('Thomas K.');
                  handleDependentSelect('Thomas K.');
                }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">Thomas K.</span>
                </div>
                <div className={`w-5 h-5 rounded border-2 ${selectedPatient === 'Thomas K.' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                  {selectedPatient === 'Thomas K.' && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-medium text-gray-700">Dependents</h3>
                <button 
                  onClick={() => handleAddDependentClick()}
                  className="p-1 hover:bg-gray-100 rounded mr-2 sm:mr-[9px]"
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium text-sm sm:text-base">Karl K.</div>
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium text-sm sm:text-base">Rannie K.</div>
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

  const AddDependentPage = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-lg font-bold text-green-700">Add Dependent</h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">Add a new dependent for medical consultations</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 sm:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <AddDependent />
        </div>
      </div>
    </div>
  );

  const HealthComplaintPage = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button 
            onClick={goBack}
            className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-lg font-bold text-green-700">Health Complaint</h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">Provide your health details</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 sm:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <HealthComplaint />
        </div>
      </div>
    </div>
  );



  return (
    <div className="font-poppins text-base sm:text-lg antialiased">
      {currentStep === 1 && <ServiceSelection />}
      {currentStep === 2 && selectedService === "cyber" && <AngillCyberClinics/>}
      {currentStep === 2 && selectedService !== "cyber" && <ConsultationDetails />}
      {currentStep === 3 && <PatientSelection />}
      {currentStep === 4 && <AddDependentPage />}
      {currentStep === 5 && <HealthComplaintPage />}
    </div>
  );
};

export default Home;