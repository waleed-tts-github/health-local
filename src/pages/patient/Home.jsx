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
      price: 3500,
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
    navigate("/patient",{replace:true}); // Navigate to the previous page
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

        {/* Fiverr-style Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="py-4">
              {/* Header with Back Button and Tabs */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back</span>
                </button>
                <div className="flex space-x-4">
                  {['Angel Doctors', 'Private Doctors'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-md ${
                        activeTab === tab
                          ? 'bg-green-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                      } flex items-center gap-2`}
                    >
                      {tab === 'Angel Doctors' && <Award className="w-5 h-5" />}
                      {tab === 'Private Doctors' && <Shield className="w-5 h-5" />}
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Information and Favorites Toggle */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-green-700 text-sm font-bold bg-green-100 px-4 py-2 rounded-lg shadow-sm">
                  {activeTab === 'Angel Doctors'
                    ? 'Angel Doctors have a fixed fees structure'
                    : 'Private Doctors have their own fees'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-900">
                    Show Favorites
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

              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for any medical service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 placeholder-gray-500"
                    />
                  </div>
                  <button className="ml-3 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    Search
                  </button>
                  <button
                    onClick={openFilterModal}
                    className="ml-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-green-100/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-green-700">Filter Doctors</h3>
                <button
                  onClick={closeFilterModal}
                  className="p-2 bg-green-100/80 hover:bg-green-200/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <X className="w-5 h-5 text-green-700" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Specialty</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Gender</label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {ratings.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Availability</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {availabilities.map((availability) => (
                      <option key={availability} value={availability}>
                        {availability}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">Experience</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                  >
                    {experiences.map((experience) => (
                      <option key={experience} value={experience}>
                        {experience}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeFilterModal}
                  className="px-6 py-3 bg-gray-50 border border-gray-100 text-gray-900 text-sm font-semibold rounded-lg hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={closeFilterModal}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{activeTab}</h1>
              <p className="text-gray-600 text-sm mt-1">{filteredDoctors.length} services available</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white">
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
        <BookAppointmentModal />
      </div>
    </BookingProvider>
  );
};

export default Home;