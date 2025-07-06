import React, { useState } from 'react';
import { Search, Calendar, Clock, User, FileText, X, ChevronDown, Trash2, Printer } from 'lucide-react';
import BackButton from '../../components/BackButton';


import AppointmentDetailsModal from '../../components/patient/AppointmentDetailsModel';
import CancelAppointmentModal from '../../components/patient/CancelAppointmentModel';
import RefundRequestModal from '../../components/patient/RefundRequestModel'
import SuccessModal from '../../components/patient/SuccessModel'



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
      category: "Private Doctor"
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
      category: "Angel Doctor"
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
      category: "Private Doctor"
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
      category: "Angel Doctor"
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
      category: "Private Doctor"
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
      category: "Angel Doctor"
    }
  ];

  const refundReasons = [
    "Connection lost at doctor's end",
    "Doctor not available",
    "I missed my turn",
    "Other (Custom)"
  ];

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
    setShowFilterDropdown(false);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? appointment.date === selectedDate : true;
    const matchesDateRange = (startDate && endDate) 
      ? appointment.date >= startDate && appointment.date <= endDate 
      : true;
    
    return matchesSearch && matchesDate && matchesDateRange;
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
    // Implement actual delete logic here (e.g., API call)
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
          <h1>Appointment: ${appointment.checkupNumber}</h1>
          <div class="section">
            <h2>PMDOC Medical Center</h2>
            <p>Doctor: ${appointment.doctorName} (${appointment.specialty})</p>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${appointment.time}</p>
            <p>Consultation Type: ${appointment.consultationType}</p>
            <p>Category: ${appointment.category}</p>
            <p>Fee: PKR ${appointment.fee}</p>
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
      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white"
      placeholder={placeholder}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <BackButton />
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-xl border border-gray-100 mb-8">
          <div className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Appointments</h1>
                <p className="text-gray-600">Manage and track your medical appointments</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-emerald-500 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 transition-all outline-none shadow-lg"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg border border-emerald-300"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{activeFilter ? activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) : 'Filter by Date'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showFilterDropdown && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-48 z-10">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleQuickFilter('today')}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeFilter === 'today'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          Today
                        </button>
                        <button
                          onClick={() => handleQuickFilter('week')}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeFilter === 'week'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          Last 7 Days
                        </button>
                        <button
                          onClick={() => handleQuickFilter('month')}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeFilter === 'month'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          Last 30 Days
                        </button>
                        <button
                          onClick={() => handleQuickFilter('3months')}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            activeFilter === '3months'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          Last 3 Months
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Custom Date Range */}
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg border border-emerald-300"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Date Range</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showDatePicker && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 w-80 z-10">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Filter by Date Range</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                            <DatePickerInput
                              selected={startDate}
                              onChange={setStartDate}
                              placeholder="Start Date"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                            <DatePickerInput
                              selected={endDate}
                              onChange={setEndDate}
                              placeholder="End Date"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => setShowDatePicker(false)}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full transition-colors text-sm"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                                setShowDatePicker(false);
                              }}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full transition-colors text-sm"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear All Filters */}
                {(activeFilter || startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all border border-red-200 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ minHeight: '340px' }}
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{appointment.doctorName}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{appointment.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">{appointment.consultationType}</p>
                      <p className="text-xs text-gray-500">Consultation Type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.checkupNumber}</p>
                      <p className="text-xs text-gray-500">Checkup ID</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleViewAppointment(appointment)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 transform group-hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    View Appointment
                  </button>
                  <button
                    onClick={() => handlePrintAppointment(appointment)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all shadow-sm"
                    title="Print Appointment"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all shadow-sm"
                    title="Delete Appointment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Appointment Details Modal */}
        <AppointmentDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedAppointment={selectedAppointment}
          onCancel={handleCancelAppointment}
          onRefund={handleRefundRequest}
        />

        {/* Cancel Confirmation Modal */}
        <CancelAppointmentModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={confirmCancel}
        />

        {/* Refund Request Modal */}
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

        {/* Success Modal */}
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