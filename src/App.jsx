// App.js
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PageContainer from './components/PageContainer';

// Import all page components
import DashboardPage from './pages/DashboardPage';
import EquipmentReservationPage from './pages/EquipmentReservationPage';
import IssueReportingPage from './pages/IssueReportingPage';
import EquipmentManualsPage from './pages/EquipmentManualsPage';
import EquipmentIdentificationPage from './pages/EquipmentIdentificationPage';
import ExperimentsPage from './pages/ExperimentsPage';
import ExperimentDetail from './pages/ExperimentDetail'; // New import
import ProfileSettingsPage from './pages/ProfileSettingsPage';

// Import custom fonts
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
`;

export default function LMOSApp() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [experimentId, setExperimentId] = useState(null); // Store experiment ID for detail page

  const navigateTo = (page, id = null) => {
    setActivePage(page);
    setExperimentId(id); // Store ID if navigating to ExperimentDetail
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Equipment Reservation":
        return <EquipmentReservationPage />;
      case "Issue Reporting":
        return <IssueReportingPage />;
      case "Equipment Manuals":
        return <EquipmentManualsPage />;
      case "Equipment Identification":
        return <EquipmentIdentificationPage />;
      case "Experiments":
        return <ExperimentsPage navigateTo={navigateTo} />;
        
      case "ExperimentDetail":
        return <ExperimentDetail experimentId={experimentId} navigateTo={navigateTo} />;
      case "Profile & Settings":
        return <ProfileSettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Add global styles */}
      <style dangerouslySetInnerHTML={{ __html: fontImport }} />
      
      {/* Sidebar Component */}
      <Sidebar activePage={activePage} navigateTo={navigateTo} />

      {/* Main Content */}
      <PageContainer>
        {renderPage()}
      </PageContainer>
    </div>
  );
}