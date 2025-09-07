import React from 'react';

export default function FacultyDashboard({ onLogout }) {
  const username = localStorage.getItem('username') || 'Faculty';

  const handleLogout = () => {
    // **FIX: Call the onLogout prop from App.jsx**
    // This handles state change, local storage clearing, and redirection automatically.
    console.log('User logged out, calling onLogout prop');
    onLogout();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e2e8f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(30, 41, 59, 0.75)',
          padding: '2.5rem',
          borderRadius: '1.25rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'white',
          }}
        >
          Faculty Dashboard
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#94a3b8',
            marginBottom: '2.5rem',
          }}
        >
          Welcome, <span style={{ color: '#8b5cf6', fontWeight: '600' }}>{username}</span>!
        </p>
        
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '0 -2.5rem', marginBottom: '2.5rem' }}></div>

        <p style={{ color: '#cbd5e1', marginBottom: '2.5rem' }}>
          This is a placeholder for faculty-specific content and tools. You can manage courses, view student submissions, and post announcements here.
        </p>

        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(135deg, #be123c 0%, #ef4444 100%)',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            fontWeight: '600',
            fontSize: '1rem',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)',
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = '0 15px 20px -3px rgba(239, 68, 68, 0.4)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.3)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}