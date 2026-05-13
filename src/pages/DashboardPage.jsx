import React from "react";
import MetricsBar from "../components/dashboard/MetricsBar";
import SignalFeed from "../components/dashboard/SignalFeed";
import InsightCards from "../components/dashboard/InsightCards";
import Recommendations from "../components/dashboard/Recommendations";
import IntelligenceLayers from "../components/dashboard/IntelligenceLayers";
import IntelligenceCore from "../components/dashboard/IntelligenceCore";
import SignalActivityFeed from "../components/dashboard/SignalActivityFeed";
import { SectionHeader } from "../components/shared/ui";
import { Brain } from "lucide-react";
import { useApp } from "../hooks/useApp";

function ExecutiveSummary() {
  const { openChat } = useApp();
  return (
    <div className="bg-gradient-to-br from-violet-900 via-violet-800 to-ink rounded-2xl p-5 mb-6 relative overflow-hidden animate-fade-in-up">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100"><circle cx="80" cy="20" r="60" fill="white"/></svg>
      </div>
      <div className="absolute bottom-0 left-20 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="80" r="50" fill="white"/></svg>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain size={14} className="text-violet-300" />
              <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider">Executive Briefing · Today</span>
            </div>
            <h1 className="text-lg font-bold text-white leading-tight">
              Learnova is facing a <span className="text-red-300">critical retention risk</span> requiring immediate action.
            </h1>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-2xl font-bold text-white">91%</div>
            <div className="text-[10px] text-violet-300">Signal confidence</div>
          </div>
        </div>

        <p className="text-sm text-violet-200 leading-relaxed mb-4 max-w-xl">
          Three converging signals — payment regulation, competitor pricing, and onboarding friction — are compounding into accelerated enterprise churn. Projected 3.2% additional churn in 7 days if unresolved.
        </p>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="text-[11px] font-semibold text-red-300 bg-red-500/20 border border-red-400/30 rounded-full px-2.5 py-1">
              🔴 Fix payments P0
            </span>
            <span className="text-[11px] font-semibold text-orange-300 bg-orange-500/20 border border-orange-400/30 rounded-full px-2.5 py-1">
              🟠 Retention campaign P1
            </span>
          </div>
          <button
            onClick={openChat}
            className="ml-auto text-[11px] font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg px-3 py-1.5 transition-all"
          >
            Ask AI about this →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex w-full h-full">
      {/* Left column: Intelligence layers (30%) */}
      <div className="w-[30%] flex-shrink-0 overflow-y-auto border-r border-violet-100 bg-white/50 pb-6 flex flex-col">
        <div className="py-6 px-6 w-full flex-1">
          <IntelligenceLayers />
        </div>
        <SignalActivityFeed />
      </div>

      {/* Center: Main content (70%) */}
      <div className="w-[70%] overflow-y-auto">
        <div className="py-6 px-8 w-full max-w-none">
          <ExecutiveSummary />
          <MetricsBar />

          <IntelligenceCore />

          <div className="mt-8">
            <SectionHeader label="Strategic Insights" actionLabel="View all" />
            <div className="w-full">
              <InsightCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
