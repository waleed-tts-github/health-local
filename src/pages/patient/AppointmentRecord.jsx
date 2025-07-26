import React, { useEffect, useState } from 'react';
import { Search, Calendar, Clock, User, FileText, X, Share2, ToggleLeft, ToggleRight, ChevronDown, Trash2, Printer, Filter } from 'lucide-react';
import AppointmentDetailsModal from '../../components/patient/AppointmentDetailsModel';
import CancelAppointmentModal from '../../components/patient/CancelAppointmentModel';
import RefundRequestModal from '../../components/patient/RefundRequestModel';
import SuccessModal from '../../components/patient/SuccessModel';
import BackButton from '../../components/BackButton';

const AppointmentRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [refundReason, setRefundReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [appointmentToggles, setAppointmentToggles] = useState({});
  const [mainToggle, setMainToggle] = useState(false);

  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Ahmed",
      specialty: "Cardiology",
      consultationType: "Online Consultation",
      date: "2024-12-15",
      time: "10:30 AM",
      checkupNumber: "CHK-001",
      fee: "3,500",
      category: "Private Doctor",
      status: "Upcoming"
    },
    {
      id: 2,
      doctorName: "Dr. Ali Hassan",
      specialty: "Dermatology",
      consultationType: "Physical Consultation",
      date: "2024-12-20",
      time: "2:00 PM",
      checkupNumber: "CHK-002",
      fee: "2,800",
      category: "Angel Doctor",
      status: "Upcoming"
    },
    {
      id: 3,
      doctorName: "Dr. Maria Khan",
      specialty: "Pediatrics",
      consultationType: "Online Consultation",
      date: "2024-12-10",
      time: "11:00 AM",
      checkupNumber: "CHK-003",
      fee: "3,200",
      category: "Private Doctor",
      status: "Completed"
    },
    {
      id: 4,
      doctorName: "Dr. Ahmad Raza",
      specialty: "Orthopedics",
      consultationType: "Physical Consultation",
      date: "2024-12-08",
      time: "3:30 PM",
      checkupNumber: "CHK-004",
      fee: "4,000",
      category: "Angel Doctor",
      status: "Cancelled"
    },
    {
      id: 5,
      doctorName: "Dr. Fatima Sheikh",
      specialty: "Gynecology",
      consultationType: "Online Consultation",
      date: "2024-12-25",
      time: "9:00 AM",
      checkupNumber: "CHK-005",
      fee: "2,500",
      category: "Private Doctor",
      status: "Upcoming"
    },
    {
      id: 6,
      doctorName: "Dr. Hassan Ali",
      specialty: "Neurology",
      consultationType: "Physical Consultation",
      date: "2024-12-05",
      time: "4:00 PM",
      checkupNumber: "CHK-006",
      fee: "5,000",
      category: "Angel Doctor",
      status: "Completed"
    }
  ];

  const refundReasons = [
    "Connection lost at doctor's end",
    "Doctor not available",
    "I missed my turn",
    "Other (Custom)"
  ];

  useEffect(() => {
    const initialToggles = {};
    appointments.forEach(appointment => {
      initialToggles[appointment.id] = false;
    });
    setAppointmentToggles(initialToggles);
  }, []);

  const getDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    return { start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0] };
  };

  const handleQuickFilter = (filter) => {
    setActiveFilter(filter);
    setShowFilterDropdown(false);
    switch (filter) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
        setStartDate(null);
        setEndDate(null);
        break;
      case 'week':
        const { start: weekStart, end: weekEnd } = getDateRange(7);
        setStartDate(weekStart);
        setEndDate(weekEnd);
        setSelectedDate('');
        break;
      case 'month':
        const { start: monthStart, end: monthEnd } = getDateRange(30);
        setStartDate(monthStart);
        setEndDate(monthEnd);
        setSelectedDate('');
        break;
      case '3months':
        const { start: threeMonthStart, end: threeMonthEnd } = getDateRange(90);
        setStartDate(threeMonthStart);
        setEndDate(threeMonthEnd);
        setSelectedDate('');
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setActiveFilter(null);
    setSelectedDate('');
    setStartDate(null);
    setEndDate(null);
    setStatusFilter('All');
    setShowFilterDropdown(false);
  };

  const handleMainToggle = () => {
    const newToggleState = !mainToggle;
    setMainToggle(newToggleState);
    const newToggles = {};
    appointments.forEach(appointment => {
      newToggles[appointment.id] = newToggleState;
    });
    setAppointmentToggles(newToggles);
  };

  const handleAppointmentToggle = (appointmentId) => {
    setAppointmentToggles(prev => ({
      ...prev,
      [appointmentId]: !prev[appointmentId]
    }));
    const updatedToggles = {
      ...appointmentToggles,
      [appointmentId]: !appointmentToggles[appointmentId]
    };
    const allToggled = Object.values(updatedToggles).every(toggle => toggle);
    setMainToggle(allToggled);
  };

  const handleShareAppointment = (appointment) => {
    const shareText = `Appointment with ${appointment.doctorName} (${appointment.specialty})\nDate: ${appointment.date}\nTime: ${appointment.time}\nType: ${appointment.consultationType}\nFee: PKR ${appointment.fee}`;
    if (navigator.share) {
      navigator.share({
        title: `Appointment ${appointment.checkupNumber}`,
        text: shareText,
        url: window.location.href
      }).catch(error => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Appointment details copied to clipboard!');
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? appointment.date === selectedDate : true;
    const matchesDateRange = (startDate && endDate) 
      ? appointment.date >= startDate && appointment.date <= endDate 
      : true;
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesDateRange && matchesStatus;
  });

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCancelAppointment = () => {
    setShowModal(false);
    setShowCancelModal(true);
  };

  const handleRefundRequest = () => {
    setShowModal(false);
    setShowRefundModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setSuccessMessage('Your appointment has been cancelled successfully.');
    setShowSuccessModal(true);
  };

  const submitRefund = () => {
    setShowRefundModal(false);
    setSuccessMessage("Don't worry! Your money will be refunded. Your request has been submitted.");
    setShowSuccessModal(true);
    setRefundReason('');
    setCustomReason('');
  };

  const handleDeleteAppointment = (appointmentId) => {
    console.log(`Delete appointment with ID: ${appointmentId}`);
  };

  const handlePrintAppointment = (appointment) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Appointment - ${appointment.checkupNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #059669; }
            .section { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h confiscation="Appointment: ${appointment.checkupNumber}</h1>
          <div class="section">
            <h2>PMDOC Medical Center</h2>
            <p>Doctor: ${appointment.doctorName} (${appointment.specialty})</p>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
            <p>Consultation Type: ${appointment.consultationType}</p>
            <p>Category: ${appointment.category}</p>
            <p>Fee: PKR ${appointment.fee}</p>
            <p>Status: ${appointment.status}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const DatePickerInput = ({ selected, onChange, placeholder }) => (
    <input
      type="date"
      value={selected || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-sm sm:text-base"
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
       
        
        <div className="pb-6 sm:pb-8">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">My Appointments</h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                Manage and track your medical appointments with ease.
              </p>
            </div>
            <button
              onClick={handleMainToggle}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 border border-gray-200"
              aria-label="Toggle all appointments"
            >
              <div className={`relative w-8 sm:w-10 h-4 sm:h-5 rounded-full transition-all duration-300 ${mainToggle ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-sm transform transition-all duration-300 ${mainToggle ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs sm:text-sm font-medium">Toggle All</span>
            </button>
          </div>

          <div className="bg-green-500 rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by doctor name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-white text-xs sm:text-sm bg-gray-50 focus:bg-white transition-all duration-200"
                    aria-label="Search by doctor name"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium min-w-[140px] sm:min-w-[160px] text-gray-700 hover:bg-gray-50 appearance-none"
                    aria-label="Filter by status"
                  >
                    <option value="All">All</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 h-3 sm:h-4 w-3 sm:w-4 text-gray-700 pointer-events-none" />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium min-w-[140px] sm:min-w-[160px] ${
                      activeFilter 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    aria-label="Toggle quick filter dropdown"
                  >
                    <Filter className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>
                      {activeFilter 
                        ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}` 
                        : 'Quick Filter'
                      }
                    </span>
                    <ChevronDown className="h-3 sm:h-4 w-3 sm:w-4" />
                  </button>
                  {showFilterDropdown && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-2 w-48 sm:w-56 z-20">
                      <div className="space-y-1">
                        {[
                          { key: 'today', label: 'Today' },
                          { key: 'week', label: 'Last 7 Days' },
                          { key: 'month', label: 'Last 30 Days' },
                          { key: '3months', label: 'Last 3 Months' }
                        ].map(filter => (
                          <button
                            key={filter.key}
                            onClick={() => handleQuickFilter(filter.key)}
                            className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                              activeFilter === filter.key
                                ? 'bg-green-50 text-green-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            aria-label={`Filter by ${filter.label}`}
                          >
                            {filter.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm font-medium min-w-[140px] sm:min-w-[160px] text-gray-700"
                    aria-label="Toggle date range picker"
                  >
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>Date Range</span>
                    <ChevronDown className="h-3 sm:h-4 w-3 sm:w-4" />
                  </button>
                  {showDatePicker && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 w-72 sm:w-80 z-20">
                      <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Filter by Date Range</h3>
                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">From Date</label>
                            <DatePickerInput
                              selected={startDate}
                              onChange={setStartDate}
                              placeholder="Start Date"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">To Date</label>
                            <DatePickerInput
                              selected={endDate}
                              onChange={setEndDate}
                              placeholder="End Date"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3 pt-2">
                          <button
                            onClick={() => setShowDatePicker(false)}
                            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 text-xs sm:text-sm font-medium"
                            aria-label="Apply date range filter"
                          >
                            Apply Filter
                          </button>
                          <button
                            onClick={() => {
                              setStartDate(null);
                              setEndDate(null);
                              setShowDatePicker(false);
                            }}
                            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-xs sm:text-sm font-medium"
                            aria-label="Clear date range filter"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {(activeFilter || startDate || endDate || statusFilter !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm font-medium"
                    aria-label="Clear all filters"
                  >
                    <X className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {(activeFilter || startDate || endDate || statusFilter !== 'All') && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600 mr-2 sm:mr-3">Active filters:</span>
                  {activeFilter && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                    </span>
                  )}
                  {startDate && endDate && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {startDate} to {endDate}
                    </span>
                  )}
                  {statusFilter !== 'All' && (
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {statusFilter}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-gray-900">{appointment.doctorName}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAppointmentToggle(appointment.id)}
                  className="relative w-8 sm:w-10 h-4 sm:h-5 rounded-full transition-all duration-300"
                  style={{ backgroundColor: appointmentToggles[appointment.id] ? '#10B981' : '#D1D5DB' }}
                  aria-label={`Toggle visibility for appointment ${appointment.checkupNumber}`}
                  title="Toggle Appointment"
                >
                  <div
                    className={`absolute top-0.5 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white shadow-sm transform transition-all duration-300 ${
                      appointmentToggles[appointment.id] ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Consultation Type</p>
                  <p className="font-medium text-sm sm:text-base text-gray-900">{appointment.consultationType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                  <p className="font-medium text-sm sm:text-base text-gray-900">{appointment.date} at {appointment.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Checkup ID</p>
                  <p className="font-medium text-sm sm:text-base text-gray-900">{appointment.checkupNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fee</p>
                  <p className="font-medium text-sm sm:text-base text-gray-900">PKR {appointment.fee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-sm sm:text-base text-gray-900">{appointment.status}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewAppointment(appointment)}
                  className="flex-1 bg-green-500 text-white font-medium text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  aria-label={`View details for appointment ${appointment.checkupNumber}`}
                >
                  View Appointment
                </button>
                <button
                  onClick={() => handleShareAppointment(appointment)}
                  className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  aria-label={`Share appointment ${appointment.checkupNumber}`}
                  title="Share Appointment"
                >
                  <Share2 className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handlePrintAppointment(appointment)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label={`Print appointment ${appointment.checkupNumber}`}
                  title="Print Appointment"
                >
                  <Printer className="h-3 sm:h-4 w-3 sm:w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                  aria-label={`Delete appointment ${appointment.checkupNumber}`}
                  title="Delete Appointment"
                >
                  <Trash2 className="h-3 sm:h-4 w-3 sm:w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredAppointments.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-10 sm:w-12 h-10 sm:h-12 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <AppointmentDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedAppointment={selectedAppointment}
          onCancel={handleCancelAppointment}
          onRefund={handleRefundRequest}
        />

        <CancelAppointmentModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={confirmCancel}
        />

        <RefundRequestModal
          isOpen={showRefundModal}
          onClose={() => setShowRefundModal(false)}
          refundReasons={refundReasons}
          refundReason={refundReason}
          setRefundReason={setRefundReason}
          customReason={customReason}
          setCustomReason={setCustomReason}
          onSubmit={submitRefund}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default AppointmentRecord;