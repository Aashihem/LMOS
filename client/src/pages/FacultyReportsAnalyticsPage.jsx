// src/pages/FacultyReportsAnalyticsPage.jsx

import React from 'react';
import { Download, HardDrive, Clock, BarChart, PieChart, LineChart } from 'lucide-react';

// Mock Data
const kpiStats = [
    { title: 'Equipment Uptime', value: '98.7%', icon: HardDrive },
    { title: 'Avg. Issue Resolution', value: '4.2 Hours', icon: Clock },
    { title: 'Most Used Equipment', value: 'Oscilloscope', icon: BarChart },
];

export default function FacultyReportsAnalyticsPage() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">Visualize lab usage, equipment status, and student performance metrics.</p>
        </div>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {kpiStats.map(stat => (
          <div key={stat.title} className="bg-slate-800/50 border border-slate-700 p-5 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.title}</p>
                <stat.icon size={20} className="text-slate-500" />
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-lg">
            <h2 className="font-semibold text-white mb-4 flex items-center"><BarChart size={18} className="mr-2 text-blue-400"/>Lab Occupancy Rate</h2>
            <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">Chart Placeholder</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-lg">
            <h2 className="font-semibold text-white mb-4 flex items-center"><PieChart size={18} className="mr-2 text-blue-400"/>Equipment Usage by Type</h2>
            <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">Chart Placeholder</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-lg col-span-1 lg:col-span-2">
            <h2 className="font-semibold text-white mb-4 flex items-center"><LineChart size={18} className="mr-2 text-blue-400"/>Issue Reports Over Time</h2>
            <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">Chart Placeholder</div>
        </div>
      </div>
    </div>
  );
}