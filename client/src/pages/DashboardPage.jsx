import React, { useState, useEffect } from 'react';
import LabCard from '../components/LabCard';
import LabDetail from '../components/LabDetail';

export default function DashboardPage() {
  const [activeLab, setActiveLab] = useState(null);
  const [showContent, setShowContent] = useState(false);

  // Add entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const showLab = (labId) => {
    setActiveLab(labId);
  };

  const showDashboard = () => {
    setActiveLab(null);
  };

  // Lab data
  const labs = [
    {
      id: 'lab304',
      name: 'LAB 304: Analog Circuits Laboratory',
      professorInCharge: 'Dr. Payal Shah',
      technicalAssistant: 'Mrs. Deepali Thombare',
      theme: 'dark',
      overview: 'The Analog Circuits Laboratory is dedicated to providing hands-on experience with analog electronic components and circuits. It supports practical learning for students in the field of electronics and telecommunications, focusing on circuit design, testing, and troubleshooting.',
      equipment: [
        'Oscilloscopes (Digital and Analog)',
        'Function Generators',
        'Power Supplies',
        'Multimeters',
        'Signal Analyzers',
        'Analog IC Trainer Kits',
        'Soldering Stations',
        'Component Testing Equipment'
      ]
    },
    {
      id: 'lab306',
      name: 'LAB 306: Electronic Devices Laboratory',
      professorInCharge: 'Dr. Rajendra Sutar',
      technicalAssistant: 'Mrs. Deepali Thombare',
      theme: 'light',
      overview: 'The Electronic Devices Laboratory provides students with practical exposure to semiconductor devices and their applications. It emphasizes device characterization, circuit implementation, and performance analysis.',
      equipment: [
        'Semiconductor Parameter Analyzers',
        'Curve Tracers',
        'Digital Multimeters',
        'Power Supplies',
        'Oscilloscopes',
        'Device Testing Kits',
        'Logic Analyzers'
      ]
    }
  ];

  // If a lab is selected, show its detail view
  if (activeLab) {
    const selectedLab = labs.find(lab => lab.id === activeLab);
    return <LabDetail lab={selectedLab} onBack={showDashboard} />;
  }

  // Dashboard view
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
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(10px)',
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
            Department of Electronics and Telecommunications
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '2px',
                width: '24px',
                height: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#60a5fa',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                style={{
                  backgroundColor: '#60a5fa',
                  borderRadius: '50%',
                }}
              ></div>
            </div>
            <span
              style={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginLeft: '0.5rem',
              }}
            >
              LMOS
            </span>
          </div>
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

        <main
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {labs.map(lab => (
            <div
              key={lab.id}
              onClick={() => showLab(lab.id)}
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
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
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
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: lab.theme === 'dark' ? '#94a3b8' : '#475569',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>Professor:</span> {lab.professorInCharge}
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: lab.theme === 'dark' ? '#94a3b8' : '#475569',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>TA:</span> {lab.technicalAssistant}
                </p>
              </div>
            </div>
          ))}

          {/* Second instance of the first lab */}
          <div
            onClick={() => showLab('lab304')}
            style={{
              backgroundColor: labs[0].theme === 'dark' ? '#1e293b' : '#f8fafc',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
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
                  color: labs[0].theme === 'dark' ? 'white' : '#1e293b',
                }}
              >
                {labs[0].name}
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: labs[0].theme === 'dark' ? '#94a3b8' : '#475569',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ fontWeight: '500' }}>Professor:</span> {labs[0].professorInCharge}
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: labs[0].theme === 'dark' ? '#94a3b8' : '#475569',
                }}
              >
                <span style={{ fontWeight: '500' }}>TA:</span> {labs[0].technicalAssistant}
              </p>
            </div>
          </div>

          {/* Placeholder colored divs */}
          <div
            style={{
              backgroundColor: '#60a5fa',
              borderRadius: '0.75rem',
              height: '160px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          />
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.75rem',
              height: '160px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          />
          <div
            style={{
              backgroundColor: '#60a5fa',
              borderRadius: '0.75rem',
              height: '160px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          />
        </main>
      </div>
    </div>
  );
}