import { useState } from 'react';
import { Clock, Check, AlertTriangle } from 'lucide-react';

export default function ExperimentsPage({ navigateTo }) {
  // Mock data for experiments
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      title: "Experiment 1: Ohm's Law Verification",
      description: "Verify Ohm's Law by measuring voltage and current across a resistor.",
      dueDate: "2024-07-10",
      status: "Pending", // Default status is "Pending"
    },
    {
      id: 2,
      title: "Experiment 2: Series and Parallel Circuits",
      description: "Study the behavior of resistors in series and parallel configurations.",
      dueDate: "2024-07-17",
      status: "Pending",
    },
    {
      id: 3,
      title: "Experiment 3: Capacitor Charging and Discharging",
      description: "Observe the charging and discharging curves of a capacitor.",
      dueDate: "2024-07-24",
      status: "Pending",
    },
    {
      id: 4,
      title: "Experiment 4: Transistor as a Switch",
      description: "Use a transistor to switch a load on and off.",
      dueDate: "2024-07-31",
      status: "Pending",
    },
    {
      id: 5,
      title: "Experiment 5: Diode Characteristics",
      description: "Study the forward and reverse bias characteristics of a diode.",
      dueDate: "2024-08-07",
      status: "Pending",
    },
  ]);

  // Function to update the status of an experiment
  const updateExperimentStatus = (id, newStatus) => {
    setExperiments((prevExperiments) =>
      prevExperiments.map((exp) =>
        exp.id === id ? { ...exp, status: newStatus } : exp
      )
    );
  };

  // Filter experiments based on status
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredExperiments =
    statusFilter === 'all'
      ? experiments
      : experiments.filter((exp) => exp.status.toLowerCase() === statusFilter.toLowerCase());

  // Get status color and icon
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'overdue':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'done':
        return <Check size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'overdue':
        return <AlertTriangle size={16} />;
      default:
        return null;
    }
  };

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateString.split('-').join('-');
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
            Electronic Devices Lab 2023-24
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

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#94a3b8' }}>
            Professor-in-charge: Dr. Prashant Kasambe | Prof. Sneha Weaky
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: statusFilter === 'all' ? '#2563eb' : '#1e293b',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: statusFilter === 'done' ? '#2563eb' : '#1e293b',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setStatusFilter('done')}
          >
            Completed
          </button>
          <button
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: statusFilter === 'pending' ? '#2563eb' : '#1e293b',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
        </div>

        {/* Experiments List */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredExperiments.map((experiment) => (
            <div
              key={experiment.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#334155')}
              onClick={() => navigateTo('ExperimentDetail', experiment.id, updateExperimentStatus)}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.75rem',
                }}
              >
                {experiment.title}
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{experiment.description}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.95rem',
                }}
              >
                <div style={{ color: '#94a3b8' }}>
                  <span style={{ fontWeight: '600' }}>Due Date:</span> {formatDate(experiment.dueDate)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: getStatusColor(experiment.status),
                  }}
                >
                  {getStatusIcon(experiment.status)}
                  <span>Status: {experiment.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}