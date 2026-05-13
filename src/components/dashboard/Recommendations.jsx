import React from "react";
import { ArrowRight, Target } from "lucide-react";
import { RECOMMENDATIONS } from "../../data";
import { INSIGHTS } from "../../data";
import { useApp } from "../../hooks/useApp";
import { PriorityPill } from "../shared/ui";

export default function Recommendations() {
  const { openInsight } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-violet-100 shadow-card overflow-hidden animate-fade-in-up delay-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-violet-50">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-violet-500" />
          <span className="text-sm font-semibold text-slate-800">Strategic Recommendations</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">
          AI-generated
        </span>
      </div>

      <div className="divide-y divide-violet-50">
        {RECOMMENDATIONS.map((rec, i) => (
          <div
            key={rec.id}
            className="flex items-start gap-3 p-4 hover:bg-violet-50/40 transition-colors cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => {
              const ins = INSIGHTS.find(x => x.id === rec.insightId);
              if (ins) openInsight(ins);
            }}
          >
            <PriorityPill priority={rec.priority} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-800 group-hover:text-violet-800 transition-colors mb-0.5">
                {rec.title}
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed mb-1.5">{rec.description}</div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-violet-600 bg-violet-50 border border-violet-100 rounded px-1.5 py-0.5">
                  {rec.impact}
                </span>
                <span className="text-[10px] text-slate-400">{rec.deadline} · {rec.owner}</span>
              </div>
            </div>
            <ArrowRight size={14} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
