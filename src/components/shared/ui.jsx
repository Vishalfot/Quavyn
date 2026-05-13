import React from "react";

// ── Severity Badge ──────────────────────────────────────────
const BADGE_STYLES = {
  critical: "bg-red-100 text-red-700 border-red-200",
  priority: "bg-orange-100 text-orange-700 border-orange-200",
  info:     "bg-blue-100 text-blue-700 border-blue-200",
  success:  "bg-emerald-100 text-emerald-700 border-emerald-200",
};
const BADGE_DOTS = {
  critical: "bg-red-500",
  priority: "bg-orange-400",
  info:     "bg-blue-400",
  success:  "bg-emerald-400",
};
const BADGE_LABELS = { critical: "Critical", priority: "Priority", info: "Info", success: "Resolved" };

export function SeverityBadge({ severity, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-full px-2.5 py-0.5 ${BADGE_STYLES[severity]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${BADGE_DOTS[severity]}`} />
      {BADGE_LABELS[severity]}
    </span>
  );
}

// ── Priority Pill ────────────────────────────────────────────
const PRIORITY_STYLES = {
  P0: "bg-red-600 text-white",
  P1: "bg-orange-500 text-white",
  P2: "bg-slate-200 text-slate-600",
};
export function PriorityPill({ priority }) {
  return (
    <span className={`text-[10px] font-bold rounded px-1.5 py-0.5 ${PRIORITY_STYLES[priority]}`}>{priority}</span>
  );
}

// ── Confidence Bar ───────────────────────────────────────────
export function ConfidenceBar({ value, showLabel = true }) {
  const color = value >= 85 ? "#7c3aed" : value >= 70 ? "#f97316" : "#94a3b8";
  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className="text-[11px] font-semibold" style={{ color }}>{value}%</span>
      )}
      <div className="flex-1 h-1.5 bg-violet-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
      {showLabel && <span className="text-[10px] text-slate-400 font-medium">confidence</span>}
    </div>
  );
}

// ── Status Dot ───────────────────────────────────────────────
export function StatusDot({ status }) {
  if (status === "connected") return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
      <span className="pulse-dot pulse-dot-green w-1.5 h-1.5" />
      Connected
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
      <span className="pulse-dot pulse-dot-yellow w-1.5 h-1.5" />
      Syncing
    </span>
  );
}

// ── Section Header ───────────────────────────────────────────
export function SectionHeader({ label, action, actionLabel }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</span>
      {action && (
        <button onClick={action} className="text-[11px] text-violet-600 font-medium hover:text-violet-800 transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ── Skeleton Loader ──────────────────────────────────────────
export function Skeleton({ className = "" }) {
  return <div className={`shimmer-bg rounded-lg ${className}`} />;
}

// ── Divider ──────────────────────────────────────────────────
export function Divider({ className = "" }) {
  return <div className={`h-px bg-violet-50 ${className}`} />;
}

// ── Source Tag ───────────────────────────────────────────────
export function SourceTag({ name }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 font-medium">
      {name}
    </span>
  );
}

// ── Icon wrappers for lucide ─────────────────────────────────
export function IconBox({ children, className = "" }) {
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}
