"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HoloCard } from "../ui/HoloCard";
import { Brain, Terminal, Send, Cpu, Zap } from "lucide-react";
import { useSimulationStore } from "../../store/useSimulationStore";

export function AICopilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; type?: "alert" | "info" | "success" }[]>([
    { role: "ai", content: "NAVIS PRIME GRID initialized. Copilot standing by for operational command.", type: "info" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isConnected = useSimulationStore((state) => state.isConnected);
  const connectionStatus = useSimulationStore((state) => state.connectionStatus);

  const recommendations = useSimulationStore((state) => state.strategic_recommendations);
  const [lastProactiveId, setLastProactiveId] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Listen for proactive AI interventions and inject them into the chat
    const proactiveRecs = recommendations.filter(r => r.type === 'proactive');
    if (proactiveRecs.length > 0) {
      const latest = proactiveRecs[proactiveRecs.length - 1];
      if (latest.id !== lastProactiveId) {
        setTimeout(() => {
          setLastProactiveId(latest.id);
          setMessages(prev => [...prev, { 
            role: "ai", 
            content: `AUTONOMOUS INTERVENTION EXECUTED: ${latest.title}. Confidence: ${latest.confidence}%`, 
            type: "success" 
          }]);
        }, 0);
      }
    }
  }, [recommendations, lastProactiveId]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || connectionStatus === 'offline') return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://morynexis-navis-ai-production.up.railway.app";
      const response = await fetch(`${apiUrl}/api/copilot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: userMsg })
      });
      
      const data = await response.json();
      
      setIsTyping(false);
      
      let type: "info" | "alert" | "success" = "info";
      const aiContent = data.response.toLowerCase();
      if (aiContent.includes("emergency") || aiContent.includes("critical")) type = "alert";
      else if (aiContent.includes("optimize") || aiContent.includes("nominal") || aiContent.includes("clear") || aiContent.includes("deployed")) type = "success";
      
      setMessages(prev => [...prev, { role: "ai", content: data.response, type }]);
    } catch (error) {
      setIsTyping(false);
      
      // Fallback mock responses if API is down
      const lower = userMsg.toLowerCase();
      let mockResponse = "Command received. Live telemetry sync required for full global execution.";
      let type: "info" | "alert" | "success" = "info";
      
      if (lower.includes("collapse")) {
         mockResponse = "CRITICAL: Simulation sequence 'CIVILIZATION COLLAPSE' initialized in offline deterministic mode. Infrastructure degradation tracking started.";
         type = "alert";
      } else if (lower.includes("recovery")) {
         mockResponse = "NOMINAL: Autonomous recovery protocols activated. Self-healing active across grid sectors.";
         type = "success";
      } else if (lower.includes("climate")) {
         mockResponse = "WARNING: Extreme climate scenario running. Severe weather pressure delta injected into matrix.";
         type = "alert";
      } else if (lower.includes("governance")) {
         mockResponse = "OVERRIDE ACCEPTED: Autonomous governance model shifted to priority mode.";
         type = "success";
      } else if (lower.includes("master demo")) {
         mockResponse = "MASTER SEQUENCE ENGAGED: Executing multi-horizon operational demonstration.";
         type = "success";
      }

      setMessages(prev => [...prev, { role: "ai", content: `[LOCAL] ${mockResponse}`, type }]);
    }
  };

  return (
    <HoloCard className="h-full flex flex-col" glowColor="purple">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 bg-purple-950/20 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded border border-purple-400 bg-purple-900/50 shadow-[0_0_10px_rgba(138,43,226,0.4)]">
            <Brain className="h-4 w-4 text-purple-300" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
            </span>
          </div>
          <div>
            <h3 className="font-orbitron text-sm font-bold tracking-wider text-purple-100">NAVIS <span className="text-purple-400">COPILOT</span></h3>
            <p className="font-mono text-[10px] text-purple-400/70 uppercase tracking-widest">Autonomous Orchestration Engine</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-mono text-sm scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[90%] ${msg.role === "user" ? "self-end items-end" : "self-start"}`}
            >
              <div className={`flex items-center gap-2 mb-1 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "ai" ? <Cpu className="h-3 w-3 text-purple-400" /> : <Terminal className="h-3 w-3 text-cyan-400" />}
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{msg.role === "ai" ? "NAVIS" : "CMDR"}</span>
              </div>
              <div className={`px-4 py-3 rounded-lg border backdrop-blur-md ${
                msg.role === "user" 
                  ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-100" 
                  : msg.type === "alert" 
                    ? "bg-red-950/30 border-red-500/40 text-red-100 shadow-[0_0_15px_rgba(255,0,0,0.1)]"
                    : msg.type === "success"
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-purple-950/20 border-purple-500/30 text-purple-100"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 text-purple-400/50 p-2">
              <Zap className="h-4 w-4 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest animate-pulse">Computing Matrix...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-black/40 border-t border-purple-500/20 relative flex flex-col">
        {connectionStatus === 'offline' && (
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
             <span className="font-mono text-xs text-red-400 uppercase tracking-widest animate-pulse">Telemetry Offline</span>
           </div>
        )}
        
        {/* Executive Scenarios */}
        <div className="px-4 pt-3 flex flex-wrap gap-2">
           <button onClick={() => { setInput("Execute Master Demo Sequence"); setTimeout(() => handleSend(), 50); }} className="px-2 py-1 bg-white/10 border border-white/30 text-white font-mono text-[9px] uppercase tracking-widest rounded hover:bg-white/20 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.2)]">Execute Master Demo Sequence</button>
           <button onClick={() => { setInput("Run Civilization Collapse Scenario"); setTimeout(() => handleSend(), 50); }} className="px-2 py-1 bg-red-950/40 border border-red-500/30 text-red-300 font-mono text-[9px] uppercase tracking-widest rounded hover:bg-red-900/60 transition-colors">Collapse Scenario</button>
           <button onClick={() => { setInput("Initiate Autonomous Recovery Protocol"); setTimeout(() => handleSend(), 50); }} className="px-2 py-1 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] uppercase tracking-widest rounded hover:bg-emerald-900/60 transition-colors">Recovery Protocol</button>
           <button onClick={() => { setInput("Simulate Severe Climate Cascade"); setTimeout(() => handleSend(), 50); }} className="px-2 py-1 bg-orange-950/40 border border-orange-500/30 text-orange-300 font-mono text-[9px] uppercase tracking-widest rounded hover:bg-orange-900/60 transition-colors">Climate Cascade</button>
           <button onClick={() => { setInput("Activate Governance Override"); setTimeout(() => handleSend(), 50); }} className="px-2 py-1 bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono text-[9px] uppercase tracking-widest rounded hover:bg-purple-900/60 transition-colors">Governance Override</button>
        </div>

        <form onSubmit={handleSend} className="relative flex items-center p-4">
          <div className="absolute left-7">
            <span className="font-mono text-purple-400 text-lg">{">"}</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER COMMAND PROTOCOL..."
            disabled={connectionStatus === 'offline'}
            className="w-full bg-[#0F1115] border border-purple-500/30 rounded flex-1 h-12 pl-8 pr-12 font-mono text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_10px_rgba(138,43,226,0.3)] transition-all disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping || connectionStatus === 'offline'}
            className="absolute right-6 p-2 text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </HoloCard>
  );
}
