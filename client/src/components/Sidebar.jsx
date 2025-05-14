// components/Sidebar.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Settings,
  AlertTriangle,
  BookOpen,
  Calendar,
  BarChart2,
  Search,
  Beaker,
  LogOut,
} from 'lucide-react';

export default function Sidebar({ activePage, navigateTo, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <BarChart2 size={20} /> },
    { name: 'Equipment Reservation', icon: <Calendar size={20} /> },
    { name: 'Issue Reporting', icon: <AlertTriangle size={20} /> },
    { name: 'Equipment Manuals', icon: <BookOpen size={20} /> },
    { name: 'Equipment Identification', icon: <Search size={20} /> },
    { name: 'Experiments', icon: <Beaker size={20} /> },
    { name: 'Profile & Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? 'block' : 'hidden'
        } md:block ${
          collapsed ? 'w-16' : 'w-64'
        } bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white flex flex-col transition-all duration-300 ease-in-out shadow-lg`}
      >
        {/* Logo Area */}
        <div className="p-4 flex items-center justify-between border-b border-[#334155]">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white font-semibold w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                LM
              </div>
              <span className="text-[#60a5fa] font-bold text-lg leading-none select-none">
                LMOS
              </span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 text-[#94a3b8] hover:text-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#60a5fa] transition-all"
          >
            <ChevronLeft
              size={20}
              className={`transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-grow px-2 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#60a5fa] ${
                activePage === item.name
                  ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-semibold shadow-md'
                  : 'hover:bg-[#334155] text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="px-4 py-3 border-t border-[#334155]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 font-semibold text-sm select-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
        }}
      >
        {children}
      </div>
    </div>
  );
}