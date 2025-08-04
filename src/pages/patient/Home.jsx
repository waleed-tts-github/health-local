import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Video,ArrowLeft } from 'lucide-react';
import consultationBg from '../../assets/consultationpagebg.png';
import AddDependent from '../../components/patient/AddDependent';
import HealthComplaint from '../../components/patient/HealthComplaint';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import AngillCyberClinics from '../../components/patient/CyberClinics';
import ServiceSelection from '../../components/patient/ServiceSelection';
import PatientSelection from '../../components/patient/PatientSelection';
import SelectedServiceInfo from '../../components/patient/SelectedServiceInfo';
const Home = () => {
  const {
    currentStep,
    selectedService,
    handleConsultationClick,
  
    goBack,
    setCurrentStep,
    setIsBookingThroughClinic,
    isBookingThroughClinic,
  
  } = useConsultationFlow();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentsExpanded, setIsAppointmentsExpanded] = useState(false);

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

  const AddDependentPage = () => (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-sm border border-gray-100 p-3 sm:p-4">
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
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-sm border border-gray-100 p-3 sm:p-4">
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
      {currentStep === 1  && (
        <ServiceSelection
          isAppointmentsExpanded={isAppointmentsExpanded}
          setIsAppointmentsExpanded={setIsAppointmentsExpanded}
          appointments={appointments}
          getRemainingTime={getRemainingTime}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {currentStep === 2 && (selectedService === "cyber" ||isBookingThroughClinic) && <AngillCyberClinics />}
      {currentStep === 2 && selectedService !== "cyber" && (
        <SelectedServiceInfo
          isImageLoaded={isImageLoaded}
          selectedService={selectedService}
          handleConsultationClick={handleConsultationClick}
          setCurrentStep={setCurrentStep}
          goBack={goBack}
          setIsBookingThroughClinic={setIsBookingThroughClinic}
          isBookingThroughClinic={isBookingThroughClinic}
        />
      )}
      {currentStep === 3 && (
        <PatientSelection
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      )}
      {currentStep === 4 && <AddDependentPage />}
      {currentStep === 5 && <HealthComplaintPage />}
    </div>
  );
};

export default Home;