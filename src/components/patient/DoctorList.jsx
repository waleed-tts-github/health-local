import React, { useContext } from 'react';
import { Search, Heart, Star, MapPin, Calendar, CheckCircle, Award, Shield } from 'lucide-react';
import { BookingContext } from '../../contexts/BookingContext';

const DoctorList = ({ filteredDoctors, likedDoctors, toggleLike, navigate, resetFilters }) => {
  const { setCurrentModal } = useContext(BookingContext);

  return (
    <div>
      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => toggleLike(doctor.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    likedDoctors.has(doctor.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`}
                />
              </button>

              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {doctor.specialty}
                </span>
                {doctor.isAngel && (
                  <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Angel Doctor
                  </span>
                )}
                {!doctor.isAngel && (
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Private Doctor
                  </span>
                )}
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
                  <div className="flex items-center justify-between">
                    <p className="text-green-600 text-sm font-medium">{doctor.specialty}</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase mb-1">Starting at</p>
                      <p className="text-lg font-bold text-gray-900">₨{doctor.price.toLocaleString()}</p>
                    </div>
                  </div>
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

              {/* CTA Section */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/patient/doctors/${doctor.id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  View Profile
                </button>
                <button
                  onClick={() => setCurrentModal('connect')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={resetFilters}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      /* Pagination */
      {filteredDoctors.length > 0 && (
        <div className="flex items-center justify-center mt-12">
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;