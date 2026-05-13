import React, { useState, useRef, useEffect } from "react";
import { X, Send, ExternalLink, Sparkles, MessageSquare } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import { INITIAL_CHAT } from "../../data";
import QuavynLogo from "../shared/QuavynLogo";

function UserMessage({ msg }) {
  return (
    <div className="flex justify-end">
      <div>
        <div className="bg-violet-600 text-white text-sm rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm max-w-[260px]">
          {msg.text}
        </div>
        <div className="text-[10px] text-slate-400 mt-1 text-right">{msg.time}</div>
      </div>
    </div>
  );
}

function QuavynMessage({ msg }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <QuavynLogo size={14} color="white" />
      </div>
      <div className="max-w-[260px]">
        <div className="bg-white border border-violet-100 rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-card">
          <p className="text-xs text-slate-700 leading-relaxed">{msg.text}</p>
          {msg.bullets && (
            <ul className="mt-2 space-y-1.5">
              {msg.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {msg.priority && (
            <div className="flex items-start gap-1.5 bg-violet-50 border border-violet-100 rounded-lg px-2.5 py-2 mt-2.5">
              <Sparkles size={11} className="text-violet-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-violet-800 font-medium leading-relaxed">{msg.priority}</span>
            </div>
          )}
          {msg.subtext && (
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2 italic">{msg.subtext}</p>
          )}
          {msg.sources?.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-violet-50 flex flex-wrap gap-1">
              {msg.sources.map((s, i) => (
                <span key={i} className="flex items-center gap-0.5 text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">
                  <ExternalLink size={8} />{s}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="text-[10px] text-slate-400 mt-1">{msg.time}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-violet-900 flex items-center justify-center flex-shrink-0 shadow-sm">
        <QuavynLogo size={14} color="white" />
      </div>
      <div className="bg-white border border-violet-100 rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-card">
        <div className="flex gap-1 items-center">
          {[0, 0.2, 0.4].map((d, i) => (
            <span key={i} className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
              style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SMART_RESPONSES = [
  {
    triggers: ["cac", "customer acquisition", "acquisition cost"],
    text: "CAC has risen 22% to ₹1,840 over 6 weeks. The primary driver is competitor PPC spend inflation — shared keywords are 38% more expensive. Meanwhile, your organic traffic is down 14% due to a post-migration crawlability issue.",
    bullets: ["Fix site crawlability (2–3 day effort) to restore organic baseline", "Build CUET-focused landing pages to capture rising demand", "Pause campaigns with CAC above ₹2,200 immediately"],
    priority: "Organic SEO fix is highest ROI — it addresses root cause, not symptoms.",
    sources: ["Google Search Console", "Competitor ad intelligence", "Internal analytics"],
  },
  {
    triggers: ["what should i do", "priority", "next step", "action"],
    text: "Your top 3 priorities right now, ranked by urgency and impact:",
    bullets: [
      "P0 — Fix RBI NACH payment flow before Monday. 340 subscribers at failure risk.",
      "P1 — Launch retention outreach to at-risk enterprise cohort this week.",
      "P1 — Build CUET landing pages to capture organic demand gap.",
    ],
    priority: "The payment flow fix is the single highest-leverage action this week.",
    sources: ["Quavyn risk model", "Internal cohort data"],
  },
];

function getFallbackResponse(context) {
  const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  if (context) {
    return {
      role: "quavyn", time: now,
      text: `Analyzing ${context.id} data. Based on current data, this connects to the ongoing retention and growth model patterns I've been tracking for Learnova.`,
      subtext: "Would you like me to break down the financial impact, identify the root cause, or suggest specific actions?",
      sources: ["Internal analytics", "Cross-layer signal correlation"],
    };
  }
  return {
    role: "quavyn", time: now,
    text: "Analyzing signals across all three intelligence layers. Based on current data, this connects to the ongoing retention and growth model patterns I've been tracking for Learnova.",
    subtext: "Would you like me to break down the financial impact, identify the root cause, or suggest specific actions?",
    sources: ["Internal analytics", "Cross-layer signal correlation"],
  };
}

export default function ChatPanel() {
  const { chatOpen, closeChat, chatContext } = useApp();
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(380);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startResizing = (e) => {
    e.preventDefault();
    const handleMouseMove = (moveEvent) => {
      const newWidth = window.innerWidth - moveEvent.clientX;
      if (newWidth > 320 && newWidth < window.innerWidth * 0.8) {
        setWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { role: "user", text, time: now }]);
    setInput("");
    setLoading(true);

    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const lower = text.toLowerCase();
      const smart = SMART_RESPONSES.find(r => r.triggers.some(t => lower.includes(t)));
      const response = smart
        ? { role: "quavyn", time: now, ...smart }
        : getFallbackResponse(chatContext);
      setMessages(prev => [...prev, response]);
      setLoading(false);
    }, delay);
  };

  if (!chatOpen) return null;

  return (
    <>
      {/* Backdrop (does not close — chat stays persistent) */}
      <div className="fixed inset-0 z-40 pointer-events-none" />

      {/* Panel */}
      <div 
        className="fixed top-0 right-0 h-full bg-white shadow-drawer z-50 flex flex-col border-l border-violet-100 animate-slide-in-right"
        style={{ width: `${width}px` }}
      >
        {/* Resize Handle */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-violet-300 bg-transparent transition-colors z-50"
          onMouseDown={startResizing}
        />

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-violet-100 flex-shrink-0 bg-gradient-to-r from-violet-900 to-violet-700 pl-4">
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <QuavynLogo size={16} color="white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-white">Ask Quavyn</div>
            <div className="text-[10px] text-violet-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              AI Chief-of-Staff · Learnova
            </div>
          </div>
          <button onClick={closeChat} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 text-white/70 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>



        {/* Context Banner */}
        {chatContext && (
          <div className="px-4 py-2 border-b border-violet-50 bg-slate-50 flex items-start gap-2">
            <span className="mt-0.5 text-[10px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded border border-violet-200">Context</span>
            <span className="text-xs text-slate-700 font-medium leading-snug">{chatContext.title}</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 min-h-0">
          {messages.map((msg, i) => (
            msg.role === "user"
              ? <UserMessage key={i} msg={msg} />
              : <QuavynMessage key={i} msg={msg} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="bg-white flex-shrink-0 flex flex-col">
          {/* Suggested question chips */}
          <div className="px-3 pt-2 pb-1 border-t border-violet-50 flex gap-1.5 overflow-x-auto">
            {["Why is churn rising?", "What's my top priority?", "CAC analysis"].map((p, i) => (
              <button
                key={i}
                onClick={() => { setInput(p); }}
                className="flex-shrink-0 text-[11px] font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1 hover:bg-violet-100 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-violet-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-violet-300 focus-within:bg-white focus-within:shadow-card transition-all">
              <MessageSquare size={13} className="text-slate-400 flex-shrink-0" />
              <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything about your business…"
              className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex-shrink-0"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
