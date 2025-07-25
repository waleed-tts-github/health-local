import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Save } from 'lucide-react';

const CreateAppointmentSlots = () => {
  const [appointmentType, setAppointmentType] = useState('physical');
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [consultationFee, setConsultationFee] = useState('1500');
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Generate time options for chips
  const generateTimeChips = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = hour >= 12 
          ? `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} PM`
          : `${hour}:${minute.toString().padStart(2, '0')} AM`;
        times.push({ value: time, display: displayTime });
      }
    }
    return times;
  };

  const timeChips = generateTimeChips();

  const toggleTimeSlot = (timeValue) => {
    setSelectedSlots(prev => 
      prev.includes(timeValue)
        ? prev.filter(slot => slot !== timeValue)
        : [...prev, timeValue].sort()
    );
  };

  const getDaysOfWeek = () => {
    return [
      { key: 'mon', label: 'M', full: 'Monday', active: false },
      { key: 'tue', label: 'T', full: 'Tuesday', active: true },
      { key: 'wed', label: 'W', full: 'Wednesday', active: false },
      { key: 'thu', label: 'T', full: 'Thursday', active: true },
      { key: 'fri', label: 'F', full: 'Friday', active: true },
      { key: 'sat', label: 'S', full: 'Saturday', active: true },
      { key: 'sun', label: 'S', full: 'Sunday', active: false }
    ];
  };

  const [workingDays, setWorkingDays] = useState(getDaysOfWeek());

  const toggleWorkingDay = (key) => {
    setWorkingDays(workingDays.map(day => 
      day.key === key ? { ...day, active: !day.active } : day
    ));
  };

  const quickSelectSlots = (type) => {
    if (type === 'morning') {
      const morningSlots = timeChips
        .filter(time => parseInt(time.value.split(':')[0]) >= 9 && parseInt(time.value.split(':')[0]) < 12)
        .map(time => time.value);
      setSelectedSlots(morningSlots);
    } else if (type === 'evening') {
      const eveningSlots = timeChips
        .filter(time => parseInt(time.value.split(':')[0]) >= 16 && parseInt(time.value.split(':')[0]) <= 20)
        .map(time => time.value);
      setSelectedSlots(eveningSlots);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Appointment Slots</h1>
          <p className="text-gray-600">Set up your availability and consultation schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Appointment Type */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultation Type</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAppointmentType('physical')}
                  className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                    appointmentType === 'physical'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Physical
                </button>
                <button
                  onClick={() => setAppointmentType('online')}
                  className={`flex items-center justify-center p-4 rounded-lg border transition-all ${
                    appointmentType === 'online'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Online
                </button>
              </div>
            </div>

            {/* Date & Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rs.</span>
                    <input
                      type="number"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {appointmentType === 'physical' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Clinic address"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Working Days */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Working Days</h2>
              <div className="flex gap-2">
                {workingDays.map((day) => (
                  <button
                    key={day.key}
                    onClick={() => toggleWorkingDay(day.key)}
                    title={day.full}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                      day.active
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  Available Times
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => quickSelectSlots('morning')}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  >
                    Morning
                  </button>
                  <button
                    onClick={() => quickSelectSlots('evening')}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  >
                    Evening
                  </button>
                  <button
                    onClick={() => setSelectedSlots([])}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Time Chips */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {timeChips.map((time) => (
                  <button
                    key={time.value}
                    onClick={() => toggleTimeSlot(time.value)}
                    className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                      selectedSlots.includes(time.value)
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    {time.display.replace(' ', '')}
                  </button>
                ))}
              </div>

              {selectedSlots.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium mb-2">
                    {selectedSlots.length} slots selected
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSlots.slice(0, 10).map((slot) => {
                      const timeObj = timeChips.find(t => t.value === slot);
                      return (
                        <span
                          key={slot}
                          className="px-2 py-1 bg-green-500 text-white text-xs rounded-md"
                        >
                          {timeObj?.display.replace(' ', '')}
                        </span>
                      );
                    })}
                    {selectedSlots.length > 10 && (
                      <span className="px-2 py-1 bg-green-300 text-green-800 text-xs rounded-md">
                        +{selectedSlots.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{appointmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium">Rs. {consultationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Slots:</span>
                  <span className="font-medium">{selectedSlots.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Working Days:</span>
                  <span className="font-medium">{workingDays.filter(d => d.active).length}</span>
                </div>
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-xs">
                      {new Date(selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center">
                <Save className="w-4 h-4 mr-2" />
                Save Schedule
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Preview Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentSlots;