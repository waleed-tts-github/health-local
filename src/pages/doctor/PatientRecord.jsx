import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Video,
  FileText,
  Search,
  Eye,
  User,
  Activity,
  Heart,
  Pill,
  X,
  ChevronDown,
  Stethoscope,
  Thermometer,
  Weight,
  Ruler,
} from 'lucide-react';

const DoctorPatientRecord = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedVisit, setExpandedVisit] = useState(null);

  // Patient records with visit history
  const patientRecords = [
    {
      id: 'PTN001',
      patientName: 'Sarah Johnson',
      patientAge: 34,
      patientGender: 'Female',
      patientPhone: '+1-555-0123',
      patientEmail: 'sarah.j@email.com',
      totalVisits: 3,
      lastVisit: '2024-01-30',
      visits: [
        {
          id: 'V001',
          date: '2024-01-30',
          time: '14:30',
          type: 'Physical',
          service: 'Private',
          chiefComplaint: 'Chest pain and shortness of breath',
          vitals: {
            temperature: '98.6°F',
            height: '165 cm',
            weight: '68 kg',
            bloodPressure: '130/85',
            pulseRate: '72 bpm'
          },
          diagnosis: 'Mild anxiety, normal cardiac function',
          examination: 'Cardiovascular examination normal. No murmurs or irregular rhythms detected. Lungs clear bilaterally.',
          prescription: 'Anxiolytic medication, lifestyle changes',
          notes: 'Patient responded well to treatment. Follow-up in 2 weeks.'
        },
        {
          id: 'V002',
          date: '2024-01-15',
          time: '10:00',
          type: 'Online',
          service: 'Angill',
          chiefComplaint: 'Follow-up consultation',
          vitals: {
            temperature: '98.4°F',
            height: '165 cm',
            weight: '69 kg',
            bloodPressure: '128/82',
            pulseRate: '70 bpm'
          },
          diagnosis: 'Anxiety symptoms improving',
          examination: 'Patient reports decreased anxiety levels. Sleep pattern improving.',
          prescription: 'Continue current medication',
          notes: 'Good progress. Patient compliance excellent.'
        },
        {
          id: 'V003',
          date: '2023-12-20',
          time: '16:15',
          type: 'Physical',
          service: 'Private',
          chiefComplaint: 'Initial consultation for anxiety',
          vitals: {
            temperature: '98.8°F',
            height: '165 cm',
            weight: '70 kg',
            bloodPressure: '135/88',
            pulseRate: '78 bpm'
          },
          diagnosis: 'Generalized anxiety disorder',
          examination: 'Physical examination normal. Patient shows signs of anxiety and stress.',
          prescription: 'Sertraline 25mg, started low dose',
          notes: 'New patient. Comprehensive assessment completed.'
        }
      ]
    },
    {
      id: 'PTN002',
      patientName: 'Ahmed Khan',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+92-300-1234567',
      patientEmail: 'ahmed.k@email.com',
      totalVisits: 5,
      lastVisit: '2024-01-30',
      visits: [
        {
          id: 'V004',
          date: '2024-01-30',
          time: '11:15',
          type: 'Online',
          service: 'Angill',
          chiefComplaint: 'Blood pressure monitoring',
          vitals: {
            temperature: '98.4°F',
            height: '175 cm',
            weight: '85 kg',
            bloodPressure: '140/90',
            pulseRate: '78 bpm'
          },
          diagnosis: 'Hypertension - controlled',
          examination: 'Blood pressure readings reviewed. Patient compliant with medication.',
          prescription: 'Continue current medication, reduce salt intake',
          notes: 'Blood pressure stable. Patient compliant with medication.'
        }
      ]
    },
    {
      id: 'PTN003',
      patientName: 'Maria Garcia',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+1-555-0456',
      patientEmail: 'maria.g@email.com',
      totalVisits: 2,
      lastVisit: '2024-01-29',
      visits: [
        {
          id: 'V005',
          date: '2024-01-29',
          time: '16:00',
          type: 'Online',
          service: 'Private',
          chiefComplaint: 'Recurring headaches and fatigue',
          vitals: {
            temperature: '98.2°F',
            height: '160 cm',
            weight: '55 kg',
            bloodPressure: '110/70',
            pulseRate: '68 bpm'
          },
          diagnosis: 'Tension headaches, mild dehydration',
          examination: 'Neurological examination normal. No signs of increased intracranial pressure.',
          prescription: 'Pain relief medication, increased water intake',
          notes: 'Stress-related symptoms. Recommended stress management techniques.'
        }
      ]
    },
    {
      id: 'PTN004',
      patientName: 'Hassan Ali',
      patientAge: 52,
      patientGender: 'Male',
      patientPhone: '+92-321-9876543',
      patientEmail: 'hassan.a@email.com',
      totalVisits: 8,
      lastVisit: '2024-01-20',
      visits: [
        {
          id: 'V006',
          date: '2024-01-20',
          time: '09:30',
          type: 'Physical',
          service: 'Private',
          chiefComplaint: 'Routine cardiac checkup',
          vitals: {
            temperature: '98.8°F',
            height: '170 cm',
            weight: '78 kg',
            bloodPressure: '135/85',
            pulseRate: '65 bpm'
          },
          diagnosis: 'Stable coronary artery disease',
          examination: 'Cardiac examination stable. ECG shows normal sinus rhythm.',
          prescription: 'Continue current cardiac medications',
          notes: 'Cardiac function stable. Annual follow-up recommended.'
        }
      ]
    }
  ];

  const filteredRecords = patientRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const openDetailsModal = (record) => {
    setSelectedRecord(record);
    setExpandedVisit(null);
    setShowDetails(true);
  };

  const closeDetailsModal = () => {
    setShowDetails(false);
    setSelectedRecord(null);
    setExpandedVisit(null);
  };

  const toggleVisitExpand = (visitId) => {
    setExpandedVisit(expandedVisit === visitId ? null : visitId);
  };

  const stats = {
    totalPatients: patientRecords.length,
    recentVisits: patientRecords.reduce((sum, record) => sum + record.totalVisits, 0),
    recentActivity: patientRecords.filter(record => new Date(record.lastVisit) >= new Date('2024-01-01')).length
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Patient Records</h1>
          <p className="text-gray-500 mt-1 text-sm">Access and manage patient medical records</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'bg-green-100 text-green-600' },
            { label: 'Total Visits', value: stats.recentVisits, icon: Calendar, color: 'bg-green-100 text-green-600' },
            { label: 'Active Patients (2024)', value: stats.recentActivity, icon: Activity, color: 'bg-green-100 text-green-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between transition-shadow hover:shadow-md">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Patient Records Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{record.patientName}</p>
                  <p className="text-xs text-gray-500">ID: {record.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-900">{record.patientAge}</p>
                  <p className="text-xs text-gray-500 mt-2">Gender</p>
                  <p className="text-sm font-medium text-gray-900">{record.patientGender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Visits</p>
                  <p className="text-sm font-medium text-gray-900">{record.totalVisits}</p>
                  <p className="text-xs text-gray-500 mt-2">Last Visit</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(record.lastVisit)}</p>
                </div>
              </div>
              <button
                onClick={() => openDetailsModal(record)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No patients found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Patient Details Modal */}
        {showDetails && selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedRecord.patientName}'s Record</h3>
                  <p className="text-xs text-gray-500">Patient ID: {selectedRecord.id}</p>
                </div>
                <button
                  onClick={closeDetailsModal}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full transition-colors hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Overview</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium text-gray-900">{selectedRecord.patientAge}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="text-sm font-medium text-gray-900">{selectedRecord.patientGender}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visit History */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Visit History ({selectedRecord.totalVisits})</h4>
                    <div className="space-y-3">
                      {selectedRecord.visits.map((visit) => (
                        <div key={visit.id} className="bg-gray-50 rounded-lg border border-gray-100">
                          <button
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors duration-150"
                            onClick={() => toggleVisitExpand(visit.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                {visit.type === 'Physical' ? (
                                  <MapPin className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Video className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{formatDate(visit.date)} at {visit.time}</p>
                                <p className="text-xs text-gray-500">{visit.service} - {visit.type}</p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                expandedVisit === visit.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedVisit === visit.id && (
                            <div className="p-4 border-t border-gray-100">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                    <FileText className="w-4 h-4 text-green-600" /> Chief Complaint
                                  </p>
                                  <p className="text-sm text-gray-900">{visit.chiefComplaint}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                    <Stethoscope className="w-4 h-4 text-green-600" /> Diagnosis
                                  </p>
                                  <p className="text-sm text-gray-900">{visit.diagnosis}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                    <Activity className="w-4 h-4 text-green-600" /> Examination
                                  </p>
                                  <p className="text-sm text-gray-900">{visit.examination}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                    <Pill className="w-4 h-4 text-green-600" /> Prescription
                                  </p>
                                  <p className="text-sm text-gray-900">{visit.prescription}</p>
                                </div>
                                <div className="sm:col-span-2">
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                    <FileText className="w-4 h-4 text-green-600" /> Notes
                                  </p>
                                  <p className="text-sm text-gray-900">{visit.notes}</p>
                                </div>
                                <div className="sm:col-span-2">
                                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                    <Heart className="w-4 h-4 text-green-600" /> Vitals
                                  </p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Thermometer className="w-4 h-4 text-green-600" /> Temperature
                                      </p>
                                      <p className="text-sm text-gray-900">{visit.vitals.temperature}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Ruler className="w-4 h-4 text-green-600" /> Height
                                      </p>
                                      <p className="text-sm text-gray-900">{visit.vitals.height}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Weight className="w-4 h-4 text-green-600" /> Weight
                                      </p>
                                      <p className="text-sm text-gray-900">{visit.vitals.weight}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Heart className="w-4 h-4 text-green-600" /> Blood Pressure
                                      </p>
                                      <p className="text-sm text-gray-900">{visit.vitals.bloodPressure}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Activity className="w-4 h-4 text-green-600" /> Pulse Rate
                                      </p>
                                      <p className="text-sm text-gray-900">{visit.vitals.pulseRate}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={closeDetailsModal}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .max-h-[90vh]::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-[90vh]::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .max-h-[90vh]::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 3px;
        }
        .max-h-[90vh]::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
        @media (min-width: 640px) {
          .max-h-[90vh]::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DoctorPatientRecord;