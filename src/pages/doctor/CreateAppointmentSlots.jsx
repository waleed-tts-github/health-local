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
    return type === 'online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  const getServiceTypeColor = (serviceType) => {
    return serviceType === 'angill' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Appointment Slots</h1>
            <p className="text-gray-600 mt-1">Set your availability for patient consultations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide Preview' : 'Preview Schedule'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Save className="w-4 h-4" />
              Save All Slots
            </button>
          </div>
        </div>

        {/* Doctor Profile Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{doctorProfile.name}</h2>
              <p className="text-gray-600">{doctorProfile.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Clinic Address</span>
              </div>
              <p className="text-sm text-gray-600">{doctorProfile.clinicAddress}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-700">Angill Rate</span>
              </div>
              <p className="text-sm text-green-600 font-semibold">${doctorProfile.angillFixedRate} (Fixed)</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-700">Private Rates</span>
              </div>
              <p className="text-sm text-blue-600">Online: ${doctorProfile.privateRates.onlineConsultation}</p>
              <p className="text-sm text-blue-600">Physical: ${doctorProfile.privateRates.physicalVisit}</p>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {getDaysOfWeek().map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`p-4 rounded-xl text-center transition-colors ${
                  selectedDate === day.date
                    ? 'bg-green-500 text-white'
                    : day.isToday
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">{day.day}</div>
                <div className="text-lg font-bold">{day.dayNum}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create New Slot */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    className={`p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                      currentSlot.type === 'online'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Online</div>
                      <div className="text-sm opacity-75">Video consultation</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setCurrentSlot({...currentSlot, type: 'physical'})}
                    className={`p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                      currentSlot.type === 'physical'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Physical</div>
                      <div className="text-sm opacity-75">In-person visit</div>
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
                    className={`p-4 rounded-xl border-2 transition-colors text-left ${
                      currentSlot.serviceType === 'private'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Private Doctor</div>
                        <div className="text-sm opacity-75">Set your own rates</div>
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
                      className={`p-4 rounded-xl border-2 transition-colors text-left ${
                        currentSlot.serviceType === 'angill'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Angill Doctor</div>
                          <div className="text-sm opacity-75">Fixed rate, online only</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${doctorProfile.angillFixedRate}</div>
                          <div className="text-xs opacity-75">Fixed</div>
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
                    <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={currentSlot.price}
                      onChange={(e) => setCurrentSlot({...currentSlot, price: e.target.value})}
                      placeholder={currentSlot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Leave empty to use default rate</p>
                </div>
              )}

              {/* Location for Physical */}
              {currentSlot.type === 'physical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={currentSlot.location}
                    onChange={(e) => setCurrentSlot({...currentSlot, location: e.target.value})}
                    placeholder={doctorProfile.clinicAddress}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Leave empty to use default clinic address</p>
                </div>
              )}

              {/* Add Slot Button */}
              <button
                onClick={addSlot}
                disabled={!currentSlot.startTime || !currentSlot.endTime}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add Slot to Schedule
              </button>
            </div>
          </div>

          {/* Created Slots */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Created Slots ({slots.filter(slot => slot.date === selectedDate).length})
              </h3>
              <div className="text-sm text-gray-500">
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
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No slots created for this date</p>
                  <p className="text-sm text-gray-400 mt-1">Add your first slot using the form</p>
                </div>
              ) : (
                slots
                  .filter(slot => slot.date === selectedDate)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((slot) => (
                    <div key={slot.id} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
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
                            className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                            title="Duplicate slot"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeSlot(slot.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {slot.type === 'physical' && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Schedule Preview</h3>
            
            <div className="grid grid-cols-7 gap-4">
              {getDaysOfWeek().map((day) => {
                const daySlots = slots.filter(slot => slot.date === day.date);
                return (
                  <div key={day.date} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className={`p-3 text-center font-medium ${
                      day.isToday ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}>
                      <div className="text-sm">{day.day}</div>
                      <div className="text-lg">{day.dayNum}</div>
                    </div>
                    
                    <div className="p-3 space-y-2 min-h-32">
                      {daySlots.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center">No slots</p>
                      ) : (
                        daySlots
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((slot) => (
                            <div key={slot.id} className="p-2 bg-gray-50 rounded text-xs">
                              <div className="font-medium">{formatTime(slot.startTime)}</div>
                              <div className="text-gray-600 flex items-center gap-1">
                                {getSlotTypeIcon(slot.type)}
                                ${slot.price || (slot.type === 'online' ? doctorProfile.privateRates.onlineConsultation : doctorProfile.privateRates.physicalVisit)}
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