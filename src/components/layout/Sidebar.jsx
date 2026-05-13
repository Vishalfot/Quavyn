import React from "react";
import {
  LayoutDashboard, Lightbulb, AlertTriangle, MessageSquare,
  Plug, Settings, Activity, Zap, Users, Search
} from "lucide-react";
import { useApp } from "../../hooks/useApp";

const NAV_ITEMS = [
  { id: "dashboard",      icon: LayoutDashboard, label: "Dashboard"    },
  { id: "insights",       icon: Lightbulb,       label: "Insights"     },
  { id: "signals",        icon: Zap,             label: "Signals"      },
  { id: "alerts",         icon: AlertTriangle,   label: "Alerts History"},
  { id: "teams",          icon: Users,           label: "Teams"        },
  { id: "investigations", icon: Search,          label: "Investigations"},
  { id: "integrations",   icon: Plug,            label: "Integrations" },
  { id: "settings",       icon: Settings,        label: "Settings"     },
];

export default function Sidebar() {
  const { activePage, setActivePage } = useApp();

  return (
    <aside className="w-[60px] bg-white border-r border-violet-100 flex flex-col items-center py-3 gap-1 flex-shrink-0">
      {/* Brand indicator */}
      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 mb-3" />

      {NAV_ITEMS.map((item) => {
        const active = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            title={item.label}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 group
              ${active
                ? "bg-violet-600 text-white shadow-violet"
                : "text-slate-400 hover:bg-violet-50 hover:text-violet-600"
              }`}
          >
            {item.id === "alerts" && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
            <item.icon size={17} />
            {/* Tooltip */}
            <span className="absolute left-[46px] bg-ink text-white text-[11px] font-medium rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </span>
          </button>
        );
      })}

      <div className="flex-1" />

      {/* Live activity indicator */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-emerald-500 breathe" title="All systems active">
        <Activity size={15} />
      </div>
    </aside>
  );
}
