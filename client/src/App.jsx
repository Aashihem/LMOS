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
import ExperimentsPage from './pages/LabPage';
import ExperimentDetail from './pages/ExperimentDetail';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import LoginPage from './pages/LoginPage';

// Import all Faculty-specific pages
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyEquipmentManagementPage from './pages/FacultyEquipmentManagementPage';
import FacultyIssueHandlingPage from './pages/FacultyIssueHandlingPage';
// REMOVED: import FacultyExperimentsManagementPage from './pages/FacultyExperimentsManagementPage';
import FacultyStudentMonitoringPage from './pages/FacultyStudentMonitoringPage';
import FacultyReportsAnalyticsPage from './pages/FacultyReportsAnalyticsPage';
import FacultyProfileSettingsPage from './pages/FacultyProfileSettingsPage';
import FacultySubmissionsPage from './pages/FacultySubmissionsPage';
import FacultyManageBatchesPage from './pages/FacultyManageBatchesPage'; // <-- IMPORT the new page

// Import custom fonts
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
`;

export default function LMOSApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [activePage, setActivePage] = useState("Dashboard");
    const [experimentId, setExperimentId] = useState(null);

    // First load → check localStorage
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
        localStorage.clear();
        window.location.href = '/login';
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
            case "Lab Submissions": return <ExperimentsPage navigateTo={navigateTo} />; // UPDATED Name
            case "ExperimentDetail": return <ExperimentDetail experimentId={experimentId} navigateTo={navigateTo} />;
            case "Profile & Settings": return <ProfileSettingsPage />;
            default: return <DashboardPage />;
        }
    };
    
    const renderFacultyPage = () => {
        switch (activePage) {
            case "Dashboard": return <FacultyDashboard />;
            case "Equipment Management": return <FacultyEquipmentManagementPage />;
            case "Issue Handling": return <FacultyIssueHandlingPage />;
            // REMOVED: case "Experiments Management": return <FacultyExperimentsManagementPage navigateTo={navigateTo} />;
            case "Manage Batches": return <FacultyManageBatchesPage />; // This page now handles experiment management
            case "Submissions": return <FacultySubmissionsPage experimentId={experimentId} navigateTo={navigateTo} />;
            case "Student Monitoring": return <FacultyStudentMonitoringPage />;
            case "Reports & Analytics": return <FacultyReportsAnalyticsPage />;
            case "Profile & Settings": return <FacultyProfileSettingsPage />;
            default: return <FacultyDashboard />;
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
                            ) : (
                                <div className="flex h-screen w-full">
                                    <Sidebar
                                        activePage={activePage}
                                        navigateTo={navigateTo}
                                        onLogout={handleLogout}
                                        userType={userType}
                                    />
                                    <PageContainer>
                                        {userType === 'faculty' ? renderFacultyPage() : renderStudentPage()}
                                    </PageContainer>
                                </div>
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}