import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  TestTube, 
  User, 
  Wallet, 
  HelpCircle, 
  MessageCircle, 
  Globe, 
  Lock, 
  File, 
  Send, 
  UserPlus, 
  LogOut, 
  Bell, 
  Menu,
  Settings,
  ChevronDown,
  Handshake,
  Droplet,
  Users,
  X,
  ChevronRight
} from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';
import logo from '../../assets/Group.png'

const Layout = ({ children }) => {
  const { setCurrentStep } = useConsultationFlow();
  const [activeItem, setActiveItem] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();


  const menuItems = [
    { name: 'Home', icon: Home, path: '/patient' },
    {
      name: 'EHR',
      displayName: 'EHR',
      icon: FileText,
      subItems: [
        { name: 'Appointment Record', icon: Calendar, path: '/patient/appointments' },
        { name: 'Prescriptions', icon: FileText, path: '/patient/prescriptions' },
        { name: 'Lab Reports', icon: TestTube, path: '/patient/lab-reports' },
        { name: 'Health Profile', icon: User, path: '/patient/health-profile' },
      ],
    },
    {
      name: 'FAN Volunteer',
      icon: Handshake,
      subItems: [
        { name: 'Join As Volunteer', icon: Droplet, path: '/patient/blood-donations' },
        { name: 'Find Volunteers', icon: Users, path: '/patient/blood-volunteers' },
      ],
    },
    { name: 'Virtual Wallet', icon: Wallet, path: '/patient/virtual-wallet' },
    {
      name: 'Need Help',
      icon: HelpCircle,
      subItems: [
        { name: 'Get In Touch', icon: MessageCircle, path: '/patient/contact' },
        { name: 'Support & FAQ', icon: HelpCircle, path: '/patient/support' },
        { name: 'App Language', icon: Globe, path: '/patient/language' },
        { name: 'Privacy Policy', icon: Lock, path: '/patient/privacy' },
        { name: 'Terms & Conditions', icon: File, path: '/patient/terms' },
        { name: 'Send Feedback', icon: Send, path: '/patient/feedback' },
      ],
    },
    { name: 'Refer A Friend', icon: UserPlus, path: '/patient/refer' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    if (item.path) {
      if (item.path === '/patient') {
        setCurrentStep(1);
        navigate(item.path);
      } else {
        navigate(item.path);
      }
    }
    if (!item.subItems) {
      setIsDrawerOpen(false);
    }
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleProfileNavigation = (path) => {
    navigate(path);
    setIsProfileDropdownOpen(false);
  };

  const handleLogoClick = () => {
    setActiveItem('Home');
    navigate('/patient');
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
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
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .toggle-slider:before {
          position: absolute;
          content: '';
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background: white;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        input:checked + .toggle-slider {
          background: rgba(255, 255, 255, 0.8);
        }
        
        input:checked + .toggle-slider:before {
          transform: translateX(20px);
          background: #10b981;
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
        <div className="bg-green-500 rounded-r-sm h-full flex flex-col">
          {/* Header */}
          <div className="p-4">
            <button onClick={handleLogoClick} className="group">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <img src={logo} alt="ANGILL Logo" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-wide">ANGILL</h1>
                  <p className="text-emerald-100 text-xs font-medium mt-[-2px]">Healthcare</p>
                </div>
              </div>
              <p className="text-green-200 text-xs italic font-light">
                Every Illness Deserves An Angel
              </p>
            </button>
            
            {/* Anonymous Toggle */}
            <div className="mt-2 p-3 rounded-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium text-sm">Anonymous Mode</span>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={isAnonymous}
                    onChange={toggleAnonymous}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <p className="text-green-200 text-xs">Hide your identity</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 pb-6 overflow-y-auto custom-scroll">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => {
                      if (item.subItems) {
                        toggleDropdown(item.name);
                      } else {
                        handleNavigation(item);
                      }
                    }}
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
                      <span className="font-medium">{item.displayName || item.name}</span>
                    </div>
                    {item.subItems && (
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === item.name ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>

                  {/* Sub Items */}
                  {item.subItems && openDropdown === item.name && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem)}
                          className={`w-full flex items-center px-4 py-3 text-left transition-all duration-300 rounded-xl ${
                            activeItem === subItem.name 
                              ? 'menu-item-active text-green-500' 
                              : 'text-green-100 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <subItem.icon className={`w-4 h-4 mr-3 ${
                            activeItem === subItem.name ? 'text-green-500' : 'text-green-300'
                          }`} />
                          <span className="font-medium text-sm">{subItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
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
        
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[80vw] bg-green-500 transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="p-4 flex items-center justify-between">
              <button onClick={handleLogoClick} className="flex items-center gap-3">
                <div className="w-12 h-12 glassmorphism rounded-xl flex items-center justify-center p-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <img src={logo} alt="ANGILL Logo" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">ANGILL</h1>
                  <p className="text-green-100 text-xs mt-[-2px]">Healthcare</p>
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
                {/* Anonymous Toggle */}
                <div className="p-3 glassmorphism rounded-2xl mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm">Anonymous Mode</span>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={isAnonymous}
                        onChange={toggleAnonymous}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <p className="text-green-200 text-xs">Hide your identity</p>
                </div>

                {menuItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => {
                        if (item.subItems) {
                          toggleDropdown(item.name);
                        } else {
                          handleNavigation(item);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-300 rounded-xl ${
                        activeItem === item.name 
                          ? 'bg-white/20 text-white' 
                          : item.name === 'Logout'
                          ? 'text-red-200 hover:bg-red-500/20'
                          : 'text-green-100 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">
                          {item.displayName || item.name}
                        </span>
                      </div>
                      {item.subItems && (
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === item.name ? 'rotate-90' : ''
                        }`} />
                      )}
                    </button>

                    {item.subItems && openDropdown === item.name && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem)}
                            className={`w-full flex items-center px-4 py-2 text-left transition-all duration-300 rounded-lg ${
                              activeItem === subItem.name 
                                ? 'bg-white/20 text-white' 
                                : 'text-green-200 hover:bg-white/10'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4 mr-3" />
                            <span className="text-sm">{subItem.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
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
                <button onClick={handleLogoClick} className="flex items-center gap-2 p-2">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center p-2">
                    <img src={logo} alt="ANGILL Logo" className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">ANGILL</h1>
                    <p className="text-gray-500 text-xs mt-[-2px]">Healthcare</p>
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
                    <p className="text-sm font-semibold text-gray-900">
                      {isAnonymous ? 'Anonymous User' : 'Niaz Ahmad'}
                    </p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={isAnonymous 
                        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      }
                      alt="Profile"
                      className={`w-10 h-10 rounded-xl object-cover profile-avatar ${
                        isAnonymous ? 'filter blur-sm opacity-70' : ''
                      }`}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200/60 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">
                        {isAnonymous ? 'Anonymous User' : 'Niaz Ahmad'}
                      </p>
                      <p className="text-sm text-gray-500">Patient</p>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => handleProfileNavigation('/patient/profile/edit')}
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

export default Layout;