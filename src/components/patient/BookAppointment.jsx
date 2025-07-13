import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';

const BookAppointmentModal = () => {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('online');
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedTime, setSelectedTime] = useState('3:30');
  const [selectedSegment, setSelectedSegment] = useState('Private Doctors');
  const [complaint, setComplaint] = useState('');
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);
  const [showComplaintDropdown, setShowComplaintDropdown] = useState(false);

  const days = [
    { day: 'Monday', date: 26, slots: 0 },
    { day: 'Tuesday', date: 27, slots: 0 },
    { day: 'Wednesday', date: 28, slots: 4 },
    { day: 'Thursday', date: 29, slots: 0 },
    { day: 'Friday', date: 30, slots: 0 }
  ];

  const timeSlots = {
    morning: ['10:30', '11:30', '12:30', '1:30'],
    afternoon: ['2:30', '3:30', '4:30', '5:30'],
    evening: ['10:30', '11:30', '12:30', '1:30']
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-6">
        <h2 className="text-3xl font-bold text-white text-center">Booking An Appointment</h2>
      </div>

      <div className="p-8 space-y-8">
        {/* Appointment Type Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Appointment Type</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedAppointmentType('online')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                selectedAppointmentType === 'online'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Online Appointment
            </button>
            <button
              onClick={() => setSelectedAppointmentType('physical')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                selectedAppointmentType === 'physical'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Physical Appointment
            </button>
          </div>
        </div>

        {/* Segment Type */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Segment Type</h3>
          <div className="relative">
            <button
              onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <span className="text-gray-700">{selectedSegment}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showSegmentDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSegmentDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedSegment('Private Doctors');
                      setShowSegmentDropdown(false);
                    }}
                    className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    Private Doctors
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSegment('Specialists');
                      setShowSegmentDropdown(false);
                    }}
                    className="w-full text-left p-3 hover:bg-emerald-50 rounded-lg transition-colors"
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
          <div className="relative">
            <button
              onClick={() => setShowComplaintDropdown(!showComplaintDropdown)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <span className="text-gray-700">Health Complaint (Auto Fetch)</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showComplaintDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your problem"
            className="w-full mt-4 p-4 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors resize-none"
            rows="4"
          />
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-800">Select Date</h3>
            </div>
            <div className="space-y-3">
              {days.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  disabled={day.slots === 0}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                    selectedDate === day.date
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : day.slots > 0
                      ? 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-2xl font-bold">{day.date}</span>
                  </div>
                  {day.slots > 0 && (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                      {day.slots} Slots
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-800">Select Time</h3>
            </div>
            
            <div className="space-y-6">
              {Object.entries(timeSlots).map(([period, slots]) => (
                <div key={period}>
                  <button className="w-full py-3 px-4 bg-emerald-500 text-white rounded-lg font-medium mb-3 capitalize">
                    {period} Slots
                  </button>
                  <div className="grid grid-cols-4 gap-2">
                    {slots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                          selectedTime === time
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
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

        {/* Payment Button */}
        <div className="flex justify-center pt-6">
          <button className="w-full max-w-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Please make the payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;