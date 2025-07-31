import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Wallet, 
  FileText, 
  LogOut, 
  Bell, 
  Menu,
  X,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import logo from '../../assets/Group.png'; // Verify this path is correct relative to your project structure

const DoctorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const menuItems = [
    { name: 'Home', icon: Home, path: '/doctor' },
    { name: 'Appointment Slots', icon: Calendar, path: '/doctor/appointments' },
    { name: 'Financial Account', icon: Wallet, path: '/doctor/financial-account' },
    { name: 'Patient Record', icon: FileText, path: '/doctor/patient-record' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  useEffect(() => {
    const newActiveItem = menuItems.find(item => item.path === location.pathname)?.name || 'Home';
    setActiveItem(newActiveItem);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    if (item.path) {
      navigate(item.path);
    }
    setIsDrawerOpen(false);
  };

  const handleProfileNavigation = (path) => {
    navigate(path);
    setIsProfileDropdownOpen(false);
  };

  const handleLogoClick = () => {
    setActiveItem('Home');
    navigate('/doctor');
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .sidebar-gradient {
          background: linear-gradient(135deg, #10b981 0%, #10b981 100%);
        }
        
        .card-shadow {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .menu-item-active {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .menu-item-hover:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(2px);
          border-radius: 12px;
        }
        
        .profile-avatar {
          transition: all 0.3s ease;
        }
        
        .profile-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .notification-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-80 min-h-screen sticky top-0">
        <div className="bg-green-500 sidebar-gradient h-full flex flex-col">
          {/* Header */}
          <div className="p-4">
            <button onClick={handleLogoClick} className="group">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img 
                      src={logo} 
                      alt="Angill Healthcare Logo" 
                      className="w-8 h-8 object-contain"
                      style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">ANGILL</h1>
                  <p className="text-emerald-100 text-xs font-medium">Healthcare</p>
                </div>
              </div>
              <p className="text-green-200 text-xs italic font-light">
                Every Illness Deserves An Angel
              </p>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 pb-6 overflow-y-auto custom-scroll">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center justify-between px-4 py-4 text-left transition-all duration-300 rounded-2xl ${
                      activeItem === item.name 
                        ? 'menu-item-active text-green-500' 
                        : item.name === 'Logout'
                        ? 'text-red-200 hover:text-red-100 hover:bg-red-500/20'
                        : 'text-white menu-item-hover'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-5 h-5 mr-4 ${
                        activeItem === item.name 
                          ? 'text-green-500' 
                          : item.name === 'Logout'
                          ? 'text-red-300'
                          : 'text-green-200'
                      }`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={toggleDrawer}
        />
        
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[80vw] bg-green-500 sidebar-gradient transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="p-4 flex items-center justify-between">
              <button onClick={handleLogoClick} className="flex items-center gap-3">
                <div className="w-10 h-10 glassmorphism rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img 
                      src={logo} 
                      alt="Angill Healthcare Logo" 
                      className="w-8 h-8 object-contain"
                      style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">ANGILL</h1>
                  <p className="text-green-100 text-xs">Healthcare</p>
                </div>
              </button>
              
              <button 
                onClick={toggleDrawer}
                className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 pb-6 overflow-y-auto custom-scroll">
              <div className="space-y-1">
                <p className="text-green-200 text-xs italic font-light px-4 mb-4">
                  Every Illness Deserves An Angel
                </p>
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-300 rounded-xl ${
                        activeItem === item.name 
                          ? item.name === 'Logout' 
                            ? 'text-red-200 bg-white/20' 
                            : 'text-white bg-white/20' 
                          : item.name === 'Logout'
                          ? 'text-red-200 hover:bg-red-500/20'
                          : 'text-green-100 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`w-5 h-5 mr-3 ${
                          activeItem === item.name ? 'text-white' : 'text-green-200'
                        }`} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 relative z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={toggleDrawer}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="lg:hidden">
                <button onClick={handleLogoClick} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-sm flex bg-green-500 items-center justify-center">
                    <img 
                      src={logo} 
                      alt="Angill Healthcare Logo" 
                      className="w-6 h-6 object-contain"
                      style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">ANGILL</h1>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full notification-pulse" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">Dr. John Doe</p>
                    <p className="text-xs text-gray-500">Doctor</p>
                  </div>
                  
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-10 h-10 rounded-xl object-cover profile-avatar"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200/60 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">Dr. John Doe</p>
                      <p className="text-sm text-gray-500">Doctor</p>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => handleProfileNavigation('/doctor/profile/edit')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Edit Profile</span>
                      </button>
                      
                      <button
                        onClick={() => handleProfileNavigation('/logout')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;