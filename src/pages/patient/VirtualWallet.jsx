import React, { useState } from 'react';
import { X, Plus, CreditCard, DollarSign, FileText, Wallet, ArrowLeft, Search, Filter, Download, Eye, TrendingUp, Users, Activity } from 'lucide-react';

const VirtualWallet = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCategory, setPaymentCategory] = useState('');
  const [newBeneficiaryId, setNewBeneficiaryId] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [activeTab, setActiveTab] = useState('topup');
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: 'Ali Hassan', relationship: 'Son', selected: false },
    { id: 2, name: 'Murtaza Hussain', relationship: 'Son', selected: false },
    { id: 3, name: 'Noor Fatima', relationship: 'Mother', selected: false },
    { id: 4, name: 'Shoukat Javed', relationship: 'Father', selected: false }
  ]);
  const [searchResults, setSearchResults] = useState([]);

  const invoiceData = [
    { id: 1, doctor: 'Dr. Ahmad Ali', date: '2024-01-15', amount: 2500, status: 'Paid', service: 'Consultation' },
    { id: 2, doctor: 'Dr. Sarah Khan', date: '2024-01-10', amount: 3000, status: 'Pending', service: 'Surgery' },
    { id: 3, doctor: 'Dr. Hassan Malik', date: '2024-01-05', amount: 1800, status: 'Paid', service: 'Lab Test' },
    { id: 4, doctor: 'Dr. Fatima Sheikh', date: '2024-12-28', amount: 2200, status: 'Overdue', service: 'Checkup' },
    { id: 5, doctor: 'Dr. Omar Yousuf', date: '2024-12-20', amount: 1500, status: 'Paid', service: 'Prescription' },
    { id: 6, doctor: 'Dr. Aisha Rahman', date: '2024-12-15', amount: 4000, status: 'Pending', service: 'Therapy' }
  ];

  const topUpData = [
    { id: 1, amount: 1500, date: '2024-01-15', status: 'Completed', method: 'Jazz Cash' },
    { id: 2, amount: 2000, date: '2024-01-10', status: 'Pending', method: 'Easy Paisa' },
    { id: 3, amount: 1000, date: '2024-01-05', status: 'Completed', method: 'Master Card' },
    { id: 4, amount: 2500, date: '2024-12-28', status: 'Failed', method: 'Visa Card' }
  ];

  const doctorFeesData = [
    { id: 1, doctor: 'Dr. Ahmad Ali', amount: 2500, date: '2024-01-15', status: 'Paid', service: 'Consultation' },
    { id: 2, doctor: 'Dr. Sarah Khan', amount: 3000, date: '2024-01-10', status: 'Pending', service: 'Surgery' },
    { id: 3, doctor: 'Dr. Hassan Malik', amount: 1800, date: '2024-01-05', status: 'Paid', service: 'Lab Test' }
  ];

  const donationsData = [
    { id: 1, purpose: 'Family Support', amount: 1500, date: '2024-01-15', status: 'Completed', recipient: 'Ali Hassan' },
    { id: 2, purpose: 'Loan Repayment', amount: 2000, date: '2024-01-10', status: 'Pending', recipient: 'Murtaza Hussain' },
    { id: 3, purpose: 'Charity', amount: 1000, date: '2024-01-05', status: 'Completed', recipient: 'Noor Fatima' }
  ];

  const accountDetails = {
    totalSpent: 20000,
    totalDoctorFee: 15000,
    totalDonation: 5000,
    totalTopUp: 7000,
    bankName: 'Wells Fargo & Co',
    branchName: 'Lenaca',
    accountNumber: '5396 5250 1908 3036',
    walletAmount: 570
  };

  const paymentMethods = [
    { id: 'jazzcash', name: 'Jazz Cash', icon: '💰' },
    { id: 'easypaisa', name: 'Easy Paisa', icon: '💳' },
    { id: 'mastercard', name: 'Master Card', icon: '💳' },
    { id: 'visa', name: 'VISA', icon: '💳' }
  ];

  const handleSocialPay = () => {
    setActiveModal('socialPay');
  };

  const handleBeneficiarySelect = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setActiveModal('paymentConfirm');
    if (!beneficiaries.some(b => b.id === beneficiary.id)) {
      setBeneficiaries([...beneficiaries, { ...beneficiary, selected: false }]);
    }
  };

  const handleSearchBeneficiary = (input) => {
    setNewBeneficiaryId(input);
    if (input.trim()) {
      const mockResults = [
        { id: 1001, name: 'Ayesha Khan', relationship: 'Friend' },
        { id: 1002, name: 'Zainab Ali', relationship: 'Cousin' },
        { id: 1003, name: 'Omar Farooq', relationship: 'Brother' },
        { id: 1004, name: 'Sana Malik', relationship: 'Sister' }
      ].filter(person => 
        person.id.toString().includes(input.trim()) || 
        person.name.toLowerCase().includes(input.trim().toLowerCase())
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddBeneficiary = () => {
    if (newBeneficiaryId.trim()) {
      const newBeneficiary = {
        id: Date.now(),
        name: 'Ali Hassan Qadri',
        relationship: 'Friend',
        selected: false
      };
      setBeneficiaries([...beneficiaries, newBeneficiary]);
      setSelectedBeneficiary(newBeneficiary);
      setActiveModal('paymentConfirm');
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedBeneficiary(null);
    setPaymentAmount('');
    setPaymentCategory('');
    setNewBeneficiaryId('');
    setSearchResults([]);
  };

 const renderSocialPayModal = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 pb-3">
          <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
            Social Pay
          </h3>
          <button 
            onClick={closeModal} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4">
          {/* Amount input */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Amount</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
              placeholder="1500"
            />
          </div>

          {/* Purpose selection */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose</label>
            <div className="grid grid-cols-3 gap-2">
              {['Family', 'Loan', 'Donation'].map((category) => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={paymentCategory === category}
                    onChange={(e) => setPaymentCategory(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-2 rounded-xl border-2 text-center transition-all ${
                    paymentCategory === category 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}>
                    <span className="text-xs font-medium">{category}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

        
          
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setActiveModal('selectBeneficiary')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
          >
            Select Beneficiary
          </button>
        </div>

        <style jsx>{`
          /* Enhanced scrollbar styling - only for small devices */
          .h-[98vh] {
            scrollbar-width: thin;
            scrollbar-color: #10b981 #e5e7eb;
          }
          .h-[98vh]::-webkit-scrollbar {
            width: 8px;
          }
          .h-[98vh]::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
          
          /* Hide scrollbar on larger screens */
          @media (min-width: 640px) {
            .h-[98vh] {
              scrollbar-width: none;
            }
            .h-[98vh]::-webkit-scrollbar {
              display: none;
            }
          }
          
          /* Pulse Animation for Loading Dots */
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          .delay-100 {
            animation-delay: 0.1s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    </div>
  </div>
);

const renderSelectBeneficiaryModal = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-hidden">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 pb-3">
          <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
            Select Beneficiary
          </h3>
          <button 
            onClick={closeModal} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Beneficiary list */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pay To</label>
            <div className="space-y-2">
              {beneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  onClick={() => handleBeneficiarySelect(beneficiary)}
                  className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                    beneficiary.id === selectedBeneficiary?.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-gray-800">
                      {beneficiary.id}: {beneficiary.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {beneficiary.relationship}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search section */}
          <div className="border-t border-gray-200 pt-4 pb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search By ID Or Name
            </label>
            <input
              type="text"
              value={newBeneficiaryId}
              onChange={(e) => handleSearchBeneficiary(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all mb-3"
              placeholder="Enter ID or Name"
            />
            
            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleBeneficiarySelect(result)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-left hover:border-gray-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm text-gray-800">
                        {result.id}: {result.name}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {result.relationship}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed position button at bottom */}
        <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-200">
          <button
            onClick={handleAddBeneficiary}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
          >
            Search & Add Beneficiary
          </button>
        </div>

        <style jsx>{`
          /* Enhanced scrollbar styling */
          .overflow-y-auto {
            scrollbar-width: thin;
            scrollbar-color: gray #e5e7eb;
          }
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 4px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
        `}</style>
      </div>
    </div>
  </div>
);

 const renderPaymentConfirmModal = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 pb-3">
          <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
            Confirm Payment
          </h3>
          <button 
            onClick={closeModal} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main content - centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 space-y-4 text-center">
          {/* Dollar icon */}
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          
          {/* Payment details */}
          <h2 className="text-sm font-medium text-gray-600">You Are Sending</h2>
          <h3 className="text-xl font-bold text-gray-800">
            {selectedBeneficiary ? selectedBeneficiary.name : 'Ali Hassan Qadri'}
          </h3>
          <p className="text-xs text-gray-600">An Amount Of</p>
          <p className="text-2xl font-bold text-green-600">Rs. {paymentAmount || '1500'}</p>
          
          {/* Note section */}
          <div className="w-full border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700">Note:</p>
            <p className="text-xs text-gray-600">{paymentCategory || 'Family/Loan/Donation'}</p>
          </div>
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            onClick={closeModal}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
          >
            Confirm Payment
          </button>
        </div>

        <style jsx>{`
          /* Enhanced scrollbar styling - only for small devices */
          .h-[98vh] {
            scrollbar-width: thin;
            scrollbar-color: #10b981 #e5e7eb;
          }
          .h-[98vh]::-webkit-scrollbar {
            width: 8px;
          }
          .h-[98vh]::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
          
          /* Hide scrollbar on larger screens */
          @media (min-width: 640px) {
            .h-[98vh] {
              scrollbar-width: none;
            }
            .h-[98vh]::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  </div>
);
const renderSelfTopUpModal = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl overflow-y-auto sm:overflow-visible">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 pb-3">
          <h3 className="text-lg font-bold text-green-600 bg-white/20 px-3 py-1.5 rounded-full">
            Wallet Top Up
          </h3>
          <button 
            onClick={closeModal} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col px-4 pb-4 space-y-4">
          {/* Wallet ID */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet ID Number</label>
            <input
              type="text"
              defaultValue="784558712"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-mono text-sm"
              readOnly
            />
          </div>

          {/* Payment methods */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Payment Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-3 border-2 rounded-xl transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-medium text-xs text-center">{method.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="px-4 pb-4">
          <button
            onClick={closeModal}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium text-xs transition-all"
          >
            Proceed to Payment
          </button>
        </div>

        <style jsx>{`
          /* Enhanced scrollbar styling - only for small devices */
          .h-[98vh] {
            scrollbar-width: thin;
            scrollbar-color: #10b981 #e5e7eb;
          }
          .h-[98vh]::-webkit-scrollbar {
            width: 8px;
          }
          .h-[98vh]::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb {
            background: #10b981;
            border-radius: 4px;
          }
          .h-[98vh]::-webkit-scrollbar-thumb:hover {
            background: #059669;
          }
          
          /* Hide scrollbar on larger screens */
          @media (min-width: 640px) {
            .h-[98vh] {
              scrollbar-width: none;
            }
            .h-[98vh]::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
      </div>
    </div>
  </div>
);
  const renderMainPage = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Virtual Wallet</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Manage your finances with ease and security</p>
        </div>

        {/* Balance Card */}
        <div className="bg-green-500 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border border-gray-100">
          <div className="text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
            <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-white/10 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Wallet size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-medium opacity-90">Current Balance</h2>
                    <p className="text-xs sm:text-sm opacity-70">Available funds</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Rs. 500.00</p>
                  <p className="text-xs sm:text-sm opacity-70 mt-1">+2.5% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <button 
            onClick={handleSocialPay}
            className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Social Pay"
          >
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Social Pay</h3>
                <p className="text-xs sm:text-sm text-gray-600">Send money to your beneficiaries quickly and securely</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentPage('accountDetails')}
            className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Account Details"
          >
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CreditCard size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Account Details</h3>
                <p className="text-xs sm:text-sm text-gray-600">View comprehensive account information and statistics</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentPage('invoices')}
            className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Transaction History"
          >
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Transaction History</h3>
                <p className="text-xs sm:text-sm text-gray-600">Track all your healthcare and financial transactions</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setActiveModal('selfTopUp')}
            className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Wallet Top Up"
          >
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Wallet Top Up</h3>
                <p className="text-xs sm:text-sm text-gray-600">Add funds to your wallet using various payment methods</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountDetailsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-2 sm:space-x-3 text-gray-600 hover:text-blue-600 transition-colors bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl mb-4 sm:mb-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="font-medium text-sm sm:text-base">Back to Dashboard</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Account Details</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Spent</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Rs {accountDetails.totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-red-50 rounded-full flex items-center justify-center">
                <TrendingUp size={16} className="text-red-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Doctor Fees</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Rs {accountDetails.totalDoctorFee.toLocaleString()}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <FileText size={16} className="text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Social Pay</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Rs {accountDetails.totalDonation.toLocaleString()}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Users size={16} className="text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Top Up Spent</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Rs {accountDetails.totalTopUp.toLocaleString()}</p>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Wallet size={16} className="text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Account Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Bank Name</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{accountDetails.bankName}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Branch Name</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{accountDetails.branchName}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Account Number</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 font-mono">{accountDetails.accountNumber}</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Account Holder</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">Dr. Tariq</p>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl p-4 sm:p-6 col-span-1 sm:col-span-2">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Current Wallet Balance</p>
              <div className="flex items-center space-x-3">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Wallet size={16} className="text-teal-600" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-600">Rs {accountDetails.walletAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoicesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-2 sm:space-x-3 text-gray-600 hover:text-blue-600 transition-colors bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl mb-4 sm:mb-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="font-medium text-sm sm:text-base">Back to Dashboard</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Transaction History</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-4 sm:mb-6 gap-2">
          <button
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ${activeTab === 'topup' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('topup')}
          >
            Top Up
          </button>
          <button
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ${activeTab === 'doctorFees' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('doctorFees')}
          >
            Doctor Fees
          </button>
          <button
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ${activeTab === 'donations' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('donations')}
          >
            Social Pay
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-8 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Search transactions"
              />
              <Search className="absolute left-2 sm:left-3 top-2.5 text-gray-400" size={16} />
            </div>
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all text-xs sm:text-sm">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg text-xs sm:text-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          {activeTab === 'topup' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Method</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topUpData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-3">{item.method}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Completed'
                              ? 'bg-green-100 text-green-600'
                              : item.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'doctorFees' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Doctor</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorFeesData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">{item.doctor}</td>
                      <td className="py-3">{item.service}</td>
                      <td className="py-3">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Paid'
                              ? 'bg-green-100 text-green-600'
                              : item.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Purpose</th>
                    <th className="pb-3 font-medium">Recipient</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donationsData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-3">{item.date}</td>
                      <td className="py-3">{item.purpose}</td>
                      <td className="py-3">{item.recipient}</td>
                      <td className="py-3">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Completed'
                              ? 'bg-green-100 text-green-600'
                              : item.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'main' && renderMainPage()}
      {currentPage === 'accountDetails' && renderAccountDetailsPage()}
      {currentPage === 'invoices' && renderInvoicesPage()}
      {activeModal === 'socialPay' && renderSocialPayModal()}
      {activeModal === 'selectBeneficiary' && renderSelectBeneficiaryModal()}
      {activeModal === 'paymentConfirm' && renderPaymentConfirmModal()}
      {activeModal === 'selfTopUp' && renderSelfTopUpModal()}
    </>
  );
};

export default VirtualWallet;