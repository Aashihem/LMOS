import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function FacultyEquipmentManagementPage() {
  const [activeTab, setActiveTab] = useState('Pending Requests');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'Pending Requests') {
      fetchPendingRequests();
    }
  }, [activeTab]);

  const fetchPendingRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations/pending');
      if (!response.ok) throw new Error('Failed to fetch pending requests.');
      const data = await response.json();
      setPendingRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
        await fetch(`http://127.0.0.1:8000/api/reservations/${id}/approve`, { method: 'PATCH' });
        // Optimistically remove from list
        setPendingRequests(pendingRequests.filter(req => req.reservation_id !== id));
    } catch (err) {
        alert('Failed to approve request.');
    }
  };

  const handleReject = async (id) => {
    try {
        await fetch(`http://127.0.0.1:8000/api/reservations/${id}/reject`, { method: 'PATCH' });
        // Optimistically remove from list
        setPendingRequests(pendingRequests.filter(req => req.reservation_id !== id));
    } catch (err) {
        alert('Failed to reject request.');
    }
  };
  
  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Equipment Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage equipment reservations, inventory, and maintenance schedules.</p>
        </div>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          <Plus size={18} className="mr-2" />
          Add Equipment
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6">
        {['Pending Requests', 'Equipment Inventory', 'Reservation History'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-blue-500 text-blue-400' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'Pending Requests' && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Pending Equipment Requests</h2>
          </div>
          {isLoading && <p className="p-6">Loading requests...</p>}
          {error && <p className="p-6 text-red-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Error: {error}</p>}
          {!isLoading && !error && (
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3">Student</th>
                  <th scope="col" className="px-6 py-3">Equipment</th>
                  <th scope="col" className="px-6 py-3">Start Date</th>
                  <th scope="col" className="px-6 py-3">End Date</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req) => (
                  <tr key={req.reservation_id} className="border-b border-slate-700 hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-white">{req.student_name}</td>
                    <td className="px-6 py-4">{req.equipment}</td>
                    <td className="px-6 py-4">{new Date(req.start_date).toLocaleString()}</td>
                    <td className="px-6 py-4">{new Date(req.end_date).toLocaleString()}</td>
                    <td className="px-6 py-4 flex items-center space-x-2">
                      <button onClick={() => handleApprove(req.reservation_id)} className="flex items-center text-xs bg-green-500/20 hover:bg-green-500/40 text-green-400 py-1 px-3 rounded-full">
                        <CheckCircle2 size={14} className="mr-1" /> Approve
                      </button>
                      <button onClick={() => handleReject(req.reservation_id)} className="flex items-center text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 py-1 px-3 rounded-full">
                        <XCircle size={14} className="mr-1" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
