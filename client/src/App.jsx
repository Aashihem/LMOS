// App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PageContainer from './components/PageContainer';
import './index.css';

// Import all page components
import DashboardPage from './pages/DashboardPage';
import EquipmentReservationPage from './pages/EquipmentReservationPage';
import IssueReportingPage from './pages/IssueReportingPage';
import EquipmentManualsPage from './pages/EquipmentManualsPage';
import EquipmentIdentificationPage from './pages/EquipmentIdentificationPage';
import ExperimentsPage from './pages/ExperimentsPage';
import ExperimentDetail from './pages/ExperimentDetail';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import FacultyDashboard from './pages/FacultyDashboard';

// Import custom fonts
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
`;

export default function LMOSApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [experimentId, setExperimentId] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserType = localStorage.getItem('userType');
    setIsLoggedIn(loggedInStatus);
    setUserType(storedUserType);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserType(localStorage.getItem('userType'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
  };

  const navigateTo = (page, id = null) => {
    setActivePage(page);
    setExperimentId(id);
  };
  
  const renderStudentPage = () => {
    switch (activePage) {
      case "Dashboard": return <DashboardPage />;
      case "Equipment Reservation": return <EquipmentReservationPage />;
      case "Issue Reporting": return <IssueReportingPage />;
      case "Equipment Manuals": return <EquipmentManualsPage />;
      case "Equipment Identification": return <EquipmentIdentificationPage />;
      case "Experiments": return <ExperimentsPage navigateTo={navigateTo} />;
      case "ExperimentDetail": return <ExperimentDetail experimentId={experimentId} navigateTo={navigateTo} />;
      case "Profile & Settings": return <ProfileSettingsPage />;
      default: return <Navigate to="/dashboard" />;
    }
  };
  
  return (
    <Router>
      <div className="flex h-screen bg-[#0f172a]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <style dangerouslySetInnerHTML={{ __html: fontImport }} />

        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          <Route
            path="/*"
            element={
              !isLoggedIn ? (
                <Navigate to="/login" />
              ) : userType === 'Faculty' ? (
                <Navigate to="/faculty-dashboard" />
              ) : (
                <>
                  <Sidebar activePage={activePage} navigateTo={navigateTo} onLogout={handleLogout} />
                  <PageContainer>
                    {renderStudentPage()}
                  </PageContainer>
                </>
              )
            }
          />
          
          <Route
            path="/faculty-dashboard"
            element={
              !isLoggedIn ? (
                   <Navigate to="/login" />
              ) : userType === 'Student' ? ( // Corrected case for robustness
                   <Navigate to="/dashboard" />
              ) : (
                <FacultyDashboard onLogout={handleLogout} />
              )
            }
          />

        </Routes>
      </div>
    </Router>
  );
}