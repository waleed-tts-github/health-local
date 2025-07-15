import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Calendar, 
  TestTube, 
  User, 
  Wallet, 
  Heart, 
  Users, 
  HelpCircle, 
  MessageCircle, 
  Globe, 
  Lock, 
  FileText as FileIcon, 
  Send, 
  UserPlus, 
  LogOut, 
  Bell, 
  Menu 
} from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const menuItems = [
    { name: 'Home', icon: Home, path: '/patient/home' },
    {
      name: 'EHR',
      icon: FileText,
      subItems: [
        { name: 'Appointment Record', icon: Calendar, path: '/patient/appointments' },
        { name: 'Prescriptions', icon: FileText, path: '/patient/prescriptions' },
        { name: 'Lab Reports', icon: TestTube },
        { name: 'Health Profile', icon: User, path: '/patient/health-profile' },
      ],
    },
    { name: 'Virtual Wallet', icon: Wallet, path: '/patient/virtual-wallet' },
    {
      name: 'FAN Volunteer',
      icon: Heart,
      subItems: [
        { name: 'Blood Donations', icon: Heart, path: '/patient/blood-donations' },
        { name: 'Find Volunteers', icon: Users, path: '/patient/blood-volunteers' },
      ],
    },
    {
      name: 'Need Help',
      icon: HelpCircle,
      subItems: [
        { name: 'Get In Touch', icon: MessageCircle },
        { name: 'Support & FAQ', icon: HelpCircle },
        { name: 'App Language', icon: Globe },
        { name: 'Privacy And Policy', icon: Lock },
        { name: 'Terms And Conditions', icon: FileIcon },
      ],
    },
    { name: 'Send Feedback', icon: Send },
    { name: 'Refer A Friend', icon: UserPlus },
    { name: 'Logout', icon: LogOut },
  ];

  useEffect(() => {
    // Find the matching menu item or sub-item based on the current route
    let newActiveItem = 'Home';
    let newOpenDropdown = null;

    menuItems.forEach((item) => {
      if (item.path === location.pathname) {
        newActiveItem = item.name;
      } else if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem.path === location.pathname) {
            newActiveItem = subItem.name;
            newOpenDropdown = item.name; // Expand the parent dropdown
          }
        });
      }
    });

    setActiveItem(newActiveItem);
    setOpenDropdown(newOpenDropdown);
  }, [location.pathname]);

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (item) => {
    setActiveItem(item.name);
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
          
          /* Toggle Switch Styles */
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
            content: "";
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
            margin-top: 8px;
          }
        `}
      </style>

      {/* Sidebar for larger screens */}
      <div className="hidden md:block relative w-64 bg-green-600 rounded-lg h-[850px] z-10">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <h1 className="text-white font-bold text-xl">Angill Healthcare</h1>
          </div>
          
          {/* Toggle in Sidebar */}
          <div className="sidebar-toggle-container">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">
                User Name/Anonymous
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
              Switch To Hide You're Identity
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
                    {/* Main white background for active item */}
                    <div className="absolute inset-y-0 left-4 w-72 bg-white rounded-l-2xl z-10"></div>
                    {/* Top curved notch */}
                    <div className="absolute -top-5 right-0 w-8 h-5 z-20">
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                      <div className="absolute bottom-0 left-0 w-full h-full bg-green-600 rounded-br-2xl"></div>
                    </div>
                    {/* Bottom curved notch */}
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
                  <item.icon className={`w-5 h-5 mr-4 transition-colors duration-300  ${
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
                          {/* White background for active sub-item */}
                          <div className="absolute inset-y-0 left-4 w-64 bg-white rounded-l-2xl z-20"></div>
                          {/* Top curved notch for sub-item */}
                          <div className="absolute -top-5 right-0 w-8 h-5 z-30">
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-50"></div>
                            <div className="absolute bottom-0 left-0 w-full h-full bg-green-600 rounded-br-2xl"></div>
                          </div>
                          {/* Bottom curved notch for sub-item */}
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <h1 className="text-white font-bold text-xl">Patient Portal</h1>
          </div>
          
          {/* Toggle in Drawer */}
          <div className="sidebar-toggle-container">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white">
                User Name/Anonymous
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
              Switch To Hide You're Identity
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
            {/* Drawer Toggle Button for Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" onClick={toggleDrawer}>
              <Menu className="w-6 h-6" />
            </button>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4 ml-auto">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {isAnonymous ? 'Anonymous User' : 'John Doe'}
                  </p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
                <div className="relative">
                  <img
                    src={isAnonymous 
                      ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-green-500 transition-colors cursor-pointer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Render Children */}
        <main className="flex-1 bg-white relative z-10">
          {children}
        </main>
      </div>

      {/* Overlay for drawer on mobile */}
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