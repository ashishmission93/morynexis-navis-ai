"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HoloCard } from "../ui/HoloCard";
import { Brain, Network, Zap, Shield, Navigation, CloudLightning, CarFront } from "lucide-react";
import { useEffect, useState } from "react";
import { useSimulationStore } from "@/store/useSimulationStore";

export function MultiAgentNetwork() {
  const [activeEdge, setActiveEdge] = useState<number>(0);
  const agent_logs = useSimulationStore((state) => state.agent_logs);
  const negotiations = useSimulationStore((state) => state.negotiations);
  
  // Get latest log or use default
  const latestLog = agent_logs.length > 0 ? agent_logs[agent_logs.length - 1] : null;

  // Active negotiation
  const activeNegotiation = negotiations.length > 0 ? negotiations[negotiations.length - 1] : null;

  const agentMap: Record<string, number> = {
    "Optimization": 0,
    "Navigation": 1,
    "Risk": 2,
    "Traffic": 3,
    "Weather": 4,
    "Defense": 2,
    "Core": 5
  };

  useEffect(() => {
    if (!activeNegotiation && latestLog) {
      setActiveEdge(agentMap[latestLog.agent] ?? Math.floor(Math.random() * 5));
    }
  }, [latestLog, activeNegotiation]);

  const agents = [
    { id: "opt", name: "Optimization", icon: Zap, baseColor: "text-blue-400", baseBg: "bg-blue-500/20", baseBorder: "border-blue-500/50" },
    { id: "nav", name: "Navigation", icon: Navigation, baseColor: "text-cyan-400", baseBg: "bg-cyan-500/20", baseBorder: "border-cyan-500/50" },
    { id: "risk", name: "Risk", icon: Shield, baseColor: "text-red-400", baseBg: "bg-red-500/20", baseBorder: "border-red-500/50" },
    { id: "traffic", name: "Traffic", icon: CarFront, baseColor: "text-orange-400", baseBg: "bg-orange-500/20", baseBorder: "border-orange-500/50" },
    { id: "weather", name: "Weather", icon: CloudLightning, baseColor: "text-emerald-400", baseBg: "bg-emerald-500/20", baseBorder: "border-emerald-500/50" },
    { id: "core", name: "Core Node", icon: Brain, baseColor: "text-purple-400", baseBg: "bg-purple-500/20", baseBorder: "border-purple-500/50", isCore: true },
  ];

  const getAgentStyle = (agentName: string) => {
    const agent = agents.find(a => a.name === agentName) || agents[5];
    
    // Default styling
    let style = {
       color: agent.baseColor,
       bg: agent.baseBg,
       border: agent.baseBorder,
       isPulsing: false,
       isConflicting: false
    };

    if (activeNegotiation) {
       if (activeNegotiation.status === 'debating') {
          if (agentName === activeNegotiation.agent1) {
             style = { color: 'text-orange-500', bg: 'bg-orange-500/30', border: 'border-orange-500', isPulsing: true, isConflicting: true };
          } else if (agentName === activeNegotiation.agent2) {
             style = { color: 'text-red-500', bg: 'bg-red-500/30', border: 'border-red-500', isPulsing: true, isConflicting: true };
          }
       } else if (activeNegotiation.status === 'resolved') {
          if (agentName === activeNegotiation.agent1 || agentName === activeNegotiation.agent2) {
             style = { color: 'text-emerald-400', bg: 'bg-emerald-500/30', border: 'border-emerald-500', isPulsing: true, isConflicting: false };
          }
       }
    }

    return style;
  };

  return (
    <HoloCard className="h-[400px] flex flex-col p-6" glowColor={activeNegotiation && activeNegotiation.status === 'debating' ? 'orange' : 'blue'}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-orbitron text-lg font-bold tracking-wider flex items-center gap-2 ${activeNegotiation && activeNegotiation.status === 'debating' ? 'text-orange-400' : 'text-blue-100'}`}>
          <Network className={`h-5 w-5 ${activeNegotiation && activeNegotiation.status === 'debating' ? 'text-orange-500 animate-pulse' : 'text-blue-400'}`} />
          {activeNegotiation && activeNegotiation.status === 'debating' ? 'AUTONOMOUS NEGOTIATION' : 'MULTI-AGENT MESH'}
        </h3>
        <span className={`font-mono text-xs uppercase tracking-widest border px-2 py-1 rounded ${activeNegotiation && activeNegotiation.status === 'debating' ? 'border-orange-500/50 bg-orange-950/30 text-orange-400 animate-pulse' : 'border-blue-500/30 bg-blue-950/30 text-blue-400/70'}`}>
          {activeNegotiation && activeNegotiation.status === 'debating' ? 'Conflict Detected' : 'Consensus: 99.9%'}
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 300">
          <g strokeWidth="2" fill="none">
            {/* Optimization to Core */}
            <path d="M 80 80 L 200 150" stroke={activeEdge === 0 && !activeNegotiation ? "#00F0FF" : "rgba(255,255,255,0.05)"} className={activeEdge === 0 ? "animate-pulse" : ""} />
            {/* Navigation to Core */}
            <path d="M 320 80 L 200 150" stroke={activeEdge === 1 && !activeNegotiation ? "#00F0FF" : "rgba(255,255,255,0.05)"} className={activeEdge === 1 ? "animate-pulse" : ""} />
            {/* Risk to Core */}
            <path d="M 80 220 L 200 150" stroke={activeEdge === 2 && !activeNegotiation ? "#FF0000" : "rgba(255,255,255,0.05)"} className={activeEdge === 2 ? "animate-pulse" : ""} />
            {/* Traffic to Core */}
            <path d="M 200 60 L 200 150" stroke={activeEdge === 3 && !activeNegotiation ? "#F97316" : "rgba(255,255,255,0.05)"} className={activeEdge === 3 ? "animate-pulse" : ""} />
            {/* Weather to Core */}
            <path d="M 320 220 L 200 150" stroke={activeEdge === 4 && !activeNegotiation ? "#10B981" : "rgba(255,255,255,0.05)"} className={activeEdge === 4 ? "animate-pulse" : ""} />
            
            {/* Negotiation Clash Line */}
            {activeNegotiation && activeNegotiation.status === 'debating' && (
              <path 
                d={`M ${agentMap[activeNegotiation.agent1] === 0 ? 80 : agentMap[activeNegotiation.agent1] === 1 ? 320 : agentMap[activeNegotiation.agent1] === 2 ? 80 : agentMap[activeNegotiation.agent1] === 3 ? 200 : 320} 
                      ${agentMap[activeNegotiation.agent1] === 0 ? 80 : agentMap[activeNegotiation.agent1] === 1 ? 80 : agentMap[activeNegotiation.agent1] === 2 ? 220 : agentMap[activeNegotiation.agent1] === 3 ? 60 : 220} 
                   L ${agentMap[activeNegotiation.agent2] === 0 ? 80 : agentMap[activeNegotiation.agent2] === 1 ? 320 : agentMap[activeNegotiation.agent2] === 2 ? 80 : agentMap[activeNegotiation.agent2] === 3 ? 200 : 320} 
                      ${agentMap[activeNegotiation.agent2] === 0 ? 80 : agentMap[activeNegotiation.agent2] === 1 ? 80 : agentMap[activeNegotiation.agent2] === 2 ? 220 : agentMap[activeNegotiation.agent2] === 3 ? 60 : 220}`} 
                stroke="#F97316" 
                strokeDasharray="5,5" 
                strokeWidth="3"
                className="animate-[dash_0.5s_linear_infinite]" 
              />
            )}
          </g>
        </svg>

        {/* Nodes */}
        <div className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-10">
          <AgentNode agent={agents[0]} style={getAgentStyle("Optimization")} />
        </div>
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
          <AgentNode agent={agents[3]} style={getAgentStyle("Traffic")} />
        </div>
        <div className="absolute top-[15%] right-[15%] translate-x-1/2 -translate-y-1/2 z-10">
          <AgentNode agent={agents[1]} style={getAgentStyle("Navigation")} />
        </div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
          <AgentNode agent={agents[5]} style={getAgentStyle("Core Node")} />
        </div>
        <div className="absolute bottom-[15%] left-[15%] -translate-x-1/2 translate-y-1/2 z-10">
          <AgentNode agent={agents[2]} style={getAgentStyle("Risk")} />
        </div>
        <div className="absolute bottom-[15%] right-[15%] translate-x-1/2 translate-y-1/2 z-10">
          <AgentNode agent={agents[4]} style={getAgentStyle("Weather")} />
        </div>
      </div>
      
      {/* Live reasoning stream or Negotiation Panel */}
      <div className="mt-4 h-[90px] border-t border-white/10 pt-2 overflow-y-auto scrollbar-thin flex flex-col-reverse relative">
        <AnimatePresence>
          {activeNegotiation && activeNegotiation.status === 'debating' ? (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="w-full bg-orange-950/20 border border-orange-500/30 rounded p-2 flex flex-col gap-1"
             >
               <div className="flex justify-between items-center mb-1">
                 <span className="font-mono text-[10px] text-orange-400 font-bold uppercase tracking-widest">{activeNegotiation.topic}</span>
                 <span className="font-mono text-[8px] text-orange-500 animate-pulse">Debating... {Math.round(activeNegotiation.progress)}%</span>
               </div>
               <div className="flex gap-2">
                 <div className="flex-1 bg-black/40 p-1 rounded border border-orange-500/20">
                   <span className="font-mono text-[9px] text-orange-300 uppercase block mb-0.5">[{activeNegotiation.agent1}]</span>
                   <span className="font-mono text-[9px] text-gray-300">{activeNegotiation.a1_stance}</span>
                 </div>
                 <div className="flex-1 bg-black/40 p-1 rounded border border-red-500/20">
                   <span className="font-mono text-[9px] text-red-300 uppercase block mb-0.5">[{activeNegotiation.agent2}]</span>
                   <span className="font-mono text-[9px] text-gray-300">{activeNegotiation.a2_stance}</span>
                 </div>
               </div>
             </motion.div>
          ) : (
             [...agent_logs].reverse().slice(0, 3).map((log, i) => (
               <motion.div 
                 key={log.id}
                 initial={{ y: 10, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 - (i * 0.3) }}
                 className={`font-mono text-xs ${log.message.includes('Consensus Reached') ? 'text-emerald-400' : 'text-blue-300'} py-0.5`}
               >
                 <span className="opacity-50 text-[10px] mr-2">[{new Date(log.timestamp * 1000).toLocaleTimeString()}]</span>
                 <span className="uppercase tracking-widest">[{log.agent}]:</span> {log.message}
               </motion.div>
             ))
          )}
        </AnimatePresence>
      </div>
    </HoloCard>
  );
}

function AgentNode({ agent, style }: { agent: any, style: any }) {
  return (
    <motion.div 
      className={`relative flex flex-col items-center justify-center`}
      whileHover={{ scale: 1.1 }}
    >
      <div className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${style.border} ${style.bg} backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10`}>
        <agent.icon className={`h-6 w-6 ${style.color} ${style.isPulsing && !agent.isCore ? 'animate-pulse' : ''}`} />
        {style.isPulsing && (
          <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${style.bg}`} />
        )}
      </div>
      <div className={`mt-2 bg-[#0F1115]/80 px-2 py-0.5 rounded border ${style.isConflicting ? 'border-orange-500/50' : 'border-white/10'} backdrop-blur-sm`}>
         <span className={`font-mono text-[10px] uppercase tracking-widest ${style.color}`}>{agent.name}</span>
      </div>
    </motion.div>
  );
}
