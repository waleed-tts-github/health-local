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
  CheckCircle
} from 'lucide-react';

function Landing() {
  const handleJoinAs = (userType) => {
    console.log(`Joining as ${userType}`);
    // Navigate to appropriate registration page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 font-poppins">
      {/* Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
            <Heart className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Angill
            </h1>
            <p className="text-green-600 text-sm font-medium">
              Healthcare Connected
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Center Content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Joining As
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose your path to better healthcare. Connect with trusted professionals or join our network of expert doctors.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Patient Option */}
          <div 
            onClick={() => handleJoinAs('patient')}
            className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="text-white text-4xl" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                Join as Patient
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Access quality healthcare services, book appointments, and connect with trusted doctors from the comfort of your home.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Book instant appointments',
                  'Video consultations',
                  'Prescription management',
                  'Health record tracking'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:scale-105 transform active:scale-95 shadow-lg flex items-center justify-center space-x-2 group">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Doctor Option */}
          <div 
            onClick={() => handleJoinAs('doctor')}
            className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="text-white text-4xl" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                Join as Doctor
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Expand your practice, reach more patients, and provide quality healthcare services through our advanced platform.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Manage appointments easily',
                  'Secure patient consultations',
                  'Digital prescription tools',
                  'Practice analytics'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-400 hover:to-green-400 transition-all duration-300 hover:scale-105 transform active:scale-95 shadow-lg flex items-center justify-center space-x-2 group">
                <span>Join Network</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-green-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-6">
                  Why Choose Angill?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                      <Shield className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">Secure & Private</h4>
                      <p className="text-slate-600">End-to-end encryption ensures your health data stays protected and confidential.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg">
                      <Clock className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">24/7 Available</h4>
                      <p className="text-slate-600">Access healthcare services anytime, anywhere with our round-the-clock platform.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                      <Star className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-8 mb-2">Trusted Professionals</h4>
                      <p className="text-slate-600">Connect with verified, experienced healthcare professionals in your area.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="w-72 h-72 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Heart className="text-white w-20 h-20 mx-auto mb-4 animate-pulse" />
                        <h4 className="text-white text-2xl font-bold mb-2">Healthcare</h4>
                        <p className="text-white/90 text-lg">Reimagined</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                    <UserCheck className="text-green-500 w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-emerald-100 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                    <Shield className="text-emerald-500 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/20 rounded-full animate-bounce opacity-60"
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/30 rounded-full animate-bounce opacity-40"
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-300/25 rounded-full animate-bounce opacity-50"
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-300/20 rounded-full animate-pulse opacity-30" />
      </div>
    </div>
  );
}

export default Landing;