import React, { useState, useContext } from 'react';
import { Calendar, Clock, ChevronDown, X } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const BookAppointmentModal = () => {
  const { currentModal, closeModal, handleDoctorConfirm } = useContext(BookingContext);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('online');
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedTime, setSelectedTime] = useState('3:30');
  const [selectedSegment, setSelectedSegment] = useState('Private Doctors');
  const [complaint, setComplaint] = useState('');
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);
  const [showComplaintDropdown, setShowComplaintDropdown] = useState(false);

  const days = [
    { day: 'Mon', date: 26, slots: 0 },
    { day: 'Tue', date: 27, slots: 0 },
    { day: 'Wed', date: 28, slots: 4 },
    { day: 'Thu', date: 29, slots: 0 },
    { day: 'Fri', date: 30, slots: 0 },
  ];

  const timeSlots = {
    morning: ['10:30', '11:30', '12:30', '1:30'],
    afternoon: ['2:30', '3:30', '4:30', '5:30'],
    evening: ['10:30', '11:30', '12:30', '1:30'],
  };

  if (currentModal !== 'bookAppointment') return null;

  const handlePayment = () => {
    handleDoctorConfirm();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-3xl w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="text-xl font-bold text-white bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Book Appointment
            </h3>
            <button 
              onClick={closeModal} 
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Appointment Type */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Appointment Type</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedAppointmentType('online')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                      selectedAppointmentType === 'online'
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Online
                  </button>
                  <button
                    onClick={() => setSelectedAppointmentType('physical')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                      selectedAppointmentType === 'physical'
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Physical
                  </button>
                </div>
              </div>

              {/* Segment Type */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Segment Type</h4>
                <div className="relative">
                  <button
                    onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
                    className="w-full flex items-center justify-between p-3 bg-white/20 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>{selectedSegment}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform ${
                        showSegmentDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {showSegmentDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/20 border border-white/20 rounded-xl shadow-lg z-10 backdrop-blur-sm">
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setSelectedSegment('Private Doctors');
                            setShowSegmentDropdown(false);
                          }}
                          className="w-full text-left p-3 hover:bg-white/30 rounded-lg text-sm text-white transition-all duration-300"
                        >
                          Private Doctors
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSegment('Specialists');
                            setShowSegmentDropdown(false);
                          }}
                          className="w-full text-left p-3 hover:bg-white/30 rounded-lg text-sm text-white transition-all duration-300"
                        >
                          Specialists
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Health Complaint */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Health Complaint</h4>
                <div className="relative">
                  <button
                    onClick={() => setShowComplaintDropdown(!showComplaintDropdown)}
                    className="w-full flex items-center justify-between p-3 bg-white/20 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>Health Complaint (Auto Fetch)</span>
                    <ChevronDown
                      className={`w-5 h-5 text-white transition-transform ${
                        showComplaintDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Describe your problem"
                  className="w-full mt-2 p-3 border border-white/20 rounded-xl text-sm text-white bg-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all duration-300 resize-none backdrop-blur-sm placeholder:text-white/50"
                  rows={3}
                />
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <h4 className="text-sm font-bold text-white">Select Date</h4>
                  </div>
                  <div className="space-y-2">
                    {days.map((day) => (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        disabled={day.slots === 0}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                          selectedDate === day.date
                            ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md border border-white/20'
                            : day.slots > 0
                            ? 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                            : 'bg-gray-200/20 text-gray-400 cursor-not-allowed border border-gray-200/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span>{day.day}</span>
                          <span className="font-bold">{day.date}</span>
                        </div>
                        {day.slots > 0 && (
                          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                            {day.slots} Slots
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-white" />
                    <h4 className="text-sm font-bold text-white">Select Time</h4>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(timeSlots).map(([period, slots]) => (
                      <div key={period}>
                        <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl text-sm font-medium mb-2 capitalize shadow-md backdrop-blur-sm">
                          {period} Slots
                        </button>
                        <div className="grid grid-cols-4 gap-2">
                          {slots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                                selectedTime === time
                                  ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md'
                                  : 'bg-white/20 text-white hover:bg-white/30'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
                >
                  Make Payment
                </button>
              </div>

              {/* Note */}
              <div className="bg-white/10 border border-white/20 rounded-xl p-2 backdrop-blur-sm">
                <p className="text-white/80 text-sm font-light text-center">
                  *Physical Appointment Can Only Be Booked For Private Doctors*
                </p>
              </div>
            </div>
          </div>

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 8px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(12px);
              border-radius: 4px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #10b981, #059669);
              border-radius: 4px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .h-[98vh]::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #059669, #047857);
            }
            
            /* Hide scrollbar on larger screens */
            @media (min-width: 640px) {
              .h-[98vh] {
                scrollbar-width: none;
              }
              .h-[98vh]::-webkit-scrollbar {
                display: none;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;