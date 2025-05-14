import React from 'react';

export default function LabDetail({ lab, onBack }) {
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
          backgroundColor: '#1e293b',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: 'white',
            }}
          >
            {lab.name}
          </h1>
          <button
            onClick={onBack}
            style={{
              color: '#60a5fa',
              background: 'none',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#3b82f6')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#60a5fa')}
          >
            ← Back to Department
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}
          >
            Overview
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
            {lab.overview}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}
          >
            Professor in Charge
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
            {lab.professorInCharge}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}
          >
            Technical Assistant
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.5' }}>
            {lab.technicalAssistant}
          </p>
        </div>

        <div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
            }}
          >
            Equipment Available
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {lab.equipment.map((item, index) => (
              <li
                key={index}
                style={{
                  color: '#94a3b8',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#60a5fa',
                    borderRadius: '50%',
                    marginRight: '0.5rem',
                  }}
                ></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}