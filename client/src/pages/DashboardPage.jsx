// pages/DashboardPage.js
import { useState } from 'react';
import LabCard from '../components/LabCard';
import LabDetail from '../components/LabDetail';

export default function DashboardPage() {
  const [activeLab, setActiveLab] = useState(null);

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
    <section className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold leading-tight max-w-[70%] text-white font-sans">
          Department of Electronics and Telecommunications
        </h1>
        <div className="flex items-center space-x-1">
          <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-6 h-6">
            <div className="bg-blue-400 rounded-full"></div>
            <div className="bg-white rounded-full"></div>
            <div className="bg-white rounded-full"></div>
            <div className="bg-blue-400 rounded-full"></div>
          </div>
          <span className="text-white text-sm font-semibold ml-2 font-sans">LMOS</span>
        </div>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {labs.map(lab => (
          <LabCard 
            key={lab.id} 
            lab={lab} 
            onClick={() => showLab(lab.id)} 
          />
        ))}
        {/* Additional placeholder lab cards */}
        <LabCard 
          lab={labs[0]} 
          onClick={() => showLab('lab304')} 
        />
        <div className="bg-blue-400 h-40 rounded-md"></div>
        <div className="bg-gray-800 h-40 rounded-md"></div>
        <div className="bg-blue-400 h-40 rounded-md"></div>
      </main>
    </section>
  );
}