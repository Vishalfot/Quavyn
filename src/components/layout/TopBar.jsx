import React from "react";
import { Bell, ChevronDown, MessageSquare, RefreshCw, Zap } from "lucide-react";
import QuavynLogo from "../shared/QuavynLogo";
import { useApp } from "../../hooks/useApp";
import { COMPANY, SIGNAL_FEED } from "../../data";

export default function TopBar() {
  const { openChat, chatOpen, signalsDropdownOpen, toggleSignalsDropdown, setActivePage } = useApp();
  const criticalCount = SIGNAL_FEED.filter(s => s.severity === "critical").length;
  return (
    <header className="h-20 bg-white border-b border-violet-100 flex items-center px-8 gap-4 sticky top-0 z-40 flex-shrink-0">
      {/* Brand / Logo */}
      {/* TO CHANGE LOGO: Replace the QuavynLogo component or text below with an <img src="/your-logo.svg" alt="Logo" className="h-8" /> */}
      <div className="flex items-center gap-3 mr-4">
        <QuavynLogo size={40} />
        <span className="font-bold text-2xl text-violet-900 tracking-tight leading-none">quavyn</span>
      </div>

      <div className="w-px h-5 bg-violet-100" />

      {/* Company */}
      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-violet-50 transition-colors group">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">L</span>
        </div>
        <span className="text-sm font-semibold text-slate-700">{COMPANY.name}</span>
        <span className="text-[10px] text-slate-400 bg-slate-100 rounded px-1 py-0.5 font-medium">{COMPANY.stage}</span>
        <ChevronDown size={12} className="text-slate-400" />
      </button>

      {/* Sync status */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 ml-1">
        <RefreshCw size={11} className="text-emerald-500" />
        <span>Synced {COMPANY.lastSync}</span>
      </div>

      <div className="flex-1" />

      {/* Active signals */}
      <div className="relative">
        <button 
          onClick={toggleSignalsDropdown}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1 hover:bg-red-100 transition-colors"
        >
          <Zap size={11} fill="currentColor" />
          {criticalCount} Critical signals
        </button>

        {signalsDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-violet-100 rounded-xl shadow-xl overflow-hidden animate-fade-in-up z-50">
            <div className="px-3 py-2 border-b border-violet-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Active Critical Signals</span>
              <button onClick={() => { toggleSignalsDropdown(); setActivePage("signals"); }} className="text-[10px] text-violet-600 font-medium hover:underline">View all</button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {SIGNAL_FEED.filter(s => s.severity === "critical").map(s => (
                <div key={s.id} className="px-3 py-2.5 border-b border-violet-50 hover:bg-violet-50/50 cursor-pointer transition-colors" onClick={() => { toggleSignalsDropdown(); setActivePage("signals"); }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-[10px] text-slate-400">{s.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Chat toggle */}
      <button
        onClick={openChat}
        className={`flex items-center gap-1.5 text-[11px] font-medium rounded-full px-3 py-1 border transition-all
          ${chatOpen
            ? "bg-violet-600 text-white border-violet-600 shadow-violet"
            : "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100"
          }`}
      >
        <MessageSquare size={12} />
        Ask Quavyn
      </button>

      {/* Fullscreen toggle */}
      <button 
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.log(err));
          } else {
            document.exitFullscreen().catch(err => console.log(err));
          }
        }}
        className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 transition-colors"
        title="Toggle Fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
        </svg>
      </button>

      {/* Notifications */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 transition-colors">
        <Bell size={16} className="text-slate-500" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>

      {/* Avatar */}
      <button className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-900 flex items-center justify-center text-white text-xs font-bold shadow-sm">
        AR
      </button>
    </header>
  );
}
