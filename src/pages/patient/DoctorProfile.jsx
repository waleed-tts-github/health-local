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
        className={`w-4 h-4 ${
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
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Back Button */}
      <BackButton />
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Doctor Image */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {doctor.verified && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{doctor.location}</span>
                </div>
                
                {/* Rating and Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(doctor.rating)}
                    </div>
                    <span className="font-semibold text-gray-900">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{doctor.reviews} reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{doctor.experience}</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Fee and Availability */}
            <div className="flex-shrink-0 text-right">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Consultation Fee</div>
                <div className="text-2xl font-bold text-gray-900">PKR {doctor.fee}</div>
                <div className="flex items-center gap-1 text-emerald-600 mt-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{doctor.nextAvailable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About Doctor</h2>
          <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
        </div>

        {/* Stats Section */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{doctor.experience}</div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{doctor.reviews}+</div>
              <div className="text-sm text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{doctor.rating}★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-8 py-6 bg-white border-t border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Reviews</h2>
          <div className="space-y-4">
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
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-sm">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
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
                <p className="text-gray-600 text-sm leading-relaxed ml-13">{review.review}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View all {doctor.reviews} reviews
            </button>
          </div>
        </div>

        {/* Action Section */}
        <div className="px-8 py-6 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-4">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Book An Appointment
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Available for online and in-person consultations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;