import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Group.png'; // Verify this path is correct relative to your project structure
import { 
  Home, 
  Calendar, 
  Wallet, 
  FileText, 
  LogOut, 
  Bell, 
  Menu,
  Settings,
  ChevronDown
} from 'lucide-react';

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
    setIsProfileDropdownOpen(false);
    if (path) {
      navigate(path);
    }
  };

  const handleLogoClick = () => {
    navigate('/doctor');
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
        `}
      </style>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block relative w-64 bg-green-600 rounded-lg h-[850px] z-10">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-500">
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
        </div>

        {/* Menu Items */}
        <nav className="mt-6 relative z-20">
          {menuItems.map((item) => (
            <div key={item.name} className="relative">
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
                onClick={() => handleNavigation(item)}
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
          ))}
        </nav>
      </div>

      {/* Drawer for smaller screens */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-green-600 to-green-700 transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform duration-300 ease-in-out z-20 overflow-y-auto custom-scrollbar`}
      >
        <div className="p-6 border-b border-green-500">
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
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
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
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
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
                    <p className="text-sm font-medium text-gray-900">Dr. John Doe</p>
                    <p className="text-xs text-gray-500">Doctor</p>
                  </div>
                  <div className="relative flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-green-500 transition-colors cursor-pointer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
                  </div>
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute profile-dropdown bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Dr. John Doe</p>
                      <p className="text-xs text-gray-500">Doctor</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => handleProfileNavigation('/doctor/profile/edit')}
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

export default DoctorLayout;
