import React, { createContext, useContext, useState } from 'react';

const ConsultationFlowContext = createContext();

export const ConsultationFlowProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDependent, setSelectedDependent] = useState(null);
  const [showAddDependent, setShowAddDependent] = useState(false);
  const [cameFromAddDependent, setCameFromAddDependent] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleConsultationClick = () => {
    setCurrentStep(3);
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDependent(null);
    setShowAddDependent(false);
    setCameFromAddDependent(false);
  };

  const goBack = () => {
    if (currentStep > 1) {
      if (currentStep === 5) {
        // If coming from AddDependent, go back to step 4, else go to step 3
        setCurrentStep(cameFromAddDependent ? 4 : 3);
        setSelectedDependent(null);
        if (!cameFromAddDependent) {
          setShowAddDependent(false);
        }
      } else if (currentStep === 4) {
        setCurrentStep(3);
        setShowAddDependent(false);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleAddDependentClick = () => {
    setShowAddDependent(true);
    setCurrentStep(4);
    setCameFromAddDependent(true);
  };

  const handleDependentSelect = (dependent) => {
    setSelectedDependent(dependent);
    setCurrentStep(5);
    setCameFromAddDependent(false);
  };

  const handleAddDependentSubmit = () => {
    setCurrentStep(5);
    setSelectedDependent('New Dependent'); // Placeholder for new dependent
  };

  return (
    <ConsultationFlowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedService,
        selectedDependent,
        showAddDependent,
        cameFromAddDependent,
        handleServiceSelect,
        handleConsultationClick,
        resetFlow,
        goBack,
        handleAddDependentClick,
        handleDependentSelect,
        handleAddDependentSubmit,
      }}
    >
      {children}
    </ConsultationFlowContext.Provider>
  );
};

export const useConsultationFlow = () => {
  const context = useContext(ConsultationFlowContext);
  if (!context) {
    throw new Error('useConsultationFlow must be used within a ConsultationFlowProvider');
  }
  return context;
};