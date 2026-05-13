import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState(null);       // context for AI chat
  const [activeInsight, setActiveInsight] = useState(null);   // insight detail drawer
  const [activeMetric, setActiveMetric] = useState(null);     // metric investigation panel
  const [expandedLayers, setExpandedLayers] = useState({ internal: true, market: true, external: false });
  const [signalsDropdownOpen, setSignalsDropdownOpen] = useState(false);

  const openInsight = (insight) => setActiveInsight(insight);
  const closeInsight = () => setActiveInsight(null);
  const openMetric = (metric) => setActiveMetric(metric);
  const closeMetric = () => setActiveMetric(null);
  const toggleLayer = (id) => setExpandedLayers(p => ({ ...p, [id]: !p[id] }));
  
  const openChat = (context = null) => {
    setChatContext(context);
    setChatOpen(true);
  };
  const closeChat = () => {
    setChatOpen(false);
    setChatContext(null);
  };

  const toggleSignalsDropdown = () => setSignalsDropdownOpen(!signalsDropdownOpen);

  return (
    <AppContext.Provider value={{
      activePage, setActivePage,
      chatOpen, chatContext, openChat, closeChat,
      activeInsight, openInsight, closeInsight,
      activeMetric, openMetric, closeMetric,
      expandedLayers, toggleLayer,
      signalsDropdownOpen, setSignalsDropdownOpen, toggleSignalsDropdown
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
