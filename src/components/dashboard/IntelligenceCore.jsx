import React from "react";
import { Activity, Briefcase, DollarSign, LineChart, ShieldAlert, Target } from "lucide-react";
import { SectionHeader } from "../shared/ui";

const ANALYSTS = [
  { id: "business", name: "Business AI", icon: Briefcase, status: "Analysing 340 records", color: "violet" },
  { id: "financial", name: "Finance AI", icon: DollarSign, status: "Projecting Q3 revenue", color: "emerald" },
  { id: "market", name: "Market AI", icon: LineChart, status: "Monitoring 12 competitors", color: "blue" },
  { id: "risk", name: "Risk AI", icon: ShieldAlert, status: "Evaluating regulatory impact", color: "rose" },
  { id: "strategy", name: "Strategy AI", icon: Target, status: "Synthesizing convergence", color: "amber" },
];

const COLOR_MAP = {
  violet: "from-violet-500 to-violet-700 text-violet-700 bg-violet-50 border-violet-200",
  emerald: "from-emerald-500 to-emerald-700 text-emerald-700 bg-emerald-50 border-emerald-200",
  blue: "from-blue-500 to-blue-700 text-blue-700 bg-blue-50 border-blue-200",
  rose: "from-rose-500 to-rose-700 text-rose-700 bg-rose-50 border-rose-200",
  amber: "from-amber-500 to-amber-700 text-amber-700 bg-amber-50 border-amber-200",
};

export default function IntelligenceCore() {
  return (
    <div className="mb-8 relative">
      <SectionHeader label="Intelligence Core" />

      {/* Container with connecting lines coming from the left */}
      <div className="relative bg-white rounded-2xl border border-violet-100 p-6 shadow-card overflow-hidden">

        {/* Animated Background Lines representing connections from the Layers */}
        <svg className="absolute left-0 top-0 w-32 h-full opacity-30 pointer-events-none" viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M 0 50 Q 50 50 100 100" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
          <path d="M 0 100 Q 50 100 100 100" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <path d="M 0 150 Q 50 150 100 100" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        </svg>

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {ANALYSTS.map((analyst, i) => {
            const Icon = analyst.icon;
            const colors = COLOR_MAP[analyst.color];
            return (
              <div
                key={analyst.id}
                className="flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hexagon Node */}
                <div className={`relative w-14 h-16 flex items-center justify-center mb-3 bg-gradient-to-br ${colors.split(' ')[0]} ${colors.split(' ')[1]} shadow-sm`}
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                  <Icon size={18} className="text-white" />

                  {/* Activity pulse ring */}
                  <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded-full" style={{ animationDuration: '2s', animationDelay: `${i * 0.3}s` }}></div>
                </div>

                <div className="text-[11px] font-bold text-slate-800 leading-tight mb-1">{analyst.name}</div>
                <div className="text-[9px] text-slate-500 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 w-full truncate">
                  <Activity size={8} className="inline mr-1 text-violet-400" />
                  {analyst.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
