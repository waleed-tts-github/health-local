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

  const beneficiaries = [
    { id: 1, name: 'Ali Hassan', relationship: 'Son', selected: false },
    { id: 2, name: 'Murtaza Hussain', relationship: 'Son', selected: false },
    { id: 3, name: 'Noor Fatima', relationship: 'Mother', selected: false },
    { id: 4, name: 'Shoukat Javed', relationship: 'Father', selected: false }
  ];

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
  };

  const handleAddBeneficiary = () => {
    if (newBeneficiaryId.trim()) {
      const newBeneficiary = {
        id: Date.now(),
        name: 'Ali Hassan Qadri',
        email: 'alihassan786@gmail.com',
        address: 'Sindh, Karachi'
      };
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
  };

  const renderSocialPayModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 #f3f4f6' }}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-green-600">Social Pay</h2>
          <button 
            onClick={closeModal} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Enter Amount</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all"
              placeholder="1500"
              aria-label="Payment amount"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Purpose</label>
            <div className="grid grid-cols-3 gap-3">
              {['Family', 'Loan', 'Donation'].map((category) => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={paymentCategory === category}
                    onChange={(e) => setPaymentCategory(e.target.value)}
                    className="sr-only"
                    aria-label={`Select ${category}`}
                  />
                  <div className={`p-3 rounded-xl border-2 text-center transition-all ${
                    paymentCategory === category 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-200 hover:border-green-300 text-gray-600'
                  }`}>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveModal('selectBeneficiary')}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Select Beneficiary
          </button>
        </div>
      </div>
    </div>
  );

  const renderSelectBeneficiaryModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-600">Select Beneficiary</h2>
          <button 
            onClick={closeModal} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Pay To</label>
            <div className="space-y-2">
              {beneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  onClick={() => handleBeneficiarySelect(beneficiary)}
                  className={`w-full p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm text-left ${
                    beneficiary.id === selectedBeneficiary?.id 
                      ? 'border-green-500 bg-green-50 shadow-sm' 
                      : 'border-gray-200 hover:border-green-300 bg-white'
                  }`}
                  aria-label={`Select ${beneficiary.name}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-gray-800">{beneficiary.id}: {beneficiary.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">{beneficiary.relationship}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="block text-xs font-semibold text-gray-700 mb-2">Search By ID Or Wallet</label>
            <input
              type="text"
              value={newBeneficiaryId}
              onChange={(e) => setNewBeneficiaryId(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all mb-3"
              placeholder="#12465468"
              aria-label="Search beneficiary"
            />
            <button
              onClick={handleAddBeneficiary}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Search & Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentConfirmModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign size={40} className="text-white" />
          </div>
          <h2 className="text-lg font-medium text-gray-600">You Are Sending</h2>
          <h3 className="text-3xl font-bold text-gray-800">{selectedBeneficiary ? selectedBeneficiary.name : 'Ali Hassan Qadri'}</h3>
          <p className="text-gray-600">An Amount Of</p>
          <p className="text-4xl font-bold text-green-600">Rs. {paymentAmount || '1500'}</p>
          <div className="text-gray-600 bg-gray-50 p-4 rounded-xl">
            <p className="font-semibold">Note:</p>
            <p>{paymentCategory || 'Family/Loan/Donation'}</p>
          </div>
          <button
            onClick={closeModal}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderSelfTopUpModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-green-600">Wallet Top Up</h2>
          <button 
            onClick={closeModal} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Wallet ID Number</label>
            <input
              type="text"
              defaultValue="784558712"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-mono"
              readOnly
              aria-label="Wallet ID"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">Select Payment Mode</label>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                    selectedPaymentMethod === method.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 bg-white'
                  }`}
                  aria-label={`Select ${method.name}`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-semibold text-sm text-center">{method.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            onClick={closeModal}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderMainPage = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Wallet</h1>
          <p className="text-lg text-gray-600">Manage your finances with ease and security</p>
        </div>

        {/* Balance Card */}
        <div className="bg-green-500 rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
          <div className=" text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Wallet size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium opacity-90">Current Balance</h2>
                    <p className="text-sm opacity-70">Available funds</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold">Rs. 500.00</p>
                  <p className="text-sm opacity-70 mt-1">+2.5% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={handleSocialPay}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Social Pay"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users size={28} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Social Pay</h3>
                <p className="text-gray-600">Send money to your beneficiaries quickly and securely</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentPage('accountDetails')}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Account Details"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CreditCard size={28} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Details</h3>
                <p className="text-gray-600">View comprehensive account information and statistics</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentPage('invoices')}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Transaction History"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity size={28} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Transaction History</h3>
                <p className="text-gray-600">Track all your healthcare and financial transactions</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setActiveModal('selfTopUp')}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:scale-[1.02]"
            aria-label="Wallet Top Up"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <TrendingUp size={28} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Wallet Top Up</h3>
                <p className="text-gray-600">Add funds to your wallet using various payment methods</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountDetailsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Account Details</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">Rs {accountDetails.totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <TrendingUp size={20} className="text-red-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Doctor Fees</p>
                <p className="text-2xl font-bold text-gray-900">Rs {accountDetails.totalDoctorFee.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Social Pay</p>
                <p className="text-2xl font-bold text-gray-900">Rs {accountDetails.totalDonation.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Users size={20} className="text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Top Up Spent</p>
                <p className="text-2xl font-bold text-gray-900">Rs {accountDetails.totalTopUp.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Wallet size={20} className="text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Bank Name</p>
              <p className="text-lg font-bold text-gray-900">{accountDetails.bankName}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Branch Name</p>
              <p className="text-lg font-bold text-gray-900">{accountDetails.branchName}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Account Number</p>
              <p className="text-lg font-bold text-gray-900 font-mono">{accountDetails.accountNumber}</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Account Holder</p>
              <p className="text-lg font-bold text-gray-900">Dr. Tariq</p>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-2">
              <p className="text-sm font-medium text-gray-600 mb-2">Current Wallet Balance</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Wallet size={20} className="text-teal-600" />
                </div>
                <p className="text-3xl font-bold text-teal-600">Rs {accountDetails.walletAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoicesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'topup' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('topup')}
          >
            Top Up
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'doctorFees' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('doctorFees')}
          >
            Doctor Fees
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'donations' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            onClick={() => setActiveTab('donations')}
          >
            Social Pay
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Search transactions"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {activeTab === 'topup' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Method</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topUpData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-4">{item.date}</td>
                      <td className="py-4">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-4">{item.method}</td>
                      <td className="py-4">
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
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={20} />
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
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Doctor</th>
                    <th className="pb-4 font-medium">Service</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorFeesData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-4">{item.date}</td>
                      <td className="py-4">{item.doctor}</td>
                      <td className="py-4">{item.service}</td>
                      <td className="py-4">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-4">
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
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={20} />
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
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600">
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Purpose</th>
                    <th className="pb-4 font-medium">Recipient</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donationsData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="py-4">{item.date}</td>
                      <td className="py-4">{item.purpose}</td>
                      <td className="py-4">{item.recipient}</td>
                      <td className="py-4">Rs {item.amount.toLocaleString()}</td>
                      <td className="py-4">
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
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800" aria-label="View details">
                          <Eye size={20} />
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