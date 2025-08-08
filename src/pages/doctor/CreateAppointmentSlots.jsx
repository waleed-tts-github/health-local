import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CreateAppointmentSlots = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-08');
  const [showPreview, setShowPreview] = useState(false);
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({
    startTime: '09:00',
    duration: '30',
    type: 'online',
    serviceType: 'private',
    location: ''
  });
  const [timeRange, setTimeRange] = useState(''); // For bulk slot creation

  // Mock doctor profile data
  const doctorProfile = {
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiologist',
    clinicAddress: 'Ahmed Medical Center, 123 Gulberg Main Blvd, Lahore',
    workingWithAngill: true
  };

  // Generate time slots (30-minute intervals)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, '0');
    const minutes = (i % 2 === 0) ? '00' : '30';
    return `${hours}:${minutes}`;
  });

  // Validate and add a single slot
  const addSingleSlot = () => {
    if (!currentSlot.startTime || !currentSlot.duration) return;

    const startTime = new Date(`1970-01-01T${currentSlot.startTime}:00`);
    const duration = parseInt(currentSlot.duration);
    const endTime = new Date(startTime.getTime() + duration * 60000);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    // Check for overlapping slots
    const hasOverlap = slots.some(slot => 
      slot.date === selectedDate &&
      slot.serviceType !== currentSlot.serviceType &&
      (
        (slot.startTime <= currentSlot.startTime && currentSlot.startTime < slot.endTime) ||
        (currentSlot.startTime <= slot.startTime && slot.startTime < endTimeStr)
      )
    );

    if (hasOverlap) {
      alert('This slot overlaps with an existing slot of a different service type.');
      return;
    }

    const newSlot = {
      id: Date.now(),
      date: selectedDate,
      startTime: currentSlot.startTime,
      endTime: endTimeStr,
      type: currentSlot.type,
      serviceType: currentSlot.serviceType,
      location: currentSlot.type === 'physical' ? (currentSlot.location || doctorProfile.clinicAddress) : ''
    };

    setSlots([...slots, newSlot]);
    setCurrentSlot({
      startTime: '',
      duration: '30',
      type: 'online',
      serviceType: 'private',
      location: ''
    });
  };

  // Add multiple slots for a time range
  const addTimeRangeSlots = () => {
    if (!timeRange || !currentSlot.startTime || !currentSlot.serviceType || !currentSlot.type) return;

    const rangeHours = parseInt(timeRange);
    const startTime = new Date(`1970-01-01T${currentSlot.startTime}:00`);
    const newSlots = [];
    const slotDuration = 30; // Fixed 30-minute slots

    for (let i = 0; i < rangeHours * 2; i++) { // 2 slots per hour
      const slotStart = new Date(startTime.getTime() + i * slotDuration * 60000);
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
      const startTimeStr = `${slotStart.getHours().toString().padStart(2, '0')}:${slotStart.getMinutes().toString().padStart(2, '0')}`;
      const endTimeStr = `${slotEnd.getHours().toString().padStart(2, '0')}:${slotEnd.getMinutes().toString().padStart(2, '0')}`;

      // Check for overlaps
      const hasOverlap = slots.some(slot => 
        slot.date === selectedDate &&
        slot.serviceType !== currentSlot.serviceType &&
        (
          (slot.startTime <= startTimeStr && startTimeStr < slot.endTime) ||
          (startTimeStr <= slot.startTime && slot.startTime < endTimeStr)
        )
      );

      if (!hasOverlap) {
        newSlots.push({
          id: Date.now() + i,
          date: selectedDate,
          startTime: startTimeStr,
          endTime: endTimeStr,
          type: currentSlot.type,
          serviceType: currentSlot.serviceType,
          location: currentSlot.type === 'physical' ? (currentSlot.location || doctorProfile.clinicAddress) : ''
        });
      }
    }

    if (newSlots.length === 0) {
      alert('Cannot create slots due to conflicts with existing slots.');
      return;
    }

    setSlots([...slots, ...newSlots]);
    setCurrentSlot({
      startTime: '',
      duration: '30',
      type: 'online',
      serviceType: 'private',
      location: ''
    });
    setTimeRange('');
  };

  // Remove a slot
  const removeSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  // Format time for display
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Get days of the week
  const getDaysOfWeek = () => {
    const today = new Date('2025-08-08');
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        isToday: i === 0
      });
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create Appointment Slots</h1>
            <p className="text-sm text-gray-600">Set your availability for patient consultations</p>
          </div>
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-sm font-medium">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
        </div>

        {/* Doctor Profile Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{doctorProfile.name}</h2>
              <p className="text-sm text-gray-600">{doctorProfile.specialty}</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="flex flex-wrap gap-2">
            {getDaysOfWeek().map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDate === day.date
                    ? 'bg-green-500 text-white'
                    : day.isToday
                    ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-green-50'
                }`}
              >
                {day.day} {day.dayNum}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create New Slot */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Slot</h3>
            <div className="space-y-4">
              {/* Time Range Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Time Range (Bulk)</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Select range for multiple slots</option>
                  <option value="1">1 hour (2 slots)</option>
                  <option value="2">2 hours (4 slots)</option>
                  <option value="3">3 hours (6 slots)</option>
                </select>
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start Time</label>
                <select
                  value={currentSlot.startTime}
                  onChange={(e) => setCurrentSlot({...currentSlot, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Select start time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{formatTime(time)}</option>
                  ))}
                </select>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Consultation Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, type: 'online'})}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      currentSlot.type === 'online'
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-green-50'
                    }`}
                  >
                    <Video className="w-4 h-4 inline mr-2" /> Online
                  </button>
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, type: 'physical'})}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      currentSlot.type === 'physical'
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-green-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 inline mr-2" /> Physical
                  </button>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Service Type</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, serviceType: 'private'})}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      currentSlot.serviceType === 'private'
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-green-50'
                    }`}
                  >
                    Private Doctor
                  </button>
                  {doctorProfile.workingWithAngill && currentSlot.type === 'online' && (
                    <button
                      onClick={() => setCurrentSlot({...currentSlot, serviceType: 'angill'})}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        currentSlot.serviceType === 'angill'
                          ? 'bg-green-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-900 hover:bg-green-50'
                      }`}
                    >
                      Angill Doctor
                    </button>
                  )}
                </div>
              </div>

              {/* Location for Physical */}
              {currentSlot.type === 'physical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                  <input
                    type="text"
                    value={currentSlot.location}
                    onChange={(e) => setCurrentSlot({...currentSlot, location: e.target.value})}
                    placeholder={doctorProfile.clinicAddress}
                    className="w-full px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              )}

              {/* Add Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={addSingleSlot}
                  disabled={!currentSlot.startTime}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 inline mr-2" /> Add Single Slot
                </button>
                <button
                  onClick={addTimeRangeSlots}
                  disabled={!timeRange || !currentSlot.startTime}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 inline mr-2" /> Add Range Slots
                </button>
              </div>
            </div>
          </div>

          {/* Created Slots */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Created Slots ({slots.filter(slot => slot.date === selectedDate).length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {slots.filter(slot => slot.date === selectedDate).length === 0 ? (
                <div className="text-center py-4">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No slots created for this date</p>
                </div>
              ) : (
                slots
                  .filter(slot => slot.date === selectedDate)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          {slot.type === 'online' ? (
                            <Video className="w-4 h-4 text-white" />
                          ) : (
                            <MapPin className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {slot.serviceType === 'angill' ? 'Angill Doctor' : 'Private Doctor'}
                            {slot.type === 'physical' && ` - ${slot.location || doctorProfile.clinicAddress}`}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSlot(slot.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        {showPreview && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule Preview</h3>
            <div className="grid grid-cols-7 gap-2">
              {getDaysOfWeek().map((day) => {
                const daySlots = slots.filter(slot => slot.date === day.date);
                return (
                  <div key={day.date} className="border border-gray-200 rounded-lg p-2">
                    <div className="text-center text-sm font-medium text-gray-900">
                      {day.day} {day.dayNum}
                    </div>
                    <div className="mt-2 space-y-1">
                      {daySlots.length === 0 ? (
                        <p className="text-xs text-gray-600 text-center">No slots</p>
                      ) : (
                        daySlots
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((slot) => (
                            <div key={slot.id} className="text-xs text-green-600">
                              {formatTime(slot.startTime)} - {slot.type === 'online' ? 'Online' : 'Physical'}
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAppointmentSlots;