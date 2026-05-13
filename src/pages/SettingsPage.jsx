import React, { useState } from "react";
import { Settings, Building, Bell, Brain, Users, CreditCard, ToggleLeft, ToggleRight } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [toggles, setToggles] = useState({ slack: true, email: false, aiChat: true, autoEscalate: false });

  const toggle = (id) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  const TABS = [
    { id: "company", label: "Company Profile", icon: Building },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "ai", label: "AI Analyst Configuration", icon: Brain },
    { id: "team", label: "Team Members", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="flex-1 overflow-y-auto h-full p-8 max-w-6xl mx-auto flex gap-8">
      {/* Settings Sidebar */}
      <div className="w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Settings size={24} className="text-violet-600" /> Settings
        </h1>
        <div className="space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 max-w-2xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {activeTab === "company" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Company Profile</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Name</label>
                  <input type="text" defaultValue="Learnova" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Industry / Sector</label>
                  <input type="text" defaultValue="EdTech" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Stage</label>
                  <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 transition-colors">
                    <option>Seed</option>
                    <option selected>Series A</option>
                    <option>Series B</option>
                    <option>Enterprise</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Slack Alerts</div>
                    <div className="text-xs text-slate-500">Receive critical insights in #executive-alerts</div>
                  </div>
                  <button onClick={() => toggle("slack")} className="text-violet-600">
                    {toggles.slack ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-300" />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Email Digest</div>
                    <div className="text-xs text-slate-500">Daily morning summary of active priority signals</div>
                  </div>
                  <button onClick={() => toggle("email")} className="text-violet-600">
                    {toggles.email ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-300" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">AI Analyst Configuration</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Contextual Chat Assistant</div>
                    <div className="text-xs text-slate-500">Allow AI to access insight data for deep investigations</div>
                  </div>
                  <button onClick={() => toggle("aiChat")} className="text-violet-600">
                    {toggles.aiChat ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-300" />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Auto-Escalation Engine</div>
                    <div className="text-xs text-slate-500">Automatically tag team leads when confidence greater than 90%</div>
                  </div>
                  <button onClick={() => toggle("autoEscalate")} className="text-violet-600">
                    {toggles.autoEscalate ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-slate-300" />}
                  </button>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Alert Confidence Threshold</label>
                  <input type="range" min="50" max="95" defaultValue="80" className="w-full accent-violet-600" />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Noisy (50%)</span>
                    <span>Actionable (80%)</span>
                    <span>Strict (95%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for Team and Billing */}
          {activeTab === "team" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Team Members</h2>
              <p className="text-sm text-slate-500 mb-4">Manage executive access and roles.</p>
              <button className="px-4 py-2 bg-violet-50 text-violet-700 text-sm font-semibold rounded-lg hover:bg-violet-100 transition-colors">
                + Invite Member
              </button>
            </div>
          )}
          {activeTab === "billing" && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Billing & Plan</h2>
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 mb-4">
                <div className="text-xs font-bold text-violet-600 uppercase mb-1">Current Plan</div>
                <div className="text-lg font-bold text-slate-900">Executive OS Pro</div>
                <div className="text-sm text-slate-600 mt-1">Next invoice on May 1st for $299.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
