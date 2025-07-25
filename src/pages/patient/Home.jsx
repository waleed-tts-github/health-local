import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Heart,
  ChevronDown,
  Award,
  Shield,
  ArrowLeft,
  Star as StarIcon,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingProvider } from '../../contexts/BookingContext';
import DoctorList from '../../components/patient/DoctorList';
import BookingConnectModal from '../../components/patient/BookingConnectModel';
import WaitingModal from '../../components/patient/WaitingModel';
import NotAvailableModal from '../../components/patient/NotAvailableModel';
import ConfirmedModal from '../../components/patient/ConfirmedModel';
import QueueModal from '../../components/patient/QueueModel'
import PaymentModal from '../../components/patient/PaymentModel'
import SuccessModal from '../../components/patient/BookingSuccessModel'
import BookAppointmentModal from '../../components/patient/BookingAppointmentModel'
import MeetingModal from '../../components/patient/MeetingModel';
import NextInLineModal from '../../components/patient/NextInLineModel';
import FeedbackModal from '../../components/patient/FeedbackModel';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Angel Doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [likedDoctors, setLikedDoctors] = useState(new Set());
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const specialties = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  const locations = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
  const genders = ['All', 'Male', 'Female'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];
  const availabilities = ['All', 'Available Today', 'Available Tomorrow'];
  const experiences = ['All', '10+ years', '5+ years', '1+ years'];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Ahmed',
      specialty: 'Cardiology',
      description: 'Expert cardiologist specializing in heart disease prevention and treatment with 15+ years of experience.',
      rating: 4.9,
      reviews: 156,
      experience: 15,
      location: 'Lahore',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      responseTime: '1 hour',
      availability: 'Available Today',
      level: 'Top Rated',
      completedConsultations: 245,
      isAngel: true,
      gender: 'Female',
    },
    {
      id: 2,
      name: 'Dr. Ahmad Hassan',
      specialty: 'Dermatology',
            description: 'Renowned dermatologist offering advanced skincare treatments and cosmetic procedures.',
      rating: 4.8,
      reviews: 203,
      experience: 12,
      location: 'Karachi',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      responseTime: '30 mins',
      availability: 'Available Tomorrow',
      level: 'Level 2',
      completedConsultations: 189,
      isAngel: false,
      gender: 'Male',
    },
    {
      id: 4,
      name: 'Dr. Ali Raza',
      specialty: 'Pediatrics',
      description: 'Compassionate pediatrician dedicated to providing comprehensive healthcare for children.',
      rating: 4.7,
      reviews: 134,
      experience: 10,
      location: 'Lahore',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      responseTime: '45 mins',
      availability: 'Available Today',
      level: 'Level 2',
      completedConsultations: 167,
      isAngel: true,
      gender: 'Male',
    },
    {
      id: 5,
      name: 'Dr. Ayesha Malik',
      specialty: 'Orthopedics',
      description: 'Orthopedic surgeon specializing in joint replacement and sports injury treatment.',
      rating: 4.8,
      reviews: 178,
      experience: 14,
      location: 'Rawalpindi',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      responseTime: '1 hour',
      availability: 'Available Tomorrow',
      level: 'Top Rated',
      completedConsultations: 298,
      isAngel: false,
      gender: 'Female',
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
    const matchesGender = selectedGender === 'All' || doctor.gender === selectedGender;
    const matchesRating = selectedRating === 'All' || doctor.rating >= parseFloat(selectedRating);
    const matchesAvailability = selectedAvailability === 'All' || doctor.availability === selectedAvailability;
    const matchesExperience =
      selectedExperience === 'All' ||
      (selectedExperience === '10+ years' && doctor.experience >= 10) ||
      (selectedExperience === '5+ years' && doctor.experience >= 5) ||
      (selectedExperience === '1+ years' && doctor.experience >= 1);
    const matchesTab = activeTab === 'Angel Doctors' ? doctor.isAngel : !doctor.isAngel;
    const matchesFavorites = !showFavorites || likedDoctors.has(doctor.id);

    return (
      matchesSearch &&
      matchesSpecialty &&
      matchesLocation &&
      matchesGender &&
      matchesRating &&
      matchesAvailability &&
      matchesExperience &&
      matchesTab &&
      matchesFavorites
    );
  });

  const toggleLike = (doctorId) => {
    const newLiked = new Set(likedDoctors);
    if (newLiked.has(doctorId)) {
      newLiked.delete(doctorId);
    } else {
      newLiked.add(doctorId);
    }
    setLikedDoctors(newLiked);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleBack = () => {
    navigate("/patient", { replace: true });
  };

  return (
    <BookingProvider>
      <div className={`min-h-screen bg-white transition-all duration-300 ${isFilterModalOpen ? 'mt-[-100px]' : ''}`}>
        <style>
          {`
            .toggle-switch {
              position: relative;
              display: inline-block;
              width: 32px;
              height: 16px;
            }
            
            .toggle-switch input {
              opacity: 0;
              width: 0;
              height: 0;
            }
            
            .toggle-slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #e5e7eb;
              border-radius: 16px;
              transition: all 0.3s ease;
            }
            
            .toggle-slider:before {
              position: absolute;
              content: "";
              height: 12px;
              width: 12px;
              left: 2px;
              bottom: 2px;
              background: white;
              border-radius: 50%;
              transition: all 0.3s ease;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            }
            
            input:checked + .toggle-slider {
              background: #10b981;
            }
            
            input:checked + .toggle-slider:before {
              transform: translateX(16px);
            }
          `}
        </style>

        {/* Responsive Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="py-3 sm:py-4">
              {/* Header with Back Button and Tabs */}
              <div className="flex items-center mb-3 sm:mb-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Back</span>
                </button>
                
                {/* Centered Responsive Tabs */}
                <div className="flex-1 flex justify-center">
                  <div className="flex space-x-2 sm:space-x-4">
                    {['Angel Doctors', 'Private Doctors'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-semibold sm:font-bold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md ${
                          activeTab === tab
                            ? 'bg-green-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                        } flex items-center gap-1 sm:gap-2`}
                      >
                        {tab === 'Angel Doctors' && <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                        {tab === 'Private Doctors' && <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                        <span className="hidden sm:inline">{tab}</span>
                        <span className="sm:hidden">{tab === 'Angel Doctors' ? 'Angel' : 'Private'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fee Information and Favorites Toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                <p className="text-green-700 text-xs sm:text-sm font-bold bg-green-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-sm">
                  {activeTab === 'Angel Doctors'
                    ? 'Angel Doctors have fixed fees'
                    : 'Private Doctors have own fees'}
                </p>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-medium text-gray-900">
                    <span className="hidden sm:inline">Show </span>Favorites
                  </span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={showFavorites}
                      onChange={() => setShowFavorites(!showFavorites)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {/* Responsive Search Bar */}
              <div className="relative mb-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search medical services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-sm sm:text-base text-gray-700 placeholder-gray-500"
                    />
                  </div>
                  
                  {/* Mobile: Stack buttons vertically, Desktop: Side by side */}
                  <div className="flex gap-2 sm:ml-3">
                    <button className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                      Search
                    </button>
                    <button
                      onClick={openFilterModal}
                      className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">Filters</span>
                      <span className="sm:hidden">Filter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
            <div className="bg-green-50/20 backdrop-blur-2xl rounded-3xl max-w-md w-full h-[98vh] flex flex-col shadow-2xl border border-green-200/30 overflow-y-auto sm:overflow-visible relative">
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 via-white/5 to-green-200/10 rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <h3 className="text-lg font-bold text-white bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Filter Doctors
                  </h3>
                  <button
                    onClick={closeFilterModal}
                    className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-white/20"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Main content - centered */}
                <div className="flex-1 flex flex-col px-4 pb-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Specialty</label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty} className="text-gray-900">
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {locations.map((location) => (
                          <option key={location} value={location} className="text-gray-900">
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Gender</label>
                      <select
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {genders.map((gender) => (
                          <option key={gender} value={gender} className="text-gray-900">
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Rating</label>
                      <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {ratings.map((rating) => (
                          <option key={rating} value={rating} className="text-gray-900">
                            {rating}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Availability</label>
                      <select
                        value={selectedAvailability}
                        onChange={(e) => setSelectedAvailability(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {availabilities.map((availability) => (
                          <option key={availability} value={availability} className="text-gray-900">
                            {availability}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1">Experience</label>
                      <select
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg backdrop-blur-sm"
                      >
                        {experiences.map((experience) => (
                          <option key={experience} value={experience} className="text-gray-900">
                            {experience}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="px-4 pb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={closeFilterModal}
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={closeFilterModal}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Results Section */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{activeTab}</h1>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">{filteredDoctors.length} services available</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600">Sort by:</span>
              <select className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-green-500 bg-white">
                <option>Relevance</option>
                <option>Best Selling</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <DoctorList
            filteredDoctors={filteredDoctors}
            likedDoctors={likedDoctors}
            toggleLike={toggleLike}
            navigate={navigate}
          />
        </div>

        {/* Modals */}
        <BookingConnectModal />
        <WaitingModal />
        <NotAvailableModal />
        <ConfirmedModal />
        <QueueModal />
        <PaymentModal />
        <SuccessModal />
        <FeedbackModal />
        <BookAppointmentModal />
        <NextInLineModal />
        <MeetingModal />
      </div>
    </BookingProvider>
  );
};

export default Home;