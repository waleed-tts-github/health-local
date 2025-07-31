import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Video,
  FileText,
  Search,
  Download,
  Eye,
  MessageSquare,
  MoreVertical,
  User,
  Activity,
  Heart,
  Pill,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
} from 'lucide-react';

const DoctorPatientRecord = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock appointment data (removed rating from all entries)
  const appointments = [
    {
      id: 'APT001',
      patientName: 'Sarah Johnson',
      patientAge: 34,
      patientGender: 'Female',
      patientPhone: '+1-555-0123',
      patientEmail: 'sarah.j@email.com',
      appointmentDate: '2024-01-30T14:30:00',
      status: 'completed',
      type: 'physical',
      serviceType: 'private',
      amount: 150,
      duration: 45,
      chiefComplaint: 'Chest pain and shortness of breath',
      diagnosis: 'Mild anxiety, normal cardiac function',
      prescription: 'Anxiolytic medication, lifestyle changes',
      notes: 'Patient responded well to treatment. Follow-up in 2 weeks.',
      nextAppointment: '2024-02-13T14:30:00',
    },
    {
      id: 'APT002',
      patientName: 'Ahmed Khan',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+92-300-1234567',
      patientEmail: 'ahmed.k@email.com',
      appointmentDate: '2024-01-30T11:15:00',
      status: 'completed',
      type: 'online',
      serviceType: 'angill',
      amount: 50,
      duration: 30,
      chiefComplaint: 'High blood pressure monitoring',
      diagnosis: 'Hypertension - controlled',
      prescription: 'Continue current medication, reduce salt intake',
      notes: 'Blood pressure stable. Patient compliant with medication.',
      nextAppointment: null,
    },
    {
      id: 'APT003',
      patientName: 'Maria Garcia',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+1-555-0456',
      patientEmail: 'maria.g@email.com',
      appointmentDate: '2024-01-29T16:00:00',
      status: 'completed',
      type: 'online',
      serviceType: 'private',
      amount: 120,
      duration: 40,
      chiefComplaint: 'Recurring headaches and fatigue',
      diagnosis: 'Tension headaches, mild dehydration',
      prescription: 'Pain relief medication, increased water intake',
      notes: 'Stress-related symptoms. Recommended stress management techniques.',
      nextAppointment: '2024-02-12T16:00:00',
    },
    {
      id: 'APT004',
      patientName: 'Hassan Ali',
      patientAge: 52,
      patientGender: 'Male',
      patientPhone: '+92-321-9876543',
      patientEmail: 'hassan.a@email.com',
      appointmentDate: '2024-01-29T09:30:00',
      status: 'cancelled',
      type: 'physical',
      serviceType: 'private',
      amount: 180,
      duration: 0,
      chiefComplaint: 'Routine cardiac checkup',
      diagnosis: null,
      prescription: null,
      notes: 'Patient cancelled due to emergency. Rescheduled.',
      nextAppointment: '2024-02-05T09:30:00',
    },
    {
      id: 'APT005',
      patientName: 'Fatima Sheikh',
      patientAge: 41,
      patientGender: 'Female',
      patientPhone: '+92-300-5555555',
      patientEmail: 'fatima.s@email.com',
      appointmentDate: '2024-01-28T15:45:00',
      status: 'no-show',
      type: 'online',
      serviceType: 'angill',
      amount: 50,
      duration: 0,
      chiefComplaint: 'Diabetes consultation',
      diagnosis: null,
      prescription: null,
      notes: 'Patient did not join the video call. Attempted contact.',
      nextAppointment: null,
    },
    {
      id: 'APT006',
      patientName: 'John Smith',
      patientAge: 38,
      patientGender: 'Male',
      patientPhone: '+1-555-0789',
      patientEmail: 'john.s@email.com',
      appointmentDate: '2024-01-27T13:00:00',
      status: 'completed',
      type: 'physical',
      serviceType: 'private',
      amount: 200,
      duration: 60,
      chiefComplaint: 'Comprehensive cardiac screening',
      diagnosis: 'Normal cardiac function, mild cholesterol elevation',
      prescription: 'Statin therapy, dietary modifications',
      notes: 'Excellent patient compliance. Annual follow-up recommended.',
      nextAppointment: '2025-01-27T13:00:00',
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesType = typeFilter === 'all' || appointment.type === typeFilter;
    const matchesService = serviceFilter === 'all' || appointment.serviceType === serviceFilter;

    return matchesSearch && matchesStatus && matchesType && matchesService;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'no-show':
        return 'bg-orange-100 text-orange-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'no-show':
        return <AlertCircle className="w-4 h-4" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    return type === 'online' ? (
      <Video className="w-4 h-4 text-blue-500" />
    ) : (
      <MapPin className="w-4 h-4 text-green-500" />
    );
  };

  const getServiceColor = (serviceType) => {
    return serviceType === 'angill' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openDetailsModal = (appointment) => {
    setSelectedRecord(appointment);
    setShowDetails(true);
  };

  const stats = {
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((a) => a.status === 'completed').length,
    totalRevenue: appointments
      .filter((a) => a.status === 'completed')
      .reduce((sum, a) => sum + a.amount, 0),
  };

  return (
    <div className="min-h-screen bg-white font-poppins w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage your appointment history</p>
          </div>
          <button className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export Records
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stats.totalAppointments}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stats.completedAppointments}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900 mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Search Patient Records</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients, complaints, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 text-sm"
              >
                <option value="all">All Types</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 text-sm"
              >
                <option value="all">All Services</option>
                <option value="private">Private</option>
                <option value="angill">Angill</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Results ({filteredAppointments.length.toString().padStart(2, '0')})
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-base">{appointment.patientName}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>({appointment.patientAge} Years)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 truncate">{appointment.chiefComplaint}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {getStatusIcon(appointment.status)}
                    {appointment.status.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDetailsModal(appointment)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2 flex-wrap">
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">‹</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">1</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">2</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">3</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">4</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">5</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm">›</button>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedRecord && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl overflow-y-auto">
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
                    Appointment Details
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col px-4 pb-4 space-y-4">
                  {/* Patient Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500" />
                      Patient Information
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">Name:</span> {selectedRecord.patientName}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Age:</span> {selectedRecord.patientAge} years
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Gender:</span> {selectedRecord.patientGender}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Phone:</span> {selectedRecord.patientPhone}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Email:</span> {selectedRecord.patientEmail}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      Appointment Details
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>
                        <span className="font-medium text-gray-700">Date:</span>{' '}
                        {formatDate(selectedRecord.appointmentDate)}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Type:</span>{' '}
                        <span className="capitalize">{selectedRecord.type}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Service:</span> {selectedRecord.serviceType}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Duration:</span> {selectedRecord.duration}{' '}
                        minutes
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Amount:</span> ${selectedRecord.amount}
                      </p>
                      {selectedRecord.nextAppointment && (
                        <p>
                          <span className="font-medium text-gray-700">Next Appointment:</span>{' '}
                          {formatDate(selectedRecord.nextAppointment)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Medical Information
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-xl text-xs">
                        <h5 className="font-medium text-gray-700 mb-1">Chief Complaint</h5>
                        <p className="text-gray-600">{selectedRecord.chiefComplaint}</p>
                      </div>
                      {selectedRecord.diagnosis && (
                        <div className="p-3 bg-blue-50 rounded-xl text-xs">
                          <h5 className="font-medium text-gray-700 mb-1">Diagnosis</h5>
                          <p className="text-gray-600">{selectedRecord.diagnosis}</p>
                        </div>
                      )}
                      {selectedRecord.prescription && (
                        <div className="p-3 bg-green-50 rounded-xl text-xs">
                          <h5 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <Pill className="w-3 h-3 text-green-500" />
                            Prescription
                          </h5>
                          <p className="text-gray-600">{selectedRecord.prescription}</p>
                        </div>
                      )}
                      {selectedRecord.notes && (
                        <div className="p-3 bg-yellow-50 rounded-xl text-xs">
                          <h5 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <FileText className="w-3 h-3 text-yellow-500" />
                            Notes
                          </h5>
                          <p className="text-gray-600">{selectedRecord.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
                  >
                    Close
                  </button>
                </div>

                <style jsx>{`
                  .max-h-[90vh] {
                    scrollbar-width: thin;
                    scrollbar-color: #10b981 #e5e7eb;
                  }
                  .max-h-[90vh]::-webkit-scrollbar {
                    width: 8px;
                  }
                  .max-h-[90vh]::-webkit-scrollbar-track {
                    background: #e5e7eb;
                    border-radius: 4px;
                  }
                  .max-h-[90vh]::-webkit-scrollbar-thumb {
                    background: #10b981;
                    border-radius: 4px;
                  }
                  .max-h-[90vh]::-webkit-scrollbar-thumb:hover {
                    background: #059669;
                  }
                  @media (min-width: 640px) {
                    .max-h-[90vh] {
                      scrollbar-width: none;
                    }
                    .max-h-[90vh]::-webkit-scrollbar {
                      display: none;
                    }
                  }
                `}</style>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatientRecord;