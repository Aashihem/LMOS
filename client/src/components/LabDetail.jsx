import React from 'react';

export default function LabDetail({ lab, onBack }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-white">{lab.name}</h1>
        <button 
          onClick={onBack}
          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
        >
          ← Back to Department
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300">{lab.overview}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Professor in Charge</h2>
          <p className="text-gray-300">{lab.professorInCharge}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Technical Assistant</h2>
          <p className="text-gray-300">{lab.technicalAssistant}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Equipment Available</h2>
          <ul className="space-y-2">
            {lab.equipment.map((item, index) => (
              <li key={index} className="text-gray-300 flex items-start">
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}