import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  DollarSign,
  Save,
  Copy,
  Trash2,
  Edit3,
  CheckCircle,
  AlertCircle,
  Users,
  Monitor,
  Building,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const CreateAppointmentSlots = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-01');
  const [showPreview, setShowPreview] = useState(false);
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState({
    startTime: '09:00',
    endTime: '10:00',
    type: 'online',
    serviceType: 'private',
    price: '',
    location: '',
    maxPatients: 1
  });

  // Mock doctor profile data
  const doctorProfile = {
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiologist',
    clinicAddress: 'Ahmed Medical Center, 123 Gulberg Main Blvd, Lahore',
    workingWithAngill: true,
    angillFixedRate: 50,
    privateRates: {
      onlineConsultation: 120,
      physicalVisit: 180
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const addSlot = () => {
    if (!currentSlot.startTime || !currentSlot.endTime) return;
    
    const newSlot = {
      id: Date.now(),
      ...currentSlot,
      date: selectedDate,
      price: currentSlot.serviceType === 'angill' ? doctorProfile.angillFixedRate : currentSlot.price
    };
    
    setSlots([...slots, newSlot]);
    setCurrentSlot({
      startTime: '',
      endTime: '',
      type: 'online',
      serviceType: 'private',
      price: '',
      location: '',
      maxPatients: 1
    });
  };

  const removeSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const duplicateSlot = (slot) => {
    const newSlot = {
      ...slot,
      id: Date.now(),
      startTime: '',
      endTime: ''
    };
    setSlots([...slots, newSlot]);
  };

  const getSlotTypeIcon = (type) => {
    return type === 'online' ? <Video className="w-5 h-5 text-green-600" /> : <MapPin className="w-5 h-5 text-green-600" />;
  };

  const getServiceTypeColor = (serviceType) => {
    return serviceType === 'angill' ? 'bg-green-100 text-green-700' : 'bg-teal-100 text-teal-700';
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const diff = (endTime - startTime) / (1000 * 60);
    return `${diff} min`;
  };

  const getDaysOfWeek = () => {
    const today = new Date();
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Appointment Slots</h1>
            <p className="text-sm text-gray-600 mt-1">Set your availability for patient consultations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm font-medium">{showPreview ? 'Hide Preview' : 'Preview Schedule'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save All Slots</span>
            </button>
          </div>
        </div>

        {/* Doctor Profile Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{doctorProfile.name}</h2>
              <p className="text-sm text-gray-600">{doctorProfile.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Clinic Address</span>
              </div>
              <p className="text-sm text-gray-600">{doctorProfile.clinicAddress}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Angill Rate</span>
              </div>
              <p className="text-sm text-green-600 font-semibold">${doctorProfile.angillFixedRate} (Fixed)</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Private Rates</span>
              </div>
              <p className="text-sm text-green-600">Online: ${doctorProfile.privateRates.onlineConsultation}</p>
              <p className="text-sm text-green-600">Physical: ${doctorProfile.privateRates.physicalVisit}</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {getDaysOfWeek().map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`p-3 rounded-xl text-center transition-all duration-200 transform hover:scale-105 ${
                  selectedDate === day.date
                    ? 'bg-green-500 text-white shadow-md'
                    : day.isToday
                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-sm font-medium">{day.day}</div>
                <div className="text-lg font-bold">{day.dayNum}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create New Slot */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Create New Slot</h3>
            </div>

            <div className="space-y-6">
              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <select
                    value={currentSlot.startTime}
                    onChange={(e) => setCurrentSlot({...currentSlot, startTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none bg-white transition-colors duration-200"
                  >
                    <option value="">Select start time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{formatTime(time)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <select
                    value={currentSlot.endTime}
                    onChange={(e) => setCurrentSlot({...currentSlot, endTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none bg-white transition-colors duration-200"
                  >
                    <option value="">Select end time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{formatTime(time)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, type: 'online'})}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 hover:shadow-sm ${
                      currentSlot.type === 'online'
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <Video className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Online</div>
                      <div className="text-sm text-gray-500">Video consultation</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, type: 'physical'})}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 hover:shadow-sm ${
                      currentSlot.type === 'physical'
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Physical</div>
                      <div className="text-sm text-gray-500">In-person visit</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, serviceType: 'private'})}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-sm ${
                      currentSlot.serviceType === 'private'
                        ? 'border-teal-400 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Private Doctor</div>
                        <div className="text-sm text-gray-500">Set your own rates</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${currentSlot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {doctorProfile.workingWithAngill && currentSlot.type === 'online' && (
                    <button
                      onClick={() => setCurrentSlot({...currentSlot, serviceType: 'angill'})}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-sm ${
                        currentSlot.serviceType === 'angill'
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Angill Doctor</div>
                          <div className="text-sm text-gray-500">Fixed rate, online only</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${doctorProfile.angillFixedRate}</div>
                          <div className="text-xs text-gray-500">Fixed</div>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Price for Private */}
              {currentSlot.serviceType === 'private' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Price (Optional)</label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input
                      type="number"
                      value={currentSlot.price}
                      onChange={(e) => setCurrentSlot({...currentSlot, price: e.target.value})}
                      placeholder={currentSlot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none bg-white transition-colors duration-200"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Leave empty to use default rate</p>
                </div>
              )}

              {/* Location for Physical */}
              {currentSlot.type === 'physical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input
                      type="text"
                      value={currentSlot.location}
                      onChange={(e) => setCurrentSlot({...currentSlot, location: e.target.value})}
                      placeholder={doctorProfile.clinicAddress}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none bg-white transition-colors duration-200"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Leave empty to use default clinic address</p>
                </div>
              )}

              {/* Add Slot Button */}
              <button
                onClick={addSlot}
                disabled={!currentSlot.startTime || !currentSlot.endTime}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Slot to Schedule</span>
              </button>
            </div>
          </div>

          {/* Created Slots */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Created Slots ({slots.filter(slot => slot.date === selectedDate).length})
              </h3>
              <div className="text-sm text-gray-600">
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {slots.filter(slot => slot.date === selectedDate).length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-green-200 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No slots created for this date</p>
                  <p className="text-sm text-gray-500 mt-1">Add your first slot using the form</p>
                </div>
              ) : (
                slots
                  .filter(slot => slot.date === selectedDate)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((slot) => (
                    <div key={slot.id} className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            {getSlotTypeIcon(slot.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({calculateDuration(slot.startTime, slot.endTime)})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(slot.serviceType)}`}>
                                {slot.serviceType === 'angill' ? 'Angill Doctor' : 'Private Doctor'}
                              </span>
                              <span className="text-sm text-gray-600">
                                ${slot.price || (slot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => duplicateSlot(slot)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Duplicate slot"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeSlot(slot.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="Delete slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {slot.type === 'physical' && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-600">
                              {slot.location || doctorProfile.clinicAddress}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        {showPreview && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Schedule Preview</h3>
            
            <div className="grid grid-cols-7 gap-4">
              {getDaysOfWeek().map((day) => {
                const daySlots = slots.filter(slot => slot.date === day.date);
                return (
                  <div key={day.date} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                    <div className={`p-3 text-center font-medium ${
                      day.isToday ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}>
                      <div className="text-sm">{day.day}</div>
                      <div className="text-lg font-bold">{day.dayNum}</div>
                    </div>
                    
                    <div className="p-3 space-y-2 min-h-32 bg-white">
                      {daySlots.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center">No slots</p>
                      ) : (
                        daySlots
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((slot) => (
                            <div key={slot.id} className="p-2 bg-green-50 rounded-lg text-xs">
                              <div className="font-medium text-gray-900">{formatTime(slot.startTime)}</div>
                              <div className="text-gray-600 flex items-center gap-1">
                                {getSlotTypeIcon(slot.type)}
                                <span>${slot.price || (slot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit)}</span>
                              </div>
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