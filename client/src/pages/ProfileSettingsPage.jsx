// pages/ProfileSettingsPage.js
import { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ExperimentMarks from '../components/profile/ExperimentMarks';

export default function ProfileSettingsPage() {
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState('marks');
  const [attendanceByMonth, setAttendanceByMonth] = useState({}); // State for grouped attendance

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username'); // Retrieve username from localStorage
        console.log('Username from localStorage:', username);

        if (!username) {
          console.error('Username is null or undefined');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/profile/${username}`);
        if (response.ok) {
          const data = await response.json();

          console.log('Profile data:', data);
          setStudentData({
            ...data,
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
            issues: [
              { id: 1, description: "Lab equipment malfunction", status: "Resolved" },
              { id: 2, description: "Experiment instructions unclear", status: "Pending" }
            ]
          });

          // Fetch attendance data
          const attendanceResponse = await fetch(`http://127.0.0.1:8000/attendance/${data.uid}`);
          if (attendanceResponse.ok) {
            const attendanceData = await attendanceResponse.json();
            console.log('Attendance data:', attendanceData);

            // Process attendance data into a monthly format
            const groupedAttendance = groupAttendanceByMonth(attendanceData.attendance_dates);
            setAttendanceByMonth(groupedAttendance);
          } else {
            console.error('Failed to fetch attendance data');
          }
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  // Helper function to group attendance by month
  const groupAttendanceByMonth = (attendanceDates) => {
    const labDays = ['Monday', 'Wednesday', 'Thursday'];
    const months = ['April', 'May', 'June'];
    const grouped = {};

    months.forEach((month) => {
      grouped[month] = [];
    });

    attendanceDates.forEach((dateString) => {
      const date = new Date(dateString);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });

      if (labDays.includes(dayName) && months.includes(monthName)) {
        grouped[monthName].push({
          date: date.toISOString().split('T')[0],
          status: 'Present'
        });
      }
    });

    // Fill in absent days for lab days without attendance
    months.forEach((month) => {
      const firstDay = new Date(`2025-${month === 'April' ? '04' : month === 'May' ? '05' : '06'}-01`);
      const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

      for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
        if (labDays.includes(dayName)) {
          const dateString = d.toISOString().split('T')[0];
          if (!grouped[month].some((session) => session.date === dateString)) {
            grouped[month].push({
              date: dateString,
              status: 'Absent'
            });
          }
        }
      }

      // Sort by date
      grouped[month].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return grouped;
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto text-white">
      <ProfileHeader name={studentData.name} uid={studentData.uid} />
      <ProfileStats 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        attendance={
          Object.values(attendanceByMonth).flat().some((session) => session.status === 'Present')
            ? "Present Today"
            : "Absent Today"
        }
        issues={studentData.issues.length}
      />
      
      {activeTab === 'marks' && (
        <ExperimentMarks experiments={studentData.experimentMarks} />
      )}
      
      {activeTab === 'attendance' && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Attendance Details</h2>
          {Object.entries(attendanceByMonth).map(([month, sessions]) => (
            <div key={month} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{month}</h3>
              <div className="grid grid-cols-4 gap-4">
                {sessions.map((session) => (
                  <div
                    key={session.date}
                    className={`p-4 rounded text-center ${
                      session.status === "Present"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <p className="text-sm">{new Date(session.date).toLocaleDateString()}</p>
                    <p className="text-xs">{session.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'issues' && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Reported Issues</h2>
          <ul className="space-y-4">
            {studentData.issues.map((issue) => (
              <li key={issue.id} className="p-4 bg-gray-800 rounded">
                <p className="text-lg font-semibold">{issue.description}</p>
                <p className={`mt-2 ${issue.status === "Resolved" ? "text-green-500" : "text-yellow-500"}`}>
                  Status: {issue.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}