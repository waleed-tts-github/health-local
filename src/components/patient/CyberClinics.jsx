import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Shield, Star, Phone, Clock, Users, Globe, Heart, CheckCircle, ChevronRight } from 'lucide-react';
import logo from '../../assets/Group.png'
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
const AngillCyberClinics = () => {
  const [activeTab, setActiveTab] = useState('partnership');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const {setCurrentStep} =useConsultationFlow()

  const clinics = [
    {
      id: 1,
      name: "George Cyber Angill Clinic",
      rating: 4.9,
      reviews: 48,
      hours: "Open 24 Hours",
      address: "Main Street, Lahore Center",
      phone: "+92 300 1234567",
      services: ["Telemedicine", "Pharmacy", "Lab Tests"],
      position: { top: '45%', left: '55%' }
    },
    {
      id: 2,
      name: "Central Angill Clinic",
      rating: 4.8,
      reviews: 32,
      hours: "Open 24 Hours",
      address: "Central Plaza, Gulberg",
      phone: "+92 300 7654321",
      services: ["Emergency Care", "Consultation", "Pharmacy"],
      position: { top: '60%', left: '45%' }
    },
    {
      id: 3,
      name: "North Angill Clinic",
      rating: 4.7,
      reviews: 28,
      hours: "Open 24 Hours",
      address: "Model Town, Block A",
      phone: "+92 300 1122334",
      services: ["Pediatrics", "General Medicine", "Lab"],
      position: { top: '35%', left: '65%' }
    },
    {
      id: 4,
      name: "East Angill Clinic",
      rating: 4.9,
      reviews: 55,
      hours: "Open 24 Hours",
      address: "DHA Phase 3, Commercial",
      phone: "+92 300 9988776",
      services: ["Cardiology", "Dermatology", "Pharmacy"],
      position: { top: '50%', left: '75%' }
    },
    {
      id: 5,
      name: "West Angill Clinic",
      rating: 4.6,
      reviews: 41,
      hours: "Open 24 Hours",
      address: "Township, Block C",
      phone: "+92 300 5566778",
      services: ["Orthopedics", "Physiotherapy", "Lab"],
      position: { top: '70%', left: '35%' }
    }
  ];

  const PartnershipTab = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-6">
          <img src={logo}/>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Become an Angill CyberClinic Partner
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Join the Movement to Make Healthcare Accessible Everywhere
        </p>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          Angill Healthcare invites you to be part of a revolutionary healthcare network through our CyberClinic Partnership Program — designed to bring verified medical services to underserved communities using digital technology.
        </p>
      </div>

      {/* Why Partner Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Heart className="w-8 h-8 text-red-500 mr-3" />
          Why Partner with Angill?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
            <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Launch Instantly</h3>
            <p className="text-gray-600">Set up a ready-to-use smart clinic pod or digital access point with ease.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <Shield className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Offer Verified Telemedicine</h3>
            <p className="text-gray-600">Connect your community with qualified doctors via our secure platform.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
            <Globe className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn with Impact</h3>
            <p className="text-gray-600">Build a sustainable income stream while delivering essential care.</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
            <Users className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Full Support</h3>
            <p className="text-gray-600">From training to tech, we provide everything you need to succeed.</p>
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-xl border border-teal-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalable Model</h3>
          <p className="text-gray-600">Proven approach that works across developing regions like Pakistan, India, and beyond.</p>
        </div>
      </div>

      {/* Who Can Join Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Users className="w-8 h-8 text-blue-600 mr-3" />
          Who Can Join?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[
            { title: "Nurses", icon: Heart, color: "from-pink-500 to-rose-500" },
            { title: "Pharmacists & Medical Store Owners", icon: Shield, color: "from-blue-500 to-cyan-500" }, 
            { title: "Local Clinic Operators", icon: Users, color: "from-purple-500 to-violet-500" },
            { title: "Health Entrepreneurs & NGOs", icon: Globe, color: "from-green-500 to-emerald-500" }
          ].map((role, index) => (
            <div key={index} className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Join our healthcare revolution</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-center text-white">
        <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-6 opacity-90">
          We're currently onboarding new partners.
        </p>
        <p className="mb-8 opacity-90">
          Fill out the form below or contact us today to schedule a discovery call.
        </p>
        <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg">
          Get Started Today
        </button>
        <p className="mt-6 text-lg opacity-90">
          Together, we can bridge the healthcare gap — one CyberClinic at a time
        </p>
      </div>
    </div>
  );

  const ClinicsTab = () => (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search clinics near me..."
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-gray-700 placeholder-gray-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div 
            className="relative bg-gradient-to-br from-green-50 to-teal-50 rounded-xl h-96 overflow-hidden border border-green-100 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-1123a9de3fa0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255,255,255,0.7)'
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
                <path d="M0 200L100 180L200 220L300 160L400 240L500 180L600 200L700 160L800 200V400H0V200Z" fill="#10b981" opacity="0.1"/>
                <path d="M0 100L150 120L300 80L450 140L600 100L800 120V400H0V100Z" fill="#0d9488" opacity="0.1"/>
              </svg>
            </div>
            
            {clinics.map((clinic) => (
              <div 
                key={clinic.id}
                className="absolute w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-700 transition-colors z-10"
                style={clinic.position}
                onClick={() => setSelectedClinic(clinic)}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
            ))}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Shield className="w-8 h-8 text-green-600" />
                  <span className="text-lg font-bold text-green-700">Angill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Info Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {selectedClinic ? (
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedClinic.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{selectedClinic.rating} ({selectedClinic.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>{selectedClinic.hours}</span>
                </div>
                
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>{selectedClinic.address}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>{selectedClinic.phone}</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClinic.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Click on a clinic marker to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Clinic List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">All Clinics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinics.map((clinic) => (
            <div 
              key={clinic.id} 
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedClinic?.id === clinic.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedClinic(clinic)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{clinic.name}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{clinic.rating} ({clinic.reviews})</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{clinic.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center relative">
            <button onClick={()=>{setCurrentStep(1)}} className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <ArrowLeft className="w-5 h-5 text-green-600" />
            </button>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-xl font-bold text-green-700">Angill Healthcare</h1>
                  <p className="text-sm text-gray-600">Revolutionary Healthcare Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('partnership')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'partnership'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Partnership Program
            </button>
            <button
              onClick={() => setActiveTab('clinics')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'clinics'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Find Clinics
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'partnership' ? <PartnershipTab /> : <ClinicsTab />}
      </div>
    </div>
  );
};

export default AngillCyberClinics;