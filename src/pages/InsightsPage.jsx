import React from "react";
import { INSIGHTS } from "../data";
import { useApp } from "../hooks/useApp";
import { SeverityBadge, ConfidenceBar } from "../components/shared/ui";
import { ArrowRight, Filter } from "lucide-react";

export default function InsightsPage() {
  const { openInsight } = useApp();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">All Insights</h1>
            <p className="text-sm text-slate-500">AI-generated strategic intelligence for Learnova</p>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-2 hover:border-violet-300 hover:text-violet-700 transition-all">
            <Filter size={12} /> Filter
          </button>
        </div>

        {/* Insight list */}
        <div className="space-y-4">
          {INSIGHTS.map((ins, i) => (
            <div
              key={ins.id}
              onClick={() => openInsight(ins)}
              className="bg-white rounded-2xl border border-violet-100 shadow-card card-transition p-5 cursor-pointer group animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${ins.severity === "critical" ? "bg-red-400" : "bg-orange-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <SeverityBadge severity={ins.severity} />
                    <span className="text-[10px] text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">{ins.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 group-hover:text-violet-800 transition-colors mb-2">{ins.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{ins.summary}</p>
                  <ConfidenceBar value={ins.confidence} />
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
