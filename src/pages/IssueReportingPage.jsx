// pages/IssueReportingPage.js
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function IssueReportingPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for reported issues
  const reportedIssues = [
    {
      id: 'ISS-2001',
      equipment: 'Digital Oscilloscope Model DS1',
      lab: 'LAB 304',
      issueType: 'Hardware Malfunction',
      reportDate: '5/10/2025',
      status: 'Open'
    },
    {
      id: 'ISS-2002',
      equipment: 'Power Supply Model PS2',
      lab: 'LAB 306',
      issueType: 'Calibration Required',
      reportDate: '5/08/2025',
      status: 'In Progress'
    },
    {
      id: 'ISS-2003',
      equipment: 'Function Generator Model FG1',
      lab: 'LAB 304',
      issueType: 'Software Issue',
      reportDate: '5/05/2025',
      status: 'Resolved'
    },
    {
      id: 'ISS-2004',
      equipment: 'Spectrum Analyzer Model SA2',
      lab: 'LAB 306',
      issueType: 'Connection Problem',
      reportDate: '5/11/2025',
      status: 'Open'
    }
  ];

  // Filter issues based on status and search query
  const filteredIssues = reportedIssues
    .filter(issue => 
      statusFilter === 'all' || issue.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .filter(issue => 
      searchQuery === '' || 
      issue.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Status badge color mapping
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-500/20 text-red-400';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400';
      case 'resolved':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Issue Reporting</h1>
      
      {/* Action Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors">
          <Plus size={18} />
          <span>Report New Issue</span>
        </button>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or equipment"
              className="pl-10 pr-4 py-2 rounded bg-[#1e293b] border border-[#334155] focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Filter by status:</span>
            <select 
              className="bg-[#1e293b] border border-[#334155] rounded p-2 focus:outline-none focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Issues Table */}
      <div className="bg-[#1e293b] rounded-md overflow-hidden shadow">
        <div className="overflow-x-auto"> {/* Added horizontal scroll */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#334155] text-left text-sm uppercase font-semibold">
                <th className="px-4 py-3 text-gray-300">Issue ID</th>
                <th className="px-4 py-3 text-gray-300">Equipment</th>
                <th className="px-4 py-3 text-gray-300">Lab</th>
                <th className="px-4 py-3 text-gray-300">Issue Type</th>
                <th className="px-4 py-3 text-gray-300">Report Date</th>
                <th className="px-4 py-3 text-gray-300">Status</th>
                <th className="px-4 py-3 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="border-t border-[#334155] hover:bg-[#2d3748]">
                  <td className="px-4 py-3 text-gray-300">{issue.id}</td>
                  <td className="px-4 py-3">{issue.equipment}</td>
                  <td className="px-4 py-3 text-gray-300">{issue.lab}</td>
                  <td className="px-4 py-3 text-gray-300">{issue.issueType}</td>
                  <td className="px-4 py-3 text-gray-300">{issue.reportDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 ${getStatusBadgeColor(issue.status)} rounded-full text-xs font-semibold`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-400 hover:text-blue-500 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* No Results */}
      {filteredIssues.length === 0 && (
        <div className="text-center py-10 bg-[#1e293b] rounded-md mt-4">
          <p className="text-gray-400">No issues found matching your filters.</p>
        </div>
      )}
    </div>
  );
}