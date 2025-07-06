import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, User, FileText, X, ChevronDown, Trash2, Printer } from 'lucide-react';
import LabReportDetailsModal from '../../components/patient/LabReportDetailsModel';

const LabReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // Sample lab report data with appointment info
  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Pathologist",
      date: "2024-12-15",
      time: "10:30 AM",
      labName: "City Diagnostics",
      reportId: "LAB-001",
      appointment: {
        id: "APP-001",
        date: "2024-12-14",
        type: "Online Consultation"
      },
      results: [
        { parameter: "Hemoglobin", value: "14.5 g/dL", referenceRange: "13.5-17.5 g/dL" },
        { parameter: "White Blood Cells", value: "6.2 x10^9/L", referenceRange: "4.0-11.0 x10^9/L" },
        { parameter: "Platelets", value: "250 x10^9/L", referenceRange: "150-400 x10^9/L" }
      ],
      notes: "All parameters within normal range. No further action required."
    },
    {
      id: 2,
      testName: "Lipid Profile",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2024-12-10",
      time: "2:15 PM",
      labName: "HealthLab Inc.",
      reportId: "LAB-002",
      appointment: {
        id: "APP-002",
        date: "2024-12-09",
        type: "Physical Consultation"
      },
      results: [
        { parameter: "Total Cholesterol", value: "220 mg/dL", referenceRange: "<200 mg/dL" },
        { parameter: "HDL Cholesterol", value: "45 mg/dL", referenceRange: ">40 mg/dL" },
        { parameter: "LDL Cholesterol", value: "150 mg/dL", referenceRange: "<100 mg/dL" }
      ],
      notes: "Elevated cholesterol levels detected. Recommend dietary changes and follow-up in 3 months."
    },
    {
      id: 3,
      testName: "Thyroid Function Test",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Endocrinologist",
      date: "2024-11-28",
      time: "9:00 AM",
      labName: "Prime Pathology",
      reportId: "LAB-003",
      appointment: {
        id: "APP-003",
        date: "2024-11-27",
        type: "Online Consultation"
      },
      results: [
        { parameter: "TSH", value: "3.2 mIU/L", referenceRange: "0.4-4.0 mIU/L" },
        { parameter: "Free T4", value: "1.1 ng/dL", referenceRange: "0.8-1.8 ng/dL" }
      ],
      notes: "Thyroid function normal. Continue monitoring annually."
    },
    {
      id: 4,
      testName: "Blood Glucose Test",
      doctorName: "Dr. Ahmad Hassan",
      specialty: "General Physician",
      date: "2024-11-20",
      time: "3:30 PM",
      labName: "City Diagnostics",
      reportId: "LAB-004",
      appointment: {
        id: "APP-004",
        date: "2024-11-19",
        type: "Physical Consultation"
      },
      results: [
        { parameter: "Fasting Glucose", value: "110 mg/dL", referenceRange: "70-99 mg/dL" },
        { parameter: "HbA1c", value: "6.2%", referenceRange: "<5.7%" }
      ],
      notes: "Indicative of prediabetes. Recommend lifestyle changes and follow-up in 6 weeks."
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

  const filteredReports = useMemo(() => {
    let filtered = labReports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.labName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter !== 'all') {
      filtered = filtered.filter(report => report.date === dateFilter);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(report => 
        report.date >= startDate && report.date <= endDate
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

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleDeleteReport = (reportId) => {
    console.log(`Delete report with ID: ${reportId}`);
    // Implement actual delete logic here (e.g., API call)
  };

  const handlePrintReport = (report) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Lab Report - ${report.reportId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #059669; }
            .section { margin-bottom: 20px; }
            .result { margin-bottom: 10px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>Lab Report: ${report.testName}</h1>
          <div class="section">
            <h2>Laboratory: ${report.labName}</h2>
            <p>Date: ${formatDate(report.date)}</p>
            <p>Time: ${report.time}</p>
            <p>Doctor: ${report.doctorName} (${report.specialty})</p>
            <p>Appointment: ${report.appointment.id} - ${report.appointment.type} (${formatDate(report.appointment.date)})</p>
          </div>
          <div class="section">
            <h2>Test Results</h2>
            ${report.results.map(result => `
              <div class="result">
                <strong>${result.parameter}</strong><br/>
                Value: ${result.value}<br/>
                Reference Range: ${result.referenceRange}
              </div>
            `).join('')}
          </div>
          <div class="section">
            <h2>Notes</h2>
            <p>${report.notes}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <div className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Lab Reports</h1>
                <p className="text-gray-600">View and manage your laboratory test results</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by test, doctor, or lab..."
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

        {/* Lab Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ minHeight: '340px' }}
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{report.testName}</h3>
                    <p className="text-emerald-600 font-medium text-sm">{report.doctorName} - {report.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">{report.labName}</p>
                      <p className="text-xs text-gray-500">Laboratory</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDate(report.date)}</p>
                      <p className="text-xs text-gray-500">{report.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.reportId}</p>
                      <p className="text-xs text-gray-500">Report ID</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">{report.appointment.id} - {report.appointment.type}</p>
                      <p className="text-xs text-gray-500">Appointment: {formatDate(report.appointment.date)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-full transition-all duration-200 transform group-hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View Report
                  </button>
                  <button
                    onClick={() => handlePrintReport(report)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all shadow-sm"
                    title="Print Report"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-all shadow-sm"
                    title="Delete Report"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No lab reports found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Lab Report Modal */}
        <LabReportDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedReport={selectedReport}
        />
      </div>
    </div>
  );
};

export default LabReports;