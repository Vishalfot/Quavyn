import React, { useState } from "react";
import { CheckCircle, Clock, Plus, Link2, X } from "lucide-react";

const CORE_INTEGRATIONS = [
  { name: "Razorpay", category: "Payments", status: "connected", desc: "Payment analytics, failure tracking, revenue data" },
  { name: "Zoho CRM", category: "CRM", status: "connected", desc: "Pipeline, deal tracking, customer lifecycle" },
  { name: "Google Analytics 4", category: "Analytics", status: "connected", desc: "Traffic, conversion funnels, organic data" },
  { name: "GitHub", category: "Engineering", status: "connected", desc: "Deployment events, incident correlation" },
  { name: "G2 Reviews", category: "Market Intel", status: "connected", desc: "Competitor sentiment, review trends" },
  { name: "LinkedIn", category: "Market Intel", status: "connected", desc: "Competitor hiring signals, executive moves" },
  { name: "SimilarWeb", category: "Market Intel", status: "syncing", desc: "Traffic benchmarks, channel comparison" },
  { name: "Crunchbase", category: "Funding Intel", status: "syncing", desc: "Competitor funding rounds, investor moves" },
  { name: "Slack", category: "Communication", status: "available", desc: "Push alerts and weekly briefings to Slack" },
  { name: "HubSpot", category: "Marketing", status: "available", desc: "Campaign performance, lead attribution" },
];

const INDIA_INTEGRATIONS = [
  { name: "RBI Gazette", category: "Regulatory Intel", status: "connected", desc: "Financial regulations, compliance mandates" },
  { name: "MCA Portal", category: "Corporate Intel", status: "available", desc: "Company filings, director changes, financials" },
  { name: "NSE / BSE Feeds", category: "Market Data", status: "available", desc: "Live market data, macroeconomic indicators" },
];

const STATUS_STYLES = {
  connected: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={12} /> },
  syncing:   { badge: "bg-amber-50 text-amber-700 border-amber-200",   icon: <Clock size={12} /> },
  available: { badge: "bg-slate-50 text-slate-500 border-slate-200",   icon: <Plus size={12} /> },
};

function IntegrationGrid({ title, items, onConnect }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((int, i) => {
          const s = STATUS_STYLES[int.status];
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-violet-100 p-4 hover:shadow-card transition-all group animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-sm font-bold text-violet-700">
                  {int.name[0]}
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-semibold border rounded-full px-2 py-0.5 ${s.badge}`}>
                  {s.icon}{int.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-800 mb-0.5">{int.name}</div>
              <div className="text-[10px] text-violet-500 font-medium mb-1">{int.category}</div>
              <div className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">{int.desc}</div>
              
              <button 
                onClick={() => onConnect(int.name)}
                className="w-full mt-auto flex items-center justify-center gap-1.5 text-[11px] font-bold text-violet-600 bg-white border border-violet-200 hover:bg-violet-50 hover:border-violet-300 rounded-lg py-2 transition-all">
                <Link2 size={12} /> Connect
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [toast, setToast] = useState(null);

  const handleConnect = (name) => {
    setToast(`${name} connected successfully.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Integrations</h1>
          <p className="text-sm text-slate-500">Data sources powering your intelligence layers</p>
        </div>

        <IntegrationGrid title="India Intelligence" items={INDIA_INTEGRATIONS} onConnect={handleConnect} />
        <IntegrationGrid title="Core Systems & Global Intel" items={CORE_INTEGRATIONS} onConnect={handleConnect} />
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in-up z-50">
          <CheckCircle size={16} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
