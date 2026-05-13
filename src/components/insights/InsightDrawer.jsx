import React, { useState } from "react";
import { X, ArrowRight, ChevronRight, MessageSquare } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import { SeverityBadge, ConfidenceBar, PriorityPill, SourceTag } from "../shared/ui";
import { ANALYST_PIPELINE } from "../../data";

const TIMELINE_COLORS = {
  external: { dot: "bg-amber-400", line: "bg-amber-200", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  market:   { dot: "bg-blue-400",  line: "bg-blue-200",  badge: "bg-blue-50 text-blue-700 border-blue-200"   },
  internal: { dot: "bg-violet-400",line: "bg-violet-200",badge: "bg-violet-50 text-violet-700 border-violet-200"},
  risk:     { dot: "bg-red-400",   line: "bg-red-200",   badge: "bg-red-50 text-red-700 border-red-200"      },
  action:   { dot: "bg-violet-700",line: "bg-violet-300",badge: "bg-violet-900 text-white border-violet-700" },
};

function AnalystPipeline({ insight }) {
  const analystKeys = Object.keys(insight.analystReasons || {});

  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Analyst Reasoning Pipeline</h4>

      {/* Pipeline visualization */}
      <div className="bg-gradient-to-br from-ink to-violet-900 rounded-2xl p-5 mb-3 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>

        {/* Analysts */}
        <div className="flex flex-col gap-3 mb-5 relative z-10">
          {ANALYST_PIPELINE.map((analyst, i) => {
            const finding = insight.analystReasons?.[analyst.id] || "Monitoring nominal parameters.";
            return (
              <div
                key={analyst.id}
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`inline-flex text-[10px] font-bold px-2 py-1 rounded ${analyst.textColor} ${analyst.bgLight}`}>
                    {analyst.label}
                  </div>
                  <div className={`text-[10px] font-bold ${analyst.textColor || "text-white"} bg-white/10 px-2 py-1 rounded`}>
                    {analyst.confidence}% confidence
                  </div>
                </div>
                <div className="text-xs font-medium text-white/60 mb-1">{analyst.role}</div>
                <p className="text-sm text-white/90 leading-relaxed">{finding}</p>
              </div>
            );
          })}
        </div>

        {/* Connector arrows → Decision Engine */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="flex-1 h-px bg-violet-400/30" />
          <div className="text-violet-300 text-[10px] uppercase tracking-wider font-bold">Signals Converged</div>
          <div className="flex-1 h-px bg-violet-400/30" />
        </div>

        {/* Decision engine */}
        <div className="bg-violet-600/40 border border-violet-400/40 rounded-xl px-5 py-4 text-center relative z-10">
          <div className="text-[10px] font-bold text-violet-200 uppercase tracking-wider mb-2">Quavyn Decision Engine</div>
          <div className="text-sm font-semibold text-white leading-relaxed mb-3">{insight.aiReasoning || insight.summary}</div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-32"><ConfidenceBar value={insight.confidence} showLabel={false} /></div>
            <span className="text-sm font-bold text-white">{insight.confidence}% Overall Confidence</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Signal Timeline</h4>
      <div className="relative pl-4">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-violet-100" />
        <div className="space-y-3">
          {items.map((item, i) => {
            const colors = TIMELINE_COLORS[item.type] || TIMELINE_COLORS.internal;
            return (
              <div key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-white flex-shrink-0 mt-0.5 relative z-10 ${colors.dot}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-bold border rounded-full px-1.5 py-0.5 ${colors.badge}`}>{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-700">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CauseSection({ title, causes, color }) {
  const styles = {
    internal: { header: "text-blue-700 bg-blue-50 border-blue-200",   dot: "bg-blue-400" },
    market:   { header: "text-orange-700 bg-orange-50 border-orange-200", dot: "bg-orange-400" },
    external: { header: "text-amber-700 bg-amber-50 border-amber-200", dot: "bg-amber-400" },
  };
  const s = styles[color];
  return (
    <div className="mb-4">
      <div className={`inline-flex text-[11px] font-semibold border rounded-lg px-2.5 py-1 mb-2 ${s.header}`}>
        {title}
      </div>
      <div className="space-y-1.5">
        {causes.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
            <span className="text-xs text-slate-600 leading-relaxed">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsightDrawer() {
  const { activeInsight, closeInsight, openChat } = useApp();
  const [tab, setTab] = useState("overview");

  if (!activeInsight) return null;
  const ins = activeInsight;

  const TABS = ["overview", "causes", "timeline", "actions"];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop z-40 animate-fade-in"
        onClick={closeInsight}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[520px] bg-white shadow-drawer z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-start gap-3 px-5 py-4 border-b border-violet-100 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <SeverityBadge severity={ins.severity} />
              <span className="text-[10px] text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">{ins.category}</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 leading-snug mb-3">{ins.title}</h2>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Owner:</span>
                <span className="font-semibold text-violet-700">{ins.assignedOwner || 'Unassigned'} ({ins.assignedTeam})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Impact:</span>
                <span className="font-semibold text-emerald-600">{ins.expectedImpact}</span>
              </div>
            </div>
          </div>
          <button onClick={closeInsight} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-violet-50 text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0">
            <X size={15} />
          </button>
        </div>

        {/* Confidence */}
        <div className="px-5 py-3 bg-violet-50/60 border-b border-violet-100 flex-shrink-0">
          <ConfidenceBar value={ins.confidence} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 py-2 border-b border-violet-100 flex-shrink-0">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[11px] font-semibold capitalize px-3 py-1.5 rounded-lg transition-all
                ${tab === t ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {tab === "overview" && (
            <div className="animate-fade-in">
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{ins.summary}</p>
              <AnalystPipeline insight={ins} />
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
                <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-2">AI Reasoning</div>
                <p className="text-xs text-slate-700 leading-relaxed">{ins.aiReasoning}</p>
              </div>
            </div>
          )}

          {tab === "causes" && (
            <div className="animate-fade-in">
              <CauseSection title="⚙ Internal Causes" causes={ins.internalCauses} color="internal" />
              <CauseSection title="📊 Market Causes" causes={ins.marketCauses} color="market" />
              <CauseSection title="🌐 External Causes" causes={ins.externalCauses} color="external" />
            </div>
          )}

          {tab === "timeline" && (
            <div className="animate-fade-in">
              <Timeline items={ins.timeline} />
            </div>
          )}

          {tab === "actions" && (
            <div className="animate-fade-in">
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">Recommended actions ranked by urgency and estimated impact.</p>
              <div className="space-y-3">
                {ins.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-violet-100 rounded-xl p-3.5 hover:border-violet-300 hover:shadow-card transition-all">
                    <PriorityPill priority={action.priority} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-800 mb-1">{action.label}</div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>⏱ {action.effort}</span>
                        <span>👤 {action.owner}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-violet-100 flex items-center gap-2 flex-shrink-0 bg-white">
          <button
            onClick={() => { closeInsight(); openChat(ins); }}
            className="flex items-center gap-2 text-[12px] font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-xl px-4 py-2.5 transition-all flex-1 justify-center"
          >
            <MessageSquare size={13} />
            Investigate deeper with AI
          </button>
          <button
            onClick={closeInsight}
            className="text-[12px] font-medium text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-2.5 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
