import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowUpCircle, AlertCircle } from 'lucide-react'; // Removed 'Plus'

// Reusable component for priority badges
const PriorityBadge = ({ priority }) => {
  const color = {
    Critical: 'bg-red-600/30 text-red-300 border border-red-500/40',
    High: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    Normal: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  }[priority] || 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${color}`}>{priority}</span>;
};

// Reusable component for status badges
const StatusBadge = ({ status }) => {
    const color = {
      Open: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'In Progress': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'Resolved': 'bg-green-500/20 text-green-400 border border-green-500/30',
    }[status];
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${color}`}>{status}</span>;
  };

export default function FacultyIssueHandlingPage() {
  const [activeTab, setActiveTab] = useState('Open Issues');
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch('http://127.0.0.1:8000/api/issues');
        if (!response.ok) {
            throw new Error('Failed to fetch issues from the server.');
        }
        const data = await response.json();
        setIssues(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleResolveIssue = async (issueId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/issues/${issueId}/resolve`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to resolve issue.');
      }
      setIssues(issues.map(issue => 
        issue.issue_id === issueId ? { ...issue, status: 'Resolved' } : issue
      ));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEscalateIssue = async (issueId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/issues/${issueId}/escalate`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to escalate issue.');
      }
      const data = await response.json();
      setIssues(issues.map(issue => 
        issue.issue_id === issueId ? { ...issue, priority: data.priority } : issue
      ));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (activeTab === 'Open Issues') return issue.status === 'Open' || issue.status === 'In Progress';
    if (activeTab === 'Resolved Issues') return issue.status === 'Resolved';
    return true;
  });

  return (
    <div className="text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Issue Handling</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and resolve laboratory issues and equipment problems.</p>
        </div>
        {/* --- ADD ISSUE BUTTON REMOVED --- */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6">
          <button onClick={() => setActiveTab('Open Issues')} className={`py-2 px-4 text-sm font-medium transition-colors flex items-center ${activeTab === 'Open Issues' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            Open Issues <span className="ml-2 bg-slate-700 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">{issues.filter(i => i.status !== 'Resolved').length}</span>
          </button>
          <button onClick={() => setActiveTab('Resolved Issues')} className={`py-2 px-4 text-sm font-medium transition-colors ${activeTab === 'Resolved Issues' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-400 hover:text-white'}`}>
            Resolved Issues
          </button>
      </div>

      {/* Content Area */}
      {isLoading && <div className="text-center text-slate-400 animate-pulse">Loading issues...</div>}
      {error && <div className="text-center text-red-400 flex items-center justify-center p-4 bg-red-500/10 rounded-lg"><AlertCircle size={18} className="mr-2"/> Error: {error}</div>}
      
      {!isLoading && !error && (
        <div className="space-y-4">
          {filteredIssues.length > 0 ? filteredIssues.map((issue) => (
            <div key={issue.issue_id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-slate-600 transition-all">
              <div className="flex-1 mb-4 sm:mb-0">
                <p className="font-bold text-white mb-1">{issue.title}</p>
                <p className="text-xs text-slate-400 mb-3">{issue.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>Lab: <span className="font-semibold text-slate-300">{issue.lab}</span></span>
                    <span>Equipment: <span className="font-semibold text-slate-300">{issue.equipment}</span></span>
                    <span>Reported by: <span className="font-semibold text-slate-300">{issue.reported_by_username}</span></span>
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-0 sm:ml-6 flex-shrink-0">
                <PriorityBadge priority={issue.priority} />
                <StatusBadge status={issue.status} />
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => handleResolveIssue(issue.issue_id)}
                        className="flex items-center text-xs bg-green-500/20 hover:bg-green-500/40 text-green-400 py-1.5 px-3 rounded-full transition-colors">
                        <CheckCircle size={14} className="mr-1.5" /> Resolve
                    </button>
                    <button 
                        onClick={() => handleEscalateIssue(issue.issue_id)}
                        className="flex items-center text-xs bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 py-1.5 px-3 rounded-full transition-colors">
                        <ArrowUpCircle size={14} className="mr-1.5" /> Escalate
                    </button>
                </div>
              </div>
            </div>
          )) : <div className="text-center text-slate-500 p-8 bg-slate-800/20 rounded-lg">No {activeTab.toLowerCase()} found.</div>}
        </div>
      )}
    </div>
  );
}

