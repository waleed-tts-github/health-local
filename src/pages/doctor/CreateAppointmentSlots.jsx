import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  AlertCircle,
  Edit2
} from 'lucide-react';

const CreateAppointmentSlots = () => {
  const [viewingDate, setViewingDate] = useState('2025-08-08');
  const [selectedDates, setSelectedDates] = useState(['2025-08-08']);
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({
    startTime: '',
    endTime: '',
    type: 'online',
    serviceType: 'private',
    location: '',
    date: '2025-08-08'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Mock doctor profile data
  const doctorProfile = {
    clinicAddress: 'Ahmed Medical Center, 123 Gulberg Main Blvd, Lahore',
    workingWithAngill: true
  };

  // Generate time slots (30-minute intervals)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, '0');
    const minutes = (i % 2 === 0) ? '00' : '30';
    return `${hours}:${minutes}`;
  });

  useEffect(() => {
    if (isEditing && currentSlot.startTime) {
      const start = new Date(`1970-01-01T${currentSlot.startTime}:00`);
      const end = new Date(start.getTime() + 30 * 60000);
      const endHour = end.getHours().toString().padStart(2, '0');
      const endMin = end.getMinutes().toString().padStart(2, '0');
      setCurrentSlot(prev => ({ ...prev, endTime: `${endHour}:${endMin}` }));
    }
  }, [currentSlot.startTime, isEditing]);

  // Toggle selected date for adding
  const toggleSelectedDate = (date) => {
    setSelectedDates(prev => 
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  // Get available time slots for the selected date
  const getAvailableTimeSlots = (date) => {
    const bookedSlots = slots.filter(slot => slot.date === date && (!isEditing || slot.id !== editingId));
    return timeSlots.filter(time => {
      const start = new Date(`1970-01-01T${time}:00`);
      const end = new Date(start.getTime() + 30 * 60000);
      const endTimeStr = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
      
      return !bookedSlots.some(slot => 
        (slot.startTime <= time && time < slot.endTime) ||
        (time < slot.startTime && slot.startTime < endTimeStr)
      );
    });
  };

  // Validate and add slots between start and end time for selected dates
  const addSlots = () => {
    if (!currentSlot.startTime || !currentSlot.endTime || selectedDates.length === 0) return;

    const start = new Date(`1970-01-01T${currentSlot.startTime}:00`);
    const end = new Date(`1970-01-01T${currentSlot.endTime}:00`);
    
    if (start >= end) {
      alert('End time must be after start time');
      return;
    }

    const duration = 30; // 30-minute slots
    const newSlots = [];
    for (const date of selectedDates) {
      let currentTime = start;
      while (currentTime < end) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(slotStart.getTime() + duration * 60000);
        
        if (slotEnd > end) break;

        const startTimeStr = `${slotStart.getHours().toString().padStart(2, '0')}:${slotStart.getMinutes().toString().padStart(2, '0')}`;
        const endTimeStr = `${slotEnd.getHours().toString().padStart(2, '0')}:${slotEnd.getMinutes().toString().padStart(2, '0')}`;

        const hasOverlap = slots.some(slot => 
          slot.date === date &&
          (
            (slot.startTime <= startTimeStr && startTimeStr < slot.endTime) ||
            (startTimeStr <= slot.startTime && slot.startTime < endTimeStr)
          )
        );

        if (!hasOverlap) {
          newSlots.push({
            id: Date.now() + newSlots.length,
            date,
            startTime: startTimeStr,
            endTime: endTimeStr,
            type: currentSlot.type,
            serviceType: currentSlot.serviceType,
            location: currentSlot.type === 'physical' ? (currentSlot.location || doctorProfile.clinicAddress) : ''
          });
        }

        currentTime = slotEnd;
      }
    }

    if (newSlots.length === 0) {
      alert('Cannot create slots due to conflicts with existing slots.');
      return;
    }

    setSlots([...slots, ...newSlots]);
    setCurrentSlot({
      startTime: '',
      endTime: '',
      type: 'online',
      serviceType: 'private',
      location: '',
      date: '2025-08-08'
    });
    setSelectedDates(['2025-08-08']);
  };

  // Update an existing slot
  const updateSlot = () => {
    if (!currentSlot.startTime || !currentSlot.endTime || !currentSlot.date) return;

    const start = new Date(`1970-01-01T${currentSlot.startTime}:00`);
    const end = new Date(`1970-01-01T${currentSlot.endTime}:00`);
    
    if (start >= end || (end - start) / 60000 !== 30) {
      alert('Slot must be exactly 30 minutes');
      return;
    }

    const startTimeStr = currentSlot.startTime;
    const endTimeStr = currentSlot.endTime;
    const date = currentSlot.date;

    const hasOverlap = slots.some(s => 
      s.id !== editingId &&
      s.date === date &&
      (
        (s.startTime <= startTimeStr && startTimeStr < s.endTime) ||
        (startTimeStr <= s.startTime && s.startTime < endTimeStr)
      )
    );

    if (hasOverlap) {
      alert('Cannot update slot due to conflicts with existing slots.');
      return;
    }

    const updatedSlots = slots.map(s => 
      s.id === editingId ? {
        ...s,
        date,
        startTime: startTimeStr,
        endTime: endTimeStr,
        type: currentSlot.type,
        serviceType: currentSlot.serviceType,
        location: currentSlot.type === 'physical' ? (currentSlot.location || doctorProfile.clinicAddress) : ''
      } : s
    );

    setSlots(updatedSlots);
    setIsEditing(false);
    setEditingId(null);
    setCurrentSlot({
      startTime: '',
      endTime: '',
      type: 'online',
      serviceType: 'private',
      location: '',
      date: '2025-08-08'
    });
    setSelectedDates(['2025-08-08']);
  };

  // Start editing a slot
  const editSlot = (id) => {
    const slot = slots.find(s => s.id === id);
    if (slot) {
      setCurrentSlot({
        startTime: slot.startTime,
        endTime: slot.endTime,
        type: slot.type,
        serviceType: slot.serviceType,
        location: slot.location,
        date: slot.date
      });
      setSelectedDates([slot.date]);
      setViewingDate(slot.date);
      setIsEditing(true);
      setEditingId(id);
    }
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create New Slot */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{isEditing ? 'Edit Slot' : 'Create New Slot'}</h3>
            <div className="space-y-4">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Service Type</label>
                <div className="grid grid-cols-2 gap-2">
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
                  {doctorProfile.workingWithAngill && (
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

              {/* Dates Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {isEditing ? 'Select Date' : 'Select Dates to Add Slots'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {getDaysOfWeek().map((day) => (
                    <button
                      key={day.date}
                      onClick={() => {
                        if (isEditing) {
                          setCurrentSlot({...currentSlot, date: day.date});
                          setSelectedDates([day.date]);
                        } else {
                          toggleSelectedDate(day.date);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        (isEditing ? currentSlot.date === day.date : selectedDates.includes(day.date))
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

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start Time</label>
                <select
                  value={currentSlot.startTime}
                  onChange={(e) => setCurrentSlot({...currentSlot, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Select start time</option>
                  {(isEditing ? getAvailableTimeSlots(currentSlot.date) : timeSlots).map(time => (
                    <option key={time} value={time}>{formatTime(time)}</option>
                  ))}
                </select>
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">End Time {isEditing && '(fixed to 30 min)'}</label>
                <select
                  value={currentSlot.endTime}
                  onChange={(e) => setCurrentSlot({...currentSlot, endTime: e.target.value})}
                  disabled={isEditing}
                  className="w-full px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none disabled:bg-gray-100"
                >
                  <option value="">Select end time</option>
                  {(isEditing ? getAvailableTimeSlots(currentSlot.date) : timeSlots).map(time => (
                    <option 
                      key={time} 
                      value={time}
                      disabled={currentSlot.startTime && time <= currentSlot.startTime}
                    >
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
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

              {/* Add/Update Button */}
              <button
                onClick={isEditing ? updateSlot : addSlots}
                disabled={!currentSlot.startTime || !currentSlot.endTime || (!isEditing && selectedDates.length === 0)}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 inline mr-2" /> {isEditing ? 'Update Slot' : 'Add Slots'}
              </button>

              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setCurrentSlot({
                      startTime: '',
                      endTime: '',
                      type: 'online',
                      serviceType: 'private',
                      location: '',
                      date: '2025-08-08'
                    });
                    setSelectedDates(['2025-08-08']);
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>

          {/* Created Slots */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Created Slots ({slots.filter(slot => slot.date === viewingDate).length})
              </h3>
              <select
                value={viewingDate}
                onChange={(e) => setViewingDate(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-900"
              >
                {getDaysOfWeek().map((day) => (
                  <option key={day.date} value={day.date}>
                    {day.day} {day.dayNum}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {slots.filter(slot => slot.date === viewingDate).length === 0 ? (
                <div className="text-center py-4">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No slots created for this date</p>
                </div>
              ) : (
                slots
                  .filter(slot => slot.date === viewingDate)
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
                            {slot.serviceType === 'angill' ? 'Angill Doctor' : 'Private Doctor'} - {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                            {slot.type === 'physical' && ` - ${slot.location || doctorProfile.clinicAddress}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editSlot(slot.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeSlot(slot.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
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
                            {formatTime(slot.startTime)} - {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)} ({slot.serviceType.charAt(0).toUpperCase() + slot.serviceType.slice(1)})
                          </div>
                        ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentSlots;