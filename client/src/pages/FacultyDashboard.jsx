// src/pages/FacultyDashboard.jsx

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Settings
} from 'lucide-react';

const FacultyDashboard = () => {
  // State to hold data from the API
  const [stats, setStats] = useState(null);
  const [laboratories, setLaboratories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your new, consolidated dashboard endpoint
        const response = await fetch('http://127.0.0.1:8000/api/dashboard/faculty');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data.stats);
        setLaboratories(data.laboratories);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array ensures this runs only once on mount

  if (isLoading) {
    return <div className="p-6 text-white animate-pulse">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error fetching data: {error}</div>;
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="px-6 py-4">
          <p className="text-sm text-slate-400 mb-1">Department of Electronics and Telecommunications</p>
          <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Here's your laboratory overview for today.</p>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Pending Requests Card */}
          <StatCard title="Pending Requests" value={stats.pendingRequests} icon={Clock} theme="yellow" />
          {/* Reported Issues Card */}
          <StatCard title="Reported Issues" value={stats.reportedIssues} icon={AlertTriangle} theme="red" />
          {/* Active Experiments Card */}
          <StatCard title="Active Experiments" value={stats.activeExperiments} icon={Activity} theme="blue" />
          {/* Student Progress Card (Still dummy for now) */}
          <StatCard title="Student Progress" value="87%" icon={TrendingUp} theme="green" />
        </div>

        {/* Labs + Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Labs */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg">
                <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <h2 className="text-xl font-semibold">Laboratory Status</h2>
                </div>
                <div className="p-6 space-y-4">
                    {laboratories.map((lab, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                            <div><h3 className="font-medium">{lab.name}</h3></div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${lab.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{lab.status}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Activities Placeholder */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Recent Activities Feed (TODO)</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// A reusable component for the stat cards to keep the main component cleaner
const StatCard = ({ title, value, icon: Icon, theme }) => {
    const themes = {
        yellow: { bg: 'bg-gradient-to-br from-yellow-600/90 to-yellow-700/90', iconBg: 'bg-yellow-500/20', iconColor: 'text-yellow-300' },
        red: { bg: 'bg-gradient-to-br from-red-600/90 to-red-700/90', iconBg: 'bg-red-500/20', iconColor: 'text-red-300' },
        blue: { bg: 'bg-gradient-to-br from-blue-600/90 to-blue-700/90', iconBg: 'bg-blue-500/20', iconColor: 'text-blue-300' },
        green: { bg: 'bg-gradient-to-br from-green-600/90 to-green-700/90', iconBg: 'bg-green-500/20', iconColor: 'text-green-300' },
    };
    const selectedTheme = themes[theme] || themes.blue;

    return (
        <div className={`${selectedTheme.bg} rounded-lg p-6 hover:scale-[1.02] transition-all cursor-pointer group`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${selectedTheme.iconBg}`}>
                    <Icon className={`w-6 h-6 ${selectedTheme.iconColor}`} />
                </div>
                <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white" />
            </div>
            <h3 className="text-white/90 text-sm font-medium uppercase">{title}</h3>
            <p className="text-3xl font-bold">{value ?? 'N/A'}</p>
        </div>
    );
};

export default FacultyDashboard;
