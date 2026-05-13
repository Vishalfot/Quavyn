import React, { useState } from "react";
import { Users, Mail, Settings, ChevronDown, ChevronUp } from "lucide-react";

const TEAMS = [
  { id: "exec", name: "Executive", count: 4, members: ["Rahul Sharma (CEO)", "Priya Patel (CFO)", "Amit Kumar (COO)", "Neha Gupta (CTO)"] },
  { id: "growth", name: "Growth", count: 3, members: ["Anjali Desai (Lead)", "Vikram Singh (SEO)", "Riya Sen (Ads)"] },
  { id: "eng", name: "Engineering", count: 4, members: ["Dev Sharma (Lead)", "Sneha Roy (FE)", "Karan Verma (BE)", "Pooja Das (QA)"] },
  { id: "prod", name: "Product", count: 2, members: ["Rohan Mehta (PM)", "Aditi Rao (Design)"] },
  { id: "sales", name: "Sales", count: 3, members: ["Tarun Kapoor (Head)", "Meera Reddy (AE)", "Sahil Jain (SDR)"] },
  { id: "cs", name: "Customer Success", count: 2, members: ["Kriti Shah (CSM)", "Rahul Verma (Support)"] },
];

export default function TeamsPage() {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleTeam = (id) => {
    setExpandedTeam(prev => prev === id ? null : id);
  };

  return (
    <div className="p-8 h-full overflow-y-auto w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Teams & Collaboration</h1>
        <p className="text-slate-500 text-sm">Manage users, roles, and functional team assignments.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {TEAMS.map(team => {
          const isExpanded = expandedTeam === team.id;
          return (
            <div key={team.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Users size={18} />
                </div>
                <button className="text-slate-400 hover:text-slate-600"><Settings size={14}/></button>
              </div>
              
              <div 
                className="cursor-pointer group" 
                onClick={() => toggleTeam(team.id)}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">{team.name} Team</h3>
                  {isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </div>
                <p className="text-xs text-slate-500 mb-4">{team.count} active members</p>
              </div>
              
              {isExpanded && (
                <div className="mb-4 space-y-2 animate-fade-in">
                  {team.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                        {member.split(" ")[0][0]}
                      </div>
                      <span className="truncate">{member}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                <div className="flex -space-x-2">
                  {Array.from({ length: team.count }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                       <span className="text-[8px] text-slate-500 font-bold">{team.members[i].split(" ")[0][0]}</span>
                    </div>
                  ))}
                </div>
                <button className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded hover:bg-violet-100 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
