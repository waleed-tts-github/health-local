import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, User, Phone, ChevronRight } from 'lucide-react';

const ScheduledAppointments = () => {
  // Mock appointment data
  const [appointments] = useState([
    {
      id: 1,
      type: 'online',
      date: '2025-07-22',
      time: '10:30 AM',
      doctorName: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      patientName: 'Thomas K.',
      status: 'upcoming',
      isToday: true
    },
    {
      id: 2,
      type: 'physical',
      date: '2025-07-22',
      time: '2:00 PM',
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
      date: '2025-07-24',
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
      date: '2025-07-25',
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
  const upcomingAppointments = appointments.filter(apt => !apt.isToday);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const AppointmentCard = ({ appointment, showDate = false }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-green-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Type Icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            appointment.type === 'online' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-green-100 text-green-600'
          }`}>
            {appointment.type === 'online' ? (
              <Video className="w-5 h-5" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </div>

          {/* Appointment Details */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm">{appointment.doctorName}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointment.type === 'online'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {appointment.type === 'online' ? 'Online' : 'Physical'}
              </span>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{appointment.specialty}</p>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-700">
                <User className="w-3 h-3 text-gray-400" />
                <span>Patient: {appointment.patientName}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-700">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>{appointment.time}</span>
                {showDate && (
                  <>
                    <span>•</span>
                    <span>{formatDate(appointment.date)}</span>
                  </>
                )}
              </div>
              
              {appointment.type === 'physical' && appointment.location && (
                <div className="flex items-start space-x-2 text-xs text-gray-700">
                  <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{appointment.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="ml-3 p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Scheduled Appointments</h2>
            <p className="text-xs text-gray-600">Manage your upcoming consultations</p>
          </div>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium hover:bg-green-50 px-3 py-1 rounded-lg transition-colors">
          View All
        </button>
      </div>

      {/* Today Section */}
      {todayAppointments.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="font-semibold text-green-700 text-sm">Today</h3>
          </div>
          <div className="space-y-3">
            {todayAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      {upcomingAppointments.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="font-semibold text-blue-700 text-sm">Upcoming</h3>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 3).map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} showDate={true} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium mb-1">No Appointments Scheduled</h3>
          <p className="text-gray-600 text-sm">Book your first consultation to get started</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Book New</span>
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Call Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduledAppointments;