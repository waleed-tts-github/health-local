import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Group.png'; // Verify this path is correct relative to your project structure
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
  FileText as FileIcon, 
  Send, 
  UserPlus, 
  LogOut, 
  Bell, 
  Menu,
  Settings,
  ChevronDown,
  Handshake,
  Droplet,
  Users
} from 'lucide-react';
import { useConsultationFlow } from '../../contexts/ConsulationFlowContext';

const Layout = ({ children }) => {
  const { setCurrentStep } = useConsultationFlow();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const menuItems = [
    { name: 'Home', icon: Home, path: '/patient' },
    {
      name: 'EHR',
      icon: FileText,
      subItems: [
        { name: 'Appointment Record', icon: Calendar, path: '/patient/appointments' },
        { name: 'Prescriptions', icon: FileText, path: '/patient/prescriptions' },
        { name: 'Lab Reports', icon: TestTube, path: '/patient/lab-reports' },
        { name: 'Health Profile', icon: User, path: '/patient/health-profile' },
      ],
    },
    { name: 'Virtual Wallet', icon: Wallet, path: '/patient/virtual-wallet' },
    {
      name: 'FAN Volunteer',
      icon: Handshake,
      subItems: [
        { name: 'Blood Donations', icon: Droplet, path: '/patient/blood-donations' },
        { name: 'Find Volunteers', icon: Users, path: '/patient/blood-volunteers' },
      ],
    },
    {
      name: 'Need Help',
      icon: HelpCircle,
      subItems: [
        { name: 'Get In Touch', icon: MessageCircle, path: '/patient/contact' },
        { name: 'Support & FAQ', icon: HelpCircle, path: '/patient/support' },
        { name: 'App Language', icon: Globe, path: '/patient/language' },
        { name: 'Privacy And Policy', icon: Lock, path: '/patient/privacy' },
        { name: 'Terms And Conditions', icon: FileIcon, path: '/patient/terms' },
      ],
    },
    { name: 'Send Feedback', icon: Send, path: '/patient/feedback' },
    { name: 'Refer A Friend', icon: UserPlus, path: '/patient/refer' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  useEffect(() => {
    let newActiveItem = location.pathname === '/patient' ? 'Home' : '';
    let newOpenDropdown = null;

    menuItems.forEach((item) => {
      if (item.path === location.pathname && item.path !== '/patient') {
        newActiveItem = item.name;
      } else if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem.path === location.pathname) {
            newActiveItem = subItem.name;
            newOpenDropdown = item.name;
          }
        });
      }
    });

    setActiveItem(newActiveItem);
    setOpenDropdown(newOpenDropdown);
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

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    if (item.name === 'Home') {
      setCurrentStep(1);
    }
    if (item.path) {
      navigate(item.path);
    }
    if (!item.subItems) {
      setIsDrawerOpen(false);
    }
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleProfileNavigation = (path) => {
    setIsProfileDropdownOpen(false);
    if (path) {
      navigate(path);
    }
  };

  const handleLogoClick = () => {
    navigate('/patient');
    setCurrentStep(1);
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex font-poppins h-screen bg-gray-50">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
          
          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 32px;
            height: 16px;
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
            background: #e5e7eb;
            border-radius: 16px;
            transition: all 0.3s ease;
          }
          
          .toggle-slider:before {
            position: absolute;
            content: '';
            height: 12px;
            width: 12px;
            left: 2px;
            bottom: 2px;
            background: white;
            border-radius: 50%;
            transition: all 0.3s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
          
          input:checked + .toggle-slider {
            background: #10b981;
          }
          
          input:checked + .toggle-slider:before {
            transform: translateX(16px);
          }
          
          .sidebar-toggle-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
            padding: 8px 0;
            margin-top: 40px;
          }

          .logo-crisp {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
          }

          .profile-dropdown {
            min-width: 200px;
            right: 0;
            top: 100%;
            margin-top: 8px;
          }

          .avatar-blur {
            filter: blur(8px);
            opacity: 0.7;
          }
        `}
      </style>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block relative w-64 bg-green-600 rounded-lg h-[850px] z-10">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-500">
          {/* Logo and Brand */}
          <div className="flex items-start gap-3 mb-4 relative">
            <button onClick={handleLogoClick} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm">
                <img 
                  src={logo} 
                  alt="Angill Healthcare Logo" 
                  className="w-8 h-8 object-contain logo-crisp"
                  style={{ 
                    filter: 'contrast(1.2) brightness(1.1)',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-white font-bold text-lg tracking-wide">ANGILL</h1>
                  <p className="text-green-100 text-[10px] font-medium tracking-wider pt-1">
                    Healthcare
                  </p>
                </div>
              </div>
            </button>
            <p className="text-green-100 italic font-light text-xs absolute left-0 bottom-[-15px]">
              Every Illness Deserves An Angel
            </p>
          </div>
          
          {/* Toggle in Sidebar */}
          <div className="sidebar-toggle-container">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">
                Anonymous
              </span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isAnonymous}
                  onChange={toggleAnonymous}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <span className="text-xs text-green-200">
              Switch To Hide Your Identity
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 relative z-20">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
              {/* Main Menu Item */}
              <div className="relative">
                {activeItem === item.name && (
                  <>
                    <div className="absolute inset-y-0 left-4 w-72 bg-white rounded-l-2xl z-10"></div>
                    <div className="absolute -top-5 right-0 w-8 h-5 z-20">
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                      <div className="absolute bottom-0 left-0 w-full h-full bg-green-600 rounded-br-2xl"></div>
                    </div>
                    <div className="absolute -bottom-5 right-0 w-8 h-5 z-20">
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-green-600 rounded-tr-2xl"></div>
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    if (item.subItems) {
                      toggleDropdown(item.name);
                    } else {
                      handleNavigation(item);
                    }
                  }}
                  className={`relative z-30 w-full flex items-center px-6 py-4 text-left transition-all duration-300 group ${
                    activeItem === item.name 
                      ? 'text-green-600' 
                      : 'text-white hover:text-green-200 hover:transform hover:translate-x-1'
                  } ${item.name === 'Logout' ? 'text-red-500 hover:text-red-400' : ''}`}
                >
                  <item.icon className={`w-5 h-5 mr-4 transition-colors duration-300 ${
                    activeItem === item.name 
                      ? item.name === 'Logout' 
                        ? 'text-red-500' 
                        : 'text-green-600' 
                      : 'text-white group-hover:text-green-200'
                  }`} />
                  <span className={`font-medium transition-colors duration-300 ${
                    activeItem === item.name 
                      ? item.name === 'Logout' 
                        ? 'text-red-500 font-semibold' 
                        : 'text-green-600 font-semibold' 
                      : 'text-white group-hover:text-green-200'
                  }`}>
                    {item.name}
                  </span>
                </button>
              </div>

              {/* Dropdown for sub-items */}
              {item.subItems && openDropdown === item.name && (
                <div className="ml-8 relative z-30">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.name} className="relative">
                      {activeItem === subItem.name && (
                        <>
                          <div className="absolute inset-y-0 left-4 w-64 bg-white rounded-l-2xl z-20"></div>
                          <div className="absolute -top-5 right-0 w-8 h-5 z-30">
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full bg-green-600 rounded-br-2xl"></div>
                          </div>
                          <div className="absolute -bottom-5 right-0 w-8 h-5 z-30">
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-green-600 rounded-tr-2xl"></div>
                          </div>
                        </>
                      )}
                      <button
                        onClick={() => handleNavigation(subItem)}
                        className={`relative z-40 w-full flex items-center px-6 py-3 text-left transition-all duration-300 group ${
                          activeItem === subItem.name 
                            ? 'text-green-600' 
                            : 'text-white hover:text-green-200 hover:transform hover:translate-x-1'
                        }`}
                      >
                        <subItem.icon className={`w-4 h-4 mr-3 transition-colors duration-300 ${
                          activeItem === subItem.name ? 'text-green-600' : 'text-white group-hover:text-green-200'
                        }`} />
                        <span className={`font-medium text-sm transition-colors duration-300 ${
                          activeItem === subItem.name ? 'text-green-600 font-semibold' : 'text-white group-hover:text-green-200'
                        }`}>
                          {subItem.name}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Drawer for smaller screens */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-green-600 to-green-700 transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform duration-300 ease-in-out z-20 overflow-y-auto custom-scrollbar`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-green-500">
          {/* Logo and Brand */}
          <div className="flex items-start gap-3 mb-4 relative">
            <button onClick={handleLogoClick} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm">
                <img 
                  src={logo} 
                  alt="Angill Healthcare Logo" 
                  className="w-8 h-8 object-contain logo-crisp"
                  style={{ 
                    filter: 'contrast(1.2) brightness(1.1)',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-white font-bold text-lg tracking-wide">ANGILL</h1>
                  <p className="text-green-100 text-[10px] pt-1 font-medium tracking-wider">
                    Healthcare
                  </p>
                </div>
              </div>
            </button>
            <p className="text-green-100 italic font-light text-xs absolute left-0 bottom-[-15px]">
              Every Illness Deserves An Angel
            </p>
          </div>
          
          {/* Toggle in Drawer */}
          <div className="sidebar-toggle-container">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">
                Anonymous
              </span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isAnonymous}
                  onChange={toggleAnonymous}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <span className="text-xs text-green-200">
              Switch To Hide Your Identity
            </span>
          </div>
        </div>

        {/* Drawer Menu Items */}
        <nav className="mt-6">
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
                className={`w-full flex items-center px-6 py-4 text-left transition-all duration-300 ${
                  activeItem === item.name 
                    ? item.name === 'Logout' 
                      ? 'text-red-500 bg-white' 
                      : 'text-green-600 bg-white' 
                    : 'text-white hover:text-green-200'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-4 transition-colors duration-300 ${
                  activeItem === item.name 
                    ? item.name === 'Logout' 
                      ? 'text-red-500' 
                      : 'text-green-600' 
                    : 'text-white hover:text-green-200'
                }`} />
                <span className={`font-medium transition-colors duration-300 ${
                  activeItem === item.name 
                    ? item.name === 'Logout' 
                      ? 'text-red-500 font-semibold' 
                      : 'text-green-600 font-semibold' 
                    : 'text-white hover:text-green-200'
                }`}>
                  {item.name}
                </span>
              </button>
              {item.subItems && openDropdown === item.name && (
                <div className="ml-8">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavigation(subItem)}
                      className={`w-full flex items-center px-6 py-3 text-left transition-all duration-300 ${
                        activeItem === subItem.name 
                          ? 'text-green-600 bg-white' 
                          : 'text-white hover:text-green-200'
                      }`}
                    >
                      <subItem.icon className={`w-4 h-4 mr-3 transition-colors duration-300 ${
                        activeItem === subItem.name ? 'text-green-600' : 'text-white hover:text-green-200'
                      }`} />
                      <span className={`font-medium text-sm transition-colors duration-300 ${
                        activeItem === subItem.name ? 'text-green-600 font-semibold' : 'text-white hover:text-green-200'
                      }`}>
                        {subItem.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" onClick={toggleDrawer}>
                <Menu className="w-6 h-6" />
              </button>
              <button onClick={handleLogoClick} className="md:hidden flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-600/10 backdrop-blur-sm">
                  <img 
                    src={logo} 
                    alt="Angill Healthcare Logo" 
                    className="w-6 h-6 object-contain logo-crisp"
                    style={{ 
                      filter: 'contrast(1.2) brightness(1.1)',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  className="flex items-center space-x-3"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {isAnonymous ? 'Anonymous User' : 'Niaz Ahmad'}
                    </p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                  <div className="relative flex items-center">
                    <img
                      src={isAnonymous 
                        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      }
                      alt="Profile"
                      className={`w-10 h-10 rounded-full border-2 border-gray-200 hover:border-green-500 transition-colors cursor-pointer ${isAnonymous ? 'avatar-blur' : ''}`}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
                  </div>
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute profile-dropdown bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {isAnonymous ? 'Anonymous User' : 'John Doe'}
                      </p>
                      <p className="text-xs text-gray-500">Patient</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => handleProfileNavigation('/patient/profile/edit')}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                      <button
                        onClick={() => handleProfileNavigation('/logout')}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-white relative z-10">
          {children}
        </main>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default Layout;