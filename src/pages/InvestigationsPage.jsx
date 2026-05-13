import React from "react";
import { Search, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { INSIGHTS } from "../data";

export default function InvestigationsPage() {
  return (
    <div className="p-8 h-full overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Active Investigations</h1>
          <p className="text-slate-500 text-sm">Deep dives into critical anomalies and strategic risks.</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Search size={14} /> New Investigation
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Investigation</th>
              <th className="p-4">Status</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Last Updated</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {INSIGHTS.map((insight) => (
              <tr key={insight.id} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                <td className="p-4 pl-6">
                  <div className="font-semibold text-slate-800 group-hover:text-violet-700 transition-colors mb-1">{insight.title}</div>
                  <div className="text-xs text-slate-500">{insight.category}</div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                    <Clock size={10} /> Investigating
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[9px] font-bold">
                      {insight.assignedOwner?.substring(0, 2).toUpperCase() || 'AI'}
                    </div>
                    <span className="text-xs font-medium text-slate-700">{insight.assignedOwner || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="p-4 text-xs text-slate-500">2 hours ago</td>
              </tr>
            ))}
            <tr className="hover:bg-slate-50 cursor-pointer transition-colors group">
              <td className="p-4 pl-6">
                <div className="font-semibold text-slate-800 group-hover:text-violet-700 transition-colors mb-1">Onboarding completion drop analysis</div>
                <div className="text-xs text-slate-500">Product</div>
              </td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle size={10} /> Resolved
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[9px] font-bold">
                    JS
                  </div>
                  <span className="text-xs font-medium text-slate-700">James Smith</span>
                </div>
              </td>
              <td className="p-4 text-xs text-slate-500">3 days ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
