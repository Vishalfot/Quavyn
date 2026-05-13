import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { METRICS, INSIGHTS } from "../../data";
import { useApp } from "../../hooks/useApp";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const COLOR_MAP = {
  green:  { text: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", delta: "text-emerald-600" },
  red:    { text: "text-red-700",     bg: "bg-red-50",      border: "border-red-200",     delta: "text-red-600"     },
  orange: { text: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200",  delta: "text-orange-600"  },
  yellow: { text: "text-amber-700",   bg: "bg-amber-50",    border: "border-amber-200",   delta: "text-amber-600"   },
};

export default function MetricsBar() {
  const { openInsight, openMetric, openChat } = useApp();

  const handleMetricClick = (metric) => {
    const relatedInsight = INSIGHTS.find(ins => ins.affectedMetrics?.includes(metric.id));
    if (relatedInsight) openInsight(relatedInsight);
    else openMetric(metric);
  };

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {METRICS.map((m, i) => {
        const c = COLOR_MAP[m.color] || COLOR_MAP.orange;
        return (
          <button
            key={m.id}
            onClick={() => handleMetricClick(m)}
            className={`metric-pill bg-white border rounded-xl p-3.5 text-left animate-fade-in-up`}
            style={{ animationDelay: `${i * 50}ms`, borderColor: "#ede9fe" }}
          >
            <div className="text-[10px] font-medium text-slate-400 mb-1 truncate">{m.label}</div>
            <div className={`text-lg font-bold ${c.text} leading-tight mb-2`}>{m.value}</div>
            
            {m.chartData && (
              <div className="h-10 mb-2 w-full">
                <Line 
                  data={{
                    labels: m.chartData.map((_, i) => i),
                    datasets: [{
                      data: m.chartData,
                      borderColor: m.trend === "up" && m.positive || m.trend === "down" && !m.positive ? '#10b981' : '#f43f5e',
                      borderWidth: 1.5,
                      pointRadius: 0,
                      tension: 0.4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { x: { display: false }, y: { display: false } },
                    plugins: { tooltip: { enabled: false }, legend: { display: false } }
                  }}
                />
              </div>
            )}

            <div className={`flex items-center gap-1 text-[11px] font-semibold ${c.delta}`}>
              {m.trend === "up"
                ? <TrendingUp size={10} />
                : <TrendingDown size={10} />
              }
              {m.delta}
            </div>
            {m.comparison && (
              <div className="text-[10px] text-slate-500 mt-1.5 leading-snug">
                {m.comparison}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
