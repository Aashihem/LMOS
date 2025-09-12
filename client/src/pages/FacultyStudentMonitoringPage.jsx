// src/pages/FacultyStudentMonitoringPage.jsx

import React from 'react';
import { Eye, Filter } from 'lucide-react';

// Mock Data
const students = [
  { name: 'Alex Johnson', id: 'ET2021001', batch: 'ET2021-A', activeLab: 'Signal Analysis Lab', lastActivity: '2025-09-12 14:30', progress: 72 },
  { name: 'Sarah Miller', id: 'ET2021002', batch: 'ET2021-B', activeLab: 'Communications Lab', lastActivity: '2025-09-12 11:15', progress: 48 },
  { name: 'Mike Davis', id: 'ET2021003', batch: 'ET2021-A', activeLab: 'Signal Analysis Lab', lastActivity: '2025-09-11 16:45', progress: 85 },
  { name: 'Emily White', id: 'ET2022001', batch: 'ET2022-A', activeLab: 'Basic Circuit Analysis', lastActivity: '2025-09-12 09:00', progress: 100 },
  { name: 'Chris Green', id: 'ET2022002', batch: 'ET2022-B', activeLab: 'Digital Systems Lab', lastActivity: '2025-09-10 13:20', progress: 65 },
];

export default function FacultyStudentMonitoringPage() {
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Monitoring</h1>
          <p className="text-slate-400 text-sm mt-1">Track student progress, view experiment submissions, and manage lab activity.</p>
        </div>
        <button className="flex items-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          <Filter size={16} className="mr-2" />
          Filter by Lab/Batch
        </button>
      </div>

      {/* Student Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-800">
            <tr>
              <th scope="col" className="px-6 py-3">Student Name</th>
              <th scope="col" className="px-6 py-3">Batch</th>
              <th scope="col" className="px-6 py-3">Active Lab</th>
              <th scope="col" className="px-6 py-3">Last Activity</th>
              <th scope="col" className="px-6 py-3">Overall Progress</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{student.name}</div>
                  <div className="text-xs text-slate-400">{student.id}</div>
                </td>
                <td className="px-6 py-4">{student.batch}</td>
                <td className="px-6 py-4">{student.activeLab}</td>
                <td className="px-6 py-4">{student.lastActivity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-full bg-slate-700 rounded-full h-2 mr-3">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center text-xs bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-3 rounded-full transition-colors">
                    <Eye size={14} className="mr-1.5" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}