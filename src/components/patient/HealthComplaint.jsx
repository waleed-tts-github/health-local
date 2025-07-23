import React, { useState } from 'react';
import { ChevronDown, Upload, Camera, User, Calendar, Thermometer, Ruler, Weight, Activity, Clock } from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import { useNavigate } from 'react-router-dom';

const HealthComplaint = () => {
  const { goBack } = useConsultationFlow();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    healthCondition: '',
    complaintSinceWhen: '',
    temperature: '',
    temperatureUnit: '°C',
    height: '',
    heightUnit: 'cm',
    bloodPressure: '',
    pulse: '',
    weight: '',
    weightUnit: 'kg',
    fileName: ''
  });

  const [customInputs, setCustomInputs] = useState({
    healthCondition: false,
    complaintSinceWhen: false,
    bloodPressure: false,
    pulse: false
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    healthCondition: false,
    complaintSinceWhen: false,
    bloodPressure: false,
    pulse: false,
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
    'Dizziness',
    'Add custom condition...'
  ];

  const timeOptions = [
    '3 days',
    '1 week',
    '2 weeks',
    '1 month',
    '3 months',
    '6 months',
    '1 year',
    'More than 1 year',
    'Add custom duration...'
  ];

  const bloodPressureOptions = [
    '120-129 systolic/diastolic',
    '90-119 systolic/diastolic',
    '130-139 systolic/diastolic',
    '140+ systolic/diastolic',
    'Add custom reading...'
  ];

  const pulseOptions = [
    '73 bpm',
    '60-70 bpm',
    '71-80 bpm',
    '81-90 bpm',
    '91-100 bpm',
    'Add custom pulse...'
  ];

  const unitOptions = {
    temperature: ['°C', '°F'],
    height: ['cm', 'ft/in'],
    weight: ['kg', 'lbs']
  };

  const handleSelectChange = (field, value) => {
    if (value.includes('Add custom')) {
      setCustomInputs(prev => ({ ...prev, [field]: true }));
      setFormData(prev => ({ ...prev, [field]: '' }));
    } else {
      setCustomInputs(prev => ({ ...prev, [field]: false }));
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setIsDropdownOpen(prev => ({ ...prev, [field]: false }));
  };

  const handleUnitChange = (field, unit) => {
    setFormData(prev => {
      let newValue = prev[field];
      if (field === 'temperature' && prev[field]) {
        newValue = unit === '°C' 
          ? ((parseFloat(prev[field]) - 32) * 5/9).toFixed(1)
          : (parseFloat(prev[field]) * 9/5 + 32).toFixed(1);
      } else if (field === 'weight' && prev[field]) {
        newValue = unit === 'kg'
          ? (parseFloat(prev[field]) / 2.20462).toFixed(1)
          : (parseFloat(prev[field]) * 2.20462).toFixed(1);
      } else if (field === 'height' && prev[field]) {
        if (unit === 'cm') {
          const [feet, inches] = prev[field].split('.').map(Number);
          newValue = ((feet * 30.48) + (inches * 2.54)).toFixed(1);
        } else {
          const cm = parseFloat(prev[field]);
          const feet = Math.floor(cm / 30.48);
          const inches = ((cm % 30.48) / 2.54).toFixed(1);
          newValue = `${feet}.${inches}`;
        }
      }
      return { ...prev, [field]: newValue, [`${field}Unit`]: unit };
    });
    setIsDropdownOpen(prev => ({ ...prev, [`${field}Unit`]: false }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const CustomSelect = ({ field, options, label, placeholder, icon: Icon }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-900 mb-1">{label}</label>
      <div className="relative">
        {customInputs[field] ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter custom ${placeholder.toLowerCase()}`}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-gray-900"
            />
            <button
              onClick={() => {
                setCustomInputs(prev => ({ ...prev, [field]: false }));
                setFormData(prev => ({ ...prev, [field]: '' }));
                setIsDropdownOpen(prev => ({ ...prev, [field]: true }));
              }}
              className="absolute right-3 top-3.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(prev => ({ ...prev, [field]: !prev[field] }))}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className={formData[field] ? 'text-gray-900' : 'text-gray-500'}>
                  {formData[field] || placeholder}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen[field] ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen[field] && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                {options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectChange(field, option)}
                    className="w-full px-4 py-3 text-sm text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-all duration-200 first:rounded-t-lg last:rounded-b-lg text-gray-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const InputField = ({ label, value, name, placeholder, icon: Icon, type = "text", unitField }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-900 mb-1">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg shadow-sm text-gray-900"
          />
        </div>
        <div className="relative w-24">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(prev => ({ ...prev, [unitField]: !prev[unitField] }))}
            className="w-full px-2 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg flex items-center justify-between shadow-sm"
          >
            <span className="text-gray-900">{formData[unitField]}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen[unitField] ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen[unitField] && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl">
              {unitOptions[name].map((unit, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleUnitChange(name, unit)}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none transition-all duration-200 first:rounded-t-lg last:rounded-b-lg text-gray-900"
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const handleSubmit = () => {
    navigate("/patient/home");
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-2">
        {/* Header */}
        <div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-xl border border-gray-100 p-4 mb-4"
        >
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Health Complaint</h1>
            <p className="text-gray-600 text-xs">Please provide your health details</p>
          </div>
        </div>

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
                <CustomSelect
                  field="healthCondition"
                  options={healthConditions}
                  label="Health Condition"
                  placeholder="Select health condition"
                  icon={Thermometer}
                />
                <CustomSelect
                  field="complaintSinceWhen"
                  options={timeOptions}
                  label="Complaint Since When"
                  placeholder="Select duration"
                  icon={Clock}
                />
                <InputField
                  label="Temperature"
                  name="temperature"
                  value={formData.temperature}
                  placeholder={formData.temperatureUnit === '°C' ? '37 °C' : '98.6 °F'}
                  icon={Thermometer}
                  unitField="temperatureUnit"
                />
                <InputField
                  label="Height"
                  name="height"
                  value={formData.height}
                  placeholder={formData.heightUnit === 'cm' ? '170 cm' : '5.7 ft/in'}
                  icon={Ruler}
                  unitField="heightUnit"
                />
                <CustomSelect
                  field="bloodPressure"
                  options={bloodPressureOptions}
                  label="Blood Pressure (mmHg)"
                  placeholder="Select blood pressure"
                  icon={Activity}
                />
                <CustomSelect
                  field="pulse"
                  options={pulseOptions}
                  label="Pulse (bpm)"
                  placeholder="Select pulse"
                  icon={Activity}
                />
                <InputField
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  placeholder={formData.weightUnit === 'kg' ? '50 kg' : '110 lbs'}
                  icon={Weight}
                  unitField="weightUnit"
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Upload File
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden">
                  {formData.fileName ? (
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
                      {formData.fileName || 'Upload Photo'}
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
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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