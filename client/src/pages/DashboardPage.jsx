import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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

    const showLab = (lab) => {
        setActiveLab(lab);
    };

    const showDashboard = () => {
        setActiveLab(null);
    };

    // The single image path
    const sampleImage = '/images/sample.jpg'; // Ensure this path is correct

    // Lab data with full details and image names
    const labs = [
        {
            id: 'lab304',
            name: 'LAB 304',
            full_name: 'Analog Circuits Laboratory',
            professorInCharge: {
                name: 'Dr. Payal Shah',
                image_name: 'sample'
            },
            technicalAssistant: {
                name: 'Mrs. Deepali Thombare',
                image_name: 'sample'
            },
            lab_image_name: 'sample',
            overview: 'The Analog Circuits Laboratory is dedicated to providing hands-on experience with analog electronic components and circuits. It supports practical learning for students in the field of electronics and telecommunications, focusing on circuit design, testing, and troubleshooting.',
            equipment: [
                { name: 'Oscilloscopes (Digital and Analog)', image_name: 'sample' },
                { name: 'Function Generators', image_name: 'sample' },
                { name: 'Power Supplies', image_name: 'sample' },
                { name: 'Multimeters', image_name: 'sample' },
                { name: 'Signal Analyzers', image_name: 'sample' },
                { name: 'Analog IC Trainer Kits', image_name: 'sample' },
                { name: 'Soldering Stations', image_name: 'sample' },
                { name: 'Component Testing Equipment', image_name: 'sample' }
            ]
        },
        {
            id: 'lab306',
            name: 'LAB 306',
            full_name: 'Electronic Devices Laboratory',
            professorInCharge: {
                name: 'Dr. Rajendra Sutar',
                image_name: 'sample'
            },
            technicalAssistant: {
                name: 'Mrs. Deepali Thombare',
                image_name: 'sample'
            },
            lab_image_name: 'sample',
            overview: 'The Electronic Devices Laboratory provides students with practical exposure to semiconductor devices and their applications. It emphasizes device characterization, circuit implementation, and performance analysis.',
            equipment: [
                { name: 'Semiconductor Parameter Analyzers', image_name: 'sample' },
                { name: 'Curve Tracers', image_name: 'sample' },
                { name: 'Digital Multimeters', image_name: 'sample' },
                { name: 'Power Supplies', image_name: 'sample' },
                { name: 'Oscilloscopes', image_name: 'sample' },
                { name: 'Device Testing Kits', image_name: 'sample' },
                { name: 'Logic Analyzers', image_name: 'sample' }
            ]
        }
    ];

    // If a lab is selected, show its detail view
    if (activeLab) {
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
                    <button onClick={showDashboard} className="text-blue-400 hover:text-blue-300 mb-4 flex items-center">
                        ← Back to Department
                    </button>
                    <h1 className="text-3xl font-bold mb-6 text-white">{activeLab.name}: {activeLab.full_name}</h1>
                    
                    {/* Lab Image - Adjusted for smaller and centered */}
                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <img 
                            src={sampleImage}
                            alt={activeLab.full_name} 
                            style={{ 
                                width: '70%', 
                                maxWidth: '600px', 
                                height: 'auto', 
                                objectFit: 'cover', 
                                borderRadius: '0.75rem', 
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
                            }}
                        />
                    </div>

                    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem' }}>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Overview</h2>
                        <p className="text-slate-300 leading-relaxed">{activeLab.overview}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                        {/* Professor in Charge */}
                        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img 
                                src={sampleImage}
                                alt={activeLab.professorInCharge.name} 
                                style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid #3b82f6' }}
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-blue-300">Professor in Charge</h2>
                                <p className="text-white font-medium">{activeLab.professorInCharge.name}</p>
                            </div>
                        </div>

                        {/* Technical Assistant */}
                        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img 
                                src={sampleImage}
                                alt={activeLab.technicalAssistant.name} 
                                style={{ width: '6rem', height: '6rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22c55e' }}
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-blue-300">Technical Assistant</h2>
                                <p className="text-white font-medium">{activeLab.technicalAssistant.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Equipment Available */}
                    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem' }}>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Equipment Available</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {activeLab.equipment.map((equipment, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#334155', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                    <img 
                                        src={sampleImage}
                                        alt={equipment.name} 
                                        style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '0.25rem' }}
                                    />
                                    <p className="text-slate-200">{equipment.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
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
                            color: '#60a5fa', 
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
                            <div style={{ backgroundColor: '#60a5fa', borderRadius: '50%' }}></div>
                            <div style={{ backgroundColor: 'white', borderRadius: '50%' }}></div>
                            <div style={{ backgroundColor: 'white', borderRadius: '50%' }}></div>
                            <div style={{ backgroundColor: '#60a5fa', borderRadius: '50%' }}></div>
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
                            onClick={() => showLab(lab)}
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
                            <div style={{ height: '8px', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: lab.theme === 'dark' ? 'white' : '#1e293b' }}>
                                    {lab.name}
                                </h2>
                                <p style={{ fontSize: '0.875rem', color: lab.theme === 'dark' ? '#94a3b8' : '#475569', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '500' }}>Professor:</span> {lab.professorInCharge.name}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: lab.theme === 'dark' ? '#94a3b8' : '#475569' }}>
                                    <span style={{ fontWeight: '500' }}>TA:</span> {lab.technicalAssistant.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}