import React from 'react';
import { ArrowLeft, User, Check, Plus } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const PatientSelection = ({ selectedPatient, setSelectedPatient }) => {
  const { selectedService , setCurrentStep,goBack, handleDependentSelect, handleAddDependentClick ,isBookingThroughClinic} = useConsultationFlow();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-gray-100 p-3 sm:p-4">
        <div className="flex items-center max-w-4xl mx-auto relative">
          <button
            onClick={()=>{
                console.log("Is Booking through clinic",isBookingThroughClinic)
                
                if(isBookingThroughClinic)
                {
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
              Your or other dependent.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3">Me</h3>
              <div
                onClick={() => {
                  setSelectedPatient('Niaz Ahmad.');
                  handleDependentSelect('Niaz Ahmad.');
                }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </div>
                  <span className="text-gray-900 font-medium text-sm sm:text-base">Niaz Ahmad.</span>
                </div>
                <div className={`w-5 h-5 rounded border-2 ${selectedPatient === 'Niaz Ahmad.' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                  {selectedPatient === 'Niaz Ahmad.' && <Check className="w-4 h-4 text-white" />}
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
};

export default PatientSelection;