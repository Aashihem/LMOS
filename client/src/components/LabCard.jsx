import React from 'react';

export default function LabCard({ lab, onClick }) {
  // Set background color based on theme
  const bgColor = lab.theme === 'dark' ? 'bg-gray-800' : 'bg-blue-400';
  const textColor = 'text-white';

  return (
    <div 
      className={`${bgColor} rounded-md p-6 cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <h2 className={`${textColor} text-xl font-bold mb-4`}>{lab.name}</h2>
      <ul className="space-y-2">
        <li className={`${textColor} flex items-start`}>
          <span className="mr-2">•</span>
          <span>Professor in Charge: {lab.professorInCharge}</span>
        </li>
        <li className={`${textColor} flex items-start`}>
          <span className="mr-2">•</span>
          <span>Technical Assistant: {lab.technicalAssistant}</span>
        </li>
      </ul>
    </div>
  );
}