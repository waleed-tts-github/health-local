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
  Clock,
  CheckCircle,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Angel Doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [likedDoctors, setLikedDoctors] = useState(new Set());

  const specialties = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics'];
  const locations = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

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
      completedConsultations: 245
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
      completedConsultations: 189
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
      completedConsultations: 167
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
      completedConsultations: 298
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
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

  return (
    <div className="min-h-screen bg-white">
      {/* Fiverr-style Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="py-4">
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
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                <option value="All">Category</option>
                {specialties.slice(1).map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                <option value="All">Location</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More filters
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-200">
              {['Angel Doctors', 'Private Doctors'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Results Header */}
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

        {/* Doctors Grid - Fiverr Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
              {/* Image Section */}
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  onClick={() => toggleLike(doctor.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`w-4 h-4 transition-colors ${
                    likedDoctors.has(doctor.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`} />
                </button>
                
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Doctor Header */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-base truncate">{doctor.name}</h3>
                      {doctor.isVerified && (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-green-600 text-sm font-medium">{doctor.specialty}</p>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {doctor.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>

                {/* Location and Experience */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{doctor.experience} years exp</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-1">Starting at</p>
                    <p className="text-xl font-bold text-gray-900">₨{doctor.price.toLocaleString()}</p>
                  </div>
                  <button onClick={()=>{navigate("/patient/doctor-profile/1")}} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                  setSelectedLocation('All');
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination - Fiverr Style */}
        {filteredDoctors.length > 0 && (
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">3</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;