import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, User, FileText, X, ChevronDown, Trash2, Printer } from 'lucide-react';
import BackButton from '../../components/BackButton';
import PrescriptionDetailsModal from '../../components/patient/PrescriptionDetailsModel';

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // Sample prescription data
  const prescriptions = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "2024-12-15",
      time: "10:30 AM",
      consultationType: "Online Consultation",
      patientName: "John Smith",
      age: 35,
      address: "123 Main St, City, State 12345",
      phone: "+1 (555) 123-4567",
      prescriptionId: "PRE-001",
      medicines: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" },
        { name: "Paracetamol", dosage: "650mg", frequency: "As needed for pain", duration: "5 days" },
        { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "30 days" }
      ],
      diagnosis: "Upper respiratory tract infection",
      instructions: "Take with food. Complete the full course of antibiotics. Rest and stay hydrated."
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2024-12-10",
      time: "2:15 PM",
      consultationType: "Physical Consultation",
      patientName: "John Smith",
      age: 35,
      address: "123 Main St, City, State 12345",
      phone: "+1 (555) 123-4567",
      prescriptionId: "PRE-002",
      medicines: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" },
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" }
      ],
      diagnosis: "Hypertension management",
      instructions: "Monitor blood pressure regularly. Follow up in 2 weeks."
    },
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Gastroenterologist",
      date: "2024-11-28",
      time: "9:00 AM",
      consultationType: "Online Consultation",
      patientName: "John Smith",
      age: 35,
      address: "123 Main St, City, State 12345",
      phone: "+1 (555) 123-4567",
      prescriptionId: "PRE-003",
      medicines: [
        { name: "Omeprazole", dosage: "20mg", frequency: "Once daily before breakfast", duration: "14 days" },
        { name: "Probiotics", dosage: "1 capsule", frequency: "Twice daily", duration: "21 days" }
      ],
      diagnosis: "Gastroesophageal reflux disease",
      instructions: "Avoid spicy foods. Take medication 30 minutes before meals."
    },
    {
      id: 4,
      doctorName: "Dr. Ahmad Hassan",
      specialty: "Dermatologist",
      date: "2024-11-20",
      time: "3:30 PM",
      consultationType: "Physical Consultation",
      patientName: "John Smith",
      age: 35,
      address: "123 Main St, City, State 12345",
      phone: "+1 (555) 123-4567",
      prescriptionId: "PRE-004",
      medicines: [
        { name: "Hydrocortisone Cream", dosage: "1%", frequency: "Apply twice daily", duration: "10 days" },
        { name: "Antihistamine", dosage: "10mg", frequency: "Once daily", duration: "7 days" }
      ],
      diagnosis: "Allergic dermatitis",
      instructions: "Apply cream to affected areas only. Avoid allergens."
    }
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
        setDateFilter(today);
        setStartDate(null);
        setEndDate(null);
        break;
      case 'week':
        const { start: weekStart, end: weekEnd } = getDateRange(7);
        setStartDate(weekStart);
        setEndDate(weekEnd);
        setDateFilter('all');
        break;
      case 'month':
        const { start: monthStart, end: monthEnd } = getDateRange(30);
        setStartDate(monthStart);
        setEndDate(monthEnd);
        setDateFilter('all');
        break;
      case '3months':
        const { start: threeMonthStart, end: threeMonthEnd } = getDateRange(90);
        setStartDate(threeMonthStart);
        setEndDate(threeMonthEnd);
        setDateFilter('all');
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setActiveFilter(null);
    setDateFilter('all');
    setStartDate(null);
    setEndDate(null);
    setShowFilterDropdown(false);
  };

  const filteredPrescriptions = useMemo(() => {
    let filtered = prescriptions;

    if (searchTerm) {
      filtered = filtered.filter(prescription =>
        prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter !== 'all') {
      filtered = filtered.filter(prescription => prescription.date === dateFilter);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(prescription => 
        prescription.date >= startDate && prescription.date <= endDate
      );
    }

    return filtered;
  }, [searchTerm, dateFilter, startDate, endDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handleDeletePrescription = (prescriptionId) => {
    console.log(`Delete prescription with ID: ${prescriptionId}`);
    // Implement actual delete logic here (e.g., API call)
  };

  const handlePrintPrescription = (prescription) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${prescription.prescriptionId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #059669; }
            .section { margin-bottom: 20px; }
            .medicine { margin-bottom: 10px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>Prescription: ${prescription.prescriptionId}</h1>
          <div class="section">
            <h2>PMDOC Medical Center</h2>
            <p>Date: ${formatDate(prescription.date)}</p>
            <p>Time: ${prescription.time}</p>
            <p>Doctor: ${prescription.doctorName} (${prescription.specialty})</p>
            <p>Patient: ${prescription.patientName}, ${prescription.age} years</p>
            <p>Address: ${prescription.address}</p>
            <p>Phone: ${prescription.phone}</p>
            <p>Consultation: ${prescription.consultationType}</p>
          </div>
          <div class="section">
            <h2>Diagnosis</h2>
            <p>${prescription.diagnosis}</p>
          </div>
          <div class="section">
            <h2>Prescribed Medicines</h2>
            ${prescription.medicines.map(medicine => `
              <div class="medicine">
                <strong>${medicine.name}</strong><br/>
                Dosage: ${medicine.dosage}<br/>
                Frequency: ${medicine.frequency}<br/>
                Duration: ${medicine.duration}
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2>Instructions</h2>
            <p>${prescription.instructions}</p>
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
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-white text-xs sm:text-sm"
      placeholder={placeholder}
      aria-label={placeholder}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <BackButton />
        
        <div className="pb-6 sm:pb-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">My Prescriptions</h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
              Manage and track your prescriptions.
            </p>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-green-500 rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Search Bar */}
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

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Quick Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 border rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium min-w-[140px] sm:min-w-[160px] ${
                      activeFilter 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
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
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 p-2 w-48 sm:w-56 z-20">
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

                {/* Date Range Picker */}
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 text-xs sm:text-sm font-medium text-gray-700 bg-white min-w-[140px] sm:min-w-[160px]"
                    aria-label="Toggle date range picker"
                  >
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>Date Range</span>
                    <ChevronDown className="h-3 sm:h-4 w-3 sm:w-4" />
                  </button>
                  {showDatePicker && (
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 w-72 sm:w-80 z-20">
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

                {/* Clear All Filters */}
                {(activeFilter || startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 text-xs sm:text-sm font-medium border border-red-200"
                    aria-label="Clear all filters"
                  >
                    <X className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {(activeFilter || startDate || endDate) && (
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
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prescriptions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ minHeight: '300px sm:340px' }}
            >
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">{prescription.doctorName}</h3>
                    <p className="text-emerald-600 font-medium text-xs sm:text-sm">{prescription.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{prescription.consultationType}</p>
                      <p className="text-xs text-gray-500">Consultation Type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{formatDate(prescription.date)}</p>
                      <p className="text-xs text-gray-500">{prescription.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{prescription.prescriptionId}</p>
                      <p className="text-xs text-gray-500">Prescription ID</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleViewPrescription(prescription)}
                    className="flex-1 bg-green-500 text-white font-medium text-xs sm:text-sm py-2 sm:py-3 px-3 sm:px-4 rounded-full transition-all duration-200 transform group-hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    aria-label={`View prescription ${prescription.prescriptionId}`}
                  >
                    <FileText className="w-3 sm:w-4 h-3 sm:h-4" />
                    View Prescription
                  </button>
                  <button
                    onClick={() => handlePrintPrescription(prescription)}
                    className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all shadow-sm"
                    title="Print Prescription"
                    aria-label={`Print prescription ${prescription.prescriptionId}`}
                  >
                    <Printer className="w-3 sm:w-4 h-3 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePrescription(prescription.id)}
                    className="p-2 sm:p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all shadow-sm"
                    title="Delete Prescription"
                    aria-label={`Delete prescription ${prescription.prescriptionId}`}
                  >
                    <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-10 sm:w-12 h-10 sm:h-12 text-emerald-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No prescriptions found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Prescription Modal */}
        <PrescriptionDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedPrescription={selectedPrescription}
        />
      </div>
    </div>
  );
};

export default Prescriptions;