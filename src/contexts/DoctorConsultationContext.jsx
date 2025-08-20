import React, { createContext, useContext, useState } from 'react';

const DoctorConsultationContext = createContext();

export const DoctorConsultationProvider = ({ children }) => {
  const [showDoctorMeetingModel, setShowDoctorMeetingModel] = useState(false);
  const [showPatientComplaintWithMedicalAndVisitHistoryModel, setShowPatientComplaintWithMedicalAndVisitHistoryModel] = useState(false);
  const [showWritePrescriptionModel, setShowWritePrescriptionModel] = useState(false);
  const [showWriteLabTestModel, setShowWriteLabTestModel] = useState(false);
  const [isAppointmentCompleted,setIsAppointmentCompleted] = useState(false)

  return (
    <DoctorConsultationContext.Provider
      value={{
        showDoctorMeetingModel,
        setShowDoctorMeetingModel,
        showPatientComplaintWithMedicalAndVisitHistoryModel,
        setShowPatientComplaintWithMedicalAndVisitHistoryModel,
        showWritePrescriptionModel,
        setShowWritePrescriptionModel,
        showWriteLabTestModel,
        setShowWriteLabTestModel,
        isAppointmentCompleted,
        setIsAppointmentCompleted
      }}
    >
      {children}
    </DoctorConsultationContext.Provider>
  );
};

export const useDoctorConsultation = () => {
  const context = useContext(DoctorConsultationContext);
  if (!context) {
    throw new Error('useDoctorConsultation must be used within a DoctorConsultationProvider');
  }
  return context;
};