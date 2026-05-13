import React from "react";
import { ArrowRight, Clock, ShieldAlert, Target, User, Zap, MessageSquare } from "lucide-react";
import { INSIGHTS } from "../../data";
import { useApp } from "../../hooks/useApp";
import { SeverityBadge, ConfidenceBar } from "../shared/ui";

function InsightCard({ insight, delay }) {
  const { openInsight, openChat } = useApp();

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card transition-all mb-5 overflow-hidden group flex flex-col"
      style={{ animationDelay: delay }}
    >
      {/* Top Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <SeverityBadge severity={insight.severity} />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{insight.category}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-violet-700 transition-colors">
            {insight.title}
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <ConfidenceBar value={insight.confidence} />
        </div>
      </div>

      <div className="p-5 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Context */}
        <div>
          <div className="mb-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">What Changed</div>
            <p className="text-sm text-slate-700 leading-relaxed">{insight.summary}</p>
          </div>

          <div className="mb-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Why This Matters</div>
            <p className="text-sm text-slate-600 italic bg-slate-50 border-l-2 border-violet-400 pl-3 py-1">
              "{insight.whyItMatters || 'Requires executive attention to prevent negative impact on quarterly metrics.'}"
            </p>
          </div>

          <div className="mb-4">
            <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-1">AI Reasoning Engine</div>
            <p className="text-xs text-slate-600 line-clamp-3">{insight.aiReasoning}</p>
          </div>
        </div>

        {/* Right Column: Action & Collaboration */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
          <div className="mb-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Target size={12}/> Recommended Action
            </div>
            <div className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm">
              {insight.actions[0]?.label || 'Investigate further'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
            <div className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
              <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Expected Impact</div>
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Zap size={11} fill="currentColor"/>
                {insight.expectedImpact || 'Improves primary metrics'}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
              <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Assigned Team</div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[9px] font-bold">
                  {insight.assignedOwner?.substring(0,2).toUpperCase() || 'AI'}
                </div>
                <div className="text-xs font-semibold text-slate-700 truncate">{insight.assignedOwner || 'Unassigned'}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-slate-200 flex-wrap">
            <button onClick={() => alert("Reassigning to a different team...")} className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1.5 transition-colors">
              Reassign
            </button>
            <button onClick={() => alert("Setting priority level...")} className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1.5 transition-colors">
              Set Priority
            </button>
            <button onClick={() => alert("Marked as investigating.")} className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1.5 transition-colors">
              Mark Investigating
            </button>
            <button onClick={() => alert("Opening note editor...")} className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1.5 transition-colors">
              Send Note
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="px-5 py-4 border-t border-slate-100 bg-white flex flex-col gap-2.5">
        <button 
          onClick={() => openInsight(insight)}
          className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl px-4 py-3 transition-colors shadow-sm"
        >
          Deep Investigate <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => openChat(insight)}
          className="w-full flex items-center justify-center gap-2 text-sm font-bold text-violet-600 bg-white border border-violet-200 hover:border-violet-600 hover:bg-violet-50 rounded-xl px-4 py-3 transition-colors"
        >
          <MessageSquare size={14} /> Ask AI
        </button>
      </div>
    </div>
  );
}

export default function InsightCards() {
  return (
    <div className="w-full">
      {INSIGHTS.map((ins, i) => (
        <InsightCard key={ins.id} insight={ins} delay={`${i * 100}ms`} />
      ))}
    </div>
  );
}
