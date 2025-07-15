import React, { useContext } from 'react';
import { Search, Heart, Star, MapPin, Calendar, CheckCircle, Award, Shield } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const DoctorList = ({ filteredDoctors, likedDoctors, toggleLike, navigate, resetFilters }) => {
  const { setCurrentModal } = useContext(BookingContext);

  return (
    <div>
      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleLike(doctor.id)}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                    likedDoctors.has(doctor.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`}
                />
              </button>

              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
                <span className="bg-green-500 text-white text-xs sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {doctor.specialty}
                </span>
                {doctor.isAngel && (
                  <span className="bg-yellow-400 text-white text-xs sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1">
                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Angel Doctor
                  </span>
                )}
                {!doctor.isAngel && (
                  <span className="bg-blue-500 text-white text-xs sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-0.5 sm:gap-1">
                    <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Private Doctor
                  </span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-5">
              {/* Doctor Header */}
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{doctor.name}</h3>
                    {doctor.isVerified && (
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-green-600 text-xs sm:text-sm font-medium">{doctor.specialty}</p>
                    <div className="text-right">
                      <p className="text-xs sm:text-xs text-gray-500 uppercase mb-0.5 sm:mb-1">Starting at</p>
                      <p className="text-base sm:text-lg font-bold text-gray-900">₨{doctor.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                {doctor.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900">{doctor.rating}</span>
                <span className="text-xs sm:text-sm text-gray-500">({doctor.reviews} reviews)</span>
              </div>

              {/* Location and Experience */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                  <span>{doctor.experience} years exp</span>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/patient/doctors/${doctor.id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  View Profile
                </button>
                <button
                  onClick={() => setCurrentModal('connect')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="max-w-sm sm:max-w-md mx-auto">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">No services found</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={resetFilters}
              className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredDoctors.length > 0 && (
        <div className="flex items-center justify-center mt-8 sm:mt-12">
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-gray-400 transition-colors">
              Previous
            </button>
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm">1</button>
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-gray-400 transition-colors">
              2
            </button>
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-gray-400 transition-colors">
              3
            </button>
            <button className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-gray-400 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;