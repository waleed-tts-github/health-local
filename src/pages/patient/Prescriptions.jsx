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
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Prescriptions</h1>
                <p className="text-gray-600">Manage and view your medical prescriptions</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor, diagnosis..."
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

        {/* Prescriptions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ minHeight: '340px' }}
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{prescription.doctorName}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{prescription.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">{prescription.consultationType}</p>
                      <p className="text-xs text-gray-500">Consultation Type</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(prescription.date)}</p>
                      <p className="text-xs text-gray-500">{prescription.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prescription.prescriptionId}</p>
                      <p className="text-xs text-gray-500">Prescription ID</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleViewPrescription(prescription)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-sm py-3 px-4 rounded-full transition-all duration-200 transform group-hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View Prescription
                  </button>
                  <button
                    onClick={() => handlePrintPrescription(prescription)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all shadow-sm"
                    title="Print Prescription"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePrescription(prescription.id)}
                    className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all shadow-sm"
                    title="Delete Prescription"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No prescriptions found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
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