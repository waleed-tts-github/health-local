import React, { useState } from 'react';
import { Search, Star, Calendar, Filter } from 'lucide-react';

const DoctorReviews = () => {
  const [filterRating, setFilterRating] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for reviews with MRN
  const reviews = [
    {
      id: 'REV001',
      patientName: 'Sarah Johnson',
      mrn: 'MRN-1001',
      rating: 5,
      comment: 'Excellent consultation, very thorough and caring doctor!',
      date: '2024-01-30T14:30:00',
    },
    {
      id: 'REV002',
      patientName: 'Ahmed Khan',
      mrn: 'MRN-1002',
      rating: 4,
      comment: 'Good experience, but the wait time was a bit long.',
      date: '2024-01-29T11:15:00',
    },
    {
      id: 'REV003',
      patientName: 'Maria Garcia',
      mrn: 'MRN-1003',
      rating: 5,
      comment: 'Dr. John was amazing, highly recommend!',
      date: '2024-01-28T09:45:00',
    },
    {
      id: 'REV004',
      patientName: 'Hassan Ali',
      mrn: 'MRN-1004',
      rating: 3,
      comment: 'Decent consultation, but expected more detailed advice.',
      date: '2024-01-27T15:20:00',
    },
    {
      id: 'REV005',
      patientName: 'Fatima Sheikh',
      mrn: 'MRN-1005',
      rating: 5,
      comment: 'Very professional and attentive, best doctor I’ve seen!',
      date: '2024-01-26T13:10:00',
    },
    {
      id: 'REV006',
      patientName: 'John Doe',
      mrn: 'MRN-1006',
      rating: 2,
      comment: 'Not satisfied with the consultation, felt rushed.',
      date: '2024-01-25T10:30:00',
    },
  ];

  // Filter reviews based on rating, date range, and search query
  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesSearch = review.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateRange === 'custom' && customDateRange.start && customDateRange.end) {
      const reviewDate = new Date(review.date);
      const startDate = new Date(customDateRange.start);
      const endDate = new Date(customDateRange.end);
      matchesDate = reviewDate >= startDate && reviewDate <= endDate;
    } else if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - days);
      matchesDate = new Date(review.date) >= thresholdDate;
    }
    
    return matchesRating && matchesSearch && matchesDate;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Patient Reviews</h1>
            <p className="text-sm text-gray-600">View and filter patient feedback</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Reviews</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews by name, MRN, or comment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => {
                  setDateRange(e.target.value);
                  if (e.target.value !== 'custom') {
                    setCustomDateRange({ start: '', end: '' });
                  }
                }}
                className="px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              {dateRange === 'custom' && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border border-gray-200 rounded-full text-gray-900 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reviews ({filteredReviews.length})</h3>
          {filteredReviews.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <Search className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No reviews found for the selected criteria</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {review.patientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{review.patientName}</p>
                        <div>{renderStars(review.rating)}</div>
                      </div>
                      <p className="mt-1 text-[10px] text-gray-500">MRN: {review.mrn}</p>
                      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                      <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredReviews.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                Showing {filteredReviews.length} of {reviews.length} reviews
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-900 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 bg-green-500 text-white rounded-full font-medium">1</button>
                  <button className="w-10 h-10 border border-gray-200 rounded-full text-gray-900 hover:bg-green-50 transition-colors">2</button>
                  <button className="w-10 h-10 border border-gray-200 rounded-full text-gray-900 hover:bg-green-50 transition-colors">3</button>
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-900 hover:bg-green-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;