import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function EquipmentReservationPage() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for available equipment
  const availableEquipment = [
    { id: 'EQP-1004', name: 'Digital Oscilloscope Model DS1', type: 'Oscilloscope', availability: 'Available' },
    { id: 'EQP-1008', name: 'Spectrum Analyzer Model SA1', type: 'Spectrum Analyzer', availability: 'Available' },
    { id: 'EQP-1012', name: 'Power Supply Model PS1', type: 'Power Supply', availability: 'Available' },
    { id: 'EQP-1016', name: 'DMM Model M123', type: 'DMM', availability: 'Available' },
    { id: 'EQP-1020', name: 'Function Generator Model FG1', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1024', name: 'Function Generator Model FG2', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1028', name: 'Spectrum Analyzer Model SA2', type: 'Spectrum Analyzer', availability: 'Available' },
    { id: 'EQP-1032', name: 'Power Supply Model PS2', type: 'Power Supply', availability: 'Available' },
    { id: 'EQP-1036', name: 'DMM Model M456', type: 'DMM', availability: 'Available' },
    { id: 'EQP-1040', name: 'Oscilloscope Model OS2', type: 'Oscilloscope', availability: 'Available' },
    { id: 'EQP-1044', name: 'Function Generator Model FG3', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1048', name: 'Spectrum Analyzer Model SA3', type: 'Spectrum Analyzer', availability: 'Available' }
  ];

  // Mock data for user's reservation requests
  const reservationRequests = [
    {
      id: 1,
      equipment: 'Digital Oscilloscope Model DS1',
      startDateTime: '5/13/2025, 10:00 AM',
      endDateTime: '5/13/2025, 12:00 PM',
      status: 'Pending',
    },
    {
      id: 2,
      equipment: 'Function Generator Model FG1',
      startDateTime: '5/14/2025, 02:00 PM',
      endDateTime: '5/14/2025, 04:00 PM',
      status: 'Pending',
    },
    { 
      id: 3, 
      equipment: 'Power Supply Model PS1', 
      startDateTime: '5/15/2025, 09:00 AM', 
      endDateTime: '5/15/2025, 11:00 AM', 
      status: 'Pending' 
    },
    { 
      id: 4, 
      equipment: 'DMM Model M123', 
      startDateTime: '5/16/2025, 01:00 PM', 
      endDateTime: '5/16/2025, 03:00 PM', 
      status: 'Pending' 
    }
  ];

  const filteredEquipment = availableEquipment.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.id.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredReservations =
    statusFilter === 'all'
      ? reservationRequests
      : reservationRequests.filter((req) => req.status.toLowerCase() === statusFilter.toLowerCase());

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
            Equipment Reservation
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

        {/* Available Equipment Section */}
        <div style={{ marginBottom: '2rem' }}>
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
              Available Equipment
            </h2>
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
              }}
            >
              <Plus size={18} style={{ marginRight: '0.5rem' }} />
              Request Reservation
            </button>
          </div>

          {/* Search bar */}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search equipment by name or ID"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: '#1e293b',
                color: 'white',
                border: '1px solid #334155',
                outline: 'none',
                fontSize: '0.95rem',
              }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {/* Equipment table */}
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
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Item ID</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Name</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Type</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        borderTop: '1px solid #334155',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{item.id}</td>
                      <td style={{ padding: '0.75rem', color: 'white' }}>{item.name}</td>
                      <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{item.type}</td>
                      <td style={{ padding: '0.75rem', color: '#10b981' }}>{item.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reservation Requests Section */}
        <div>
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
              Your Reservation Requests
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                }}
              >
                Filter by status:
              </span>
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Reservations table */}
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
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Equipment</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Start Date & Time</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>End Date & Time</th>
                    <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((req) => (
                    <tr
                      key={req.id}
                      style={{
                        borderTop: '1px solid #334155',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.75rem', color: 'white' }}>{req.equipment}</td>
                      <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{req.startDateTime}</td>
                      <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{req.endDateTime}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#fbbf24',
                            color: '#92400e',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                          }}
                        >
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}