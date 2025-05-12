// pages/ProfileSettingsPage.js
import { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ExperimentMarks from '../components/profile/ExperimentMarks';

export default function ProfileSettingsPage() {
  // Mock student data
  const studentData = {
    name: "Aashi Hemnani",
    uid: "UID123456",
    experimentMarks: [
      { id: 1, name: "Experiment 1", marks: 85 },
      { id: 2, name: "Experiment 2", marks: 90 },
      { id: 3, name: "Experiment 3", marks: 88 },
      { id: 4, name: "Experiment 4", marks: 92 },
      { id: 5, name: "Experiment 5", marks: 87 },
      { id: 6, name: "Experiment 6", marks: 91 },
      { id: 7, name: "Experiment 7", marks: 89 },
      { id: 8, name: "Experiment 8", marks: 93 },
      { id: 9, name: "Experiment 9", marks: 90 },
      { id: 10, name: "Experiment 10", marks: 94 }
    ],
    attendance: 85, // Percentage
    issues: 2 // Number of reported issues
  };

  const [activeTab, setActiveTab] = useState('marks');

  return (
    <div className="max-w-7xl mx-auto text-white">
      <ProfileHeader name={studentData.name} uid={studentData.uid} />
      <ProfileStats 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        attendance={studentData.attendance}
        issues={studentData.issues}
      />
      
      {activeTab === 'marks' && (
        <ExperimentMarks experiments={studentData.experimentMarks} />
      )}
      
      {activeTab === 'attendance' && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Attendance Details</h2>
          <p>Your current attendance: {studentData.attendance}%</p>
          {/* Additional attendance details could be added here */}
        </div>
      )}
      
      {activeTab === 'issues' && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Reported Issues</h2>
          <p>You have reported {studentData.issues} issues.</p>
          {/* List of issues could be added here */}
        </div>
      )}
    </div>
  );
}