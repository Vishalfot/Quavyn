import React from "react";
import { AppProvider, useApp } from "./hooks/useApp";
import TopBar from "./components/layout/TopBar";
import Sidebar from "./components/layout/Sidebar";
import StatusStrip from "./components/layout/StatusStrip";
import InsightDrawer from "./components/insights/InsightDrawer";
import ChatPanel from "./components/chat/ChatPanel";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";
import AlertsPage from "./pages/AlertsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import SettingsPage from "./pages/SettingsPage";
import SignalsPage from "./pages/SignalsPage";
import TeamsPage from "./pages/TeamsPage";
import InvestigationsPage from "./pages/InvestigationsPage";

function AppContent() {
  const { activePage, chatOpen } = useApp();

  const PAGE_MAP = {
    dashboard:      <DashboardPage />,
    insights:       <InsightsPage />,
    signals:        <SignalsPage />,
    teams:          <TeamsPage />,
    investigations: <InvestigationsPage />,
    alerts:         <AlertsPage />,
    integrations:   <IntegrationsPage />,
    settings:       <SettingsPage />,
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-violet-50/60">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main content — shrinks when chat is open */}
        <main
          className="flex-1 overflow-hidden flex flex-col transition-all duration-300"
          style={{ marginRight: chatOpen ? "380px" : "0" }}
        >
          {PAGE_MAP[activePage] || <DashboardPage />}
        </main>
      </div>

      <StatusStrip />

      {/* Overlays */}
      <InsightDrawer />
      <ChatPanel />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
