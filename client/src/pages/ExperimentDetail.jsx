import { ArrowLeft, Check, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ExperimentDetail({ experimentId, navigateTo, updateExperimentStatus }) {
  const initialExperiments = [
    {
      id: 1,
      title: "Experiment 1: Ohm's Law Verification",
      description: "Verify Ohm's Law by measuring voltage and current across a resistor.",
      dueDate: "2024-07-10",
      status: "Pending",
      instructions: `
        Objective: To verify Ohm's Law (V = IR) in a simple resistive circuit.
        Materials:
        - Resistor (1 kΩ)
        - Power supply
        - Multimeter
        - Connecting wires
        Procedure:
        1. Connect the resistor to the power supply.
        2. Set the power supply to different voltages (e.g., 5V, 10V, 15V).
        3. Measure the current through the resistor using the multimeter.
        4. Record voltage and current values.
        5. Calculate resistance using Ohm's Law and compare with the nominal value.
        Expected Results:
        - The ratio of voltage to current should be constant, confirming Ohm's Law.
      `,
    },
    // ...other experiments...
  ];

  const [experiments, setExperiments] = useState(initialExperiments);
  const [uploadedFile, setUploadedFile] = useState(null);

  const experiment = experiments.find((exp) => exp.id === experimentId) || {};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateString ? dateString.split('-').join('-') : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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

  const handleSubmit = () => {
    if (!uploadedFile) {
      alert("Please upload a file before submitting.");
      return;
    }

    // Simulate file submission (you can replace this with an API call)
    console.log(`Submitting file: ${uploadedFile.name} for experiment: ${experiment.title}`);

    // Update the status of the experiment to "Done"
    updateExperimentStatus(experimentId, "Done");

    alert(`Submitted data for ${experiment.title} with file: ${uploadedFile.name}`);

    // Navigate back to the Experiments page
    navigateTo('Experiments');
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
        {!experiment || !experiment.id ? (
          <div
            style={{
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: '1.25rem',
              fontWeight: '500',
            }}
          >
            Experiment not found
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <button
                onClick={() => navigateTo('Experiments')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#94a3b8',
                  backgroundColor: '#1e293b',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #334155',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
                Back to Experiments
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                {experiment.title}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
                {experiment.description}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                Instructions
              </h2>
              <pre
                style={{
                  color: '#94a3b8',
                  backgroundColor: '#0f172a',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {experiment.instructions}
              </pre>

              <div style={{ marginTop: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '1rem',
                  }}
                >
                  Upload Experiment File
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      color: '#94a3b8',
                      backgroundColor: '#1e293b',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid #334155',
                      cursor: 'pointer',
                    }}
                  />
                  {uploadedFile && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                      Uploaded: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#0f172a',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
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
                  <span style={{ fontWeight: '600' }}>Status: {experiment.status}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  marginTop: '2rem',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  fontSize: '1rem',
                  backgroundColor: experiment.status === 'Done' ? '#4b5563' : '#2563eb',
                  color: experiment.status === 'Done' ? '#9ca3af' : 'white',
                  cursor: experiment.status === 'Done' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                disabled={experiment.status === 'Done'}
              >
                Submit Experiment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}