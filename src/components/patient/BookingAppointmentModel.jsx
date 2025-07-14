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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-3xl w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-auto sm:p-5 p-3 shadow-2xl border border-green-100/30">
        <div className="flex items-center justify-between sm:mb-4 mb-2">
          <h3 className="sm:text-sm text-xs font-bold text-green-700">Book Appointment</h3>
          <button 
            onClick={closeModal} 
            className="sm:p-1.5 p-1 bg-green-100/80 hover:bg-green-200/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <X className="sm:w-4 sm:h-4 w-3 h-3 text-green-700" />
          </button>
        </div>

        <div className="sm:space-y-4 space-y-2">
          <div>
            <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900 sm:mb-1 mb-0.5">Appointment Type</h4>
            <div className="flex sm:gap-2 gap-1">
              <button
                onClick={() => setSelectedAppointmentType('online')}
                className={`flex-1 sm:py-1.5 py-1 sm:px-3 px-2 rounded-lg font-medium sm:text-xs text-[10px] transition-all duration-300 shadow-sm hover:shadow-md ${
                  selectedAppointmentType === 'online'
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
                    : 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setSelectedAppointmentType('physical')}
                className={`flex-1 sm:py-1.5 py-1 sm:px-3 px-2 rounded-lg font-medium sm:text-xs text-[10px] transition-all duration-300 shadow-sm hover:shadow-md ${
                  selectedAppointmentType === 'physical'
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
                    : 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                }`}
              >
                Physical
              </button>
            </div>
          </div>

          <div>
            <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900 sm:mb-1 mb-0.5">Segment Type</h4>
            <div className="relative">
              <button
                onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
                className="w-full flex items-center justify-between sm:p-2 p-1.5 bg-white/50 rounded-lg border border-green-100/30 text-green-700 sm:text-xs text-[10px] font-medium hover:bg-white/70 transition-all duration-300 backdrop-blur-sm"
              >
                <span>{selectedSegment}</span>
                <ChevronDown
                  className={`sm:w-4 sm:h-4 w-3 h-3 text-green-700 transition-transform ${
                    showSegmentDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showSegmentDropdown && (
                <div className="absolute top-full left-0 right-0 sm:mt-1 mt-0.5 bg-white/90 border border-green-100/30 rounded-lg shadow-lg z-10 backdrop-blur-sm">
                  <div className="sm:p-1 p-0.5">
                    <button
                      onClick={() => {
                        setSelectedSegment('Private Doctors');
                        setShowSegmentDropdown(false);
                      }}
                      className="w-full text-left sm:p-2 p-1.5 hover:bg-green-100/50 rounded-lg sm:text-xs text-[10px] text-green-700 transition-all duration-300"
                    >
                      Private Doctors
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSegment('Specialists');
                        setShowSegmentDropdown(false);
                      }}
                      className="w-full text-left sm:p-2 p-1.5 hover:bg-green-100/50 rounded-lg sm:text-xs text-[10px] text-green-700 transition-all duration-300"
                    >
                      Specialists
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900 sm:mb-1 mb-0.5">Health Complaint</h4>
            <div className="relative">
              <button
                onClick={() => setShowComplaintDropdown(!showComplaintDropdown)}
                className="w-full flex items-center justify-between sm:p-2 p-1.5 bg-white/50 rounded-lg border border-green-100/30 text-green-700 sm:text-xs text-[10px] font-medium hover:bg-white/70 transition-all duration-300 backdrop-blur-sm"
              >
                <span>Health Complaint (Auto Fetch)</span>
                <ChevronDown
                  className={`sm:w-4 sm:h-4 w-3 h-3 text-green-700 transition-transform ${
                    showComplaintDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe your problem"
              className="w-full sm:mt-2 mt-1 sm:p-2 p-1.5 border border-green-100/30 rounded-lg sm:text-xs text-[10px] text-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-200 transition-all duration-300 resize-none backdrop-blur-sm"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-4 gap-2">
            <div className="bg-white/50 rounded-lg sm:p-3 p-2 border border-green-100/30 backdrop-blur-sm">
              <div className="flex items-center sm:gap-1.5 gap-1 sm:mb-2 mb-1">
                <Calendar className="sm:w-4 sm:h-4 w-3 h-3 text-green-600" />
                <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900">Select Date</h4>
              </div>
              <div className="sm:space-y-2 space-y-1">
                {days.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    disabled={day.slots === 0}
                    className={`w-full flex items-center justify-between sm:p-2 p-1.5 rounded-lg sm:text-xs text-[10px] font-medium transition-all duration-300 ${
                      selectedDate === day.date
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-sm'
                        : day.slots > 0
                        ? 'bg-white/70 text-green-700 hover:bg-green-100/50 border border-green-100/30'
                        : 'bg-gray-200/50 text-gray-400 cursor-not-allowed border border-gray-200/30'
                    }`}
                  >
                    <div className="flex items-center sm:gap-2 gap-1.5">
                      <span>{day.day}</span>
                      <span className="font-bold">{day.date}</span>
                    </div>
                    {day.slots > 0 && (
                      <span className="bg-orange-100/80 text-orange-600 sm:px-2 px-1.5 sm:py-0.5 py-0.25 rounded-full sm:text-xs text-[10px] font-medium">
                        {day.slots} Slots
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/50 rounded-lg sm:p-3 p-2 border border-green-100/30 backdrop-blur-sm">
              <div className="flex items-center sm:gap-1.5 gap-1 sm:mb-2 mb-1">
                <Clock className="sm:w-4 sm:h-4 w-3 h-3 text-green-600" />
                <h4 className="sm:text-xs text-[10px] font-semibold text-gray-900">Select Time</h4>
              </div>
              <div className="sm:space-y-2 space-y-1">
                {Object.entries(timeSlots).map(([period, slots]) => (
                  <div key={period}>
                    <button className="w-full sm:py-1.5 py-1 sm:px-3 px-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg sm:text-xs text-[10px] font-medium sm:mb-2 mb-1 capitalize shadow-sm">
                      {period} Slots
                    </button>
                    <div className="grid grid-cols-4 sm:gap-2 gap-1">
                      {slots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`sm:p-2 p-1 rounded-lg sm:text-xs text-[10px] font-medium transition-all duration-300 ${
                            selectedTime === time
                              ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-sm'
                              : 'bg-white/70 text-green-700 hover:bg-green-100/50 border border-green-100/30'
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

          <div className="flex sm:gap-2 gap-1 sm:mt-4 mt-2">
            <button 
              onClick={closeModal}
              className="flex-1 sm:py-1.5 py-1 bg-green-100/80 hover:bg-green-200/80 text-green-700 rounded-lg font-medium sm:text-xs text-[10px] transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 sm:py-1.5 py-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg font-medium sm:text-xs text-[10px] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Make Payment
            </button>
          </div>

          <div className="bg-red-50/80 border border-red-200/50 rounded-lg sm:p-1.5 p-1 sm:mt-2 mt-1 backdrop-blur-sm">
            <p className="text-red-600 sm:text-xs text-[10px] font-light text-center">
              *Physical Appointment Can Only Be Booked For Private Doctors*
            </p>
          </div>
        </div>

        <style jsx>{`
          /* Custom Scrollbar for Smaller Devices */
          @media (max-width: 640px) {
            .max-h-[80vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 rgba(255, 255, 255, 0.9);
            }
            .max-h-[80vh]::-webkit-scrollbar {
              width: 6px;
            }
            .max-h-[80vh]::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
              border-radius: 3px;
              border: 1px solid rgba(209, 250, 229, 0.3); /* Matches modal border */
            }
            .max-h-[80vh]::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #10b981, #14b8a6);
              border-radius: 3px;
            }
            .max-h-[80vh]::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #059669, #0d9488);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookAppointmentModal;