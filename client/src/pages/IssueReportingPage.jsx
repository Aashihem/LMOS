import { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';

export default function IssueReportingPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportedIssues, setReportedIssues] = useState([
    {
      id: 'ISS-2001',
      equipment: 'Digital Oscilloscope Model DS1',
      lab: 'LAB 304',
      issueType: 'Hardware Malfunction',
      reportDate: '5/10/2025',
      status: 'Open',
    },
    {
      id: 'ISS-2002',
      equipment: 'Power Supply Model PS2',
      lab: 'LAB 306',
      issueType: 'Calibration Required',
      reportDate: '5/08/2025',
      status: 'In Progress',
    },
    {
      id: 'ISS-2003',
      equipment: 'Function Generator Model FG1',
      lab: 'LAB 304',
      issueType: 'Software Issue',
      reportDate: '5/05/2025',
      status: 'Resolved',
    },
    {
      id: 'ISS-2004',
      equipment: 'Spectrum Analyzer Model SA2',
      lab: 'LAB 306',
      issueType: 'Connection Problem',
      reportDate: '5/11/2025',
      status: 'Open',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({
    id: '',
    equipment: '',
    lab: '',
    issueType: '',
    reportDate: '',
    status: 'Open',
  });

  // Filter issues based on status and search query
  const filteredIssues = reportedIssues
    .filter(
      (issue) =>
        statusFilter === 'all' ||
        issue.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .filter(
      (issue) =>
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

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newIssueWithId = {
      ...newIssue,
      id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random ID
      reportDate: new Date().toLocaleDateString(), // Set current date
    };
    setReportedIssues([...reportedIssues, newIssueWithId]); // Add new issue to the list
    setIsModalOpen(false); // Close the modal
    setNewIssue({
      id: '',
      equipment: '',
      lab: '',
      issueType: '',
      reportDate: '',
      status: 'Open',
    }); // Reset the form
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              lineHeight: '1.2',
              maxWidth: '70%',
              color: 'white',
              background: 'linear-gradient(to right, #e2e8f0, #f8fafc)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            Issue Reporting
          </h1>
        </div>

        {/* Decorative top bar */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '4px',
            marginBottom: '2rem',
          }}
        />

        {/* Action Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem',
          }}
        >
          <button
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            Report New Issue
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by ID or equipment"
                style={{
                  width: '250px',
                  padding: '0.875rem 1rem',
                  paddingLeft: '2.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: '#1e293b',
                  color: 'white',
                  border: '1px solid #334155',
                  outline: 'none',
                  fontSize: '0.95rem',
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                }}
              />
            </div>

            {/* Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Filter by status:</span>
              <select
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  padding: '0.5rem',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.95rem',
                }}
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
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#334155',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Issue ID</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Equipment</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Lab</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Issue Type</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Report Date</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Status</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    style={{
                      borderTop: '1px solid #334155',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{issue.id}</td>
                    <td style={{ padding: '0.75rem', color: 'white' }}>{issue.equipment}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{issue.lab}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{issue.issueType}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{issue.reportDate}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: getStatusBadgeColor(issue.status).split(' ')[0],
                          color: getStatusBadgeColor(issue.status).split(' ')[1],
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                        }}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button
                        style={{
                          color: '#60a5fa',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                        }}
                      >
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
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#94a3b8' }}>No issues found matching your filters.</p>
          </div>
        )}

        {/* Modal for Reporting New Issue */}
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '2rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'white',
                  }}
                >
                  Report New Issue
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    color: '#94a3b8',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#94a3b8',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Equipment
                  </label>
                  <input
                    type="text"
                    value={newIssue.equipment}
                    onChange={(e) =>
                      setNewIssue({ ...newIssue, equipment: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#334155',
                      color: 'white',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#94a3b8',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Lab
                  </label>
                  <input
                    type="text"
                    value={newIssue.lab}
                    onChange={(e) =>
                      setNewIssue({ ...newIssue, lab: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#334155',
                      color: 'white',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#94a3b8',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Issue Type
                  </label>
                  <input
                    type="text"
                    value={newIssue.issueType}
                    onChange={(e) =>
                      setNewIssue({ ...newIssue, issueType: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#334155',
                      color: 'white',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.95rem',
                    }}
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '0.875rem 1.5rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#4b5563',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.875rem 1.5rem',
                      borderRadius: '0.75rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}