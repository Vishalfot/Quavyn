import React from "react";
import { Activity, Clock } from "lucide-react";
import { SIGNAL_FEED } from "../../data";

const SEVERITY_FEED = [
  "Churn 8.2% ↑", "RBI NACH block", "Competitor pricing −30%",
  "CAC ₹1,840 ↑", "Onboarding 34% ↓", "EdTech regulatory review",
  "CUET demand +34%", "Rupee −2.1%", "Pipeline health 64%",
];

export default function StatusStrip() {
  const criticalCount = SIGNAL_FEED.filter(s => s.severity === "critical").length;
  const priorityCount = SIGNAL_FEED.filter(s => s.severity === "priority").length;
  const infoCount = SIGNAL_FEED.filter(s => s.severity === "info").length;

  return (
    <div className="h-8 bg-white border-t border-violet-100 flex items-center px-5 gap-4 flex-shrink-0 overflow-hidden">
      {/* Live label */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Activity size={11} className="text-violet-500" />
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Live</span>
      </div>

      {/* Signal counts */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-red-600">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{criticalCount} Critical
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-orange-500">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />{priorityCount} Priority
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />{infoCount} Info
        </span>
      </div>

      <div className="w-px h-4 bg-violet-100 flex-shrink-0" />

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-track flex gap-8 whitespace-nowrap">
          {[...SEVERITY_FEED, ...SEVERITY_FEED].map((item, i) => (
            <span key={i} className="text-[11px] text-slate-400 flex-shrink-0">
              <span className="text-violet-400 mr-1">·</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* Last run */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-shrink-0">
        <Clock size={10} />
        <span>Last analysis: <span className="text-slate-600 font-medium">4 min ago</span></span>
      </div>
    </div>
  );
}
