// components/Sidebar.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ChevronLeft, Settings, AlertTriangle, BookOpen, Calendar, BarChart2, Search, Beaker, LogOut, Menu } from 'lucide-react';

export default function Sidebar({ activePage, navigateTo, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true); // For mobile view
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    navigate('/login'); // Redirect to login page
  };

  const menuItems = [
    { name: "Dashboard", icon: <BarChart2 size={20} /> },
    { name: "Equipment Reservation", icon: <Calendar size={20} /> },
    { name: "Issue Reporting", icon: <AlertTriangle size={20} /> },
    { name: "Equipment Manuals", icon: <BookOpen size={20} /> },
    { name: "Equipment Identification", icon: <Search size={20} /> },
    { name: "Experiments", icon: <Beaker size={20} /> },
    { name: "Profile & Settings", icon: <Settings size={20} /> }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? 'block' : 'hidden'
        } md:block ${
          collapsed ? 'w-16' : 'w-64'
        } bg-[#1e293b] text-white flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Logo Area */}
        <div className="p-4 flex items-center justify-between border-b border-[#334155]">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-[#94a3b8] text-[#334155] font-semibold w-8 h-8 flex items-center justify-center rounded-sm">
                LM
              </div>
              <span className="text-[#60a5fa] font-semibold text-lg leading-none select-none">LMOS</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#60a5fa]"
          >
            <ChevronLeft size={20} className={`transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-grow px-2 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#60a5fa] ${
                activePage === item.name
                  ? 'bg-[#213547] text-white font-semibold focus:ring-[#2563eb]'
                  : 'hover:bg-[#334155] text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-4 py-3 border-t border-[#334155]">
          <button
            onClick={handleLogout} // Call handleLogout on click
            className="flex items-center gap-2 text-red-600 font-semibold text-sm select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-600"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}