import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Upload, Camera, User, Calendar, Thermometer, Ruler, Weight, Activity, Clock } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import { useNavigate } from 'react-router-dom';

const HealthComplaint = () => {
  const { goBack } = useConsultationFlow();
  const navigate = useNavigate();
  const healthConditionRef = useRef(null);
  const complaintSinceWhenRef = useRef(null);
  const bloodPressureRef = useRef(null);

  // Separate state for each field
  const [healthCondition, setHealthCondition] = useState('');
  const [complaintSinceWhen, setComplaintSinceWhen] = useState('');
  const [temperature, setTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('°C');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bloodPressure, setBloodPressure] = useState('');
  const [pulse, setPulse] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    healthCondition: false,
    complaintSinceWhen: false,
    temperatureUnit: false,
    heightUnit: false,
    weightUnit: false
  });

  const healthConditions = [
    'Running temperature',
    'Headache',
    'Fever',
    'Cough',
    'Sore throat',
    'Nausea',
    'Fatigue',
    'Stomach ache',
    'Dizziness'
  ];

  const timeOptions = [
    '3 days',
    '1 week',
    '2 weeks',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
    'More than 1 year'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (healthConditionRef.current && !healthConditionRef.current.contains(event.target)) {
        setIsDropdownOpen(prev => ({ ...prev, healthCondition: false }));
      }
      if (complaintSinceWhenRef.current && !complaintSinceWhenRef.current.contains(event.target)) {
        setIsDropdownOpen(prev => ({ ...prev, complaintSinceWhen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleNumericInput = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleBloodPressureInput = (e) => {
    let value = e.target.value;
    // Remove any characters that are not digits or a single slash
    value = value.replace(/[^0-9/]/g, '');

    // Split by slash
    const parts = value.split('/');
    const systolic = parts[0] || '';
    const diastolic = parts[1] || '';

    // Allow empty input
    if (value === '') {
      setBloodPressure('');
      return;
    }

    // Prevent multiple slashes
    if (parts.length > 2) {
      return;
    }

    // Remove slash if diastolic is empty and set cursor to end of systolic
    if (diastolic === '' && value.includes('/')) {
      setBloodPressure(systolic);
      setTimeout(() => {
        if (bloodPressureRef.current) {
          bloodPressureRef.current.selectionStart = systolic.length;
          bloodPressureRef.current.selectionEnd = systolic.length;
        }
      }, 0);
      return;
    }

    // Limit systolic to 3 digits, move excess to diastolic
    if (systolic.length > 3 && !value.includes('/')) {
      const newSystolic = systolic.slice(0, 3);
      const newDiastolic = systolic.slice(3);
      value = `${newSystolic}/${newDiastolic}`;
      setBloodPressure(value);
      setTimeout(() => {
        if (bloodPressureRef.current) {
          bloodPressureRef.current.selectionStart = value.length;
          bloodPressureRef.current.selectionEnd = value.length;
        }
      }, 0);
      return;
    }

    // Limit diastolic to 3 digits
    if (diastolic.length > 3) {
      return;
    }

    // Automatically add slash after 3 digits if no slash exists
    if (systolic.length === 3 && !value.includes('/')) {
      value = `${systolic}/`;
      setBloodPressure(value);
      setTimeout(() => {
        if (bloodPressureRef.current) {
          bloodPressureRef.current.selectionStart = value.length;
          bloodPressureRef.current.selectionEnd = value.length;
        }
      }, 0);
      return;
    }

    setBloodPressure(value);
  };

  const handleAutocomplete = (value, options, setter, dropdownKey) => {
    setter(value);
    setIsDropdownOpen(prev => ({ ...prev, [dropdownKey]: true }));
  };

  const filteredHealthConditions = healthCondition
    ? healthConditions.filter(option => 
        option.toLowerCase().includes(healthCondition.toLowerCase())
      )
    : healthConditions;

  const filteredTimeOptions = complaintSinceWhen
    ? timeOptions.filter(option => 
        option.toLowerCase().includes(complaintSinceWhen.toLowerCase())
      )
    : timeOptions;

  const handleSubmit = () => {
    const formData = {
      healthCondition,
      complaintSinceWhen,
      temperature,
      temperatureUnit,
      height,
      heightUnit,
      bloodPressure,
      pulse,
      weight,
      weightUnit,
      fileName,
      description
    };
    navigate("/patient/doctors");
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-2">
        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-4">
            <User className="w-6 h-6 text-emerald-600" />
          </div>

          {/* Patient Info */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Niaz Ahmed</h2>
                <p className="text-gray-600 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  24 January 1997
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Health Information Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Health Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Health Condition Field */}
                <div ref={healthConditionRef}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Health Condition</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Thermometer className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={healthCondition}
                      onChange={(e) => handleAutocomplete(e.target.value, healthConditions, setHealthCondition, 'healthCondition')}
                      onFocus={() => setIsDropdownOpen(prev => ({ ...prev, healthCondition: true }))}
                      placeholder="Enter or select health condition"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                    />
                    {isDropdownOpen.healthCondition && filteredHealthConditions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredHealthConditions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setHealthCondition(option);
                              setIsDropdownOpen(prev => ({ ...prev, healthCondition: false }));
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {/* Complaint Since When Field */}
                <div ref={complaintSinceWhenRef}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Complaint Since When</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={complaintSinceWhen}
                      onChange={(e) => handleAutocomplete(e.target.value, timeOptions, setComplaintSinceWhen, 'complaintSinceWhen')}
                      onFocus={() => setIsDropdownOpen(prev => ({ ...prev, complaintSinceWhen: true }))}
                      placeholder="Enter or select duration"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                    />
                    {isDropdownOpen.complaintSinceWhen && filteredTimeOptions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredTimeOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setComplaintSinceWhen(option);
                              setIsDropdownOpen(prev => ({ ...prev, complaintSinceWhen: false }));
                            }}
                            className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

                {/* Temperature Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Temperature</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Thermometer className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={temperature}
                        onChange={handleNumericInput(setTemperature)}
                        onInput={handleNumericInput(setTemperature)}
                        placeholder={temperatureUnit === '°C' ? '37.0' : '98.6'}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                      />
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-sm">
                        {temperatureUnit}
                      </span>
                    </div>
                    <div className="relative w-24">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(prev => ({ ...prev, temperatureUnit: !prev.temperatureUnit }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500"
                      >
                        <span className="text-gray-800">{temperatureUnit}</span>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isDropdownOpen.temperatureUnit ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isDropdownOpen.temperatureUnit && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['°C', '°F'].map((unit, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setTemperatureUnit(unit);
                                setIsDropdownOpen(prev => ({ ...prev, temperatureUnit: false }));
                              }}
                              className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {unit}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Height Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Height</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Ruler className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={height}
                        onChange={handleNumericInput(setHeight)}
                        onInput={handleNumericInput(setHeight)}
                        placeholder={heightUnit === 'cm' ? '170.0' : '5.7'}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                      />
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-sm">
                        {heightUnit}
                      </span>
                    </div>
                    <div className="relative w-24">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(prev => ({ ...prev, heightUnit: !prev.heightUnit }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500"
                      >
                        <span className="text-gray-800">{heightUnit}</span>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isDropdownOpen.heightUnit ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isDropdownOpen.heightUnit && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['cm', 'ft/in'].map((unit, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setHeightUnit(unit);
                                setIsDropdownOpen(prev => ({ ...prev, heightUnit: false }));
                              }}
                              className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {unit}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Blood Pressure Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blood Pressure (mmHg)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      ref={bloodPressureRef}
                      value={bloodPressure}
                      onChange={handleBloodPressureInput}
                      placeholder="120/80"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                    />
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-sm">
                      mmHg
                    </span>
                  </div>
                </div>

                {/* Pulse Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Pulse (bpm)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={pulse}
                      onChange={handleNumericInput(setPulse)}
                      onInput={handleNumericInput(setPulse)}
                      placeholder="73"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                    />
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-sm">
                      bpm
                    </span>
                  </div>
                </div>

                {/* Weight Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Weight</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Weight className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={weight}
                        onChange={handleNumericInput(setWeight)}
                        onInput={handleNumericInput(setWeight)}
                        placeholder={weightUnit === 'kg' ? '50.0' : '110.0'}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500 pl-10"
                      />
                      <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 text-sm">
                        {weightUnit}
                      </span>
                    </div>
                    <div className="relative w-24">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(prev => ({ ...prev, weightUnit: !prev.weightUnit }))}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm pr-12 h-12 flex items-center border-gray-200 focus:border-green-500"
                      >
                        <span className="text-gray-800">{weightUnit}</span>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${isDropdownOpen.weightUnit ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isDropdownOpen.weightUnit && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                          {['kg', 'lbs'].map((unit, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setWeightUnit(unit);
                                setIsDropdownOpen(prev => ({ ...prev, weightUnit: false }));
                              }}
                              className="w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-green-50 focus:bg-green-50 focus:outline-none transition duration-200 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {unit}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Upload File
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                  {fileName ? (
                    <Camera className="w-10 h-10 text-emerald-600" />
                  ) : (
                    <Camera className="w-10 h-10 text-emerald-600" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="inline-flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-sm font-semibold hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm">
                      <Upload className="w-4 h-4 text-gray-400" />
                      {fileName || 'Upload Photo'}
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a JPG, PNG, or GIF file (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 bg-gray-50 border border-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthComplaint;