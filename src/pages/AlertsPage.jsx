import React from "react";
import { SIGNAL_FEED } from "../data";
import { SeverityBadge } from "../components/shared/ui";
import { Bell, CheckCircle2, Clock } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
            <Bell size={18} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alerts History</h1>
            <p className="text-sm text-slate-500">Chronological log of all system signals and actions</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Time</th>
                <th className="px-6 py-4 font-bold">Signal</th>
                <th className="px-6 py-4 font-bold">Urgency</th>
                <th className="px-6 py-4 font-bold">Layer Source</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SIGNAL_FEED.map((signal, i) => {
                const actionTaken = i % 3 === 0 ? "Pending Review" : "Logged in System";
                const isPending = actionTaken === "Pending Review";
                return (
                  <tr key={signal.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                      {signal.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium max-w-md truncate">
                      {signal.text}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SeverityBadge severity={signal.severity} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200">{signal.source}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {isPending ? (
                        <span className="flex items-center gap-1.5 text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 w-fit">
                          <Clock size={12} /> Pending
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                          <CheckCircle2 size={12} /> {actionTaken}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
