import React, { useState } from 'react';
import { 
  Search, Filter, Star, Heart, MapPin, User, 
  Clock, Award, GraduationCap, Stethoscope,
  X, ChevronDown, ChevronLeft, ChevronRight
} from 'lucide-react';

const Home = () => {
  const [activeMainTab, setActiveMainTab] = useState('angel');
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());

  const [filters, setFilters] = useState({
    specialty: '',
    city: '',
    gender: '',
    minRating: 0,
    priceRange: { min: 0, max: 10000 },
    experience: '',
    availability: ''
  });

  // Sample data
  const doctorsData = {
    angel: {
      general: [
        {
          id: 1,
          name: "Dr. Sarah Ahmed",
          specialty: "General Physician",
          photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
          description: "Experienced general physician with 10+ years in family medicine. Specializes in preventive care and chronic disease management.",
          rating: 4.8,
          reviews: 245,
          city: "Lahore",
          gender: "Female",
          experience: "10+ years",
          price: 1500,
          availability: "Available Today"
        },
        {
          id: 2,
          name: "Dr. Hassan",
          specialty: "General Physician",
          photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
          description: "Dedicated family doctor focusing on comprehensive healthcare for all ages. Expert in diagnosing common illnesses.",
          rating: 4.6,
          reviews: 189,
          city: "Karachi",
          gender: "Male",
          experience: "8+ years",
          price: 1200,
          availability: "Tomorrow"
        },
        {
          id: 3,
          name: "Dr. Fatima Khan",
          specialty: "General Physician",
          photo: "https://images.unsplash.com/photo-1594824475480-87c0e5b9e5b5?w=150&h=150&fit=crop&crop=face",
          description: "Compassionate healthcare provider with expertise in women's health and pediatric care. Fluent in multiple languages.",
          rating: 4.9,
          reviews: 312,
          city: "Islamabad",
          gender: "Female",
          experience: "12+ years",
          price: 1800,
          availability: "Available Today"
        }
      ],
      specialists: [
        {
          id: 4,
          name: "Dr. Ali Raza",
          specialty: "Cardiologist",
          photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
          description: "Leading heart specialist with expertise in interventional cardiology. Pioneer in minimally invasive procedures.",
          rating: 4.9,
          reviews: 156,
          city: "Lahore",
          gender: "Male",
          experience: "15+ years",
          price: 3000,
          availability: "Next Week"
        }
      ]
    },
    private: {
      general: [
        {
          id: 5,
          name: "Dr. Ayesha Malik",
          specialty: "General Physician",
          photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
          description: "Private practice specialist offering personalized care with modern diagnostic facilities and extended consultation time.",
          rating: 4.7,
          reviews: 98,
          city: "Lahore",
          gender: "Female",
          experience: "7+ years",
          price: 2500,
          availability: "Available Today"
        }
      ],
      specialists: [
        {
          id: 6,
          name: "Dr. Omar Sheikh",
          specialty: "Neurologist",
          photo: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face",
          description: "Renowned neurologist specializing in brain disorders and advanced neurological treatments with state-of-the-art equipment.",
          rating: 4.8,
          reviews: 124,
          city: "Karachi",
          gender: "Male",
          experience: "18+ years",
          price: 4000,
          availability: "Tomorrow"
        }
      ]
    }
  };

  const mainTabs = [
    { id: 'angel', label: 'Angel Doctors', icon: Heart },
    { id: 'private', label: 'Private Doctors', icon: User }
  ];

  const subTabs = [
    { id: 'general', label: 'General Doctors', icon: Stethoscope },
    { id: 'specialists', label: 'Specialists', icon: GraduationCap }
  ];

  const specialties = [
    'General Physician', 'Cardiologist', 'Neurologist', 'Dermatologist', 
    'Pediatrician', 'Gynecologist', 'Orthopedic', 'Psychiatrist'
  ];

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

  const currentDoctors = doctorsData[activeMainTab][activeSubTab] || [];

  const filteredDoctors = currentDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !filters.specialty || doctor.specialty === filters.specialty;
    const matchesCity = !filters.city || doctor.city === filters.city;
    const matchesGender = !filters.gender || doctor.gender === filters.gender;
    const matchesRating = doctor.rating >= filters.minRating;
    const matchesPrice = doctor.price >= filters.priceRange.min && doctor.price <= filters.priceRange.max;
    
    return matchesSearch && matchesSpecialty && matchesCity && matchesGender && matchesRating && matchesPrice;
  });

  const toggleFavorite = (doctorId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(doctorId)) {
      newFavorites.delete(doctorId);
    } else {
      newFavorites.add(doctorId);
    }
    setFavorites(newFavorites);
  };

  const resetFilters = () => {
    setFilters({
      specialty: '',
      city: '',
      gender: '',
      minRating: 0,
      priceRange: { min: 0, max: 10000 },
      experience: '',
      availability: ''
    });
  };

  const doctorsPerPage = 6;
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const displayedDoctors = filteredDoctors.slice(startIndex, startIndex + doctorsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen backdrop-blur-xl bg-white/20 border border-white/30">
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-10 text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-3">
                Find Your Perfect Doctor
              </h1>
              <p className="text-base text-indigo-700/80 font-medium">
                Connect with qualified healthcare professionals near you
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="backdrop-blur-xl bg-white/15 rounded-3xl shadow-2xl border border-white/30 p-6 mb-10 hover:bg-white/20 transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-5 py-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 focus:bg-white/30 outline-none transition-all duration-300 text-gray-800 placeholder-indigo-400/70 text-sm"
                />
              </div>
              
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl h text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-sm backdrop-blur-xl"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-indigo-700/80 font-medium text-sm">
              Found {filteredDoctors.length} doctors matching your criteria
            </div>
          </div>

          {/* Main Tabs */}
          <div className="mb-6">
            <div className="flex space-x-2 backdrop-blur-xl bg-white/20 p-2 rounded-2xl w-fit border border-white/30 shadow-xl">
              {mainTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveMainTab(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-sm ${
                      activeMainTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl transform scale-105'
                        : 'text-indigo-700/80 hover:text-indigo-900 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="mb-10">
            <div className="flex space-x-2 backdrop-blur-xl bg-white/15 p-2 rounded-2xl w-fit shadow-lg border border-white/20">
              {subTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveSubTab(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-sm ${
                      activeSubTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-indigo-700/70 hover:text-indigo-900 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {displayedDoctors.map((doctor) => (
              <div key={doctor.id} className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group border-b border-white/30 hover:bg-white/25 hover:scale-105 transform">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <button
                    onClick={() => toggleFavorite(doctor.id)}
                    className={`absolute top-5 right-5 p-2 rounded-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-110 ${
                      favorites.has(doctor.id)
                        ? 'bg-red-500/90 text-white shadow-xl'
                        : 'bg-white/30 text-white hover:bg-white/40 border border-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(doctor.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute top-5 left-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-2xl text-xs font-semibold shadow-xl backdrop-blur-xl">
                    {doctor.availability}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-indigo-600 font-semibold text-sm">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1 backdrop-blur-xl bg-yellow-400/20 px-2 py-1 rounded-2xl border border-yellow-300/30">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900 text-sm">{doctor.rating}</span>
                      <span className="text-gray-600 text-xs">({doctor.reviews})</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-xs mb-4 leading-relaxed">{doctor.description}</p>

                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium">{doctor.city}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      PKR {doctor.price.toLocaleString()}
                    </div>
                    <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold text-sm shadow-xl hover:shadow-2xl transform hover:scale-105">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 shadow-lg text-sm ${
                    currentPage === index + 1
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white transform scale-110'
                      : 'backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 text-indigo-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          )}

          {/* Filter Modal */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 pt-12 z-50">
              <div className="backdrop-blur-xl bg-white/25 rounded-3xl shadow-3xl w-full max-w-4xl border border-white/30">
                <div className="p-5 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-white/20 rounded-2xl transition-all duration-300 backdrop-blur-xl"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Specialty and City Filters */}
                  <div className="space-y-5">
                    {/* Specialty Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Specialty</label>
                      <select
                        value={filters.specialty}
                        onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                        className="w-full p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 outline-none transition-all duration-300 text-gray-800 text-sm"
                      >
                        <option value="">All Specialties</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>

                    {/* City Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">City</label>
                      <select
                        value={filters.city}
                        onChange={(e) => setFilters({...filters, city: e.target.value})}
                        className="w-full p-3 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 outline-none transition-all duration-300 text-gray-800 text-sm"
                      >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Gender and Rating Filters */}
                  <div className="space-y-5">
                    {/* Gender Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Gender</label>
                      <div className="flex flex-wrap gap-3">
                        {['Male', 'Female'].map(gender => (
                          <button
                            key={gender}
                            onClick={() => setFilters({...filters, gender: filters.gender === gender ? '' : gender})}
                            className={`px-5 py-2 rounded-2xl border transition-all duration-300 font-semibold flex-1 min-w-[80px] text-sm ${
                              filters.gender === gender
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-xl'
                                : 'backdrop-blur-xl bg-white/20 border-white/30 hover:bg-white/30 text-gray-800'
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Minimum Rating</label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setFilters({...filters, minRating: rating})}
                            className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-2xl border transition-all duration-300 font-semibold min-w-[50px] text-sm ${
                              filters.minRating === rating
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-transparent shadow-xl'
                                : 'backdrop-blur-xl bg-white/20 border-white/30 hover:bg-white/30 text-gray-800'
                            }`}
                          >
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span>{rating}+</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Price Range: PKR {filters.priceRange.min} - PKR {filters.priceRange.max}
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        value={filters.priceRange.min}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, min: parseInt(e.target.value)}
                        })}
                        className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="500"
                        value={filters.priceRange.max}
                        onChange={(e) => setFilters({
                          ...filters, 
                          priceRange: {...filters.priceRange, max: parseInt(e.target.value)}
                        })}
                        className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-white/20 flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-5 py-3 backdrop-blur-xl bg-white/20 border border-white/30 text-gray-800 rounded-2xl hover:bg-white/30 transition-all duration-300 font-semibold text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold text-sm shadow-xl"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;