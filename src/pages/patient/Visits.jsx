import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, MapPin, User, Heart, Thermometer, Activity, Stethoscope, FileText, Video, Building, Weight, Ruler } from 'lucide-react';

const Visits = () => {
  const [expandedVisit, setExpandedVisit] = useState(null);

  // Sample visit data
  const visits = [
    {
      id: 1,
      date: '2024-08-15',
      time: '10:30 AM',
      type: 'Physical',
      location: 'Main Clinic - Room 205',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      status: 'Completed',
      vitalSigns: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '165 lbs',
        height: '5\'8"',
        oxygenSaturation: '98%'
      },
      examination: {
        chiefComplaint: 'Routine annual physical examination',
        physicalExam: 'Patient appears well. Heart rate regular, no murmurs. Lungs clear bilaterally. Abdomen soft, non-tender.',
        notes: 'Patient reports feeling well overall. No acute concerns. Discussed preventive care and lifestyle modifications.'
      },
      diagnosis: {
        primary: 'Z00.00 - Encounter for general adult medical examination without abnormal findings',
        secondary: [],
        recommendations: [
          'Continue current exercise routine',
          'Maintain healthy diet',
          'Schedule annual mammogram',
          'Return in 1 year for routine follow-up'
        ]
      }
    },
    {
      id: 2,
      date: '2024-07-22',
      time: '2:15 PM',
      type: 'Online',
      location: 'Telemedicine',
      doctor: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      status: 'Completed',
      vitalSigns: {
        bloodPressure: 'Not measured',
        heartRate: 'Not measured',
        temperature: 'Self-reported: 99.2°F',
        weight: 'Self-reported: 163 lbs',
        height: '5\'8"',
        oxygenSaturation: 'Not measured'
      },
      examination: {
        chiefComplaint: 'Follow-up for recent cold symptoms',
        physicalExam: 'Visual examination via video call. Patient appears comfortable, no acute distress.',
        notes: 'Cold symptoms have resolved. Patient reports feeling much better. No lingering cough or congestion.'
      },
      diagnosis: {
        primary: 'Z09 - Encounter for follow-up examination after completed treatment',
        secondary: [],
        recommendations: [
          'Continue rest and hydration',
          'Return to normal activities',
          'Contact if symptoms worsen'
        ]
      }
    },
    {
      id: 3,
      date: '2024-06-10',
      time: '11:45 AM',
      type: 'Physical',
      location: 'Cardiology Center - Suite 301',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Cardiology',
      status: 'Completed',
      vitalSigns: {
        bloodPressure: '125/82 mmHg',
        heartRate: '68 bpm',
        temperature: '98.4°F',
        weight: '164 lbs',
        height: '5\'8"',
        oxygenSaturation: '99%'
      },
      examination: {
        chiefComplaint: 'Chest pain evaluation and EKG follow-up',
        physicalExam: 'Cardiovascular exam normal. No chest wall tenderness. EKG shows normal sinus rhythm.',
        notes: 'Patient reports resolved chest pain. Stress test results normal. Echocardiogram shows normal left ventricular function.'
      },
      diagnosis: {
        primary: 'R06.02 - Shortness of breath',
        secondary: ['Z51.89 - Encounter for other specified aftercare'],
        recommendations: [
          'Continue current medications',
          'Regular exercise as tolerated',
          'Follow-up in 6 months',
          'Call if chest pain returns'
        ]
      }
    }
  ];

  const toggleVisit = (visitId) => {
    setExpandedVisit(expandedVisit === visitId ? null : visitId);
  };

  const getVisitTypeIcon = (type) => {
    return type === 'Online' ? <Video className="w-4 h-4 text-white" /> : <Building className="w-4 h-4 text-white" />;
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">Medical Visits</h1>
          <p className="text-gray-600 text-sm">View your complete medical visit history</p>
        </div>

        {/* Visit Cards */}
        <div className="space-y-3">
          {visits.map((visit) => (
            <div key={visit.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Visit Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50/80 transition-colors"
                onClick={() => toggleVisit(visit.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          {getVisitTypeIcon(visit.type)}
                        </div>
                        <span className="font-bold text-sm">{visit.type} Visit</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(visit.status)}`}>
                        {visit.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <span>{visit.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>{visit.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{visit.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2 text-gray-700">
                      <User className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-sm">{visit.doctor}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-xs">{visit.specialty}</span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {expandedVisit === visit.id ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>
              </div>

              {/* Expanded Visit Details */}
              {expandedVisit === visit.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50/30">
                  
                  {/* Vital Signs Section */}
                  <div className="mb-6">
                    <h3 className="flex items-center space-x-2 text-lg font-bold text-gray-800 mb-4">
                      <Activity className="w-5 h-5 text-green-500" />
                      <span>Vital Signs</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Blood Pressure</span>
                          <p className="font-bold text-sm text-gray-800">{visit.vitalSigns.bloodPressure}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Heart Rate</span>
                          <p className="font-bold text-sm text-gray-800">{visit.vitalSigns.heartRate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Thermometer className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Temperature</span>
                          <p className="font-bold text-sm text-gray-800">{visit.vitalSigns.temperature}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Weight className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Weight</span>
                          <p className="font-bold text-sm text-gray-800">{visit.vitalSigns.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Ruler className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs">Height</span>
                          <p className="font-bold text-sm text-gray-800">{visit.vitalSigns.height}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Examination Section */}
                  <div className="mb-6">
                    <h3 className="flex items-center space-x-2 text-lg font-bold text-gray-800 mb-4">
                      <Stethoscope className="w-5 h-5 text-green-500" />
                      <span>Doctor's Examination</span>
                    </h3>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">Chief Complaint</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{visit.examination.chiefComplaint}</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">Physical Examination</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{visit.examination.physicalExam}</p>
                      </div>
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">Doctor's Notes</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{visit.examination.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Diagnosis Section */}
                  <div>
                    <h3 className="flex items-center space-x-2 text-lg font-bold text-gray-800 mb-4">
                      <FileText className="w-5 h-5 text-green-500" />
                      <span>Diagnosis & Recommendations</span>
                    </h3>
                    <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">Primary Diagnosis</h4>
                        <p className="text-gray-600 text-sm bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                          {visit.diagnosis.primary}
                        </p>
                      </div>
                      {visit.diagnosis.secondary.length > 0 && (
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="font-bold text-gray-700 mb-2 text-sm">Secondary Diagnosis</h4>
                          {visit.diagnosis.secondary.map((diagnosis, index) => (
                            <p key={index} className="text-gray-600 text-sm bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500 mb-2">
                              {diagnosis}
                            </p>
                          ))}
                        </div>
                      )}
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-bold text-gray-700 mb-3 text-sm">Doctor's Recommendations</h4>
                        <div className="space-y-2">
                          {visit.diagnosis.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-3 text-sm">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{recommendation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {visits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">No visits found</h3>
            <p className="text-gray-600 text-sm">Your visit history will appear here when you schedule appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visits;