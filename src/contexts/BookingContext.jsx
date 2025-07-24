import React, { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedTime, setSelectedTime] = useState('00:07:53');
  const [timeMinutes, setTimeMinutes] = useState(7);
  const [timeSeconds, setTimeSeconds] = useState(53);
  const [queueWaitTime, setQueueWaitTime] = useState(3);
  const [isLaterTodayBooking,setIsLaterTodayBooking] = useState(false)
  const [isTomorrowOnwardBooking ,setIsTomorrowOnwardBooking] = useState(false)


  // Timer effect for BookingConnectModal
  useEffect(() => {
    if (currentModal === 'connect') {
      const timer = setInterval(() => {
        if (timeSeconds > 0) {
          setTimeSeconds(timeSeconds - 1);
        } else if (timeMinutes > 0) {
          setTimeMinutes(timeMinutes - 1);
          setTimeSeconds(59);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentModal, timeMinutes, timeSeconds]);

  const formatTime = (mins, secs) => {
    return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLiveConnect = () => {
    setCurrentModal('waiting');
    setTimeout(() => {
      const isAvailable = Math.random() > 0.5;
      setCurrentModal(isAvailable ? 'queue' : 'notAvailable');
    }, 2000);
  };

  const handleIsLaterTodayBooking = ()=>{
    setIsLaterTodayBooking(true)
  }
  const handleIsTomorrowOnwardBooking = ()=>{
    setIsTomorrowOnwardBooking(true)
  }

  const handleScheduleAppointment = () => {
    setIsTomorrowOnwardBooking(true)
    setCurrentModal('bookAppointment');
  };

  const handleDoctorConfirm = () => {
    setCurrentModal('payment');
  };

  const handlePayment = () => {
    setCurrentModal('success');
  };

  const handleBookingConfirm=()=>{
    setIsLaterTodayBooking(true)
    setCurrentModal("confirmed")
  }
  const handleNextInLine =()=>{
    setCurrentModal("nextInLine")
  }
  const handleJoinMeeting = ()=>{
    setCurrentModal("meeting")
  }
  const handleGiveFeedback = ()=>{
    setCurrentModal("feedback")
  }

  const closeModal = () => {
    setCurrentModal(null);
  };

  const value = {
    isLaterTodayBooking,
    isTomorrowOnwardBooking,
    currentModal,
    setCurrentModal,
    selectedTime,
    setSelectedTime,
    timeMinutes,
    handleGiveFeedback,
    setTimeMinutes,
    timeSeconds,
    setTimeSeconds,
    handleNextInLine,
    handleIsTomorrowOnwardBooking,
    handleIsLaterTodayBooking,
    handleJoinMeeting,
    handleBookingConfirm,
    queueWaitTime,
    formatTime,
    handleLiveConnect,
    handleScheduleAppointment,
    handleDoctorConfirm,
    handlePayment,
    closeModal,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};