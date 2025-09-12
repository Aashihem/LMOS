// src/pages/FacultyProfileSettingsPage.jsx

import React from 'react';
import { Edit, Lock, Bell } from 'lucide-react';

// Mock Data
const facultyProfile = {
  name: 'Dr. Sarah Johnson',
  id: 'F2019001',
  department: 'Electronics and Telecommunications',
  email: 'sarah.j@university.edu',
  phone: '+1 234 567 8900',
};

// Renamed the component here
export default function FacultyProfileSettingsPage() {
  return (
    <div className="text-white p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your profile information, notification preferences, and account settings.</p>
      </div>

      {/* Profile Information */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-white">Profile Information</h2>
            <button className="flex items-center text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-3 rounded-full transition-colors">
                <Edit size={14} className="mr-1.5" /> Edit Profile
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong className="text-slate-400 block">Name:</strong> <span>{facultyProfile.name}</span></div>
            <div><strong className="text-slate-400 block">Faculty ID:</strong> <span>{facultyProfile.id}</span></div>
            <div><strong className="text-slate-400 block">Department:</strong> <span>{facultyProfile.department}</span></div>
            <div><strong className="text-slate-400 block">Email Address:</strong> <span>{facultyProfile.email}</span></div>
            <div><strong className="text-slate-400 block">Phone Number:</strong> <span>{facultyProfile.phone}</span></div>
        </div>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg mb-8">
        <h2 className="font-semibold text-white mb-4 flex items-center"><Bell size={18} className="mr-2 text-blue-400"/>Notification Preferences</h2>
        <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between"><span className="text-slate-300">New Equipment Request</span><input type="checkbox" className="toggle-checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between"><span className="text-slate-300">Critical Issue Reported</span><input type="checkbox" className="toggle-checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between"><span className="text-slate-300">Student Experiment Submission</span><input type="checkbox" className="toggle-checkbox" /></label>
        </div>
      </div>
      
      {/* Security */}
      <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg">
        <h2 className="font-semibold text-white mb-4 flex items-center"><Lock size={18} className="mr-2 text-blue-400"/>Account Security</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
          Change Password
        </button>
      </div>
    </div>
  );
}