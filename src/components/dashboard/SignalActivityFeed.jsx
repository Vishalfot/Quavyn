import React from "react";
import { Activity } from "lucide-react";

const FEED_ACTIONS = [
  { id: 1, action: "Correlating churn signals", time: "Just now" },
  { id: 2, action: "Updating competitor pricing model", time: "2m ago" },
  { id: 3, action: "Scanning RBI gazette updates", time: "5m ago" },
  { id: 4, action: "Re-evaluating CUET landing pages", time: "12m ago" },
  { id: 5, action: "Processing Mixpanel events", time: "15m ago" },
];

export default function SignalActivityFeed() {
  return (
    <div className="mt-6 px-4">
      <div className="flex items-center gap-2 mb-3 px-2">
        <Activity size={12} className="text-violet-500" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Activity</span>
      </div>
      <div className="space-y-2 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-violet-100">
        {FEED_ACTIONS.map((item, i) => (
          <div key={item.id} className="flex gap-3 relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="w-6 flex flex-col items-center flex-shrink-0 pt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.1)]' : 'bg-slate-300'}`} />
            </div>
            <div className="flex-1 pb-2">
              <div className="text-[11px] text-slate-700 leading-snug">{item.action}</div>
              <div className="text-[9px] text-slate-400">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
