// pages/ProfileSettingsPage.js
import { useState, useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ExperimentMarks from '../components/profile/ExperimentMarks';

export default function ProfileSettingsPage() {
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState('marks');
  const [attendanceByMonth, setAttendanceByMonth] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          console.error('Username is null or undefined');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/profile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setStudentData({
            ...data,
            experimentMarks: [
              { id: 1, name: 'Experiment 1', marks: 85 },
              { id: 2, name: 'Experiment 2', marks: 90 },
              { id: 3, name: 'Experiment 3', marks: 88 },
              { id: 4, name: 'Experiment 4', marks: 92 },
              { id: 5, name: 'Experiment 5', marks: 87 },
              { id: 6, name: 'Experiment 6', marks: 91 },
              { id: 7, name: 'Experiment 7', marks: 89 },
              { id: 8, name: 'Experiment 8', marks: 93 },
              { id: 9, name: 'Experiment 9', marks: 90 },
              { id: 10, name: 'Experiment 10', marks: 94 },
            ],
            issues: [
              { id: 1, description: 'Lab equipment malfunction', status: 'Resolved' },
              { id: 2, description: 'Experiment instructions unclear', status: 'Pending' },
            ],
          });

          const attendanceResponse = await fetch(`http://127.0.0.1:8000/attendance/${data.uid}`);
          if (attendanceResponse.ok) {
            const attendanceData = await attendanceResponse.json();
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

  const groupAttendanceByMonth = (attendanceDates) => {
    const labDays = ['Monday', 'Tuesday', 'Thursday'];
    const months = ['November', 'December', 'January'];
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
          status: 'Present',
        });
      }
    });

    months.forEach((month) => {
      const firstDay = new Date(`${month === 'January' ? '2026' : '2025'}-${month === 'November' ? '11' : month === 'December' ? '12' : '01'}-01`);
      const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

      for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
        const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
        if (labDays.includes(dayName)) {
          const dateString = d.toISOString().split('T')[0];
          if (!grouped[month].some((session) => session.date === dateString)) {
            grouped[month].push({
              date: dateString,
              status: 'Absent',
            });
          }
        }
      }

      grouped[month].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return grouped;
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

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
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <ProfileHeader name={studentData.name} uid={studentData.uid} />
        <ProfileStats
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          attendance={
            Object.values(attendanceByMonth).flat().some((session) => session.status === 'Present')
              ? 'Present Today'
              : 'Absent Today'
          }
          issues={studentData.issues.length}
        />

        {activeTab === 'marks' && (
          <ExperimentMarks experiments={studentData.experimentMarks} />
        )}

        {activeTab === 'attendance' && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Attendance Details
            </h2>
            {Object.entries(attendanceByMonth).map(([month, sessions]) => (
              <div key={month} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
                  {month}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {sessions.map((session) => (
                    <div
                      key={session.date}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        textAlign: 'center',
                        backgroundColor: session.status === 'Present' ? '#10b981' : '#ef4444',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <p style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        {new Date(session.date).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: '0.75rem' }}>{session.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'issues' && (
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Reported Issues
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {studentData.issues.map((issue) => (
                <li
                  key={issue.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    backgroundColor: '#1e293b',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>{issue.description}</p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: issue.status === 'Resolved' ? '#10b981' : '#facc15',
                      marginTop: '0.5rem',
                    }}
                  >
                    Status: {issue.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}