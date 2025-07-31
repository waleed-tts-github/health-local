import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Shield, Star, Phone, Clock, Users, Globe, Heart, CheckCircle, ChevronRight, X } from 'lucide-react';
import logo from '../../assets/Group.png';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const AngillCyberClinics = () => {
  const [activeTab, setActiveTab] = useState('clinics');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const { setCurrentStep,handleServiceSelect,setIsBookingThroughClinic } = useConsultationFlow();
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

  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      address: '',
      personType: '',
      email: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setShowContactForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[97vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Partner with Angill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
              <select
                name="personType"
                value={formData.personType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              >
                <option value="">Select an option</option>
                <option value="nurse">Nursing Staff</option>
                <option value="pharmacist">Pharmacist/Medical Store Owner</option>
                <option value="clinicOperator">Local Clinic Operator/Doctor</option>
                <option value="entrepreneur">Health Entrepreneur/NGO</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PartnershipTab = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-300 rounded-sm mb-6">
          <img src={logo} alt="Angill Logo" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Become an Angill CyberClinic Partner
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          Join the Movement to Make Healthcare Accessible Everywhere
        </p>
        <p className="text-sm text-gray-500 max-w-3xl mx-auto">
          Angill Healthcare invites you to be part of a revolutionary healthcare network through our CyberClinic Partnership Program — designed to bring verified medical services to underserved communities using digital technology.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-3" />
          Why Partner with Angill?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
            <CheckCircle className="w-6 h-6 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible & Scalable</h3>
            <p className="text-sm text-gray-600">Extend clinic hours by attending remotely, and scale across multiple locations if desired.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <Shield className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Growing Asset Value</h3>
            <p className="text-sm text-gray-600">Your CyberClinic Pod grows in value as patient volume increases - it's an appreciating business asset.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
            <Globe className="w-6 h-6 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimal Investment, Maximum Opportunity</h3>
            <p className="text-sm text-gray-600">Start your own healthcare venture with low upfront cost and full platform support.</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
            <Users className="w-6 h-6 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Use Platform</h3>
            <p className="text-sm text-gray-600">Angill provides end-to-end tech, verified doctor networks, and administrative and revenue control so you can focus on service and growth.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <Users className="w-6 h-6 text-blue-600 mr-3" />
          Who Can Join?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[
            {
              title: "Nursing Staff",
              description: "Take charge of your future by becoming an Angill CyberClinic Partner. With minimal investment and full platform support, you can launch your own tech-enabled healthcare setup, serve your community, and grow professionally — all while making a meaningful impact where it’s needed most.",
              icon: Heart,
              color: "from-pink-500 to-rose-500"
            },
            {
              title: "Pharmacists & Medical Store Owners",
              description: "If you have available space at your outlet, you can install an Angill CyberClinic Pod and start running a telemedicine clinic today! Earn additional revenue through consultation services, increase footfall & upsell your medicine sales, serve your community with verified medical care, and enjoy quick setup with full platform support.",
              icon: Shield,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Local Clinic Operators & Doctors",
              description: "Extend your clinic hours and maximize revenue by remotely attending your clinic through the Angill CyberClinic platform. Our system allows you to serve patients beyond traditional hours — without being physically present — helping you optimize patient flow, increase accessibility, and boost your clinic's income potential.",
              icon: Users,
              color: "from-purple-500 to-violet-500"
            },
            {
              title: "Health Entrepreneurs & NGOs",
              description: "Health entrepreneurs and NGOs can play a vital role in bridging the healthcare gap in rural and underserved areas. By making a mutually beneficial investment in an Angill CyberClinic, you not only create social impact but also establish a sustainable model that supports your mission and the local community.",
              icon: Globe,
              color: "from-green-500 to-emerald-500"
            }
          ].map((role, index) => (
            <div key={index} className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <role.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-center text-white">
        <Phone className="w-10 h-10 mx-auto mb-4 opacity-90" />
        <h2 className="text-xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-sm mb-6 opacity-90">
          We're currently onboarding new partners.
        </p>
        <p className="mb-8 text-sm opacity-90">
          Fill out the form below or contact us today to schedule a discovery call.
        </p>
        <button 
          onClick={() => setShowContactForm(true)}
          className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors shadow-lg"
        >
          Get Started Today
        </button>
        <p className="mt-6 text-sm opacity-90">
          Together, we can bridge the healthcare gap — one CyberClinic at a time
        </p>
      </div>

      {showContactForm && <ContactForm />}
    </div>
  );

  const ClinicsTab = () => (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search clinics near me..."
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 text-gray-800 text-sm h-12"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative">
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
                className="absolute w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-700 transition-colors z-30"
                style={clinic.position}
                onClick={() => setSelectedClinic(clinic)}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
            ))}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg flex items-center justify-center z-20">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span className="text-base font-bold text-green-700">Angill</span>
                </div>
              </div>
            </div>

            {selectedClinic && (
              <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:hidden"
              >
                <div className="bg-white rounded-2xl p-4 sm:p-6 w-[90%] sm:w-[400px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base">{selectedClinic.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{selectedClinic.rating} ({selectedClinic.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedClinic(null)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close clinic info"
                    >
                      <X className="w-5 h-5" />
                    </button>
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
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedClinic.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button onClick={()=>{
                    setIsBookingThroughClinic(true)

                        handleServiceSelect("")
                        setCurrentStep(2)}} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hidden lg:block">
          {selectedClinic ? (
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base">{selectedClinic.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
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
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClinic.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button onClick={()=>{
                    setIsBookingThroughClinic(true)
                    handleServiceSelect("")
                    setCurrentStep(2)
                  }} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500">Click on a clinic marker to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center relative">
            <button onClick={() => setCurrentStep(1)} className="absolute left-0 p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
              <ArrowLeft className="w-5 h-5 text-green-600" />
            </button>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex  items-center space-x-3">
                <img src={logo} className="bg-green-300 h-14 w-14 rounded-sm p-1"/>
                <div>
                  <h1 className="text-lg font-bold text-green-700">Angill Cyber Clinics</h1>
                  <p className="text-sm text-gray-600">Revolutionary Healthcare Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
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
          </div>
        </div>
      </div>

      <div className="py-8">
        {activeTab === 'clinics' ? <ClinicsTab /> : <PartnershipTab />}
      </div>
    </div>
  );
};

export default AngillCyberClinics;