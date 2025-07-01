import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  LogOut,
  Search,
  Bell,
  Menu,
  User,
  Pill,
  TestTube,
  Heart,
  CreditCard,
  Wallet,
  Droplets,
  Globe,
  Mail,
  HelpCircle,
  Lock,
  FileCheck,
  MessageCircle,
  Share2
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br font-inter from-indigo-50 via-white to-purple-50">
      <div className="flex min-h-screen shadow-2xl backdrop-blur-xl bg-white/20">
        {/* Sidebar/Drawer */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-white/30 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          
          {/* Logo Section */}
          <div className="p-6 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Angil Clinic</h1>
                <p className="text-xs text-gray-500 font-medium">Your Health Partner</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-5 py-3 relative z-10">
            <div className="space-y-2">
              <NavItem icon={User} label="Profile" />
              <NavItem icon={FileText} label="Medical Records" />
              <NavItem icon={Calendar} label="Appointments" count="12" active />
              <NavItem icon={Pill} label="Prescriptions" />
              <NavItem icon={TestTube} label="Lab Results" count="24" />
              <NavItem icon={Heart} label="Health Tracker" />
              <NavItem icon={CreditCard} label="Payments" />
              <NavItem icon={Wallet} label="Wallet" />
              <NavItem icon={Users} label="Support Groups" count="8" />
              <NavItem icon={Droplets} label="Blood Donations" />
              <NavItem icon={Search} label="Find Doctors" />
              <NavItem icon={Globe} label="Language" />
              <NavItem icon={Mail} label="Contact Us" />
              <NavItem icon={HelpCircle} label="Help Center" />
              <NavItem icon={Lock} label="Privacy" />
              <NavItem icon={FileCheck} label="Terms" />
              <NavItem icon={MessageCircle} label="Feedback" />
              <NavItem icon={Share2} label="Refer a Friend" />
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 relative z-10">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-white/40">
              <NavItem icon={LogOut} label="Logout" />
            </div>
          </div>
        </div>

        {/* Drawer Overlay for Mobile */}
        {isDrawerOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleDrawer}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl">
          {/* Top Navigation */}
          <header className="bg-white/80 backdrop-blur-xl border-b border-white/30 px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center space-x-5">
                <button 
                  className="p-2 hover:bg-white/60 rounded-xl transition-all duration-300 lg:hidden backdrop-blur-sm"
                  onClick={toggleDrawer}
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">My Dashboard</h2>
                  <p className="text-xs text-gray-500 mt-1">Manage your health journey</p>
                </div>
              </div>
              
              {/* Right side */}
              <div className="flex items-center space-x-3">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
                  <div className="relative bg-white/70 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doctors, appointments..."
                      className="pl-10 pr-5 py-3 w-80 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="p-3 hover:bg-white/60 rounded-xl transition-all duration-300 relative bg-white/40 backdrop-blur-sm border border-white/40 shadow-lg">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                      3
                    </div>
                  </button>
                </div>

                {/* Profile Avatar */}
                <div className="flex items-center space-x-3 pl-5 border-l border-white/30">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900">Sarah Wilson</p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                  <button className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-1 border border-white/40">
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face&facepad=2"
                        alt="Profile"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, count, active = false }) => {
  return (
    <div className={`relative group cursor-pointer ${
      active ? 'transform scale-105' : ''
    }`}>
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 opacity-100 shadow-lg' 
          : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100'
      }`}></div>
      <div className={`relative flex items-center justify-between px-5 py-3 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-white/90 backdrop-blur-sm text-white shadow-lg border border-white/40' 
          : 'bg-white/40 backdrop-blur-sm hover:bg-white/60 border border-white/30'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            active 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-white/60 text-gray-600 group-hover:bg-white/80'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={`font-semibold transition-all duration-300 text-sm ${
            active ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
          }`}>{label}</span>
        </div>
        {count && (
          <div className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
            active 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
              : 'bg-white/60 text-gray-600 group-hover:bg-white/80'
          }`}>
            {count}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;