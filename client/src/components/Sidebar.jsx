import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  Wrench,
  Book,
  Camera,
  User,
  LogOut,
  BarChart3,
  Users,
  AlertTriangle,
  ClipboardCheck,
  ClipboardPlus,
} from 'lucide-react';

// Define the menu items for each user type
const studentMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Equipment Reservation', icon: ClipboardCheck },
  { name: 'Issue Reporting', icon: Wrench },
  { name: 'Equipment Manuals', icon: Book },
  { name: 'Equipment Identification', icon: Camera },
  { name: 'Lab Submissions', icon: FlaskConical }, // UPDATED Name
  { name: 'Profile & Settings', icon: User },
];

const facultyMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Equipment Management', icon: Wrench },
  { name: 'Issue Handling', icon: AlertTriangle },
  { name: 'Experiments Management', icon: FlaskConical },
  { name: 'Manage Batches', icon: ClipboardPlus }, // NEW Page
  { name: 'Student Monitoring', icon: Users },
  { name: 'Reports & Analytics', icon: BarChart3 },
  { name: 'Profile & Settings', icon: User },
];

export default function Sidebar({ userType, activePage, navigateTo, onLogout }) {
  const menuItems = userType === 'faculty' ? facultyMenuItems : studentMenuItems;
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="w-64 bg-[#1e293b] text-slate-300 flex flex-col border-r border-slate-700">
      {/* Logo and User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <FlaskConical size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">L.M.O.S.</h1>
        </div>
        <div className="text-center bg-slate-700/50 p-3 rounded-lg">
          <p className="font-bold text-white capitalize">{username}</p>
          <p className="text-xs text-slate-400 capitalize">{userType}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.name;
          return (
            <button
              key={item.name}
              onClick={() => navigateTo(item.name)}
              className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="mr-3" size={18} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-red-500/80 hover:text-white transition-all duration-200 text-red-400"
        >
          <LogOut className="mr-3" size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

