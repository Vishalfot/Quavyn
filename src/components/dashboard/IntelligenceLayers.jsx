import React from "react";
import { Database, TrendingUp, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { INTELLIGENCE_LAYERS } from "../../data";
import { useApp } from "../../hooks/useApp";
import { StatusDot, SourceTag, SectionHeader } from "../shared/ui";

const ICONS = { database: Database, "trending-up": TrendingUp, globe: Globe };

export default function IntelligenceLayers() {
  const { expandedLayers, toggleLayer } = useApp();

  return (
    <div className="space-y-3">
      <SectionHeader label="Intelligence Layers" />
      {INTELLIGENCE_LAYERS.map((layer, li) => {
        const Icon = ICONS[layer.icon];
        const open = expandedLayers[layer.id];
        return (
          <div
            key={layer.id}
            className="bg-white rounded-2xl border border-violet-100 shadow-card overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${li * 80}ms` }}
          >
            <button
              onClick={() => toggleLayer(layer.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50/40 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center flex-shrink-0">
                <Icon size={13} className="text-violet-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold text-slate-700">{layer.label}</div>
                <div className="text-[10px] text-slate-400">{layer.description}</div>
              </div>
              <StatusDot status={layer.status} />
              {open ? <ChevronUp size={12} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={12} className="text-slate-400 flex-shrink-0" />}
            </button>

            {open && (
              <div className="px-4 pb-4 animate-slide-in-up">
                <div className="space-y-1.5 mb-3">
                  {layer.signals.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-violet-300 flex-shrink-0" />
                      <span className="text-[11px] text-slate-600 leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-violet-50 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-400 leading-5">via</span>
                  {layer.sources.map((s, i) => <SourceTag key={i} name={s} />)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
