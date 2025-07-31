import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download, 
  Eye,
  Search,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';

const DoctorFinancialAccount = () => {
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const financialSummary = {
    totalEarnings: 45680,
    thisMonthEarnings: 12450,
    pendingPayouts: 2380,
    completedConsultations: 186
  };

  const transactions = [
    {
      id: 'TXN001',
      type: 'consultation',
      patientName: 'Sarah Johnson',
      amount: 150,
      status: 'completed',
      date: '2024-01-30T14:30:00',
      consultationType: 'Private - Physical',
      paymentMethod: 'card'
    },
    {
      id: 'TXN002',
      type: 'consultation',
      patientName: 'Ahmed Khan',
      amount: 50,
      status: 'completed',
      date: '2024-01-30T11:15:00',
      consultationType: 'Angill - Online',
      paymentMethod: 'wallet'
    },
    {
      id: 'TXN003',
      type: 'withdrawal',
      patientName: 'Bank Transfer',
      amount: -5000,
      status: 'pending',
      date: '2024-01-29T16:00:00',
      consultationType: 'Withdrawal to Account',
      paymentMethod: 'bank'
    },
    {
      id: 'TXN004',
      type: 'consultation',
      patientName: 'Maria Garcia',
      amount: 120,
      status: 'completed',
      date: '2024-01-29T09:45:00',
      consultationType: 'Private - Online',
      paymentMethod: 'card'
    },
    {
      id: 'TXN005',
      type: 'consultation',
      patientName: 'Hassan Ali',
      amount: 50,
      status: 'completed',
      date: '2024-01-28T15:20:00',
      consultationType: 'Angill - Online',
      paymentMethod: 'wallet'
    },
    {
      id: 'TXN006',
      type: 'bonus',
      patientName: 'Performance Bonus',
      amount: 500,
      status: 'completed',
      date: '2024-01-28T00:00:00',
      consultationType: 'Monthly Performance',
      paymentMethod: 'system'
    },
    {
      id: 'TXN007',
      type: 'consultation',
      patientName: 'Fatima Sheikh',
      amount: 180,
      status: 'failed',
      date: '2024-01-27T13:10:00',
      consultationType: 'Private - Physical',
      paymentMethod: 'card'
    },
    {
      id: 'TXN008',
      type: 'consultation',
      patientName: 'John Doe',
      amount: 50,
      status: 'completed',
      date: '2024-01-27T10:30:00',
      consultationType: 'Angill - Online',
      paymentMethod: 'wallet'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.consultationType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-50';
      case 'pending': return 'text-yellow-500 bg-yellow-50';
      case 'failed': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'consultation': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'withdrawal': return <ArrowDownLeft className="w-4 h-4 text-red-500" />;
      case 'bonus': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default: return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Account</h1>
            <p className="text-gray-600 mt-1">Track your earnings and manage payouts</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Wallet className="w-4 h-4" />
              Request Payout
            </button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${financialSummary.totalEarnings.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${financialSummary.thisMonthEarnings.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Payouts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${financialSummary.pendingPayouts.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">Processing 2-3 days</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Consultations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {financialSummary.completedConsultations}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">This month</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-full sm:w-64"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="all">All Transactions</option>
                <option value="consultation">Consultations</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="bonus">Bonuses</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <p className="text-gray-600 mt-1">Your payment history and earnings breakdown</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Transaction</th>
                  <th className="text-left p-4 font-medium text-gray-700">Type</th>
                  <th className="text-left p-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  <th className="text-left p-4 font-medium text-gray-700">Date</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.patientName}</p>
                          <p className="text-sm text-gray-500">{transaction.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {transaction.consultationType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {transaction.status === 'pending' && <Clock className="w-3 h-3" />}
                        {transaction.status === 'failed' && <XCircle className="w-3 h-3" />}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4 sm:mb-0">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="w-10 h-10 bg-green-500 text-white rounded-lg font-medium">1</button>
                <button className="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">2</button>
                <button className="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">3</button>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFinancialAccount;