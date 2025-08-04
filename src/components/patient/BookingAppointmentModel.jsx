import React, { useState, useContext } from 'react';
import { Calendar, Clock, ChevronDown, X } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const BookAppointmentModal = () => {
  const { currentModal, closeModal, handleDoctorConfirm } = useContext(BookingContext);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('online');
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedTime, setSelectedTime] = useState('3:30');
  const [selectedSegment, setSelectedSegment] = useState('Private Doctors');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [complaint, setComplaint] = useState('');
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
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

  const locations = [
    'Agha Khan Hospital',
    'Liaquat National Hospital',
    'Patel Hospital'
  ];

  const segments = selectedAppointmentType === 'physical' 
    ? ['Private Doctors'] 
    : ['Private Doctors', 'ANGILL Doctors'];

  if (currentModal !== 'bookAppointment') return null;

  const handlePayment = () => {
    handleDoctorConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 pb-3">
            <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
              Book Appointment
            </h3>
            <button 
              onClick={closeModal} 
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
              {/* Left Side: Appointment Type, Segment Type, Health Complaint, Describe Problem */}
              <div className="space-y-4">
                {/* Appointment Type */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Appointment Type</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAppointmentType('online')}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-xs transition-all ${
                        selectedAppointmentType === 'online'
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      Online
                    </button>
                    <button
                      onClick={() => setSelectedAppointmentType('physical')}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-xs transition-all ${
                        selectedAppointmentType === 'physical'
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      Physical
                    </button>
                  </div>
                </div>

                {/* Segment Type */}
                <div className="relative">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Segment Type</h4>
                  <div className="relative">
                    <button
                      onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-xs font-medium hover:bg-gray-100 transition-all"
                    >
                      <span>{selectedSegment}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${
                          showSegmentDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {showSegmentDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                        <div className="p-1">
                          {segments.map((segment) => (
                            <button
                              key={segment}
                              onClick={() => {
                                setSelectedSegment(segment);
                                setShowSegmentDropdown(false);
                              }}
                              className="w-full text-left p-3 hover:bg-gray-100 rounded-lg text-xs text-gray-700 transition-all font-medium"
                            >
                              {segment}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Dropdown (Shown only for Physical Appointments) */}
                {selectedAppointmentType === 'physical' && (
                  <div className="relative">
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Location</h4>
                    <div className="relative">
                      <button
                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-xs font-medium hover:bg-gray-100 transition-all"
                      >
                        <span>{selectedLocation || 'Select Location'}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-600 transition-transform ${
                            showLocationDropdown ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {showLocationDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                          <div className="p-1">
                            {locations.map((location) => (
                              <button
                                key={location}
                                onClick={() => {
                                  setSelectedLocation(location);
                                  setShowLocationDropdown(false);
                                }}
                                className="w-full text-left p-3 hover:bg-gray-100 rounded-lg text-xs text-gray-700 transition-all font-medium"
                              >
                                {location}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Health Complaint */}
                <div className="relative">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Health Complaint</h4>
                  <div className="relative">
                    <button
                      onClick={() => setShowComplaintDropdown(!showComplaintDropdown)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-xs font-medium hover:bg-gray-100 transition-all"
                    >
                      <span>Health Complaint (Auto Fetch)</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${
                          showComplaintDropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {showComplaintDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                        <div className="p-1">
                          <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg text-xs text-gray-700 transition-all font-medium">
                            Auto-generated complaint options will appear here
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Describe your problem"
                    className="w-full mt-2 p-3 border border-gray-200 rounded-xl text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 transition-all resize-none placeholder-gray-400"
                    rows={3}
                  />
                </div>
              </div>

              {/* Right Side: Date and Time Selection (on larger devices) */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm font-bold text-gray-700">Select Date</h4>
                  </div>
                  <div className="space-y-2">
                    {days.map((day) => (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        disabled={day.slots === 0}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-all ${
                          selectedDate === day.date
                            ? 'bg-green-500 text-white shadow-md'
                            : day.slots > 0
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span>{day.day}</span>
                          <span className="font-bold">{day.date}</span>
                        </div>
                        {day.slots > 0 && (
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {day.slots} Slots
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm font-bold text-gray-700">Select Time</h4>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(timeSlots).map(([period, slots]) => (
                      <div key={period}>
                        <button className="w-full py-2 px-4 bg-green-500 text-white rounded-xl text-xs font-medium mb-2 capitalize shadow-md">
                          {period} Slots
                        </button>
                        <div className="grid grid-cols-4 gap-2">
                          {slots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 rounded-xl text-xs font-medium transition-all ${
                                selectedTime === time
                                  ? 'bg-green-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
              >
                Make Payment
              </button>
            </div>

            {/* Note */}
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-2">
              <p className="text-gray-600 text-xs font-light text-center">
                *Physical Appointment Can Only Be Booked For Private Doctors*
              </p>
            </div>
          </div>

          <style jsx>{`
            /* Enhanced scrollbar styling - only for small devices */
            .h-[98vh] {
              scrollbar-width: thin;
              scrollbar-color: #10b981 #e5e7eb;
            }
            .h-[98vh]::-webkit-scrollbar {
              width: 8px;
            }
            .h-[98vh]::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 4px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb {
              background: #10b981;
              border-radius: 4px;
            }
            .h-[98vh]::-webkit-scrollbar-thumb:hover {
              background: #059669;
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

            /* Ensure pixel-perfect layout */
            @media (min-width: 1024px) {
              .lg\\:grid-cols-2 {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;