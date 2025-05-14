import React from 'react';

export default function LabCard({ lab, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: lab.theme === 'dark' ? '#1e293b' : '#f8fafc',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow =
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div
        style={{
          height: '8px',
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        }}
      />
      <div
        style={{
          padding: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            marginBottom: '0.75rem',
            color: lab.theme === 'dark' ? 'white' : '#1e293b',
          }}
        >
          {lab.name}
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            color: lab.theme === 'dark' ? '#94a3b8' : '#475569',
          }}
        >
          <li
            style={{
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ fontWeight: '500' }}>Professor:</span> {lab.professorInCharge}
          </li>
          <li
            style={{
              fontSize: '0.875rem',
            }}
          >
            <span style={{ fontWeight: '500' }}>TA:</span> {lab.technicalAssistant}
          </li>
        </ul>
      </div>
    </div>
  );
}