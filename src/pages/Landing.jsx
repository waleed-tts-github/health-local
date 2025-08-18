import React from 'react';
import { 
  Heart, 
  Stethoscope, 
  User, 
  UserCheck, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  Calendar,
  DollarSign,
  Lock,
  Users,
  Settings,
  BarChart,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Group.png';

function Landing() {
  const navigate = useNavigate();
  const handleJoinAs = (userType) => {
    console.log(`Joining as ${userType}`);
    if (userType === "doctor") {
      navigate("/doctor/sign-up");
    } else {
      navigate("/patient/sign-up");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 font-poppins">
      {/* Header */}
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-md">
            <img src={logo} className='h-8 w-8' alt="Angill Logo" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Angill
            </h1>
            <p className="text-green-600 text-sm font-medium">
              Healthcare
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-2">
        {/* Center Content */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Redefining Access to Care
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
            We make medical access simpler, faster, and more inclusive — blending advanced technology, trusted providers, and community support into one seamless ecosystem.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          {/* Patient Option */}
          <div 
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden h-[600px] flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <User className="text-white text-2xl" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">
                Join as Patient
              </h3>
              
              <p className="text-slate-600 text-sm text-center mb-4 leading-relaxed">
                Access instant quality healthcare services — book appointments or connect online with trusted doctors, anytime, anywhere.
              </p>
              
              <div className="space-y-3 flex-1">
                {[
                  { text: 'Instant Connection – 24/7 access to doctors and medical support', icon: <Calendar className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Flexible Fees – Transparent and affordable care options', icon: <DollarSign className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Secure Medical Records – Safely stored and accessible health data', icon: <Lock className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Community Support – Trusted network of providers and partners', icon: <Users className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Health Tracking – Monitor your wellness journey with smart tools', icon: <TrendingUp className="text-green-500 w-5 h-5 flex-shrink-0" /> }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {feature.icon}
                    <span className="text-slate-700 text-sm leading-relaxed">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleJoinAs('patient')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-medium hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-105 transform active:scale-95 shadow-sm flex items-center justify-center space-x-2 group mt-4"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Doctor Option */}
          <div 
            className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden h-[600px] flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="text-white text-2xl" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-2 text-center">
                Join as Doctor
              </h3>
              
              <p className="text-slate-600 text-sm text-center mb-4 leading-relaxed">
                Expand your practice, reach more patients, and provide quality healthcare services through our advanced platform.
              </p>
              
              <div className="space-y-3 flex-1">
                {[
                  { text: 'Reach New Patients – Connect with a broader patient base', icon: <Users className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Extend Working Hours – Offer consultations at your convenience', icon: <Clock className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Smart Practice Tools – Streamline scheduling and patient management', icon: <Settings className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Practice Analytics – Gain insights to optimize your practice', icon: <BarChart className="text-green-500 w-5 h-5 flex-shrink-0" /> },
                  { text: 'Professional Recognition – Build your reputation with verified credentials', icon: <Award className="text-green-500 w-5 h-5 flex-shrink-0" /> }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {feature.icon}
                    <span className="text-slate-700 text-sm leading-relaxed">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleJoinAs('doctor')}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-lg font-medium hover:from-emerald-400 hover:to-green-400 transition-all duration-300 hover:scale-105 transform active:scale-95 shadow-sm flex items-center justify-center space-x-2 group mt-4"
              >
                <span>Join Network</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border border-green-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                  Why Choose Angill?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm">
                      <Shield className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-slate-800 mb-2">Secure & Private</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">End-to-end encryption ensures your health data stays protected and confidential.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 shadow-sm">
                      <Clock className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-slate-800 mb-2">24/7 Available</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Access healthcare services anytime, anywhere with our round-the-clock platform.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm">
                      <Star className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-slate-800 mb-2">Trusted Professionals</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">Connect with verified, experienced healthcare professionals in your area.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-56 h-56 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-md flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="w-48 h-48 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Heart className="text-white w-12 h-12 mx-auto mb-3 animate-pulse" />
                        <h4 className="text-white text-xl font-semibold mb-2">Healthcare</h4>
                        <p className="text-white/90 text-sm">Reimagined</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center animate-bounce">
                    <UserCheck className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-emerald-100 rounded-full shadow-sm flex items-center justify-center animate-pulse">
                    <Shield className="text-emerald-500 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/20 rounded-full animate-bounce opacity-50"
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-bounce opacity-40"
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
      </div>
    </div>
  );
}

export default Landing;