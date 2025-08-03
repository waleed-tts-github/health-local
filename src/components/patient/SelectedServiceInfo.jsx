import React from 'react';
import { ArrowLeft, Shield, Stethoscope } from 'lucide-react';
import consultationBg from '../../assets/consultationpagebg.png';
import logo from '../../assets/Group.png';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const SelectedServiceInfo = ({ isImageLoaded, selectedService, handleConsultationClick, setCurrentStep, goBack, setIsBookingThroughClinic, isBookingThroughClinic }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4 mb-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button
            onClick={() => {
            
                goBack();
              
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
            <div className={`w-13 h-13 sm:w-12 sm:h-12 ${selectedService === 'private' ? 'bg-blue-300' : 'bg-green-300'} rounded-full flex items-center justify-center`}>
           {selectedService === "angill" ? (
  <img src={logo} className="w-10 h-10 sm:w-6 sm:h-6 text-green-600" />
) : (
  <Shield className="w-10 h-10 sm:w-6 sm:h-6 text-blue-600" />
)}
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
              <p>please contact the nearest hospital or emergency services immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedServiceInfo;