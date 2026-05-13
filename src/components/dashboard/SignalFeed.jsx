import React, { useState } from "react";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import { SIGNAL_FEED } from "../../data";
import { SeverityBadge } from "../shared/ui";

const SEV_BORDER = {
  critical: "border-l-red-400",
  priority: "border-l-orange-400",
  info:     "border-l-blue-300",
};
const SEV_BG = {
  critical: "bg-red-50/60",
  priority: "bg-orange-50/40",
  info:     "bg-white",
};

export default function SignalFeed() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? SIGNAL_FEED : SIGNAL_FEED.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-violet-100 overflow-hidden shadow-card animate-fade-in-up delay-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-violet-50">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-violet-500" fill="#8b5cf6" />
          <span className="text-sm font-semibold text-slate-800">Live Signal Feed</span>
          <span className="text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-full px-2 py-0.5">
            {SIGNAL_FEED.length} active
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-violet-600 font-medium flex items-center gap-1 hover:text-violet-800 transition-colors"
        >
          {expanded ? "Collapse" : "Show all"}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Feed items */}
      <div>
        {visible.map((signal, i) => (
          <div
            key={signal.id}
            className={`flex items-start gap-3 px-4 py-3 border-l-2 border-b border-b-violet-50 last:border-b-0 transition-all duration-150 hover:brightness-98 cursor-default
              ${SEV_BORDER[signal.severity]} ${SEV_BG[signal.severity]}
              animate-fade-in-up`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <SeverityBadge severity={signal.severity} className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{signal.text}</p>
              <span className="text-[10px] text-slate-400">{signal.source}</span>
            </div>
            <span className="text-[10px] text-slate-400 flex-shrink-0 mt-0.5">{signal.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
