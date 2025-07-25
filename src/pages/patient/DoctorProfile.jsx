import React from 'react';
import { Star, MapPin, Clock, Users, Award, CheckCircle } from 'lucide-react';
import BackButton from '../../components/BackButton';

const DoctorProfile = () => {
  const doctor = {
    name: "Dr. Sarah Ahmed",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    description: "Experienced cardiologist with over 10 years of practice. Specialized in interventional cardiology and preventive heart care. Committed to providing personalized treatment plans for optimal patient outcomes.",
    specialties: ["Cardiology", "Interventional Cardiology", "Preventive Medicine", "Heart Surgery"],
    experience: "10+ Years",
    reviews: 248,
    rating: 4.9,
    fee: "3,500",
    verified: true,
    location: "Lahore, Pakistan",
    nextAvailable: "Today 2:00 PM"
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 sm:w-4 h-3 sm:h-4 ${
          i < Math.floor(rating) 
            ? 'fill-amber-400 text-amber-400' 
            : i < rating 
            ? 'fill-amber-200 text-amber-200' 
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white">
      {/* Back Button */}
      <BackButton />
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Doctor Image */}
            <div className="relative flex-shrink-0">
              <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {doctor.verified && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-3 sm:space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{doctor.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-2 sm:mb-3">
                  <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="text-xs sm:text-sm">{doctor.location}</span>
                </div>
                
                {/* Rating and Reviews */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-gray-900">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs sm:text-sm">{doctor.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Award className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs sm:text-sm">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Fee and Availability */}
            <div className="flex-shrink-0 w-full sm:w-auto text-left sm:text-right">
              <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-gray-600 mb-1">Consultation Fee</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">PKR {doctor.fee}</div>
                <div className="flex items-center gap-1 text-emerald-600 mt-2">
                  <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
                  <span className="text-xs sm:text-sm">{doctor.nextAvailable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">About Doctor</h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{doctor.description}</p>
        </div>

        {/* Stats Section */}
        <div className="px-3 sm:p-4 lg:p-6 py-4 sm:p-4 lg:p-6 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">{doctor.experience}</div>
              <div className="text-xs sm:text-sm text-gray-600">Experience</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">{doctor.reviews}+</div>
              <div className="text-xs sm:text-sm text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">{doctor.rating}★</div>
              <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Patient Reviews</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                name: "Ahmad Hassan",
                rating: 5,
                review: "Excellent doctor! Very professional and caring. The treatment was effective and follow-up was thorough.",
                date: "2 weeks ago"
              },
              {
                name: "Maria Khan",
                rating: 5,
                review: "Dr. Sarah is amazing. She took time to explain everything clearly and made me feel comfortable throughout.",
                date: "1 month ago"
              },
              {
                name: "Ali Raza",
                rating: 4,
                review: "Great experience overall. The doctor was knowledgeable and the staff was very helpful.",
                date: "1 month ago"
              }
            ].map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-xs sm:text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-2 sm:w-3 h-2 sm:h-3 ${
                                i < review.rating 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed ml-10 sm:ml-13">{review.review}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 sm:mt-6 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-xs sm:text-sm" aria-label="View all reviews">
              View all {doctor.reviews} reviews
            </button>
          </div>
        </div>

        {/* Action Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-3 sm:gap-4">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl" aria-label="Book an appointment">
              Book An Appointment
            </button>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Available for online and in-person consultations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;