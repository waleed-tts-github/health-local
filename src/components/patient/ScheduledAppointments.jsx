import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Video, User, X, Check, Timer } from 'lucide-react';

const ScheduledAppointments = ({ open, onClose }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock appointment data
  const [appointments] = useState([
    {
      id: 1,
      type: 'online',
      date: '2025-07-24',
      time: '11:30 PM',
      doctorName: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      patientName: 'Thomas K.',
      status: 'upcoming',
      isToday: true
    },
    {
      id: 2,
      type: 'physical',
      date: '2025-07-24',
      time: '11:50 PM',
      doctorName: 'Dr. Muhammad Ali',
      specialty: 'Orthopedic Surgeon',
      location: 'George Cyber Angill Clinic, Main Street, Block A',
      patientName: 'Karl K.',
      status: 'upcoming',
      isToday: true
    },
    {
      id: 3,
      type: 'online',
      date: '2025-07-28',
      time: '11:00 AM',
      doctorName: 'Dr. Fatima Khan',
      specialty: 'Dermatologist',
      patientName: 'Rannie K.',
      status: 'upcoming',
      isToday: false
    },
    {
      id: 4,
      type: 'physical',
      date: '2025-07-26',
      time: '9:15 AM',
      doctorName: 'Dr. Ahmed Hassan',
      specialty: 'General Physician',
      location: 'Central Angill Clinic, Liberty Market, Gulberg',
      patientName: 'Thomas K.',
      status: 'upcoming',
      isToday: false
    }
  ]);

  const todayAppointments = appointments.filter(apt => apt.isToday);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const parseTimeToDate = (timeStr, dateStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    const appointmentDate = new Date(dateStr);
    appointmentDate.setHours(hour24, parseInt(minutes), 0, 0);
    return appointmentDate;
  };

  const getTimeRemaining = (appointment) => {
    const appointmentTime = parseTimeToDate(appointment.time, appointment.date);
    const now = currentTime;
    const timeDiff = appointmentTime - now;

    if (timeDiff <= 0) {
      return 'Started';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const AppointmentCard = ({ appointment }) => {
    const timeRemaining = getTimeRemaining(appointment);
    const isStarted = timeRemaining === 'Started';

    return (
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow min-h-[220px]">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                {appointment.type === 'online' ? (
                  <Video className="h-5 w-5 text-gray-600" />
                ) : (
                  <MapPin className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-base mb-1">{appointment.doctorName}</h4>
                <div className="text-sm text-gray-500 mb-2">
                  <span>{appointment.specialty}</span>
                </div>
                <div className="mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {appointment.type === 'online' ? 'Online' : 'Physical'}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm flex-shrink-0">
              Details
            </button>
          </div>

          {/* Timer Section */}
          <div className="mb-4">
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${isStarted ? 'bg-green-50' : 'bg-blue-50'}`}>
              <Timer className={`h-4 w-4 ${isStarted ? 'text-green-600' : 'text-blue-600'}`} />
              <span className={`text-sm font-medium ${isStarted ? 'text-green-700' : 'text-blue-700'}`}>
                {isStarted ? 'Appointment Started' : `Time Remaining: ${timeRemaining}`}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>Patient: {appointment.patientName}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span>{appointment.time} • {formatDate(appointment.date)}</span>
            </div>
            {appointment.type === 'physical' && appointment.location && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="break-words">{appointment.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 h-full font-poppins">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-3 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Today's Appointments</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 sm:h-5 w-3 sm:w-5" />
          </button>
        </div>

        {/* Today Appointments */}
        {todayAppointments.length > 0 ? (
          <div className="space-y-4">
            {todayAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Check className="h-6 sm:h-8 w-6 sm:w-8 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Appointments Today</h3>
            <p className="text-xs sm:text-sm text-gray-600">No consultations scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledAppointments;