import React, { useState } from "react";
import { SectionHeader } from "../components/shared/ui";
import SignalFeed from "../components/dashboard/SignalFeed";
import { SIGNAL_FEED } from "../data";

export default function SignalsPage() {
  const [filter, setFilter] = useState("all");

  const counts = {
    all: SIGNAL_FEED.length,
    critical: SIGNAL_FEED.filter(s => s.severity === "critical").length,
    priority: SIGNAL_FEED.filter(s => s.severity === "priority").length,
    info: SIGNAL_FEED.filter(s => s.severity === "info").length,
  };

  return (
    <div className="p-8 h-full overflow-y-auto w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Live Signals</h1>
        <p className="text-slate-500 text-sm">Real-time intelligence feed from all connected layers.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "critical", "priority", "info"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border
              ${filter === f 
                ? "bg-violet-600 text-white border-violet-600 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
          >
            {f} <span className="opacity-60 ml-1">({counts[f]})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-5">
        <SignalFeed filter={filter} />
      </div>
    </div>
  );
}
